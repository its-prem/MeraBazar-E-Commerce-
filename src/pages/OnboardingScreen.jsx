import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Store, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function OnboardingScreen() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center p-6 selection:bg-purple-100 selection:text-purple-900">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-5xl w-full relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">MarketPlace</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose how you want to interact with our platform. Join as a buyer to explore products or as a seller to grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* BUYER CARD */}
          <div
            onMouseEnter={() => setHoveredCard('buyer')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/login")}
            className={`
              relative group bg-white/80 backdrop-blur-xl border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 ease-out
              ${hoveredCard === 'buyer' 
                ? 'border-emerald-500 shadow-2xl shadow-emerald-100 -translate-y-2' 
                : 'border-white shadow-xl hover:border-emerald-200'}
            `}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="w-8 h-8 text-emerald-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2">I want to Buy</h2>
                <p className="text-slate-500 mb-6">Discover millions of products from trusted sellers worldwide.</p>
                
                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {['Curated Collections', 'Secure Payments', 'Fast Delivery'].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevents double firing if parent has onClick
                  navigate("/login");
                }}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-200"
              >
                Continue as Buyer
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* SELLER CARD */}
          <div
            onMouseEnter={() => setHoveredCard('seller')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/seller")}
            className={`
              relative group bg-white/80 backdrop-blur-xl border-2 rounded-3xl p-8 cursor-pointer transition-all duration-300 ease-out
              ${hoveredCard === 'seller' 
                ? 'border-blue-500 shadow-2xl shadow-blue-100 -translate-y-2' 
                : 'border-white shadow-xl hover:border-blue-200'}
            `}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Store className="w-8 h-8 text-blue-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2">I want to Sell</h2>
                <p className="text-slate-500 mb-6">Setup your store in minutes and reach customers globally.</p>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {['Zero Commission', 'Analytics Dashboard', '24/7 Support'].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600">
                      <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/seller");
                }}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-200"
              >
                Continue as Seller
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center">
          <p className="text-slate-500 flex items-center justify-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4" />
            Secure & Encrypted Connection
          </p>
        </div>

      </div>
    </div>
  );
}
