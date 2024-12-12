import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
