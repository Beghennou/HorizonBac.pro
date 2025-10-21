import type { SVGProps } from 'react';

export function LyceeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      <g transform="translate(50,50) rotate(-15)">
        {/* Clé mécanique */}
        <path 
            d="M-35 -15 a12,12 0 1,1 0,30 l30 0 a15,15 0 1,0 0,-30 Z" 
            fill="none" 
            stroke="hsl(var(--accent))" 
            strokeWidth="5"
        />
        <circle cx="-35" cy="0" r="5" fill="hsl(var(--accent))" />
      </g>
      <g transform="translate(50,50)">
          {/* Texte HB */}
          <text 
              x="0" 
              y="10" 
              fontFamily="Orbitron, sans-serif" 
              fontWeight="900" 
              fontSize="48" 
              fill="currentColor"
              textAnchor="middle"
              stroke="hsl(var(--background))"
              strokeWidth="3"
              paintOrder="stroke"
          >
              HB
          </text>
      </g>
    </svg>
  );
}
