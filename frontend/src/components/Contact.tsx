'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function Contact({ dict }: { dict: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      // Use environment variable for API URL or default to localhost
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setMessage(result.message);
        (event.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
        console.error('Submission error:', error);
        setStatus('error');
        setMessage('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 lg:py-24 2xl:py-32 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 2xl:p-20 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-12 2xl:gap-24 items-start">
                
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6">
                        {dict.pre_title}
                    </div>
                    <h2 
                        className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-6 text-white leading-tight"
                        dangerouslySetInnerHTML={{ __html: dict.title }}
                    />
                    <p className="text-lg 2xl:text-xl text-gray-400 mb-8 max-w-lg 2xl:max-w-xl leading-relaxed">
                        {dict.subtitle}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        <a href="https://wa.me/213556036429" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#25D366] group-hover:border-[#25D366] transition-all duration-300 flex-shrink-0">
                                {/* WhatsApp Icon */}
                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">{dict.phone_label}</p>
                                <p className="text-sm font-bold text-white tracking-wide group-hover:text-[#25D366] transition-colors">+213 556 03 64 29</p>
                            </div>
                        </a>
                        
                        <a href="mailto:contact@basma.education" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300 flex-shrink-0">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">{dict.email_label}</p>
                                <p className="text-sm font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">contact@basma.education</p>
                            </div>
                        </a>

                        <div className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#0077b5] group-hover:border-[#0077b5] transition-all duration-300 flex-shrink-0">
                                <Linkedin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 mb-0.5">LinkedIn</p>
                                <a href="https://www.linkedin.com/company/ba%E1%B9%A3ma-%D8%A8%D8%B5%D9%85%D8%A9/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white tracking-wide group-hover:text-[#0077b5] transition-colors">Basma Education</a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-emerald-600/20 rounded-3xl blur-xl" />
                    <div className="relative bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                        <h3 className="text-2xl font-bold text-white mb-2">{dict.form_title}</h3>
                        <p className="text-gray-400 mb-8 text-sm">
                            {dict.form_subtitle}
                        </p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input name="name" type="text" placeholder={dict.form.name} className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-purple-500 focus:outline-none w-full text-white placeholder-gray-400" required />
                                <input name="email" type="email" placeholder={dict.form.email} className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-purple-500 focus:outline-none w-full text-white placeholder-gray-400" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input name="company" type="text" placeholder={dict.form.company} className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-purple-500 focus:outline-none w-full text-white placeholder-gray-400" />
                                <input name="phone" type="tel" placeholder={dict.form.phone} className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-purple-500 focus:outline-none w-full text-white placeholder-gray-400" />
                            </div>
                            
                            <textarea name="message" placeholder={dict.form.message} rows={4} className="bg-white/5 border border-white/10 rounded-xl p-4 focus:border-purple-500 focus:outline-none w-full resize-none text-white placeholder-gray-400" required></textarea>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-600 font-bold hover:opacity-90 transition-opacity text-white disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        {dict.form.submit} →
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    {message}
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                    <XCircle className="w-5 h-5" />
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
