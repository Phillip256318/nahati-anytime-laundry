import { useEffect, useState } from 'react'

export default function InstallPWA({ className = '' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const onInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setCanInstall(false)
    setDeferredPrompt(null)
  }

  // Hide on iOS Safari where the prompt isn’t available; users install via Share > Add to Home Screen
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)
  if (!canInstall || isIOS) return null

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold">Get the app</h3>
          <p className="text-sm text-gray-600">Install Nahati on your device for a faster, app-like experience.</p>
        </div>
        <button onClick={onInstall} className="btn-primary">Install</button>
      </div>
    </div>
  )
}
