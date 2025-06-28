"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailAliasGenerator } from "@/components/email-alias-generator"
import { TempMailGenerator } from "@/components/temp-mail-generator"
import { Shield, Mail } from "lucide-react"

export function TabsInterface() {
  return (
    <Tabs defaultValue="alias" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="alias" className="flex items-center space-x-2">
          <Shield className="h-4 w-4" />
          <span>Email Aliases</span>
        </TabsTrigger>
        <TabsTrigger value="tempmail" className="flex items-center space-x-2">
          <Mail className="h-4 w-4" />
          <span>Temp Mail</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="alias" className="space-y-8">
        <EmailAliasGenerator />
      </TabsContent>

      <TabsContent value="tempmail" className="space-y-8">
        <TempMailGenerator />
      </TabsContent>
    </Tabs>
  )
}
