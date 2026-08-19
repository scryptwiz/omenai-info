"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function WhatOmenaiDoes() {
  const [activeTab, setActiveTab] = useState<"collectors" | "galleries" | "artists">("collectors");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Reveal Title
    gsap.to(".does-title-word", {
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

    // Reveal Eyebrow
    gsap.to("#does-eyebrow", {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });

    // Image Entrance
    gsap.to(imgWrapRef.current, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.3,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: imgWrapRef.current,
        start: "top 82%",
      },
    });

    // Image Parallax
    gsap.to(imgRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: imgWrapRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  // Handle Tab Switch Animation
  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".role-panel");
    panels.forEach((panel) => {
      if (panel.dataset.tab === activeTab) {
        panel.style.display = "grid";
        gsap.fromTo(
          panel.querySelectorAll(".role-feature"),
          { autoAlpha: 0, y: 55, rotateX: -8 },
          { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.07, duration: 0.75, ease: "power3.out" }
        );
      } else {
        panel.style.display = "none";
      }
    });
    ScrollTrigger.refresh();
  }, [activeTab]);

  return (
    <section
      id="does"
      ref={sectionRef}
      className="relative pt-[7rem] pb-[7rem] md:pt-[14rem] md:pb-[12rem] px-[5vw] overflow-hidden"
    >
      {/* Gradient bridge from deep-blue Hero above */}
      <div className="absolute top-0 left-0 right-0 h-[18vh] bg-gradient-to-b from-deepblue/[0.08] to-transparent pointer-events-none" />
      <div className="does-header grid grid-cols-1 md:grid-cols-2 gap-16 items-center md:min-h-[82vh] mb-20">
        <div>
          <p
            id="does-eyebrow"
            className="text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-6 opacity-0 flex items-center gap-4"
          >
            <span className="inline-block w-7 h-[1px] bg-gold" />
            02 &mdash; What Omenai Does
          </p>
          <h2
            ref={titleRef}
            className="font-serif text-[clamp(3.3rem,7vw,8.5rem)] font-light leading-[1.05] md:leading-[0.88] overflow-hidden"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="does-title-word inline-block translate-y-[110%]">A</span>&nbsp;
              <span className="does-title-word inline-block translate-y-[110%]">full</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <em className="does-title-word inline-block translate-y-[110%] italic text-gold">ecosystem</em>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="does-title-word inline-block translate-y-[110%]">for</span>&nbsp;
              <span className="does-title-word inline-block translate-y-[110%]">African</span>&nbsp;
              <span className="does-title-word inline-block translate-y-[110%]">art.</span>
            </span>
          </h2>
        </div>
        <div
          ref={imgWrapRef}
          className="relative h-[50vh] md:h-[62vh] rounded-sm overflow-hidden opacity-100 transform-none [clip-path:inset(0_100%_0_0)]"
        >
          <Image
            ref={imgRef}
            src="/images/collector_auth.jpg"
            alt="Collector viewing artwork"
            fill
            className="object-cover transform scale-[1.14]"
          />
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent z-[1] pointer-events-none" />
          <span className="absolute bottom-4 left-4 text-[0.6rem] tracking-[0.2em] text-white/75 uppercase bg-[#1c1a17]/30 backdrop-blur-sm py-1.5 px-3 rounded-sm z-10">
            The Omenai Gallery Experience
          </span>
        </div>
      </div>

      <div className="roles-tabs sticky top-[63px] md:top-[78px] z-10 bg-bg/90 backdrop-blur-md flex border-b border-border-custom mb-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(["collectors", "galleries", "artists"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 md:px-8 flex-1 md:flex-none relative transition-colors duration-300 ${
              activeTab === tab ? "text-ink" : "text-muted"
            }`}
          >
            {tab}
            <span
              className={`absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gold transition-transform duration-300 origin-left ${
                activeTab === tab ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="role-panels relative">
        {/* Collectors */}
        <div data-tab="collectors" className="role-panel grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border-custom border-0">
          {[
            { icon: "◈", title: "Curated Discovery", desc: "Browse a curated feed of trending and editorial-featured artworks tailored to your tastes and collection history." },
            { icon: "◉", title: "AR Wall Preview", desc: "Visualise any artwork on your actual wall before purchasing, using the Omenai mobile app's augmented reality feature." },
            { icon: "◎", title: "Smart Filtering", desc: "Filter by medium, price range, year, and artist career stage — from Emerging to Established and Elite." },
            { icon: "◇", title: "Follows & Alerts", desc: "Follow artists and galleries to receive personalised notifications on new uploads, shows, and events." },
            { icon: "◻", title: "Editorial Access", desc: "Read in-depth editorial content, artist interviews, curator picks, and art fair coverage." },
            { icon: "△", title: "Art Fairs & Events", desc: "Discover upcoming art fairs, gallery shows, and exhibitions curated across Africa and the global diaspora." }
          ].map((feat, i) => (
            <div key={i} className="role-feature hover-target group relative min-h-0 md:min-h-[240px] bg-bg p-[2.5rem_2rem] overflow-hidden border-b md:border-b-0 border-border-custom">
              <div className="absolute inset-0 bg-deepblue translate-y-[101%] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:translate-y-0" />
              <div className="relative z-10 transition-colors duration-350 text-ink group-hover:text-[#F6F6F6]">
                <span className="block w-8 h-8 mb-5 text-gold text-[1.6rem] flex items-center">{feat.icon}</span>
                <h3 className="font-serif text-[1rem] font-normal mb-2">{feat.title}</h3>
                <p className="text-[0.78rem] text-muted leading-[1.65] group-hover:text-[#F6F6F6]/80">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Galleries */}
        <div data-tab="galleries" className="role-panel hidden grid-cols-1 md:grid-cols-3 gap-[1px] bg-border-custom border-0">
          {[
            { icon: "◈", title: "Inventory Management", desc: "List, update, and manage your full artwork catalogue with rich metadata including pricing, medium, and dimensions." },
            { icon: "◉", title: "Artist Roster", desc: "Manage a roster of represented artists and give them visibility across the Omenai platform under your gallery." },
            { icon: "◎", title: "Order Management", desc: "Review and accept or decline incoming purchase orders from collectors, with full transparency on buyer details." },
            { icon: "◇", title: "Revenue Wallet", desc: "Track your earnings in a built-in wallet. Funds move from pending to available after fulfilment." },
            { icon: "◻", title: "Subscription Tiers", desc: "Choose from Foundation, Principal, or Gallery subscription plans to unlock platform features and visibility." },
            { icon: "△", title: "Promoted Placement", desc: "Feature in editorially curated sections, shows, and homepage promotions to reach the right collectors." }
          ].map((feat, i) => (
            <div key={i} className="role-feature hover-target group relative min-h-0 md:min-h-[240px] bg-bg p-[2.5rem_2rem] overflow-hidden border-b md:border-b-0 border-border-custom">
              <div className="absolute inset-0 bg-deepblue translate-y-[101%] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:translate-y-0" />
              <div className="relative z-10 transition-colors duration-350 text-ink group-hover:text-[#F6F6F6]">
                <span className="block w-8 h-8 mb-5 text-gold text-[1.6rem] flex items-center">{feat.icon}</span>
                <h3 className="font-serif text-[1rem] font-normal mb-2">{feat.title}</h3>
                <p className="text-[0.78rem] text-muted leading-[1.65] group-hover:text-[#F6F6F6]/80">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Artists */}
        <div data-tab="artists" className="role-panel hidden grid-cols-1 md:grid-cols-3 gap-[1px] bg-border-custom border-0">
          {[
            { icon: "◈", title: "Flexible Profiles", desc: "Claim your profile on Omenai or have a gallery create one on your behalf — full artist presence on the platform." },
            { icon: "◉", title: "Artwork Upload", desc: "Upload and manage your artworks with full metadata, portfolio images, CV, and social links." },
            { icon: "◎", title: "Earn & Withdraw", desc: "Receive earnings through the Omenai wallet system in your local currency, with a configured withdrawal account." },
            { icon: "◇", title: "Career Tiers", desc: "Your work is categorised from Emerging through to Elite, helping collectors understand your market position." },
            { icon: "◻", title: "Exclusivity Control", desc: "Choose whether to list exclusively on Omenai or retain the ability to sell through other channels." },
            { icon: "△", title: "Audience Growth", desc: "Build a following on Omenai — collectors who follow you are notified directly when you upload new works." }
          ].map((feat, i) => (
            <div key={i} className="role-feature hover-target group relative min-h-0 md:min-h-[240px] bg-bg p-[2.5rem_2rem] overflow-hidden border-b md:border-b-0 border-border-custom">
              <div className="absolute inset-0 bg-deepblue translate-y-[101%] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:translate-y-0" />
              <div className="relative z-10 transition-colors duration-350 text-ink group-hover:text-[#F6F6F6]">
                <span className="block w-8 h-8 mb-5 text-gold text-[1.6rem] flex items-center">{feat.icon}</span>
                <h3 className="font-serif text-[1rem] font-normal mb-2">{feat.title}</h3>
                <p className="text-[0.78rem] text-muted leading-[1.65] group-hover:text-[#F6F6F6]/80">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
