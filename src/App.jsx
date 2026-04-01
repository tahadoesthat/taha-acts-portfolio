import React, { useState, useEffect } from 'react';
import { 
  Server, Code, Cpu, Database, Cloud, Zap, Plane, CheckCircle2, 
  ArrowRight, MapPin, Phone, Mail, Globe, Cpu as BrainCircuit,
  Layout, Activity, Sun, ChevronLeft
} from 'lucide-react';

// --- GLOBAL STYLES & FONTS ---
const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap');
      
      .font-heading { font-family: 'Montserrat', sans-serif; }
      .font-body { font-family: 'Nunito', sans-serif; }
      
      html { scroll-behavior: smooth; }
      
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll {
        animation: scroll 30s linear infinite;
      }
      .animate-scroll:hover {
        animation-play-state: paused;
      }
      
      /* Custom scrollbar for dark theme */
      ::-webkit-scrollbar { width: 10px; }
      ::-webkit-scrollbar-track { background: #020617; }
      ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 5px; }
      ::-webkit-scrollbar-thumb:hover { background: #334155; }
    `}
  </style>
);

// --- UI COMPONENTS (DARK GLASSMORPHISM) ---
const GlassCard = ({ children, className = "", onClick, interactive = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-3xl border border-white/10 
        bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        ${interactive ? 'cursor-pointer hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500 group' : ''}
        ${className}
      `}
    >
      {interactive && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/10 via-transparent to-green-400/5 transition-opacity duration-700 pointer-events-none" />
      )}
      {children}
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = "", icon = null }) => {
  const baseStyle = "px-8 py-4 rounded-full font-semibold font-heading transition-all duration-300 flex items-center justify-center gap-3 text-sm tracking-wide";
  const variants = {
    primary: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)]",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md",
    energy: "bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    rihla: "bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
      {icon && icon}
    </button>
  );
};

const VendorBadge = ({ name, icon: Icon }) => (
  <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors cursor-default whitespace-nowrap">
    {Icon && <Icon size={20} className="text-slate-400" />}
    <span className="font-semibold font-heading tracking-wide text-slate-200">{name}</span>
  </div>
);

// --- SECTIONS WITH SHARPER VIDEO BACKGROUNDS ---

const HeroSection = ({ navigateTo }) => (
  <div className="relative min-h-screen flex items-center pt-20 border-b border-white/10 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline poster="hero-bg.jpg" className="w-full h-full object-cover opacity-90">
        {/* Bulletproof sources: tries webm, then mp4, then online fallback */}
        <source src="hero-bg.webm" type="video/webm" />
        <source src="hero-bg.mp4" type="video/mp4" />
        <source src="https://cdn.coverr.co/videos/coverr-server-room-4113/1080p.mp4" type="video/mp4" /> 
      </video>
      {/* Reduced blur to 1px and slightly reduced opacity so video is much clearer */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
      <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex items-center gap-4 mb-8">
          <img src="Taha Acts Logo.png" alt="Taha Acts" className="h-12 w-auto" onError={(e) => { e.target.style.display='none'; }} />
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight mb-8 font-heading leading-[1.1]">
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Digital & Physical</span> Infrastructure.
        </h1>
        
        <p className="text-xl text-slate-200 mb-12 max-w-2xl font-body leading-relaxed font-light drop-shadow-lg">
          Based in Lahore, Taha Acts is a premier technology holding company. We engineer highly scalable cloud environments, custom AI pipelines, and industrial-grade solar networks.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <Button onClick={() => navigateTo('form-b2b')}>Schedule Tech Consultation</Button>
          <Button variant="secondary" onClick={() => document.getElementById('tech-stack').scrollIntoView({ behavior: 'smooth' })}>
            Explore Our Portfolio
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const TechStackSection = ({ navigateTo }) => (
  <div id="tech-stack" className="relative py-32 border-b border-white/10 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline poster="tech-bg.jpg" className="w-full h-full object-cover">
        <source src="tech-bg.webm" type="video/webm" />
        <source src="tech-bg.mp4" type="video/mp4" />
      </video>
      {/* Reduced blur from 6px to 2px, reduced darkness from 90 to 80 */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="mb-16">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-cyan-500 uppercase mb-3 font-heading">Taha Acts Core</h2>
        <h3 className="text-3xl md:text-4xl font-semibold text-white font-heading">Enterprise Tech & AI Solutions</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        <GlassCard className="p-8 border-t-2 border-t-cyan-500/50">
          <Code className="text-cyan-400 mb-6" size={32}/>
          <h4 className="text-xl font-semibold text-white mb-3 font-heading">Web App Development</h4>
          <p className="text-slate-400 font-body font-light">High-performance corporate websites and complex, scalable portals tailored to your enterprise workflows.</p>
        </GlassCard>
        <GlassCard className="p-8 border-t-2 border-t-cyan-500/50">
          <Cloud className="text-cyan-400 mb-6" size={32}/>
          <h4 className="text-xl font-semibold text-white mb-3 font-heading">AWS & Azure Management</h4>
          <p className="text-slate-400 font-body font-light">Zero-downtime architecture, security hardening, load balancing, and custom Linux server setups.</p>
        </GlassCard>
        <GlassCard className="p-8 border-t-2 border-t-cyan-500/50">
          <BrainCircuit className="text-cyan-400 mb-6" size={32}/>
          <h4 className="text-xl font-semibold text-white mb-3 font-heading">Fine-Tuned LLMs & AI</h4>
          <p className="text-slate-400 font-body font-light">Proprietary AI pipelines and Private Language Models trained strictly on your secure enterprise data.</p>
        </GlassCard>
      </div>

      <div className="mb-10">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em] font-heading mb-6 border-l-2 border-cyan-500 pl-4">Powered by Industry Leading Tech</h4>
      </div>
      
      <div className="overflow-hidden relative -mx-4 sm:mx-0">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
        
        <div className="flex w-[200%] animate-scroll gap-6 pb-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 shrink-0">
              <VendorBadge name="Python" />
              <VendorBadge name="React.js" />
              <VendorBadge name="Angular" />
              <VendorBadge name="Rust" />
              <VendorBadge name="Ubuntu" />
              <VendorBadge name="Linux Foundation" />
              <VendorBadge name="Google Cloud" />
              <VendorBadge name="Amazon Web Services" />
              <VendorBadge name="Microsoft Azure" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const EnergySection = ({ navigateTo }) => (
  <div id="ta-energy" className="relative py-32 border-b border-white/10 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline poster="energy-bg.jpg" className="w-full h-full object-cover">
        <source src="energy-bg.webm" type="video/webm" />
        <source src="energy-bg.mp4" type="video/mp4" />
      </video>
      {/* Reduced blur from 6px to 2px, reduced darkness to 75 */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="w-full lg:w-1/2">
          <img src="TA Energy Logo.png" alt="TA Energy" className="h-14 object-contain mb-8" onError={(e) => { e.target.style.display='none'; }} />
          <h2 className="text-sm font-semibold tracking-[0.2em] text-emerald-400 uppercase mb-3 font-heading">Physical Infrastructure</h2>
          <h3 className="text-3xl md:text-5xl font-semibold text-white font-heading mb-6 leading-tight">Industrial-Grade <br/>Solar Solutions.</h3>
          <p className="text-slate-300 font-body font-light text-lg mb-8 leading-relaxed">
            We provide complete solar solutions, from high-efficiency 2-panel residential setups to massive industrial grids. By utilizing premium Tier-1 panels, advanced inverters, and expert engineering, we ensure maximum ROI and energy independence.
          </p>
          <Button variant="energy" onClick={() => navigateTo('form-energy')} icon={<Zap size={18}/>}>Calculate Solar ROI</Button>
        </div>

        <div className="w-full lg:w-1/2">
          <GlassCard className="p-8 md:p-10 border-t-2 border-t-emerald-500/50">
            <h4 className="text-lg font-semibold text-white mb-6 font-heading border-b border-white/10 pb-4">Certified Tier-1 Equipment Partners</h4>
            <div className="grid grid-cols-2 gap-4">
              <VendorBadge name="Canadian Solar" />
              <VendorBadge name="Sunova Solar" />
              <VendorBadge name="Nuuko Solar" />
              <VendorBadge name="JA Solar" />
              <VendorBadge name="LONGi" />
              <VendorBadge name="Huawei" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
);

const RihlaSection = ({ navigateTo }) => (
  <div id="rihla-ai" className="relative py-32 border-b border-white/10 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline poster="rihla-bg.jpg" className="w-full h-full object-cover">
        <source src="rihla-bg.webm" type="video/webm" />
        <source src="rihla-bg.mp4" type="video/mp4" />
      </video>
      {/* Reduced blur from 6px to 2px, reduced darkness to 75 */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <img src="Rihla AI Logo.png" alt="Rihla AI" className="h-20 object-contain mb-8 mx-auto" onError={(e) => { e.target.style.display='none'; }} />
      <h2 className="text-sm font-semibold tracking-[0.2em] text-blue-400 uppercase mb-3 font-heading">SaaS & Automation</h2>
      <h3 className="text-3xl md:text-5xl font-semibold text-white font-heading mb-6 leading-tight">The Future of <br/>Travel Automation.</h3>
      <p className="text-slate-300 font-body font-light text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
        Rihla is a fully humanized AI Travel Expert. We provide comprehensive B2B software solutions for travel agencies, enabling them to automate thousands of flight searches, hotel bookings, transport arrangements, and customer voice chats simultaneously.
      </p>
      <div className="flex justify-center">
        <Button variant="rihla" onClick={() => navigateTo('form-rihla')} icon={<Plane size={18}/>}>Book a Software Demo</Button>
      </div>
    </div>
  </div>
);

// --- SEPARATE LEAD GEN PAGES ---

const FormB2B = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [objective, setObjective] = useState('');
  const [scope, setScope] = useState('');

  const handleSubmit = () => { setLoading(true); setTimeout(() => setStep(4), 1500); };

  const inputClass = "w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white shadow-sm outline-none focus:border-cyan-500 transition-colors duration-300";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 relative z-10 font-body bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(8,145,178,0.15),rgba(2,6,23,1))] pointer-events-none"></div>
      <div className="w-full max-w-2xl relative z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-8 transition-colors font-heading font-semibold">
          <ChevronLeft size={20} /> Back to Portfolio
        </button>
        <GlassCard className="p-8 md:p-12 border-t-2 border-t-cyan-500">
          {step < 4 && (
            <div className="mb-8 flex justify-between items-center border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold text-white font-heading">Start Your Project</h2>
              <span className="text-cyan-400 font-semibold text-sm bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/20">Step {step}/3</span>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg text-slate-300 mb-4 font-semibold">What are you looking to architect?</h3>
              {['Custom AI & LLMs', 'Cloud Infrastructure', 'Custom Linux Servers', 'Enterprise Web App', 'Other'].map((opt) => (
                <label key={opt} className="flex items-center p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                  <input type="radio" name="obj" value={opt} onChange={(e) => setObjective(e.target.value)} className="w-5 h-5 text-cyan-500 bg-slate-900 border-white/20 focus:ring-cyan-500" />
                  <span className="ml-4 text-white font-semibold">{opt}</span>
                </label>
              ))}
              {objective === 'Other' && (
                <input type="text" className={`${inputClass} mt-4`} placeholder="Please specify your objective..." autoFocus />
              )}
              <Button onClick={() => setStep(2)} className="w-full mt-6" icon={<ArrowRight size={18}/>}>Next Step</Button>
            </div>
          )}
          {step === 2 && (
             <div className="space-y-4 animate-in fade-in">
               <h3 className="text-lg text-slate-300 mb-4 font-semibold">Current Infrastructure State</h3>
               {['Greenfield (Starting Fresh)', 'Scaling Existing Systems', 'Legacy Migration', 'Other'].map((opt) => (
                 <label key={opt} className="flex items-center p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                   <input type="radio" name="scope" value={opt} onChange={(e) => setScope(e.target.value)} className="w-5 h-5 text-cyan-500 bg-slate-900 border-white/20 focus:ring-cyan-500" />
                   <span className="ml-4 text-white font-semibold">{opt}</span>
                 </label>
               ))}
               {scope === 'Other' && (
                <input type="text" className={`${inputClass} mt-4`} placeholder="Please specify current state..." autoFocus />
              )}
               <div className="flex gap-4 mt-6">
                 <Button onClick={() => setStep(1)} variant="secondary" className="w-1/3">Back</Button>
                 <Button onClick={() => setStep(3)} className="w-2/3" icon={<ArrowRight size={18}/>}>Next Step</Button>
               </div>
             </div>
          )}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg text-slate-300 mb-4 font-semibold">Contact Details & Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" className={inputClass} placeholder="Full Name *" />
                <input type="text" className={inputClass} placeholder="Company Name (Optional)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" className={inputClass} placeholder="Email Address *" />
                <input type="tel" className={inputClass} placeholder="Phone Number *" />
              </div>
              <textarea className={`${inputClass} resize-none`} rows={3} placeholder="Additional Notes or Project Details..."></textarea>
              
              <div className="flex gap-4 mt-8">
                <Button onClick={() => setStep(2)} variant="secondary" className="w-1/3">Back</Button>
                <Button onClick={handleSubmit} className="w-2/3" icon={!loading && <CheckCircle2 size={18}/>}>
                  {loading ? 'Processing...' : 'Request Audit'}
                </Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <CheckCircle2 size={48} className="text-cyan-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2 font-heading">Request Received</h3>
              <p className="text-slate-400">Our engineering team will contact you shortly.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

const FormEnergy = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [facility, setFacility] = useState('');
  
  const inputClass = "w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white shadow-sm outline-none focus:border-emerald-500 transition-colors duration-300";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 relative z-10 font-body bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(2,6,23,1))] pointer-events-none"></div>
      <div className="w-full max-w-2xl relative z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-8 transition-colors font-heading font-semibold">
          <ChevronLeft size={20} /> Back to Portfolio
        </button>
        <GlassCard className="p-8 md:p-12 border-t-2 border-t-emerald-500">
          {step < 3 && (
            <div className="mb-8 flex justify-between items-center border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold text-white font-heading">Get a Free Estimate</h2>
              <span className="text-emerald-400 font-semibold text-sm bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/20">Step {step}/2</span>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg text-slate-300 mb-4 font-semibold">Facility & Load Requirements</h3>
              
              <div className="space-y-3 mb-6">
                {['Residential (2kW - 15kW)', 'Commercial (15kW - 100kW)', 'Industrial (100kW+)', 'Other'].map((opt) => (
                  <label key={opt} className="flex items-center p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                    <input type="radio" name="facility" value={opt} onChange={(e) => setFacility(e.target.value)} className="w-5 h-5 text-emerald-500 bg-slate-900 border-white/20 focus:ring-emerald-500" />
                    <span className="ml-4 text-white font-semibold">{opt}</span>
                  </label>
                ))}
                {facility === 'Other' && (
                  <input type="text" className={inputClass} placeholder="Please specify facility type..." autoFocus />
                )}
              </div>

              <input type="number" className={inputClass} placeholder="Average Monthly Bill (PKR)" />
              <Button onClick={() => setStep(2)} variant="energy" className="w-full mt-8" icon={<ArrowRight size={18}/>}>Next Step</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg text-slate-300 mb-4 font-semibold">Contact Details & Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" className={inputClass} placeholder="Full Name *" />
                <input type="text" className={inputClass} placeholder="Company Name (Optional)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" className={inputClass} placeholder="Email Address *" />
                <input type="tel" className={inputClass} placeholder="Phone Number *" />
              </div>
              <input type="text" className={inputClass} placeholder="City / Installation Location *" />
              <textarea className={`${inputClass} resize-none`} rows={3} placeholder="Additional Notes or Specific Requirements..."></textarea>
              
              <div className="flex gap-4 mt-8">
                <Button onClick={() => setStep(1)} variant="secondary" className="w-1/3">Back</Button>
                <Button onClick={() => setStep(3)} variant="energy" className="w-2/3" icon={<Zap size={18}/>}>Calculate ROI</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <Zap size={48} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2 font-heading">Estimate Requested</h3>
              <p className="text-slate-400">Our solar engineers will reach out with your customized ROI breakdown.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

const FormRihla = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [volume, setVolume] = useState('');
  
  const inputClass = "w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white shadow-sm outline-none focus:border-blue-500 transition-colors duration-300";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 relative z-10 font-body bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(2,6,23,1))] pointer-events-none"></div>
      <div className="w-full max-w-2xl relative z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-8 transition-colors font-heading font-semibold">
          <ChevronLeft size={20} /> Back to Portfolio
        </button>
        <GlassCard className="p-8 md:p-12 border-t-2 border-t-blue-500">
          {step < 3 && (
            <div className="mb-8 flex justify-between items-center border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold text-white font-heading">Book Software Demo</h2>
              <span className="text-blue-400 font-semibold text-sm bg-blue-950/50 px-3 py-1 rounded-full border border-blue-500/20">Step {step}/2</span>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg text-slate-300 mb-4 font-semibold">Monthly Query Volume</h3>
              <div className="space-y-3">
                {['< 500 Queries/month', '500 - 2,000 Queries/month', '2,000+ Queries/month', 'Other'].map((opt) => (
                  <label key={opt} className="flex items-center p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                    <input type="radio" name="volume" value={opt} onChange={(e) => setVolume(e.target.value)} className="w-5 h-5 text-blue-500 bg-slate-900 border-white/20 focus:ring-blue-500" />
                    <span className="ml-4 text-white font-semibold">{opt}</span>
                  </label>
                ))}
                {volume === 'Other' && (
                  <input type="text" className={inputClass} placeholder="Please specify volume or requirements..." autoFocus />
                )}
              </div>
              <Button onClick={() => setStep(2)} variant="rihla" className="w-full mt-8" icon={<ArrowRight size={18}/>}>Next Step</Button>
            </div>
          )}
          {step === 2 && (
             <div className="space-y-4 animate-in fade-in">
             <h3 className="text-lg text-slate-300 mb-4 font-semibold">Contact Details & Notes</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input type="text" className={inputClass} placeholder="Full Name *" />
               <input type="text" className={inputClass} placeholder="Travel Agency Name (Company) *" />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input type="email" className={inputClass} placeholder="Work Email *" />
               <input type="tel" className={inputClass} placeholder="Phone Number *" />
             </div>
             <textarea className={`${inputClass} resize-none`} rows={3} placeholder="Additional Notes or Questions..."></textarea>
             
             <div className="flex gap-4 mt-8">
               <Button onClick={() => setStep(1)} variant="secondary" className="w-1/3">Back</Button>
               <Button onClick={() => setStep(3)} variant="rihla" className="w-2/3" icon={<Plane size={18}/>}>Schedule Google Meet</Button>
             </div>
           </div>
          )}
          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <Plane size={48} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2 font-heading">Demo Scheduled</h3>
              <p className="text-slate-400">Check your email for the calendar invitation and Google Meet link.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};


// --- MAIN APP / ROUTER ---
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const navLinks = [
    { id: 'home', label: 'Portfolio', target: 'top' },
    { id: 'tech-stack', label: 'Tech Stack', target: 'tech-stack' },
    { id: 'ta-energy', label: 'TA Energy', target: 'ta-energy' },
    { id: 'rihla-ai', label: 'Rihla AI', target: 'rihla-ai' }
  ];

  const handleNavClick = (target) => {
    if (currentRoute !== 'home') {
      setCurrentRoute('home');
      setTimeout(() => {
        if(target !== 'top') document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      if(target === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-body selection:bg-cyan-500/30 flex flex-col">
      <FontStyles />

      {/* Global Dark Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-sm py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            
            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleNavClick('top')}>
              <img src="Taha Acts Logo.png" alt="Taha Acts" className="h-10 w-auto group-hover:opacity-80 transition-opacity" onError={(e) => { e.target.style.display='none'; }} />
              <span className="ml-3 text-xl font-semibold font-heading tracking-tight text-white hidden sm:block">Taha Acts</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-6">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => handleNavClick(link.target)} 
                  className="text-xs sm:text-sm font-semibold font-heading uppercase tracking-wide px-3 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {currentRoute === 'home' && (
          <div className="flex flex-col">
            <HeroSection navigateTo={setCurrentRoute} />
            <TechStackSection navigateTo={setCurrentRoute} />
            <EnergySection navigateTo={setCurrentRoute} />
            <RihlaSection navigateTo={setCurrentRoute} />
          </div>
        )}
        {currentRoute === 'form-b2b' && <FormB2B onBack={() => setCurrentRoute('home')} />}
        {currentRoute === 'form-energy' && <FormEnergy onBack={() => setCurrentRoute('home')} />}
        {currentRoute === 'form-rihla' && <FormRihla onBack={() => setCurrentRoute('home')} />}
      </main>

      <footer className="bg-slate-950 border-t border-white/10 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="Taha Acts Logo.png" alt="Taha Acts" className="h-8 grayscale opacity-50" onError={(e) => { e.target.style.display='none'; }} />
                <span className="text-xl font-semibold font-heading text-slate-300">Taha Acts</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs font-light">Digital & Physical Infrastructure. Based in Lahore, Pakistan.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
               <div className="flex items-center text-slate-400 font-semibold gap-3 text-sm"><Phone size={16} className="text-cyan-500" /> 03048980011</div>
               <div className="flex items-center text-slate-400 font-semibold gap-3 text-sm"><Mail size={16} className="text-cyan-500" /> info@tahaacts.com</div>
               <div className="flex items-center text-slate-400 font-semibold gap-3 text-sm"><MapPin size={16} className="text-cyan-500" /> Lahore, PK</div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-slate-600 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Taha Acts. All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">Engineered for Scalability.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
