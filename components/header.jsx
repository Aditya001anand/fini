'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { PenBox, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full bg-cyan-100/90 backdrop-blur-xl z-50 border-b border-cyan-300 shadow-sm transition-all duration-300"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Fini Logo" width={36} height={36} className="shadow-sm rounded-xl drop-shadow-md" />
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600 tracking-tight drop-shadow-sm">
              Fini
            </div>
          </Link>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button className="bg-white/50 text-emerald-700 hover:bg-white/80 flex items-center gap-2 hover:scale-105 transition-all shadow-sm rounded-full border border-emerald-100">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>
          <Link href="/transaction/create">
            <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white flex items-center gap-2 hover:scale-105 transition-all shadow-md rounded-full border-none">
              <PenBox size={18} />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;