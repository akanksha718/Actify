import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn 
    fallbackRedirectUrl="/dashboard/me"
        signUpFallbackRedirectUrl="/sign-in"
  />
}