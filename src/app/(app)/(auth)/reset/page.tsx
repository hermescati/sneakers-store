import EmailSent from '@/components/auth/EmailSent'
import ResetPassForm from '@/components/auth/ResetPassForm'

interface PageProps {
  searchParams: Promise<{ token: string; to: string }>
}

export default async function Page(props: PageProps) {
  const { to, token } = await props.searchParams

  return (
    <section className="flex w-full flex-col gap-8 sm:max-w-[450px]">
      {token && typeof token === 'string' ? (
        <ResetPassForm token={token} />
      ) : (
        <EmailSent variant="reset" to={to} />
      )}
    </section>
  )
}
