'use client'

import { useEffect, useState } from 'react'
import LeadForm from '@/components/LeadForm'
import UrgencyTotem from '@/components/UrgencyTotem'
import WhatsAppFloatingButton, { WhatsAppIcon, PHONE, MESSAGE } from '@/components/WhatsAppFloatingButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowRight, Mail, MapPin, ShieldAlert, Lock, Clock } from 'lucide-react'

const MAIN_SITE = 'https://garciamarangoni.adv.br'
const wa = (text: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
const WHATSAPP_HREF = wa(MESSAGE)
const WHATSAPP_PRESO = wa('Urgente: um familiar foi preso agora e preciso de um advogado criminalista.')
const PHONE_LABEL = '(27) 99891-1791'
const EMAIL = 'garciamarangoni.adv@gmail.com'
const ENDERECO = 'Edifício Essencial Escritórios, Av. Eldes Scherrer Souza, 2230, Colina de Laranjeiras, Serra/ES'
const MAPA_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Av. Eldes Scherrer Souza, 2230, Serra - ES, 29167-080')}`

const NAV = [
  { href: '#atuacao', label: 'Atuação' },
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#sobre', label: 'Sócios' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
]

const FASES = ['Investigação', 'Flagrante', 'Custódia', 'Processo', 'Júri', 'Execução']

const CRIMES = [
  'Prisão em flagrante', 'Habeas Corpus', 'Tráfico de drogas', 'Violência doméstica', 'Medidas protetivas',
  'Furto', 'Roubo', 'Estelionato', 'Tribunal do Júri', 'Crimes de trânsito', 'Inquérito policial', 'Execução penal',
]

const PASSOS_PRESO = [
  'Anote o nome completo da pessoa e a delegacia para onde foi levada.',
  'Ela não deve falar sobre o caso antes de conversar com o advogado.',
  'Chame a defesa antes da audiência de custódia.',
]

// Abas de áreas; cada card abre o WhatsApp já com o assunto
const AREAS: { aba: string; itens: { title: string; text: string }[] }[] = [
  {
    aba: 'Fases do caso',
    itens: [
      { title: 'Inquérito policial', text: 'Intimado ou investigado? A defesa já atua: acompanha o depoimento, acessa o que foi apurado e apresenta provas.' },
      { title: 'Prisão em flagrante', text: 'Verificamos se o flagrante seguiu a lei e pedimos a liberdade provisória ou o relaxamento da prisão.' },
      { title: 'Habeas Corpus', text: 'Contra prisão ilegal ou ameaça de prisão, em qualquer fase do processo e em qualquer tribunal.' },
      { title: 'Execução penal', text: 'Para quem já cumpre pena: cálculo, progressão de regime, livramento condicional e remição.' },
    ],
  },
  {
    aba: 'Drogas',
    itens: [
      { title: 'Tráfico de drogas', text: 'Defesa em flagrantes, inquéritos e processos, com análise da abordagem e da apreensão.' },
      { title: 'Porte para uso pessoal', text: 'Atuação para que o caso seja tratado como uso pessoal, e não como tráfico, quando as circunstâncias mostram isso.' },
    ],
  },
  {
    aba: 'Violência doméstica',
    itens: [
      { title: 'Lei Maria da Penha', text: 'Defesa em inquéritos e processos de violência doméstica e familiar, com técnica e discrição.' },
      { title: 'Medidas protetivas', text: 'Atuação em pedidos de medida protetiva, na revisão delas e em casos de descumprimento.' },
    ],
  },
  {
    aba: 'Patrimônio',
    itens: [
      { title: 'Furto e roubo', text: 'Defesa desde a delegacia até o julgamento, incluindo o pedido de liberdade logo após a prisão.' },
      { title: 'Estelionato e golpes', text: 'Investigações por estelionato, golpes pela internet, fraudes e uso de conta de terceiros.' },
    ],
  },
  {
    aba: 'Júri e trânsito',
    itens: [
      { title: 'Tribunal do Júri', text: 'Homicídio e crimes dolosos contra a vida: atuação da fase de provas até o plenário.' },
      { title: 'Crimes de trânsito', text: 'Embriaguez ao volante, lesão ou homicídio no trânsito e suas consequências criminais.' },
    ],
  },
]

const PASSOS = [
  { title: 'Primeiro contato', text: 'Você ou um familiar chama no WhatsApp. Em caso de prisão, a qualquer hora.' },
  { title: 'Análise do caso', text: 'Conversa reservada, presencial ou por vídeo, e leitura do inquérito ou processo.' },
  { title: 'Proposta clara', text: 'Estratégia de defesa e honorários explicados por escrito antes de você decidir.' },
  { title: 'Acompanhamento', text: 'Presença nas audiências e notícia a cada movimentação do processo.' },
]

const SOCIOS = [
  { nome: 'Dr. Tayson Garcia', oab: 'OAB/ES 43.094', foto: '/images/socio-tayson-serio.jpg' },
  { nome: 'Dr. Lucier Marangoni', oab: 'OAB/ES 43.165', foto: '/images/socio-lucier-serio.jpg' },
]

const FAQ = [
  {
    q: 'Um familiar foi preso. O que eu faço?',
    a: 'Mande pelo WhatsApp o nome completo da pessoa e onde ela está. A audiência de custódia acontece em até 24 horas, e ter advogado já nesse momento faz diferença.',
  },
  {
    q: 'Fui intimado para depor. Preciso de advogado?',
    a: 'É o recomendado. Com advogado, você entende por que foi chamado antes de falar e tem seus direitos garantidos, inclusive o de ficar em silêncio.',
  },
  {
    q: 'O atendimento é sigiloso?',
    a: 'Sim. Tudo o que você contar é protegido pelo sigilo profissional da advocacia, desde a primeira mensagem.',
  },
  {
    q: 'Como são definidos os honorários?',
    a: 'Depois de entender o caso, apresentamos a proposta por escrito, com base na tabela da OAB/ES, antes de qualquer trabalho começar.',
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

// Mostrador de 24h (prazo da audiência de custódia)
function Dial24h() {
  const ticks = Array.from({ length: 24 }, (_, i) => i)
  return (
    <svg viewBox="0 0 240 240" className="w-56 h-56 sm:w-64 sm:h-64" role="img" aria-label="Prazo de 24 horas para a audiência de custódia">
      <circle cx="120" cy="120" r="108" fill="#FFFFFF" stroke="#8B1E2D" strokeWidth="8" />
      {ticks.map(i => {
        const a = (i / 24) * Math.PI * 2
        const major = i % 6 === 0
        const r1 = major ? 84 : 92
        return (
          <line
            key={i}
            x1={120 + Math.sin(a) * r1} y1={120 - Math.cos(a) * r1}
            x2={120 + Math.sin(a) * 98} y2={120 - Math.cos(a) * 98}
            stroke={major ? '#8B1E2D' : '#E02424'} strokeOpacity={major ? 1 : 0.45}
            strokeWidth={major ? 3 : 1.5} strokeLinecap="round"
          />
        )
      })}
      <circle cx="120" cy="12" r="7" fill="#E02424" />
      <text x="120" y="128" textAnchor="middle" fontSize="54" fontWeight="700" fill="#22090E" style={{ fontFamily: 'var(--font-heading, serif)' }}>24h</text>
      <text x="120" y="152" textAnchor="middle" fontSize="11" fill="#22090E" fillOpacity="0.6">prazo da audiência</text>
      <text x="120" y="166" textAnchor="middle" fontSize="11" fill="#22090E" fillOpacity="0.6">de custódia</text>
    </svg>
  )
}

function AreasTabs() {
  const [aba, setAba] = useState(0)
  return (
    <>
      <div role="tablist" aria-label="Tipos de caso" className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none]">
        {AREAS.map((g, i) => (
          <button
            key={g.aba}
            role="tab"
            aria-selected={aba === i}
            onClick={() => setAba(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${aba === i ? 'bg-primary text-white' : 'bg-white text-foreground/70 border border-foreground/10 hover:border-primary/40'}`}
          >
            {g.aba}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AREAS[aba].itens.map(item => (
          <article key={item.title} className="flex flex-col rounded-xl border border-foreground/10 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
            <p className="text-sm text-foreground/65 mb-5 flex-1">{item.text}</p>
            <a
              href={wa(`Olá! Preciso de um advogado criminalista. Assunto: ${item.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#15803d] border-b border-[#15803d]/30 hover:border-[#15803d] pb-0.5"
            >
              <WhatsAppIcon size={14} /> Falar no WhatsApp
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </article>
        ))}
      </div>
    </>
  )
}

export default function DireitoCriminal() {
  useFormScrollTransition()

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4] text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-[#4A121C]/95 backdrop-blur border-b border-white/10">
        <div className="container flex items-center justify-between h-16 sm:h-20 gap-4">
          <a href="/" aria-label="Página inicial" className="flex items-center shrink-0">
            <img src="/images/logo-garcia-marangoni.png" alt="Garcia & Marangoni Advocacia" className="h-9 sm:h-12 w-auto brightness-0 invert" />
          </a>
          <nav aria-label="Seções" className="hidden lg:flex items-center gap-7 text-sm text-white/75">
            {NAV.map(n => <a key={n.href} href={n.href} className="hover:text-white transition-colors">{n.label}</a>)}
          </nav>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#15803d] transition-colors"
          >
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden text-white bg-[radial-gradient(ellipse_at_top_left,#7A1E2C_0%,#4A121C_55%,#2A0A10_100%)]">
        <div className="container relative pt-10 pb-8 md:pt-16">
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 items-end">
            <div className="md:pb-10">
              <p className="text-sm font-semibold text-white/80 mb-4">Advocacia criminal · Grande Vitória/ES</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5">
                Preso, intimado ou investigado? <span className="text-[#FF6B6B]">Fale agora com um criminalista.</span>
              </h1>
              <p className="text-lg text-white/75 mb-8 max-w-xl">
                Prisão em flagrante, custódia, inquérito e processo. Você fala direto com os advogados, com sigilo absoluto.
              </p>
              <UrgencyTotem />
              <a href="#atuacao" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">
                Ver áreas de atuação <ArrowRight size={14} />
              </a>
            </div>
            {/* Foto em arco com selo dos sócios */}
            <div className="relative mx-auto w-full max-w-sm md:max-w-md">
              <div className="aspect-[4/5] overflow-hidden rounded-t-full border border-white/15 bg-[#8a8d92]">
                <img src="/images/hero-socios-serio.jpg" alt="Os advogados Tayson Garcia e Lucier Marangoni" className="w-full h-full object-cover object-[center_20%]" />
              </div>
              <div className="absolute -left-3 sm:-left-8 bottom-8 rounded-lg bg-[#FBF8F4] px-4 py-3 text-foreground shadow-xl">
                <p className="font-bold leading-tight" style={{ fontFamily: 'inherit' }}>Tayson Garcia &amp; Lucier Marangoni</p>
                <p className="text-xs text-foreground/60">OAB/ES 43.094 · 43.165</p>
              </div>
            </div>
          </div>

          {/* Linha das fases */}
          <div className="mt-12 border-t border-white/15 pt-5">
            <p className="text-xs font-semibold text-white/70 mb-4">Da investigação à execução da pena</p>
            <ol className="relative grid grid-cols-3 sm:grid-cols-6 gap-y-5">
              <span aria-hidden className="hidden sm:block absolute left-0 right-0 top-[5px] h-px bg-white/20" />
              {FASES.map(f => (
                <li key={f} className="relative flex flex-col gap-2 text-sm text-white/85">
                  <span className={`h-3 w-3 rounded-full border-2 ${f === 'Custódia' ? 'border-[#FF6B6B] bg-[#FF6B6B]' : 'border-white/60 bg-[#4A121C]'}`} />
                  {f}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAIXA DE CRIMES (lista duplicada para o loop não ter emenda) */}
      <section aria-label="Tipos de caso atendidos" className="overflow-hidden border-b border-foreground/10 bg-white">
        <div className="marquee-track flex w-max">
          {[0, 1].map(copy => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
              {CRIMES.map(c => (
                <li key={c} className="flex items-center gap-6 whitespace-nowrap px-3 py-4 text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading, serif)' }}>
                  {c} <span className="h-1.5 w-1.5 rounded-full bg-[#E02424]" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ALGUÉM FOI PRESO AGORA */}
      <section className="py-16 md:py-20">
        <div className="container grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
          <div className="mx-auto"><Dial24h /></div>
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Alguém foi preso agora?</h2>
            <p className="text-foreground/70 mb-6">
              Quem é preso em flagrante precisa ser levado a um juiz em até 24 horas, na audiência de custódia. É ali que a defesa questiona a prisão e pede que a pessoa responda em liberdade.
            </p>
            <ol className="divide-y divide-foreground/10 border-y border-foreground/10 mb-7">
              {PASSOS_PRESO.map((p, i) => (
                <li key={p} className="flex items-center gap-4 py-3 text-sm sm:text-base">
                  <span className="text-2xl font-bold text-primary w-5" style={{ fontFamily: 'var(--font-heading, serif)' }}>{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
            <a
              href={WHATSAPP_PRESO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#E02424] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#E02424]/30 hover:bg-[#c81e1e] transition-colors"
            >
              <WhatsAppIcon size={20} /> Um familiar foi preso agora
            </a>
          </div>
        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section id="atuacao" className="scroll-mt-20 py-16 md:py-20 bg-[#F3EBE2]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Áreas de atuação</h2>
          <p className="text-foreground/60 mb-8">Escolha o tipo de caso e fale direto com o advogado.</p>
          <AreasTabs />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="atendimento" className="scroll-mt-20 py-16 md:py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Como funciona o atendimento</h2>
          <p className="text-foreground/60 mb-10">Do primeiro contato ao fim do processo.</p>
          <ol className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <span aria-hidden className="hidden md:block absolute left-4 right-0 top-4 h-px bg-primary/30" />
            {PASSOS.map((p, i) => (
              <li key={p.title} className="relative">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white ring-4 ring-[#FBF8F4] mb-4">{i + 1}</span>
                <h3 className="font-bold mb-1" style={{ fontFamily: 'inherit' }}>{p.title}</h3>
                <p className="text-sm text-foreground/65">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SÓCIOS */}
      <section id="sobre" className="scroll-mt-20 py-16 md:py-20 bg-[#F3EBE2]">
        <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            {SOCIOS.map(s => (
              <figure key={s.nome} className="relative overflow-hidden rounded-xl">
                <img src={s.foto} alt={s.nome} loading="lazy" className="w-full aspect-[4/5] object-cover object-top" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 pt-12 bg-gradient-to-t from-[#22090E] via-[#22090E]/70 to-transparent text-white">
                  <p className="text-sm sm:text-base font-bold">{s.nome}</p>
                  <p className="text-[10px] sm:text-xs tracking-wider text-white/75">{s.oab}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quem cuida do seu caso</h2>
            <p className="text-foreground/70 mb-6">
              Sócios-fundadores do Garcia &amp; Marangoni Advocacia, formados em Direito pela Universidade Federal do Espírito Santo. Você fala direto com eles, sem intermediários, do primeiro contato ao fim do caso.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 text-xl font-semibold leading-snug mb-6" style={{ fontFamily: 'var(--font-heading, serif)' }}>
              Toda pessoa tem direito a uma defesa técnica, rápida e feita com sigilo.
            </blockquote>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
              <li className="flex items-center gap-2"><Clock size={16} className="text-primary" /> Plantão para prisões</li>
              <li className="flex items-center gap-2"><Lock size={16} className="text-primary" /> Sigilo absoluto</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Serra/ES</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DÚVIDAS */}
      <section id="duvidas" className="scroll-mt-20 py-16 md:py-20">
        <div className="container grid md:grid-cols-[1fr_1.6fr] gap-8 md:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Dúvidas comuns</h2>
            <p className="text-foreground/60">
              Não achou a sua?{' '}
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Pergunte no WhatsApp</a>.
            </p>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-foreground/10">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-base font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/70">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="scroll-mt-20 py-16 md:py-20 text-white bg-[radial-gradient(ellipse_at_top_left,#7A1E2C_0%,#4A121C_55%,#2A0A10_100%)]">
        <div className="container grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Não enfrente isso sozinho.</h2>
            <p className="text-lg text-white/75 mb-8 max-w-md">Chame agora ou deixe seu contato: o advogado retorna em seguida.</p>
            <UrgencyTotem className="mb-8" />
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <a href={`mailto:${EMAIL}`} className="rounded-xl border border-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                <span className="flex items-center gap-2 text-white/60 mb-1"><Mail size={14} /> E-mail</span>
                <span className="break-all">{EMAIL}</span>
              </a>
              <a href={MAPA_HREF} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                <span className="flex items-center gap-2 text-white/60 mb-1"><MapPin size={14} /> Escritório</span>
                {ENDERECO}
              </a>
            </div>
          </div>
          <div id="formulario" className="scroll-mt-24 bg-card text-foreground rounded-xl p-6 sm:p-8 w-full max-w-md md:justify-self-end">
            <LeadForm />
          </div>
        </div>
        <div className="container mt-10">
          <p className="flex items-start gap-2 rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-sm text-white/80">
            <ShieldAlert size={18} className="shrink-0 text-[#FF6B6B] mt-0.5" />
            <span><strong className="text-white">Atenção a golpes:</strong> nosso WhatsApp oficial é {PHONE_LABEL}. Nunca pedimos pagamento por outro número.</span>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A0609] text-white py-10 pb-24 sm:pb-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <img src="/images/logo-garcia-marangoni.png" alt="Garcia & Marangoni Advocacia" className="h-10 w-auto brightness-0 invert" />
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/70">
            <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
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
