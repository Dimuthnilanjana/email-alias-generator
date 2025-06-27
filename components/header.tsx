"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, Mail, ExternalLink } from "lucide-react"
import { ContactModal } from "@/components/contact-modal"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Contact Developer", href: "#", action: () => setIsContactOpen(true) },
    { name: "Official Website", href: "https://www.dimuthnilanjana.com", external: true },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Mail className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">AliasGen</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) =>
              item.action ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>{item.name}</span>
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span>{item.name}</span>
                  {item.external && <ExternalLink className="h-3 w-3" />}
                </Link>
              ),
            )}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) =>
                    item.action ? (
                      <button
                        key={item.name}
                        onClick={item.action}
                        className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{item.name}</span>
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        <span>{item.name}</span>
                        {item.external && <ExternalLink className="h-3 w-3" />}
                      </Link>
                    ),
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    </header>
  )
}
