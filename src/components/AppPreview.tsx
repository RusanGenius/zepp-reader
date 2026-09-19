import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Watch,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Settings as SettingsIcon,
  Check,
  Play,
  Square,
  Upload,
  BookOpen,
  ArrowDown,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

export function AppPreview() {
  const [activeTab, setActiveTab] = useState<'watch' | 'phone'>('watch');

  // Watch state
  const [watchView, setWatchView] = useState<'reading' | 'settings'>('reading');
  const [watchPage, setWatchPage] = useState(1);
  const [progressPercent, setProgressPercent] = useState(3);
  const [fontSize, setFontSize] = useState(24);
  const [headerMode, setHeaderMode] = useState<'Time + Progress' | 'Progress only' | 'Time only'>('Time + Progress');
  const [isReceivingBook, setIsReceivingBook] = useState(false);
  const [receivedNotification, setReceivedNotification] = useState<string | null>(null);

  // Phone App state
  const [phoneScreen, setPhoneScreen] = useState<'guide' | 'selected' | 'transferring'>('selected');
  const [transferProgress, setTransferProgress] = useState(25);

  // Transfer animation loop in Phone view
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneScreen === 'transferring') {
      interval = setInterval(() => {
        setTransferProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 5;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [phoneScreen]);

  // Actual book passages matching user's screenshots
  const bookPages = [
    {
      page: 1,
      percent: 3,
      text: 'They learned, for instance, that he preferred to leave the Northeast, that he was holding three job offers, two in New York and one in Chicago, and that the highest offer was $76,000 and the lowest was $68,000. He was in demand. He had been given the opportunity to cheat on a securities exam',
    },
    {
      page: 2,
      percent: 4,
      text: 'and refused. He had taken it cold and scored in the upper three percent. He had never been arrested, never had a traffic violation of consequence, and paid his bills on time. In three years at Harvard Law School, he had never missed a class.',
    },
    {
      page: 3,
      percent: 5,
      text: 'The firm had thirty partners and forty-one associates. Its offices occupied the top two floors of the Cotton Exchange Building overlooking the Mississippi River. Bendini, Lambert & Locke was not a large firm, but it was extraordinarily rich.',
    },
    {
      page: 4,
      percent: 6,
      text: 'Mitch McDeere sat across from Oliver Lambert and Nathan Locke in the corner suite. The view of the river was magnificent through the floor-to-ceiling smoked glass. The offer they were about to extend him would change his life forever.',
    },
  ];

  const handlePageNext = () => {
    if (watchView === 'settings') {
      setWatchView('reading');
      return;
    }
    setWatchPage((p) => {
      const next = p < bookPages.length ? p + 1 : 1;
      setProgressPercent(bookPages[next - 1].percent);
      return next;
    });
  };

  const handlePageBack = () => {
    if (watchView === 'settings') {
      setWatchView('reading');
      return;
    }
    setWatchPage((p) => {
      const prev = p > 1 ? p - 1 : bookPages.length;
      setProgressPercent(bookPages[prev - 1].percent);
      return prev;
    });
  };

  const adjustProgress = (delta: number) => {
    setProgressPercent((prev) => Math.max(0, Math.min(100, prev + delta)));
  };

  const cycleFontSize = () => {
    setFontSize((prev) => {
      if (prev === 20) return 24;
      if (prev === 24) return 28;
      return 20;
    });
  };

  const cycleHeaderMode = () => {
    setHeaderMode((prev) => {
      if (prev === 'Time + Progress') return 'Progress only';
      if (prev === 'Progress only') return 'Time only';
      return 'Time + Progress';
    });
  };

  const triggerReceiveBook = () => {
    setIsReceivingBook(true);
    setReceivedNotification('Connecting to phone server...');
    setTimeout(() => {
      setReceivedNotification('Transferring "The Firm.fb2"...');
    }, 1000);
    setTimeout(() => {
      setIsReceivingBook(false);
      setReceivedNotification('Book received! 513 pages ready.');
      setTimeout(() => setReceivedNotification(null), 3500);
    }, 2200);
  };

  return (
    <section id="preview" className="py-14 md:py-20 relative border-t border-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
            Interactive App Preview
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Try the real Zepp OS smartwatch reader and explore the companion Android app screens.
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-inner">
            <button
              onClick={() => setActiveTab('watch')}
              id="tab-btn-watch"
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'watch'
                  ? 'bg-[#bcd453] text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Watch className="w-4 h-4" />
              <span>Smartwatch (390×450)</span>
            </button>
            <button
              onClick={() => setActiveTab('phone')}
              id="tab-btn-phone"
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'phone'
                  ? 'bg-[#bcd453] text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Phone Companion App</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display */}
        <div className="flex justify-center items-center">
          <AnimatePresence mode="wait">
            {activeTab === 'watch' ? (
              <motion.div
                key="watch-device"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center w-full max-w-md"
              >
                {/* Rectangular Smartwatch Casing (390x450 Aspect Ratio) */}
                <div className="relative p-3.5 rounded-[44px] bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 shadow-[0_24px_60px_rgba(0,0,0,0.8)] border-4 border-neutral-700/70 ring-1 ring-neutral-700/50">
                  {/* Digital Crown on Right Edge */}
                  <div className="absolute -right-2 top-20 w-2.5 h-12 rounded-r-md bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-800 border border-neutral-600 shadow-md" />
                  {/* Secondary Flush Button on Right */}
                  <div className="absolute -right-1.5 bottom-20 w-2 h-8 rounded-r-sm bg-neutral-700/80 border-r border-neutral-600" />

                  {/* 390x450 Resolution AMOLED Display */}
                  <div
                    style={{ width: '290px', height: '335px' }}
                    className="relative bg-black rounded-[32px] overflow-hidden p-4 flex flex-col justify-between select-none border border-neutral-900 text-neutral-100"
                  >
                    {/* Screen View: Reading Mode */}
                    {watchView === 'reading' ? (
                      <div className="flex flex-col h-full justify-between">
                        {/* Top Header: Centered Time + Progress */}
                        <div className="text-center pt-0.5">
                          <span className="text-[12px] font-mono text-neutral-400 tracking-wide">
                            {headerMode === 'Time + Progress' && `19:52 • ${progressPercent}%`}
                            {headerMode === 'Progress only' && `${progressPercent}%`}
                            {headerMode === 'Time only' && '19:52'}
                          </span>
                        </div>

                        {/* Reading Passage matching Screenshot 2 */}
                        <div className="my-auto px-1">
                          <p
                            className="font-sans leading-[1.3] text-neutral-100 text-left transition-all"
                            style={{
                              fontSize: `${fontSize * 0.65}px`,
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {bookPages[watchPage - 1].text}
                          </p>
                        </div>

                        {/* Subtle In-Screen Bottom Space */}
                        <div className="pb-1 text-center">
                          <span className="text-[10px] text-neutral-600 font-mono">
                            Page {watchPage} / {bookPages.length}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Screen View: Settings Mode matching Screenshot 3 & 4 */
                      <div className="flex flex-col h-full justify-between overflow-y-auto pr-0.5 scrollbar-none text-center">
                        {/* Title */}
                        <div className="text-sm font-bold text-neutral-100 pt-0.5">
                          Settings
                        </div>

                        {/* Receive from phone button */}
                        <button
                          onClick={triggerReceiveBook}
                          disabled={isReceivingBook}
                          className="w-full py-1.5 px-3 rounded-full bg-neutral-400/80 hover:bg-neutral-300 text-neutral-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-sm"
                        >
                          <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>
                            {isReceivingBook ? 'Receiving...' : 'Receive book'}
                          </span>
                        </button>

                        {/* Notification if received */}
                        {receivedNotification && (
                          <div className="text-[10px] text-[#bcd453] font-medium bg-neutral-900/90 py-0.5 rounded">
                            {receivedNotification}
                          </div>
                        )}

                        {/* Progress label */}
                        <div className="text-xs font-semibold text-neutral-200">
                          Progress: {progressPercent}%
                        </div>

                        {/* 2x2 Progress Step Adjusters */}
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            onClick={() => adjustProgress(-1)}
                            className="py-1.5 rounded-xl bg-neutral-850 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold border border-neutral-800 transition-colors active:scale-95"
                          >
                            - 1%
                          </button>
                          <button
                            onClick={() => adjustProgress(1)}
                            className="py-1.5 rounded-xl bg-neutral-850 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold border border-neutral-800 transition-colors active:scale-95"
                          >
                            + 1%
                          </button>
                          <button
                            onClick={() => adjustProgress(-5)}
                            className="py-1.5 rounded-xl bg-neutral-850 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold border border-neutral-800 transition-colors active:scale-95"
                          >
                            - 5%
                          </button>
                          <button
                            onClick={() => adjustProgress(5)}
                            className="py-1.5 rounded-xl bg-neutral-850 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold border border-neutral-800 transition-colors active:scale-95"
                          >
                            + 5%
                          </button>
                        </div>

                        {/* Font size toggle */}
                        <button
                          onClick={cycleFontSize}
                          className="w-full py-1.5 rounded-2xl bg-neutral-850 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold border border-neutral-800 transition-colors"
                        >
                          Font size: {fontSize} px
                        </button>

                        {/* Header mode toggle */}
                        <button
                          onClick={cycleHeaderMode}
                          className="w-full py-1.5 rounded-2xl bg-neutral-850 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold border border-neutral-800 transition-colors"
                        >
                          Header: {headerMode}
                        </button>

                        {/* Done button (matching Screenshot 4) */}
                        <button
                          onClick={() => setWatchView('reading')}
                          className="w-full py-2 rounded-full bg-[#bcd453] hover:bg-[#a8bf42] text-neutral-950 text-xs font-bold transition-all active:scale-98 mt-1 shadow-sm"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* External Watch Controls (Below the screen, as requested by the user) */}
                <div className="mt-6 flex items-center justify-center gap-2.5 w-full max-w-xs">
                  <button
                    onClick={handlePageBack}
                    id="watch-btn-back"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-semibold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>&lt; Back</span>
                  </button>

                  <button
                    onClick={() =>
                      setWatchView((v) => (v === 'reading' ? 'settings' : 'reading'))
                    }
                    id="watch-btn-menu"
                    className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm ${
                      watchView === 'settings'
                        ? 'bg-[#bcd453] text-neutral-950 border-[#bcd453]'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800'
                    }`}
                  >
                    <SettingsIcon className="w-3.5 h-3.5" />
                    <span>{watchView === 'settings' ? 'Close' : 'Menu'}</span>
                  </button>

                  <button
                    onClick={handlePageNext}
                    id="watch-btn-next"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-semibold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
                  >
                    <span>Next &gt;</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-neutral-500 text-center">
                  Controls placed outside the screen. Tap <strong>Menu</strong> to configure font size, progress, and book transfer.
                </p>
              </motion.div>
            ) : (
              /* Phone App Showcase: matching user's screenshots 5, 6, 7 */
              <motion.div
                key="phone-device"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center w-full max-w-sm"
              >
                {/* Mini State Selector for the 3 Phone Screens */}
                <div className="flex items-center gap-1.5 mb-4 p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px]">
                  <button
                    onClick={() => setPhoneScreen('selected')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      phoneScreen === 'selected'
                        ? 'bg-neutral-800 text-[#bcd453]'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Ready / Standby
                  </button>
                  <button
                    onClick={() => setPhoneScreen('transferring')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      phoneScreen === 'transferring'
                        ? 'bg-neutral-800 text-[#bcd453]'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Transferring
                  </button>
                  <button
                    onClick={() => setPhoneScreen('guide')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      phoneScreen === 'guide'
                        ? 'bg-neutral-800 text-[#bcd453]'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Setup Guide
                  </button>
                </div>

                {/* Smartphone Casing */}
                <div className="w-full rounded-[40px] bg-neutral-950 p-3.5 shadow-2xl border-4 border-neutral-800 ring-1 ring-neutral-700/60">
                  {/* Inner Phone Screen */}
                  <div className="bg-[#0b0c09] rounded-[30px] p-4 flex flex-col justify-between min-h-[510px] text-neutral-100 border border-neutral-900 relative select-none">
                    {/* Phone Top App Bar (matching Screenshots 5, 6, 7) */}
                    <div>
                      <div className="flex items-center justify-between pb-3 pt-1">
                        <span className="font-extrabold tracking-wider text-xs text-neutral-100 uppercase">
                          ZEPP READER
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide">
                          {phoneScreen === 'transferring' ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-[#bcd453] animate-pulse" />
                              <span className="text-[#bcd453]">ONLINE</span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full bg-neutral-500" />
                              <span className="text-neutral-400">STANDBY</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Card 1: PROGRESS & METRICS */}
                      <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 mb-3.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-neutral-300 mb-2">
                          <span className="tracking-wider">PROGRESS</span>
                          <span>
                            {phoneScreen === 'transferring'
                              ? `${transferProgress}%`
                              : '0%'}
                          </span>
                        </div>

                        {/* Progress bar line */}
                        <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden mb-2 relative">
                          <div
                            className="h-full bg-[#bcd453] transition-all duration-300"
                            style={{
                              width: `${
                                phoneScreen === 'transferring'
                                  ? transferProgress
                                  : 0
                              }%`,
                            }}
                          />
                        </div>

                        {phoneScreen === 'transferring' && (
                          <div className="text-[11px] text-neutral-400 mb-3">
                            Transferring: {transferProgress}%
                          </div>
                        )}

                        {/* 3 Metric Boxes: PAGES, SIZE, FORMAT */}
                        <div className="grid grid-cols-3 gap-2 text-center mt-2">
                          <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
                            <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                              PAGES
                            </div>
                            <div className="text-xs font-bold text-neutral-100 mt-0.5">
                              {phoneScreen === 'guide' ? '—' : '513'}
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
                            <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                              SIZE
                            </div>
                            <div className="text-xs font-bold text-neutral-100 mt-0.5">
                              {phoneScreen === 'guide' ? '—' : '913 KB'}
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
                            <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                              FORMAT
                            </div>
                            <div className="text-xs font-bold text-neutral-100 mt-0.5">
                              {phoneScreen === 'guide' ? '—' : 'FB2'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 2: SELECTED BOOK or INSTRUCTIONS GUIDE */}
                      {phoneScreen === 'guide' ? (
                        <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 space-y-2 text-[11px] text-neutral-300 leading-snug">
                          <p>1. Choose an EPUB, FB2, or TXT file from your storage.</p>
                          <p>2. Tap "Start Server".</p>
                          <p>3. Open "Reader" app on watch, tap Menu, select "Receive book".</p>
                          <p>4. Wait for Transfer. (Keep watch screen awake during transfer).</p>
                          <p>5. Stop the server on your phone.</p>

                          <button
                            onClick={() => setPhoneScreen('selected')}
                            className="w-full mt-3 py-2 rounded-xl bg-[#bcd453] hover:bg-[#a8bf42] text-neutral-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>CHOOSE BOOK FILE</span>
                          </button>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/80">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-3">
                            SELECTED BOOK
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Stylized Book Cover: The Firm by John Grisham */}
                            <div className="w-11 h-14 rounded-md bg-gradient-to-b from-blue-900 via-neutral-900 to-black border border-blue-600/40 p-1 flex flex-col justify-between shadow-md shrink-0">
                              <span className="text-[6px] font-bold text-blue-200 tracking-tight leading-none">
                                JOHN GRISHAM
                              </span>
                              <div className="text-[8px] font-extrabold text-blue-400 leading-none">
                                THE FIRM
                              </div>
                            </div>

                            <div className="overflow-hidden">
                              <div className="font-bold text-sm text-neutral-100 truncate">
                                The Firm
                              </div>
                              <div className="text-xs text-neutral-400 truncate">
                                John Grisham
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setPhoneScreen('guide')}
                            className="w-full mt-3 py-2 rounded-xl bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>CHANGE BOOK</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bottom Primary Server Button */}
                    <div className="pt-4">
                      {phoneScreen === 'transferring' ? (
                        <button
                          onClick={() => {
                            setPhoneScreen('selected');
                            setTransferProgress(25);
                          }}
                          className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-850 border-2 border-[#bcd453] text-[#bcd453] text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                        >
                          <Square className="w-3 h-3 fill-[#bcd453]" />
                          <span>STOP SERVER</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setPhoneScreen('transferring');
                            setTransferProgress(10);
                          }}
                          className="w-full py-2.5 rounded-full bg-[#bcd453] hover:bg-[#a8bf42] text-neutral-950 text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                        >
                          <Play className="w-3.5 h-3.5 fill-neutral-950" />
                          <span>START SERVER</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
