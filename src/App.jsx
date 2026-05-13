import { Routes, Route } from "react-router-dom";
import CustomerLogin from "./pages/CustomerLogin";
import FarmerLogin from "./pages/FarmerLogin";
import CustomerHome from "./pages/CustomerHome";
import FarmerDashboard from "./pages/FarmerDashboard";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerHome />} />
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/farmer-login" element={<FarmerLogin />} />
      <Route path="/customer-home" element={<CustomerHome />} />
      <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
