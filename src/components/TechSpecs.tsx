import { useState } from 'react';
import { Copy, Check, Shield } from 'lucide-react';
import { APP_SPECS } from '../data/appData';

export function TechSpecs() {
  const [copiedSha, setCopiedSha] = useState(false);
  const [copiedPkg, setCopiedPkg] = useState(false);

  const copyToClipboard = async (text: string, type: 'sha' | 'pkg') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'sha') {
        setCopiedSha(true);
        setTimeout(() => setCopiedSha(false), 2000);
      } else {
        setCopiedPkg(true);
        setTimeout(() => setCopiedPkg(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  const specsList = [
    {
      label: 'Package Name',
      value: APP_SPECS.packageName,
      isMono: true,
      canCopy: true,
      copyType: 'pkg' as const,
    },
    {
      label: 'Version',
      value: `v${APP_SPECS.version} (Stable)`,
      isMono: true,
    },
    {
      label: 'File Size',
      value: `${APP_SPECS.fileSize} (${APP_SPECS.fileSizeBytes.toLocaleString()} bytes)`,
      isMono: true,
    },
    {
      label: 'Target Devices',
      value: 'Zepp OS Smartwatches (390×450)',
      isMono: false,
    },
    {
      label: 'Minimum Android',
      value: APP_SPECS.minAndroid,
      isMono: false,
    },
    {
      label: 'Supported ABIs',
      value: APP_SPECS.architecture,
      isMono: true,
    },
    {
      label: 'License',
      value: 'Free & Open-Source (GitHub)',
      isMono: false,
    },
  ];

  return (
    <section
      id="specs"
      className="py-14 md:py-20 relative border-t border-neutral-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-9">
          <span className="text-xs font-mono uppercase tracking-widest text-[#bcd453] font-semibold">
            Transparency & Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-100 mt-2">
            Technical Specifications
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Full file metrics and SHA-256 integrity hash.
          </p>
        </div>

        {/* Specs Table */}
        <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 overflow-hidden shadow-sm">
          <div className="divide-y divide-neutral-800/80">
            {specsList.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <span className="text-xs sm:text-sm font-medium text-neutral-400">
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs sm:text-sm text-neutral-200 ${
                      item.isMono ? 'font-mono' : 'font-medium'
                    }`}
                  >
                    {item.value}
                  </span>
                  {item.canCopy && (
                    <button
                      onClick={() =>
                        copyToClipboard(item.value, item.copyType || 'pkg')
                      }
                      title="Copy package name"
                      className="p-1 rounded text-neutral-500 hover:text-neutral-200 transition-colors"
                    >
                      {copiedPkg ? (
                        <Check className="w-3.5 h-3.5 text-[#bcd453]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* SHA-256 Verification Block */}
          <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#bcd453]" />
                <span className="text-xs font-semibold text-neutral-200">
                  SHA-256 Checksum
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(APP_SPECS.sha256, 'sha')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition-colors"
              >
                {copiedSha ? (
                  <>
                    <Check className="w-3 h-3 text-[#bcd453]" />
                    <span className="text-[#bcd453]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-[11px] sm:text-xs text-neutral-400 break-all select-all bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
              {APP_SPECS.sha256}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
