"use client";

import React, {useState, useCallback} from "react";

// ARC-AGI color palette (10 colors)
const ARC_COLORS = [
  "#000000", // 0: black
  "#0074D9", // 1: blue
  "#FF4136", // 2: red
  "#2ECC40", // 3: green
  "#FFDC00", // 4: yellow
  "#AAAAAA", // 5: gray
  "#F012BE", // 6: magenta
  "#FF851B", // 7: orange
  "#7FDBFF", // 8: light blue
  "#870000", // 9: dark red
];

type Props = {
  grid: number[][];
  interactive?: boolean;
  onCellClick?: (row: number, col: number) => void;
  label?: string;
};

export default function GameGrid({grid, interactive = false, onCellClick, label}: Props) {
  if (!grid || grid.length === 0) return null;

  const rows = grid.length;
  const cols = grid[0].length;
  const cellSize = Math.min(Math.floor(240 / Math.max(rows, cols)), 30);

  return (
    <div className="inline-block">
      {label && (
        <div className="text-[10px] uppercase tracking-wider opacity-50 mb-1 text-center">
          {label}
        </div>
      )}
      <div
        className="inline-grid border border-white/20"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap: "1px",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`${interactive ? "cursor-pointer hover:opacity-80" : ""} transition-colors`}
              style={{
                backgroundColor: cell >= 0 && cell < ARC_COLORS.length
                  ? ARC_COLORS[cell]
                  : "#000000",
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
              onClick={() => interactive && onCellClick?.(r, c)}
            />
          ))
        )}
      </div>
    </div>
  );
}
