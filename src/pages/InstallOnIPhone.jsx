import { motion } from 'framer-motion'

export default function InstallOnIPhone() {
  return (
    <div className="container-max py-10">
      <motion.h1 initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.3}} className="text-2xl font-bold">How to Install on iPhone</motion.h1>
      <div className="mt-4 card border border-gray-200">
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Open this website in Safari on your iPhone.</li>
          <li>Tap the Share icon (square with an up arrow).</li>
          <li>Scroll down and tap “Add to Home Screen”.</li>
          <li>Tap “Add”. An app icon will appear on your Home Screen.</li>
        </ol>
        <p className="text-sm text-gray-600 mt-4">Note: iOS does not show the install banner. Use the steps above. Once installed, it opens full-screen like an app and works offline.</p>
      </div>
    </div>
  )
}
