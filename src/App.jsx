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
      .animate-scroll { animation: scroll 30s linear infinite; }
      .animate-scroll:hover { animation-play-state: paused; }
      ::-webkit-scrollbar { width: 10px; }
      ::-webkit-scrollbar-track { background: #020617; }
      ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 5px; }
      ::-webkit-scrollbar-thumb:hover { background: #334155; }
    `}
  </style>
);

// --- UI COMPONENTS ---
const GlassCard = ({ children, className = "", onClick, interactive = false }) => (
  <div onClick={onClick} className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] ${interactive ? 'cursor-pointer hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500 group' : ''} ${className}`}>
    {interactive && <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/10 via-transparent to-green-400/5 transition-opacity duration-700 pointer-events-none" />}
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = "", icon = null, disabled = false }) => {
  const baseStyle = "px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold font-heading transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto";
  const variants = {
    primary: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)]",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md",
    energy: "bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    rihla: "bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
  };
  return <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>{children} {icon && icon}</button>;
};

// ==========================================
// 🔴 ENTER YOUR DISCORD WEBHOOK URL HERE 🔴
// ==========================================
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1488993933361938434/727KO_nuM26gTbH5ImWT7McfszrIrK7iuUjfcB_dFyX3it6mlBGdArECBa7oavF_Ok4J"; 

const submitToDiscord = async (data, formName, color) => {
  // Format the data into Discord Embed Fields
  const fields = Object.entries(data)
    .filter(([key, value]) => value && value.toString().trim() !== '') // Remove empty fields
    .map(([key, value]) => {
      // Clean up key names for the embed display
      const cleanKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      return { name: cleanKey, value: value.toString(), inline: key !== 'notes' }; // Notes take full width
    });

  const payload = {
    username: "Taha Acts Leads",
    embeds: [{
      title: `🚨 New Lead Received: ${formName}`,
      color: color, // Decides the color strip on the left of the message
      fields: fields,
      timestamp: new Date().toISOString(),
      footer: { text: "Taha Acts Web Portal" }
    }]
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (error) {
    console.error("Discord submission failed", error);
    return { success: false };
  }
};

const VendorBadge = ({ name, icon: Icon, marquee = false }) => (
  <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors cursor-default text-center ${marquee ? 'whitespace-nowrap px-6 py-4' : 'h-full'}`}>
    {Icon && <Icon size={20} className="text-slate-400 shrink-0" />}
    <span className={`font-semibold font-heading tracking-wide text-slate-200 text-xs sm:text-sm md:text-base leading-tight ${marquee ? '' : 'whitespace-normal'}`}>{name}</span>
  </div>
);

// --- SEPARATE LEAD GEN PAGES ---

const FormB2B = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ objective: '', objectiveOther: '', scope: '', scopeOther: '', name: '', company: '', email: '', phone: '', notes: '' });

  const updateData = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    const finalData = { ...formData };
    if (finalData.objective === 'Other') finalData.objective = `Other: ${finalData.objectiveOther}`;
    if (finalData.scope === 'Other') finalData.scope = `Other: ${finalData.scopeOther}`;
    
    delete finalData.objectiveOther;
    delete finalData.scopeOther;

    // Send to Discord (Cyan Color code: 601314)
    await submitToDiscord(finalData, "Tech & AI Services", 601314);
    setLoading(false);
    setStep(4);
  };

  const inputClass = "w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white text-sm sm:text-base shadow-sm outline-none focus:border-cyan-500 transition-colors duration-300";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 relative z-10 font-body bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(8,145,178,0.15),rgba(2,6,23,1))] pointer-events-none"></div>
      <div className="w-full max-w-2xl relative z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 sm:mb-8 font-heading font-semibold text-sm sm:text-base"><ChevronLeft size={20} /> Back to Portfolio</button>
        <GlassCard className="p-6 sm:p-8 md:p-12 border-t-2 border-t-cyan-500">
          {step < 4 && (
            <div className="mb-6 sm:mb-8 flex justify-between items-center border-b border-white/10 pb-4 sm:pb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-white font-heading">Start Your Project</h2>
              <span className="text-cyan-400 font-semibold text-xs sm:text-sm bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/20">Step {step}/3</span>
            </div>
          )}
          
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base sm:text-lg text-slate-300 mb-4 font-semibold">What are you looking to architect?</h3>
              {['Custom AI & LLMs', 'Cloud Infrastructure', 'Custom Linux Servers', 'Enterprise Web App', 'Other'].map((opt) => (
                <label key={opt} className="flex items-center p-3 sm:p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                  <input type="radio" name="objective" value={opt} onChange={updateData} checked={formData.objective === opt} className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 bg-slate-900 border-white/20 shrink-0" />
                  <span className="ml-3 sm:ml-4 text-white font-semibold text-sm sm:text-base">{opt}</span>
                </label>
              ))}
              {formData.objective === 'Other' && <input type="text" name="objectiveOther" onChange={updateData} value={formData.objectiveOther} className={`${inputClass} mt-4`} placeholder="Please specify your objective..." autoFocus />}
              <Button onClick={() => setStep(2)} className="mt-6 sm:mt-8 w-full" icon={<ArrowRight size={18}/>} disabled={!formData.objective}>Next Step</Button>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-4 animate-in fade-in">
               <h3 className="text-base sm:text-lg text-slate-300 mb-4 font-semibold">Current Infrastructure State</h3>
               {['Greenfield (Starting Fresh)', 'Scaling Existing Systems', 'Legacy Migration', 'Other'].map((opt) => (
                 <label key={opt} className="flex items-center p-3 sm:p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                   <input type="radio" name="scope" value={opt} onChange={updateData} checked={formData.scope === opt} className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 bg-slate-900 border-white/20 shrink-0" />
                   <span className="ml-3 sm:ml-4 text-white font-semibold text-sm sm:text-base">{opt}</span>
                 </label>
               ))}
               {formData.scope === 'Other' && <input type="text" name="scopeOther" onChange={updateData} value={formData.scopeOther} className={`${inputClass} mt-4`} placeholder="Please specify current state..." autoFocus />}
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                 <Button onClick={() => setStep(1)} variant="secondary" className="w-full sm:w-1/3">Back</Button>
                 <Button onClick={() => setStep(3)} className="w-full sm:w-2/3" icon={<ArrowRight size={18}/>} disabled={!formData.scope}>Next Step</Button>
               </div>
             </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base sm:text-lg text-slate-300 mb-4 font-semibold">Contact Details & Notes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input type="text" name="name" onChange={updateData} value={formData.name} className={inputClass} placeholder="Full Name *" />
                <input type="text" name="company" onChange={updateData} value={formData.company} className={inputClass} placeholder="Company Name (Optional)" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input type="email" name="email" onChange={updateData} value={formData.email} className={inputClass} placeholder="Email Address *" />
                <input type="tel" name="phone" onChange={updateData} value={formData.phone} className={inputClass} placeholder="Phone Number *" />
              </div>
              <textarea name="notes" onChange={updateData} value={formData.notes} className={`${inputClass} resize-none`} rows={3} placeholder="Additional Notes or Project Details..."></textarea>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Button onClick={() => setStep(2)} variant="secondary" className="w-full sm:w-1/3">Back</Button>
                <Button onClick={handleSubmit} className="w-full sm:w-2/3" icon={!loading && <CheckCircle2 size={18}/>} disabled={!formData.name || !formData.email || !formData.phone || loading}>
                  {loading ? 'Sending Data...' : 'Request Audit'}
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <CheckCircle2 size={48} className="text-cyan-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 font-heading">Request Received</h3>
              <p className="text-sm sm:text-base text-slate-400">Our engineering team will contact you shortly.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

const FormEnergy = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ facility: '', facilityOther: '', bill: '', name: '', company: '', email: '', phone: '', city: '', notes: '' });

  const updateData = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    const finalData = { ...formData };
    if (finalData.facility === 'Other') finalData.facility = `Other: ${finalData.facilityOther}`;
    delete finalData.facilityOther;

    // Send to Discord (Emerald Color code: 1084227)
    await submitToDiscord(finalData, "TA Energy Solar", 1084227);
    setLoading(false);
    setStep(3);
  };

  const inputClass = "w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white text-sm sm:text-base shadow-sm outline-none focus:border-emerald-500 transition-colors duration-300";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 relative z-10 font-body bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(2,6,23,1))] pointer-events-none"></div>
      <div className="w-full max-w-2xl relative z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 sm:mb-8 font-heading font-semibold text-sm sm:text-base"><ChevronLeft size={20} /> Back to Portfolio</button>
        <GlassCard className="p-6 sm:p-8 md:p-12 border-t-2 border-t-emerald-500">
          {step < 3 && (
            <div className="mb-6 sm:mb-8 flex justify-between items-center border-b border-white/10 pb-4 sm:pb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-white font-heading">Get a Free Estimate</h2>
              <span className="text-emerald-400 font-semibold text-xs sm:text-sm bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/20">Step {step}/2</span>
            </div>
          )}
          
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base sm:text-lg text-slate-300 mb-4 font-semibold">Facility & Load Requirements</h3>
              <div className="space-y-3 mb-6">
                {['Residential (2kW - 15kW)', 'Commercial (15kW - 100kW)', 'Industrial (100kW+)', 'Other'].map((opt) => (
                  <label key={opt} className="flex items-center p-3 sm:p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                    <input type="radio" name="facility" value={opt} onChange={updateData} checked={formData.facility === opt} className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 bg-slate-900 border-white/20 shrink-0" />
                    <span className="ml-3 sm:ml-4 text-white font-semibold text-sm sm:text-base">{opt}</span>
                  </label>
                ))}
                {formData.facility === 'Other' && <input type="text" name="facilityOther" onChange={updateData} value={formData.facilityOther} className={inputClass} placeholder="Please specify facility type..." autoFocus />}
              </div>
              <input type="number" name="bill" onChange={updateData} value={formData.bill} className={inputClass} placeholder="Average Monthly Bill (PKR) *" />
              <Button onClick={() => setStep(2)} variant="energy" className="mt-6 sm:mt-8 w-full" icon={<ArrowRight size={18}/>} disabled={!formData.facility || !formData.bill}>Next Step</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base sm:text-lg text-slate-300 mb-4 font-semibold">Contact Details & Notes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input type="text" name="name" onChange={updateData} value={formData.name} className={inputClass} placeholder="Full Name *" />
                <input type="text" name="company" onChange={updateData} value={formData.company} className={inputClass} placeholder="Company Name (Optional)" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input type="email" name="email" onChange={updateData} value={formData.email} className={inputClass} placeholder="Email Address *" />
                <input type="tel" name="phone" onChange={updateData} value={formData.phone} className={inputClass} placeholder="Phone Number *" />
              </div>
              <input type="text" name="city" onChange={updateData} value={formData.city} className={inputClass} placeholder="City / Installation Location *" />
              <textarea name="notes" onChange={updateData} value={formData.notes} className={`${inputClass} resize-none`} rows={3} placeholder="Additional Notes or Specific Requirements..."></textarea>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Button onClick={() => setStep(1)} variant="secondary" className="w-full sm:w-1/3">Back</Button>
                <Button onClick={handleSubmit} variant="energy" className="w-full sm:w-2/3" icon={<Zap size={18}/>} disabled={!formData.name || !formData.email || !formData.phone || !formData.city || loading}>
                  {loading ? 'Sending Request...' : 'Calculate ROI'}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <Zap size={48} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 font-heading">Estimate Requested</h3>
              <p className="text-sm sm:text-base text-slate-400">Our solar engineers will reach out with your customized ROI breakdown.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

const FormRihla = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ volume: '', volumeOther: '', name: '', company: '', email: '', phone: '', notes: '' });

  const updateData = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    const finalData = { ...formData };
    if (finalData.volume === 'Other') finalData.volume = `Other: ${finalData.volumeOther}`;
    delete finalData.volumeOther;

    // Send to Discord (Blue Color code: 3447003)
    await submitToDiscord(finalData, "Rihla AI Demo", 3447003);
    setLoading(false);
    setStep(3);
  };

  const inputClass = "w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white text-sm sm:text-base shadow-sm outline-none focus:border-blue-500 transition-colors duration-300";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 relative z-10 font-body bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(2,6,23,1))] pointer-events-none"></div>
      <div className="w-full max-w-2xl relative z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 sm:mb-8 font-heading font-semibold text-sm sm:text-base"><ChevronLeft size={20} /> Back to Portfolio</button>
        <GlassCard className="p-6 sm:p-8 md:p-12 border-t-2 border-t-blue-500">
          {step < 3 && (
            <div className="mb-6 sm:mb-8 flex justify-between items-center border-b border-white/10 pb-4 sm:pb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-white font-heading">Book Software Demo</h2>
              <span className="text-blue-400 font-semibold text-xs sm:text-sm bg-blue-950/50 px-3 py-1 rounded-full border border-blue-500/20">Step {step}/2</span>
            </div>
          )}
          
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base sm:text-lg text-slate-300 mb-4 font-semibold">Monthly Query Volume</h3>
              <div className="space-y-3">
                {['< 500 Queries/month', '500 - 2,000 Queries/month', '2,000+ Queries/month', 'Other'].map((opt) => (
                  <label key={opt} className="flex items-center p-3 sm:p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                    <input type="radio" name="volume" value={opt} onChange={updateData} checked={formData.volume === opt} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 bg-slate-900 border-white/20 shrink-0" />
                    <span className="ml-3 sm:ml-4 text-white font-semibold text-sm sm:text-base">{opt}</span>
                  </label>
                ))}
                {formData.volume === 'Other' && <input type="text" name="volumeOther" onChange={updateData} value={formData.volumeOther} className={inputClass} placeholder="Please specify volume or requirements..." autoFocus />}
              </div>
              <Button onClick={() => setStep(2)} variant="rihla" className="mt-6 sm:mt-8 w-full" icon={<ArrowRight size={18}/>} disabled={!formData.volume}>Next Step</Button>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-4 animate-in fade-in">
             <h3 className="text-base sm:text-lg text-slate-300 mb-4 font-semibold">Contact Details & Notes</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
               <input type="text" name="name" onChange={updateData} value={formData.name} className={inputClass} placeholder="Full Name *" />
               <input type="text" name="company" onChange={updateData} value={formData.company} className={inputClass} placeholder="Travel Agency Name *" />
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
               <input type="email" name="email" onChange={updateData} value={formData.email} className={inputClass} placeholder="Work Email *" />
               <input type="tel" name="phone" onChange={updateData} value={formData.phone} className={inputClass} placeholder="Phone Number *" />
             </div>
             <textarea name="notes" onChange={updateData} value={formData.notes} className={`${inputClass} resize-none`} rows={3} placeholder="Additional Notes or Questions..."></textarea>
             
             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
               <Button onClick={() => setStep(1)} variant="secondary" className="w-full sm:w-1/3">Back</Button>
               <Button onClick={handleSubmit} variant="rihla" className="w-full sm:w-2/3" icon={<Plane size={18}/>} disabled={!formData.name || !formData.company || !formData.email || !formData.phone || loading}>
                 {loading ? 'Scheduling...' : 'Schedule Google Meet'}
               </Button>
             </div>
           </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <Plane size={48} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 font-heading">Demo Scheduled</h3>
              <p className="text-sm sm:text-base text-slate-400">Check your email for the calendar invitation and Google Meet link.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};


// --- PORTFOLIO SECTIONS ---

const HeroSection = ({ navigateTo }) => (
  <div className="relative min-h-screen flex items-center pt-20 border-b border-white/10 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline poster="hero-bg.jpg" className="w-full h-full object-cover opacity-90">
        <source src="hero-bg.webm" type="video/webm" />
        <source src="hero-bg.mp4" type="video/mp4" />
        <source src="https://cdn.coverr.co/videos/coverr-server-room-4113/1080p.mp4" type="video/mp4" /> 
      </video>
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
      <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight mb-6 sm:mb-8 font-heading leading-[1.1]">
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Digital & Physical</span> Infrastructure.
        </h1>
        <p className="text-lg sm:text-xl text-slate-200 mb-10 sm:mb-12 max-w-2xl font-body leading-relaxed font-light drop-shadow-lg">
          Based in Lahore, Taha Acts is a premier technology holding company. We engineer highly scalable cloud environments, custom AI pipelines, and industrial-grade solar networks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
          <Button onClick={() => navigateTo('form-b2b')} className="w-full sm:w-auto">Schedule Tech Consultation</Button>
          <Button variant="secondary" onClick={() => document.getElementById('tech-stack').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto">
            Explore Our Portfolio
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const TechStackSection = ({ navigateTo }) => (
  <div id="tech-stack" className="relative py-24 sm:py-32 border-b border-white/10 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline poster="tech-bg.jpg" className="w-full h-full object-cover">
        <source src="tech-bg.webm" type="video/webm" />
        <source src="tech-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="mb-12 sm:mb-16">
        <h2 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-cyan-500 uppercase mb-3 font-heading">Taha Acts Core</h2>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-heading">Enterprise Tech & AI Solutions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 sm:mb-20">
        <GlassCard className="p-6 sm:p-8 border-t-2 border-t-cyan-500/50">
          <Code className="text-cyan-400 mb-4 sm:mb-6" size={32}/>
          <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 font-heading">Web App Development</h4>
          <p className="text-sm sm:text-base text-slate-400 font-body font-light">High-performance corporate websites and complex, scalable portals tailored to your enterprise workflows.</p>
        </GlassCard>
        <GlassCard className="p-6 sm:p-8 border-t-2 border-t-cyan-500/50">
          <Cloud className="text-cyan-400 mb-4 sm:mb-6" size={32}/>
          <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 font-heading">AWS & Azure Management</h4>
          <p className="text-sm sm:text-base text-slate-400 font-body font-light">Zero-downtime architecture, security hardening, load balancing, and custom Linux server setups.</p>
        </GlassCard>
        <GlassCard className="p-6 sm:p-8 border-t-2 border-t-cyan-500/50">
          <BrainCircuit className="text-cyan-400 mb-4 sm:mb-6" size={32}/>
          <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 font-heading">Fine-Tuned LLMs & AI</h4>
          <p className="text-sm sm:text-base text-slate-400 font-body font-light">Proprietary AI pipelines and Private Language Models trained strictly on your secure enterprise data.</p>
        </GlassCard>
      </div>
      <div className="mb-8 sm:mb-10">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-[0.2em] font-heading mb-4 sm:mb-6 border-l-2 border-cyan-500 pl-4">Powered by Industry Leading Tech</h4>
      </div>
      <div className="overflow-hidden relative -mx-4 sm:mx-0">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
        <div className="flex w-[200%] animate-scroll gap-4 sm:gap-6 pb-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 sm:gap-6 shrink-0">
              <VendorBadge name="Python" marquee={true}/>
              <VendorBadge name="React.js" marquee={true}/>
              <VendorBadge name="Angular" marquee={true}/>
              <VendorBadge name="Rust" marquee={true}/>
              <VendorBadge name="Ubuntu" marquee={true}/>
              <VendorBadge name="Linux Foundation" marquee={true}/>
              <VendorBadge name="Google Cloud" marquee={true}/>
              <VendorBadge name="AWS" marquee={true}/>
              <VendorBadge name="Microsoft Azure" marquee={true}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const EnergySection = ({ navigateTo }) => (
  <div id="ta-energy" className="relative py-24 sm:py-32 border-b border-white/10 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline poster="energy-bg.jpg" className="w-full h-full object-cover">
        <source src="energy-bg.webm" type="video/webm" />
        <source src="energy-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <img src="TA Energy Logo.png" alt="TA Energy" className="h-10 sm:h-14 object-contain mb-6 sm:mb-8 mx-auto lg:mx-0" onError={(e) => { e.target.style.display='none'; }} />
          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-emerald-400 uppercase mb-2 sm:mb-3 font-heading">Physical Infrastructure</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-heading mb-4 sm:mb-6 leading-tight">Industrial-Grade <br className="hidden lg:block"/>Solar Solutions.</h3>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-body font-light mb-6 sm:mb-8 leading-relaxed">
            We provide complete solar solutions, from high-efficiency 2-panel residential setups to massive industrial grids. By utilizing premium Tier-1 panels, advanced inverters, and expert engineering, we ensure maximum ROI and energy independence.
          </p>
          <Button variant="energy" onClick={() => navigateTo('form-energy')} icon={<Zap size={18}/>} className="w-full sm:w-auto mx-auto lg:mx-0">Calculate Solar ROI</Button>
        </div>
        <div className="w-full lg:w-1/2">
          <GlassCard className="p-6 sm:p-8 md:p-10 border-t-2 border-t-emerald-500/50">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 font-heading border-b border-white/10 pb-3 sm:pb-4 text-center lg:text-left">Certified Tier-1 Equipment Partners</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
  <div id="rihla-ai" className="relative py-24 sm:py-32 border-b border-white/10 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline poster="rihla-bg.jpg" className="w-full h-full object-cover">
        <source src="rihla-bg.webm" type="video/webm" />
        <source src="rihla-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <img src="Rihla AI Logo.png" alt="Rihla AI" className="h-16 sm:h-20 object-contain mb-6 sm:mb-8 mx-auto" onError={(e) => { e.target.style.display='none'; }} />
      <h2 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-blue-400 uppercase mb-2 sm:mb-3 font-heading">SaaS & Automation</h2>
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-heading mb-4 sm:mb-6 leading-tight">The Future of <br className="hidden sm:block"/>Travel Automation.</h3>
      <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-body font-light mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
        Rihla is a fully humanized AI Travel Expert. We provide comprehensive B2B software solutions for travel agencies, enabling them to automate thousands of flight searches, hotel bookings, transport arrangements, and customer voice chats simultaneously.
      </p>
      <div className="flex justify-center">
        <Button variant="rihla" onClick={() => navigateTo('form-rihla')} icon={<Plane size={18}/>} className="w-full sm:w-auto">Book a Software Demo</Button>
      </div>
    </div>
  </div>
);


// --- MAIN APP / ROUTER ---
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [currentRoute]);

  const navLinks = [
    { id: 'home', label: 'Portfolio', target: 'top' },
    { id: 'tech-stack', label: 'Tech Stack', target: 'tech-stack' },
    { id: 'ta-energy', label: 'TA Energy', target: 'ta-energy' },
    { id: 'rihla-ai', label: 'Rihla AI', target: 'rihla-ai' }
  ];

  const handleNavClick = (target) => {
    setIsMobileMenuOpen(false);
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
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleNavClick('top')}>
              <img src="Taha Acts Logo.png" alt="Taha Acts" className="h-8 sm:h-10 w-auto group-hover:opacity-80 transition-opacity" onError={(e) => { e.target.style.display='none'; }} />
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-semibold font-heading tracking-tight text-white hidden xs:block">Taha Acts</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
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

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-white/10 px-4 pt-2 pb-4 space-y-1 shadow-xl">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => handleNavClick(link.target)} 
                className="block w-full text-left px-3 py-3 rounded-md text-base font-semibold font-heading text-slate-300 hover:text-white hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
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

      <footer className="bg-slate-950 border-t border-white/10 py-10 sm:py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="Taha Acts Logo.png" alt="Taha Acts" className="h-6 sm:h-8 grayscale opacity-50" onError={(e) => { e.target.style.display='none'; }} />
                <span className="text-lg sm:text-xl font-semibold font-heading text-slate-300">Taha Acts</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm max-w-xs font-light">Digital & Physical Infrastructure. Based in Lahore, Pakistan.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-12 w-full sm:w-auto">
               <div className="flex items-center text-slate-400 font-semibold gap-3 text-xs sm:text-sm"><Phone size={16} className="text-cyan-500 shrink-0" /> 03048980011</div>
               <div className="flex items-center text-slate-400 font-semibold gap-3 text-xs sm:text-sm"><Mail size={16} className="text-cyan-500 shrink-0" /> info@tahaacts.com</div>
               <div className="flex items-center text-slate-400 font-semibold gap-3 text-xs sm:text-sm"><MapPin size={16} className="text-cyan-500 shrink-0" /> Lahore, PK</div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-widest text-center sm:text-left gap-4">
            <p>&copy; {new Date().getFullYear()} Taha Acts. All Rights Reserved.</p>
            <p>Engineered for Scalability.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
