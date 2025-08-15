'use client'
import { useAuth } from '@clerk/nextjs'

export default function Example() {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()

  const fetchExternalData = async () => {
    const token = await getToken()
    const response = await fetch('/api/auth', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    console.log(data)
    return data
  }

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Sign in to view this page</div>

  return (
    <div>
      Hello, {userId}! Your current active session is {sessionId}.
      <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer" onClick={fetchExternalData}>Fetch my Clerk data</button>
      
    </div>
  )
}
