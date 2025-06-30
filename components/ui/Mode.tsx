// Enhanced ModeToggle with animations and hover effects
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if(!mounted || !resolvedTheme) return;
    setIsAnimating(true)
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 150)
  }

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="w-9 h-9 hover:bg-accent/50 transition-colors duration-200"
      >
        <div className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={`w-9 h-9 hover:bg-accent/50 dark:hover:bg-accent/50 transition-all duration-200 rounded-lg`}
    >
      <div className="group relative flex items-center justify-center">
        {isDark ? (
          <Sun 
            className={`h-[1.2rem] text-white w-[1.2rem] transition-all duration-150 ${
              isAnimating ? 'scale-0 -rotate-90' : 'scale-120 rotate-0'
            }`} 
          />
        ) : (
          <Moon 
            className={`h-[1.2rem] transition-all duration-300 ${
              isAnimating ? 'scale-0 -rotate-90' : 'scale-120 rotate-0'
            }`} 
          />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}