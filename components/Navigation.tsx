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
    const heroEl = document.getElementById("hero");

    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : 0;
      const pastHero = heroBottom < 80;

      if (pastHero) {
        // Light nav — over content sections
        nav.classList.add("bg-bg/90", "border-b-border-custom");
        nav.classList.remove("bg-transparent", "border-b-transparent");
        // Swap text colours back to dark
        nav.querySelectorAll(".nav-light-text").forEach((el) =>
          el.classList.remove("text-white/80")
        );
        // omenai.app outline button → deepblue
        nav.querySelectorAll(".nav-cta-outline").forEach((el) => {
          el.classList.remove("border-white/60", "text-white", "hover:bg-white/10");
          el.classList.add("border-deepblue", "text-deepblue", "hover:bg-deepblue", "hover:text-white");
        });
        // Logo → dark (normal)
        nav.querySelectorAll(".nav-logo-img").forEach((el) => {
          el.classList.remove("brightness-0", "invert");
        });
      } else {
        // Transparent nav — floating over hero
        nav.classList.remove("bg-bg/90", "border-b-border-custom");
        nav.classList.add("bg-transparent", "border-b-transparent");
        // Make text white so it reads on dark hero
        nav.querySelectorAll(".nav-light-text").forEach((el) =>
          el.classList.add("text-white/80")
        );
        // omenai.app outline button → white
        nav.querySelectorAll(".nav-cta-outline").forEach((el) => {
          el.classList.remove("border-deepblue", "text-deepblue", "hover:bg-deepblue", "hover:text-white");
          el.classList.add("border-white/60", "text-white", "hover:bg-white/10");
        });
        // Logo → white
        nav.querySelectorAll(".nav-logo-img").forEach((el) => {
          el.classList.add("brightness-0", "invert");
        });
      }
    };

    // Run immediately in case page loaded mid-scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // Initial entrance animation
    gsap.to([".nav-logo", ".nav-indicator", ".nav-dot", ".nav-cta"], {
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
          dot.classList.add("h-[34px]", "opacity-100", "bg-deepblue", "rounded-[4px]");
          dot.classList.remove("h-[4px]", "opacity-22", "bg-ink", "rounded-full");
        } else {
          dot.classList.add("h-[4px]", "opacity-22", "bg-ink", "rounded-full");
          dot.classList.remove("h-[34px]", "opacity-100", "bg-deepblue", "rounded-[4px]");
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
        className="fixed top-0 left-0 right-0 z-[100] px-[5vw] py-6 md:px-16 md:py-[1.8rem] flex items-center justify-between bg-transparent backdrop-blur-md border-b border-b-transparent transition-all duration-500"
      >
        <div className="nav-logo opacity-0 flex items-center gap-2">
          <img src="/omenai_logo.png" alt="Omenai Logo" className="nav-logo-img h-8 w-auto transition-[filter] duration-500 brightness-0 invert" />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-10">
            <span
              ref={indicatorRef}
              className="nav-indicator nav-light-text text-[0.68rem] tracking-[0.25em] text-muted uppercase opacity-0 transition-colors duration-500"
            >
              Overview
            </span>
            <div className="nav-dot w-[6px] h-[6px] bg-gold rounded-full opacity-0" />
          </div>
          <div className="hidden md:flex gap-3 opacity-0 nav-cta">
             <a
               href="https://omenai.app"
               target="_blank"
               rel="noreferrer"
               className="nav-cta-outline px-4 py-2 text-xs border border-white/60 text-white hover:bg-white/10 transition-colors duration-300 rounded-full uppercase tracking-wider"
             >
               omenai.app
             </a>
             <a href="#" className="px-4 py-2 text-xs bg-deepblue text-white hover:opacity-90 transition-opacity rounded-full uppercase tracking-wider">
               Download App
             </a>
          </div>
        </div>
      </nav>

      {/* Chapter Rail */}
      <div
        className="chapter-rail fixed z-[80] left-[1.4rem] top-1/2 -translate-y-1/2 hidden md:grid gap-3"
        aria-hidden="true"
      >
        <span className="w-[4px] h-[34px] rounded-[4px] opacity-100 bg-deepblue transition-all duration-350" />
        <span className="w-[4px] h-[4px] rounded-full opacity-22 bg-ink transition-all duration-350" />
        <span className="w-[4px] h-[4px] rounded-full opacity-22 bg-ink transition-all duration-350" />
        <span className="w-[4px] h-[4px] rounded-full opacity-22 bg-ink transition-all duration-350" />
        <span className="w-[4px] h-[4px] rounded-full opacity-22 bg-ink transition-all duration-350" />
      </div>
    </>
  );
}
