export const VIDEO_QUALITY_MAP = {
  hd: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30 },
  },
  fhd: {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    frameRate: { ideal: 30 },
  },
  "4k": {
    width: { ideal: 3840 },
    height: { ideal: 2160 },
    frameRate: { ideal: 30 },
  },
} as const;

export const MIME_TYPES = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm;codecs=h264,opus",
  "video/webm",
  "video/mp4;codecs=h264,aac",
  "video/mp4",
];

export type VideoQuality = keyof typeof VIDEO_QUALITY_MAP;
