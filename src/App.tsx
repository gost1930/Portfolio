import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Work } from './components/sections/Work'
import { Journey } from './components/sections/Journey'
import { Stack } from './components/sections/Stack'
import { Resume } from './components/sections/Resume'
import { Contact } from './components/sections/Contact'
import { ToastProvider } from './components/ui/ToastProvider'

export default function App() {
  return (
    <ToastProvider>
      <a
        href="#work"
        className="focus:border-line focus:bg-elevated sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-full focus:border focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <Work />
        <Journey />
        <Stack />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </ToastProvider>
  )
}
