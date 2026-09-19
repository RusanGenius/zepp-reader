import { AppSpecs, Feature, InstallStep, FAQItem } from '../types';

export const APP_SPECS: AppSpecs = {
  name: 'Zepp Reader',
  tagline: 'Read books effortlessly on your wrist & phone',
  description:
    'The dedicated companion app for reading EPUB and TXT books on Zepp OS smartwatches and Android. Manage your library, sync chapters via Bluetooth, and enjoy distraction-free reading with optimized AMOLED typography.',
  version: '1.0.0',
  releaseDate: 'September 2026',
  fileName: 'zepp_reader.apk',
  fileSize: '15.5 MB',
  fileSizeBytes: 16275320,
  downloadUrl:
    'https://raw.githubusercontent.com/RusanGenius/zepp-reader/main/zepp_reader.apk',
  githubUrl: 'https://github.com/RusanGenius/zepp-reader',
  minAndroid: 'Android 8.0 (Oreo, API 26)',
  targetAndroid: 'Android 14 / 15 (API 34+)',
  packageName: 'com.aistudio.zeppbookserver.vkmq',
  sha256:
    'db20519b123d7d5046eec7c77aeb4c015fcc0faccb9642deb69c85f6f6286383',
  architecture: 'Universal (arm64-v8a, armeabi-v7a, x86_64)',
};

export const FEATURES: Feature[] = [
  {
    id: 'sync',
    title: 'Instant Wearable Sync',
    description:
      'Wirelessly transmit books and selected chapters directly to your Zepp OS smartwatch in seconds over high-speed local transfer.',
    badge: 'Bluetooth & Wi-Fi',
    iconName: 'Zap',
  },
  {
    id: 'amoled',
    title: 'AMOLED-Tuned Typography',
    description:
      'High-contrast true dark mode with carefully balanced margins, font sizing, and line height engineered specifically for circular and rectangular watch dials.',
    badge: 'Eye Comfort',
    iconName: 'BookOpen',
  },
  {
    id: 'bookmarks',
    title: 'Smart Auto-Bookmarks',
    description:
      'Never lose your place. Real-time reading position synchronizes continuously between your Android handset and your smartwatch.',
    badge: 'Seamless',
    iconName: 'BookmarkCheck',
  },
  {
    id: 'efficiency',
    title: 'Ultra-Lightweight & Battery Safe',
    description:
      'Compact 15.5 MB footprint with zero background battery drain. Runs quietly when syncing and sleeps when not in use.',
    badge: '15.5 MB APK',
    iconName: 'BatteryCharging',
  },
];

export const INSTALL_STEPS: InstallStep[] = [
  {
    step: 1,
    title: 'Download zepp_reader.apk',
    shortDesc: 'Tap the Download button or scan the QR code to save the APK file.',
    details:
      'Tap the primary "Download APK" button above or scan the QR code from your smartphone camera. The 15.5 MB installation package will download directly from the official repository.',
    iconName: 'DownloadCloud',
    tip: 'Direct link from RusanGenius GitHub repository.',
  },
  {
    step: 2,
    title: 'Allow Installation from Browser',
    shortDesc: 'Enable "Install unknown apps" in Android settings if prompted.',
    details:
      'Open your Downloads folder or tap the completed download notification. If Android shows "Chrome does not have permission to install unknown apps", tap Settings and switch "Allow from this source" to On.',
    iconName: 'ShieldCheck',
    tip: 'This is standard for all open-source Android APKs outside Google Play.',
  },
  {
    step: 3,
    title: 'Launch & Pair with Smartwatch',
    shortDesc: 'Tap Install, launch Zepp Reader, and start sending your books.',
    details:
      'Press Install on the confirmation prompt. Open Zepp Reader, grant storage permission to load your EPUB/TXT files, and connect to your Zepp OS smartwatch.',
    iconName: 'Watch',
    tip: 'Make sure your Zepp app or watch companion app is also active.',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'Why does Android warn "File might be harmful"?',
    answer:
      'Android displays this generic security prompt for any APK file downloaded through a web browser instead of the Google Play Store. Zepp Reader is safe, open-source software with no trackers. You can verify the file integrity against the SHA-256 checksum published below.',
  },
  {
    question: 'Which smartwatches are compatible with Zepp Reader?',
    answer:
      'Zepp Reader supports devices running Zepp OS, including Amazfit Balance, Amazfit GTR 4, GTS 4, Cheetah, Active, Falcon, T-Rex 2 / Ultra, Band 7, and newer Amazfit smartwatches.',
  },
  {
    question: 'What book formats can I read?',
    answer:
      'Zepp Reader is built for TXT and EPUB files. It cleans and splits long documents into bite-sized chapters formatted for quick reading on your watch screen.',
  },
  {
    question: 'Is Zepp Reader free to use?',
    answer:
      'Yes, 100% free and open-source. There are no subscriptions, paywalls, or third-party advertising trackers.',
  },
];

export const SUPPORTED_DEVICES = [
  'Amazfit Balance',
  'Amazfit GTR 4 / 3 Pro',
  'Amazfit GTS 4 / 3',
  'Amazfit Cheetah Pro / Round / Square',
  'Amazfit Active & Active Edge',
  'Amazfit T-Rex 2 / T-Rex Ultra',
  'Amazfit Falcon',
  'Amazfit Band 7',
  'Any Zepp OS 1.0, 2.0 & 3.0+ wearable',
];
