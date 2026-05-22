import { useEffect } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { LanguageProvider } from '../i18n'
import '../styles.css'

const META_PIXEL_ID = '4509995009326378'

function MetaPixel() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((window as any).fbq) return
    var n: any = (window as any).fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!(window as any)._fbq) (window as any)._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    var t = document.createElement('script')
    t.async = true
    t.src = 'https://connect.facebook.net/en_US/fbevents.js'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode!.insertBefore(t, s)
    ;(window as any).fbq('init', META_PIXEL_ID)
    ;(window as any).fbq('track', 'PageView')
  }, [])
  return null
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Lavadora de Alta Pressao Portatil 48V — Pagamento na Entrega · Frete Gratis 24/48h' },
      { name: 'description', content: 'Compre a Lavadora de Alta Pressao Portatil Sem Fio 48V AquaPro. Pagamento na entrega. Frete gratis 24/48h. Garantia de 30 dias.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600;700;800&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <MetaPixel />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Scripts />
      </body>
    </html>
  )
}
