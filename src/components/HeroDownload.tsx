import { useState } from 'react';
import {
  Download,
  Github,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Watch,
  ExternalLink,
  ArrowDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_SPECS } from '../data/appData';

interface HeroDownloadProps {
  onDownloadTriggered: () => void;
}

export function HeroDownload({ onDownloadTriggered }: HeroDownloadProps) {
  const [downloadState, setDownloadState] = useState<
    'idle' | 'starting' | 'downloaded'
  >('idle');

  const handleDownload = () => {
    setDownloadState('starting');
    onDownloadTriggered();

    const link = document.createElement('a');
    link.href = APP_SPECS.downloadUrl;
    link.download = APP_SPECS.fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadState('downloaded');
    }, 1000);
  };

  return (
    <section className="relative pt-12 pb-14 md:pt-16 md:pb-20 overflow-hidden">
      {/* Background Soft Accent Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full blur-[140px] opacity-20"
        style={{ background: '#bcd453' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Top GitHub link in header-less design */}
        <div className="w-full flex justify-end mb-4">
          <a
            href={APP_SPECS.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100 text-xs font-medium border border-neutral-800/80 transition-all"
            id="top-github-link"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>
        </div>

        {/* Application Icon */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 160 }}
          className="relative mb-6 group cursor-pointer"
          onClick={handleDownload}
          title="Click to download zepp_reader.apk"
        >
          <div
            className="absolute -inset-2 rounded-full opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle, #bcd453 0%, transparent 70%)',
            }}
          />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl ring-2 ring-neutral-800 group-hover:ring-[#bcd453] transition-all duration-300 transform group-hover:scale-105">
            <img
              src="/app-icon.png"
              alt="Zepp Reader App Icon"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-100 max-w-2xl leading-[1.15]"
        >
          Zepp Reader
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-3 text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed"
        >
          Modern companion app for reading EPUB, FB2, and TXT books on your
          Zepp OS smartwatch. Simple, lightweight, and distraction-free.
        </motion.p>

        {/* Primary Download Action Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
        >
          {/* Main Download Button */}
          <button
            onClick={handleDownload}
            id="hero-main-download-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#bcd453] hover:bg-[#a8bf42] text-neutral-950 font-bold text-base tracking-tight shadow-[0_8px_24px_rgba(188,212,83,0.3)] hover:shadow-[0_10px_32px_rgba(188,212,83,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            <Download className="w-5 h-5 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
            <div className="text-left">
              <div className="leading-tight">Download APK</div>
              <div className="text-[11px] font-mono text-neutral-900/80 font-normal">
                {APP_SPECS.fileName} • {APP_SPECS.fileSize}
              </div>
            </div>
          </button>

          {/* Secondary GitHub Source Button */}
          <a
            href={APP_SPECS.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-github-source-btn"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-sm font-semibold border border-neutral-800 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
          >
            <Github className="w-4 h-4 text-neutral-300" />
            <span>Source Code</span>
          </a>
        </motion.div>

        {/* Download Feedback Banner */}
        <AnimatePresence>
          {downloadState !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 w-full max-w-md p-3.5 rounded-xl bg-neutral-900/95 border border-[#bcd453]/40 shadow-lg text-left flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-[#bcd453] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-neutral-100">
                  {downloadState === 'starting'
                    ? 'Starting download...'
                    : 'Download started!'}
                </p>
                <p className="text-neutral-400 mt-0.5">
                  Your browser is downloading{' '}
                  <span className="font-mono text-[#bcd453]">
                    {APP_SPECS.fileName}
                  </span>
                  .
                </p>
                <a
                  href="#install-guide"
                  className="inline-flex items-center gap-1 text-[#bcd453] font-medium mt-1.5 hover:underline"
                >
                  View 3-step install guide
                  <ArrowDown className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-400"
        >
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#bcd453]" />
            <span>{APP_SPECS.minAndroid}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Watch className="w-4 h-4 text-[#bcd453]" />
            <span>Zepp OS 390×450 AMOLED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#bcd453]" />
            <span>Open Source & Free</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
