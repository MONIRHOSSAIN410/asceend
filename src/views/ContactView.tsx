import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { PageView } from '../types';

interface ContactViewProps {
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onRequestCall }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message || !captcha) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 space-y-16">
      
      {/* 1. Header Hero Banner */}
      <section className="relative py-20 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Contact"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Corporate Communications
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base text-emerald-300 font-light max-w-2xl mx-auto leading-relaxed">
            Connecting our diverse expertise with your unique needs. Reach out to any of our concerns and let's start a conversation.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form (Exact fields from video) */}
          <div className="lg:col-span-6 bg-white dark:bg-neutral-900 rounded-3xl p-5 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Our team responds within one business day.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg text-neutral-900 dark:text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold">{fullName}</span>. We have forwarded your note to the relevant corporate division at Aasceend Group.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="text-xs font-semibold text-emerald-600 underline mt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                {/* Captcha checkbox */}
                <div
                  onClick={() => setCaptcha(!captcha)}
                  className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        captcha
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-neutral-400 bg-white dark:bg-neutral-700'
                      }`}
                    >
                      {captcha && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                      I'm not a robot
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-400 text-right leading-tight">
                    reCAPTCHA<br />Privacy - Terms
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!captcha}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                    captcha
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:scale-[1.01]'
                      : 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  Submit
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Communication & Offices (Exact text from video) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Direct Communication */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
                Direct Communication
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <a 
                  href="tel:+88028417084" 
                  className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-mono font-bold">+88 02 8417084</span>
                </a>

                <a 
                  href="tel:+8801896006310" 
                  className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">+88 01896 006310</span>
                </a>

                <a 
                  href="mailto:info@aasceend.com" 
                  className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>info@aasceend.com</span>
                </a>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                    Corporate, Marketing & Sales Office
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    House No - 531, Level - 03, Road No - 11, Baridhara DOHS, Dhaka - 1206, Bangladesh.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Development & Legal Offices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                  Business Development, Marketing & Sales Office
                </h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  House No - 531, Level - 03, Road No - 11, Baridhara DOHS, Dhaka - 1206, Bangladesh.
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                  Estate, Legal, Marketing & Sales Office
                </h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  House No - 531, Level - 03, Road No - 11, Baridhara DOHS, Dhaka - 1206, Bangladesh.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Interactive Map (Baridhara DOHS, Dhaka) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white">
                Corporate Headquarters Location
              </h3>
              <p className="text-xs text-neutral-500">
                Baridhara DOHS, Dhaka - 1206
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Baridhara+DOHS+Dhaka"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              <span>Open in Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden h-80 border border-neutral-200 dark:border-neutral-700">
            <iframe
              title="Baridhara DOHS Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14603.662704285818!2d90.4137255!3d23.8216393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c659d81d22e7%3A0x6b44a30fcf216503!2sBaridhara%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
};
