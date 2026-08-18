"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Payment() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Title Words Reveal
    gsap.to(".pay-title-word", {
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
    gsap.to("#pay-eyebrow", {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      },
    });

    // Image Reveal
    gsap.to(imgWrapRef.current, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.2,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: imgWrapRef.current,
        start: "top 85%",
      },
    });

    // Image Parallax
    gsap.to(imgRef.current, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Steps scroll trigger
    const steps = gsap.utils.toArray<HTMLElement>(".p-step");
    steps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 58%",
        end: "bottom 42%",
        onToggle: (self) => {
          if (self.isActive) {
            step.classList.add("opacity-100");
            step.classList.remove("opacity-22", "md:opacity-22");
            step.querySelector(".p-num")?.classList.add("text-gold");
            step.querySelector(".p-line")?.classList.add("w-full");
            step.querySelector(".p-line")?.classList.remove("w-0");
          } else {
            step.classList.remove("opacity-100");
            step.classList.add("md:opacity-22");
            step.querySelector(".p-num")?.classList.remove("text-gold");
          }
        },
      });
    });
  }, []);

  return (
    <section
      id="payment"
      ref={sectionRef}
      className="relative pt-[7rem] pb-[7rem] md:pt-[12rem] md:pb-[12rem] px-[5vw] overflow-hidden bg-surface"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-24 items-start">
        <div className="md:sticky md:top-[18vh]">
          <p
            id="pay-eyebrow"
            className="text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-6 opacity-0 flex items-center gap-4"
          >
            <span className="inline-block w-7 h-[1px] bg-gold" />
            03 &mdash; How Payment Works
          </p>
          <h2
            ref={titleRef}
            className="font-serif text-[clamp(2.4rem,4.5vw,5.5rem)] font-light leading-[1.05]"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="pay-title-word inline-block translate-y-[110%]">Secure,</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <em className="pay-title-word inline-block translate-y-[110%] italic text-gold">transparent</em>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="pay-title-word inline-block translate-y-[110%]">art</span>&nbsp;
              <span className="pay-title-word inline-block translate-y-[110%]">transactions.</span>
            </span>
          </h2>
          <div
            ref={imgWrapRef}
            className="mt-12 rounded-sm overflow-hidden opacity-100 transform-none [clip-path:inset(100%_0_0_0)] h-[42vh] md:h-[34vh] relative"
          >
            <Image
              ref={imgRef}
              src="/images/gallery_auth.jpg"
              alt="Secure art payment flow"
              fill
              className="object-cover transform scale-[1.14]"
            />
          </div>
        </div>

        <div className="flex flex-col">
          {[
            { num: "01", label: "Enquiry", title: "Browse or Request a Price", desc: "Works with visible pricing can be purchased immediately. For private listings, collectors submit an enquiry — a time-limited request reviewed by the seller.", badges: ["Public Pricing", "Private Enquiry"] },
            { num: "02", label: "Reservation", title: "Artwork Reserved for You", desc: "Once a purchase order is placed, the artwork is temporarily reserved — preventing another collector from purchasing the same piece while your transaction completes.", badges: ["Held Exclusively", "Time-limited"] },
            { num: "03", label: "Seller Review", title: "Gallery or Artist Confirms", desc: "The gallery or artist reviews and accepts your order. You are notified as soon as a decision is made, and the artwork proceeds to checkout.", badges: ["Accepted", "Instant Notification"] },
            { num: "04", label: "Checkout", title: "Secure Card Payment", desc: "Complete your purchase using bank-grade secure payment processing. Transactions are handled in USD with full multi-currency support for global collectors.", badges: ["Bank-grade Security", "Multi-currency"] },
            { num: "05", label: "Confirmation", title: "Instant Fulfilment", desc: "On successful payment, the artwork is marked as sold, your purchase is confirmed, and the seller's earnings are processed — all in real time.", badges: ["Artwork Sold", "Receipt Issued"] },
            { num: "06", label: "Seller Earnings", title: "Wallet & Payouts", desc: "Seller earnings are held securely in their Omenai wallet, moving from pending to available after fulfilment. Funds can then be withdrawn to their nominated account.", badges: ["Pending → Available", "Withdrawable"] }
          ].map((step, i) => (
            <div key={i} className="p-step group relative grid grid-cols-[56px_1fr] gap-6 items-start py-[2.2rem] border-b border-border-custom opacity-100 md:opacity-22 md:min-h-[28vh] content-center transition-opacity duration-300">
              <span className="p-num font-serif text-[2rem] md:text-[3.7rem] font-light text-gold-mid leading-none tracking-[-0.02em] transition-colors duration-300">{step.num}</span>
              <div>
                <span className="block text-[0.62rem] tracking-[0.25em] text-gold uppercase mb-2">{step.label}</span>
                <h3 className="font-serif text-[1.2rem] font-normal text-ink mb-2">{step.title}</h3>
                <p className="text-[0.8rem] text-muted leading-[1.7]">{step.desc}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {step.badges.map((badge, j) => (
                    <span key={j} className="text-[0.6rem] tracking-[0.1em] py-[0.25rem] px-[0.65rem] bg-gold-light text-gold rounded-full uppercase">{badge}</span>
                  ))}
                </div>
              </div>
              <div className="p-line absolute bottom-[-1px] left-0 h-[1px] w-0 bg-gold transition-all duration-700 ease-in-out hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
