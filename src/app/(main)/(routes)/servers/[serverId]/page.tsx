"use client";
import { useParams } from 'next/navigation'

const ServerIdPage = () => {
  const params = useParams<{serverId: string}>()
  return (
    <div>server: {params?.serverId}</div>
  )
}

export default ServerIdPage