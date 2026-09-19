import { useState } from 'react';
import { HeroDownload } from './components/HeroDownload';
import { AppPreview } from './components/AppPreview';
import { InstallGuide } from './components/InstallGuide';
import { TechSpecs } from './components/TechSpecs';
import { Footer } from './components/Footer';
import { APP_SPECS } from './data/appData';

export default function App() {
  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = APP_SPECS.downloadUrl;
    link.download = APP_SPECS.fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-neutral-100 selection:bg-[#bcd453]/30 selection:text-[#bcd453]">
      {/* Main Content */}
      <main className="flex-1">
        {/* Minimalist Hero with App Icon & APK Download Button */}
        <HeroDownload onDownloadTriggered={triggerDownload} />

        {/* Realistic Rectangular Watch (390x450) & Phone Screenshots Preview */}
        <AppPreview />

        {/* 3-Step Installation Guide with APK Warning FAQ */}
        <InstallGuide onDownloadClick={triggerDownload} />

        {/* Transparent Technical Specs & SHA-256 Checksum */}
        <TechSpecs />
      </main>

      {/* Minimal Footer */}
      <Footer onDownloadClick={triggerDownload} />
    </div>
  );
}
