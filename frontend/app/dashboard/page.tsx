'use client'

import axios from 'axios'
import React, { useState } from 'react'

const DashboardPage = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {

      e.preventDefault()
      const res = await axios.post('http://localhost:8000/api/project/create', {
        title: title,
        description: description,
        status: status
      })
    } catch (error) {
      // TODO: Add proper error handling

    }
  }
  return (
    <div className='h-screen w-full flex flex-row justify-center   border-2 rounded-lg'>
      <div className=' border-4 border-blue-500 w-full rounded-lg  p-4    '>

        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Title</label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' id='title' />

          <label htmlFor='description'>Description</label>
          <input onChange={(e) => setDescription(e.target.value)} value={description} type='text' id='description' />

          <label htmlFor='status'>Status</label>
          <input onChange={(e) => setStatus(e.target.value)} value={status} type='text' id='status' />

          <button type='submit'> Create</button>

        </form>

      </div>

    </div>
  )
}


export default DashboardPage
