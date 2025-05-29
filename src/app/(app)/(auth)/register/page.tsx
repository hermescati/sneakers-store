import RegistrationForm from '@/components/auth/RegistrationForm'

export default function Page() {
  return (
    <section className="flex w-full flex-col gap-8 sm:max-w-[450px]">
      <header>
        <h1 className="text-2xl font-bold">Join the Sneaker Revolution</h1>
        <p className="font-medium text-primary-600">
          Get started for a seamless shopping experience
        </p>
      </header>

      <RegistrationForm />
    </section>
  )
}
