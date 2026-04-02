import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/constants';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful submission for now.
    alert('Thank you for your message! This is a simulated sending action.');
    setFormData({ name: '', email: '', message: '' });
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
              Feel free to reach out if you're looking for a dedicated software engineering intern, or just want to connect!
            </p>

            <div className="space-y-6 pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-dark-card border border-dark-border rounded-full flex items-center justify-center">
                  <Mail className="text-brand-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-dark-muted">Email</p>
                  <p className="font-medium">{PERSONAL_INFO.email}</p>
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
            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-muted">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
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
                  onChange={e => setFormData({...formData, email: e.target.value})}
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
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-white resize-none"
                  placeholder="Hello Shanilka..."
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-brand-primary hover:brightness-110 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
