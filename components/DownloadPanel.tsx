import React from "react";

export const DownloadPanel: React.FC<{
  downloadUrl: string | null;
  downloadName: string;
  duration: string;
  fileSize: string | null;
  reset: () => void;
}> = ({ downloadUrl, downloadName, duration, fileSize, reset }) => {
  if (!downloadUrl) return null;

  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl border border-emerald-500/25 bg-emerald-950/20">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            ✓
          </div>
          <div>
            <p className="text-emerald-400 text-sm font-bold">Done!</p>
            <p className="text-zinc-600 text-xs">
              {duration} &middot; {fileSize}
            </p>
          </div>
        </div>
        <p className="text-zinc-700 text-xs truncate mt-2">{downloadName}</p>
      </div>

      <a
        href={downloadUrl}
        download={downloadName}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          boxShadow: "0 0 30px rgba(5,150,105,0.3)",
        }}
      >
        ↓ &nbsp;Download
      </a>

      <button
        onClick={reset}
        className="w-full py-3 rounded-xl text-zinc-600 hover:text-zinc-400 text-xs tracking-widest uppercase border border-zinc-800 hover:border-zinc-700 transition-all"
      >
        Record Again
      </button>
    </div>
  );
};
