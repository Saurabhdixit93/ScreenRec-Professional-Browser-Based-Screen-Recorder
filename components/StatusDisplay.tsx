import React from "react";
import { RecordingState } from "../hooks/useScreenRecorder";
import { formatDuration } from "../lib/utils";

interface StatusDisplayProps {
  state: RecordingState;
  countdown: number;
  duration: number;
  stopRecording: () => void;
  stream: MediaStream | null;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
  state,
  countdown,
  duration,
  stopRecording,
  stream,
}) => {
  const attachStream = React.useCallback(
    (video: HTMLVideoElement | null) => {
      if (video && stream) {
        video.srcObject = stream;
        video.play().catch(() => {
          // Silently fail if play is interrupted, usually browser handles this
        });
      }
    },
    [stream],
  );

  if (state === "requesting") {
    return (
      <div className="text-center py-8">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-sm">Waiting for permission</p>
        <p className="text-zinc-700 text-xs mt-1">
          Allow access in the popup that appeared
        </p>
      </div>
    );
  }

  if (state === "countdown" || state === "recording") {
    return (
      <div className="space-y-4">
        {/* Video Preview Overlay Container */}
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video border border-zinc-800 shadow-2xl">
          <video
            ref={attachStream}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain"
          />

          {/* Overlay contents */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/30">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-xs font-bold tracking-widest uppercase">
                  {state === "countdown" ? "Ready" : "Recording"}
                </span>
              </div>
              <div className="text-3xl font-extrabold tabular-nums tracking-tight drop-shadow-md text-white font-mono">
                {state === "countdown" ? countdown : formatDuration(duration)}
              </div>
            </div>

            {/* Bottom row (only if recording) */}
            {state === "recording" && (
              <div className="flex items-center justify-center gap-0.5 h-10 px-2 opacity-80">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full"
                    style={{
                      background: "linear-gradient(to top, #6366f1, #a855f7)",
                      animation: `wave ${0.5 + (i % 6) * 0.1}s ease-in-out infinite alternate`,
                      animationDelay: `${i * 0.04}s`,
                      height: `${25 + ((i * 13 + 7) % 75)}%`,
                      opacity: 0.6 + (i % 3) * 0.13,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {state === "recording" && (
          <button
            onClick={stopRecording}
            className="w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase border transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              borderColor: "rgba(239,68,68,0.4)",
              background: "rgba(239,68,68,0.07)",
              color: "#f87171",
            }}
          >
            ■ &nbsp;Stop Recording
          </button>
        )}
      </div>
    );
  }

  if (state === "processing") {
    return (
      <div className="text-center py-8">
        <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-sm">Processing...</p>
        <p className="text-zinc-700 text-xs mt-1">
          Building your video file locally
        </p>
      </div>
    );
  }

  return null;
};
