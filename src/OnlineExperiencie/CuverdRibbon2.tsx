import React from "react";

type Props = {
  text?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
  repeatCount?: number;
};

export default function CurvedText({
  text = "AGORA É CONTIGO!",
  width = 1200,
  height = 210,
  fontSize = 36,
  color = "#c41123",
  repeatCount = 20,
}: Props) {
  // linha base “virtual”
  const baseY = height * 0.7;
  const curveHeight = 45; // intensidade da curvatura

  // curva: sobe bastante à esquerda, achata no meio e desce SUAVEMENTE à direita
  const d = `
    M 0 ${baseY}
    C ${width * 0.10} ${baseY - curveHeight * 1.5},
      ${width * 0.28} ${baseY - curveHeight * 1.4},
      ${width * 0.45} ${baseY - curveHeight * 0.7}
    C ${width * 0.62} ${baseY - curveHeight * 0.6},
      ${width * 0.80} ${baseY - curveHeight * 0.2},
      ${width}       ${baseY - curveHeight * 0.5}
  `;

  const repeat = (s: string, n: number) => Array(n).fill(s).join("   ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      aria-label="Curved text"
    >
      <defs>
        <path id="curve-1" d={d} fill="none" />
      </defs>

      <text
        fontSize={fontSize}
        fontWeight={500}
        fill={color}
        letterSpacing="1"
      >
        <textPath href="#curve-1" startOffset="0%">
          {repeat(text, repeatCount)}
        </textPath>
      </text>
    </svg>
  );
}
