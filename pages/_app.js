import '../styles/globals.css'
import Image from 'next/image'
import { Analytics } from '@vercel/analytics/react'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen">
      <header className="p-4">
        <Image 
          src="https://images.ctfassets.net/jtqsy5pye0zd/6wNuQ2xMvbw134rccObi0q/bf61badc6d6d9780609e541713f0bba6/Contentful_Logo_2.5_Dark.svg" 
          alt="Contentful" 
          width={160} 
          height={34}
          priority
        />
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </div>
  )
}
