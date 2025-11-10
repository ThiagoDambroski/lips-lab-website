import React from "react";

type Props = {
  text?: string;
  width?: number;
  height?: number;
  fontSize?: number;     // smaller by default
  color?: string;
  lineGap?: number;      // vertical distance between the two lines
  repeatCount?: number;  // how many times to repeat the string
};

export default function CurvedText({
  text = "PRODUTOS LIPS LAB",
  width = 1200,
  height = 260,
  fontSize = 36,
  color = "#d94d8a",
  lineGap = 34,
  repeatCount = 20,
}: Props) {
  // curve path (no fill/stroke -> no background)
  const baseY = height * 0.65;
  const d = `
    M 0 ${baseY}
    C ${width * 0.5} ${baseY - 60},
      ${width * 0.55} ${baseY - 120},
      ${width * 0.80} ${baseY - 90}
    C ${width * 0.92} ${baseY - 75},
      ${width * 1.02} ${baseY - 40},
      ${width * 1.08} ${baseY - 20}
  `;

  const repeat = (s: string, n: number) => Array(n).fill(s).join("   ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" aria-label="Curved text">
      <defs>
        <path id="curve-1" d={d} />
        {/* same curve, shifted down by lineGap */}
        <path id="curve-2" d={d} transform={`translate(0, ${lineGap})`} />
      </defs>

      {/* line 1 */}
      <text fontSize={fontSize} fontWeight={500} fill={color} letterSpacing="1">
        <textPath href="#curve-1" startOffset="0%">
          {repeat(text, repeatCount)}
        </textPath>
      </text>

      {/* line 2 */}
      <text fontSize={fontSize} fontWeight={500} fill={color} letterSpacing="1">
        <textPath href="#curve-2" startOffset="0%">
          {repeat(text, repeatCount)}
        </textPath>
      </text>
    </svg>
  );
}
