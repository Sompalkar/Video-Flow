import React, { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Dashboard", "Video", "Youtube", "Profile"];

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-3 shadow-md">
        
  
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

         
        <h1 className="text-xl font-bold">Video Flow</h1>

       
        <div className="hidden md:block">
          <ul className="flex gap-10">
            {menuItems.map((item) => (
              <li key={item} className="cursor-pointer hover:text-blue-500">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

 
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

 
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>

          <button className="text-2xl" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

     
        <ul className="flex flex-col gap-6 p-4">
          {menuItems.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => setIsOpen(false)}  
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
