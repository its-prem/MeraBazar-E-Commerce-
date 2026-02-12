import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Star, ShoppingCart, User } from 'lucide-react';

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
      <NavIcon icon={<Star size={20} />} label="Offers" path="/offers" />
      <NavIcon icon={<ShoppingCart size={20} />} label="Cart" path="/cart" />
      <NavIcon icon={<User size={20} />} label="Profile" path="/profile" />
    </div>
  );
};

export default MobileNav;