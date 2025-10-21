import type { SVGProps } from 'react';

export function LyceeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 150"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0033A0" />
          <stop offset="100%" stopColor="#005BFF" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>
      <ellipse cx="125" cy="75" rx="120" ry="60" fill="url(#logo-gradient)" />
      
      <g stroke="white" strokeWidth="1.5" fill="none" >
        {/* Road */}
        <path d="M 20 100 Q 80 130, 125 100 T 230 80" strokeWidth="2.5" />

        {/* Truck */}
        <path d="M 150 100 L 220 100 L 220 60 L 190 60 L 180 50 L 150 50 Z" />
        <path d="M 150 75 L 120 75 L 110 90 L 150 90" />
        <circle cx="160" cy="100" r="8" strokeWidth="2" />
        <circle cx="210" cy="100" r="8" strokeWidth="2" />

        {/* Car */}
        <path d="M 70 100 C 80 90, 100 90, 110 100 L 120 100 L 125 90 L 115 80 L 85 80 L 75 90 Z" />
        <circle cx="80" cy="100" r="5" strokeWidth="2" />
        <circle cx="115" cy="100" r="5" strokeWidth="2" />

        {/* Text Area */}
        <path d="M 60 70 L 130 70 L 130 50 L 60 50 Z" fill="rgba(0,0,50,0.5)" stroke="none"/>
        <text x="95" y="61" fontFamily="Arial, sans-serif" fontSize="8" fill="white" textAnchor="middle">
          LYCEE ALFRED MONGY
        </text>
      </g>
    </svg>
  );
}
