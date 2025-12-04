"use client"

import type React from "react"

import { useRef, useState } from "react"

interface UploadSectionProps {
  onImageUpload: (file: File) => void
  uploadedImage: string | null
}

export default function UploadSection({ onImageUpload, uploadedImage }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onImageUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onImageUpload(e.target.files[0])
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative w-full aspect-square rounded-3xl border-4 border-dashed transition-all cursor-pointer flex items-center justify-center overflow-hidden ${
        isDragging ? "border-pink-400 bg-pink-50" : "border-pink-300 bg-white hover:border-pink-400"
      }`}
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {uploadedImage ? (
        <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded face" className="w-full h-full object-cover" />
      ) : (
        <div className="text-center px-6">
          <div className="text-5xl mb-4">📸</div>
          <p className="text-lg font-bold text-gray-700 mb-2">顔写真をドラッグ＆ドロップ</p>
          <p className="text-sm text-gray-500">またはクリックして選択</p>
        </div>
      )}
    </div>
  )
}
