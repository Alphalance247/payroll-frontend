"use client";

export interface TeamTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

// Team names can run to two words ("Operational Excellence") — wrap them
// onto two lines instead of truncating or overlapping the neighboring label.
const TeamAxisTick = ({ x = 0, y = 0, payload }: TeamTickProps) => {
  const words = String(payload?.value ?? "").split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word, index) => (
        <text
          key={word}
          x={0}
          y={0}
          dy={12 + index * 14}
          textAnchor="middle"
          fontSize={12}
          fill="#71717A"
        >
          {word}
        </text>
      ))}
    </g>
  );
};

export default TeamAxisTick;
