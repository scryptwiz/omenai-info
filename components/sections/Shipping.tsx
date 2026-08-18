"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Shipping() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Title Reveal
    gsap.to(".ship-title-word", {
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
    gsap.to("#ship-eyebrow", {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      },
    });

    // Image Reveal (Circle to Full)
    gsap.to(imgWrapRef.current, {
      clipPath: "circle(75% at 50% 50%)",
      duration: 1.5,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: imgWrapRef.current,
        start: "top 82%",
      },
    });

    // Image Parallax
    gsap.to(imgRef.current, {
      scale: 1,
      rotation: 0.01,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Steps Active State
    const steps = gsap.utils.toArray<HTMLElement>(".s-step");
    steps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 58%",
        end: "bottom 42%",
        onToggle: (self) => {
          if (self.isActive) {
            step.classList.add("opacity-100");
            step.classList.remove("opacity-20", "md:opacity-20");
            
            const num = step.querySelector(".s-num");
            if (num) {
              num.classList.add("bg-gold", "text-white", "scale-[1.15]");
              num.classList.remove("text-gold");
            }
          } else {
            step.classList.remove("opacity-100");
            step.classList.add("md:opacity-20");
            
            const num = step.querySelector(".s-num");
            if (num) {
              num.classList.remove("bg-gold", "text-white", "scale-[1.15]");
              num.classList.add("text-gold");
            }
          }
        },
      });
    });

    // Stats Grid Reveal
    gsap.to(".ship-stat", {
      autoAlpha: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".ship-stat-grid",
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section
      id="shipping"
      ref={sectionRef}
      className="relative pt-[7rem] pb-[7rem] md:pt-[12rem] md:pb-[14rem] px-[5vw] overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-20 items-start">
        <div>
          <p
            id="ship-eyebrow"
            className="text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-6 opacity-0 flex items-center gap-4"
          >
            <span className="inline-block w-7 h-[1px] bg-gold" />
            04 &mdash; How Shipping Works
          </p>
          <h2
            ref={titleRef}
            className="font-serif text-[clamp(2.4rem,4.5vw,5.5rem)] font-light leading-[1.05]"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="ship-title-word inline-block translate-y-[110%]">White-glove</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <em className="ship-title-word inline-block translate-y-[110%] italic text-gold">art logistics,</em>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="ship-title-word inline-block translate-y-[110%]">worldwide.</span>
            </span>
          </h2>

          <div className="flex flex-col mt-14">
            {[
              { num: "1", title: "Dimensions & Packaging", desc: "Every artwork uploaded to Omenai includes precise dimensions and packaging specifications — ensuring accurate logistics from the moment a sale is confirmed." },
              { num: "2", title: "Shipping Cost Calculated", desc: "A shipping quote is generated automatically based on origin, destination, artwork size and weight. The total cost including applicable taxes is shown transparently." },
              { num: "3", title: "Professional Art Couriers", desc: "Shipments are handled by specialist art logistics partners with proven expertise in transporting fine art safely across borders and continents." },
              { num: "4", title: "Pickup Arranged", desc: "A pickup date and time window is confirmed with the seller. All instructions and handoff details are documented for a smooth collection." },
              { num: "5", title: "Shipping Documents Issued", desc: "A waybill and all necessary shipping documentation are generated and shared with both buyer and seller for full transparency and compliance." },
              { num: "6", title: "Real-time Tracking", desc: "A tracking link is issued so both parties can monitor the artwork's journey from collection to delivery, with status updates along the way." },
              { num: "7", title: "Delivery & Completion", desc: "Once the artwork arrives, the buyer confirms receipt. Proof of delivery is stored, the order is marked complete, and seller earnings are fully released." }
            ].map((step, i, arr) => (
              <div key={i} className="s-step flex gap-8 py-8 border-b border-border-custom opacity-100 md:opacity-20 transition-opacity duration-300">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="s-num w-9 h-9 rounded-full border border-gold-mid flex items-center justify-center font-serif text-[0.85rem] text-gold transition-all duration-350">
                    {step.num}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="s-line w-[1px] flex-1 bg-border-custom min-h-[20px] mt-1.5" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="font-serif text-[1.1rem] font-normal text-ink mb-1.5">{step.title}</h3>
                  <p className="text-[0.8rem] text-muted leading-[1.7]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:sticky md:top-[13vh]">
          <div
            ref={imgWrapRef}
            className="relative h-[56vh] md:h-[58vh] rounded-sm overflow-hidden mb-8 opacity-100 transform-none [clip-path:circle(0%_at_50%_50%)]"
          >
            <Image
              ref={imgRef}
              src="/images/artist_auth.jpg"
              alt="Premium art packing"
              fill
              className="object-cover transform scale-[1.14]"
            />
          </div>
          
          <div className="ship-stat-grid grid grid-cols-2 gap-[1px] bg-border-custom border border-border-custom rounded-sm overflow-hidden">
            {[
              { value: "7", label: "Step Journey" },
              { value: "100+", label: "Countries Reached" },
              { value: "2", label: "Packaging Options" },
              { value: "Live", label: "Tracking Updates" }
            ].map((stat, i) => (
              <div key={i} className="ship-stat bg-surface p-6 opacity-0 translate-y-[10px]">
                <span className="block font-serif text-[2rem] font-light text-gold mb-1">{stat.value}</span>
                <span className="text-[0.68rem] tracking-[0.15em] text-muted uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
