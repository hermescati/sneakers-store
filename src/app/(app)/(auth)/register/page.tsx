import RegistrationForm from '@/components/auth/RegistrationForm'

export default function Page() {
  return (
    <section className='flex flex-col gap-8 w-full sm:max-w-[450px]'>
      <header>
        <h1 className='font-bold text-2xl'>Join the Sneaker Revolution</h1>
        <p className='font-medium text-primary-600'>
          Get started for a seamless shopping experience
        </p>
      </header>

      <RegistrationForm />
    </section>
  )
}
