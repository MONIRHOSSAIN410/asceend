import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Scale, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { PageView } from '../types';

interface InvestorViewProps {
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const InvestorView: React.FC<InvestorViewProps> = ({ onNavigate, onRequestCall }) => {
  return (
    <div className="pt-10 pb-16 space-y-16">
      
      {/* 1. Header Hero Banner */}
      <section className="relative py-20 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
            alt="Investment Relations"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
       
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Investment Relations
          </h1>
          <p className="text-lg text-emerald-300 font-light">
            Building Value Through Trust and Transparency
          </p>
        </div>
      </section>

      {/* 2. Overview Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-sm text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
          <p>
            At <strong className="text-neutral-900 dark:text-white">Aasceend Group</strong>, we understand that real estate investment is more than a transaction—it is a partnership for the future. We are committed to redefining the industry standard in Bangladesh by prioritizing legal integrity, timely handovers, and sustainable growth for our stakeholders.
          </p>
        </div>
      </section>

      {/* 3. Why Invest with Aasceend? (4 Pillars from video) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600 dark:text-white">
            Why Invest with Aasceend?
          </h2>
          <div className="w-16 h-1 bg-emerald-600 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
                100% Legal Certainty
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We ensure every project undergoes rigorous title verification and obtains all necessary approvals (RAJUK/CDA, Fire Safety, and Environmental) before a single brick is laid.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
                On-Time Delivery Record
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Our operational model is built on strict project timelines. We value your capital’s "time value" as much as you do, guaranteeing timely handovers with legal conveyance.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
                Strategic Land Bank
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We invest in high-growth corridors such as Purbachal, Bashundhara, and Baridhara where property appreciation consistently outperforms national benchmark averages.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white mb-2">
                Governance & Ethics
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Aasceend operates with a dedicated board of industry veterans and legal counsel, ensuring every investment is managed with fiscal discipline and audited records.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Our Vision for the Future */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-100 dark:bg-neutral-800/60 rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-700 text-center space-y-3">
          <h3 className="text-2xl font-bold font-heading text-emerald-600 dark:text-white">
            Our Vision for the Future
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            At Aasceend Group, our investment strategy is rooted in the belief that real estate should be a secure and appreciating asset for every stakeholder. We are not just building structures; we are developing sustainable communities that contribute to the economic fabric of Bangladesh.
          </p>
        </div>
      </section>

      {/* 5. Contact Investor Relations Team Card */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-heading text-white">
              Contact Our Investor Relations Team
            </h3>
            <p className="text-xs text-emerald-200 mt-1">
              For partnership inquiries, joint venture opportunities, or to schedule a visit to our corporate office:
            </p>
          </div>

          <div className="space-y-3 text-sm text-emerald-100 border-t border-emerald-800 pt-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>
                <strong>Corporate Office:</strong> House 531 (Level 03), Road 11, Baridhara DOHS, Dhaka - 1206, Bangladesh.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Direct Inquiries:</strong> <span className="font-mono text-white">+88 01896 006310</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Email:</strong> <span className="text-white">info@aasceend.com</span>
              </span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onRequestCall}
              className="bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-lg"
            >
              Request Institutional Investor Deck
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
