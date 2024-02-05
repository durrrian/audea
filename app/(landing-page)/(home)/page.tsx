import Features from './features'
import Integration from './integrations'
import MainSection from './main-section'
import Pricing from './pricing'
import Usecase from './use-case'

export default function Page() {
  return (
    <main className='mb-10 mt-20'>
      <MainSection />

      <section className='mt-10 space-y-20'>
        <Features />

        <Usecase />

        <Integration />

        <Pricing />
      </section>
    </main>
  )
}
