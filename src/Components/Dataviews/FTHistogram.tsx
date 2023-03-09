// Authored by ChatGPT and Andrew Li
// Comments by Andrew Li

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import 'd3-axis';
import 'd3-shape';

export type HistogramProps = {
    title: string;
    data: number[];
    width: number;
    height: number;
    color?: string;
}

const FTHistogram: React.FC<HistogramProps> = ({ title, data, width, height, color = "#4E2A84" }) => {
    const graphRef = useRef<SVGSVGElement>(null);
    const PADDING = 10;

    useEffect(() => {
        const margin = { top: 30, right: 30, bottom: 30, left: 30 };
        const graphWidth = width - margin.left - margin.right;
        const graphHeight = height - margin.top - margin.bottom;

        // find min and max
        data.sort((a,b) => a - b);
        const minX = data[0];
        const maxX = data[data.length - 1];

        d3.select(graphRef.current).selectAll('*').remove();

        const svg = d3.select(graphRef.current)
        .attr('width', width)
        .attr('height', height);

        const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const bins = d3.bin()(data);
        const x = d3.scaleLinear()
        .domain([minX - 1, maxX + 1])
        .range([0, graphWidth]);

        const y = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length) ?? 0])
        .range([graphHeight, 0]);

        g.append('g')
        .attr('transform', `translate(0, ${graphHeight})`)
        .call(d3.axisBottom(x));

        g.append('g')
        .call(d3.axisLeft(y));

        g.selectAll('rect')
        .data(bins)
        .join('rect')
        .attr('x', d => (x(d.x0 ?? 0) + PADDING/2) * (bins.length - 1)/bins.length)
        .attr('width', d => Math.max((x(d.x1 ?? 0) - x(d.x0 ?? 0) - PADDING) * (bins.length - 1)/bins.length))
        .attr('y', d => y(d.length))
        .attr('height', d => y(0) - y(d.length))
        .attr('fill', color);

    }, [data, width, height]);

    return (<div>
        <span className="text-black font-bold">{title}</span>
        <svg ref={graphRef} className="border-gray-200 border-2" />
    </div>);
};

export default FTHistogram;
