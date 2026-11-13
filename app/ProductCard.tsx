import React from 'react';

export default function ProductCard() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[220px]">
        <div className="w-full md:w-32 bg-[#4299e1] flex items-center justify-center p-6 shrink-0">
          <span className="text-amber-300 text-3xl font-bold">⚡</span>
        </div>
        <div className="p-6 flex flex-col justify-center">
          <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
            CUSTOM BADGE
          </div>
          <h3 className="text-xl font-bold text-gray-900 leading-snug">
            Next.js & Tailwind Terintegrasi
          </h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed bg-gray-200/60 p-2 rounded">
            Komponen ini menggunakan warna kustom bawaan{' '}
            <span className="text-blue-500 font-semibold">brand</span>, responsif
            terhadap mode gelap, dan tata letak yang fleksibel secara mobile-first.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <button className="px-5 py-2.5 bg-[#3b82f6] hover:bg-blue-600 text-white font-medium text-sm rounded-xl transition-colors duration-200">
              Beli Sekarang
            </button>
            <button className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium text-sm rounded-xl transition-colors duration-200">
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}