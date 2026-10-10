import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

import { Toaster } from "sonner";
import Image from "next/image";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fini | Personal Finance Tracker",
  description: "Fini is a beautifully designed, simple, and intuitive personal finance tracker. Manage your income and expenses securely on your device.",
  keywords: "finance, tracker, budget, personal finance, fini, expenses",
  authors: [{ name: "Aditya Anand" }],
  openGraph: {
    title: "Fini | Personal Finance Tracker",
    description: "Your cute and simple finance tracker.",
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-emerald-100/80 backdrop-blur-md text-gray-800 py-12 border-t border-emerald-200 shadow-lg mt-auto">
            <div className="container mx-auto px-6 text-center">
              <p className="text-lg font-bold text-cyan-800">Empowering Your Financial Future</p>
              
              <div className="mt-6 flex justify-center space-x-6 text-gray-600">
                <a href="https://www.linkedin.com/in/aditya001anand" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 transition-all flex items-center space-x-2 font-medium">
                  <FaLinkedin size={24} />
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:aditya001anand@gmail.com" className="hover:text-cyan-600 transition-all flex items-center space-x-2 font-medium">
                  <FaEnvelope size={24} />
                  <span>Email</span>
                </a>
                <a href="https://github.com/Aditya001anand" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-600 transition-all flex items-center space-x-2 font-medium">
                  <FaGithub size={24} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </footer>
        </body>
    </html>
  );
}
