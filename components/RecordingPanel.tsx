import React from "react";
import { useScreenRecorder } from "../hooks/useScreenRecorder";
import { OptionsPanel } from "./OptionsPanel";
import { StatusDisplay } from "./StatusDisplay";
import { DownloadPanel } from "./DownloadPanel";
import { formatDuration } from "../lib/utils";

export const RecordingPanel: React.FC = () => {
  const {
    state,
    countdown,
    duration,
    downloadUrl,
    downloadName,
    options,
    setOptions,
    error,
    fileSize,
    isMobile,
    startRecording,
    stopRecording,
    reset,
    previewStream,
  } = useScreenRecorder();

  return (
    <div className="w-full max-w-md space-y-3">
      {/* Mobile notice */}
      {isMobile && (
        <div className="p-4 rounded-xl border border-blue-500/25 bg-blue-950/30 text-blue-300 text-xs">
          📱 Screen capture isn&apos;t supported on all mobile browsers. Camera
          recording will be used instead.
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/25 bg-red-950/30 text-red-300 text-xs">
          ⚠ {error}
        </div>
      )}

      {/* Main panel */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md overflow-hidden">
        {state === "idle" && (
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            isMobile={isMobile}
          />
        )}

        <div className="p-5">
          {state === "idle" && (
            <button
              onClick={startRecording}
              className="w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                boxShadow:
                  "0 0 40px rgba(99,102,241,0.35), 0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <span className="flex items-center justify-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                Start Recording
              </span>
            </button>
          )}

          <StatusDisplay
            state={state}
            countdown={countdown}
            duration={duration}
            stopRecording={stopRecording}
            stream={previewStream}
          />

          {state === "done" && (
            <DownloadPanel
              downloadUrl={downloadUrl}
              downloadName={downloadName}
              duration={formatDuration(duration)}
              fileSize={fileSize}
              reset={reset}
            />
          )}
        </div>
      </div>

      {/* Feature tags */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: "🔒", title: "Local Only", sub: "Never uploaded" },
          { icon: "⚡", title: "Instant DL", sub: "Direct save" },
          { icon: "🎙", title: "Mic + System", sub: "Mixed audio" },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 py-3 px-2 text-center"
          >
            <div className="text-lg mb-0.5">{f.icon}</div>
            <div className="text-zinc-300 text-xs font-bold">{f.title}</div>
            <div className="text-zinc-700 text-xs">{f.sub}</div>
          </div>
        ))}
      </div>

      {/* Compatibility table */}
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4">
        <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">
          Browser / Device Support
        </p>
        <div className="space-y-2">
          {[
            { name: "Chrome / Edge (Desktop)", screen: "✅", audio: "✅" },
            { name: "Firefox (Desktop)", screen: "✅", audio: "🟡 Mic only" },
            { name: "Safari (Mac 13+)", screen: "✅", audio: "🟡 Mic only" },
            { name: "Android Chrome", screen: "🟡 Camera", audio: "✅" },
            { name: "iOS Safari", screen: "⛔", audio: "⛔" },
          ].map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-zinc-500">{r.name}</span>
              <div className="flex gap-4 text-right">
                <span title="Screen">{r.screen}</span>
                <span title="Audio">{r.audio}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-zinc-700 text-xs mt-3 pt-3 border-t border-zinc-800">
          For best results: Chrome or Edge on Windows/Mac/Linux
        </p>
      </div>
    </div>
  );
};
