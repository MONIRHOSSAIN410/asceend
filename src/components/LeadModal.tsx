import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Download, Send, Building } from 'lucide-react';
import { PROJECTS } from '../data/mockData';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'callback' | 'brochure';
  defaultProject?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  type,
  defaultProject
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState(defaultProject || PROJECTS[0].name);
  const [message, setMessage] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;
    setSubmitted(true);
    setTimeout(() => {
      // simulate response
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setMobile('');
    setEmail('');
    setMessage('');
    setCaptchaVerified(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-emerald-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/images/aasceend_logo_white.png" 
              alt="Aasceend" 
              className="h-7 w-auto object-contain"
            />
            <div className="h-5 w-px bg-emerald-600 hidden sm:block" />
            <h3 className="font-heading font-bold text-sm sm:text-base">
              {type === 'callback' ? 'Request Immediate Call Back' : 'Download Project Brochure'}
            </h3>
          </div>
          <button 
            onClick={handleReset}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
                Thank You, {name}!
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                {type === 'callback'
                  ? 'Our senior client relations advisor will contact you within 15 minutes on ' + mobile + '.'
                  : 'Your request for ' + project + ' brochure has been registered. The PDF link has been simulated for your device.'}
              </p>
              
              {type === 'brochure' && (
                <div className="pt-2">
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Simulated: Downloading Official ' + project + ' Presentation (PDF, 8.4 MB)');
                    }}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Brochure (8.4 MB)</span>
                  </a>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Please provide your contact details to connect directly with Aasceend Group’s dedicated investment desk.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Khondokar Rahman"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+88 017..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Project of Interest
                </label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {PROJECTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.totalLandArea})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Specific Requirements or Preferred Katha Size
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Inquiring about 5 Katha south-facing plot or share ownership..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Captcha checkbox simulator */}
              <div 
                onClick={() => setCaptchaVerified(!captchaVerified)}
                className="p-3 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                    captchaVerified 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-neutral-400 bg-white dark:bg-neutral-700'
                  }`}>
                    {captchaVerified && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                    I am not a robot (Security Verification)
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 text-right">
                  reCAPTCHA<br />Privacy - Terms
                </div>
              </div>

              <button
                type="submit"
                disabled={!captchaVerified}
                className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                  captchaVerified
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:scale-[1.01]'
                    : 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{type === 'callback' ? 'Submit Callback Request' : 'Access Brochure Download'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
