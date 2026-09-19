import { Github, Download, ArrowUp } from 'lucide-react';
import { APP_SPECS } from '../data/appData';

interface FooterProps {
  onDownloadClick: () => void;
}

export function Footer({ onDownloadClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Version */}
          <div className="flex items-center gap-3">
            <img
              src="/app-icon.png"
              alt="Zepp Reader Logo"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full ring-1 ring-neutral-700"
            />
            <div>
              <div className="font-bold text-sm text-neutral-100 flex items-center gap-2">
                <span>Zepp Reader</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-[#bcd453] border border-neutral-800">
                  v{APP_SPECS.version}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Reading companion for Zepp OS smartwatches
              </p>
            </div>
          </div>

          {/* Direct Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-400">
            <button
              onClick={onDownloadClick}
              className="hover:text-[#bcd453] transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download APK</span>
            </button>
            <a
              href={APP_SPECS.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-200 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-neutral-200 transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-5 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} RusanGenius. Open-source software.
          </p>
          <p className="text-center sm:text-right">
            Zepp OS and Amazfit are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
