import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import App from './App'
import './index.css'

// Smooth scrolling (skipped for users who prefer reduced motion)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  new Lenis({ autoRaf: true })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
