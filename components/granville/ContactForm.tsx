"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [language, setLanguage] = useState<"en" | "zh">("en");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agency: "",
    message: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Granville Place - Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAgency/Company: ${formData.agency}\n\nMessage:\n${formData.message}`;
    
    // Redirect to mailto
    window.location.href = `mailto:hello@fiveroses.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const translations = {
    en: {
      title: "Talk to Us",
      subtitle: "Get in touch to discuss your project",
      name: "Name",
      email: "Email",
      phone: "Phone",
      agency: "Agency / Company",
      message: "Message",
      consent: "I consent to being contacted about this proposal",
      submit: "Send Message",
      downloading: "Downloading...",
      download: "Download PDF",
    },
    zh: {
      title: "联系我们",
      subtitle: "与我们联系以讨论您的项目",
      name: "姓名",
      email: "邮箱",
      phone: "电话",
      agency: "代理/公司",
      message: "留言",
      consent: "我同意就本提案进行联系",
      submit: "发送消息",
      downloading: "下载中...",
      download: "下载PDF",
    },
  };

  const t = translations[language];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-slate-50">
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-2">
                {t.title}
              </h2>
              <p className="text-lg text-slate-600">{t.subtitle}</p>
            </div>
            <button
              onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {language === "en" ? "中文" : "English"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="agency" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.agency}
                </label>
                <input
                  type="text"
                  id="agency"
                  value={formData.agency}
                  onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-slate-600">
                  {t.consent}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {t.submit}
              </button>
            </form>

            <div className="bg-white p-6 md:p-8 rounded-lg border border-slate-200 h-full flex flex-col justify-center">
              <h3 className="text-xl font-light mb-4 text-slate-900">
                Download Full Proposal
              </h3>
              <p className="text-slate-600 mb-6">
                Get the complete 12-month growth plan for Granville Place as a PDF.
              </p>
              <a
                href="mailto:hello@fiveroses.com.au?subject=Granville Place Proposal - PDF Request&body=Hi,%0D%0A%0D%0APlease send me the PDF version of the Granville Place 12-month growth proposal.%0D%0A%0D%0AThanks!"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                <Send className="w-5 h-5" />
                {t.download}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

