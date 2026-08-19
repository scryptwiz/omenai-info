"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Lottie } from "lottie-react";
import omenaiLoaderAnimation from "./omenai_loader.json";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef({ value: 0 });
  const [count, setCount] = useState(0);

  useGSAP(() => {
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
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

    tl.to(countRef.current, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(countRef.current.value));
      },
    })
      .to(
        ".loader-word",
        {
          yPercent: -120,
          duration: 0.8,
          ease: "expo.inOut",
        },
        "+=0.2",
      )
      .to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
        },
        "-=0.6",
      )
      .set(containerRef.current, { display: "none" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9997 bg-bg text-ink grid place-items-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="text-center flex flex-col items-center">
        <div className="loader-word flex flex-col items-center justify-center">
          <div className="w-45 md:w-80 mb-4">
            <Lottie src={omenaiLoaderAnimation} loop={true} autoplay />
          </div>
          {/* <div className="text-[0.62rem] tracking-[0.28em] text-ink/55">
            {String(count).padStart(2, "0")}
          </div> */}
        </div>
      </div>
    </div>
  );
}
