import MainContainer from '@/components/MainContainer'
import VerificationStatus from '@/components/VerificationStatus'
import Image from 'next/image'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const VerifyPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token
  const toEmail = searchParams.to

  return (
    <MainContainer className="flex items-center justify-center">
      <div className="my-auto relative flex flex-col items-center justify-center">
        {token && typeof token === 'string' ? (
          <div className="-mt-32">
            <VerificationStatus token={token} />
          </div>
        ) : (
          <div className="-mt-32 flex flex-col items-center justify-center">
            <div className="relative h-96 w-96 text-foreground">
              <Image src="/email-sent.png" alt="email sent image" fill />
            </div>
            <h2 className="-mt-8 font-bold text-2xl">Check your email!</h2>
            {toEmail ? (
              <p className="mt-1 text-center font-medium text-gray-600">
                We&apos;ve sent a verification link to{' '}
                <span className="mt-1 font-semibold text-foreground">
                  {toEmail}
                </span>
                .
              </p>
            ) : (
              <p className="mt-1 text-center font-medium text-gray-600">
                We&apos;ve send a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </MainContainer>
  )
}

export default VerifyPage
