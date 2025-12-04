"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import UploadSection from "@/components/upload-section"
import ControlPanel from "@/components/control-panel"
import GeneratedImage from "@/components/generated-image"
import ProductSection from "@/components/product-section"

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [sliders, setSliders] = useState({
    chest: 50,
    waist: 50,
    hips: 50,
    makeup: 50,
  })

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleGenerate = async () => {
    if (!uploadedImage) {
      alert("顔写真をアップロードしてください")
      return
    }

    setIsGenerating(true)
    try {
      // API呼び出しをシミュレート（実際はバックエンドで画像生成）
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // デモ用のプレースホルダー画像
      setGeneratedImage("/beauty-generated-image.jpg")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSliderChange = (key: keyof typeof sliders, value: number) => {
    setSliders((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* 左側：アップロードとコントロール */}
          <div className="space-y-6">
            <UploadSection onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-pink-100">
              <Button
                onClick={handleGenerate}
                disabled={!uploadedImage || isGenerating}
                className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-lg"
              >
                {isGenerating ? "生成中..." : "2025トレンドワンクリック"}
              </Button>
            </div>

            <ControlPanel sliders={sliders} onSliderChange={handleSliderChange} />

            <Button
              onClick={handleGenerate}
              disabled={!uploadedImage || isGenerating}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full"
            >
              {isGenerating ? "生成中..." : "生成する"}
            </Button>
          </div>

          {/* 右側：生成画像と商品 */}
          <div className="space-y-6">
            <GeneratedImage image={generatedImage} isGenerating={isGenerating} />
            {generatedImage && <ProductSection />}
          </div>
        </div>
      </main>
    </div>
  )
}
