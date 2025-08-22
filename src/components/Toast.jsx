export default function Toast({ show, message, actions = [], onClose }) {
  if (!show) return null
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-lg bg-gray-900 text-white px-4 py-3 shadow-lg flex items-center gap-3">
        <span className="text-sm">{message}</span>
        {actions.map((a, idx) => (
          <button key={idx} className="ml-2 rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20" onClick={a.onClick}>{a.label}</button>
        ))}
        {onClose && (
          <button aria-label="Close" className="ml-2 rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20" onClick={onClose}>×</button>
        )}
      </div>
    </div>
  )
}
