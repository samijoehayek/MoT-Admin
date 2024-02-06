"use client";

import React from 'react'
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter()
  return (
    <div onClick={() => {router.push('/dashboard/users')}}>Click to go to users page</div>
  )
}
