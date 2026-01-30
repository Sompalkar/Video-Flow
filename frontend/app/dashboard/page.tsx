'use client'

import axios from 'axios'
import React, { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Project {
  _id: string
  title: string
  description: string
  status: string
}

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/project/getProject', {
        withCredentials: true
      })
      if (res.data && res.data.project) {
        setProjects(res.data.project)
      }
    } catch (error) {
      console.log('Error fetching projects:', error)
    }
  }

  React.useEffect(() => {
    fetchProjects()
  }, [])

  const handleCancel = () => {
    setTitle('')
    setDescription('')
    setStatus('draft')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)

      await axios.post('http://localhost:8000/api/project/create', {
        title,
        description,
        status,
      }, { withCredentials: true })

      // clear form
      setTitle('')
      setDescription('')
      setStatus('draft')
      fetchProjects() // Refresh list
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className='flex flex-row justify-between items-center w-full gap-4'>
        <div className="flex-1 space-y-4 max-w-2xl">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <div className="grid gap-4">
            {projects.length === 0 ? (
              <p className="text-muted-foreground">No projects found. Create one to get started!</p>
            ) : (
              projects.map((project) => (
                <Card key={project._id} className="p-4">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 px-1">{project.description}</p>
                  <div className="mt-2 text-xs font-semibold px-1 py-1 rounded-full bg-secondary w-fit">
                    {project.status}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
        <div className="flex-1 max-w-xl">

          <Card className="w-full max-w-xl rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Create New Project</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write project description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {description.length} / 500
                  </p>
                </div>

                {/* Status Select */}
                <div className="space-y-2">
                  <Label>Status</Label>

                  <Select value={status} onValueChange={(val) => setStatus(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                {/* Submit & Cancel */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
