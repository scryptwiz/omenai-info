"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const MOCK_COURSES = [
  {
    id: "mastering-color-form",
    title: "Mastering Color & Form: The Oil Painting Course",
    instructor: "Amara Okonkwo",
    imageSrc: "/images/artist_auth.jpg",
    rating: "4.9",
    duration: "10.5 Hours",
  },
  {
    id: "contemporary-sculpture",
    title: "Sculpting the Modern Narrative",
    instructor: "David Osei",
    imageSrc: "/images/gallery_auth.jpg",
    rating: "4.8",
    duration: "8.2 Hours",
  },
  {
    id: "digital-art-monetization",
    title: "Minting & Marketing: Digital Art for African Creators",
    instructor: "Zara Bello",
    imageSrc: "/images/collector_auth.jpg",
    rating: "4.9",
    duration: "5.5 Hours",
  }
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title Words Reveal
    gsap.to(".edu-sec-title-word", {
      y: "0%",
      duration: 1.15,
      stagger: 0.055,
      ease: "power4.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    });

    // Eyebrow Reveal
    gsap.to("#edu-sec-eyebrow", {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      },
    });

    // Course Cards Stagger Reveal
    gsap.fromTo(
      ".edu-card-reveal",
      { y: 60, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative px-[5vw] py-32 md:py-48 bg-white z-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
        <div>
          <p
            id="edu-sec-eyebrow"
            className="text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-6 opacity-0 flex items-center gap-4"
          >
            <span className="inline-block w-7 h-[1px] bg-gold" />
            04 &mdash; Omenai Education
          </p>
          <h2
            ref={titleRef}
            className="font-serif text-[clamp(2.4rem,4.5vw,5.5rem)] font-light leading-[1.05] text-deepblue"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="edu-sec-title-word inline-block translate-y-[110%]">Learn from</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <em className="edu-sec-title-word inline-block translate-y-[110%] italic text-gold">the Masters</em>
            </span>
          </h2>
        </div>
        
        <Link 
          href="/education"
          className="group flex items-center gap-3 pb-2 border-b border-deepblue/30 hover:border-deepblue transition-colors text-deepblue whitespace-nowrap"
        >
          <span className="text-sm tracking-widest uppercase font-medium">Explore All Masterclasses</span>
          <span className="group-hover:translate-x-2 transition-transform duration-300">
            &rarr;
          </span>
        </Link>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_COURSES.map((course) => (
          <Link href={`/education/${course.id}`} key={course.id} className="edu-card-reveal group flex flex-col h-full opacity-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 bg-[#EBEBEB]">
              <Image
                src={course.imageSrc}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-gold text-sm">★</span>
                <span className="text-deepblue text-xs font-semibold">{course.rating}</span>
              </div>
            </div>
            
            <div className="flex flex-col flex-1 gap-2">
              <h3 className="font-serif text-2xl text-deepblue group-hover:text-gold transition-colors leading-snug">
                {course.title}
              </h3>
              <p className="text-sm text-ink/70">
                by <span className="font-medium text-deepblue">{course.instructor}</span>
              </p>
              <div className="mt-auto pt-4 flex items-center gap-4 text-xs tracking-wider text-ink/60 uppercase">
                <span>{course.duration}</span>
                <span className="w-1 h-1 rounded-full bg-gold/50" />
                <span>Masterclass</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
