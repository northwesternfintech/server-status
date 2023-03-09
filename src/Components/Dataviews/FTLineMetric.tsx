// Authored by ChatGPT and Andrew Li
// Comments by Andrew Li

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import 'd3-axis';
import 'd3-shape';

type Data = {
    x: number;
    y: number;
}

export type LineMetricProps = {
    title: string;
    unsortedData: Data[];
    width: number;
    height: number;
    color?: string;
}

const findRange = (array: Array<Data>): [number, number, number, number] => {
    let [minX, maxX, minY, maxY] = [array[0].x, array[0].x, array[0].y, array[0].y];
    for (const datapoint of array) {
        if(datapoint.x < minX) {
            minX = datapoint.x;
        }

        if(datapoint.x > maxX) {
            maxX = datapoint.x;
        }

        if(datapoint.y < minY) {
            minY = datapoint.y;
        }

        if(datapoint.y > maxY) {
            maxY = datapoint.y;
        }
     }

     return [minX, maxX, minY, maxY];
};

const FTLineMetric: React.FC<LineMetricProps> = ({ title, unsortedData, width, height, color = "#4E2A84" }) => {
    const graphRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const [minX, maxX, minY, maxY] = findRange(unsortedData);
        const margin = { top: 30, right: 30, bottom: 30, left: 30 };
        const graphWidth = width - margin.left - margin.right;
        const graphHeight = height - margin.top - margin.bottom;

        const data = unsortedData.sort((a,b) => a.x - b.x);

        d3.select(graphRef.current).selectAll('*').remove();

        const svg = d3.select(graphRef.current)
        .attr('width', width)
        .attr('height', height);

        const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleLinear()
        .domain([minX, maxX])
        .range([0, graphWidth]);

        const y = d3.scaleLinear()
        .domain([minY, maxY])
        .range([graphHeight, 0]);

        const line = d3.line<Data>()
            .x(d => x(d.x))
            .y(d => y(d.y));

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 1.5)
            .attr('d', line);

        g.append('g')
            .attr('transform', `translate(0, ${graphHeight})`)
            .call(d3.axisBottom(x));

        g.append('g')
            .call(d3.axisLeft(y));
    }, [unsortedData, width, height]);

    return (<div>
        <span className="text-black font-bold">{title}</span>
        <svg ref={graphRef} className="border-gray-200 border-2" />
    </div>);
};

export default FTLineMetric;
