import { useRouter } from 'next/router'

export default function Schedule() {
  const router = useRouter()

  return (
    <div>
      <h1>{router.query.username}`s Schedule</h1>
    </div>
  )
}
