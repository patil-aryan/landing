import { useState, FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { addSubscriberToMailchimp } from '../lib/mailchimp';
import type { SubscribeFormData, Subscriber } from '../types/subscriber';

interface SubscribeFormProps {
  variant?: 'hero' | 'footer';
}

export function SubscribeForm({ variant = 'hero' }: SubscribeFormProps) {
  const [formData, setFormData] = useState<SubscribeFormData>({
    email: '',
    firstName: '',
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
      button: "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
    },
    footer: {
      input: "flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white/10 text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base w-full",
      button: "bg-white"
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-white/5 rounded-xl p-1.5">
      {error && (
        <div className="p-4 bg-red-50/20 backdrop-blur-md rounded-lg text-white absolute -top-16 left-0 right-0">
          <p>{error}</p>
        </div>
      )}

      <div className="relative flex-1">
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

      <div className="hidden">
        <input
          type="text"
          id="firstName"
          placeholder="First name (optional)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.firstName}
          onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
        />
      </div>

      <button 
        type="submit"
        disabled={loading}
        className={`${styles[variant].button} px-6 sm:px-8 py-3 sm:py-4 rounded-lg w-full sm:w-auto ${
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
