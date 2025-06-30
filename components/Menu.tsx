"use client"

import { MenuItem, MenuContainer } from "@/components/ui/fluid-menu"
import { Menu as MenuIcon, X, Home, Mail, User, Settings } from "lucide-react"

// A fluid circular menu that elegantly expands to reveal navigation items with smooth icon transitions
export function MenuDemo() {
  return (
    <div className="flex flex-col items-center gap-8 hidden max-sm:flex">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-transparent dark:from-gray-100/10 blur-3xl -z-10 rounded-full" />
        <MenuContainer>
          <MenuItem 
            icon={
              <div className="relative w-3 h-3">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                  <MenuIcon size={16} strokeWidth={2} />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                  <X size={16} strokeWidth={2} />
                </div>
              </div>
            } 
          />
          <MenuItem icon={<Home size={24} strokeWidth={1.5} />} />
          <MenuItem icon={<Mail size={24} strokeWidth={1.5} />} />
          <MenuItem icon={<User size={24} strokeWidth={1.5} />} />
          <MenuItem icon={<Settings size={24} strokeWidth={1.5} />} />
        </MenuContainer>
      </div>
    </div>
  )
}  