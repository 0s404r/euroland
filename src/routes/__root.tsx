import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { LanguageProvider } from '../i18n'
import '../styles.css'

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
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Scripts />
      </body>
    </html>
  )
}
