export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-200/70 pt-4 pb-2">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-gray-500 sm:flex-row">
        <p className="flex items-center gap-1.5">
          <span className="font-semibold text-gray-800">TFUIA</span>
          <span className="text-gray-300">•</span>
          <span>Web Teknologi</span>
          <span className="text-gray-300">•</span>
          <span>© {new Date().getFullYear()}</span>
        </p>

        <p className="flex items-center gap-2">
          <span className="text-gray-400">Dikerjakan oleh</span>
          <span className="font-medium text-gray-800">Moh Hamda Khoiro Afwa</span>
          <span className="rounded bg-blue-50 px-2 py-0.5 font-mono text-[11px] font-medium text-blue-600">
            3420230022
          </span>
        </p>
      </div>
    </footer>
  );
}


