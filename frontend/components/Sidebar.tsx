

import React from 'react'
import {
  Menu,
  Bell,
  Search,
  Upload,
  PlayCircle,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Settings,
  Sparkles,
} from "lucide-react"
const Sidebar = () => {
  return (
    <div className='mx-auto flex w-full  gap-4 px-4 pb-8 pt-4 md:px-6 md:pt-6'> 
    <aside
          className={`fixed inset-y-0 left-0 z-10 w-64 transform bg-white px-4 pt-20 shadow-md transition-transform md:static md:block md:translate-x-0 md:rounded-3xl md:border md:border-slate-200 md:bg-white/70 md:pt-4 md:shadow-sm  `}
        >
          <nav className="flex flex-col gap-2 text-sm">
            <SidebarItem active icon={<Sparkles className="h-4 w-4" />} label="Overview" />
            <SidebarItem icon={<PlayCircle className="h-4 w-4" />} label="Projects" />
            <SidebarItem icon={<Upload className="h-4 w-4" />} label="Uploads" />
            <SidebarItem icon={<ImageIcon className="h-4 w-4" />} label="Thumbnails" />
            <SidebarItem icon={<Settings className="h-4 w-4" />} label="Integrations" />
            <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" />
          </nav>

          <div className="mt-6 rounded-2xl bg-slate-900 px-4 py-4 text-xs text-slate-100">
            <p className="font-medium">AI Workflows</p>
            <p className="mt-1 text-slate-300">
              Generate thumbnails and titles automatically for your next upload.
            </p>
            <button className="mt-3 inline-flex items-center justify-center rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-slate-900">
              Create workflow
            </button>
          </div>
        </aside>

    
    
    </div>
  )
}

export default Sidebar



function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-left transition ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}