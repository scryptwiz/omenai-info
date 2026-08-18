"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial entrance animations
    const heroIntro = gsap.timeline({ delay: 1.5 }); // Wait for loader
    
    heroIntro
      .to(frameRef.current, { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "expo.inOut" })
      .to(imgRef.current, { scale: 1.06, duration: 1.8, ease: "power3.out" }, "-=0.75")
      .to(".hero-eyebrow", { autoAlpha: 1, x: 0, duration: 0.7 }, "-=1.25")
      .to(".hero-title .word", { y: "0%", duration: 1.2, stagger: 0.06, ease: "power4.out" }, "-=1.1")
      .to([".hero-desc", ".hero-meta"], { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.6")
      .fromTo(
        [orbitRef.current, ".hero-vertical", ".scroll-cue"],
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8, stagger: 0.08 },
        "-=0.5"
      );

    // Scroll animations
    gsap.to(imgRef.current, {
      yPercent: 18,
      scale: 1.18,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(leftRef.current, {
      yPercent: 28,
      autoAlpha: 0.12,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "25% top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(orbitRef.current, {
      rotation: 170,
      scale: 1.45,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[105svh] md:min-h-[115vh] overflow-hidden bg-[#d9d0c0] block p-0"
    >
      <div
        ref={leftRef}
        className="relative z-[2] min-h-[100vh] w-full md:w-[min(920px,88vw)] pt-[18vh] pb-[12vh] px-[6vw] md:pt-[22vh] md:pb-[13vh] md:pl-[8vw] md:pr-0 text-[#f7f4ef]"
      >
        <p className="hero-eyebrow flex items-center gap-4 text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-10 opacity-0">
          <span className="inline-block w-8 h-[1px] bg-gold scale-x-100 origin-left" />
          01 &mdash; What is Omenai
        </p>

        <h1
          className="hero-title font-serif text-[clamp(3.4rem,16vw,6rem)] md:text-[clamp(4rem,9.2vw,10.5rem)] font-light leading-[0.82] md:leading-[0.78] tracking-[-0.01em] text-[#f7f4ef]"
          aria-label="Discover and collect Contemporary African Art"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <em className="word inline-block translate-y-[110%] not-italic italic text-gold">Discover</em>
          </span>
          <span className="block overflow-hidden pb-[0.06em] md:pl-[8vw]">
            <span className="word inline-block translate-y-[110%]">and</span>&nbsp;
            <span className="word inline-block translate-y-[110%]">collect</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <em className="word inline-block translate-y-[110%] not-italic italic text-gold">Contemporary</em>
          </span>
          <span className="block overflow-hidden pb-[0.06em] md:pl-[8vw]">
            <span className="word inline-block translate-y-[110%]">African</span>&nbsp;
            <span className="word inline-block translate-y-[110%]">Art.</span>
          </span>
        </h1>

        <p className="hero-desc mt-12 text-[0.88rem] leading-[1.85] text-white/74 max-w-[380px] md:ml-[9vw] opacity-0">
          Omenai is the premier digital marketplace dedicated exclusively to
          contemporary African art — connecting collectors, galleries, and
          artists across Africa and its diaspora through a curated web platform
          and mobile app.
        </p>

        <div className="hero-meta mt-10 flex flex-wrap items-center gap-[0.5rem] md:gap-6 md:ml-[9vw] opacity-0">
          <span className="text-[0.65rem] tracking-[0.15em] py-[0.45rem] px-[1.1rem] uppercase rounded-none bg-gold text-white border border-gold">
            Web &amp; Mobile
          </span>
          <span className="text-[0.65rem] tracking-[0.15em] py-[0.45rem] px-[1.1rem] uppercase rounded-none text-white/70 border border-white/25">
            Africa &amp; Diaspora
          </span>
          <span className="text-[0.65rem] tracking-[0.15em] py-[0.45rem] px-[1.1rem] uppercase rounded-none text-white/70 border border-white/25">
            Curated
          </span>
        </div>
      </div>

      <div className="hero-right absolute inset-0 w-full h-[105svh] md:h-[115vh] min-h-0">
        <div
          ref={frameRef}
          className="hero-img-frame absolute inset-0 overflow-hidden opacity-100 rounded-none transform-none [clip-path:inset(0_0_100%_0)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#13120f]/78 via-[#13120f]/35 to-[#13120f]/5 z-[1]" />
          <Image
            ref={imgRef}
            src="/images/gallery_auth.jpg"
            alt="Contemporary African abstract art"
            fill
            className="object-cover transform scale-[1.16] saturate-[0.72] contrast-[1.06]"
            priority
          />
          <span className="hero-img-caption absolute z-[2] bottom-8 ml-[65vw] whitespace-nowrap text-[0.62rem] tracking-[0.2em] text-white/70 uppercase bg-[#1c1a17]/35 backdrop-blur-md py-[0.6rem] px-4 rounded-sm hidden md:block">
            Contemporary African Art — Omenai Collection
          </span>
        </div>
        
        <div
          className="hero-number absolute font-serif font-light text-white/20 leading-none select-none top-[16vh] right-[1.5rem] text-[12vw]"
          aria-hidden="true"
        >
          01
        </div>
        
        <div
          ref={orbitRef}
          className="hero-orbit absolute z-[3] aspect-square border border-white/25 rounded-full hidden md:block w-[75vw] right-[-38vw] top-[10vh] md:w-[32vw] md:right-[-10vw] md:top-[21vh]"
          aria-hidden="true"
        >
          <div className="absolute w-[10px] h-[10px] rounded-full bg-gold left-[7%] top-[22%] shadow-[0_0_0_8px_rgba(176,141,64,0.18)]" />
        </div>
        
        <div
          className="hero-vertical absolute right-8 top-1/2 z-[4] text-white text-[0.55rem] tracking-[0.4em] uppercase [writing-mode:vertical-rl] hidden md:block"
          aria-hidden="true"
        >
          Art · Africa · The world
        </div>
      </div>
      
      <div className="scroll-cue absolute bottom-[2.2rem] left-[5vw] flex gap-[0.8rem] items-center text-[0.58rem] tracking-[0.25em] uppercase z-[3] text-ink">
        <i className="w-[42px] h-[1px] bg-ink origin-left animate-[cue_1.8s_ease-in-out_infinite]" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
