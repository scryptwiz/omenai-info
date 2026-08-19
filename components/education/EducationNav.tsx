"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function EducationNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 30) {
          navRef.current.classList.add("border-b-white/10");
          navRef.current.classList.remove("border-b-transparent");
        } else {
          navRef.current.classList.add("border-b-transparent");
          navRef.current.classList.remove("border-b-white/10");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".edu-nav-item",
      { autoAlpha: 0, y: -20 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
      },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-100 px-[5vw] py-6 md:px-16 md:py-[1.8rem] flex items-center justify-between bg-transparent transition-colors duration-500 border-b border-transparent backdrop-blur-md"
    >
      <Link href="/" className="edu-nav-item hover-target flex items-center">
        <img
          src="/omenai_logo.png"
          alt="Omenai Logo"
          className="h-8 w-auto brightness-0 invert"
        />
      </Link>

      <div className="flex items-center gap-6 md:gap-10">
        <Link
          href="/education"
          className="edu-nav-item text-[0.68rem] tracking-[0.25em] text-white/70 hover:text-white transition-colors uppercase hover-target hidden sm:block"
        >
          Masterclasses
        </Link>
        <Link
          href="#"
          className="edu-nav-item text-[0.68rem] tracking-[0.25em] text-white hover:bg-white/10 transition-colors uppercase border border-white/60 px-5 py-2.5 rounded-full hover-target shadow-sm"
        >
          Subscribe
        </Link>
      </div>
    </nav>
  );
}
