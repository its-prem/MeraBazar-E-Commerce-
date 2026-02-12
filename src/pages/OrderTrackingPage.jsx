import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, CheckCircle, Truck, MapPin, Phone, MessageCircle, Clock } from 'lucide-react';

export default function OrderTrackingPage({ onBack }) {
  const [currentStep, setCurrentStep] = useState(2);

  const orderSteps = [
    { 
      id: 1, 
      status: 'Order Confirmed', 
      icon: CheckCircle, 
      time: '2:30 PM',
      description: 'Your order has been confirmed',
      completed: true
    },
    { 
      id: 2, 
      status: 'Order Packed', 
      icon: Package, 
      time: '2:45 PM',
      description: 'Seller is packing your items',
      completed: true
    },
    { 
      id: 3, 
      status: 'Out for Delivery', 
      icon: Truck, 
      time: 'Expected 3:15 PM',
      description: 'Your order is on the way',
      completed: false
    },
    { 
      id: 4, 
      status: 'Delivered', 
      icon: MapPin, 
      time: 'Estimated 3:30 PM',
      description: 'Order will be delivered',
      completed: false
    }
  ];

  const orderDetails = {
    orderId: 'MB2024112345',
    date: 'Nov 30, 2024',
    items: [
      { name: 'Fresh Tomatoes', quantity: 2, price: 80, image: '🍅' },
      { name: 'Red Apples', quantity: 1, price: 120, image: '🍎' },
      { name: 'Milk (Full Cream)', quantity: 3, price: 180, image: '🥛' }
    ],
    shop: {
      name: 'Fresh Mart Grocery',
      phone: '+91 9876543210',
      image: '🏪'
    },
    delivery: {
      address: 'Bistupur Main Road, Jamshedpur, 831001',
      rider: 'Rahul Kumar',
      phone: '+91 9999888877'
    },
    total: 380
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-xl transition-all mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Track Order</h1>
            <p className="text-white/90 text-sm">Order ID: {orderDetails.orderId}</p>
          </div>
        </div>
      </div>

      {/* Animated Delivery Truck */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="text-6xl animate-bounce">🚚</div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {orderSteps[currentStep - 1].status}
          </h2>
          <p className="text-gray-600">{orderSteps[currentStep - 1].description}</p>
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Expected by {orderSteps[currentStep - 1].time}</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="font-bold text-gray-800 mb-6">Order Status</h3>
          <div className="space-y-6">
            {orderSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index + 1 === currentStep;
              const isCompleted = index + 1 < currentStep;
              
              return (
                <div key={step.id} className="relative flex items-start">
                  {/* Connecting Line */}
                  {index < orderSteps.length - 1 && (
                    <div 
                      className={`absolute left-5 top-12 w-0.5 h-16 transition-all duration-500 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                  
                  {/* Icon */}
                  <div 
                    className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-green-500 shadow-lg shadow-green-200' 
                        : isActive
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-200 animate-pulse'
                          : 'bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isCompleted || isActive ? 'text-white' : 'text-gray-400'}`} />
                  </div>

                  {/* Content */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-semibold ${isCompleted || isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                          {step.status}
                        </h4>
                        <p className={`text-sm ${isCompleted || isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.description}
                        </p>
                      </div>
                      <span className={`text-xs ${isCompleted ? 'text-green-600' : isActive ? 'text-purple-600' : 'text-gray-400'}`}>
                        {step.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Delivery Details</h3>
          
          {/* Delivery Address */}
          <div className="flex items-start mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Delivery Address</h4>
              <p className="text-sm text-gray-600">{orderDetails.delivery.address}</p>
            </div>
          </div>

          {/* Delivery Person */}
          {currentStep >= 3 && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-2xl mr-3">
                    🛵
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{orderDetails.delivery.rider}</h4>
                    <p className="text-sm text-gray-600">Delivery Partner</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                    <Phone className="w-5 h-5 text-green-600" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Order Items</h3>
            <span className="text-sm text-gray-500">{orderDetails.items.length} items</span>
          </div>
          
          <div className="space-y-3">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-2xl mr-3">
                    {item.image}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
            <p className="font-bold text-gray-800">Total Amount</p>
            <p className="text-xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ₹{orderDetails.total}
            </p>
          </div>
        </div>
      </div>

      {/* Shop Details */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center text-3xl mr-3">
                {orderDetails.shop.image}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{orderDetails.shop.name}</h4>
                <p className="text-sm text-gray-600">{orderDetails.shop.phone}</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all">
              Call
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}