'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroSection from "@/components/hero";

const financeAdvices = [
  "Pay yourself first: Save a portion of your income before spending anything.",
  "Track your expenses to understand where your money is going.",
  "Build an emergency fund with 3-6 months of living expenses.",
  "Avoid high-interest debt and pay off credit cards in full every month.",
  "Invest early and consistently to take advantage of compound interest.",
  "Live below your means to ensure financial stability.",
  "Diversify your investments to reduce risk.",
  "Set clear financial goals to stay motivated.",
  "Review your subscriptions and cancel what you don't use.",
  "Automate your savings and investments.",
];

const LandingPage = () => {
  const [adviceOfTheDay, setAdviceOfTheDay] = useState("");

  useEffect(() => {
    // Pick a random advice based on the day of the year so it changes daily
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    const adviceIndex = dayOfYear % financeAdvices.length;
    setAdviceOfTheDay(financeAdvices[adviceIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-cyan-50 to-teal-100 text-gray-800 font-sans selection:bg-emerald-200">
      
      {/* Background ambient light */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Advice of the Day Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500"></div>
            <h3 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-4">Advice of the Day</h3>
            <p className="text-3xl md:text-4xl font-light text-gray-700 leading-tight">
              &quot;{adviceOfTheDay}&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 -z-10"></div>
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 mb-6 tracking-tight" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Ready to Take Control?
          </motion.h2>
          <p className="text-lg text-gray-600 font-medium mb-10 max-w-2xl mx-auto">
            Manage your personal finances locally without any backend setup. Safe, secure, and right in your browser.
          </p>
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-6 text-lg rounded-full shadow-xl border-none">
                Go to Dashboard
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
