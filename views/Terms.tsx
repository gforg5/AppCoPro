import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-black mb-8 text-white">Terms of Service</h1>
      <div className="space-y-8 text-slate-400 leading-relaxed text-sm">
        <section>
          <h2 className="text-white text-lg font-bold mb-4">1. Acceptance of Terms</h2>
          <p>
            By using AppCoPro, you agree to abide by these terms. Our service is provided "as is," and we are not liable for any issues arising from the content of the websites you convert.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-bold mb-4">2. Usage Rights</h2>
          <p>
            Users are solely responsible for ensuring they have the legal right to convert the target URL into an application. Conversion of third-party websites without authorization is strictly prohibited.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-bold mb-4">3. No Guarantee</h2>
          <p>
            While AppCoPro facilitates the creation of native-ready packages, we do not guarantee acceptance into the Apple App Store or Google Play Store, as these are subject to external review processes.
          </p>
        </section>
        <section>
          <h2 className="text-white text-lg font-bold mb-4">4. Termination</h2>
          <p>
            We reserve the right to terminate access to the compiler for users who violate intellectual property rights or engage in malicious use of our bridge technology.
          </p>
        </section>
      </div>
    </div>
  );
};