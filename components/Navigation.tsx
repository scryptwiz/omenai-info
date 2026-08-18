"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 30) {
          navRef.current.classList.add("border-b-border-custom");
          navRef.current.classList.remove("border-b-transparent");
        } else {
          navRef.current.classList.add("border-b-transparent");
          navRef.current.classList.remove("border-b-border-custom");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // Initial entrance animation
    gsap.to([".nav-logo", ".nav-indicator", ".nav-dot"], {
      autoAlpha: 1,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
      delay: 1.5, // wait for loader
    });

    // Scroll progress bar
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });
    }

    // Define chapters and their corresponding text
    const chapters = [
      { id: "hero", text: "Overview" },
      { id: "does", text: "The Ecosystem" },
      { id: "payment", text: "Transactions" },
      { id: "shipping", text: "Logistics" },
      { id: "outro", text: "Discover" },
    ];

    const updateChapter = (index: number, text: string) => {
      // Update rail dots
      document.querySelectorAll(".chapter-rail span").forEach((dot, i) => {
        if (i === index) {
          dot.classList.add("h-[34px]", "opacity-100", "bg-gold", "rounded-[4px]");
          dot.classList.remove("h-[4px]", "opacity-22", "bg-ink", "rounded-full");
        } else {
          dot.classList.add("h-[4px]", "opacity-22", "bg-ink", "rounded-full");
          dot.classList.remove("h-[34px]", "opacity-100", "bg-gold", "rounded-[4px]");
        }
      });

      // Swap label text
      if (indicatorRef.current && indicatorRef.current.textContent !== text) {
        gsap.to(indicatorRef.current, {
          autoAlpha: 0,
          y: -7,
          duration: 0.18,
          onComplete: () => {
            if (indicatorRef.current) {
              indicatorRef.current.textContent = text;
              gsap.fromTo(
                indicatorRef.current,
                { y: 7 },
                { autoAlpha: 1, y: 0, duration: 0.3 }
              );
            }
          },
        });
      }
    };

    chapters.forEach((chapter, index) => {
      ScrollTrigger.create({
        trigger: `#${chapter.id}`,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => updateChapter(index, chapter.text),
        onEnterBack: () => updateChapter(index, chapter.text),
      });
    });
  }, []);

  return (
    <>
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[2px] bg-gold z-[1000] origin-left scale-x-0 w-full"
      />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] px-[5vw] py-6 md:px-16 md:py-[1.8rem] flex items-center justify-between bg-bg/85 backdrop-blur-md border-b border-b-transparent transition-colors duration-400"
      >
        <span className="nav-logo font-serif text-[1.15rem] tracking-[0.18em] text-ink uppercase opacity-0">
          Omenai
        </span>
        <div className="flex items-center gap-10">
          <span
            ref={indicatorRef}
            className="nav-indicator text-[0.68rem] tracking-[0.25em] text-muted uppercase opacity-0"
          >
            Overview
          </span>
          <div className="nav-dot w-[6px] h-[6px] bg-gold rounded-full opacity-0" />
        </div>
      </nav>

      {/* Chapter Rail */}
      <div
        className="chapter-rail fixed z-[80] left-[1.4rem] top-1/2 -translate-y-1/2 hidden md:grid gap-3"
        aria-hidden="true"
      >
        <span className="w-[4px] h-[34px] rounded-[4px] opacity-100 bg-gold transition-all duration-350" />
        <span className="w-[4px] h-[4px] rounded-full opacity-22 bg-ink transition-all duration-350" />
        <span className="w-[4px] h-[4px] rounded-full opacity-22 bg-ink transition-all duration-350" />
        <span className="w-[4px] h-[4px] rounded-full opacity-22 bg-ink transition-all duration-350" />
        <span className="w-[4px] h-[4px] rounded-full opacity-22 bg-ink transition-all duration-350" />
      </div>
    </>
  );
}
