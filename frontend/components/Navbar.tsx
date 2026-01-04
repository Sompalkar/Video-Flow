
"use client"

import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-16 px-8 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-neutral-200">

  
      <div className="text-lg font-semibold tracking-tight">
        VideoFlow
      </div>

      
      <div className="hidden md:flex items-center gap-8 text-sm">
        <button className="hover:text-black text-neutral-600 transition">Home</button>
        <button className="hover:text-black text-neutral-600 transition">Trending</button>
        <button className="hover:text-black text-neutral-600 transition">Verified</button>
        <button className="hover:text-black text-neutral-600 transition">Creator</button>
        <button className="hover:text-black text-neutral-600 transition">Settings</button>
      </div>

      
      <div className="flex items-center gap-3">
        <button className="hidden md:block text-sm text-neutral-700 hover:text-black transition">
          Profile
        </button>

           
        <button
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center rounded-lg border border-neutral-200"
          onClick={() => setOpen(!open)}
        >
          <span className="w-5 h-[2px] bg-black mb-1 rounded"></span>
          <span className="w-5 h-[2px] bg-black mb-1 rounded"></span>
          <span className="w-5 h-[2px] bg-black rounded"></span>
        </button>
      </div>

         
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white/80  border-b  border-neutral-200 md:hidden">
          <div className="flex flex-col p-4 gap-4 text-sm ">
            <button className="text-left text-neutral-700 hover:text-black">Home</button>
            <button className="text-left text-neutral-700 hover:text-black">Trending</button>
            <button className="text-left text-neutral-700 hover:text-black">Verified</button>
            <button className="text-left text-neutral-700 hover:text-black">Creator</button>
            <button className="text-left text-neutral-700 hover:text-black">Settings</button>
            <button className="text-left text-neutral-700 hover:text-black">Profile</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
