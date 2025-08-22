import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import Toast from './components/Toast'

// Register service worker for PWA
let updateSWFn = null
function PWAUpdater() {
  const [show, setShow] = useState(false)
  const [needRefresh, setNeedRefresh] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        setNeedRefresh(true)
        setShow(true)
        window.dispatchEvent(new Event('pwa:need-refresh'))
      },
      onOfflineReady() {
        // Optional: could show a one-time toast like "App ready for offline use"
      },
    })
    updateSWFn = updateSW
  }, [])

  const doRefresh = () => {
    setShow(false)
    if (updateSWFn) updateSWFn(true) // will reload the page with the new SW
  }

  return (
    <Toast
      show={show && needRefresh}
      message="A new update is available. Refresh to get the latest."
      actions={[{ label: 'Refresh', onClick: doRefresh }]}
      onClose={() => setShow(false)}
    />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
  <PWAUpdater />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
