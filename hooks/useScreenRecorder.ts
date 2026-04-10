import { useState, useRef, useCallback, useEffect } from "react";
import { VIDEO_QUALITY_MAP, VideoQuality } from "../lib/constants";
import { getSupportedMimeType, formatBytes } from "../lib/utils";

export type RecordingState =
  | "idle"
  | "requesting"
  | "countdown"
  | "recording"
  | "processing"
  | "done";

export interface RecordingOptions {
  audio: boolean;
  micAudio: boolean;
  videoQuality: VideoQuality;
}

export const useScreenRecorder = () => {
  const [state, setState] = useState<RecordingState>("idle");
  const [countdown, setCountdown] = useState(3);
  const [duration, setDuration] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState("");
  const [options, setOptions] = useState<RecordingOptions>({
    audio: true,
    micAudio: true,
    videoQuality: "fhd",
  });
  const [error, setError] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const displayStreamRef = useRef<MediaStream | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const durationRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  const stopRecordingInternal = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    [streamRef.current, displayStreamRef.current, micStreamRef.current].forEach(
      (s) => {
        s?.getTracks().forEach((t) => {
          t.stop();
          t.enabled = false;
        });
      },
    );

    streamRef.current = null;
    displayStreamRef.current = null;
    micStreamRef.current = null;
    setCurrentStream(null);
    setPreviewStream(null);

    if (timerRef.current) clearInterval(timerRef.current);
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);
    setState("requesting");

    try {
      let stream: MediaStream;
      const videoConstraints = VIDEO_QUALITY_MAP[options.videoQuality];

      if (isMobile) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", ...videoConstraints },
          audio: options.audio || options.micAudio,
        });
        displayStreamRef.current = stream;
        setPreviewStream(stream);
      } else {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: videoConstraints as MediaTrackConstraints,
          audio: options.audio,
        });
        displayStreamRef.current = displayStream;
        setPreviewStream(displayStream);

        if (options.micAudio) {
          try {
            const micStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            micStreamRef.current = micStream;
            const audioContext = new AudioContext();
            audioCtxRef.current = audioContext;
            const destination = audioContext.createMediaStreamDestination();

            if (displayStream.getAudioTracks().length > 0) {
              const sysSource = audioContext.createMediaStreamSource(
                new MediaStream(displayStream.getAudioTracks()),
              );
              sysSource.connect(destination);
            }
            const micSource = audioContext.createMediaStreamSource(micStream);
            micSource.connect(destination);

            stream = new MediaStream([
              ...displayStream.getVideoTracks(),
              ...destination.stream.getAudioTracks(),
            ]);
          } catch {
            stream = displayStream;
          }
        } else {
          stream = displayStream;
        }
      }

      streamRef.current = stream;
      setCurrentStream(stream);

      displayStreamRef.current
        ?.getVideoTracks()[0]
        ?.addEventListener("ended", () => {
          stopRecordingInternal();
        });

      setState("countdown");
      let count = 3;
      setCountdown(count);
      await new Promise<void>((resolve) => {
        const cd = setInterval(() => {
          count--;
          setCountdown(count);
          if (count === 0) {
            clearInterval(cd);
            resolve();
          }
        }, 1000);
      });

      chunksRef.current = [];
      const mimeType = getSupportedMimeType();
      const bitrate =
        options.videoQuality === "4k"
          ? 12000000
          : options.videoQuality === "fhd"
            ? 6000000
            : 3000000;

      const recorder = new MediaRecorder(stream, {
        mimeType: mimeType || undefined,
        videoBitsPerSecond: bitrate,
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        setState("processing");
        const mtype = mimeType.includes("mp4") ? "video/mp4" : "video/webm";
        const ext = mtype.includes("mp4") ? "mp4" : "webm";
        const blob = new Blob(chunksRef.current, { type: mtype });
        const url = URL.createObjectURL(blob);
        const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        setFileSize(formatBytes(blob.size));
        setDownloadUrl(url);
        setDownloadName(`screen-recording-${ts}.${ext}`);
        setState("done");
        if (timerRef.current) clearInterval(timerRef.current);
        audioCtxRef.current?.close();
      };

      mediaRecorderRef.current = recorder;
      recorder.start(1000);
      setState("recording");
      durationRef.current = 0;
      setDuration(0);
      timerRef.current = setInterval(() => {
        durationRef.current++;
        setDuration(durationRef.current);
      }, 1000);
    } catch (err: unknown) {
      setState("idle");
      audioCtxRef.current?.close();
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setError(
            "Permission denied. Please allow screen access when the browser asks.",
          );
        } else if (err.name === "NotSupportedError") {
          setError(
            "Screen recording not supported in this browser. Try Chrome or Edge on desktop.",
          );
        } else {
          setError(err.message || "Failed to start recording.");
        }
      }
    }
  }, [options, isMobile, stopRecordingInternal]);

  const stopRecording = useCallback(() => {
    stopRecordingInternal();
  }, [stopRecordingInternal]);

  const reset = useCallback(() => {
    stopRecordingInternal();
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setDownloadName("");
    setFileSize(null);
    setDuration(0);
    setError(null);
    setState("idle");
  }, [downloadUrl, stopRecordingInternal]);

  useEffect(() => {
    return () => {
      stopRecordingInternal();
    };
  }, [stopRecordingInternal]);

  return {
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
    currentStream,
    previewStream,
  };
};
