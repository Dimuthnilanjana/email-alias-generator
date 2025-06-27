"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Mail, Shuffle, Download, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function EmailAliasGenerator() {
  const [email, setEmail] = useState("")
  const [aliases, setAliases] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { toast } = useToast()

  const generateAliases = () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    const [username, domain] = email.split("@")
    const aliasTypes = [
      // Dot variations
      ...Array.from({ length: 10 }, (_, i) => `${username}.${i + 1}@${domain}`),
      // Plus variations
      ...Array.from({ length: 15 }, (_, i) => `${username}+${i + 1}@${domain}`),
      // Service-specific aliases
      `${username}+shopping@${domain}`,
      `${username}+social@${domain}`,
      `${username}+work@${domain}`,
      `${username}+newsletter@${domain}`,
      `${username}+banking@${domain}`,
      `${username}+travel@${domain}`,
      `${username}+gaming@${domain}`,
      `${username}+support@${domain}`,
      // Year-based aliases
      `${username}+2024@${domain}`,
      `${username}+2025@${domain}`,
      // Random combinations
      ...Array.from({ length: 20 }, (_, i) => {
        const suffixes = ["temp", "test", "backup", "alt", "secondary", "primary", "main", "extra", "special", "custom"]
        return `${username}+${suffixes[i % suffixes.length]}${Math.floor(Math.random() * 100)}@${domain}`
      }),
    ]

    setAliases(aliasTypes.slice(0, 50))
    toast({
      title: "Aliases Generated!",
      description: `Generated ${Math.min(aliasTypes.length, 50)} email aliases.`,
    })
  }

  const copyToClipboard = async (alias: string, index: number) => {
    try {
      await navigator.clipboard.writeText(alias)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
      toast({
        title: "Copied!",
        description: "Email alias copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const downloadAliases = () => {
    if (aliases.length === 0) return

    const content = aliases.join("\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "email-aliases.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Email aliases downloaded as text file.",
    })
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Generate Email Aliases</span>
          </CardTitle>
          <CardDescription>
            Enter your email address to generate multiple aliases for privacy and organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={generateAliases} className="sm:w-auto">
              <Shuffle className="h-4 w-4 mr-2" />
              Generate Aliases
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {aliases.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Generated Aliases</CardTitle>
                <CardDescription>
                  <Badge variant="secondary" className="mt-1">
                    {aliases.length} aliases generated
                  </Badge>
                </CardDescription>
              </div>
              <Button onClick={downloadAliases} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aliases.map((alias, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm font-mono truncate flex-1 mr-2">{alias}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(alias, index)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    <span className="sr-only">Copy alias</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>How Email Aliases Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Plus (+) Aliases</h3>
              <p className="text-sm text-muted-foreground">
                Most email providers support plus aliases. Emails sent to username+anything@domain.com will be delivered
                to username@domain.com.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Dot (.) Aliases</h3>
              <p className="text-sm text-muted-foreground">
                Gmail ignores dots in email addresses. user.name@gmail.com and username@gmail.com are treated as the
                same address.
              </p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Benefits</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Track which services share or sell your email</li>
              <li>• Organize emails with filters and labels</li>
              <li>• Reduce spam by using unique aliases for each service</li>
              <li>• Maintain privacy while signing up for services</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
