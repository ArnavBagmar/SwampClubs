"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This is where you would integrate with your auth provider
      // For example: await sendPasswordResetEmail(email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitted(true)
      toast("Reset link sent", {
        description: "If an account exists with that email, you'll receive a password reset link.",
      })
    } catch (error) {
      toast("Error", {
        description: "There was a problem sending the reset link. Please try again.",
        style: { backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)' }
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center gap-2 font-bold text-2xl justify-center mb-6">
            <div className="size-10 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white">
              SC
            </div>
            <span>SwampClubs</span>
          </div>
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground mt-2">
            {!submitted
              ? "Enter your email and we'll send you a link to reset your password"
              : "Check your email for a link to reset your password"}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <Button type="submit" className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        ) : (
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <p>If an account exists for <span className="font-medium">{email}</span>, you'll receive an email with a link to reset your password.</p>
          </div>
        )}

        <div className="text-center">
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}