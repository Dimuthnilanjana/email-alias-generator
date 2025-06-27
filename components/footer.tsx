"use client"
import { useState } from "react"
import Link from "next/link"
import { Mail, Globe, Heart } from "lucide-react"
import { ContactModal } from "@/components/contact-modal"

export function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Mail className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">AliasGen</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Generate unlimited email aliases for better privacy and organization.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1"
              >
                <Mail className="h-3 w-3" />
                <span>Contact Developer</span>
              </button>
              <Link
                href="https://www.dimuthnilanjana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1"
              >
                <Globe className="h-3 w-3" />
                <span>Official Website</span>
              </Link>
            </div>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Developer</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Created by Dimuth Nilanjana</p>
              <Link
                href="https://www.dimuthnilanjana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                www.dimuthnilanjana.com
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">© 2024 AliasGen. All rights reserved.</p>
            <p className="text-sm text-muted-foreground flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500" />
              <span>by Dimuth Nilanjana</span>
            </p>
          </div>
        </div>
      </div>
      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    </footer>
  )
}
