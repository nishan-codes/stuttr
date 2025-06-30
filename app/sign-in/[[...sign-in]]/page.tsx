import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className='h-dvh w-screen flex items-center justify-center'>
      <SignIn />
    </main>
  )
}