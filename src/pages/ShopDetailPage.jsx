import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Phone, Heart, Share2, Search, ShoppingCart, Plus } from 'lucide-react';

export default function ShopDetailPage({ onBack, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const shop = {
    name: 'Fresh Mart Grocery',
    rating: 4.5,
    reviews: 1250,
    distance: '0.5 km',
    deliveryTime: '15-20 min',
    status: 'open',
    phone: '+91 9876543210',
    address: 'Bistupur Main Road, Jamshedpur',
    banner: '🏪',
    offer: '20% OFF on orders above ₹500'
  };

  const categories = [
    { id: 'all', name: 'All Items', count: 48 },
    { id: 'vegetables', name: 'Vegetables', count: 12 },
    { id: 'fruits', name: 'Fruits', count: 10 },
    { id: 'dairy', name: 'Dairy', count: 8 },
    { id: 'snacks', name: 'Snacks', count: 15 },
    { id: 'beverages', name: 'Beverages', count: 3 }
  ];

  const products = [
    { id: 1, name: 'Fresh Tomatoes', category: 'vegetables', price: 40, unit: 'kg', image: '🍅', stock: 50, discount: 10 },
    { id: 2, name: 'Green Capsicum', category: 'vegetables', price: 60, unit: 'kg', image: '🫑', stock: 30, discount: 0 },
    { id: 3, name: 'Fresh Bananas', category: 'fruits', price: 50, unit: 'dozen', image: '🍌', stock: 100, discount: 5 },
    { id: 4, name: 'Red Apples', category: 'fruits', price: 120, unit: 'kg', image: '🍎', stock: 40, discount: 15 },
    { id: 5, name: 'Milk (Full Cream)', category: 'dairy', price: 60, unit: 'ltr', image: '🥛', stock: 80, discount: 0 },
    { id: 6, name: 'Fresh Paneer', category: 'dairy', price: 80, unit: '250g', image: '🧈', stock: 25, discount: 10 },
    { id: 7, name: 'Lays Chips', category: 'snacks', price: 20, unit: 'pack', image: '🍟', stock: 150, discount: 0 },
    { id: 8, name: 'Chocolate Cookies', category: 'snacks', price: 40, unit: 'pack', image: '🍪', stock: 90, discount: 5 },
    { id: 9, name: 'Coca Cola', category: 'beverages', price: 40, unit: '750ml', image: '🥤', stock: 60, discount: 0 },
  ];

  const filteredProducts = products.filter(product => 
    (activeCategory === 'all' || product.category === activeCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
      }
      return [...prev, {...product, quantity: 1}];
    });
  };

  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (productId, change) => {
    setCart(prev => {
      const updated = prev.map(item => 
        item.id === productId 
          ? {...item, quantity: Math.max(0, item.quantity + change)}
          : item
      );
      return updated.filter(item => item.quantity > 0);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-xl transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:bg-white/20 rounded-xl transition-all"
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-xl transition-all">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Shop Banner */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl text-6xl mb-4">
            {shop.banner}
          </div>
          <h1 className="text-2xl font-bold mb-2">{shop.name}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{shop.rating} ({shop.reviews})</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{shop.distance}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{shop.deliveryTime}</span>
            </div>
          </div>
        </div>

        {/* Offer Banner */}
        {shop.offer && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-3 rounded-2xl text-center font-semibold shadow-lg">
            🎉 {shop.offer}
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-md'
              }`}
            >
              {cat.name} <span className="ml-1 opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => {
            const quantity = getProductQuantity(product.id);
            const discountedPrice = product.discount > 0 
              ? product.price - (product.price * product.discount / 100)
              : product.price;

            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="p-4">
                  <div className="text-6xl text-center mb-3">{product.image}</div>
                  
                  {product.discount > 0 && (
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg inline-block mb-2">
                      {product.discount}% OFF
                    </div>
                  )}
                  
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.unit}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-lg font-bold text-gray-900">₹{discountedPrice}</p>
                      {product.discount > 0 && (
                        <p className="text-xs text-gray-400 line-through">₹{product.price}</p>
                      )}
                    </div>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                      {product.stock} left
                    </span>
                  </div>

                  {quantity === 0 ? (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-8 h-8 bg-white/20 rounded-lg hover:bg-white/30 font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-8 h-8 bg-white/20 rounded-lg hover:bg-white/30 font-bold"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-3xl p-4 shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{cart.reduce((sum, item) => sum + item.quantity, 0)} items</p>
              <p className="text-xl font-bold">
                ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
              </p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-bold hover:shadow-xl transition-all flex items-center">
              View Cart
              <ShoppingCart className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}