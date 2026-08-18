"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef({ value: 0 });
  const [count, setCount] = useState(0);

  useGSAP(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isReducedMotion) {
      if (containerRef.current) containerRef.current.style.display = "none";
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden"; // Prevent scrolling during load

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        onComplete();
      },
    });

    tl.to(".loader-line-fill", {
      x: "0%",
      duration: 1.15,
      ease: "power2.inOut",
    })
      .to(
        countRef.current,
        {
          value: 100,
          duration: 1.15,
          ease: "power2.inOut",
          onUpdate: () => {
            setCount(Math.round(countRef.current.value));
          },
        },
        0
      )
      .to(
        ".loader-word",
        {
          yPercent: -120,
          duration: 0.8,
          ease: "expo.inOut",
        },
        1.25
      )
      .to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
        },
        1.35
      )
      .set(containerRef.current, { display: "none" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9997] bg-ink text-bg grid place-items-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="text-center">
        <div className="loader-word font-serif font-light text-[clamp(3rem,9vw,9rem)] leading-[0.8] tracking-[0.12em] overflow-hidden">
          <div className="inline-block">OMENAI</div>
        </div>
        <div className="w-[min(280px,56vw)] h-[1px] my-[2.2rem] mx-auto bg-white/20 overflow-hidden relative">
          <i className="loader-line-fill absolute inset-0 bg-gold -translate-x-full block" />
        </div>
        <div className="text-[0.62rem] tracking-[0.28em] text-white/55">
          {String(count).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
