import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-black mb-8 text-white">Privacy Policy</h1>
      <div className="space-y-8 text-slate-400 leading-relaxed text-sm">
        <section>
          <h2 className="text-white text-lg font-bold mb-4">1. Data Collection</h2>
          <p>
            AppCoPro collects minimal data required to facilitate the "Web-to-App" conversion. This includes your target URL, app name, and asset files (icons). We do not store the content of your website or track user interactions within your compiled applications.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-bold mb-4">2. Native Bridge Privacy</h2>
          <p>
            Our native bridge technology respects the user's OS-level permissions. Camera, microphone, and location access are only active when explicitly requested by your target URL and approved by the end-user.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-bold mb-4">3. Security</h2>
          <p>
            We implement industry-standard SSL encryption for all data transmissions. Generated binaries are signed with unique certificates to ensure integrity and prevent unauthorized modifications.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-bold mb-4">4. Cookies</h2>
          <p>
            The AppCoPro platform uses cookies to maintain session states and project configurations within the compiler environment.
          </p>
        </section>
        <p className="pt-8 border-t border-slate-800 italic">
          Last updated: October 2023. For further inquiries, contact privacy@appcopro.io.
        </p>
      </div>
    </div>
  );
};