import Navbar from '../components/navbar/Navbar'
import Hero from '../components/hero/Hero'
/*import ServicesSection from '../components/services/ServicesSection'*/
import WhyUs from '../components/why-us/WhyUs'
/*import InvestmentOpportunities from '../components/opportunities/InvestmentOpportunities'
import ProcessSection from '../components/process/ProcessSection'*/
import TrustSection from '../components/trust/TrustSection'
import CTASection from '../components/cta/CTASection'
import Footer from '../components/footer/Footer'
import AboutSection from '../components/about/AboutSection'
import ServicesPremium from '../components/services/ServicesPremium'
import WhyUsPremium from '../components/why-us/WhyUsPremium'
import InvestmentPremium from '../components/opportunities/InvestmentPremium'
import ProcessPremium from '../components/process/ProcessPremium'
import TrustPremium from '../components/trust/TrustPremium'
import CTAPremium from '../components/cta/CTAPremium'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesPremium />
      <WhyUs />
      <WhyUsPremium />
      <InvestmentPremium />
      <ProcessPremium />
      <TrustPremium />
      <CTAPremium />
      <Footer />
    </>
  )
}