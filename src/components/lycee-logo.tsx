'use client';

import type { SVGProps } from 'react';

export function LyceeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <text 
        x="12" 
        y="8" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fontSize="8" 
        fontWeight="bold" 
        fill="currentColor"
        className="font-headline"
      >
        HB
      </text>
      <path d="M14.7 10.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
