import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, CERTIFICATIONS } from '../../data/constants';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <span className="text-brand-primary font-mono text-sm tracking-widest uppercase">Academic Background</span>
          <h2 className="text-3xl md:text-5xl font-bold">Education & Awards</h2>
          <div className="w-20 h-1 bg-brand-primary rounded-full mt-6"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass relative p-8 md:p-10 rounded-3xl h-full"
          >
            <div className="absolute top-0 right-10 -translate-y-1/2 w-16 h-16 bg-brand-primary flex items-center justify-center rounded-2xl shadow-lg shadow-brand-primary/30">
              <GraduationCap size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-2">{PERSONAL_INFO.degree}</h3>
            <h4 className="text-xl text-brand-primary mb-6">{PERSONAL_INFO.university}</h4>

            <div className="flex flex-col space-y-3 text-dark-muted mb-6">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>Present</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Sri Lanka</span>
              </div>
            </div>

            <p className="text-dark-muted leading-relaxed">
              Currently pursuing my undergraduate studies with a focus on comprehensive software engineering principles,
              algorithm design, and full-stack web development. Engaging in practical projects to solidify conceptual knowledge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col space-y-6 h-full"
          >
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl flex flex-col space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0 mt-1">
                    <Award size={24} className="text-brand-secondary" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg leading-tight mb-1">{cert.title}</h4>
                    <p className="text-brand-primary text-sm font-medium">{cert.issuer}</p>
                    {cert.date && <p className="text-dark-muted text-xs mt-1">{cert.date}</p>}
                    {cert.credentialId && (
                      <p className="text-dark-muted font-mono text-[10px] mt-2 bg-dark-bg/50 px-2 py-1 rounded inline-block">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <a
                    href={cert.image || cert.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold px-4 py-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>View Proof</span>
                  </a>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-dark-muted hover:text-white transition-colors"
                    >
                      Verify Page
                    </a>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
