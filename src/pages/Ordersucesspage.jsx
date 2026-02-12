import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Clock, MapPin, Home, Receipt } from 'lucide-react';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, paymentMethod } = location.state || {};
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!orderId) {
      navigate('/home');
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
            <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully! 🎉</h1>
          <p className="text-gray-600">Your order has been confirmed</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="text-center mb-6 pb-6 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="text-xl font-bold text-gray-900">{orderId}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Order Confirmed</p>
                <p className="text-sm text-gray-500">Your order is being prepared</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Estimated Delivery</p>
                <p className="text-sm text-gray-500">15-20 minutes</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Delivery Address</p>
                <p className="text-sm text-gray-500">Bistupur, Jamshedpur</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Receipt className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Payment Method</p>
                <p className="text-sm text-gray-500">
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(`/order-tracking/${orderId}`)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center"
          >
            Track Your Order
            <Package className="w-5 h-5 ml-2" />
          </button>

          <button
            onClick={() => navigate('/home')}
            className="w-full bg-white text-gray-800 py-4 rounded-2xl font-bold border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center justify-center"
          >
            Continue Shopping
            <Home className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Auto Redirect Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Redirecting to tracking page in {countdown} seconds...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}