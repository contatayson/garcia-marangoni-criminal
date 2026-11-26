'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { WhatsAppIcon, PHONE, MESSAGE } from '@/components/WhatsAppFloatingButton'

// Número para ligação (hoje o mesmo do WhatsApp)
export const CALL_PHONE = PHONE
const CALL_LABEL = '(27) 99891-1791'
const WHATSAPP_HREF = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

// Hora de Brasília, atualizada a cada segundo. Começa vazia para não divergir do HTML do servidor.
function useBrasiliaClock() {
  const [time, setTime] = useState<{ h: string; m: string } | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false })
    const tick = () => {
      const parts = fmt.formatToParts(new Date())
      setTime({
        h: parts.find(p => p.type === 'hour')?.value ?? '--',
        m: parts.find(p => p.type === 'minute')?.value ?? '--',
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function UrgencyTotem({ className = '' }: { className?: string }) {
  const time = useBrasiliaClock()

  return (
    <div className={`w-full max-w-xl ${className}`}>
      <div className="mb-4 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#22c55e]/50 bg-[#22c55e]/10 px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
        </span>
        <span>Plantão ativo agora</span>
        <span className="font-mono text-[#4ade80] tabular-nums" aria-label="Horário de Brasília">
          {time ? <>{time.h}<span className="clock-colon">:</span>{time.m}</> : '--:--'}
        </span>
        <span className="font-normal text-white/70"><span className="hidden sm:inline">· </span>O advogado atende neste momento</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#16a34a] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/30 transition-all hover:bg-[#15803d] hover:shadow-xl"
        >
          <WhatsAppIcon size={20} className="shrink-0" />
          Falar no WhatsApp
        </a>
        <a
          href={`tel:+${CALL_PHONE}`}
          className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#E02424] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#E02424]/30 transition-all hover:bg-[#c81e1e] hover:shadow-xl"
        >
          <Phone size={18} className="shrink-0" />
          Ligar {CALL_LABEL}
        </a>
      </div>
    </div>
  )
}
