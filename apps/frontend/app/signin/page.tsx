"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username,setusername]=useState("")
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      username,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    })
    
  } 
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="username"
        placeholder="username"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign in</button>
    </form>
  )
}
