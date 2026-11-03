'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import LeadForm from '@/components/LeadForm'
import WhatsAppFloatingButton, { WhatsAppIcon, PHONE, MESSAGE } from '@/components/WhatsAppFloatingButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  ShieldCheck,
  Scale,
  Gavel,
  Landmark,
  FileSearch,
  Pill,
  Car,
  Wallet,
  HeartCrack,
  KeyRound,
  ArrowRight,
  MessageCircle,
  ClipboardCheck,
  Search,
  Compass,
  Video,
  Check,
  CircleAlert,
  Siren,
  UserRound,
  Lock,
  Quote,
} from 'lucide-react'

const MAIN_SITE = 'https://garciamarangoni.adv.br'
const WHATSAPP_HREF = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

const PILARES = [
  { icon: Scale, title: 'Defesa Criminal Técnica' },
  { icon: Siren, title: 'Atendimento de Urgência' },
  { icon: Lock, title: 'Sigilo Absoluto' },
  { icon: UserRound, title: 'Contato Direto com o Advogado' },
  { icon: Landmark, title: 'Da Delegacia aos Tribunais' },
]

// Quando procurar um criminalista
const SITUACOES = [
  'Alguém da família foi preso em flagrante.',
  'Você recebeu uma intimação para depor na delegacia.',
  'Houve busca e apreensão na sua casa ou empresa.',
  'Existe um processo criminal ou uma audiência marcada.',
  'Saiu uma condenação e ainda cabe recurso.',
]

// `assunto` precisa bater com uma opção de AREAS do LeadForm
const AREAS = [
  { icon: Siren, title: 'Prisão em flagrante', text: 'Atuação desde a delegacia e na audiência de custódia, buscando a liberdade provisória ou medidas diferentes da prisão.', assunto: 'Prisão em flagrante' },
  { icon: KeyRound, title: 'Habeas Corpus', text: 'Pedido urgente aos tribunais contra prisão ilegal ou constrangimento indevido à liberdade de locomoção.', assunto: 'Habeas Corpus' },
  { icon: FileSearch, title: 'Inquérito policial', text: 'Acompanhamento de depoimentos e interrogatórios, acesso aos autos e atuação na fase de investigação.', assunto: 'Inquérito policial' },
  { icon: Gavel, title: 'Tribunal do Júri', text: 'Defesa em crimes dolosos contra a vida, da primeira fase do processo até o plenário.', assunto: 'Tribunal do Júri' },
  { icon: Pill, title: 'Lei de Drogas', text: 'Defesa em acusações de tráfico e porte, incluindo a discussão sobre a correta classificação do caso.', assunto: 'Lei de Drogas' },
  { icon: HeartCrack, title: 'Violência doméstica', text: 'Atuação em casos da Lei Maria da Penha, inclusive sobre medidas protetivas, com técnica e discrição.', assunto: 'Violência doméstica' },
  { icon: Car, title: 'Crimes de trânsito', text: 'Embriaguez ao volante, lesão ou homicídio no trânsito e suas consequências criminais.', assunto: 'Crimes de trânsito' },
  { icon: Wallet, title: 'Crimes contra o patrimônio', text: 'Furto, roubo, receptação, estelionato e golpes, com análise das provas desde o início.', assunto: 'Crimes contra o patrimônio' },
  { icon: Landmark, title: 'Execução penal e recursos', text: 'Progressão de regime, livramento condicional, remição de pena e recursos contra a condenação.', assunto: 'Execução penal e recursos' },
]

const DIFERENCIAIS = [
  { icon: Siren, title: 'Agilidade no atendimento', text: 'Em matéria criminal, horas fazem diferença. Seu contato é respondido com prioridade.' },
  { icon: UserRound, title: 'Contato direto com o advogado', text: 'Você fala com quem está cuidando do caso, não com um intermediário.' },
  { icon: Compass, title: 'Estratégia para o seu caso', text: 'Cada processo é analisado de forma individual, sem modelos prontos.' },
  { icon: Lock, title: 'Sigilo absoluto', text: 'Tudo o que você contar fica protegido pelo sigilo profissional da advocacia.' },
]

const PASSOS = [
  { icon: MessageCircle, title: 'Fale com a gente', text: 'Chame no WhatsApp ou preencha o formulário. Você pode falar por você ou por um familiar.' },
  { icon: Search, title: 'Análise do caso', text: 'O advogado entende o que aconteceu e verifica a situação na delegacia ou no processo.' },
  { icon: Compass, title: 'Estratégia de defesa', text: 'Você recebe uma orientação clara sobre os próximos passos, prazos e custos.' },
  { icon: ClipboardCheck, title: 'Atuação e acompanhamento', text: 'Conduzimos a defesa em cada etapa, mantendo você e sua família informados.' },
]

const SOCIOS = [
  {
    nome: 'Dr. Tayson Garcia',
    oab: 'OAB/ES 43.094',
    foto: '/images/socio-tayson-garcia.jpg',
    texto: 'Sócio-fundador do Garcia & Marangoni Advocacia, graduado em Direito pela Universidade Federal do Espírito Santo. Conduz cada caso com precisão técnica, discrição e visão estratégica, mantendo contato próximo com o cliente e a família em todas as fases da defesa.',
  },
  {
    nome: 'Dr. Lucier Marangoni',
    oab: 'OAB/ES 43.165',
    foto: '/images/socio-lucier-marangoni.jpg',
    texto: 'Sócio-fundador do Garcia & Marangoni Advocacia, graduado em Direito pela Universidade Federal do Espírito Santo. Autor de artigos e capítulos de livros jurídicos, combina rigor técnico e clareza para explicar cada passo do processo e defender os seus direitos com firmeza.',
  },
]

const FAQ = [
  {
    q: 'Um familiar foi preso em flagrante. O que fazer agora?',
    a: 'Procure um advogado o quanto antes. A pessoa presa deve ser levada a uma audiência de custódia, normalmente em até 24 horas, e é ali que se discute se ela responde em liberdade. Até lá, o preso tem o direito de ficar em silêncio e de ser assistido por advogado.',
  },
  {
    q: 'Recebi uma intimação para depor. Preciso ir com advogado?',
    a: 'Não é obrigatório, mas é altamente recomendável. O que é dito em depoimento pode ser usado no processo. Com o advogado, você entende em que condição está sendo ouvido (testemunha ou investigado) e o que é melhor falar ou não falar.',
  },
  {
    q: 'A família pode contratar o advogado pela pessoa presa?',
    a: 'Sim. É muito comum que um familiar faça o primeiro contato e contrate a defesa. O advogado então visita o cliente e passa a atuar no caso.',
  },
  {
    q: 'Qual a diferença entre prisão em flagrante, temporária e preventiva?',
    a: 'O flagrante acontece no momento do crime ou logo depois. A temporária é decretada durante a investigação, por prazo definido. A preventiva pode ocorrer em qualquer fase e não tem prazo fixo, mas precisa ser justificada e revisada periodicamente. Em todos os casos, cabe questionar a prisão.',
  },
  {
    q: 'Vocês atendem fora de Vitória?',
    a: 'Sim. Atendemos presencialmente na Grande Vitória e de forma online em todo o Espírito Santo, com deslocamento quando o caso exige.',
  },
  {
    q: 'O primeiro contato é sigiloso?',
    a: 'Sim. Tudo o que você contar, desde a primeira mensagem, é protegido pelo sigilo profissional da advocacia e pela LGPD.',
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

const GOLD_BUTTON = 'inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-lg bg-[linear-gradient(110deg,#c9a46a_0%,#f1dfb6_45%,#d9bb84_70%,#b8904f_100%)] px-5 sm:px-7 py-4 text-[15px] sm:text-base font-medium text-[#1b1206] text-center sm:whitespace-nowrap transition-all hover:brightness-110'

export default function DireitoCriminal() {
  useFormScrollTransition()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER ENXUTO */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <a href="/" aria-label="Página inicial" className="flex items-center shrink-0">
            <img src="/images/logo-garcia-marangoni.png" alt="Garcia & Marangoni Advocacia" className="h-10 sm:h-14 w-auto" />
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 gap-2">
                <MessageCircle size={16} />
                <span className="hidden sm:inline">Chamar no WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </Button>
            </a>
            <a href="#formulario" className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Falar com um Advogado
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-[#020303] text-white overflow-hidden md:min-h-[85vh] lg:min-h-[calc(100svh-5rem)] md:flex md:items-center">
        {/* Foto dos sócios: banner no topo no mobile, metade direita com degradê no desktop */}
        <div className="relative h-64 sm:h-80 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[60%]">
          <img
            src="/images/hero-socios.jpg"
            alt="Os advogados Tayson Garcia e Lucier Marangoni"
            className="w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020303] via-[#020303]/30 to-transparent md:bg-gradient-to-r md:from-[#020303] md:via-[#020303]/35 md:to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_bottom_left,#013A9A,transparent_55%)] pointer-events-none" />

        <div className="container relative -mt-10 pb-16 md:mt-0 md:py-24 lg:py-[clamp(1.25rem,4vh,6rem)]">
          <div className="max-w-xl lg:max-w-none">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d9bb84]/40 bg-[#d9bb84]/10 px-3 py-1 text-xs font-semibold tracking-widest uppercase text-[#e8d2a4] mb-5">
              <Siren size={14} /> Advocacia Criminal<span className="hidden sm:inline"> · Grande Vitória/ES</span>
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[clamp(2.25rem,6.2vh,3.75rem)] font-bold leading-tight mb-6 lg:mb-[clamp(0.75rem,2.5vh,1.5rem)] lg:whitespace-nowrap">
              Sua liberdade exige <br className="hidden lg:inline" />uma defesa técnica <br className="hidden lg:inline" />e imediata.
            </h1>
            <p className="text-lg text-white/70 mb-6 lg:mb-[clamp(0.75rem,2.5vh,1.5rem)] max-w-xl">
              <strong className="font-semibold text-white">Prisão em flagrante, audiência de custódia, inquérito ou processo criminal.</strong> Falamos com você ou com sua família e orientamos o <strong className="font-semibold text-white">próximo passo</strong> direto pelo <strong className="font-semibold text-white">WhatsApp</strong>.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-8 lg:mb-[clamp(1rem,3vh,2rem)] text-sm text-white/90">
              <li className="flex items-center gap-2"><Siren size={16} className="text-[#60A5B3]" /> Atendimento de urgência</li>
              <li className="flex items-center gap-2"><Video size={16} className="text-[#60A5B3]" /> Presencial e online</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#60A5B3]" /> Sigilo total</li>
            </ul>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`${GOLD_BUTTON} border border-[#f3e3bd]/60 shadow-lg shadow-black/40 hover:shadow-xl`}
            >
              <WhatsAppIcon size={20} className="shrink-0" />
              Falar com um Advogado Criminalista agora
            </a>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/70">
              <Check size={16} className="text-[#d9bb84]" />
              Resposta rápida, sigilosa e sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* PILARES: faixa rolando em loop (a lista vai duplicada para o loop não ter emenda) */}
      <section aria-label="Diferenciais do escritório" className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(90deg,#020303_0%,#0b1d3f_50%,#020303_100%)] text-white/85">
        <div className="marquee-track flex w-max">
          {[0, 1].map(copy => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
              {[...PILARES, ...PILARES].map((p, i) => {
                const Icon = p.icon
                return (
                  <li key={i} className="flex items-center gap-3 whitespace-nowrap border-r border-white/15 px-10 py-4 text-sm">
                    <Icon size={18} className="text-[#d9bb84]" strokeWidth={1.5} />
                    {p.title}
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      </section>

      {/* O MOMENTO: quando procurar um criminalista */}
      <section className="py-20 bg-[#f7f4ee]">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              <span className="h-px w-8 bg-primary/40" /> O momento
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
              Nas primeiras horas, cada decisão pesa.
            </h2>
            <p className="text-lg text-foreground/60 max-w-lg mb-8">
              Ser investigado, preso ou processado muda tudo de uma hora para outra. O que se fala e o que se faz no começo pode definir o rumo do caso. <strong className="font-semibold text-foreground">Procure um criminalista se:</strong>
            </p>
            {/* Direito garantido pela Constituição */}
            <figure className="relative max-w-lg rounded-xl border-l-4 border-[#b8904f] bg-white px-6 py-5 shadow-sm">
              <Quote size={22} className="absolute -top-3 left-4 bg-[#f7f4ee] text-[#b8904f]" />
              <blockquote className="text-foreground/80 font-medium">
                Você tem o direito de permanecer em silêncio e de ser assistido por um advogado desde a delegacia.
              </blockquote>
              <figcaption className="mt-2 text-xs font-semibold tracking-widest uppercase text-foreground/50">
                Constituição Federal, art. 5º, LXIII
              </figcaption>
            </figure>
          </div>
          <div>
            <ul className="space-y-3 mb-8">
              {SITUACOES.map(d => (
                <li key={d} className="flex items-center gap-4 rounded-lg border border-foreground/10 bg-white px-5 py-4 text-sm sm:text-base text-foreground/80 shadow-sm">
                  <CircleAlert size={20} className="shrink-0 text-[#b8904f]" strokeWidth={1.75} />
                  {d}
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`${GOLD_BUTTON} border border-[#b8904f]/40 shadow-md shadow-[#b8904f]/30 hover:shadow-lg`}
            >
              <WhatsAppIcon size={20} className="shrink-0" />
              Quero falar com um criminalista
            </a>
          </div>
        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section className="py-20">
        <div className="container">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Como podemos ajudar</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-xl leading-tight">
            Defesa técnica em cada frente do Direito Criminal
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {AREAS.map((a) => {
              const Icon = a.icon
              return (
                <div key={a.title} className="border-t border-foreground/20 pt-6 flex flex-col">
                  <Icon size={20} className="text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{a.title}</h3>
                  <p className="text-sm text-foreground/60 mb-5 flex-1">{a.text}</p>
                  <a
                    href="#formulario"
                    data-assunto={a.assunto}
                    className="group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary border-b border-primary/30 hover:border-primary pb-0.5 transition-colors"
                  >
                    Falar sobre o caso
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              )
            })}
          </div>
          <p className="mt-14 text-center text-foreground/60">
            Seu caso não está na lista?{' '}
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
              Conte pelo WhatsApp
            </a>{' '}
            e dizemos como podemos ajudar.
          </p>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 bg-[#f7f4ee]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 max-w-2xl mx-auto leading-tight">
            O que você pode esperar desde o primeiro contato
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIFERENCIAIS.map(d => {
              const Icon = d.icon
              return (
                <div key={d.title} className="rounded-xl border border-foreground/10 bg-white p-6 shadow-sm">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{d.title}</h3>
                  <p className="text-sm text-foreground/60">{d.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SOBRE OS SÓCIOS */}
      <section className="py-20 bg-[#020303] text-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#60A5B3] mb-3">Sobre nós</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quem vai cuidar do seu caso</h2>
            <p className="text-white/70">
              Aqui o seu processo não é um número. Você tem acesso direto aos advogados responsáveis pela sua defesa, do primeiro contato até o fim do caso.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SOCIOS.map(s => (
              <article key={s.nome} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={s.foto} alt={s.nome} loading="lazy" className="w-full h-full object-cover object-[center_30%]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-gradient-to-t from-[#020303] via-[#020303]/70 to-transparent">
                    <h3 className="text-xl font-bold">{s.nome}</h3>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#60A5B3]">{s.oab}</p>
                  </div>
                </div>
                <p className="p-5 text-sm text-white/75 leading-relaxed">{s.texto}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <a href="#formulario">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-[#013A9A] hover:bg-[#012d7a] text-white rounded-sm font-semibold">
                Falar com um Advogado
              </Button>
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base border-[#25D366] text-[#25D366] bg-transparent hover:bg-[#25D366]/10 hover:text-[#4be08a] rounded-sm gap-2">
                <MessageCircle size={18} />
                Chamar no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">Como funciona o atendimento</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {PASSOS.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 relative">
                    <Icon size={22} className="text-primary" strokeWidth={1.5} />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{p.title}</h3>
                  <p className="text-sm text-foreground/60">{p.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Dúvidas Frequentes</h2>
          <p className="text-center text-foreground/60 mb-12">
            O que costumam perguntar antes de falar com um criminalista.
          </p>
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

      {/* CTA + FORMULÁRIO */}
      <section className="py-20 bg-[#020303] text-white">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#d9bb84] mb-3">Tempo é liberdade</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Não enfrente isso sozinho.
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-md">
              Conte o que aconteceu e receba uma orientação clara sobre o que fazer agora. Você pode falar por você ou por alguém da sua família, sempre com total sigilo.
            </p>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#25D366] px-4 sm:px-5 py-3 text-sm sm:text-base text-center sm:whitespace-nowrap text-[#25D366] font-semibold hover:bg-[#25D366]/10 hover:text-[#4be08a] transition-colors">
              <MessageCircle size={18} />
              É urgente? Chame no WhatsApp
            </a>
          </div>
          <div id="formulario" className="scroll-mt-24 bg-card text-foreground rounded-xl p-6 sm:p-8 max-w-md w-full md:justify-self-end">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-white py-10">
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
