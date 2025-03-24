import React, { useState } from 'react';
import { Sparkles, Puzzle, ArrowRight, Clock, Database, Timer, MessageSquareMore, FileSearch, Zap } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { data: existingSignup } = await supabase
        .from('beta_signups')
        .select('email')
        .eq('email', email)
        .single();

      if (existingSignup) {
        toast.error('This email is already registered for beta access!');
        return;
      }

      const { error } = await supabase
        .from('beta_signups')
        .insert([{ email, status: 'pending' }]);

      if (error) throw error;

      toast.success('Thanks for signing up! Check your email for confirmation.');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSignup = () => {
    const element = document.querySelector('#signup-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,#4f46e520,transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,#6366f120,transparent_50%)] pointer-events-none"></div>
      <Toaster position="top-center" theme="system" closeButton richColors />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="backdrop-blur-md bg-white/60 rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm border border-white/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 blur opacity-20 rounded-lg"></div>
                <Sparkles className="w-7 h-7 text-blue-600 relative" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">iPersona</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-gray-600">Features</a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm">
                Early Access
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-14"></div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-28 pb-12">
        <div className="relative">
          <div className="absolute top-20 -left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="text-center relative">
            <div className="inline-flex items-center backdrop-blur-xl bg-white/40 px-4 py-2 rounded-xl mb-8 border border-white/30 shadow-md">
              <div className="mr-2 relative">
                <div className="absolute inset-0 bg-blue-600/20 blur opacity-20 rounded-lg"></div>
                <Sparkles className="w-4 h-4 text-blue-600 relative" />
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI-Powered Strategic Intelligence</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Transform Your Textual Enterprise Noise<br />
              into <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Actionable Priorities</span>
            </h1>

            <p className="text-base text-gray-600/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our AI platform analyzes your organization's conversations and data,
              turning scattered information into clear, actionable business objectives
            </p>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
              {[
                {
                  icon: <MessageSquareMore className="w-5 h-5 text-blue-600" />,
                  title: "Collects Insights",
                  desc: "Seamlessly gathers data from meetings, chats, and documents"
                },
                {
                  icon: <FileSearch className="w-5 h-5 text-blue-600" />,
                  title: "Analyzes Context",
                  desc: "Identifies key themes and strategic opportunities"
                },
                {
                  icon: <Zap className="w-5 h-5 text-blue-600" />,
                  title: "Prioritizes Action",
                  desc: "Delivers clear, data-driven strategic recommendations"
                }
              ].map((item, i) => (
                <div key={i} className="backdrop-blur-xl bg-white/30 px-8 py-10 rounded-2xl relative border border-white/30">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-3 mt-4">{item.title}</h3>
                  <p className="text-sm text-gray-600/90">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button 
              onClick={scrollToSignup}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center mx-auto text-sm"
            >
              Start Prioritizing Smarter
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6">
          <div className="text-center relative mb-16">
            <div className="inline-flex items-center backdrop-blur-xl bg-white/40 px-4 py-2 rounded-xl mb-8 border border-white/30 shadow-md">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Powerful Capabilities</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Smart Features That <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transform</span><br />
              Communication into Action
            </h2>
            
            <p className="text-base text-gray-600/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our AI platform helps your team focus on what matters by turning everyday communication into strategic insights and clear priorities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Database className="w-10 h-10 text-blue-600 mb-4 relative" />,
                sparkle: true,
                title: "Smart Data Processing",
                desc: "Seamlessly processes conversations and documents to extract meaningful insights and identify emerging priorities."
              },
              {
                icon: <Sparkles className="w-10 h-10 text-blue-600 mb-4 relative" />,
                title: "Strategic Analysis",
                desc: "Fine-Tuned AI model identifies key business priorities and opportunities overlooked within your organization's daily communications."
              },
              {
                icon: <Puzzle className="w-10 h-10 text-blue-600 mb-4 relative" />,
                title: "Custom Framework",
                desc: "Tailor the platform to your organization's unique goals and KPIs for more relevant and impactful strategic recommendations."
              },
              {
                icon: <Timer className="w-10 h-10 text-blue-600 mb-4 relative" />,
                title: "Rapid Results",
                desc: "Transform your decision-making process from weeks to hours with AI-powered insights and clear action items."
              }
            ].map((item, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/30 p-8 rounded-xl shadow border border-white/30 relative overflow-hidden">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 blur opacity-50"></div>
                  {item.icon}
                  {item.sparkle && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-blue-600" />
                    </div>
                  )}
                </div>
                <h3 className="text-base font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div id="signup-section" className="container mx-auto px-6 py-20">
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-purple-700/90 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1 text-sm text-blue-100 backdrop-blur-sm border border-white/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-200"></span>
              </span>
              Limited Beta Access
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              Transform Your <span className="text-blue-200">Business Communication</span><br />
              Into Strategic Success
            </h2>
            
            <p className="text-blue-100 text-base mb-10 max-w-xl mx-auto">
              Join forward-thinking innovators shaping the future of strategic decision-making
            </p>

            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl max-w-xl mx-auto border border-white/20">
              <form onSubmit={handleSubmit} className="flex gap-3 bg-white/5 rounded-xl p-1.5">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-lg bg-white/10 text-white placeholder-blue-200/70 focus:outline-none focus:ring-2 focus:ring-white/30 text-base"
                  required
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`bg-white px-8 py-4 rounded-lg ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold inline-flex items-center gap-2">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-blue-600 border-r-transparent rounded-full animate-spin"></span>
                        Please wait...
                      </div>
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>

            <div className="flex items-center justify-center gap-8 mt-10">
              {[
                'Instant Access',
                'Free for Beta Users',
                'Cancel Anytime'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-blue-100/90 text-sm">
                  <Sparkles className="w-4 h-4" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
