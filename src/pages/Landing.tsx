import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Anchor, Crown, Zap, Users } from "lucide-react";
import onepieceBg from "@/assets/onepiece-bg.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${onepieceBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-20 z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMTEuMDQ1IDguOTU1LTIwIDIwLTIwdjIwSDM2ek0yMCA0NmMwLTExLjA0NSA4Ljk1NS0yMCAyMC0yMHYyMEgyMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-8 bg-accent/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-accent/40">
            <Anchor className="w-6 h-6 text-accent animate-pulse" />
            <span className="text-white font-bold text-lg">Set Sail for Adventure</span>
            <Anchor className="w-6 h-6 text-accent animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 text-white drop-shadow-[0_0_30px_rgba(255,200,0,0.5)] px-4">
            WAF-D-FLE
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-3 sm:mb-4 font-bold drop-shadow-lg px-4">
            King of Waffles
          </p>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Embark on a culinary journey worthy of the Pirate King! The treasure you seek is the perfect waffle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-accent hover:bg-accent/90 text-white font-bold text-lg py-6 px-8 rounded-xl shadow-[0_0_30px_rgba(255,200,0,0.4)] hover:shadow-[0_0_40px_rgba(255,200,0,0.6)] transition-all duration-300 border-2 border-accent/50"
            >
              <Crown className="w-5 h-5 mr-2" />
              Join the Crew
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/dashboard/orders')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/50 font-bold text-lg py-6 px-8 rounded-xl transition-all duration-300"
            >
              <Zap className="w-5 h-5 mr-2" />
              Order Now
            </Button>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-black/30 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-12 sm:mb-16 text-white drop-shadow-lg">
            Why Choose WAF-D-FLE
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-accent/50 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,200,0,0.3)]">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6 border-2 border-accent">
                <Crown className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Premium Quality</h3>
              <p className="text-white/80 text-lg">
                Crafted with the finest ingredients, fit for royalty
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-accent/50 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,200,0,0.3)]">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 border-2 border-primary">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Lightning Fast</h3>
              <p className="text-white/80 text-lg">
                Quick service that rivals the speed of a Gear Second
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-accent/50 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,200,0,0.3)]">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6 border-2 border-red-500">
                <Users className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Nakama Spirit</h3>
              <p className="text-white/80 text-lg">
                Join our crew and become part of the family
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 text-white drop-shadow-lg">
            Ready to Set Sail?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Your adventure begins with a single bite. Join us and discover the treasure of perfect waffles!
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-accent hover:bg-accent/90 text-white font-bold text-xl py-7 px-10 rounded-xl shadow-[0_0_30px_rgba(255,200,0,0.4)] hover:shadow-[0_0_40px_rgba(255,200,0,0.6)] transition-all duration-300 border-2 border-accent/50"
          >
            <Anchor className="w-6 h-6 mr-2" />
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/50 backdrop-blur-sm py-6 sm:py-8 border-t border-white/10 z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70 text-sm md:text-base">
            &copy; 2025 WAF-D-FLE. All rights reserved. The journey continues...
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
