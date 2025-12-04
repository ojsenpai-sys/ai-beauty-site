"use client"

interface ControlPanelProps {
  sliders: {
    chest: number
    waist: number
    hips: number
    makeup: number
  }
  onSliderChange: (key: keyof ControlPanelProps["sliders"], value: number) => void
}

export default function ControlPanel({ sliders, onSliderChange }: ControlPanelProps) {
  const sliderConfig = [
    { key: "chest" as const, label: "Chest", emoji: "💗" },
    { key: "waist" as const, label: "Waist", emoji: "⌛" },
    { key: "hips" as const, label: "Hip", emoji: "🍑" },
    { key: "makeup" as const, label: "Makeup Intensity", emoji: "💄" },
  ]

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-pink-100 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">スタイル調整</h2>

      {sliderConfig.map(({ key, label, emoji }) => (
        <div key={key} className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <span>{emoji}</span>
              {label}
            </label>
            <span className="text-xl font-bold text-pink-500">{sliders[key]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliders[key]}
            onChange={(e) => onSliderChange(key, Number.parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-pink-200 to-pink-300 rounded-full appearance-none cursor-pointer accent-pink-500"
            style={{
              background: `linear-gradient(to right, #fbcfe8, #f472b6 ${sliders[key]}%, #fce7f3 ${sliders[key]}%, #fce7f3)`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
