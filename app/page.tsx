"use client";

import { Header } from "../components/Header";
import { RecordingPanel } from "../components/RecordingPanel";

export default function ScreenRecorder() {
  return (
    <main
      className="min-h-screen bg-[#07070d] text-white overflow-hidden relative"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glows */}
      <div
        className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-10">
        <Header />
        <RecordingPanel />
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: scaleY(0.2);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </main>
  );
}
