"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="pt-40 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl pb-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600 tracking-tight drop-shadow-md">
          Simplify Your Finances <br /> with Fini
        </h1>
        <p className="text-xl text-gray-600 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
        A modern, beautifully simple platform that empowers you to monitor and manage your finances locally and privately.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-full shadow-lg border-none hover:scale-105 transition-all">
              Get Started
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
