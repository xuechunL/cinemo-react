import Link from 'next/link'
import { SignInForm } from '@/components/forms/auth/signin'

export default async function SignIn() {
  return (
    <>
      <h1 className="text-2xl font-bold">Sign In</h1>

      <SignInForm />

      <div className="mt-4 flex items-center justify-center gap-2">
        Don&apos;t have an account?
        <Link
          href="/signup"
          className="text-blue-500 hover:underline font-bold"
        >
          Sign Up
        </Link>
      </div>
    </>
  )
}
