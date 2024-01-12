import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link className={buttonVariants()} href="/admin">Shorten a url</Link>
      <Link className="pl-4"href="/documentation">
        <Button className={buttonVariants()}>Documentation</Button>
      </Link>
    </div>
    
  )
}
