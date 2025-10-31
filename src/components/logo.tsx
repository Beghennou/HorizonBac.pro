import type { SVGProps } from 'react';

// This is the main logo for the application
export function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            {...props}
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--racing-orange))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="20" fill="url(#logoGradient)" />
            
            {/* Clé plate stylisée */}
            <g transform="translate(25, 18) scale(0.55) rotate(-45 50 50)">
                <path 
                    d="M48.7,9.6l-7.1-7.1c-2.2-2.2-5.8-2.2-7.9,0l-7.1,7.1c-1.4,1.4-2.1,3.3-1.8,5.1l3.5,21.3c0.3,1.8,1.4,3.4,3,4.4 L50,57.1l28.6-16.7c1.6-1,2.7-2.5,3-4.4l3.5-21.3c0.3-1.8-0.4-3.7-1.8-5.1l-7.1-7.1C72.1,7.4,68.5,7.4,66.4,9.6l-7.1,7.1 c-1.4,1.4-3.3,2.1-5.1,1.8L48.7,9.6z M30.8,18.5c-2.2-2.2-2.2-5.8,0-7.9l7.1-7.1c1.1-1.1,2.5-1.6,4-1.6s2.9,0.5,4,1.6l7.1,7.1 c2.2,2.2,2.2,5.8,0,7.9c-1.1,1.1-2.5,1.6-4,1.6s-2.9-0.5-4-1.6L38.8,10.4c-2.2-2.2-5.8-2.2-7.9,0L23,18.5 c-1.1,1.1-1.6,2.5-1.6,4s0.5,2.9,1.6,4l7.9,7.9c1.1,1.1,2.5,1.6,4,1.6s2.9-0.5,4-1.6l7.9-7.9c2.2-2.2,2.2-5.8,0-7.9L38.8,18.5 C34.9,14.6,30.8,18.5,30.8,18.5z"
                    fill="white"
                    transform="translate(-10, 10)"
                />
            </g>

            <text 
                x="50" 
                y="85" 
                fontFamily="Orbitron, sans-serif" 
                fontWeight="900" 
                fontSize="28" 
                fill="white" 
                textAnchor="middle"
            >
                HB
            </text>
        </svg>
    )
}
