'use client';

import React from 'react';
import { LyceeLogo } from './lycee-logo';
import { BookOpen, Car, Wrench } from 'lucide-react';

const SkillCircuitAnimation = () => {
    return (
        <svg viewBox="0 0 400 200" className="w-full h-auto max-w-lg">
            <defs>
                <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
            </defs>

            {/* Circuit Path */}
            <path
                d="M 20 100 C 80 20, 120 20, 180 100 S 280 180, 380 100"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="620"
                strokeDashoffset="620"
                className="animate-draw-circuit"
            />
            
             {/* Icons that appear at key points */}
            <g className="animate-icon-appear-1">
                 <Wrench x="70" y="35" width="24" height="24" className="text-accent"/>
            </g>
            <g className="animate-icon-appear-2">
                <BookOpen x="188" y="125" width="24" height="24" className="text-accent" />
            </g>
            <g className="animate-icon-appear-3">
                 <Car x="300" y="55" width="24" height="24" className="text-accent" />
            </g>

            <style jsx>{`
                @keyframes draw-circuit {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                .animate-draw-circuit {
                    animation: draw-circuit 2s ease-out forwards;
                }

                @keyframes icon-appear {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-icon-appear-1 {
                    opacity: 0;
                    animation: icon-appear 0.5s 0.5s ease-out forwards;
                }
                .animate-icon-appear-2 {
                    opacity: 0;
                    animation: icon-appear 0.5s 1s ease-out forwards;
                }
                 .animate-icon-appear-3 {
                    opacity: 0;
                    animation: icon-appear 0.5s 1.5s ease-out forwards;
                }
            `}</style>
        </svg>
    );
};


export const TachometerAnimation = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
             <div className="w-full max-w-sm p-4">
                <SkillCircuitAnimation />
            </div>
            <div className="flex items-center gap-4 animate-logo-appear">
                 <LyceeLogo className="w-16 h-16"/>
                 <p className="font-headline text-2xl tracking-widest text-accent">ACCÈS AUTORISÉ</p>
            </div>
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }

                 @keyframes logo-appear {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-logo-appear {
                    opacity: 0;
                    animation: logo-appear 0.8s 2s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
