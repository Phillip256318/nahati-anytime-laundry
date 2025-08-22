import { useEffect, useState, useCallback } from 'react'

export function usePWAInstall() {
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

  const install = useCallback(async () => {
    if (!deferredPrompt) return { outcome: 'dismissed' }
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setCanInstall(false)
    return choice
  }, [deferredPrompt])

  return { canInstall, install }
}

export function usePWAUpdate() {
  const [needRefresh, setNeedRefresh] = useState(false)

  useEffect(() => {
    // Listen to custom events from main.jsx registration hooks if needed later
    const onNeedRefresh = () => setNeedRefresh(true)
    window.addEventListener('pwa:need-refresh', onNeedRefresh)
    return () => window.removeEventListener('pwa:need-refresh', onNeedRefresh)
  }, [])

  const reload = useCallback(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(() => window.location.reload())
  }, [])

  return { needRefresh, reload }
}
