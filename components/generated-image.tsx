"use client"

export default function GeneratedImage({
  image,
  isGenerating,
}: {
  image: string | null
  isGenerating: boolean
}) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-pink-100">
      <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-semibold">生成中...</p>
          </div>
        ) : image ? (
          <img src={image || "/placeholder.svg"} alt="Generated beauty image" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-gray-500 font-semibold">
              生成ボタンをクリックして
              <br />
              あなたの美容スタイルを作成
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
