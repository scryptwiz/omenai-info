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
      .to(".outro-title-word", { y: "0%", stagger: 0.08, duration: 1.5, ease: "power4.out" }, 0)
      .fromTo(".outro-title em", { xPercent: -15 }, { xPercent: 10, duration: 2 }, 0)
      .to(".outro-url-wrap", { autoAlpha: 1, duration: 0.7 }, 0.9)
      .fromTo(
        ringRef.current,
        { scale: 0.45, rotation: -90 },
        { scale: 1.15, rotation: 35, duration: 2.2 },
        0
      );
      
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="outro"
      ref={sectionRef}
      className="relative min-h-[85svh] md:min-h-[100vh] flex items-center py-[6rem] px-[6vw] md:py-[8rem] md:px-[8vw] bg-ink overflow-hidden"
    >
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
          <p className="outro-eyebrow text-[0.62rem] tracking-[0.35em] text-gold uppercase mb-6 opacity-0">
            Omenai Platform
          </p>
          <h2
            className="font-serif text-[clamp(3.5rem,17vw,6.4rem)] md:text-[clamp(4rem,10vw,11rem)] font-light leading-[0.77] text-[#f0ece4]"
            aria-label="The art world reimagined for Africa"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="outro-title-word inline-block translate-y-[110%]">The</span>&nbsp;
              <span className="outro-title-word inline-block translate-y-[110%]">art</span>&nbsp;
              <span className="outro-title-word inline-block translate-y-[110%]">world</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <em className="outro-title-word inline-block translate-y-[110%] italic text-gold pr-8">reimagined</em>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="outro-title-word inline-block translate-y-[110%]">for</span>&nbsp;
              <span className="outro-title-word inline-block translate-y-[110%]">Africa.</span>
            </span>
          </h2>
        </div>
        
        <div className="outro-url-wrap text-left md:text-right opacity-0">
          <a
            href="https://omenai.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-target inline-block font-serif text-[1rem] text-gold tracking-[0.08em] pb-1 border-b border-gold/40 transition-colors hover:text-white hover:border-white"
          >
            omenai.app
          </a>
          <span className="block text-[0.65rem] tracking-[0.2em] text-[#f0ece4]/40 uppercase mt-3">
            Available on Web &amp; iOS
          </span>
        </div>
      </div>
    </section>
  );
}
