"use client";

import { useState } from "react";

type VideoEmbedProps = {
  youtubeId: string;
  title: string;
  channel: string;
  date: string;
};

export function VideoEmbed({ youtubeId, title, channel, date }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      {loaded ? (
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group relative block w-full"
          aria-label={`Play: ${title}`}
        >
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] shadow-lg transition-transform group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-6 w-6 text-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      )}
      {/* Caption */}
      <div className="px-4 py-3">
        <p className="text-[14px] font-medium text-gray-800">{title}</p>
        <div className="mt-1 flex items-center gap-2 font-mono text-[12px] text-gray-500">
          <span>{channel}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
