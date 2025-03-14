import Link from 'next/link'
import { SignInForm } from '@/components/form/auth/signin'

export default async function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />

      <div>
        Don&apos;t have an account?
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  )
}
