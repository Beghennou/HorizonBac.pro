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
            
            <text 
                x="50" 
                y="58" 
                fontFamily="Orbitron, sans-serif" 
                fontWeight="900" 
                fontSize="48" 
                fill="white" 
                textAnchor="middle"
                letterSpacing="-2"
                dominantBaseline="middle"
            >
                HB
            </text>
        </svg>
    )
}
