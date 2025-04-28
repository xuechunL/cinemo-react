import { SignUpForm } from '@/components/forms/auth/signup'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up for an account',
}

export default async function SignUp() {
  return (
    <>
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <SignUpForm />
    </>
  )
}
