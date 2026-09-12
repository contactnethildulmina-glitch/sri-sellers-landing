import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { Plans } from '../components/Plans'
import { HowItWorks } from '../components/HowItWorks'
import { Faq } from '../components/Faq'
import { FinalCta } from '../components/FinalCta'
import { Footer } from '../components/Footer'

export function LandingPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Features />
        <Plans />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
