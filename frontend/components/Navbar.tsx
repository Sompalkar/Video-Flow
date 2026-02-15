import React, { useState } from "react";
import { useAuthStore } from "@/lib/store/auth";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();

  const menuItems = ["Home", "Trending", "Verified", "Creator", "Settings"];

  return (
    <nav className="w-full h-16 px-8 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl">🎬</span>
        <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          VideoFlow
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {menuItems.map((item) => (
          <button
            key={item}
            className="hover:text-blue-600 text-neutral-600 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <button className="hidden md:block text-sm text-neutral-700 hover:text-black font-medium transition-colors">
          {user?.name || "Guest"}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-neutral-600 hover:text-black transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-neutral-200 md:hidden shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4 text-sm font-medium">
            {menuItems.map((item) => (
              <button
                key={item}
                className="text-left py-2 text-neutral-700 hover:text-blue-600 border-b border-neutral-50 last:border-0 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </button>
            ))}
            <button className="text-left py-2 text-neutral-700 font-bold border-t border-neutral-100 pt-4 mt-2">
              {user?.name || "Guest"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
