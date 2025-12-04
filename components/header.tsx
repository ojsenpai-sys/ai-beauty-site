"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isPremium, setIsPremium] = useState(false)

  const handlePremium = () => {
    // Stripeの支払い処理へ移動
    setIsPremium(true)
  }

  return (
    <header className="bg-white border-b-2 border-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">✨</span>
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">
            KIRA☆KIRA AI
          </h1>
        </div>

        <Button
          onClick={handlePremium}
          className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold px-6 py-2 rounded-full shadow-lg"
        >
          有料会員になる
        </Button>
      </div>
    </header>
  )
}
