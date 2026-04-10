# ScreenRec: Professional Browser-Based Screen Recorder

![ScreenRec Feature Image](https://raw.githubusercontent.com/username/project/main/public/thumbnail.png)<!-- Link to actual image if available elsewhere -->

ScreenRec is a modern, privacy-focused, and high-performance screen recording application built with Next.js and Tailwind CSS. It allows you to record your screen, microphone, and system audio directly from your browser with zero latency and absolute privacy—all processing happens locally on your device.

## 🚀 Features

- **Privacy First**: No servers, no uploads. Your recordings are processed and stored locally in your browser and never leave your device.
- **High Fidelity Recording**: Support for 4K, Full HD (1080p), and HD (720p) quality presets.
- **Mixed Audio Capture**: Seamlessly record system audio and microphone inputs simultaneously.
- **Real-time Live Preview**: Monitor your recording in real-time with a professional UI overlay.
- **Instant Processing**: Super-fast local encoding into `.mp4` or `.webm` formats depending on your browser.
- **Zero Installation**: Works directly in any modern desktop browser (Chrome, Edge, Firefox, Safari).

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Logic**: React Hooks & MediaRecorder API
- **Styling**: Vanilla CSS & Tailwind CSS for modern glassmorphism aesthetics
- **Type Safety**: TypeScript

## 🎯 Getting Started

### Prerequisites

- Node.js (v18.0 or higher)
- npm, pnpm, or bun

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Saurabhdixit93/ScreenRec-Professional-Browser-Based-Screen-Recorder.git
    cd ScreenRec-Professional-Browser-Based-Screen-Recorder
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Run the development server:

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to start recording.

## 📦 Project Structure

- `app/`: Next.js App Router pages and global layouts.
- `components/`: Modular UI components (RecordingPanel, StatusDisplay, etc.).
- `hooks/`: Custom React hooks for recording logic and state management.
- `lib/`: Utility functions and global constants.

## 🔧 Configuration

You can customize video qualities and MIME types in `lib/constants.ts` and `lib/utils.ts`.

## 🤝 Roadmap

- [ ] Customizable hotkeys
- [ ] Simple video trimmer
- [ ] Cloud storage integration (optional/opt-in)
- [ ] Browser extension support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for privacy and productivity.
