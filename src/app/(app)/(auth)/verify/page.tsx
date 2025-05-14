import EmailSent from '@/components/auth/EmailSent'
import VerificationStatus from '@/components/status/VerificationStatus'

interface PageProps {
  searchParams: Promise<{ token: string; to: string }>
}

export default async function Page(props: PageProps) {
  const { to, token } = await props.searchParams

  return (
    <section className="my-auto relative flex flex-col items-center justify-center">
      {token && typeof token === 'string' ? (
        <VerificationStatus token={token} />
      ) : (
        <EmailSent variant="verify" to={to} />
      )}
    </section>
  )
}
