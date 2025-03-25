import { useState, FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { addSubscriberToBrevo } from '../lib/brevo';
import { toast } from 'sonner';
import type { SubscribeFormData, Subscriber } from '../types/subscriber';

interface SubscribeFormProps {
  variant?: 'hero' | 'footer';
}

export function SubscribeForm({ variant = 'hero' }: SubscribeFormProps) {
  const [formData, setFormData] = useState<SubscribeFormData>({
    email: '',
    firstName: '',
    jobRole: '',
    organizationSize: undefined,
    consent: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const signupData = {
        email: formData.email,
        first_name: formData.firstName,
        job_role: formData.jobRole,
        organization_size: formData.organizationSize,
        status: 'pending'
      };

      const { error: supabaseError } = await supabase
        .from('beta_signups')
        .insert([signupData])
        .select();

      if (supabaseError) {
        if (supabaseError?.message?.includes('violates unique constraint')) {
          throw new Error('This email is already registered for early access.');
        }
        throw new Error('Unable to complete registration. Please try again later.');
      }

      try {
        const subscriber: Subscriber = {
          email: formData.email,
          first_name: formData.firstName,
          job_role: formData.jobRole,
          organization_size: formData.organizationSize,
          status: 'pending'
        };

        await addSubscriberToBrevo(subscriber);
      } catch {
        // Even if Brevo fails, we've saved to our DB, so don't throw
      }

      toast.success('Thank you for subscribing!', {
        duration: 5000,
        className: variant === 'hero' 
          ? "bg-gradient-to-r from-blue-100/90 to-purple-100/90 border-2 border-green-500/20 text-gray-900 backdrop-blur" 
          : "bg-green-500/10 border border-green-500/20 text-white backdrop-blur",
        description: variant === 'hero'
          ? <span className="text-white/80">Please check your email for a confirmation message.</span>
          : <span className="text-white/80">Please check your email for a confirmation message.</span>,
      });
      setSuccess(true);
      setFormData({
        email: '',
        firstName: '',
        jobRole: '',
        organizationSize: undefined,
        consent: true,
      });
      } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      toast.error(errorMessage, {
        duration: 5000,
        className: variant === 'hero'
          ? "bg-gradient-to-r from-red-100/90 to-pink-100/90 border-2 border-red-500/20 text-gray-900 backdrop-blur font-medium"
          : "bg-red-500/10 border border-red-500/20 text-white backdrop-blur",
        style: variant === 'hero' ? {
          color: '#B91C1C',
          fontWeight: 500
        } : undefined
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return variant === 'hero' ? (
      <div className="backdrop-blur-xl bg-gradient-to-r from-blue-100/90 to-purple-100/90 p-6 rounded-xl text-gray-900 text-center border-2 border-green-500/20 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="relative">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
          </div>
          <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">You're on the list!</p>
          <p className="text-sm text-gray-600 mt-3">We will update you soon with the beta access.</p>
        </div>
      </div>
    ) : (
      <div className="bg-green-50/20 backdrop-blur-md p-6 rounded-xl text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
        <div className="relative">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
          </div>
          <p className="text-xl font-semibold">You're on the list!</p>
          <p className="text-sm text-white/80 mt-3">We will update you soon with the beta access.</p>
        </div>
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white/5 rounded-xl p-4 max-w-2xl mx-auto w-full">
      {error && variant === 'hero' ? (
        <div className="p-4 bg-gradient-to-r from-red-100/90 to-pink-100/90 rounded-lg text-gray-900 mb-3 border-2 border-red-500/20">
          <p className="font-medium flex items-center gap-2">
            <span className="text-red-600 text-lg">⚠</span>
            <span className="text-red-700">{error}</span>
          </p>
        </div>
      ) : error && (
        <div className="p-4 bg-red-500/10 backdrop-blur-md rounded-lg text-white mb-3 border border-red-500/20">
          <p className="font-medium flex items-center gap-2">
            <span className="text-red-300">⚠</span>
            {error}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
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

      <div className="w-full relative">
        <select
          id="organizationSize"
          required
          className={styles[variant].select}
          value={formData.organizationSize || ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, organizationSize: e.target.value as Subscriber['organization_size'] }))}
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
                <span className={`h-4 w-4 border-2 border-r-transparent rounded-full animate-spin ${variant === 'hero' ? 'border-white' : 'border-blue-600'}`}></span>
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
    </form>
  );
}
