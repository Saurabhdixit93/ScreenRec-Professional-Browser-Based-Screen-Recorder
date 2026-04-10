import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-indigo-950/40 text-indigo-400 text-xs tracking-widest uppercase mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        No cloud · No upload · 100% local
      </div>
      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-2">
        <span className="text-zinc-100">Screen</span>
        <span
          style={{
            background: "linear-gradient(135deg, #818cf8, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rec
        </span>
      </h1>
      <p className="text-zinc-600 text-sm">
        Record screen + audio · Download directly · Never leaves your device
      </p>
    </div>
  );
};
