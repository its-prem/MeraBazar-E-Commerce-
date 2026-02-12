import React, { useState, useEffect } from 'react';
import { 
  MapPin, Search, ShoppingCart, Heart, User, Star, Filter, 
  ChevronDown, Plus, Clock, Truck, ShieldCheck, Zap, X,
  Minus, Trash2, ArrowLeft, Check, Package, CreditCard, Home,
  Store, Droplet, Flame, PhoneCall, Calendar
} from 'lucide-react';

// Mock Router (simple implementation)
const RouterContext = React.createContext();

const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  
  useEffect(() => {
    const handleHashChange = () => setCurrentPath(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };
  
  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

const useNavigate = () => {
  const context = React.useContext(RouterContext);
  return context.navigate;
};

const useLocation = () => {
  const context = React.useContext(RouterContext);
  return { pathname: context.currentPath };
};

const Link = ({ to, children, className }) => {
  const navigate = useNavigate();
  return (
    <a 
      href={`#${to}`} 
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};

// Shared Data
const categories = [
  { id: 'All', name: 'All', icon: '🏠' },
  { id: 'Vegetables', name: 'Veggies', icon: '🥦' },
  { id: 'Fruits', name: 'Fruits', icon: '🍓' },
  { id: 'Dairy', name: 'Dairy', icon: '🥛' },
  { id: 'Snacks', name: 'Snacks', icon: '🍟' },
  { id: 'Beverages', name: 'Drinks', icon: '🥤' },
  { id: 'Bakery', name: 'Bakery', icon: '🍞' },
  { id: 'Household', name: 'Home', icon: '🧼' },
];

// Shops Data
const shops = [
  { 
    id: 1, 
    name: 'Fresh Mart', 
    icon: '🛒',
    description: 'Your daily grocery partner',
    rating: 4.8,
    deliveryTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&q=80'
  },
  { 
    id: 2, 
    name: 'Organic Valley', 
    icon: '🌿',
    description: 'Pure organic products',
    rating: 4.9,
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'
  },
  { 
    id: 3, 
    name: 'Spice Kingdom', 
    description: 'Authentic Indian spices',
    rating: 4.7,
    deliveryTime: '12 mins',
    image: 'https://www.google.com/imgres?q=Spice%20Kingdom&imgurl=https%3A%2F%2Fb.zmtcdn.com%2Fdata%2Fpictures%2F7%2F19677957%2Ff8088cfb2607eb34d1f7dc2a8059a327.jpg&imgrefurl=https%3A%2F%2Fwww.zomato.com%2Fncr%2Fthe-spice-kingdom-uttam-nagar-new-delhi&docid=g3DHb1rQzqHRbM&tbnid=t6Ei1W_dcrGJGM&vet=12ahUKEwiCtMLLo9KSAxXjV2wGHUblOJgQnPAOegQIIBAB..i&w=2400&h=1080&hcb=2&ved=2ahUKEwiCtMLLo9KSAxXjV2wGHUblOJgQnPAOegQIIBAB'
  },
  { 
    id: 4, 
    name: 'Dairy Delight', 
    icon: '🥛',
    description: 'Fresh milk & dairy products',
    rating: 4.9,
    deliveryTime: '8 mins',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80'
  }
];

// Products by shop
const shopProducts = {
  1: [ // Fresh Mart
    { id: 1, name: 'Fresh Broccoli', category: 'Vegetables', price: 85, oldPrice: 120, rating: 4.8, off: '30% OFF', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&q=80' },
    { id: 2, name: 'Kashmir Apples', category: 'Fruits', price: 180, oldPrice: 220, rating: 4.9, off: '15% OFF', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&q=80' },
    { id: 3, name: 'Cow Milk (1L)', category: 'Dairy', price: 65, oldPrice: 70, rating: 4.7, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80' },
    { id: 4, name: 'Lays Chips (Red)', category: 'Snacks', price: 20, oldPrice: 25, rating: 4.5, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80' },
    { id: 5, name: 'Orange Juice', category: 'Beverages', price: 110, oldPrice: 140, rating: 4.6, off: '20% OFF', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80' },
  ],
  2: [ // Organic Valley
    { id: 6, name: 'Organic Spinach', category: 'Vegetables', price: 45, oldPrice: 60, rating: 4.9, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80' },
    { id: 7, name: 'Organic Banana', category: 'Fruits', price: 50, oldPrice: 65, rating: 4.8, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&q=80' },
    { id: 8, name: 'Organic Honey', category: 'Dairy', price: 350, oldPrice: 450, rating: 5.0, off: 'ORGANIC', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784361?w=500&q=80' },
    { id: 9, name: 'Organic Brown Rice', category: 'Grains', price: 120, oldPrice: 150, rating: 4.7, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80' },
  ],
  3: [ // Spice Kingdom
    { id: 10, name: 'Turmeric Powder', category: 'Spices', price: 80, oldPrice: 100, rating: 4.8, image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&q=80' },
    { id: 11, name: 'Red Chili Powder', category: 'Spices', price: 90, oldPrice: 110, rating: 4.7, image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=500&q=80' },
    { id: 12, name: 'Garam Masala', category: 'Spices', price: 150, oldPrice: 180, rating: 4.9, image: 'https://images.unsplash.com/photo-1596040033229-a0b0c2d2f66f?w=500&q=80' },
    { id: 13, name: 'Cumin Seeds', category: 'Spices', price: 120, oldPrice: 140, rating: 4.6, image: 'https://images.unsplash.com/photo-1599639936490-6c0d27d5c91a?w=500&q=80' },
  ],
  4: [ // Dairy Delight
    { id: 14, name: 'Fresh Paneer', category: 'Dairy', price: 90, oldPrice: 110, rating: 4.9, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80' },
    { id: 15, name: 'Dahi (Curd)', category: 'Dairy', price: 40, oldPrice: 50, rating: 4.8, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&q=80' },
    { id: 16, name: 'Butter (500g)', category: 'Dairy', price: 250, oldPrice: 280, rating: 4.7, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80' },
    { id: 17, name: 'Ghee (1L)', category: 'Dairy', price: 550, oldPrice: 650, rating: 5.0, off: 'PURE', image: 'https://images.unsplash.com/photo-1631452180259-c014fe946bc7?w=500&q=80' },
  ]
};

// Cylinder & Water Options
const cylinderOptions = [
  { 
    id: 'c1', 
    name: 'HP Gas', 
    size: '14.2 kg', 
    price: 850, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/LPG_gas_cylinder.jpg', 
    provider: 'HP Gas', 
    bookingFee: 50 
  },
  { 
    id: 'c2', 
    name: 'Indane Gas', 
    size: '14.2 kg', 
    price: 840, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Gas_cylinder_LPG.jpg', 
    provider: 'Indane', 
    bookingFee: 50 
  },
  { 
    id: 'c3', 
    name: 'Bharat Gas', 
    size: '14.2 kg', 
    price: 845, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/LPG_Cylinder.jpg', 
    provider: 'Bharat Gas', 
    bookingFee: 50 
  },
];


const waterJarOptions = [
  { id: 'w1', name: 'Bisleri', size: '20L', price: 80, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80', brand: 'Bisleri' },
  { id: 'w2', name: 'Aquafina', size: '20L', price: 75, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80', brand: 'Aquafina' },
  { id: 'w3', name: 'Kinley', size: '20L', price: 70, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80', brand: 'Kinley' },
  { id: 'w4', name: 'Local Water', size: '20L', price: 50, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80', brand: 'Pure Water' },
];

const allProducts = Object.values(shopProducts).flat();

// Navbar Component
const Navbar = ({ cartCount = 3, cartTotal = 450 }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100 py-2' : 'bg-white py-4 border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 lg:gap-8">
            <Link to="/">
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 tracking-tight flex items-center gap-1 cursor-pointer">
                <span className="text-3xl">🥬</span> MeraBazar
              </h1>
            </Link>
            
            <div className="hidden lg:flex flex-col cursor-pointer group">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Delivery in 10 mins</span>
              <div className="flex items-center gap-1 font-bold text-gray-800 text-sm group-hover:text-emerald-600 transition">
                Sakchi, Jamshedpur <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl px-8">
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder="Search 'Milk', 'Bread', 'Potato'..." 
                className="w-full bg-slate-100 border border-transparent rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-200 transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button onClick={() => navigate('/wishlist')} className="relative p-2.5 hover:bg-slate-100 rounded-full transition">
              <Heart size={24} className="text-gray-600" />
            </button>
            
            <button onClick={() => navigate('/cart')} className="relative p-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-full transition flex items-center gap-2">
              <ShoppingCart size={24} className="text-emerald-700" />
              <span className="hidden lg:block font-bold text-emerald-800 text-sm">₹{cartTotal}</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">{cartCount}</span>
            </button>

            <button onClick={() => navigate('/login')} className="hidden md:flex bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-800 transition">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// HomePage
const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBanner, setShowBanner] = useState(true);
  const navigate = useNavigate();

  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      {showBanner && (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white text-sm py-2 px-4 flex justify-between items-center">
          <p className="mx-auto font-medium flex items-center gap-2">
            <Zap size={14} className="text-yellow-400 fill-yellow-400" />
            Free Delivery on your first order! Use code: <span className="font-bold text-yellow-300">FRESH20</span>
          </p>
          <button onClick={() => setShowBanner(false)} className="hover:bg-white/20 rounded-full p-1 transition"><X size={14}/></button>
        </div>
      )}

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-12">
        <div className="relative bg-emerald-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80')] bg-cover bg-center opacity-30"></div>
          <div className="relative z-10 p-8 md:p-16">
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">Weekend Mega Sale</span>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
              Your Daily Needs, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">Just 10 Mins Away</span>
            </h2>
            <p className="text-emerald-100 mb-8 text-lg max-w-md">Fresh vegetables, fruits, and dairy delivered directly from local farms.</p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/shops')} className="bg-white text-emerald-900 px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition">Shop Now</button>
              <button onClick={() => navigate('/offers')} className="bg-emerald-800/50 border border-emerald-500/50 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-800 transition">View Offers</button>
            </div>
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div onClick={() => navigate('/shops')} className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition shadow-lg">
              <Store size={32} className="mb-3" />
              <h4 className="font-bold text-lg mb-1">Local Shops</h4>
              <p className="text-sm text-emerald-100">Browse nearby stores</p>
            </div>
            
            <div onClick={() => navigate('/cylinder-booking')} className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition shadow-lg">
              <Flame size={32} className="mb-3" />
              <h4 className="font-bold text-lg mb-1">Gas Cylinder</h4>
              <p className="text-sm text-orange-100">Book refill now</p>
            </div>
            
            <div onClick={() => navigate('/water-jar')} className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition shadow-lg">
              <Droplet size={32} className="mb-3" />
              <h4 className="font-bold text-lg mb-1">Water Jar</h4>
              <p className="text-sm text-blue-100">Order 20L jar</p>
            </div>
            
            <div onClick={() => navigate('/offers')} className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition shadow-lg">
              <Star size={32} className="mb-3" />
              <h4 className="font-bold text-lg mb-1">Special Offers</h4>
              <p className="text-sm text-purple-100">Save big today</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Clock size={24}/>, title: '10 Mins Delivery', desc: 'Lightning fast' },
            { icon: <ShieldCheck size={24}/>, title: 'Quality Check', desc: '100% Fresh' },
            { icon: <Truck size={24}/>, title: 'Free Shipping', desc: 'Above ₹200' },
            { icon: <Star size={24}/>, title: 'Best Prices', desc: 'Daily discounts' }
          ].map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">{f.icon}</div>
              <div>
                <h4 className="font-bold text-sm">{f.title}</h4>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Shop by Category</h3>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="flex flex-col items-center min-w-[5.5rem] h-24 rounded-2xl border bg-white hover:border-emerald-500 hover:bg-emerald-50 transition gap-2"
              >
                <span className="text-2xl mt-2">{cat.icon}</span>
                <span className="text-xs font-bold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">Popular Near You</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allProducts.slice(0, 10).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border p-3 hover:shadow-xl transition cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                {product.off && (
                  <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg absolute">{product.off}</div>
                )}
                <div className="h-40 bg-gray-50 rounded-xl mb-3 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">{product.category}</p>
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    {product.oldPrice && <span className="text-xs text-gray-400 line-through">₹{product.oldPrice}</span>}
                    <span className="text-base font-extrabold block">₹{product.price}</span>
                  </div>
                  <button className="bg-emerald-50 text-emerald-700 p-2 rounded-xl hover:bg-emerald-600 hover:text-white transition">
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

// ShopsPage - New
const ShopsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-emerald-600 font-bold mb-6 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Local Shops Near You</h1>
          <p className="text-gray-600">Choose from our trusted partner stores</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {shops.map((shop) => (
            <div 
              key={shop.id} 
              onClick={() => navigate(`/shop/${shop.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 relative overflow-hidden">
                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-5xl mb-2">{shop.icon}</div>
                  <h2 className="text-2xl font-bold">{shop.name}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{shop.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                      <Star size={16} fill="currentColor" className="text-yellow-600" />
                      <span className="font-bold">{shop.rating}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-emerald-600">
                      <Clock size={16} />
                      <span className="font-bold text-sm">{shop.deliveryTime}</span>
                    </div>
                  </div>
                  
                  <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition">
                    Browse
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

// ShopDetailPage - New
const ShopDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shopId = parseInt(location.pathname.split('/').pop());
  const shop = shops.find(s => s.id === shopId) || shops[0];
  const products = shopProducts[shopId] || [];

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate('/shops')} className="flex items-center gap-2 text-emerald-600 font-bold mb-6 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Shops
        </button>
        
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{shop.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
              <p className="text-gray-600 mb-3">{shop.description}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                  <Star size={16} fill="currentColor" className="text-yellow-600" />
                  <span className="font-bold">{shop.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <Clock size={16} />
                  <span className="font-bold text-sm">{shop.deliveryTime} delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Available Products ({products.length})</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border p-3 hover:shadow-xl transition cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
              {product.off && (
                <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg absolute">{product.off}</div>
              )}
              <div className="h-40 bg-gray-50 rounded-xl mb-3 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">{product.category}</p>
              <h3 className="font-bold text-sm mb-1 line-clamp-2">{product.name}</h3>
              <div className="flex items-end justify-between mt-2">
                <div>
                  {product.oldPrice && <span className="text-xs text-gray-400 line-through">₹{product.oldPrice}</span>}
                  <span className="text-base font-extrabold block">₹{product.price}</span>
                </div>
                <button className="bg-emerald-50 text-emerald-700 p-2 rounded-xl hover:bg-emerald-600 hover:text-white transition">
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

// CylinderBookingPage - New
const CylinderBookingPage = () => {
  const navigate = useNavigate();
  const [selectedCylinder, setSelectedCylinder] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    consumerId: '',
    deliveryDate: '',
  });

  const handleBooking = () => {
    if (!selectedCylinder || !formData.name || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Cylinder Booking Confirmed!</h1>
            <p className="text-gray-600 mb-2">Your {selectedCylinder?.provider} cylinder will be delivered soon</p>
            <p className="text-sm text-gray-500 mb-8">Booking ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/')} className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700">
                Go to Home
              </button>
              <button onClick={() => navigate('/profile')} className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50">
                View Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-orange-600 font-bold mb-6 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Flame className="text-orange-600" size={40} />
            Gas Cylinder Booking
          </h1>
          <p className="text-gray-600">Book your LPG cylinder refill</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Select Gas Provider</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {cylinderOptions.map((cylinder) => (
                  <div 
                    key={cylinder.id}
                    onClick={() => setSelectedCylinder(cylinder)}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition ${
                      selectedCylinder?.id === cylinder.id 
                        ? 'border-orange-600 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="h-32 bg-gray-50 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                      <Flame size={64} className="text-orange-500" />
                    </div>
                    <h3 className="font-bold mb-1">{cylinder.provider}</h3>
                    <p className="text-sm text-gray-600 mb-2">{cylinder.size}</p>
                    <p className="text-xl font-bold text-orange-600">₹{cylinder.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" 
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" 
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Consumer ID (Optional)</label>
                  <input 
                    type="text" 
                    value={formData.consumerId}
                    onChange={(e) => setFormData({...formData, consumerId: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" 
                    placeholder="Enter consumer ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Delivery Address *</label>
                  <textarea 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" 
                    rows="3"
                    placeholder="Enter delivery address"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Preferred Delivery Date</label>
                  <input 
                    type="date" 
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              {selectedCylinder ? (
                <div className="space-y-4">
                  <div className="border-2 border-orange-200 rounded-xl p-4 bg-orange-50">
                    <p className="font-bold text-lg">{selectedCylinder.provider}</p>
                    <p className="text-sm text-gray-600">{selectedCylinder.size}</p>
                  </div>
                  
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cylinder Price</span>
                      <span className="font-bold">₹{selectedCylinder.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking Fee</span>
                      <span className="font-bold">₹{selectedCylinder.bookingFee}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">₹{selectedCylinder.price + selectedCylinder.bookingFee}</span>
                  </div>
                  
                  <button 
                    onClick={handleBooking}
                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2"
                  >
                    <PhoneCall size={20} />
                    Confirm Booking
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    You will receive a confirmation call shortly
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Flame size={48} className="mx-auto mb-3 opacity-30" />
                  <p>Select a gas provider to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

// WaterJarPage - New
const WaterJarPage = () => {
  const navigate = useNavigate();
  const [selectedWater, setSelectedWater] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryTime: 'morning',
  });

  const handleOrder = () => {
    if (!selectedWater || !formData.name || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }
    setOrderConfirmed(true);
  };

  const totalPrice = selectedWater ? selectedWater.price * quantity : 0;

  if (orderConfirmed) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-2">{quantity} x {selectedWater?.brand} water jar(s) ordered</p>
            <p className="text-sm text-gray-500 mb-8">Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700">
                Go to Home
              </button>
              <button onClick={() => navigate('/profile')} className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50">
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-600 font-bold mb-6 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Droplet className="text-blue-600" size={40} />
            Water Jar Delivery
          </h1>
          <p className="text-gray-600">Order fresh 20L water jars</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Select Water Brand</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {waterJarOptions.map((water) => (
                  <div 
                    key={water.id}
                    onClick={() => setSelectedWater(water)}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition ${
                      selectedWater?.id === water.id 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="h-32 bg-gray-50 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                      <Droplet size={64} className="text-blue-500" />
                    </div>
                    <h3 className="font-bold mb-1">{water.brand}</h3>
                    <p className="text-sm text-gray-600 mb-2">{water.size}</p>
                    <p className="text-xl font-bold text-blue-600">₹{water.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedWater && (
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Select Quantity</h2>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="text-3xl font-bold w-16 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-200"
                  >
                    <Plus size={24} />
                  </button>
                  <span className="text-gray-600">Jars</span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" 
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" 
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Delivery Address *</label>
                  <textarea 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" 
                    rows="3"
                    placeholder="Enter delivery address"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Preferred Delivery Time</label>
                  <select 
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                    className="w-full border-2 rounded-xl px-4 py-3 focus:border-blue-500 outline-none"
                  >
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              {selectedWater ? (
                <div className="space-y-4">
                  <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                    <p className="font-bold text-lg">{selectedWater.brand}</p>
                    <p className="text-sm text-gray-600">{selectedWater.size} x {quantity}</p>
                  </div>
                  
                  <div className="space-y-3 pb-4 border-b">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Jar</span>
                      <span className="font-bold">₹{selectedWater.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <span className="font-bold">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{totalPrice}</span>
                  </div>
                  
                  <button 
                    onClick={handleOrder}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Package size={20} />
                    Place Order
                  </button>
                  
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-blue-600" />
                      <span>Delivered within 2-4 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-blue-600" />
                      <span>Quality assured water</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Droplet size={48} className="mx-auto mb-3 opacity-30" />
                  <p>Select a water brand to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

// CategoryPage
const CategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = location.pathname.split('/').pop();
  const category = categories.find(c => c.id === categoryId) || categories[0];
  
  const products = categoryId === 'All' ? allProducts : allProducts.filter(p => p.category === categoryId);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-emerald-600 font-bold mb-6 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-5xl">{category.icon}</span>
            {category.name} Collection
          </h1>
          <p className="text-gray-600">{products.length} products available</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border p-3 hover:shadow-xl transition cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="h-40 bg-gray-50 rounded-xl mb-3 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-sm mb-1">{product.name}</h3>
              <div className="flex items-end justify-between mt-2">
                <span className="text-base font-extrabold">₹{product.price}</span>
                <button className="bg-emerald-50 text-emerald-700 p-2 rounded-xl">
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

// ProductDetailPage
const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = parseInt(location.pathname.split('/').pop());
  const product = allProducts.find(p => p.id === productId) || allProducts[0];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-emerald-600 font-bold mb-6">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white rounded-3xl p-8 grid md:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
          </div>

          <div>
            <span className="text-sm font-bold text-emerald-600 uppercase">{product.category}</span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                <Star size={16} fill="currentColor" className="text-yellow-600" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <span className="text-gray-500">500g Pack</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-extrabold">₹{product.price}</span>
              {product.oldPrice && <span className="text-2xl text-gray-400 line-through mb-2">₹{product.oldPrice}</span>}
              {product.off && <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm mb-2">{product.off}</span>}
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                  <Minus size={20} />
                </button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => navigate('/cart')} className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                <ShoppingCart size={24} /> Add to Cart
              </button>
              <button className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition flex items-center justify-center">
                <Heart size={24} />
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="text-emerald-600" size={24} />
                <span>Free delivery on orders above ₹199</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="text-emerald-600" size={24} />
                <span>Delivery in 10-15 minutes</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <ShieldCheck className="text-emerald-600" size={24} />
                <span>100% Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

// CartPage
const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { ...allProducts[0], quantity: 2 },
    { ...allProducts[1], quantity: 1 },
    { ...allProducts[4], quantity: 1 }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal > 199 ? 0 : 30;
  const total = subtotal + delivery;

  const updateQuantity = (id, delta) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">500g</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">₹{item.price}</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Minus size={16} />
                      </button>
                      <span className="font-bold w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg h-fit">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Bill Details</h2>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-bold">{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

// CheckoutPage
const CheckoutPage = () => {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8">Your order will be delivered in 10-15 minutes</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/')} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700">
                Continue Shopping
              </button>
              <button onClick={() => navigate('/profile')} className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50">
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-emerald-600" /> Delivery Address
            </h2>
            <div className="border-2 border-emerald-200 rounded-xl p-4 bg-emerald-50">
              <p className="font-bold">Home</p>
              <p className="text-gray-600 text-sm mt-1">Sakchi, Jamshedpur, Jharkhand - 831001</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="text-emerald-600" /> Payment Method
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 border-emerald-500 rounded-xl bg-emerald-50 cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="w-5 h-5" />
                <span className="font-bold">Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer hover:border-emerald-300">
                <input type="radio" name="payment" className="w-5 h-5" />
                <span className="font-bold">UPI / Cards</span>
              </label>
            </div>
          </div>

          <button onClick={() => setOrderPlaced(true)} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2">
            <Package size={24} /> Place Order - ₹450
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Other Pages
const WishlistPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border p-3 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="h-40 bg-gray-50 rounded-xl mb-3 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-sm mb-2">{product.name}</h3>
              <span className="text-base font-extrabold">₹{product.price}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">Login to your MeraBazar account</p>
        
        <div className="space-y-4 mb-6">
          <input type="tel" placeholder="Phone Number" className="w-full border-2 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none" />
          <input type="password" placeholder="Password" className="w-full border-2 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none" />
        </div>
        
        <button onClick={() => navigate('/')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 mb-4">
          Login
        </button>
        
        <p className="text-center text-sm text-gray-600">
          Don't have an account? <span className="text-emerald-600 font-bold cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-3xl">👤</div>
            <div>
              <h2 className="text-xl font-bold">Rahul Kumar</h2>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { icon: <Package />, label: 'My Orders', path: '/profile' },
              { icon: <MapPin />, label: 'Saved Addresses', path: '/profile' },
              { icon: <Heart />, label: 'Wishlist', path: '/wishlist' },
              { icon: <User />, label: 'Account Settings', path: '/profile' }
            ].map((item, i) => (
              <button key={i} onClick={() => navigate(item.path)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-600">{item.icon}</div>
                  <span className="font-bold">{item.label}</span>
                </div>
                <ChevronDown size={20} className="-rotate-90" />
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => navigate('/login')} className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600">
          Logout
        </button>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

const OffersPage = () => { 
  const navigate = useNavigate(); 
  return ( 
    <div className="bg-slate-50 min-h-screen"> 
      <Navbar /> 
      <main className="max-w-7xl mx-auto px-4 py-6"> 
        <h1 className="text-3xl font-bold mb-6">Special Offers</h1> 
        <div className="grid md:grid-cols-2 gap-6"> 
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white"> 
            <h2 className="text-3xl font-bold mb-2">50% OFF</h2> 
            <p className="mb-4">On your first 3 orders</p> 
            <p className="bg-white/20 inline-block px-4 py-2 rounded-lg font-mono font-bold">WELCOME50</p> 
          </div> 
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white"> 
            <h2 className="text-3xl font-bold mb-2">FREE Delivery</h2> 
            <p className="mb-4">On orders above ₹199</p> 
            <p className="bg-white/20 inline-block px-4 py-2 rounded-lg font-mono font-bold">FRESH20</p> 
          </div> 
        </div> 
      </main> 
      <Footer /> 
      <MobileNav /> 
    </div> 
  ); 
};

const AboutPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">About MeraBazar</h1>
        <div className="bg-white rounded-2xl p-8 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Our goal is to make grocery shopping faster, easier, and more reliable for every household in Jamshedpur through smart technology and efficient delivery systems.
          </p>
          <p className="text-gray-700 leading-relaxed">
            MeraBazar carefully selects and quality-checks every product before delivery, ensuring that customers receive only fresh, hygienic, and high-quality items.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By working closely with local farmers and vendors, we help reduce supply chain gaps and ensure fair pricing for both customers and suppliers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our platform is designed to offer a smooth and user-friendly experience, allowing customers to browse, order, and receive groceries with complete transparency.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With fast delivery, exclusive offers, and reliable customer support, MeraBazar is redefining how grocery shopping is done in the city.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Footer Component
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">🥬 MeraBazar</h2>
            <p className="text-sm text-slate-400 mb-6">Jamshedpur's favorite online grocery store.</p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li onClick={() => navigate('/about')} className="hover:text-emerald-400 cursor-pointer">About Us</li>
              <li onClick={() => navigate('/offers')} className="hover:text-emerald-400 cursor-pointer">Offers</li>
              <li className="hover:text-emerald-400 cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.slice(1, 5).map(cat => (
                <li key={cat.id} onClick={() => navigate(`/category/${cat.id}`)} className="hover:text-emerald-400 cursor-pointer">
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-emerald-400 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-emerald-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>&copy; 2024 MeraBazar. Built with ❤️ in India.</p>
        </div>
      </div>
    </footer>
  );
};

// MobileNav Component
const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const NavIcon = ({ icon, label, path }) => {
    const isActive = location.pathname === path;
    return (
      <button onClick={() => navigate(path)} className={`flex flex-col items-center transition p-1 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
        {icon}
        <span className="text-[10px] font-bold mt-1">{label}</span>
      </button>
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t flex justify-around py-3 z-50 shadow-lg">
      <NavIcon icon={<Home size={20} />} label="Home" path="/" />
      <NavIcon icon={<Store size={20} />} label="Shops" path="/shops" />
      <NavIcon icon={<ShoppingCart size={20} />} label="Cart" path="/cart" />
      <NavIcon icon={<User size={20} />} label="Profile" path="/profile" />
    </div>
  );
};

// Main App
const App = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {path === '/' && <HomePage />}
      {path === '/shops' && <ShopsPage />}
      {path.startsWith('/shop/') && <ShopDetailPage />}
      {path === '/cylinder-booking' && <CylinderBookingPage />}
      {path === '/water-jar' && <WaterJarPage />}
      {path.startsWith('/category/') && <CategoryPage />}
      {path.startsWith('/product/') && <ProductDetailPage />}
      {path === '/cart' && <CartPage />}
      {path === '/checkout' && <CheckoutPage />}
      {path === '/wishlist' && <WishlistPage />}
      {path === '/login' && <LoginPage />}
      {path === '/profile' && <ProfilePage />}
      {path === '/offers' && <OffersPage />}
      {path === '/about' && <AboutPage />}
    </>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);