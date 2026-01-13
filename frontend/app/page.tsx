'use client' 
import Image from "next/image";
import Dashboard from "./dashboard/page";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
export default function Home() {

  const [ opensidebar , setOpenSidebar ]= useState( true)

  return (
    <div  className="h-full w-full flex ">

    <div className="w-1/5 h-screen">
<Sidebar/>
      </div>
      <div className="w-4/5 h-screen">
      <Dashboard/>
      </div>
    </div>
  );
}
