import { EmailAliasGenerator } from "@/components/email-alias-generator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
              Email Alias Generator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate multiple email aliases instantly. Perfect for privacy, organization, and avoiding spam.
            </p>
          </div>
          <EmailAliasGenerator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
