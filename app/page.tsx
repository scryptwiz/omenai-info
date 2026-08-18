"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import WhatOmenaiDoes from "@/components/sections/WhatOmenaiDoes";
import Payment from "@/components/sections/Payment";
import Shipping from "@/components/sections/Shipping";
import Outro from "@/components/sections/Outro";
import ThreeBackground from "@/components/ThreeBackground";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {/* Three.js Background adds depth to the scrolling experience */}
      <ThreeBackground />
      
      <Cursor />
      <Navigation />
      
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        
        <div className="mx-[5vw] h-[1px] bg-border-custom origin-left full-divider" />
        <WhatOmenaiDoes />
        
        <div className="mx-[5vw] h-[1px] bg-border-custom origin-left full-divider" />
        <Payment />
        
        <div className="mx-[5vw] h-[1px] bg-border-custom origin-left full-divider" />
        <Shipping />
        
        <Outro />
      </main>
    </>
  );
}
