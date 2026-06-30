import React from 'react'
import {SignUp} from '@clerk/nextjs'
const SignUpPage = () => {
  return (
    <div>
      <SignUp
        fallbackRedirectUrl="/dashboard/me"
        signInFallbackRedirectUrl="/sign-in"
      />
    </div>
  )
}

export default SignUpPage;
