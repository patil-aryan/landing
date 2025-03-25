
import { Sparkles, Puzzle, Clock, Database, Timer, MessageSquareMore, FileSearch, Zap } from 'lucide-react';
import { Toaster } from 'sonner';
import { SubscribeForm } from './components/SubscribeForm';

function App() {
  const scrollToSignup = () => {
    const element = document.querySelector('#signup-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,#4f46e520,transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,#6366f120,transparent_50%)] pointer-events-none"></div>
      <Toaster 
        position="top-center" 
        theme="dark" 
        closeButton 
        richColors
        toastOptions={{
        }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="backdrop-blur-md bg-white/60 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center shadow-sm border border-white/20">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 blur opacity-20 rounded-lg"></div>
                <Sparkles className="w-6 sm:w-7 h-6 sm:h-7 text-blue-600 relative" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Lumos</span>
            </button>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#features" className="text-gray-600 text-sm sm:text-base">Features</a>
              <button 
                onClick={scrollToSignup}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium"
              >
                Early Access
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-10"></div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 pt-10 sm:pt-14 md:pt-16 pb-6">
        <div className="relative">
          <div className="absolute top-20 -left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="text-center relative">
            <div className="inline-flex items-center backdrop-blur-xl bg-white/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl mb-6 sm:mb-8 border border-white/30 shadow-md">
              <div className="mr-2 relative">
                <div className="absolute inset-0 bg-blue-600/20 blur opacity-20 rounded-lg"></div>
                <Sparkles className="w-4 h-4 text-blue-600 relative" />
              </div>
              <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI-Powered Strategic Intelligence</span>
            </div>
            
            <h1 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-[1.15] sm:leading-tight tracking-tight bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent px-4 sm:px-0">
              Transform Your Textual Enterprise Noise
              <br className="hidden sm:block" /> into{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Actionable Priorities
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Our AI platform analyzes your organization's conversations and data,
              turning scattered information into clear, actionable business objectives
            </p>

            <div className="max-w-xl mx-auto mb-8 px-4 sm:px-0">
              <SubscribeForm variant="hero" />

              
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-0 max-w-5xl mx-auto px-4 sm:px-6">
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
                <div key={i} className="backdrop-blur-xl bg-white/30 px-6 sm:px-8 py-8 sm:py-10 rounded-2xl relative border border-white/30">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 mt-4">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600/90">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative py-6 sm:py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center relative mb-12">
            <div className="inline-flex items-center backdrop-blur-xl bg-white/40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl mb-4 sm:mb-6 border border-white/30 shadow-md">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Powerful Capabilities</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-[1.15] sm:leading-tight bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent px-4 sm:px-0">
              Smart Features That <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transform</span><br />
              Communication into Action
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600/90 mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Our AI platform helps your team focus on what matters by turning everyday communication into strategic insights and clear priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
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
              <div key={i} className="backdrop-blur-xl bg-white/30 p-6 sm:p-8 rounded-xl shadow border border-white/30 relative overflow-hidden">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 blur opacity-50"></div>
                  {item.icon}
                  {item.sparkle && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-blue-600" />
                    </div>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-2 sm:mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div id="signup-section" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-purple-700/90 rounded-xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm text-blue-100 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-200"></span>
              </span>
              Signup for Beta Access
            </span>

            <h2 className="text-[28px] sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight sm:leading-[1.2] tracking-tight max-w-3xl mx-auto mb-6">
              <div className="space-y-1 sm:space-y-2 md:space-y-3">
                <div>Transform Your</div>
                <div className="text-blue-200">Business Communication</div>
                <div>Into Strategic Success</div>
              </div>
            </h2>
            
            <p className="text-blue-100 text-sm sm:text-base mb-6 sm:mb-10 max-w-xl mx-auto px-4 sm:px-0">
              Join forward-thinking innovators shaping the future of strategic decision-making
            </p>

            <SubscribeForm variant="footer" />

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
