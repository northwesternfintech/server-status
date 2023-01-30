// Authored by ChatGPT and Andrew Li
// Comments by Andrew Li

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import 'd3-axis';
import 'd3-shape';
import Color from '../Types/Color';

type LineGraphProps = {
  data: number[],
  options?: Options,
};

type Options = {
    height: number,
    width: number,
    inset: number,
    rounded: number,
    borderColor: Color,
    borderThickness: number,
    strokeColor: Color,
    strokeThickness: number
};

const DEFAULT_OPTIONS = {
    height: 500,
    width: 500,
    inset: 50,
    rounded: 0,
    borderColor: Color.Black(),
    borderThickness: 0,
    strokeColor: Color.Black(),
    strokeThickness: 2
};

const LineGraph: React.FC<LineGraphProps> = ({ data, options }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState(options?.width || DEFAULT_OPTIONS.width);
  const [opts, setOpts] = useState<Options>(options || DEFAULT_OPTIONS);

  const origWidth = useRef(options?.width || DEFAULT_OPTIONS.width);

  useEffect(() => {
    const handleResize = () => {
        const t = document.body.clientWidth < origWidth.current ? document.body.clientWidth*0.8 : origWidth.current;
        const MIN_WIDTH = 100;
        if(t > MIN_WIDTH) {
            setWidth(t);
            const option2 = opts;
            option2.width = t;
            setOpts(option2);
        } else {
            setWidth(MIN_WIDTH);
            const option2 = opts;
            option2.width = MIN_WIDTH;
            setOpts(option2);
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  },[]);

  useEffect(() => {
    if(svgRef.current) {
        let OPTIONS: Options;
        if(opts) {
            OPTIONS = {
                height: opts.height || 500,
                width: opts.width || 500,
                inset: opts.inset || 50,
                rounded: opts.rounded || 50,
                borderColor: opts.borderColor || Color.Black(),
                borderThickness: opts.borderThickness || 2,
                strokeColor: opts.strokeColor || Color.Black(),
                strokeThickness: opts.strokeThickness || 2
            };
        } else {
            OPTIONS = DEFAULT_OPTIONS;
        }

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const filteredData = data.filter(d => d !== undefined);

        const xScale = d3.scaleLinear<number, number>()
            .domain([0, filteredData.length-1])
            .range([OPTIONS.inset, OPTIONS.width - OPTIONS.inset]);
    
        const yScale = d3.scaleLinear<number, number>()
            .domain([100, 89])
            .range([OPTIONS.inset, OPTIONS.height - OPTIONS.inset]);
    
        const line = d3.line<number>()
            .x((_, i) => {
                // const widthOfGraph = OPTIONS.width - OPTIONS.inset;
                // const widthOfTick = widthOfGraph/filteredData.length;
                // console.log(i,OPTIONS.inset + i*widthOfTick);
                // return OPTIONS.inset + i*widthOfTick;

                return xScale(i);
            })
            .y(d => yScale(d))
            .curve(d3.curveBasisOpen);
    
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", `#${OPTIONS.strokeColor.toHexCode()}`)
            .attr("stroke-width", OPTIONS.strokeThickness)
            .attr("d", line);

        const xAxis = d3.axisBottom(xScale)
            .tickValues(d3.range(0, filteredData.length-1, filteredData.length > 100 ? 10 : filteredData.length > 20 ? 5 : 1))
            .tickFormat(d3.format("d"));
        svg.append("g")
            .attr(`transform`, `translate(0,${OPTIONS.height - OPTIONS.inset})`)
            .call(xAxis);
        
        const yAxis = d3.axisLeft(yScale)
            .tickValues(d3.range(85, 101, 5))
            .tickFormat(d3.format("d"));
        svg.append("g")
            .attr(`transform`, `translate(${OPTIONS.inset},0)`)
            .call(yAxis);
        
        svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", OPTIONS.width)
            .attr("height", OPTIONS.height)
            .attr("rx", OPTIONS.rounded)
            .attr("ry", OPTIONS.rounded)
            //.style("stroke", OPTIONS.borderColor.toHexCode())
            .style("fill", "none");
            //.style("stroke-width", OPTIONS.borderThickness);
    }
  }, [data, width]);

  return <svg className={`transition-all ease-in-out border-[#${(opts?.borderColor || DEFAULT_OPTIONS.borderColor).toHexCode().toString()}] border rounded-lg`} ref={svgRef} height={opts?.height || DEFAULT_OPTIONS.height} width={width} />;
};

export default LineGraph;
