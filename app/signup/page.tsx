"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, ArrowLeft} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      console.log("Token stored:", data.token);
      
      toast("Account created!", {
        description: "You have successfully created an account.",
      });

      // Create a form and submit it to force a server-side navigation
      const form = document.createElement('form');
      form.method = 'GET';
      form.action = '/dashboard';
      document.body.appendChild(form);
      form.submit();
      
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = error instanceof Error ? error.message : "There was a problem creating your account. Please try again.";
      toast("Error", {
        description: errorMessage,
        style: { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" },
      });
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
            <h1 className="text-3xl font-bold">Join SwampClubs</h1>
            <p className="text-muted-foreground">Connect with UF clubs and Gators</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                <Label htmlFor="password">Password</Label>
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
                <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long</p>
              </div>
            </div>

            <Button type="submit" className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
              {isLoading ? "Creating your account..." : "Create account"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-orange-500 hover:text-orange-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>

        
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-500 to-blue-600 text-white p-12 lg:p-16 items-center justify-center">
          <div className="max-w-md space-y-6">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <div className="size-10 rounded-lg bg-white/10 flex items-center justify-center text-white">SC</div>
              <span>SwampClubs</span>
            </div>
            <h2 className="text-3xl font-bold">Join the UF Campus Life</h2>
            <p className="text-white/90">
              Find clubs aligned with your interests, connect with students, and make the most of your UF socials.
            </p>
            <div className="bg-white/10 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div className="font-medium">Discover all UF clubs in one place</div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="size-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div className="font-medium">Join club-specific group chats</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div className="font-medium">Stay updated on campus events</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}