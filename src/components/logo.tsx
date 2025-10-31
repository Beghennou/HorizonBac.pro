
import type { SVGProps } from 'react';

// This is a different logo, used for other purposes.
export function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            {...props}
        >
            <g transform="translate(50,50)">
                <path d="M0 -45 L40 25 L-40 25 Z" fill="hsl(var(--primary))" />
                <text 
                    x="0" 
                    y="10" 
                    fontFamily="Orbitron, sans-serif" 
                    fontWeight="900" 
                    fontSize="40" 
                    fill="white" 
                    textAnchor="middle"
                >
                    RP
                </text>
            </g>
        </svg>
    )
}
