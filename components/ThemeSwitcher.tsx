"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const themes = ["light", "dark", "cupcake", "bumblebee", "emerald",
"corporate",
"synthwave",
"retro",
"cyberpunk",
"valentine",
"halloween",
"garden",
"forest",
"aqua",
"lofi",
"pastel",
"fantasy",
"wireframe",
"black",
"luxury",
"dracula",
"cmyk",
"autumn",
"business",
"acid",
"lemonade",
"night",
"coffee",
"winter",
"dim",
"nord",
"sunset"] as const

type Theme = (typeof themes)[number]

export default function ThemeSwitcher() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme && themes.includes(savedTheme as Theme)) {
      setSelectedTheme(savedTheme as Theme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const defaultTheme: Theme = prefersDark ? "dark" : "light"
      setSelectedTheme(defaultTheme)
      document.documentElement.setAttribute("data-theme", defaultTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme)
    localStorage.setItem("theme", selectedTheme)
  }, [selectedTheme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div 
          className="absolute top-7 right-1 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center cursor-pointer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Palette size={18} className="" />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-black/80 backdrop-blur-md border border-white/10 max-h-[400px] overflow-y-auto w-[calc(100vw-3rem)] sm:w-[448px] max-w-[448px]"
      >
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme}
            className="capitalize text-white/70 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
            onClick={() => setSelectedTheme(theme)}
          >
            {theme === selectedTheme && (
              <motion.span layoutId="activeIndicator" className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-500" />
            )}
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}