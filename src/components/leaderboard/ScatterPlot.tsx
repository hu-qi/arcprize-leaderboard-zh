// @ts-nocheck — D3.js type inference is too complex for strict TS
"use client";

import React, {useRef, useEffect, useState} from "react";
import * as d3 from "d3";

type Entry = {
  rank: number;
  model: string;
  provider: string;
  type: string;
  score: number;
  costPerTask: number;
  date: string;
};

type Props = {
  data: Entry[];
  labels: {
    xAxis: string;
    yAxis: string;
    tooltipModel: string;
    tooltipScore: string;
    tooltipCost: string;
    download: string;
  };
};

const providerColors: Record<string, string> = {
  OpenAI: "#4eea3a",
  Google: "#1e93ff",
  Anthropic: "#e53aa3",
  DeepSeek: "#ff8a1f",
  Meta: "#4fe3f0",
  Alibaba: "#ffd84d",
};

export default function ScatterPlot({data, labels}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    entry: Entry;
  } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const margin = {top: 20, right: 30, bottom: 50, left: 60};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .selectAll("g")
      .data([null])
      .join("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xMax = d3.max(data, (d) => d.costPerTask) || 10;
    const xScale = d3
      .scaleLog()
      .domain([0.001, xMax * 1.5])
      .range([0, width])
      .clamp(true);

    const yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([height, 0]);

    // Grid lines
    svg
      .selectAll(".grid-y")
      .data(yScale.ticks(5))
      .join("line")
      .attr("class", "grid-y")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "rgba(255,255,255,0.06)");

    // Axes
    svg
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(5, "$.2f")
          .tickSize(-height)
      )
      .selectAll("text")
      .style("fill", "var(--offwhite)")
      .style("font-size", "10px")
      .style("font-family", "Space Mono, monospace");

    svg
      .selectAll(".x-axis line")
      .attr("stroke", "rgba(255,255,255,0.06)");

    svg
      .selectAll(".x-axis .domain")
      .attr("stroke", "rgba(255,255,255,0.15)");

    svg
      .selectAll(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).ticks(5, ".0%").tickSize(-width))
      .selectAll("text")
      .style("fill", "var(--offwhite)")
      .style("font-size", "10px")
      .style("font-family", "Space Mono, monospace");

    svg
      .selectAll(".y-axis line")
      .attr("stroke", "rgba(255,255,255,0.06)");

    svg
      .selectAll(".y-axis .domain")
      .attr("stroke", "rgba(255,255,255,0.15)");

    // Axis labels
    svg
      .selectAll(".x-label")
      .data([null])
      .join("text")
      .attr("class", "x-label")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .style("fill", "var(--offwhite)")
      .style("font-size", "11px")
      .style("font-family", "Space Mono, monospace")
      .text(labels.xAxis);

    svg
      .selectAll(".y-label")
      .data([null])
      .join("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .style("fill", "var(--offwhite)")
      .style("font-size", "11px")
      .style("font-family", "Space Mono, monospace")
      .text(labels.yAxis);

    // Data points
    svg
      .selectAll("circle")
      .data(data, (d) => (d as Entry).model)
      .join("circle")
      .attr("cx", (d) => xScale(d.costPerTask))
      .attr("cy", (d) => yScale(d.score))
      .attr("r", 6)
      .attr("fill", (d) => providerColors[d.provider] || "var(--offwhite)")
      .attr("stroke", "var(--offblack)")
      .attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .on("mouseenter", (event, d) => {
        const [cx, cy] = [xScale(d.costPerTask), yScale(d.score)];
        setTooltip({
          x: cx + margin.left,
          y: cy + margin.top,
          entry: d,
        });
      })
      .on("mouseleave", () => setTooltip(null));

    // Model labels
    svg
      .selectAll(".model-label")
      .data(data, (d) => (d as Entry).model)
      .join("text")
      .attr("class", "model-label")
      .attr("x", (d) => xScale(d.costPerTask))
      .attr("y", (d) => yScale(d.score) - 12)
      .attr("text-anchor", "middle")
      .style("fill", "var(--offwhite)")
      .style("font-size", "9px")
      .style("font-family", "Space Mono, monospace")
      .style("pointer-events", "none")
      .text((d) => d.model);

    // Cleanup on unmount: remove all D3 event listeners and DOM
    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, [data, labels]);

  return (
    <div ref={containerRef} className="relative">
      <svg ref={svgRef} />
      {tooltip && (
        <div
          className="absolute bg-[var(--offblack)] border border-white/20 px-3 py-2 text-xs pointer-events-none z-10 rounded-sm"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
          }}
        >
          <div className="font-bold">{tooltip.entry.model}</div>
          <div>
            {labels.tooltipScore}: {(tooltip.entry.score * 100).toFixed(1)}%
          </div>
          <div>
            {labels.tooltipCost}: ${tooltip.entry.costPerTask.toFixed(2)}
          </div>
          <div className="opacity-50">{tooltip.entry.provider}</div>
        </div>
      )}
    </div>
  );
}
