"use client";

import dynamic from "next/dynamic";

const ScatterPlotInner = dynamic(
  () => import("@/components/leaderboard/ScatterPlot"),
  {ssr: false}
);

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

export default function ScatterPlotWrapper({data, labels}: Props) {
  return <ScatterPlotInner data={data} labels={labels} />;
}
