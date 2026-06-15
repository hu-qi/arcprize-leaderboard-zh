"use client";

import React, {useState, useCallback} from "react";
import {useTranslations} from "next-intl";
import GameGrid from "./GameGrid";

// Sample ARC puzzle data (vc33)
const SAMPLE_TASK = {
  id: "vc33",
  train: [
    {
      input: [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]],
      output: [[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]],
    },
    {
      input: [[0,0,0,0],[0,2,0,0],[0,2,0,0],[0,0,0,0]],
      output: [[0,0,0,0],[0,0,0,0],[0,2,2,0],[0,0,0,0]],
    },
  ],
  test: {
    input: [[0,0,0,0,0],[0,0,3,0,0],[0,0,3,0,0],[0,0,0,0,0],[0,0,0,0,0]],
    output: [[0,0,0,0,0],[0,0,0,0,0],[0,3,3,0,0],[0,0,0,0,0],[0,0,0,0,0]],
  },
};

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

export default function ShellPuzzle({taskId, labels}: Props) {
  const [selectedExample, setSelectedExample] = useState(0);
  const [userGrid, setUserGrid] = useState<number[][]>(
    SAMPLE_TASK.test.input.map((row) => [...row])
  );
  const [activeColor, setActiveColor] = useState(3);

  const handleCellClick = useCallback((row: number, col: number) => {
    setUserGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = activeColor;
      return next;
    });
  }, [activeColor]);

  const handleReset = () => {
    setUserGrid(SAMPLE_TASK.test.input.map((row) => [...row]));
  };

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Shell Container */}
      <div className="relative bg-[#1a1a2e] rounded-lg border-4 border-[#333] p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Bezel Top */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] uppercase tracking-widest text-[var(--yellow)] font-bold">
            ARC-AGI
          </div>
          <div className="flex gap-2">
            {SAMPLE_TASK.train.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedExample(i)}
                className={`px-2 py-0.5 text-[10px] rounded-sm ${
                  selectedExample === i
                    ? "bg-[var(--yellow)] text-[var(--offblack)]"
                    : "bg-white/10 text-[var(--offwhite)]"
                }`}
              >
                {labels.example} {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Screen Area */}
        <div className="bg-[#0a0a1a] rounded-sm p-4 relative overflow-hidden">
          {/* CRT Scanlines */}
          <div className="crt-scanlines" />

          {/* Training Examples */}
          <div className="relative z-1 mb-6">
            <div className="flex gap-8 justify-center items-start">
              <GameGrid
                grid={SAMPLE_TASK.train[selectedExample].input}
                label={labels.input}
              />
              <div className="text-2xl text-[var(--yellow)] self-center">→</div>
              <GameGrid
                grid={SAMPLE_TASK.train[selectedExample].output}
                label={labels.output}
              />
            </div>
          </div>

          {/* Test Puzzle */}
          <div className="relative z-1">
            <div className="flex gap-8 justify-center items-start">
              <GameGrid
                grid={SAMPLE_TASK.test.input}
                label={labels.input}
              />
              <div className="text-2xl text-[var(--yellow)] self-center">→</div>
              <GameGrid
                grid={userGrid}
                label={labels.output}
                interactive
                onCellClick={handleCellClick}
              />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          {/* Color Palette */}
          <div className="flex gap-1">
            {[0,1,2,3,4,5,6,7,8,9].map((c) => (
              <button
                key={c}
                onClick={() => setActiveColor(c)}
                className={`w-6 h-6 rounded-sm border-2 transition-all ${
                  activeColor === c
                    ? "border-[var(--yellow)] scale-110"
                    : "border-transparent hover:border-white/30"
                }`}
                style={{
                  backgroundColor: [
                    "#000","#0074D9","#FF4136","#2ECC40","#FFDC00",
                    "#AAAAAA","#F012BE","#FF851B","#7FDBFF","#870000"
                  ][c],
                }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="button text-[10px]"
            >
              {labels.reset}
            </button>
            <button className="button primary text-[10px]">
              {labels.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
