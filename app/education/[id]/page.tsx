"use client";

import { useRef, use } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import EducationNav from "@/components/education/EducationNav";
import Cursor from "@/components/Cursor";

const MOCK_COURSE_DETAILS = {
  id: "mastering-color-form",
  title: "Mastering Color & Form: The Oil Painting Course",
  instructor: "Amara Okonkwo",
  instructorBio: "Amara Okonkwo is a globally celebrated contemporary painter whose work explores identity and culture through vibrant, textured oil portraits. Her pieces have been exhibited in London, Lagos, and New York.",
  imageSrc: "/images/artist_auth.jpg",
  duration: "10.5 Hours",
  level: "All Levels",
  lessonsCount: 16,
  price: 149,
  description: "In this comprehensive 10-hour masterclass, Amara Okonkwo breaks down her entire oil painting process. From stretching the canvas and conceptualizing the subject, to mixing the perfect skin tones and applying the final impasto strokes. You will learn how to use color not just accurately, but emotionally.",
  lessons: [
    { num: 1, title: "Introduction & Materials", time: "15:20" },
    { num: 2, title: "Conceptualizing the Portrait", time: "28:45" },
    { num: 3, title: "Color Theory for Rich Skin Tones", time: "42:10" },
    { num: 4, title: "The Underpainting", time: "35:00" },
    { num: 5, title: "Building Forms with Midtones", time: "50:15" },
    { num: 6, title: "Impasto Techniques & Textures", time: "45:30" },
    { num: 7, title: "Final Details & Varnishing", time: "22:10" },
  ]
};

export default function MasterclassDetails({ params }: { params: Promise<{ id: string }> }) {
  use(params);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline();
    
    // Video entrance
    tl.fromTo(videoWrapRef.current, 
        { autoAlpha: 0, scale: 0.95, clipPath: "inset(20% 10% 20% 10%)" },
        { autoAlpha: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out" }
      )
      // Title typography staggered reveal
      .fromTo(".mc-title-word", 
        { y: "110%", rotationX: -50, opacity: 0 }, 
        { y: "0%", rotationX: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: "power4.out", transformOrigin: "bottom center" }, 
        "-=1"
      )
      .fromTo(".mc-meta-fade", 
        { autoAlpha: 0, y: 30 }, 
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }, 
        "-=0.8"
      );
      
    // Video parallax effect on scroll
    gsap.to(".mc-video-img", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: videoWrapRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Sidebar sticky effect simulation
    ScrollTrigger.create({
      trigger: ".mc-content-wrapper",
      start: "top 15%",
      end: "bottom 85%",
      pin: ".mc-sidebar",
      pinSpacing: false
    });
    
    // Lesson reveals with scale and slide
    gsap.fromTo(".mc-lesson-item", 
      { autoAlpha: 0, x: -30, scale: 0.98 },
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".mc-lessons-list",
          start: "top 80%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#f3f0e9] min-h-screen text-ink font-sans selection:bg-gold/30">
      <Cursor />
      <EducationNav />
      
      <main className="pt-[10vh] md:pt-[12vh] pb-[10vh]">
        {/* Video Player Hero */}
        <div className="px-[2vw] md:px-[4vw] mb-16 md:mb-24">
          <div 
            ref={videoWrapRef}
            className="relative w-full aspect-video md:aspect-[2.4/1] bg-ink rounded-md overflow-hidden opacity-0 hover-target cursor-pointer group shadow-2xl"
          >
            <Image 
              src={MOCK_COURSE_DETAILS.imageSrc} 
              alt="Video Thumbnail" 
              fill 
              className="mc-video-img object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s] ease-out"
              priority
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white/30 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-gold group-hover:border-gold transition-all duration-500 shadow-2xl">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white translate-x-[4px] group-hover:text-ink transition-colors duration-500">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
            
            {/* Fake Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-ink/90 to-transparent flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="w-[15%] h-full bg-gold rounded-full" />
              </div>
              <span className="text-xs font-mono text-white tracking-widest">00:00 / {MOCK_COURSE_DETAILS.duration}</span>
            </div>
          </div>
        </div>

        <div className="mc-content-wrapper max-w-[1400px] mx-auto px-[5vw] md:px-[6vw] flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left Content Column */}
          <div className="flex-1">
            <div className="mb-14 border-b border-border-custom pb-12">
              <h1 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-8 [perspective:1000px]">
                <span className="block overflow-hidden pb-2">
                  <span className="mc-title-word inline-block">
                    {MOCK_COURSE_DETAILS.title.split(':')[0]}
                  </span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span className="mc-title-word inline-block italic text-gold">
                    {MOCK_COURSE_DETAILS.title.split(':')[1]}
                  </span>
                </span>
              </h1>
              
              <div className="mc-meta-fade opacity-0 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-ink/70 font-sans tracking-wide">
                <span className="uppercase text-ink font-semibold tracking-widest text-[0.7rem] bg-white px-3 py-1 rounded-sm border border-border-custom shadow-sm">by {MOCK_COURSE_DETAILS.instructor}</span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full hidden sm:block" />
                <span className="uppercase tracking-widest text-[0.7rem] font-medium">{MOCK_COURSE_DETAILS.level}</span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full hidden sm:block" />
                <span className="uppercase tracking-widest text-[0.7rem] font-medium">{MOCK_COURSE_DETAILS.lessonsCount} Lessons</span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full hidden sm:block" />
                <span className="uppercase tracking-widest text-[0.7rem] font-medium">{MOCK_COURSE_DETAILS.duration}</span>
              </div>
            </div>

            <div className="mc-meta-fade opacity-0 mb-20 max-w-2xl text-ink/80 leading-relaxed font-sans text-lg">
              <p>{MOCK_COURSE_DETAILS.description}</p>
            </div>
            
            {/* Instructor Box */}
            <div className="mc-meta-fade opacity-0 mb-24 p-8 md:p-12 border border-border-custom rounded-md bg-white flex flex-col sm:flex-row gap-10 items-center sm:items-start shadow-sm hover:shadow-xl transition-shadow duration-500 group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0 relative group-hover:border-gold transition-colors duration-500">
                <Image src="/images/artist_auth.jpg" alt={MOCK_COURSE_DETAILS.instructor} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div>
                <h4 className="text-[0.65rem] tracking-[0.25em] text-gold font-bold uppercase mb-3">Meet the Instructor</h4>
                <h3 className="font-serif text-3xl mb-4 text-ink">{MOCK_COURSE_DETAILS.instructor}</h3>
                <p className="text-base text-ink/70 leading-relaxed">{MOCK_COURSE_DETAILS.instructorBio}</p>
              </div>
            </div>

            {/* Syllabus */}
            <div className="mc-lessons-list mb-20">
              <h3 className="font-serif text-3xl mb-10 border-b border-border-custom pb-6 text-ink">Course Syllabus</h3>
              <div className="flex flex-col gap-4">
                {MOCK_COURSE_DETAILS.lessons.map((lesson) => (
                  <div 
                    key={lesson.num} 
                    className="mc-lesson-item opacity-0 flex items-center justify-between p-5 md:p-6 bg-white border border-border-custom hover:border-gold/50 transition-all duration-300 rounded-sm group cursor-pointer hover-target shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className="font-serif text-2xl md:text-3xl text-gold/40 group-hover:text-gold transition-colors">
                        {String(lesson.num).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-base md:text-lg text-ink font-medium group-hover:translate-x-2 transition-transform duration-300">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-sm text-ink/50 group-hover:text-ink transition-colors">{lesson.time}</span>
                      <div className="w-10 h-10 rounded-full border border-border-custom flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-colors duration-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/40 group-hover:text-white translate-x-[2px] transition-colors"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Sticky on Desktop) */}
          <div className="w-full lg:w-[420px] flex-shrink-0">
            <div className="mc-sidebar p-10 bg-white border border-border-custom rounded-md shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10 mb-10">
                <span className="text-[0.65rem] tracking-[0.25em] text-gold font-bold uppercase block mb-3">All-Access Pass</span>
                <h3 className="font-serif text-4xl mb-4 text-ink">$19 <span className="text-base font-sans font-medium text-ink/50">/ month</span></h3>
                <p className="text-base text-ink/60 leading-relaxed">Unlock this masterclass and the entire Omenai educational library.</p>
              </div>
              
              <button className="relative z-10 w-full bg-ink text-white font-sans text-[0.8rem] font-medium tracking-[0.2em] uppercase py-5 rounded-full transition-transform hover:scale-[1.02] hover:shadow-lg hover-target mb-8">
                Start 7-Day Free Trial
              </button>
              
              <div className="relative flex items-center justify-center mb-8 z-10">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-custom" /></div>
                <span className="relative bg-white px-4 text-[0.7rem] uppercase tracking-widest text-ink/40 font-bold">Or</span>
              </div>
              
              <div className="flex items-center justify-between mb-6 z-10 relative">
                <span className="text-base font-medium text-ink/80">Buy Course for Life</span>
                <span className="font-serif text-2xl text-ink">${MOCK_COURSE_DETAILS.price}</span>
              </div>
              <button className="relative z-10 w-full bg-transparent border-2 border-ink text-ink font-sans text-[0.8rem] font-medium tracking-[0.2em] uppercase py-5 rounded-full transition-colors hover:bg-ink hover:text-white hover-target">
                Buy Once
              </button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
