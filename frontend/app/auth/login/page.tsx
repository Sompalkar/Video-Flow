'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

const LoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        'http://localhost:8000/api/user/login',
        { email, password },
        { withCredentials: true }
      )
      return res.data
    },
    onSuccess: () => {
      router.push('/dashboard')
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href="/auth/register">Create account</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>

        <CardFooter />
      </Card>
    </div>
  )
}

export default LoginPage
