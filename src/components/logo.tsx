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
            <g transform="translate(15, 10) scale(0.7)">
                <path 
                    d="M96.23,39.2l-2.48,8.27c-1,3.32-4.13,5.53-7.58,5.53h-9.92c-0.2,0-0.39,0.06-0.57,0.16c-3.13,1.75-6.6,3.15-10.27,4.01 c-3.83,0.89-6.33,4.4-6.33,8.37v21.8c0,0.5-0.17,0.98-0.47,1.38c-0.3,0.4-0.74,0.62-1.2,0.62H42.7c-0.46,0-0.9-0.22-1.2-0.62 c-0.3-0.4-0.47-0.88-0.47-1.38V87.33c0-3.97-2.5-7.48-6.33-8.37c-3.67-0.86-7.14-2.26-10.27-4.01c-0.18-0.1-0.37-0.16-0.57-0.16 h-9.92c-3.45,0-6.59-2.21-7.58-5.53L3.77,39.2C2.7,35.6,4.45,31.7,8.08,30.34l38.25-14.5c2.42-0.92,5.12-0.92,7.54,0l38.25,14.5 C95.55,31.7,97.3,35.6,96.23,39.2z"
                    fill="white"
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