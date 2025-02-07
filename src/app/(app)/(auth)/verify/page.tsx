import MainContainer from '@/components/MainContainer'
import VerificationStatus from '@/components/status/VerificationStatus'
import { cn } from '@/utils'
import Image from 'next/image'

const Verify = async (props: { searchParams: Promise<{ token: string, to: string }> }) => {
  const { token, to } = await props.searchParams

  return (
    <MainContainer className="flex h-[65dvh] items-center justify-center">
      <section className="my-auto relative flex flex-col items-center justify-center">
        {token && typeof token === 'string' ? (
          <div className="-mt-16">
            <VerificationStatus token={token} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center -mt-16">
            <header className="relative h-80 w-80 text-foreground">
              <Image src="/email-sent.png" alt="email sent image" fill />
            </header>
            <h2 className="font-bold text-2xl">Check your email!</h2>
            <p className="text-center font-medium text-primary-700">
              We&apos;ve sent a verification link to{' '}
              <span
                className={cn({ 'font-semibold text-foreground': to })}
              >
                {to || 'your email'}.
              </span>
            </p>
          </div>
        )}
      </section>
    </MainContainer>
  )
}

export default Verify
