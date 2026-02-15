'use client' 
import Image from "next/image";
import Dashboard from "./dashboard/page";
import { useState } from "react"; 
import { Navbar } from "@/components/Navbar";
export default function Home() {

  const [ opensidebar , setOpenSidebar ]= useState( true)

  return (
    <div  className="h-full w-full flex ">

     <Navbar/>

     
    </div>
  );
}
