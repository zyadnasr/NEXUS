import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const mailtoLink = `mailto:hello@nexus.agency?subject=Project Inquiry from ${encodeURIComponent(formData.firstName + ' ' + formData.lastName)}&body=${encodeURIComponent('Name: ' + formData.firstName + ' ' + formData.lastName + '\nEmail: ' + formData.email + '\n\nMessage:\n' + formData.message)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const handleChange = (field: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-32 relative overflow-hidden bg-black/50">
        <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col items-center justify-center text-center py-24">
            <CheckCircle size={64} className="text-primary mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Message Sent</h2>
            <p className="text-lg text-text-secondary max-w-md font-light">Your email client should open to complete sending. We'll get back to you shortly.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-black/50">
      {/* Background elements */}
      <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur(95px) pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Get In Touch</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Let's build something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">extraordinary.</span>
              </h2>
              <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-md font-light">
                Ready to take your brand to the next level? Reach out to our team and let's discuss how we can help you achieve your goals.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary font-medium mb-2">Email Us</h4>
                  <a href="mailto:hello@nexus.agency" className="text-2xl font-bold hover:text-primary transition-colors">hello@nexus.agency</a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-text-secondary font-medium mb-2">Visit Us</h4>
                  <p className="text-lg font-light leading-relaxed">100 Innovation Drive<br/>San Francisco, CA 94103</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover-card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="text-3xl font-bold mb-10 tracking-tight text-white relative z-10">Send a message</h3>
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="firstName" className="text-xs uppercase tracking-widest font-medium text-text-secondary">First Name</label>
                  <input id="firstName" type="text" value={formData.firstName} onChange={handleChange('firstName')} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all duration-300 shadow-inner" placeholder="John" />
                  {errors.firstName && <p className="text-xs text-accent mt-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-3">
                  <label htmlFor="lastName" className="text-xs uppercase tracking-widest font-medium text-text-secondary">Last Name</label>
                  <input id="lastName" type="text" value={formData.lastName} onChange={handleChange('lastName')} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all duration-300 shadow-inner" placeholder="Doe" />
                  {errors.lastName && <p className="text-xs text-accent mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="email" className="text-xs uppercase tracking-widest font-medium text-text-secondary">Email Address</label>
                <input id="email" type="email" value={formData.email} onChange={handleChange('email')} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all duration-300 shadow-inner" placeholder="john@company.com" />
                {errors.email && <p className="text-xs text-accent mt-1">{errors.email}</p>}
              </div>
              
              <div className="space-y-3">
                <label htmlFor="message" className="text-xs uppercase tracking-widest font-medium text-text-secondary">Project Details</label>
                <textarea id="message" rows={4} value={formData.message} onChange={handleChange('message')} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all duration-300 resize-none shadow-inner" placeholder="Tell us about your goals..."></textarea>
                {errors.message && <p className="text-xs text-accent mt-1">{errors.message}</p>}
              </div>
              
              <MagneticButton as="button" type="submit" className="w-full bg-white text-black font-bold py-5 rounded-2xl mt-4 flex items-center justify-center gap-3">
                <span className="relative z-10">Send Message</span>
                <ArrowRight size={18} className="relative z-10" />
              </MagneticButton>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
