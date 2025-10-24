
'use client';

import { Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LyceeLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Wrench className="w-full h-full" {...props} />
      <span className="absolute -top-1 font-headline text-xs font-bold" style={{ textShadow: '0 0 3px hsl(var(--background))' }}>
        HB
      </span>
    </div>
  );
}
