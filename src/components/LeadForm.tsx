'use client'

import { useEffect, useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackContato } from '@/lib/googleAds'

// Precisa bater com o `assunto` das áreas em DireitoCriminal
export const AREAS = [
  'Prisão em flagrante',
  'Habeas Corpus',
  'Inquérito policial',
  'Tribunal do Júri',
  'Lei de Drogas',
  'Violência doméstica',
  'Crimes de trânsito',
  'Crimes contra o patrimônio',
  'Execução penal e recursos',
  'Outro assunto criminal',
]

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://www.garciamarangoni.adv.br'
const PRIVACY_URL = 'https://www.garciamarangoni.adv.br/privacidade'

// (27) 99999-9999 enquanto o usuário digita
function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export default function LeadForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Links "Falar sobre X" da página pré-selecionam o assunto
  useEffect(() => {
    function onAssunto(e: Event) {
      const value = (e as CustomEvent<string>).detail
      if (AREAS.includes(value)) setArea(value)
    }
    window.addEventListener('lead:assunto', onAssunto)
    return () => window.removeEventListener('lead:assunto', onAssunto)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Preencha seu nome e um WhatsApp válido com DDD.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/direito-criminal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone, area, message: message.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSuccess(true)
        trackContato()
      } else {
        setError(data.error ?? 'Erro ao enviar. Tente novamente.')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle size={44} className="text-green-600" />
        <p className="font-semibold text-lg">Solicitação enviada!</p>
        <p className="text-foreground/60 text-sm max-w-xs">
          Recebemos seus dados. Um dos nossos advogados vai te chamar no WhatsApp o quanto antes, com sigilo total.
        </p>
      </div>
    )
  }

  const labelClass = 'block text-xs font-semibold text-foreground/80 mb-1'
  const inputClass = 'w-full px-3 py-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Conte o que aconteceu</h2>
        <p className="text-xs text-foreground/60 mt-1">Um advogado retorna pelo WhatsApp, com sigilo.</p>
      </div>

      <div>
        <label htmlFor="lead-name" className={labelClass}>Seu nome</label>
        <input
          id="lead-name"
          type="text"
          autoComplete="name"
          placeholder="Nome completo"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={loading}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className={labelClass}>Seu WhatsApp</label>
        <input
          id="lead-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="(27) 90000-0000"
          value={phone}
          onChange={e => setPhone(maskPhone(e.target.value))}
          disabled={loading}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="lead-area" className={labelClass}>Assunto (opcional)</label>
        <select
          id="lead-area"
          value={area}
          onChange={e => setArea(e.target.value)}
          disabled={loading}
          className={`${inputClass} ${area ? '' : 'text-foreground/50'}`}
        >
          <option value="">Selecione (opcional)</option>
          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="lead-message" className={labelClass}>Quer adiantar algo? (opcional)</label>
        <textarea
          id="lead-message"
          placeholder="Ex.: meu irmão foi preso hoje, recebi uma intimação..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={loading}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        size="lg"
        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-semibold"
      >
        {loading
          ? <><Loader2 size={16} className="animate-spin" /> Enviando...</>
          : 'Falar com um advogado'}
      </Button>
      <p className="text-[11px] leading-snug text-foreground/60">
        Seus dados são tratados com sigilo, conforme a LGPD. Ao enviar, você concorda com nossa{' '}
        <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">Política de Privacidade</a>.
      </p>
    </form>
  )
}
