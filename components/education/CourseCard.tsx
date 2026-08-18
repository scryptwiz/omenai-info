"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  imageSrc: string;
  duration: string;
  level: string;
}

export default function CourseCard({ id, title, instructor, imageSrc, duration, level }: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (imgRef.current && infoRef.current) {
      gsap.to(imgRef.current, { scale: 1.08, duration: 0.8, ease: "power3.out" });
      gsap.to(infoRef.current, { y: -5, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current && infoRef.current) {
      gsap.to(imgRef.current, { scale: 1, duration: 0.8, ease: "power3.out" });
      gsap.to(infoRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <Link href={`/education/${id}`} className="block group h-full">
      <div 
        ref={cardRef}
        className="flex flex-col gap-5 hover-target p-4 md:p-6 bg-white/40 hover:bg-white rounded-sm transition-colors duration-500 shadow-sm border border-border-custom hover:shadow-xl h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
          <Image 
            ref={imgRef}
            src={imageSrc} 
            alt={title} 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/5 pointer-events-none transition-colors duration-500 group-hover:bg-transparent" />
          
          <div className="absolute top-3 left-3 bg-[#f3f0e9]/90 backdrop-blur-md border border-border-custom px-3 py-1 rounded-full flex items-center justify-center">
            <span className="text-[0.6rem] uppercase tracking-widest text-gold font-sans font-medium leading-none pb-[1px]">
              Masterclass
            </span>
          </div>
          
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#f3f0e9]/90 backdrop-blur-md px-2 py-1 rounded-sm border border-border-custom">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span className="text-[0.65rem] text-ink font-sans font-medium">{duration}</span>
          </div>
        </div>
        
        <div ref={infoRef} className="flex flex-col flex-1">
          <h3 className="font-serif text-xl font-normal text-ink group-hover:text-gold transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="font-sans text-sm text-ink/60 mt-2 uppercase tracking-wider text-[0.7rem]">
            by {instructor}
          </p>
          <div className="flex gap-3 mt-auto pt-4 text-[0.65rem] uppercase tracking-widest text-ink/40">
            <span>{level}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
