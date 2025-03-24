import { useState, FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { addSubscriberToMailchimp } from '../lib/mailchimp';
import type { SubscribeFormData, Subscriber, OrganizationSize } from '../types/subscriber';

interface SubscribeFormProps {
  variant?: 'hero' | 'footer';
}

export function SubscribeForm({ variant = 'hero' }: SubscribeFormProps) {
  const [formData, setFormData] = useState<SubscribeFormData>({
    email: '',
    firstName: '',
    jobRole: '',
    organizationSize: undefined,
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.consent) {
        throw new Error('Please accept the terms and conditions');
      }

      // Create subscriber in Supabase
      const subscriber: Subscriber = {
        email: formData.email,
        firstName: formData.firstName || undefined,
        jobRole: formData.jobRole || undefined,
        organizationSize: formData.organizationSize || undefined,
        status: 'pending',
      };

      const { data: supabaseData, error: supabaseError } = await supabase
        .from('subscribers')
        .insert([subscriber])
        .select()
        .single();

      if (supabaseError) throw supabaseError;

      // Add to Mailchimp list
      await addSubscriberToMailchimp(subscriber);

      setSuccess(true);
      setFormData({
        email: '',
        firstName: '',
        jobRole: '',
        organizationSize: undefined,
        consent: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50/20 backdrop-blur-md p-4 rounded-lg text-white">
        <p>Thank you for subscribing! Please check your email to confirm your subscription.</p>
      </div>
    );
  }

  const styles = {
    hero: {
      input: "flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-blue-100/90 to-purple-100/90 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm sm:text-base w-full",
      button: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity",
      select: "flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-blue-100/90 to-purple-100/90 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm sm:text-base w-full appearance-none"
    },
    footer: {
      input: "flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base w-full",
      button: "bg-white hover:bg-white/90 transition-opacity",
      select: "flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base w-full appearance-none"
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/5 rounded-xl p-6 max-w-2xl mx-auto w-full">
      {error && (
        <div className="p-4 bg-red-50/20 backdrop-blur-md rounded-lg text-white absolute -top-16 left-0 right-0">
          <p>{error}</p>
        </div>
      )}

      <div className="w-full">
        <input
          type="email"
          id="email"
          required
          placeholder="Enter your email"
          className={styles[variant].input}
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <input
          type="text"
          id="firstName"
          placeholder="Full name"
          required
          className={styles[variant].input}
          value={formData.firstName}
          onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
        />
        
        <input
          type="text"
          id="jobRole"
          placeholder="What is your job role?"
          required
          className={styles[variant].input}
          value={formData.jobRole}
          onChange={(e) => setFormData((prev) => ({ ...prev, jobRole: e.target.value }))}
        />
      </div>

      <div className="w-full relative">
        <select
          id="organizationSize"
          required
          className={styles[variant].select}
          value={formData.organizationSize || ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, organizationSize: e.target.value as OrganizationSize }))}
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
        >
          <option value="" disabled className="text-gray-600">How big is your organisation (approx.)?</option>
          <option value="0-10" className="text-gray-900 bg-white">0-10</option>
          <option value="11-50" className="text-gray-900 bg-white">11-50</option>
          <option value="51-100" className="text-gray-900 bg-white">51-100</option>
          <option value="101-1000" className="text-gray-900 bg-white">101-1000</option>
          <option value="1000+" className="text-gray-900 bg-white">1000+</option>
        </select>
        <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 ${variant === 'footer' ? 'text-white' : 'text-gray-700'}`}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="w-full">
        <button 
          type="submit"
          disabled={loading}
          className={`${styles[variant].button} px-8 py-4 rounded-lg w-full ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <span className={`${variant === 'hero' ? 'text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'} font-semibold inline-flex items-center justify-center gap-2`}>
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-blue-600 border-r-transparent rounded-full animate-spin"></span>
                Please wait...
              </div>
            ) : (
              <>
                Get Early Access
                <ArrowRight className={`w-4 h-4 ${variant === 'hero' ? 'text-white' : 'text-blue-600'}`} />
              </>
            )}
          </span>
        </button>
      </div>

      <input
        type="checkbox"
        id="consent"
        className="hidden"
        checked={formData.consent}
        onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
      />
    </form>
  );
}
