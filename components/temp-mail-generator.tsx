"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Copy,
  Mail,
  RefreshCwIcon as Refresh,
  Clock,
  User,
  Calendar,
  Eye,
  Trash2,
  Download,
  Check,
  AlertCircle,
  Inbox,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

interface TempEmail {
  id: string
  email: string
  domain: string
  createdAt: Date
  expiresAt: Date
}

interface EmailMessage {
  id: string
  from: string
  subject: string
  body: string
  receivedAt: Date
  isRead: boolean
  attachments?: string[]
}

export function TempMailGenerator() {
  const [currentEmail, setCurrentEmail] = useState<TempEmail | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [emailPassword, setEmailPassword] = useState<string>("")
  const [messages, setMessages] = useState<EmailMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const { toast } = useToast()

  const generateTempEmail = async () => {
    setIsGenerating(true)
    try {
      const randomUser = Math.random().toString(36).substring(2, 10)
      const email = `${randomUser}@mail.tm`
      const password = Math.random().toString(36).substring(2, 10)

      setEmailPassword(password)

      await fetch("https://api.mail.tm/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: email, password }),
      })

      const tokenRes = await fetch("https://api.mail.tm/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: email, password }),
      })

      const tokenData = await tokenRes.json()
      setAuthToken(tokenData.token)

      const newTempEmail: TempEmail = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        domain: "mail.tm",
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      }

      setCurrentEmail(newTempEmail)
      setMessages([])
      setSelectedMessage(null)

      toast({
        title: "Temporary Email Generated!",
        description: "Your email is ready: " + email,
      })

      if (autoRefresh) startAutoRefresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate temp email",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyEmailToClipboard = async () => {
    if (!currentEmail) return
    try {
      await navigator.clipboard.writeText(currentEmail.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
      toast({ title: "Copied!", description: "Email address copied to clipboard." })
    } catch {
      toast({ title: "Copy Failed", description: "Could not copy.", variant: "destructive" })
    }
  }

  const fetchMessages = async () => {
    if (!authToken) return
    setIsRefreshing(true)
    try {
      const res = await fetch("https://api.mail.tm/messages", {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      const data = await res.json()

      const mapped: EmailMessage[] = data["hydra:member"].map((msg: any) => ({
        id: msg.id,
        from: msg.from?.address || "Unknown",
        subject: msg.subject,
        body: msg.intro || "(No preview available)",
        receivedAt: new Date(msg.createdAt),
        isRead: msg.seen,
      }))

      setMessages(mapped)

      if (mapped.length > 0) {
        toast({
          title: "New Messages",
          description: `${mapped.length} messages received.`,
        })
      }
    } catch {
      toast({
        title: "Fetch Failed",
        description: "Could not retrieve messages.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const startAutoRefresh = () => {
    const interval = setInterval(() => {
      if (currentEmail && autoRefresh) {
        fetchMessages()
      }
    }, 30000)
    return () => clearInterval(interval)
  }

  const markAsRead = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg)))
  }

  const deleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null)
    }
    toast({ title: "Message Deleted", description: "Removed from inbox." })
  }

  const selectMessage = (message: EmailMessage) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      markAsRead(message.id)
    }
  }

  const isEmailExpired = () => {
    return currentEmail && new Date() > currentEmail.expiresAt
  }

  useEffect(() => {
    let cleanup: (() => void) | undefined
    if (currentEmail && autoRefresh) {
      cleanup = startAutoRefresh()
    }
    return cleanup
  }, [currentEmail, autoRefresh])

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Temporary Email Generator</span>
          </CardTitle>
          <CardDescription>
            Generate a temporary email address that expires automatically. Perfect for testing and avoiding spam.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!currentEmail ? (
            <div className="text-center py-8">
              <Button onClick={generateTempEmail} disabled={isGenerating} size="lg">
                {isGenerating ? (
                  <>
                    <Refresh className="h-4 w-4 mr-2 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" /> Generate Temp Email
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">Your Temporary Email:</span>
                    {isEmailExpired() && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" /> Expired
                      </Badge>
                    )}
                  </div>
                  <code className="text-lg font-mono break-all">{currentEmail.email}</code>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Created {formatDistanceToNow(currentEmail.createdAt)} ago</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Expires {formatDistanceToNow(currentEmail.expiresAt)}</span>
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={copyEmailToClipboard}>
                    {copiedEmail ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={generateTempEmail} disabled={isGenerating}>
                    <Refresh className={`h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Button size="sm" variant="outline" onClick={fetchMessages} disabled={isRefreshing}>
                    {isRefreshing ? (
                      <>
                        <Refresh className="h-3 w-3 mr-1 animate-spin" /> Checking...
                      </>
                    ) : (
                      <>
                        <Refresh className="h-3 w-3 mr-1" /> Check Mail
                      </>
                    )}
                  </Button>
                  <Badge variant="secondary">{messages.length} messages</Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    id="autoRefresh"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="autoRefresh">Auto-refresh (30s)</label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
