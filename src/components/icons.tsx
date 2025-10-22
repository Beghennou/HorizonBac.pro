import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
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
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">RP</text>
        </svg>
    )
}

export function SteeringWheel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="12" x2="12" y2="2" />
      <line x1="12" y1="12" x2="20.5" y2="8.5" />
      <line x1="12" y1="12" x2="20.5" y2="15.5" />
      <line x1="12" y1="12" x2="3.5" y2="15.5" />
      <line x1="12" y1="12" x2="3.5" y2="8.5" />
    </svg>
  );
}

export function RacingHelmet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 0 0-10 10v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a10 10 0 0 0-10-10z" />
      <path d="M8 12h8" />
      <path d="M19.5 13H18" />
      <path d="M4.5 13H6" />
      <path d="M12 18v-6" />
      <path d="M12 22v-4" />
    </svg>
  );
}

export function CheckeredFlag(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
            <path d="M4 3h2v2H4z" />
            <path d="M8 3h2v2H8z" />
            <path d="M12 3h2v2h-2z" />
            <path d="M16 3h2v2h-2z" />
            <path d="M6 5h2v2H6z" />
            <path d="M10 5h2v2h-2z" />
            <path d="M14 5h2v2h-2z" />
            <path d="M18 5h2v2h-2z" />
            <path d="M4 7h2v2H4z" />
            <path d="M8 7h2v2H8z" />
            <path d="M12 7h2v2h-2z" />
            <path d="M16 7h2v2h-2z" />
        </svg>
    )
}

export function Award(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

export function Trophy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.1-1 1H4" />
      <path d="M14 14.66V17c0 .55.47.1 1 1h5" />
      <path d="M9 18h6" />
      <path d="M12 6V5" />
      <path d="M6 5H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 5h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M8 2h8" />
      <path d="M12 17.5V22" />
      <path d="M12 6a7 7 0 0 0-7 7c0 3.33 2.67 6.67 7 10 4.33-3.33 7-6.67 7-10a7 7 0 0 0-7-7z" />
    </svg>
  );
}
