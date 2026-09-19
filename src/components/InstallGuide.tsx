import { useState } from 'react';
import {
  DownloadCloud,
  ShieldCheck,
  Watch,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INSTALL_STEPS, FAQS, APP_SPECS } from '../data/appData';

interface InstallGuideProps {
  onDownloadClick: () => void;
}

export function InstallGuide({ onDownloadClick }: InstallGuideProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="install-guide"
      className="py-14 md:py-20 relative border-t border-neutral-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#bcd453] font-semibold">
            Simple 3-Step Setup
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-100 mt-2">
            How to Install on Android
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Installation takes less than a minute. Follow these steps on your phone.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="space-y-3.5">
          {INSTALL_STEPS.map((step) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: step.step * 0.1 }}
              className="p-5 sm:p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex flex-col sm:flex-row items-start gap-4 transition-all hover:border-neutral-700"
            >
              {/* Step Number */}
              <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center font-mono font-bold text-sm text-[#bcd453] border border-neutral-700/60 shadow-sm">
                  0{step.step}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <h3 className="text-base font-bold text-neutral-100">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-300 leading-relaxed">
                  {step.details}
                </p>

                {step.tip && (
                  <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-800/80 text-xs text-neutral-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bcd453]" />
                    <span>Tip: {step.tip}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance Note */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#bcd453]/10 border border-[#bcd453]/30 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-[#bcd453] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <h4 className="font-bold text-neutral-100">
              Seeing a "File might be harmful" prompt?
            </h4>
            <p className="mt-1 text-neutral-300 leading-relaxed">
              Google Chrome and Android display this warning for any APK file downloaded outside the Play Store. Zepp Reader is safe, contains zero tracking or ads, and its source code is fully open on GitHub. Tap{' '}
              <strong className="text-[#bcd453]">Download anyway</strong> to continue.
            </p>
          </div>
        </div>

        {/* Quick Action */}
        <div className="mt-7 text-center">
          <button
            onClick={onDownloadClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#bcd453] hover:bg-[#a8bf42] text-neutral-950 font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            <DownloadCloud className="w-4 h-4 stroke-[2.5]" />
            <span>Download {APP_SPECS.fileName}</span>
          </button>
        </div>

        {/* FAQs */}
        <div className="mt-14">
          <h3 className="text-xl font-bold text-neutral-100 mb-5 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-neutral-200 hover:text-[#bcd453] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/40 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
