import LoginForm from '@/components/auth/LoginForm'

interface PageProps {
  searchParams: Promise<{ origin: string }>
}

export default async function Page(props: PageProps) {
  const { origin } = await props.searchParams

  return (
    <section className="flex w-full flex-col gap-8 sm:max-w-[450px]">
      <LoginForm origin={origin} />
    </section>
  )
}
