import React, {useState} from 'react';
import {Check, ChevronDown, Mail, MapPin, Phone} from 'lucide-react';
import {FAQS} from '../data/editorial';
import {ASSETS} from '../data/catalog';
import {PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SafeImage} from '../components/SafeImage';

export function AboutContactPage() {
  usePageMeta(
    'About & Contact',
    'Learn about the House of ZARIYA, visit our Mumbai and New Delhi ateliers, browse FAQs, or send a bespoke enquiry.'
  );

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bridal & Trousseau Styling',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please share a few details about your enquiry (at least 10 characters).';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <PageShell className="bg-[#F5F3EC] py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'About & Contact'}]} />

        {/* Brand Story */}
        <section className="mt-6 sm:mt-8 grid grid-cols-1 gap-8 sm:gap-10 border-b border-[#303431]/12 pb-12 sm:pb-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
              About ZARIYA
            </p>
            <h1 className="font-display text-3xl font-normal text-[#123F3A] sm:text-5xl">
              An Atelier Rooted in Quiet Luxury.
            </h1>
            <p className="text-base leading-relaxed text-[#303431]/80">
              Founded in Mumbai in 2021, ZARIYA bridges India’s historic weaving towns and
              contemporary wardrobe architecture. Every saree is produced in small seasonal
              editions, pairing handspun mulberry silk and soft-burnished antique zari with
              calm, sculptural palettes.
            </p>
            <p className="text-sm leading-relaxed text-[#303431]/75">
              Our client concierge assists brides, collectors, and patrons worldwide with weave
              authenticity verification, custom blouse tailoring, and insured international
              delivery.
            </p>
          </div>
          <div className="lg:col-span-6 overflow-hidden bg-[#E8E5D9]">
            <SafeImage
              src={ASSETS.pearlChanderi}
              alt="ZARIYA Atelier pearl and sage Chanderi drape"
              className="aspect-[4/3] w-full object-cover object-top"
            />
          </div>
        </section>

        {/* Contact Details + Enquiry Form */}
        <section className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
                Ateliers & Client Care
              </p>
              <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A]">
                Visit or Write to Us
              </h2>
            </div>

            <div className="space-y-5 text-sm text-[#303431]/85">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#123F3A] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#123F3A]">Mumbai Flagship Atelier</p>
                  <p className="mt-0.5 text-[#303431]/75">
                    14 Rope Walk Lane, Kala Ghoda, Fort, Mumbai 400001 · Mon–Sat, 11 AM – 7 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#123F3A] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#123F3A]">New Delhi Salon (By Appointment)</p>
                  <p className="mt-0.5 text-[#303431]/75">
                    One Style Mile Courtyard, Mehrauli, New Delhi 110030
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#123F3A] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#123F3A]">Concierge Desk</p>
                  <p className="mt-0.5 tabular-nums text-[#303431]/75">+91 22 4890 7120</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#123F3A] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#123F3A]">Atelier Email</p>
                  <p className="mt-0.5 text-[#303431]/75">concierge@zariya-atelier.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border border-[#303431]/15 bg-[#E8E5D9]/40 p-6 sm:p-10">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#123F3A] text-[#E8E5D9]">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="font-display text-3xl text-[#123F3A]">
                  Enquiry Sent to Our Atelier
                </h3>
                <p className="mx-auto max-w-md text-sm text-[#303431]/80">
                  Thank you, {form.name}. A ZARIYA client advisor will reply to {form.email} within
                  one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Bridal & Trousseau Styling',
                      message: '',
                    });
                  }}
                  className="text-xs font-medium underline underline-offset-4 text-[#123F3A]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={validateAndSubmit} noValidate className="space-y-5">
                <h3 className="font-display text-2xl text-[#123F3A]">Send an Enquiry</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#303431]">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-[#7A1F24]">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#303431]">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                    {errors.email && <p className="mt-1 text-xs text-[#7A1F24]">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-[#303431]">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-[#303431]">
                      Enquiry Topic
                    </label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => setForm({...form, subject: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    >
                      <option>Bridal & Trousseau Styling</option>
                      <option>Bespoke Loom Commission</option>
                      <option>Order & Shipping Support</option>
                      <option>Press & Editorial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-[#303431]">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="Tell us about the occasion, weave preference, or order reference..."
                    className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                  />
                  {errors.message && <p className="mt-1 text-xs text-[#7A1F24]">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="bg-[#123F3A] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mt-14 sm:mt-20 border-t border-[#303431]/12 pt-12 sm:pt-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
              Client Care
            </p>
            <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 divide-y divide-[#303431]/12 border-y border-[#303431]/12">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-[#9E8249]">
                        {faq.category}
                      </span>
                      <span className="mt-1 block font-display text-xl text-[#123F3A]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#303431] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 max-w-3xl text-sm leading-relaxed text-[#303431]/80">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
