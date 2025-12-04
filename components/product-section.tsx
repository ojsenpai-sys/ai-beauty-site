"use client"

export default function ProductSection() {
  const products = [
    { id: 1, name: "ピンクグロウリップ", price: "¥2,980", emoji: "💋" },
    { id: 2, name: "ラディアンスファンデーション", price: "¥4,200", emoji: "✨" },
    { id: 3, name: "グラマーマスカラ", price: "¥3,500", emoji: "👁️" },
    { id: 4, name: "ベルベットチーク", price: "¥2,500", emoji: "🌸" },
  ]

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-pink-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">このスタイルに似た商品</h3>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 rounded-2xl p-4 hover:shadow-lg hover:border-pink-400 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-3">{product.emoji}</div>
            <p className="font-bold text-gray-800 text-sm mb-2">{product.name}</p>
            <p className="text-pink-600 font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
