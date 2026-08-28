import React, { useState } from 'react';
import { MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { toast } from '../../store/useToastStore';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Karachi');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    toast.success('Your message has been sent to our Karachi support center.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumb items={[{ label: 'Contact & Helplines' }]} />

      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with SmartCare Support
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Have questions about finding a doctor, booking slots, or joining as a medical practitioner? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Thank you for contacting SmartCare. A patient support representative will reach out to you within 2 hours.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name *"
                  placeholder="e.g. Muhammad Tariq"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Your City in Pakistan
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
                >
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Other">Other City</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Message / Inquiry *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with doctor discovery or appointments?"
                  className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="md" leftIcon={<Send className="w-4 h-4" />}>
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Office & Helpline Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-slate-900">Regional Support Centers</h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0D7A5F]" /> Karachi Head Office
                </span>
                <p>Suite 402, Executive Tower, Clifton Block 4, Karachi</p>
                <p className="text-slate-500">Phone: +92 (21) 3581-2345</p>
              </div>

              <div className="space-y-1 pt-3 border-t border-slate-100">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0D7A5F]" /> Islamabad Regional Hub
                </span>
                <p>Floor 3, Executive Heights, Blue Area, Islamabad</p>
                <p className="text-slate-500">Phone: +92 (51) 289-4567</p>
              </div>
            </div>
          </div>

          <div className="bg-[#084E3D] text-white p-6 rounded-3xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <Phone className="w-4 h-4" /> Emergency Telehealth UAN
            </div>
            <p className="text-xs text-emerald-100/80">
              Direct emergency helpline available 24/7 across Pakistan:
            </p>
            <div className="text-xl font-extrabold text-white pt-1">
              021-111-762-782
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
