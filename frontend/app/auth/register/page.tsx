
'use client'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { register } from 'module'

const page = () => {
  const Router = useRouter()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const registerMutation = useMutation({
    mutationFn: async () => {
      
      const res = await axios.post('http://localhost:8000/api/user/register', {
        name, email, password
      })
      return res.data
    },
    onSuccess: () => {
      Router.push('/auth/login')

    }
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registerMutation.mutate()

  }
  return (
    <div className=' w-full min-h-screen flex  items-center justify-center'>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your email below to register your account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input onChange={(e) => setPassword(e.target.value)}
                  value={password}

                  id="password" type="password" required />
              </div>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                  {registerMutation.isPending? 'Registering..' : 'Register'}
                </Button>

              </CardFooter>
            </div>

          </form>

        </CardContent>

      </Card>

    </div>

  )
}

export default page