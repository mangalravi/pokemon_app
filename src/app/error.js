'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => console.error(error), [error])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="mt-4 btn">
        Try Again
      </button>
    </div>
  )
}
