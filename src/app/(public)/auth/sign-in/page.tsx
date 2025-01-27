import type { Metadata } from 'next'
import { SignInForm } from './sign-in-form'
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page.header'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-2 text-center">
            <PageHeaderHeading>Gestão Municipal</PageHeaderHeading>
            <PageHeaderDescription>
              Governe com organização.
            </PageHeaderDescription>
          </div>
        </div>

        <SignInForm />
      </div>
    </div>
  )
}


