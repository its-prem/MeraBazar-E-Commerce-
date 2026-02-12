import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Wallet, DollarSign, Check, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from './CartContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const appliedPromo = location.state?.appliedPromo;

  const {
    cartItems,
    getCartTotal,
    getDeliveryFee,
    getDiscount,
    getFinalTotal,
    placeOrder,
    isLoading
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [customerDetails, setCustomerDetails] = useState({
    name: 'Rahul Kumar',
    phone: '+91 9876543210',
    email: 'rahul@example.com',
    address: 'Bistupur Main Road, Jamshedpur, Jharkhand - 831001'
  });

  const subtotal = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const discount = getDiscount(appliedPromo?.code);
  const total = getFinalTotal(appliedPromo?.code);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderData = {
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      customerEmail: customerDetails.email,
      address: customerDetails.address,
      paymentMethod: paymentMethod,
      promoCode: appliedPromo?.code
    };

    const result = await placeOrder(orderData);

    if (result.success) {
      if (paymentMethod === 'online') {
        // For online payment, you would redirect to Cashfree payment page
        // window.location.href = result.order.paymentDetails.paymentLink;
        
        // For demo, just show success
        navigate('/order-success', { 
          state: { 
            orderId: result.order.orderId,
            paymentMethod: 'online' 
          } 
        });
      } else {
        // For COD, go directly to success page
        navigate('/order-success', { 
          state: { 
            orderId: result.order.orderId,
            paymentMethod: 'cod' 
          } 
        });
      }
    } else {
      alert('Order placement failed: ' + result.error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add items to place an order!</p>
          <button
            onClick={() => navigate('/home')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate('/cart')} className="p-2 hover:bg-white/20 rounded-xl transition-all mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
        <p className="text-white/90">Review and place your order</p>
      </div>

      {/* Delivery Address */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center">
              <MapPin className="w-5 h-5 text-purple-600 mr-2" />
              Delivery Address
            </h3>
            <button className="text-purple-600 text-sm font-semibold">Edit</button>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
            <p className="font-semibold text-gray-800 mb-1">{customerDetails.name}</p>
            <p className="text-sm text-gray-600 mb-1">{customerDetails.phone}</p>
            <p className="text-sm text-gray-600">{customerDetails.address}</p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
          
          <div className="space-y-3 mb-4">
            {cartItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{item.image}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
              </div>
            ))}
            {cartItems.length > 3 && (
              <p className="text-sm text-purple-600 font-semibold">+{cartItems.length - 3} more items</p>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
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
                <span>Discount ({appliedPromo?.code})</span>
                <span>- ₹{Math.round(discount)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span>₹{Math.round(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
            Payment Method
          </h3>

          <div className="space-y-3">
            {/* Cash on Delivery */}
            <label 
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                paymentMethod === 'cod' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-purple-600"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-bold text-gray-800">Cash on Delivery</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Pay when you receive your order</p>
              </div>
              {paymentMethod === 'cod' && (
                <Check className="w-5 h-5 text-purple-600" />
              )}
            </label>

            {/* Online Payment */}
            <label 
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                paymentMethod === 'online' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-purple-600"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-bold text-gray-800">Online Payment</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">UPI, Cards, Netbanking</p>
                <div className="flex items-center mt-2 text-xs text-gray-600">
                  <span className="mr-2">Powered by</span>
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-0.5 rounded font-bold">
                    Cashfree
                  </span>
                </div>
              </div>
              {paymentMethod === 'online' && (
                <Check className="w-5 h-5 text-purple-600" />
              )}
            </label>
          </div>

          {paymentMethod === 'online' && (
            <div className="mt-4 flex items-start gap-2 text-xs text-blue-700 bg-blue-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>You will be redirected to secure payment gateway to complete your payment</p>
            </div>
          )}
        </div>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 rounded-t-3xl shadow-2xl">
        <button 
          onClick={handlePlaceOrder}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Place Order • ₹{Math.round(total)}
              <Check className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
        
        <p className="text-center text-xs text-gray-500 mt-3">
          By placing order, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
}