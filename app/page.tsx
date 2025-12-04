'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [breast, setBreast] = useState(50);
  const [waist, setWaist] = useState(50);
  const [hips, setHips] = useState(50);
  const [makeup, setMakeup] = useState(50);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image.split(',')[1]); // base64からデータだけ抜く
    formData.append("prompt", `masterpiece, beautiful japanese woman, 2025 trend, velvety matte makeup, berry lips, soft contour, feminine curve body, warm pastel clothing, breast size ${breast}, waist ${waist}, hips ${hips}, makeup intensity ${makeup}`);

    try {
      const res = await fetch("https://4f1d69fc205041800c.gradio.live/api/predict", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setResult(`data:image/png;base64,${data.data[0]}`);
    } catch (e) {
      alert("生成エラー…Colabが落ちてるかも？");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          KIRA☆KIRA AI
        </h1>

        {/* 写真アップロード */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 text-center">
          {!image ? (
            <label className="cursor-pointer">
              <div className="border-4 border-dashed border-pink-300 rounded-2xl p-16 hover:border-pink-500 transition">
                <p className="text-2xl text-pink-600">顔写真をドラッグ＆ドロップ</p>
                <p className="text-gray-500">またはクリックして選択</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          ) : (
            <Image src={image} alt="upload" width={400} height={400} className="rounded-2xl mx-auto" />
          )}
        </div>

        {/* ワンクリックボタン */}
        <div className="text-center mb-8">
          <button
            onClick={handleGenerate}
            disabled={!image || loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-3xl px-16 py-8 rounded-full shadow-2xl hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "生成中…" : "2025トレンドワンクリック"}
          </button>
        </div>

        {/* スライダー */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="grid grid-cols-2 gap-8">
            {[
              { label: "胸", value: breast, set: setBreast },
              { label: "腰", value: waist, set: setWaist },
              { label: "尻", value: hips, set: setHips },
              { label: "メイク濃さ", value: makeup, set: setMakeup },
            ].map((item) => (
              <div key={item.label}>
                <label className="block text-xl mb-4 text-pink-600">{item.label}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={item.value}
                  onChange={(e) => item.set(Number(e.target.value))}
                  className="w-full h-4 bg-pink-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-2xl">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 結果表示 */}
        {result && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <h2 className="text-4xl font-bold mb-8 text-pink-600">あなたの理想の自分✨</h2>
            <Image src={result} alt="result" width={600} height={800} className="rounded-2xl mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
