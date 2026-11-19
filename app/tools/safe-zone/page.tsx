'use client';

import { useState } from 'react';
import { Upload, Eye } from 'lucide-react';

export default function SafeZonePage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsVideo(file.type.startsWith('video/'));
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">Instagram Reels & Ads Safe-Zone Checker</h1>
        <p className="text-sm text-slate-400">
          Upload a 9:16 vertical creative locally in your browser to verify your hooks and captions won’t be covered by Instagram UI buttons.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-rose-500 rounded-xl p-8 cursor-pointer transition">
            <Upload className="w-8 h-8 text-rose-400 mb-2" />
            <span className="text-sm font-bold text-white">Select 9:16 Image or MP4</span>
            <span className="text-xs text-slate-400 mt-1">100% private — processed locally in your browser</span>
            <input type="file" accept="image/*,video/*" onChange={handleFile} className="hidden" />
          </label>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-rose-400" /> Safe-Zone Guidelines (1080 × 1920):
            </p>
            <p>• Keep text at least <strong className="text-slate-200">250px from top</strong> (status bar & camera icon).</p>
            <p>• Keep CTAs at least <strong className="text-slate-200">420px from bottom</strong> (caption & audio ticker).</p>
            <p>• Keep right <strong className="text-slate-200">120px clear</strong> (Like, Comment, Share stack).</p>
          </div>
        </div>

        {/* 9:16 Phone Mockup with Red Danger Zones */}
        <div className="mx-auto w-[270px] h-[480px] bg-slate-900 border-4 border-slate-800 rounded-[2rem] relative overflow-hidden shadow-2xl">
          {previewUrl ? (
            isVideo ? (
              <video src={previewUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={previewUrl} alt="Reel Preview" className="w-full h-full object-cover" />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 p-6 text-center">
              Upload a creative to preview Instagram’s live UI dead zones
            </div>
          )}

          {/* Top Danger Zone */}
          <div className="absolute top-0 inset-x-0 h-14 bg-rose-600/30 border-b border-rose-500/70 flex items-center justify-between px-4 text-[10px] font-bold text-white pointer-events-none">
            <span>Reels</span>
            <span>TOP DEAD ZONE</span>
          </div>

          {/* Right Icon Stack Danger Zone */}
          <div className="absolute right-2 bottom-24 w-10 h-44 bg-rose-600/30 border border-rose-500/70 rounded-lg flex flex-col items-center justify-around py-2 text-[9px] font-bold text-white pointer-events-none">
            <span>❤️</span>
            <span>💬</span>
            <span>✈️</span>
            <span>•••</span>
          </div>

          {/* Bottom Caption Danger Zone */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-rose-600/30 border-t border-rose-500/70 p-3 flex flex-col justify-end text-[10px] font-bold text-white pointer-events-none">
            <span>@yourbrand • Follow</span>
            <span className="text-[9px] font-normal text-rose-100">Caption & Audio Ticker Dead Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
