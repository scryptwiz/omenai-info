"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import EducationNav from "@/components/education/EducationNav";
import CourseCard from "@/components/education/CourseCard";
import Cursor from "@/components/Cursor";

const MOCK_COURSES = [
  {
    id: "mastering-color-form",
    title: "Mastering Color & Form: The Oil Painting Course",
    instructor: "Amara Okonkwo",
    imageSrc: "/images/artist_auth.jpg",
    duration: "10.5 Hours",
    level: "All Levels"
  },
  {
    id: "contemporary-sculpture",
    title: "Sculpting the Modern Narrative",
    instructor: "David Osei",
    imageSrc: "/images/gallery_auth.jpg",
    duration: "8.2 Hours",
    level: "Intermediate"
  },
  {
    id: "digital-art-monetization",
    title: "Minting & Marketing: Digital Art for African Creators",
    instructor: "Zara Bello",
    imageSrc: "/images/collector_auth.jpg",
    duration: "5.5 Hours",
    level: "Beginner"
  }
];

export default function EducationLanding() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ delay: 0.2 });
    
    // Insane entrance animation
    tl.fromTo(".edu-hero-word", 
        { y: "120%", rotationX: -80, opacity: 0 },
        { y: "0%", rotationX: 0, opacity: 1, stagger: 0.08, duration: 1.4, ease: "power4.out", transformOrigin: "bottom center" }
      )
      .to(".edu-hero-fade", { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1 }, "-=1")
      .fromTo(".edu-featured", 
        { clipPath: "inset(100% 10% 0 10%)", scale: 0.9 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.6, ease: "expo.inOut" }, 
        "-=1.2"
      )
      .fromTo(".edu-featured img", 
        { scale: 1.4 },
        { scale: 1.05, duration: 1.6, ease: "power3.out" }, 
        "-=1.6"
      )
      .fromTo(".edu-featured-content",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
      
    // Scroll Parallax for Hero Image
    gsap.to(".edu-featured img", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".edu-featured",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Grid entrance animation with deep staggering
    gsap.fromTo(".edu-grid-item", 
      { autoAlpha: 0, y: 100, scale: 0.95 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".edu-grid",
          start: "top 75%"
        }
      }
    );

    // Banner animation
    gsap.fromTo(".edu-banner",
      { scale: 0.95, opacity: 0, rotationX: 10 },
      { 
        scale: 1, opacity: 1, rotationX: 0, 
        duration: 1.2, ease: "expo.out",
        scrollTrigger: {
          trigger: ".edu-banner",
          start: "top 85%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-ink font-sans selection:bg-deepblue/20">
      <Cursor />
      <EducationNav />
      
      <main className="pt-[15vh] md:pt-[20vh] pb-[10vh] px-[5vw] md:px-[8vw]">
        {/* Header Section */}
        <div ref={heroRef} className="max-w-[1200px] mx-auto mb-16 md:mb-24 [perspective:1000px]">
          <p className="edu-hero-fade text-[0.65rem] tracking-[0.4em] text-deepblue uppercase mb-6 opacity-0 translate-y-6">
            Omenai Masterclass
          </p>
          <h1 className="font-serif text-[clamp(3.5rem,10vw,7rem)] font-light leading-[0.9]">
            <span className="block overflow-hidden pb-[0.05em] [perspective:1000px]">
              <span className="edu-hero-word inline-block">Learn</span>&nbsp;
              <span className="edu-hero-word inline-block">from</span>
            </span>
            <span className="block overflow-hidden pb-[0.05em] [perspective:1000px]">
              <span className="edu-hero-word inline-block">the</span>&nbsp;
              <em className="edu-hero-word inline-block italic text-deepblue pr-4">masters.</em>
            </span>
          </h1>
          <p className="edu-hero-fade mt-8 text-ink/70 max-w-md text-sm md:text-base leading-relaxed opacity-0 translate-y-6">
            Gain unlimited access to high-production video classes taught by Africa&apos;s most celebrated contemporary artists.
          </p>
        </div>

        {/* Featured Class (Hero Image) */}
        <Link href={`/education/${MOCK_COURSES[0].id}`} className="block group max-w-[1200px] mx-auto mb-32 hover-target">
          <div className="edu-featured relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-md shadow-2xl">
            <Image 
              src={MOCK_COURSES[0].imageSrc} 
              alt="Featured Masterclass" 
              fill 
              className="object-cover group-hover:scale-[1.08] transition-transform duration-[1.5s] ease-out origin-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />
            
            <div className="edu-featured-content absolute bottom-6 left-6 md:bottom-12 md:left-12">
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-white font-semibold bg-deepblue backdrop-blur-md px-4 py-2 rounded-full mb-6 inline-block shadow-sm">
                Featured Masterclass
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light mb-3 text-white group-hover:text-deepblue/90 transition-colors duration-500">
                {MOCK_COURSES[0].title}
              </h2>
              <p className="text-white/80 text-sm md:text-base tracking-widest uppercase text-[0.7rem]">
                by {MOCK_COURSES[0].instructor}
              </p>
            </div>
            
            <div className="edu-featured-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-white/30 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center group-hover:bg-deepblue group-hover:border-deepblue transition-all duration-500 shadow-xl group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white translate-x-[2px] group-hover:text-white transition-colors duration-500">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </Link>

        {/* Course Grid */}
        <div className="max-w-[1200px] mx-auto edu-grid">
          <div className="flex items-end justify-between mb-12 border-b border-border-custom pb-6">
            <h3 className="font-serif text-3xl md:text-5xl text-ink">All Masterclasses</h3>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-ink/50 hidden sm:block font-medium">
              {MOCK_COURSES.length} Courses Available
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {MOCK_COURSES.map((course) => (
              <div key={course.id} className="edu-grid-item opacity-0">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Subscription CTA Banner */}
        <div className="edu-banner max-w-[1200px] mx-auto mt-32 relative overflow-hidden rounded-md border border-deepblue/10 bg-[#F6F6F6] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left shadow-xl">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-deepblue/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl text-ink">
            <h3 className="font-serif text-3xl md:text-5xl font-light mb-4">
              Unlock the entire <em className="italic text-deepblue pr-2">library.</em>
            </h3>
            <p className="text-ink/70 text-sm md:text-base leading-relaxed max-w-md">
              Subscribe to the All-Access Pass for $19/month and learn from every masterclass on the platform. Cancel anytime.
            </p>
          </div>
          
          <button className="relative z-10 hover-target bg-deepblue text-white border border-transparent font-sans text-[0.75rem] tracking-[0.25em] uppercase px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:bg-deepblue/90 whitespace-nowrap shadow-xl">
            Subscribe Now
          </button>
        </div>
      </main>
    </div>
  );
}
