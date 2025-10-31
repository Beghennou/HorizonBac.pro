
import type { SVGProps } from 'react';

export function LyceeLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            {...props}
        >
            <g transform="translate(50,50)">
                <path d="M0 -45 L40 25 L-40 25 Z" fill="hsl(var(--accent))" />
                <text 
                    x="0" 
                    y="10" 
                    fontFamily="Orbitron, sans-serif" 
                    fontWeight="900" 
                    fontSize="40" 
                    fill="white" 
                    textAnchor="middle"
                >
                    HB
                </text>
            </g>
        </svg>
    )
}
