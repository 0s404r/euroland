import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useLanguage, type Lang } from '../i18n'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

// âââ Language Switcher ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const languages: { code: Lang; flag: string; label: string }[] = [
    { code: 'pt', flag: 'ð§ð·', label: 'PT' },
    { code: 'es', flag: 'ðªð¸', label: 'ES' },
    { code: 'en', flag: 'ð¬ð§', label: 'EN' },
  ]
  return (
    <div className="flex items-center gap-1">
      {languages.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={`Switch to ${l.label}`}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
            lang === l.code
              ? 'bg-[#FF5A1F] text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="text-sm leading-none">{l.flag}</span>
          <span className="hidden sm:inline">{l.label}</span>
        </button>
      ))}
    </div>
  )
}

// âââ Marquee Bar âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function MarqueeBar() {
  const { t } = useLanguage()
  const items = Array.from({ length: 12 }, (_, i) => {
    const base = [
      { type: 'truck', key: 'marquee.freeShipping' },
      { type: 'cash', key: 'marquee.cashOnDelivery' },
      { type: 'shield', key: 'marquee.guarantee' },
    ]
    return base[i % 3]
  })

  return (
    <div className="bg-[#111] text-white overflow-hidden py-2 select-none">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-2 mx-6 text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#FF5A1F]">
              {item.type === 'truck' && (
                <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>
              )}
              {item.type === 'cash' && (
                <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></>
              )}
              {item.type === 'shield' && (
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              )}
            </svg>
            <span data-i18n={item.key}>{t(item.key)}</span>
            <span className="text-[#FF5A1F] mx-2">Â·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// âââ Header ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col leading-none">
          <span className="font-['Barlow_Condensed'] text-2xl font-black tracking-tight text-[#1a1a1a]">
            Aqua<span className="text-[#FF5A1F]">Pro</span><span className="text-gray-400">Â·ES</span>
          </span>
          <span data-i18n="header.tagline" className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">{t('header.tagline')}</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 pulse-dot shrink-0"></span>
            <span data-i18n="header.ordersOpen" className="text-sm font-semibold text-gray-700 hidden sm:inline">{t('header.ordersOpen')}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// âââ Offer Bar with Countdown ââââââââââââââââââââââââââââââââââââââââââââââââââ
function OfferBar() {
  const { t } = useLanguage()
  const INITIAL = 15 * 60
  const [secs, setSecs] = useState(INITIAL)

  useEffect(() => {
    const id = setInterval(() => {
      setSecs(s => (s <= 1 ? INITIAL : s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')

  return (
    <div className="bg-[#FF5A1F] text-white py-2.5 px-4 text-center sticky top-[57px] z-40">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span data-i18n="offer.title" className="text-sm sm:text-base font-black tracking-wide uppercase">
          {t('offer.title')}
        </span>
        <div className="flex items-center gap-1 bg-white/20 rounded-lg px-3 py-1">
          <span className="font-['Barlow_Condensed'] text-2xl font-black tabular-nums leading-none">{m}</span>
          <span className="font-black text-xl leading-none animate-pulse">:</span>
          <span className="font-['Barlow_Condensed'] text-2xl font-black tabular-nums leading-none">{s}</span>
        </div>
        <span className="text-sm sm:text-base font-black tracking-wide uppercase">!</span>
      </div>
    </div>
  )
}

// âââ Stars âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < count ? '#FF5A1F' : '#e5e7eb'} xmlns="http://www.w3.org/2000/svg">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

// âââ Hero ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const TruckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)
const CashIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
)
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

function Hero() {
  const { t } = useLanguage()
  const badges = [
    { Icon: TruckIcon, key: 'hero.badge.freeShipping' },
    { Icon: CashIcon, key: 'hero.badge.payOnReceive' },
    { Icon: ShieldIcon, key: 'hero.badge.guarantee' },
  ]

  return (
    <section className="bg-white py-8 sm:py-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Product Image */}
          <div className="relative flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl transform rotate-2"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-orange-100 p-4">
                <img
                  src="/download.png"
                  alt={t('hero.imgAlt')}
                  className="w-full h-auto object-contain rounded-2xl"
                  loading="eager"
                />
                <div data-i18n="hero.discountBadge" className="absolute top-6 left-6 bg-[#FF5A1F] text-white font-black text-sm px-3 py-1.5 rounded-full shadow-lg">
                  {t('hero.discountBadge')}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="order-1 md:order-2 space-y-4">
            <div data-i18n="hero.viewersBadge" className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full viewers-badge">
              <span className="w-2 h-2 bg-white rounded-full pulse-dot shrink-0"></span>
              {t('hero.viewersBadge')}
            </div>

            <div data-i18n="hero.limitedOffer" className="inline-flex items-center gap-2 bg-orange-100 text-[#FF5A1F] font-black text-xs px-3 py-1.5 rounded-full tracking-widest uppercase">
              {t('hero.limitedOffer')}
            </div>

            <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black leading-tight text-[#1a1a1a] uppercase">
              <span data-i18n="hero.titlePart1">{t('hero.titlePart1')}</span>{' '}
              <span data-i18n="hero.titleHighlight" className="text-[#FF5A1F]">{t('hero.titleHighlight')}</span>{' '}
              <span data-i18n="hero.titlePart2">{t('hero.titlePart2')}</span>
            </h1>

            <div className="flex items-center gap-3 flex-wrap">
              <Stars />
              <span data-i18n="hero.ratingScore" className="font-bold text-gray-700 text-sm">{t('hero.ratingScore')}</span>
              <span className="text-gray-400 text-sm">Â·</span>
              <span data-i18n="hero.customers" className="text-gray-500 text-sm font-medium">{t('hero.customers')}</span>
            </div>

            <p className="text-gray-600 leading-relaxed text-[15px]">
              <span data-i18n="hero.description">{t('hero.description')}</span>{' '}
              <strong data-i18n="hero.descriptionBold">{t('hero.descriptionBold')}</strong>{' '}
              <span data-i18n="hero.descriptionEnd">{t('hero.descriptionEnd')}</span>
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <span data-i18n="hero.price" className="font-['Barlow_Condensed'] text-5xl font-black text-[#FF5A1F] leading-none">{t('hero.price')}</span>
              <div className="flex flex-col">
                <span data-i18n="hero.oldPrice" className="text-gray-400 line-through text-xl font-medium">{t('hero.oldPrice')}</span>
                <span className="bg-red-100 text-red-600 font-black text-sm px-2 py-0.5 rounded-md w-fit">-50%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span className="text-sm font-bold text-gray-800">
                  <span data-i18n="hero.stockWarningPart1">{t('hero.stockWarningPart1')}</span>
                  <span data-i18n="hero.stockWarningPart2" className="text-[#FF5A1F]">{t('hero.stockWarningPart2')}</span>
                  <span data-i18n="hero.stockWarningPart3">{t('hero.stockWarningPart3')}</span>
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="stock-bar-fill h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
              <p data-i18n="hero.stockSold" className="text-xs text-gray-400 font-medium">{t('hero.stockSold')}</p>
            </div>

            <a
              href="#pedido"
              data-i18n="hero.ctaButton"
              className="cta-pulse block w-full bg-[#FF5A1F] hover:bg-[#E04010] active:scale-[0.98] text-white font-black text-lg py-4 rounded-2xl text-center transition-all duration-200 shadow-lg shadow-orange-200 uppercase tracking-wide"
            >
              {t('hero.ctaButton')}
            </a>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {badges.map(({ Icon, key }) => (
                <div key={key} className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl p-3 text-center">
                  <span className="text-[#FF5A1F]"><Icon /></span>
                  <span data-i18n={key} className="text-xs font-semibold text-gray-700 leading-tight">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// âââ Features ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const featureIcons = [
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 11h4"/><path d="M8 9v6"/>
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/>
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
]

function FeaturesSection() {
  const { t } = useLanguage()
  const features = Array.from({ length: 6 }, (_, i) => ({
    titleKey: `features.f${i + 1}.title`,
    descKey: `features.f${i + 1}.desc`,
    Icon: featureIcons[i],
  }))

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1a1a1a] uppercase leading-tight mb-3">
            <span data-i18n="features.title">{t('features.title')}</span><br className="hidden sm:block"/> <span data-i18n="features.titleHighlight" className="text-[#FF5A1F]">{t('features.titleHighlight')}</span>
          </h2>
          <p data-i18n="features.subtitle" className="text-gray-500 text-lg max-w-xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-100 transition-all duration-200 group">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF5A1F] mb-4 group-hover:bg-[#FF5A1F] group-hover:text-white transition-all duration-200">
                <f.Icon />
              </div>
              <h3 data-i18n={f.titleKey} className="font-bold text-[#1a1a1a] text-base mb-2">{t(f.titleKey)}</h3>
              <p data-i18n={f.descKey} className="text-gray-500 text-sm leading-relaxed">{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// âââ Use Cases âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const useCaseImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
  'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&q=80',
]

function UseCasesSection() {
  const { t } = useLanguage()
  const useCases = [
    { key: 'useCases.uc1', bg: useCaseImages[0] },
    { key: 'useCases.uc2', bg: useCaseImages[1] },
    { key: 'useCases.uc3', bg: useCaseImages[2] },
    { key: 'useCases.uc4', bg: useCaseImages[3] },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1a1a1a] uppercase leading-tight">
            <span data-i18n="useCases.title">{t('useCases.title')}</span><br/> <span data-i18n="useCases.titleHighlight" className="text-[#FF5A1F]">{t('useCases.titleHighlight')}</span> <span data-i18n="useCases.titleEnd">{t('useCases.titleEnd')}</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((uc, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer">
              <img
                src={uc.bg}
                alt={t(uc.key)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 data-i18n={uc.key} className="text-white font-bold text-sm sm:text-base leading-tight">{t(uc.key)}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// âââ How It Works ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const stepIcons = [
  () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
]

function HowItWorks() {
  const { t } = useLanguage()
  const steps = [
    { num: '1', titleKey: 'howItWorks.s1.title', descKey: 'howItWorks.s1.desc', Icon: stepIcons[0] },
    { num: '2', titleKey: 'howItWorks.s2.title', descKey: 'howItWorks.s2.desc', Icon: stepIcons[1] },
    { num: '3', titleKey: 'howItWorks.s3.title', descKey: 'howItWorks.s3.desc', Icon: stepIcons[2] },
  ]

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1a1a1a] uppercase leading-tight mb-3">
            <span data-i18n="howItWorks.title">{t('howItWorks.title')}</span><span data-i18n="howItWorks.titleHighlight" className="text-[#FF5A1F]">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p data-i18n="howItWorks.subtitle" className="text-gray-500 text-lg">{t('howItWorks.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-[#FF5A1F] rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-orange-200 relative z-10">
                <step.Icon />
              </div>
              <div className="absolute top-0 font-['Barlow_Condensed'] text-8xl font-black text-gray-100 leading-none select-none pointer-events-none" style={{ zIndex: 0 }}>
                {step.num}
              </div>
              <h3 data-i18n={step.titleKey} className="font-bold text-[#1a1a1a] text-lg mb-2 relative z-10">{t(step.titleKey)}</h3>
              <p data-i18n={step.descKey} className="text-gray-500 text-sm leading-relaxed relative z-10">{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// âââ Testimonials ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const testimonialColors = [
  'bg-pink-100 text-pink-700',
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-green-100 text-green-700',
]

function Testimonials() {
  const { t } = useLanguage()
  const testimonials = Array.from({ length: 4 }, (_, i) => ({
    nameKey: `testimonials.t${i + 1}.name`,
    cityKey: `testimonials.t${i + 1}.city`,
    textKey: `testimonials.t${i + 1}.text`,
    initialsKey: `testimonials.t${i + 1}.initials`,
    color: testimonialColors[i],
  }))

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1a1a1a] uppercase leading-tight mb-2">
            <span data-i18n="testimonials.title">{t('testimonials.title')}</span><span data-i18n="testimonials.titleHighlight" className="text-[#FF5A1F]">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p data-i18n="testimonials.subtitle" className="text-gray-500 text-lg">{t('testimonials.subtitle')}</p>
          <div className="flex justify-center mt-3">
            <Stars />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((tm, i) => (
            <div key={i} className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col">
              <Stars />
              <p data-i18n={tm.textKey} className="text-gray-700 text-sm leading-relaxed mt-4 flex-1 italic">"{t(tm.textKey)}"</p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${tm.color}`}>
                  {t(tm.initialsKey)}
                </div>
                <div>
                  <p data-i18n={tm.nameKey} className="font-bold text-sm text-[#1a1a1a]">{t(tm.nameKey)}</p>
                  <p data-i18n={tm.cityKey} className="text-xs text-gray-400">{t(tm.cityKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// âââ Order Form ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
const packs = [
  { id: 1, qty: 1, priceEach: 64.99, total: 64.99, badgeKey: null as string | null, savings: null as number | null },
  { id: 2, qty: 2, priceEach: 54.99, total: 109.98, badgeKey: 'order.bestSeller', savings: 20 },
  { id: 3, qty: 3, priceEach: 44.99, total: 134.97, badgeKey: 'order.maxSavings', savings: 60 },
]

const SKU_MAP: Record<number, string> = {
  1: 'AQUAPRO-48V-1U',
  2: 'AQUAPRO-48V-2U',
  3: 'AQUAPRO-48V-3U',
}

const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzQKOX9tXnVW2x0L-qD3j5GHqRUdGbHJZpZYzV3KmjPOd0xAfVrTMl9jIe1VpWSWrsoNQ/exec'

function OrderForm() {
  const { t } = useLanguage()
  const [selectedPack, setSelectedPack] = useState(2)
  const [form, setForm] = useState({ nombre: '', telefono: '', direccion: '', cp: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [networkError, setNetworkError] = useState('')

  const currentPack = packs.find(p => p.id === selectedPack)!

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.nombre.trim()) errs.nombre = t('order.required')
    if (!form.telefono.trim()) errs.telefono = t('order.required')
    if (!form.direccion.trim()) errs.direccion = t('order.required')
    if (!form.cp.trim()) errs.cp = t('order.required')
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setNetworkError('')
    setLoading(true)

    const payload = {
      name: form.nombre.trim(),
      sku: SKU_MAP[selectedPack],
      quantity: currentPack.qty,
      phone: form.telefono.trim(),
      email: '',
      product_title: 'Hidrolavadora PortÃ¡til InalÃ¡mbrica 48V de Alta PresiÃ³n',
      address: form.direccion.trim(),
      city: '',
      zipcod: form.cp.trim(),
      province: '',
      lead_value: currentPack.total,
      country_code: 'ES',
    }

    try {
      await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
      try {
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            value: currentPack.total,
            currency: 'EUR',
            content_ids: [SKU_MAP[selectedPack]],
            content_type: 'product',
            content_name: 'Hidrolavadora Portatil Inalambrica 48V de Alta Presion',
            num_items: currentPack.qty,
            contents: [{ id: SKU_MAP[selectedPack], quantity: currentPack.qty, item_price: currentPack.priceEach }],
          })
        }
      } catch (err) { console.error('fbq Purchase error', err) }
    } catch {
      setNetworkError(t('order.networkError'))
    } finally {
      setLoading(false)
    }
  }

  const packLabel = (qty: number) =>
    `${qty} ${qty === 1 ? t('order.unit') : t('order.units')}`

  const fields = [
    { key: 'nombre', labelKey: 'order.fieldName', type: 'text', placeholderKey: 'order.placeholderName' },
    { key: 'telefono', labelKey: 'order.fieldPhone', type: 'tel', placeholderKey: 'order.placeholderPhone' },
    { key: 'direccion', labelKey: 'order.fieldAddress', type: 'text', placeholderKey: 'order.placeholderAddress' },
    { key: 'cp', labelKey: 'order.fieldZip', type: 'text', placeholderKey: 'order.placeholderZip' },
  ]

  if (submitted) {
    return (
      <section id="pedido" className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-green-100 text-center scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 data-i18n="order.success.title" className="font-['Barlow_Condensed'] text-4xl font-black text-[#1a1a1a] mb-3">{t('order.success.title')}</h2>
            <p data-i18n="order.success.description" className="text-gray-600 mb-6">{t('order.success.description')}</p>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-left space-y-1.5 text-sm text-gray-700">
              <div className="flex justify-between"><span data-i18n="order.success.pack">{t('order.success.pack')}</span><span className="font-bold">{packLabel(currentPack.qty)}</span></div>
              <div className="flex justify-between"><span data-i18n="order.success.quantity">{t('order.success.quantity')}</span><span className="font-bold">{currentPack.qty} {currentPack.qty > 1 ? t('order.success.units') : t('order.success.unit')}</span></div>
              <div className="flex justify-between"><span data-i18n="order.success.shipping">{t('order.success.shipping')}</span><span data-i18n="order.free" className="font-bold text-green-600">{t('order.free')}</span></div>
              <div className="flex justify-between pt-1 border-t border-green-100"><span data-i18n="order.success.total" className="font-bold">{t('order.success.total')}</span><span className="font-black text-[#FF5A1F] text-base">{currentPack.total.toFixed(2).replace('.', ',')}â¬</span></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pedido" className="py-16 sm:py-20 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1a1a1a] uppercase leading-tight mb-2">
            <span data-i18n="order.title">{t('order.title')}</span><span data-i18n="order.titleHighlight" className="text-[#FF5A1F]">{t('order.titleHighlight')}</span>
          </h2>
          <p data-i18n="order.subtitle" className="text-gray-500 text-sm">
            {t('order.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1: Pack */}
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <h3 className="font-bold text-[#1a1a1a] text-lg mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-[#FF5A1F] text-white rounded-full flex items-center justify-center text-sm font-black">1</span>
                <span data-i18n="order.step1">{t('order.step1')}</span>
              </h3>
              <div className="space-y-3">
                {packs.map(pack => (
                  <label
                    key={pack.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedPack === pack.id ? 'border-[#FF5A1F] bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input type="radio" name="pack" value={pack.id} checked={selectedPack === pack.id} onChange={() => setSelectedPack(pack.id)} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPack === pack.id ? 'border-[#FF5A1F]' : 'border-gray-300'}`}>
                      {selectedPack === pack.id && <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#1a1a1a]">{packLabel(pack.qty)}</span>
                        {pack.badgeKey && (
                          <span data-i18n={pack.badgeKey} className={`text-xs font-black px-2 py-0.5 rounded-full ${pack.badgeKey === 'order.bestSeller' ? 'bg-[#FF5A1F] text-white' : 'bg-amber-100 text-amber-700'}`}>
                            {t(pack.badgeKey)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {pack.priceEach.toFixed(2).replace('.', ',')}â¬{t('order.perUnit')}{pack.savings ? ` Â· ${t('order.save')} ${pack.savings}â¬` : ''}
                      </p>
                    </div>
                    <span className="font-black text-xl text-[#FF5A1F] shrink-0">{pack.total.toFixed(2).replace('.', ',')}â¬</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Delivery data */}
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <h3 className="font-bold text-[#1a1a1a] text-lg mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-[#FF5A1F] text-white rounded-full flex items-center justify-center text-sm font-black">2</span>
                <span data-i18n="order.step2">{t('order.step2')}</span>
              </h3>
              <div className="space-y-4">
                {fields.map(field => (
                  <div key={field.key}>
                    <label data-i18n={field.labelKey} className="block text-sm font-semibold text-gray-700 mb-1.5">{t(field.labelKey)}</label>
                    <input
                      type={field.type}
                      placeholder={t(field.placeholderKey)}
                      data-i18n-placeholder={field.placeholderKey}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => {
                        setForm(f => ({ ...f, [field.key]: e.target.value }))
                        setErrors(er => ({ ...er, [field.key]: '' }))
                      }}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-[#1a1a1a] placeholder-gray-300 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors ${
                        errors[field.key] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
                      }`}
                    />
                    {errors[field.key] && <p className="mt-1 text-xs text-red-500 font-medium">{errors[field.key]}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary + Submit */}
            <div className="p-6 sm:p-8">
              <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-100 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span data-i18n="order.productLabel">{t('order.productLabel')} ({currentPack.qty} {currentPack.qty > 1 ? t('order.unitsAbbr') : t('order.unitAbbr')})</span>
                  <span className="font-semibold">{currentPack.total.toFixed(2).replace('.', ',')}â¬</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span data-i18n="order.shipping">{t('order.shipping')}</span>
                  <span data-i18n="order.free" className="font-bold text-green-600">{t('order.free')}</span>
                </div>
                <div className="flex justify-between text-[#1a1a1a] font-black text-lg pt-2 border-t border-gray-200">
                  <span data-i18n="order.totalLabel">{t('order.totalLabel')}</span>
                  <span className="text-[#FF5A1F]">{currentPack.total.toFixed(2).replace('.', ',')}â¬</span>
                </div>
              </div>

              {networkError && (
                <p className="mb-4 text-sm text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-3">{networkError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-green-200 uppercase tracking-wide flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    <span data-i18n="order.submitting">{t('order.submitting')}</span>
                  </>
                ) : (
                  <span data-i18n="order.submitButton">{t('order.submitButton')}</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 flex-wrap text-xs text-gray-400 font-semibold">
                {['order.badge1', 'order.badge2', 'order.badge3', 'order.badge4'].map(key => (
                  <span key={key} className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span data-i18n={key}>{t(key)}</span>
                  </span>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

// âââ FAQ âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function FAQ() {
  const { t } = useLanguage()
  const [open, setOpen] = useState<number | null>(null)
  const faqs = Array.from({ length: 6 }, (_, i) => ({
    qKey: `faq.q${i + 1}`,
    aKey: `faq.a${i + 1}`,
  }))

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1a1a1a] uppercase leading-tight mb-2">
            <span data-i18n="faq.title">{t('faq.title')}</span><span data-i18n="faq.titleHighlight" className="text-[#FF5A1F]">{t('faq.titleHighlight')}</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-orange-100 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-center justify-between gap-4 p-5 font-semibold text-[#1a1a1a] text-sm sm:text-base bg-white hover:bg-gray-50 transition-colors"
              >
                <span data-i18n={faq.qKey}>{t(faq.qKey)}</span>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className={`shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                >
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              <div className={`accordion-content ${open === i ? 'open' : ''}`}>
                <p data-i18n={faq.aKey} className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">{t(faq.aKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// âââ Footer ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function Footer() {
  const { t } = useLanguage()
  const guarantees = ['footer.guarantee1', 'footer.guarantee2', 'footer.guarantee3']
  const legalLinks = ['footer.privacy', 'footer.terms', 'footer.cookies', 'footer.returns', 'footer.legal']

  return (
    <footer className="bg-[#111] text-gray-300">
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-['Barlow_Condensed'] text-3xl font-black text-white mb-2">
              Aqua<span className="text-[#FF5A1F]">Pro</span><span className="text-gray-500">Â·ES</span>
            </div>
            <p data-i18n="footer.description" className="text-sm text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 data-i18n="footer.customerService" className="text-white font-bold mb-3 uppercase tracking-wider text-sm">{t('footer.customerService')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                soporte@aquapro-es.com
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +34 900 000 000
              </li>
              <li data-i18n="footer.hours" className="text-gray-500 text-xs pl-4">{t('footer.hours')}</li>
            </ul>
          </div>
          <div>
            <h4 data-i18n="footer.guaranteesTitle" className="text-white font-bold mb-3 uppercase tracking-wider text-sm">{t('footer.guaranteesTitle')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {guarantees.map(key => (
                <li key={key} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF5A1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span data-i18n={key}>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 space-y-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 justify-center">
            {legalLinks.map((key, i, arr) => (
              <span key={key} className="flex items-center gap-4">
                <a href="#" data-i18n={key} className="hover:text-[#FF5A1F] transition-colors">{t(key)}</a>
                {i < arr.length - 1 && <span className="text-gray-700 hidden sm:inline">Â·</span>}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            <strong className="text-gray-400">RGPD:</strong> <span data-i18n="footer.rgpd">{t('footer.rgpd')}</span>
          </p>
          <p data-i18n="footer.address" className="text-xs text-gray-600 text-center">
            {t('footer.address')}
          </p>
          <p data-i18n="footer.copyright" className="text-xs text-gray-700 text-center font-medium">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

// âââ Main ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarqueeBar />
      <Header />
      <OfferBar />
      <Hero />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorks />
      <Testimonials />
      <OrderForm />
      <FAQ />
      <Footer />
    </div>
  )
}
