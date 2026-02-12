import './App.css';  // ← MUST HAVE (CSS load karega)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages Import (EXACT file names)
import SplashScreen from "./pages/splash_screen.jsx";
import OnboardingScreen from "./pages/OnboardingScreen.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopDetailPage from "./pages/ShopDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderTrackingPage from "./pages/OrderTrackingPage.jsx";
import SellerDashboard from "./pages/SellerDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default Splash Screen */}
        <Route path="/" element={<SplashScreen />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingScreen />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Buyer Pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<ShopDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/track" element={<OrderTrackingPage />} />

        {/* Seller Dashboard */}
        <Route path="/seller" element={<SellerDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
