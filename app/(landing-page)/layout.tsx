import Footer from './footer'
import Navbar from './navbar'

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-landingPage-blackPrimary dark:bg-landingPage-blackPrimary flex min-h-screen flex-col'>
      <Navbar />

      {children}

      <Footer />
    </div>
  )
}
