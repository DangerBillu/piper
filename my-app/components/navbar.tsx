"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// import { Toggle } from "@/components/toggle"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">N</span>
              </div>
              <span className="font-bold text-xl">Nodey</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#pipeline" className="text-foreground/80 hover:text-foreground transition-colors">
              Pipeline Builder
            </Link>
            <Link href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#models" className="text-foreground/80 hover:text-foreground transition-colors">
              Explore Models
            </Link>
            <Link href="#docs" className="text-foreground/80 hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Button>Get Started</Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="#pipeline" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Pipeline Builder
            </Link>
            <Link href="#how-it-works" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="#models" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Explore Models
            </Link>
            <Link href="#docs" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Documentation
            </Link>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  )
}

