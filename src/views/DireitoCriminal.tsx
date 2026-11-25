'use client'

import { useEffect } from 'react'
import LeadForm from '@/components/LeadForm'
import UrgencyTotem from '@/components/UrgencyTotem'
import WhatsAppFloatingButton, { WhatsAppIcon, PHONE, MESSAGE } from '@/components/WhatsAppFloatingButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  ShieldCheck,
  Gavel,
  Landmark,
  FileSearch,
  Pill,
  Car,
  Wallet,
  HeartCrack,
  KeyRound,
  ArrowRight,
  CircleAlert,
  Siren,
  Lock,
  Clock,
} from 'lucide-react'

const MAIN_SITE = 'https://garciamarangoni.adv.br'
const WHATSAPP_HREF = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

// Quando procurar um criminalista
const SITUACOES = [
  'Alguém da família foi preso em flagrante.',
  'Você foi intimado para depor na delegacia.',
  'Houve busca e apreensão na casa ou empresa.',
  'Existe processo ou audiência criminal marcada.',
]

// `assunto` precisa bater com uma opção de AREAS do LeadForm
const AREAS = [
  { icon: Siren, title: 'Prisão em flagrante', assunto: 'Prisão em flagrante' },
  { icon: KeyRound, title: 'Habeas Corpus', assunto: 'Habeas Corpus' },
  { icon: FileSearch, title: 'Inquérito policial', assunto: 'Inquérito policial' },
  { icon: Gavel, title: 'Tribunal do Júri', assunto: 'Tribunal do Júri' },
  { icon: Pill, title: 'Lei de Drogas', assunto: 'Lei de Drogas' },
  { icon: HeartCrack, title: 'Violência doméstica', assunto: 'Violência doméstica' },
  { icon: Car, title: 'Crimes de trânsito', assunto: 'Crimes de trânsito' },
  { icon: Wallet, title: 'Crimes contra o patrimônio', assunto: 'Crimes contra o patrimônio' },
  { icon: Landmark, title: 'Execução penal e recursos', assunto: 'Execução penal e recursos' },
]

const SOCIOS = [
  { nome: 'Dr. Tayson Garcia', oab: 'OAB/ES 43.094', foto: '/images/socio-tayson-serio.jpg' },
  { nome: 'Dr. Lucier Marangoni', oab: 'OAB/ES 43.165', foto: '/images/socio-lucier-serio.jpg' },
]

const FAQ = [
  {
    q: 'Um familiar foi preso em flagrante. O que fazer agora?',
    a: 'Chame um advogado imediatamente. A audiência de custódia acontece normalmente em até 24 horas, e é nela que se discute se a pessoa responde em liberdade. Até lá, o preso tem direito ao silêncio e a um advogado.',
  },
  {
    q: 'A família pode contratar o advogado pela pessoa presa?',
    a: 'Sim. É o mais comum: um familiar faz o primeiro contato, e o advogado vai até o cliente e assume a defesa.',
  },
  {
    q: 'O contato é sigiloso?',
    a: 'Sim. Tudo o que você contar, desde a primeira mensagem, é protegido pelo sigilo profissional da advocacia.',
  },
]

// Todo link para #formulario rola suave até o form, destaca o card e foca o primeiro campo
function useFormScrollTransition() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('a[href="#formulario"]')
      const form = document.getElementById('formulario')
      if (!link || !form) return
      e.preventDefault()

      const assunto = link.getAttribute('data-assunto')
      if (assunto) window.dispatchEvent(new CustomEvent('lead:assunto', { detail: assunto }))

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
      history.replaceState(null, '', '#formulario')

      let done = false
      const arrive = () => {
        if (done) return
        done = true
        window.removeEventListener('scrollend', arrive)
        form.classList.remove('form-arrive')
        void form.offsetWidth // reinicia a animação se clicar de novo
        form.classList.add('form-arrive')
        // No celular o foco abriria o teclado e cobriria o card: só foca com mouse
        if (window.matchMedia('(pointer: fine)').matches) {
          form.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true })
        }
      }
      window.addEventListener('scrollend', arrive)
      setTimeout(arrive, reduceMotion ? 0 : 1200) // navegadores sem scrollend
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

export default function DireitoCriminal() {
  useFormScrollTransition()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER ENXUTO */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-border">
        <div className="container flex items-center justify-between h-16 sm:h-20">
          <a href="/" aria-label="Página inicial" className="flex items-center shrink-0">
            <img src="/images/logo-garcia-marangoni.png" alt="Garcia & Marangoni Advocacia" className="h-9 sm:h-14 w-auto" />
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#15803d] transition-colors"
          >
            <WhatsAppIcon size={16} />
            <span className="hidden sm:inline">Falar com o advogado agora</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[#0B0B0C] text-white overflow-hidden md:min-h-[85vh] lg:min-h-[calc(100svh-5rem)] md:flex md:items-center">
        {/* Foto dos sócios: banner no topo no mobile, metade direita com degradê no desktop */}
        <div className="relative h-72 sm:h-96 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[55%]">
          <img
            src="/images/hero-socios-serio.jpg"
            alt="Os advogados Tayson Garcia e Lucier Marangoni"
            className="w-full h-full object-cover object-[center_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/25 to-transparent md:bg-gradient-to-r md:from-[#0B0B0C] md:via-[#0B0B0C]/30 md:to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_bottom_left,#C81E1E,transparent_50%)] pointer-events-none" />

        <div className="container relative -mt-12 pb-14 md:mt-0 md:py-20">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-widest uppercase text-white mb-5">
              <Siren size={14} /> Advogado Criminalista<span className="hidden sm:inline"> · Grande Vitória/ES</span>
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5">
              Preso, intimado ou investigado? <span className="text-[#EF4444]">Fale agora com um advogado.</span>
            </h1>
            <p className="text-lg text-white/75 mb-8">
              Nas primeiras horas, cada decisão pesa. Atendemos você ou sua família, com sigilo total.
            </p>
            <UrgencyTotem />
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2"><Clock size={16} className="text-[#EF4444]" /> Resposta imediata</li>
              <li className="flex items-center gap-2"><Lock size={16} className="text-[#EF4444]" /> Sigilo absoluto</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#EF4444]" /> Da delegacia aos tribunais</li>
            </ul>
          </div>
        </div>
      </section>

      {/* QUANDO CHAMAR */}
      <section className="py-16 bg-[#F4F2F1]">
        <div className="container grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-14 items-center">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Não espere</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Chame um criminalista agora se:
            </h2>
            <p className="text-foreground/65 max-w-md">
              Você tem o direito de ficar em silêncio e de ter um advogado desde a delegacia <span className="whitespace-nowrap">(CF, art. 5º, LXIII)</span>.
            </p>
          </div>
          <div>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {SITUACOES.map(d => (
                <li key={d} className="flex items-center gap-3 rounded-lg border-l-4 border-primary bg-white px-4 py-4 text-sm sm:text-base font-medium text-foreground shadow-sm">
                  <CircleAlert size={20} className="shrink-0 text-primary" strokeWidth={2} />
                  {d}
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg bg-[#16a34a] px-7 py-4 text-base font-semibold text-white shadow-md shadow-[#16a34a]/30 hover:bg-[#15803d] transition-colors"
            >
              <WhatsAppIcon size={20} className="shrink-0" />
              Falar com o advogado agora
            </a>
          </div>
        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-tight">
            Atuamos em
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AREAS.map((a) => {
              const Icon = a.icon
              return (
                <a
                  key={a.title}
                  href="#formulario"
                  data-assunto={a.assunto}
                  className="group flex items-center gap-4 rounded-lg border border-foreground/10 px-5 py-4 transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <Icon size={20} className="shrink-0 text-primary" strokeWidth={1.75} />
                  <span className="flex-1 font-semibold text-foreground">{a.title}</span>
                  <ArrowRight size={16} className="text-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* SÓCIOS */}
      <section className="py-16 bg-[#0B0B0C] text-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Quem cuida do seu caso</h2>
            <p className="text-white/70">Você fala direto com os advogados responsáveis, sem intermediários.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
            {SOCIOS.map(s => (
              <article key={s.nome} className="relative rounded-xl overflow-hidden border border-white/10">
                <img src={s.foto} alt={s.nome} loading="lazy" className="w-full aspect-[4/5] object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 pt-16 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/75 to-transparent">
                  <h3 className="text-base sm:text-xl font-bold">{s.nome}</h3>
                  <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#EF4444]">{s.oab}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F4F2F1]">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Dúvidas rápidas</h2>
          <div className="bg-white rounded-xl border border-border px-6">
            <Accordion type="single" collapsible>
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-base font-semibold">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/70">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA FINAL + FORMULÁRIO */}
      <section className="py-16 bg-[#0B0B0C] text-white">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-bold tracking-widest uppercase text-[#EF4444] mb-3">Tempo é liberdade</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Não enfrente isso sozinho.</h2>
            <p className="text-lg text-white/75 mb-8 max-w-md">
              Chame agora ou deixe seu contato: o advogado retorna em seguida.
            </p>
            <UrgencyTotem />
          </div>
          <div id="formulario" className="scroll-mt-24 bg-card text-foreground rounded-xl p-6 sm:p-8 max-w-md w-full md:justify-self-end">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-10 pb-24 sm:pb-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <img src="/images/logo-garcia-marangoni.png" alt="Garcia & Marangoni Advocacia" className="h-10 w-auto brightness-0 invert" />
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/70">
            <a href="mailto:garciamarangoni.adv@gmail.com" className="hover:text-white transition-colors">garciamarangoni.adv@gmail.com</a>
            <a href={`${MAIN_SITE}/privacidade`} className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
        <div className="container mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/50 space-y-2">
          <p>Dr. Tayson Garcia · OAB/ES 43.094 &nbsp;|&nbsp; Dr. Lucier Marangoni · OAB/ES 43.165</p>
          <p className="max-w-3xl mx-auto">
            Conteúdo informativo, em conformidade com o Código de Ética da OAB e o Provimento 205/2021. Não há promessa de resultado: cada caso depende da análise individual.
          </p>
          <p>© {new Date().getFullYear()} Garcia & Marangoni Advocacia. Todos os direitos reservados.</p>
        </div>
      </footer>

      <WhatsAppFloatingButton />
    </div>
  )
}
