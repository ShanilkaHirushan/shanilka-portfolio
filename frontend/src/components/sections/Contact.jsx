import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/constants';
import { Send, MapPin, Mail, Phone, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data?.errors?.[0]?.msg || data?.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Could not connect to server. Please try again later.');
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <span className="text-brand-primary font-mono text-sm tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold">Contact Me</h2>
          <div className="w-20 h-1 bg-brand-primary rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold mb-4">Let's talk about everything <span className="text-brand-primary">tech.</span></h3>
            <p className="text-dark-muted text-lg">
              Feel free to reach out if you're looking for a dedicated Full Stack Developer Intern or software engineering intern, or just want to connect!
            </p>

            <div className="space-y-6 pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-dark-card border border-dark-border rounded-full flex items-center justify-center">
                  <Mail className="text-brand-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-dark-muted">Email</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="font-medium hover:text-brand-primary transition-colors">{PERSONAL_INFO.email}</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-dark-card border border-dark-border rounded-full flex items-center justify-center">
                  <Phone className="text-brand-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-dark-muted">Phone</p>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="font-medium hover:text-brand-primary transition-colors">{PERSONAL_INFO.phone}</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-dark-card border border-dark-border rounded-full flex items-center justify-center">
                  <MapPin className="text-brand-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-dark-muted">Location</p>
                  <p className="font-medium">Sri Lanka</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="glass p-12 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 min-h-[420px] relative overflow-hidden"
              >
                {/* Glow rings */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="absolute w-48 h-48 rounded-full bg-brand-primary/20 blur-2xl"
                />
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute w-48 h-48 rounded-full bg-brand-secondary/20 blur-2xl"
                />

                {/* Animated checkmark circle */}
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-xl shadow-brand-primary/40"
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                    />
                  </motion.svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative z-10 space-y-3"
                >
                  <h3 className="text-2xl font-bold">Message Sent! 🎉</h3>
                  <p className="text-dark-muted text-base max-w-xs">
                    Thanks for reaching out! I'll get back to you as soon as possible.
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  onClick={() => setStatus(null)}
                  className="relative z-10 mt-4 px-6 py-2.5 border border-brand-primary/50 text-brand-primary hover:bg-brand-primary hover:text-white rounded-full text-sm font-semibold transition-all duration-300"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-white"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-white resize-none"
                  placeholder="Hello Shanilka..."
                  required
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-primary hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <><Loader size={18} className="animate-spin" /><span>Sending...</span></>
                ) : (
                  <><span>Send Message</span><Send size={18} /></>
                )}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

