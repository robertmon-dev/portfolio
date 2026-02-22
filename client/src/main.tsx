import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TRPCProvider } from './lib/trpc/Provider'
import App from './App'
import './i18n'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TRPCProvider>
      <App />
    </TRPCProvider>
  </StrictMode>,
)
