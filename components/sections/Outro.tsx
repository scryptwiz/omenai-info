"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Outro() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 72%",
        end: "bottom bottom",
        scrub: 0.7,
      },
    });

    tl.to(".outro-eyebrow", { autoAlpha: 1 })
      .to(
        ".outro-title-word",
        { y: "0%", stagger: 0.08, duration: 1.5, ease: "power4.out" },
        0,
      )
      .fromTo(
        ".outro-title em",
        { xPercent: -15 },
        { xPercent: 10, duration: 2 },
        0,
      )
      .to(".outro-url-wrap", { autoAlpha: 1, duration: 0.7 }, 0.9)
      .fromTo(
        ringRef.current,
        { scale: 0.45, rotation: -90 },
        { scale: 1.15, rotation: 35, duration: 2.2 },
        0,
      );

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="outro"
      ref={sectionRef}
      className="relative min-h-[85svh] md:min-h-screen flex items-center py-24 px-[6vw] md:py-32 md:px-[8vw] bg-deepblue overflow-hidden"
    >
      {/* Gold atmospheric radial glow — warmth behind the headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 28% 55%, rgba(176,141,64,0.11) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={ringRef}
        className="absolute w-[55vw] aspect-square border border-gold/35 rounded-full right-[-20vw] top-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="absolute inset-[12%] border border-gold/20 rounded-full" />
        <div className="absolute inset-[26%] border border-gold/20 rounded-full" />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-center relative z-10">
        <div>
          <p className="outro-eyebrow text-[0.62rem] tracking-[0.35em] text-gold uppercase mb-6 opacity-0 flex items-center gap-4">
            <span className="inline-block w-6 h-[1px] bg-gold" />
            Omenai Platform
          </p>
          <h2
            className="font-serif text-[clamp(3.5rem,17vw,6.4rem)] md:text-[clamp(4rem,10vw,11rem)] font-light leading-[0.77] text-[#F4F4F4]"
            aria-label="The art world reimagined for Africa"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="outro-title-word inline-block translate-y-[110%]">
                The
              </span>
              &nbsp;
              <span className="outro-title-word inline-block translate-y-[110%]">
                art
              </span>
              &nbsp;
              <span className="outro-title-word inline-block translate-y-[110%]">
                world
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <em className="outro-title-word inline-block translate-y-[110%] italic text-gold pr-8">
                reimagined
              </em>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="outro-title-word inline-block translate-y-[110%]">
                for
              </span>
              &nbsp;
              <span className="outro-title-word inline-block translate-y-[110%]">
                Africa.
              </span>
            </span>
          </h2>
        </div>

        <div className="outro-url-wrap text-left md:text-right opacity-0 flex flex-col items-start md:items-end gap-6 mt-12 md:mt-0">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-end gap-4 w-full">
            {/* App Store Button */}
            <a
              href="https://apps.apple.com/ng/app/omenai/id6748387089"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-target flex items-center justify-center gap-3 bg-white text-deepblue px-6 py-4 rounded-full font-sans font-medium text-[0.7rem] tracking-[0.2em] uppercase hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 w-full sm:w-auto whitespace-nowrap"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.88 2.22 0 4.1 1.05 5.22 2.62-4.14 2.1-3.29 7.6 1.16 9.32-1.06 2.4-2.82 5.09-4.96 5.11zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              iOS
            </a>

            {/* Play Store Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.omenai.omenaiapp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-target flex items-center justify-center gap-3 bg-white text-deepblue px-6 py-4 rounded-full font-sans font-medium text-[0.7rem] tracking-[0.2em] uppercase hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 w-full sm:w-auto whitespace-nowrap"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.52 14.53l-2.4-2.4 2.4-2.4 2.8 1.58c.85.48.85 1.25 0 1.73l-2.8 1.49zm-3.52-3.52l-9.33-9.33C4.24 1.27 4 1.46 4 1.83v20.34c0 .38.24.57.67.14l9.33-9.33zm1.06-1.06l2.1-2.1-9.97-5.6 7.87 7.7zm0 2.12l-7.87 7.7 9.97-5.6-2.1-2.1z"/>
              </svg>
              Android
            </a>
            
            {/* Web App Button */}
            <a
              href="https://omenai.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-target flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white px-6 py-4 rounded-full font-sans font-medium text-[0.7rem] tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/40 transition-colors duration-300 w-full sm:w-auto whitespace-nowrap"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Web App
            </a>
          </div>
          <span className="block text-[0.65rem] tracking-[0.2em] text-[#F4F4F4]/50 uppercase mt-2">
            Available worldwide
          </span>
        </div>
      </div>
    </section>
  );
}
