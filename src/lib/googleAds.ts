// Tag do Google (Google Ads) e ação de conversão "Contato"
export const GOOGLE_TAG_ID = 'AW-18503820780'
export const CONVERSION_CONTATO = 'AW-18503820780/XGFqCNbxzZsdEOzLp_dE'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Formulário enviado com sucesso (os cliques no WhatsApp são contados direto no layout)
export function trackContato() {
  window.gtag?.('event', 'conversion', { send_to: CONVERSION_CONTATO })
}
