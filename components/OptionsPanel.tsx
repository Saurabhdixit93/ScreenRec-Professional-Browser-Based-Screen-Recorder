import React from "react";
import { RecordingOptions } from "../hooks/useScreenRecorder";

interface OptionsPanelProps {
  options: RecordingOptions;
  setOptions: React.Dispatch<React.SetStateAction<RecordingOptions>>;
  isMobile: boolean;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
  options,
  setOptions,
  isMobile,
}) => {
  return (
    <div className="p-5 border-b border-zinc-800/60 space-y-4">
      <p className="text-zinc-600 text-xs uppercase tracking-widest">
        Configure
      </p>

      {/* Quality selector */}
      <div>
        <p className="text-zinc-500 text-xs mb-2">Video Quality</p>
        <div className="flex gap-2">
          {(["hd", "fhd", "4k"] as const).map((q) => (
            <button
              key={q}
              onClick={() => setOptions((o) => ({ ...o, videoQuality: q }))}
              className="flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all duration-150"
              style={
                options.videoQuality === q
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))",
                      borderColor: "#6366f1",
                      color: "#a5b4fc",
                    }
                  : {
                      background: "transparent",
                      borderColor: "rgba(63,63,70,0.6)",
                      color: "#52525b",
                    }
              }
            >
              {q === "fhd" ? "1080p" : q === "hd" ? "720p" : "4K"}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        {!isMobile && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-300 text-sm">System Audio</p>
              <p className="text-zinc-600 text-xs">
                Tab/app sounds · Chrome & Edge only
              </p>
            </div>
            <button
              onClick={() => setOptions((o) => ({ ...o, audio: !o.audio }))}
              className="relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0"
              style={{ background: options.audio ? "#6366f1" : "#27272a" }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                style={{
                  transform: options.audio ? "translateX(20px)" : "none",
                }}
              />
            </button>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-300 text-sm">Microphone</p>
            <p className="text-zinc-600 text-xs">Voice narration mixed in</p>
          </div>
          <button
            onClick={() => setOptions((o) => ({ ...o, micAudio: !o.micAudio }))}
            className="relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0"
            style={{ background: options.micAudio ? "#6366f1" : "#27272a" }}
          >
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
              style={{
                transform: options.micAudio ? "translateX(20px)" : "none",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
