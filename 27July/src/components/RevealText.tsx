"use client";

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface RevealTextProps {
  text: string;
  className?: string;
}

export default function RevealText({ text, className }: RevealTextProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Split text by words, preserving multiple spaces if necessary, but standard split is fine
  const words: string[] = text.trim().split(/\s+/);

  return (
    <span ref={ref} className={clsx("inline-block", className)}>
      {words.map((word: string, i: number) => (
        <span 
          key={`${word}-${i}`} 
          className="overflow-hidden inline-block mr-3 md:mr-5 lg:mr-6 align-bottom pb-1 md:pb-3"
        >
          <span
            className={clsx(
              "inline-block transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              isVisible ? "translate-y-0" : "translate-y-[110%]"
            )}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}