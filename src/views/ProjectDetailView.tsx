import React, { useState } from 'react';
import { 
  MapPin, 
  Download, 
  Phone, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  Compass, 
  Trees, 
  Building, 
  Building2, 
  FileCheck, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { PageView, ProjectData } from '../types';
import { PROJECTS } from '../data/mockData';

interface ProjectDetailViewProps {
  projectId: string;
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
  onDownloadBrochure: (projectName: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  projectId,
  onNavigate,
  onRequestCall,
  onDownloadBrochure
}) => {
  const project = PROJECTS.find((p) => p.id === projectId) || PROJECTS[0];

  // Sidebar Form State
  const [katha, setKatha] = useState('5 Katha');
  const [facing, setFacing] = useState('South Facing');
  const [plotsCount, setPlotsCount] = useState('1');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [captchaOk, setCaptchaOk] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRequirementsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !captchaOk) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-6 pb-16 space-y-12">
      
      {/* 1. HERO WITH SPECIFICATION CARD (MATCHING VIDEO EXACTLY) */}
      <section className="relative min-h-[80vh] flex items-center pt-16 pb-12 overflow-hidden bg-neutral-900 text-white">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
                {project.name}
              </h1>

              {/* <p className="text-lg sm:text-xl text-emerald-300 font-light font-heading">
                {project.tagline}
              </p> */}
            </div>

            {/* Right Specification Box (Exact Layout from Video) */}
            <div className="lg:col-span-6">
              <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/40 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100">
                
                {/* Logo Header */}
                <div className="flex items-center gap-4 pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                  {project.projectLogoUrl ? (
                    <img
                      src={project.projectLogoUrl}
                      alt={`${project.name} Logo`}
                      className="h-14 sm:h-18 w-auto object-contain shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-[#006838] text-white font-extrabold flex items-center justify-center text-xl shadow-md shrink-0">
                      A
                    </div>
                  )}
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold font-heading text-[#006838] dark:text-emerald-400 leading-tight">
                      {project.logoBadgeText || project.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                      Official Specification Matrix
                    </p>
                  </div>
                </div>

                {/* Specs List */}
                <div className="space-y-2 text-xs sm:text-[13px]">
                  
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Project Location:</strong>{' '}
                      <span className="text-neutral-600 dark:text-neutral-300">{project.location}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Total Land Area:</strong>{' '}
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{project.totalLandArea}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Total Plots:</strong>{' '}
                      <span className="font-mono text-neutral-700 dark:text-neutral-300">{project.totalPlots}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Purchase Status:</strong>{' '}
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{project.purchaseStatus}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Plot area / Facilities:</strong>{' '}
                      <span className="text-neutral-600 dark:text-neutral-300">{project.plotAreaPercent} (Plots) / {project.facilitiesPercent} (Civic Facilities)</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Standard Plot Size:</strong>{' '}
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">{project.standardPlotSizes}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Road Width:</strong>{' '}
                      <span className="text-neutral-600 dark:text-neutral-300">{project.roadWidth}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Earth Filling:</strong>{' '}
                      <span className="text-neutral-600 dark:text-neutral-300">{project.earthFilling}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Hand Over Schedule:</strong>{' '}
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{project.handoverSchedule}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">VAT:</strong>{' '}
                      <span className="text-neutral-600 dark:text-neutral-300">{project.vat}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Approval Status:</strong>{' '}
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{project.approvalStatus}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-neutral-900 dark:text-white font-semibold">Development Status:</strong>{' '}
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">{project.developmentStatus}</span>
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN SPLIT: DETAILED OVERVIEW & SIDEBAR LEAD GENERATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 8 COLUMNS: ALL CONTENT SECTIONS */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview & Description */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold font-heading text-neutral-900 dark:text-white">
                Project Overview
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Location */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
                  Project Location & Strategic Connectivity
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {project.locationHighlights.map((highlight, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plot Sizes & Road Network */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white mb-3">
                  Plot Sizes & Master Dimensions
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  The project offers a variety of plot sizes to suit different residential, villa, and commercial investment requirements:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {['3 Katha', '5 Katha', '6 Katha','10 Katha', '12 Katha', '20 Katha'].map((size) => (
                    <div
                      key={size}
                      className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white mb-3">
                  Internal Road Network
                </h3>
                <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {project.roadNetwork.map((road, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>{road}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Invest in [Project Name] (From Video) */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
              <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
                Why Invest In {project.name}?
              </h3>
              <div className="space-y-3 pt-2">
                {project.investmentReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Civic Amenities (24+ items as in video) */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
                  Project Features And Civic Amenities
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Over 40% of master-plan land dedicated exclusively to state-of-the-art social infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {project.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2 text-xs font-medium text-neutral-800 dark:text-neutral-200"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map Preview Section (as in video) */}
            <div id="map-section" className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white">
                    Project Location In Map
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Strategic satellite coordinates in Greater Dhaka region
                  </p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(project.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Styled interactive map frame */}
              <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 relative h-72 bg-neutral-100 dark:bg-neutral-800">
                <iframe
                  title="Project Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.00977793466!2d90.4125181!3d23.810332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70bf09cf8b9%3A0xb3049a4f4ef1e9!2sPurbachal%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: ACTION BUTTONS & "SEND US YOUR REQUIREMENTS" FORM */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Quick Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => onDownloadBrochure(project.name)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
              >
                <Download className="w-4 h-4" />
                <span>Project Brochure</span>
              </button>

              <a
                href="#map-section"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>Project Location</span>
              </a>

              <a
                href="https://wa.me/8801896006310"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directly With Us</span>
              </a>
            </div>

            {/* "Send us your Requirements" Form Card (Exact copy from video) */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
                <h3 className="text-base font-bold font-heading text-neutral-900 dark:text-white">
                  Send us your Requirements
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                  Share your plot size, facing, and details — we'll match you with the best available options.
                </p>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-sm">Requirements Logged</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    Thank you, <span className="font-semibold">{fullName}</span>. An executive plot specialist will reach out with allotment sheets for {katha} ({facing}).
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold underline mt-2 block mx-auto"
                  >
                    Submit another requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequirementsSubmit} className="space-y-3">
                  
                  {/* Select Katha & Select Facing */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Select Kattha
                      </label>
                      <select
                        value={katha}
                        onChange={(e) => setKatha(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="3 Katha">3 Katha</option>
                        <option value="5 Katha">5 Katha</option>
                        <option value="8 Katha">6 Katha</option>
                        <option value="10 Katha">10 Katha</option>
                        <option value="20 Katha">20 Katha</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Select Facing
                      </label>
                      <select
                        value={facing}
                        onChange={(e) => setFacing(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="South Facing">South Facing</option>
                        <option value="North Facing">North Facing</option>
                        <option value="East Facing">East Facing</option>
                        <option value="West Facing">West Facing</option>
                        <option value="Corner Plot">Corner Plot</option>
                      </select>
                    </div>
                  </div>

                  {/* How many plots */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      How many plots
                    </label>
                    <select
                      value={plotsCount}
                      onChange={(e) => setPlotsCount(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="1">1 Plot</option>
                      <option value="2">2 Plots (Adjacent)</option>
                      <option value="3">3 Plots</option>
                      <option value="4+">4+ Plots (Block)</option>
                    </select>
                  </div>

                  {/* Personal details */}
                  <div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name *"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Mobile Number *"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="Email"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Job Title / Profession"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={requirementsText}
                      onChange={(e) => setRequirementsText(e.target.value)}
                      placeholder="Tell us your requirements..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  {/* Captcha checkbox simulator */}
                  <div
                    onClick={() => setCaptchaOk(!captchaOk)}
                    className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          captchaOk
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-neutral-400 bg-white dark:bg-neutral-700'
                        }`}
                      >
                        {captchaOk && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs text-neutral-700 dark:text-neutral-300">
                        I'm not a robot
                      </span>
                    </div>
                    <div className="text-[9px] text-neutral-400 leading-tight text-right">
                      reCAPTCHA
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!captchaOk}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                      captchaOk
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:scale-[1.01]'
                        : 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
