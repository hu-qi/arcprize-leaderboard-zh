"use client";

import dynamic from "next/dynamic";

const ShellPuzzleInner = dynamic(
  () => import("@/components/tasks/ShellPuzzle"),
  {ssr: false}
);

type Props = {
  taskId?: string;
  labels: {
    input: string;
    output: string;
    example: string;
    start: string;
    reset: string;
    submit: string;
  };
};

export default function ShellPuzzleWrapper({taskId, labels}: Props) {
  return <ShellPuzzleInner taskId={taskId} labels={labels} />;
}
