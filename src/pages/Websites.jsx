import React from 'react';
import WebsitesHero from './WebsitesHero';

export default function Websites() {
  return (
    <div className="dark websites-page font-polysans bg-[#141414] text-zinc-100 min-h-screen">
      <WebsitesHero />
      {/* Future Website Content Placeholder */}
      <div className="max-w-7xl mx-auto px-4 py-32 text-center text-zinc-500 font-medium">
        Future website content will appear here.
      </div>
    </div>
  );
}
