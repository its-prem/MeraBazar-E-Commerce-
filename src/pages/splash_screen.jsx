import React, { useEffect, useState } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setScale(1), 100);
    setTimeout(() => setOpacity(1), 300);

    // AUTO MOVE TO ONBOARDING PAGE AFTER 3 SECONDS
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center relative overflow-hidden">

      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-8">
        <div 
          className="mb-8 transform transition-all duration-1000 ease-out"
          style={{ transform: `scale(${scale})`, opacity }}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <ShoppingBag className="w-24 h-24 text-purple-600" strokeWidth={2.5} />
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 animate-bounce">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div 
          className="transform transition-all duration-1000 delay-300"
          style={{ opacity }}
        >
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Mera<span className="text-yellow-300">Bazar</span>
          </h1>

          <p className="text-xl text-white/90 font-medium mb-2">
            Your Local Market, Now Online!
          </p>
          <p className="text-sm text-white/70">
            Connecting Local Sellers & Buyers
          </p>
        </div>

        <div 
          className="mt-12 transform transition-all duration-1000 delay-500"
          style={{ opacity }}
        >
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
