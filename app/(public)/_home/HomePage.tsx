import FAQSection from './FAQSection'
import Features from './Features'
import Hero from './Hero'
import Pricing from './Pricing'
import Steps from './Steps'
import Testimonials from './Testimonials'
import TrendingDestinations from './TrendingDestinations'

export default function HomePage() {
  return (

    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 pb-20">
      <Hero />
      <TrendingDestinations />
      <Steps />
      <Features />
      <Testimonials />
      <FAQSection />
      <Pricing />
    </main>
  )
}