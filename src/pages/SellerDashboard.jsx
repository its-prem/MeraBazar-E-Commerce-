import React, { useState } from 'react';
import { Plus, TrendingUp, Package, ShoppingBag, DollarSign, Users, Edit, Trash2, Eye, BarChart3, Store, MapPin } from 'lucide-react';

export default function SellerDashboard({ onAddProduct }) {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      id: 1, 
      label: 'Total Sales', 
      value: '₹45,230', 
      change: '+12%', 
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    { 
      id: 2, 
      label: 'Total Orders', 
      value: '234', 
      change: '+8%', 
      icon: ShoppingBag, 
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    { 
      id: 3, 
      label: 'Products', 
      value: '48', 
      change: '+3', 
      icon: Package, 
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    { 
      id: 4, 
      label: 'Customers', 
      value: '892', 
      change: '+15%', 
      icon: Users, 
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-orange-50 to-amber-50'
    }
  ];

  const products = [
    { id: 1, name: 'Fresh Tomatoes', price: 40, stock: 50, sales: 125, image: '🍅', status: 'active' },
    { id: 2, name: 'Red Apples', price: 120, stock: 30, sales: 89, image: '🍎', status: 'active' },
    { id: 3, name: 'Milk (Full Cream)', price: 60, stock: 0, sales: 234, image: '🥛', status: 'out-of-stock' },
    { id: 4, name: 'Fresh Paneer', price: 80, stock: 25, sales: 67, image: '🧈', status: 'active' },
    { id: 5, name: 'Chocolate Cookies', price: 40, stock: 90, sales: 156, image: '🍪', status: 'active' },
    { id: 6, name: 'Coca Cola', price: 40, stock: 60, sales: 201, image: '🥤', status: 'active' }
  ];

  const recentOrders = [
    { id: 'ORD001', customer: 'Rahul Sharma', items: 3, amount: 340, status: 'delivered', time: '2 hrs ago' },
    { id: 'ORD002', customer: 'Priya Singh', items: 5, amount: 580, status: 'pending', time: '3 hrs ago' },
    { id: 'ORD003', customer: 'Amit Kumar', items: 2, amount: 200, status: 'packed', time: '5 hrs ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-white/90">Welcome back, Fresh Mart! 👋</p>
          </div>
          <button className="bg-white/20 backdrop-blur-md p-3 rounded-2xl hover:bg-white/30 transition-all">
            <Store className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/20 transition-all">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-white/80 text-sm mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <span className="text-green-300 text-xs font-semibold bg-green-500/20 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Sales Chart */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Sales Analytics</h3>
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const values = [60, 75, 85, 70, 90, 95, 80];
                  return (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-8">{day}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-1000"
                          style={{ width: `${values[index]}%` }}
                        >
                          ₹{(values[index] * 50).toFixed(0)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shop Profile */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Shop Profile</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center text-4xl mr-4">
                  🏪
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Fresh Mart Grocery</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>Bistupur, Jamshedpur</span>
                  </div>
                </div>
                <button className="bg-purple-50 text-purple-600 px-4 py-2 rounded-xl font-semibold hover:bg-purple-100 transition-all">
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">4.5 ⭐</p>
                  <p className="text-xs text-gray-600">Shop Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">892</p>
                  <p className="text-xs text-gray-600">Total Customers</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Products Grid */}
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {product.image}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{product.name}</h4>
                        <p className="text-sm text-gray-500">₹{product.price}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status === 'active' ? 'Active' : 'Out of Stock'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                      <span>Stock: {product.stock}</span>
                      <span>•</span>
                      <span>Sales: {product.sales}</span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-purple-50 text-purple-600 py-2 rounded-xl font-semibold hover:bg-purple-100 transition-all flex items-center justify-center">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl font-semibold hover:bg-blue-100 transition-all flex items-center justify-center">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-100 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">{order.customer}</h4>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'packed' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{order.items} items • {order.time}</span>
                  <span className="text-lg font-bold text-gray-900">₹{order.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Product Button */}
      <button
        onClick={onAddProduct}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all animate-bounce"
      >
        <Plus className="w-8 h-8" />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}