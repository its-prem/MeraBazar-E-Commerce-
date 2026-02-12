import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, Tag, MapPin, Clock, ShoppingBag } from 'lucide-react';

export default function CartPage({ onBack, onCheckout }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Fresh Tomatoes', price: 40, quantity: 2, unit: 'kg', image: '🍅', shop: 'Fresh Mart' },
    { id: 2, name: 'Red Apples', price: 120, quantity: 1, unit: 'kg', image: '🍎', shop: 'Fresh Mart' },
    { id: 3, name: 'Milk (Full Cream)', price: 60, quantity: 3, unit: 'ltr', image: '🥛', shop: 'Fresh Mart' },
    { id: 4, name: 'Chocolate Cookies', price: 40, quantity: 2, unit: 'pack', image: '🍪', shop: 'Fresh Mart' }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, change) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? {...item, quantity: Math.max(1, item.quantity + change)}
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      setAppliedPromo({ code: 'SAVE20', discount: 20, type: 'percentage' });
    } else if (promoCode.toUpperCase() === 'FLAT50') {
      setAppliedPromo({ code: 'FLAT50', discount: 50, type: 'flat' });
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 300 ? 0 : 30;
  const discount = appliedPromo 
    ? appliedPromo.type === 'percentage' 
      ? (subtotal * appliedPromo.discount / 100) 
      : appliedPromo.discount
    : 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-xl transition-all mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">My Cart</h1>
        </div>
        <p className="text-white/90">{cartItems.length} items in your cart</p>
      </div>

      {/* Delivery Address */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Deliver to Home</h3>
                <p className="text-sm text-gray-600">Bistupur, Jamshedpur, 831001</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Delivery in 15-20 mins</span>
                </div>
              </div>
            </div>
            <button className="text-purple-600 text-sm font-semibold">Change</button>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Items from Fresh Mart</h2>
        <div className="space-y-3">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                  {item.image}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.unit}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-1 shadow-md">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-white/20 rounded-lg hover:bg-white/30 flex items-center justify-center font-bold transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-white/20 rounded-lg hover:bg-white/30 flex items-center justify-center font-bold transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Code */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center mb-3">
            <Tag className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Apply Promo Code</h3>
          </div>
          
          {appliedPromo ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-700">{appliedPromo.code} Applied!</p>
                  <p className="text-sm text-green-600">You saved ₹{Math.round(discount)}</p>
                </div>
              </div>
              <button 
                onClick={() => setAppliedPromo(null)}
                className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg font-semibold text-sm transition-all"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              />
              <button
                onClick={applyPromo}
                disabled={!promoCode}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  promoCode
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Apply
              </button>
            </div>
          )}

          <div className="mt-3 flex gap-2 flex-wrap">
            <button className="text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded-lg font-semibold">
              SAVE20
            </button>
            <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-semibold">
              FLAT50
            </button>
          </div>
        </div>
      </div>

      {/* Bill Details */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Bill Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Item Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount</span>
                <span>- ₹{Math.round(discount)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-900 text-base">
              <span>To Pay</span>
              <span>₹{Math.round(total)}</span>
            </div>
          </div>
          {subtotal < 300 && (
            <p className="text-xs text-gray-500 mt-2 bg-yellow-50 p-2 rounded-lg">
              Add items worth ₹{300 - subtotal} more for FREE delivery
            </p>
          )}
        </div>
      </div>

      {/* Bottom Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 rounded-t-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">₹{Math.round(total)}</p>
          </div>
          <button 
            onClick={onCheckout}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center"
          >
            Proceed to Checkout
            <ShoppingBag className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}