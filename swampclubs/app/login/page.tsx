"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This is where you would integrate with your auth provider
      // For example: await signIn('credentials', { email, password })

      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast("Success!", {
        description: "You have successfully logged in.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast("Error", {
        description: "Invalid email or password. Please try again.",
        style: { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 lg:p-16 justify-center">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold">Welcome back, Gator</h1>
            <p className="text-muted-foreground">Enter your information to access the SwampClubs community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@ufl.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950"
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-orange-500 hover:text-orange-600 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>

        {/* Right side - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-500 to-blue-600 text-white p-12 lg:p-16 items-center justify-center">
          <div className="max-w-md space-y-6">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <div className="size-10 rounded-lg bg-white/10 flex items-center justify-center text-white">SC</div>
              <span>SwampClubs</span>
            </div>
            <h2 className="text-3xl font-bold">Connect with UF Clubs and Students</h2>
            <p className="text-white/90">
              Join thousands of fellow Gators who use SwampClubs to discover clubs, attend events, and build connections
              on campus.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold text-xl">200+</div>
                <div className="text-white/80 text-sm">Active clubs</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="font-bold text-xl">5,000+</div>
                <div className="text-white/80 text-sm">UF students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

