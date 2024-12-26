import MainContainer from '@/components/MainContainer'
import VerificationStatus from '@/components/status/VerificationStatus'
import { cn } from '@/utils'
import Image from 'next/image'

const Verify = async (
  { params } : { params: Promise<
    { [key: string]: string | string[] | undefined }
  >}) => {
  const token = (await params).token
  const toEmail = (await params).to

  return (
    <MainContainer className="flex items-center justify-center">
      <section className="my-auto relative flex flex-col items-center justify-center">
        {token && typeof token === 'string' ? (
          <div className="-mt-32">
            <VerificationStatus token={token} />
          </div>
        ) : (
          <div className="-mt-32 flex flex-col items-center justify-center">
            <header className="relative h-96 w-96 text-foreground">
              <Image src="/email-sent.png" alt="email sent image" fill />
            </header>
            <h2 className="-mt-8 font-bold text-2xl">Check your email!</h2>
            <p className="mt-2 text-center font-medium text-gray-600">
              We&apos;ve sent a verification link to{' '}
              <span
                className={cn({ 'font-semibold text-foreground': toEmail })}
              >
                {toEmail || 'your email'}.
              </span>
            </p>
          </div>
        )}
      </section>
    </MainContainer>
  )
}

export default Verify
