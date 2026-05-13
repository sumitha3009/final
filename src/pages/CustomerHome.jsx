import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import "../styles/CustomerHome.css";

const FARMERS_KEY = "agroconnect_farmers";
const CURRENT_FARMER_KEY = "agroconnect_current_farmer";

export default function CustomerHome() {
  const { cart, addToCart } = useCart();
  const { products: farmerProducts } = useProducts();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [farmerAuthMode, setFarmerAuthMode] = useState("login");
  const [loginFarmerId, setLoginFarmerId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupAadhar, setSignupAadhar] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhoto, setSignupPhoto] = useState("");

  const defaultProducts = [
    {
      name: "Tomato",
      qty: "Available: 100 kg",
      price: 30,
      farmer: "Ramesh Kumar",
      expiry: "3 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_RpV_Nq_aND67ekZG9sOso6gv4AQatx2sw&s",
    },
    {
      name: "Potato",
      qty: "Available: 200 kg",
      price: 25,
      farmer: "Suresh Farm",
      expiry: "7 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2vfYS9PH0lRtitUeE-Onr1KZbogBmX7_tog&s",
    },
    {
      name: "Onion",
      qty: "Available: 150 kg",
      price: 28,
      farmer: "Lakshmi Farms",
      expiry: "10 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHpuimj5r9ahMEdYq6V5lCn3eoVKKDKZ5zQ&s",
    },
    {
      name: "Carrot",
      qty: "Available: 80 kg",
      price: 35,
      farmer: "Green Valley",
      expiry: "5 days",
      image:
        "https://cdn.shopify.com/s/files/1/0058/7779/2832/files/Carrot_Extract.png?v=1653976604",
    },
    {
      name: "Cabbage",
      qty: "Available: 60 kg",
      price: 22,
      farmer: "Fresh Roots",
      expiry: "6 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgY2nCH31u5_JRui8B2x2eHPv55I-WfuMDPw&s",
    },
    {
      name: "Cauliflower",
      qty: "Available: 70 kg",
      price: 26,
      farmer: "Nature Farm",
      expiry: "4 days",
      image:
        "https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg",
    },
    {
      name: "Brinjal",
      qty: "Available: 90 kg",
      price: 32,
      farmer: "Suresh Farm",
      expiry: "5 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Z_fN1UbmaThgxUeq_evjGQ59yuKqf1NvVw&s",
    },
    {
      name: "Lady Finger",
      qty: "Available: 50 kg",
      price: 40,
      farmer: "Organic Fields",
      expiry: "3 days",
      image:
        "https://media.istockphoto.com/id/621099742/photo/okra-ladys-finger-gombo-gumbo-bendee-green-herb-on-stalk.jpg?s=612x612&w=0&k=20&c=VO6dqg0rWf7Lv6C4FmUHRibSCtSHUN89xjA-s7WSouE=",
    },
    {
      name: "Beans",
      qty: "Available: 65 kg",
      price: 38,
      farmer: "Green Leaf",
      expiry: "4 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnycoE-mDnfU3GwUW_JwadrpBth5piAEuNgg&s",
    },
    {
      name: "Beetroot",
      qty: "Available: 55 kg",
      price: 34,
      farmer: "Red Soil Farm",
      expiry: "7 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAnl1vggYLMRFiMi1MVHj2MY4qJIZuoNe9Cg&s",
    },
    {
      name: "Pumpkin",
      qty: "Available: 40 kg",
      price: 20,
      farmer: "Village Farm",
      expiry: "12 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_AhZkxjICCUgq1WkzxKMvGPnXKuv8FLCeA&s",
    },
    {
      name: "Cucumber",
      qty: "Available: 85 kg",
      price: 27,
      farmer: "Fresh Roots",
      expiry: "4 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8bHy9aHSn-EOei-11dAO42HaCZU31GEyqw&s",
    },
    {
      name: "Capsicum",
      qty: "Available: 75 kg",
      price: 45,
      farmer: "Green Valley",
      expiry: "6 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGdMUpHG8KLUNdZ4aIt6J6ThRnvkag08c-vw&s",
    },
    {
      name: "Chilli",
      qty: "Available: 30 kg",
      price: 60,
      farmer: "Spice Growers",
      expiry: "8 days",
      image:
        "https://www.shutterstock.com/image-photo/image-closeup-pile-green-chillies-600nw-2529426775.jpg",
    },
    {
      name: "Ginger",
      qty: "Available: 25 kg",
      price: 90,
      farmer: "Hill Farm",
      expiry: "20 days",
      image:
        "https://harmonychiro.com/wp-content/uploads/2024/09/ginger-root-2-1024x683.jpg.webp",
    },
    {
      name: "Garlic",
      qty: "Available: 35 kg",
      price: 110,
      farmer: "Organic Fields",
      expiry: "25 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7CTh1Kf3WkQdnplsd9kv_5vKeJ8HyKbnroQ&s",
    },
    {
      name: "Spinach",
      qty: "Available: 40 kg",
      price: 18,
      farmer: "Green Leaf",
      expiry: "2 days",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    },
    {
      name: "Coriander",
      qty: "Available: 20 kg",
      price: 15,
      farmer: "Herb Farm",
      expiry: "1 day",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM7JMMfsDv6kFDZ-LBs2q6JkY4kYDJl4aa9A&s",
    },
    {
      name: "Mint",
      qty: "Available: 18 kg",
      price: 20,
      farmer: "Herb Farm",
      expiry: "1 day",
      image:
        "https://gardenerspath.com/wp-content/uploads/2024/03/Best-Mint-Varieties-Feature.jpg",
    },
    {
      name: "Apple",
      qty: "Available: 120 kg",
      price: 120,
      farmer: "Hill Orchard",
      expiry: "15 days",
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    },
    {
      name: "Banana",
      qty: "Available: 200 kg",
      price: 45,
      farmer: "Tropical Farms",
      expiry: "5 days",
      image:
        "https://thumbs.dreamstime.com/b/banana-tree-bunch-ripe-bananas-growing-yellow-plantage-rainforest-mountains-funchal-madeira-island-66670159.jpg",
    },
    {
      name: "Orange",
      qty: "Available: 100 kg",
      price: 70,
      farmer: "Citrus Farm",
      expiry: "10 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwohVI9pHyXCAsC1t2IjO9f26uKl7h-NmYQ&s",
    },
    {
      name: "Papaya",
      qty: "Available: 60 kg",
      price: 55,
      farmer: "Village Farm",
      expiry: "7 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqUqXJGF4hhuztI05yhFgx7PpSJL2IwISpSg&s",
    },
    {
      name: "Pineapple",
      qty: "Available: 45 kg",
      price: 80,
      farmer: "Coastal Farm",
      expiry: "8 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUm_owNXHBVZYhWI_04VOmZ-WAlbioXchm5g&s",
    },
    {
      name: "Guava",
      qty: "Available: 70 kg",
      price: 60,
      farmer: "Green Orchard",
      expiry: "6 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwM9_g6d-SESJWX9l9wAFF9w9z727xmAPCg&s",
    },
    {
      name: "Watermelon",
      qty: "Available: 150 kg",
      price: 25,
      farmer: "River Side Farm",
      expiry: "4 days",
      image: "https://cdn.britannica.com/73/8773-050-A2356F63/Watermelon-citrullus-lanatus.jpg",
    },
    {
      name: "Muskmelon",
      qty: "Available: 80 kg",
      price: 35,
      farmer: "Summer Farm",
      expiry: "5 days",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVkBXA-aG-bNpQH5hgqB1ojEEHtesInwtSFw&s",
    },
  ];

  const products = useMemo(() => {
    const normalizedFarmerProducts = farmerProducts.map((item) => ({
      name: item.name,
      qty: item.quantity?.startsWith("Available:")
        ? item.quantity
        : `Available: ${item.quantity}`,
      price: Number(item.price),
      farmer: item.farmerName || "Farmer",
      expiry: item.expiry,
      image: item.image,
    }));

    return [...defaultProducts, ...normalizedFarmerProducts];
  }, [farmerProducts]);

  const addItem = () => {
    addToCart({ ...selected, quantity: Number(quantity) });
    setSelected(null);
    setQuantity(1);
  };

  const generateFarmerId = (existingFarmers) => {
    const START_ID = 1;
    const FARMER_ID_PATTERN = /^FARM(\d{4})$/;
    const usedNumbers = existingFarmers
      .map((farmer) => {
        const match = String(farmer.farmerId || "").match(FARMER_ID_PATTERN);
        return match ? Number(match[1]) : null;
      })
      .filter((value) => Number.isInteger(value) && value >= START_ID);

    const nextNumber = usedNumbers.length ? Math.max(...usedNumbers) + 1 : START_ID;
    return `FARM${String(nextNumber).padStart(4, "0")}`;
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setSelectedRole("");
    setFarmerAuthMode("login");
    setLoginFarmerId("");
    setLoginPassword("");
    setSignupName("");
    setSignupAadhar("");
    setSignupPassword("");
    setSignupPhoto("");
  };

  const handleSignupPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSignupPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFarmerLogin = (e) => {
    e.preventDefault();
    const farmers = JSON.parse(localStorage.getItem(FARMERS_KEY) || "[]");
    const matched = farmers.find(
      (farmer) =>
        farmer.farmerId === loginFarmerId.trim().toUpperCase() &&
        farmer.password === loginPassword
    );

    if (!matched) {
      alert("Invalid Farmer ID or password.");
      return;
    }

    const { password, ...farmerWithoutPassword } = matched;
    localStorage.setItem(CURRENT_FARMER_KEY, JSON.stringify(farmerWithoutPassword));
    closeLoginModal();
    navigate("/farmer-dashboard");
  };

  const handleFarmerSignup = (e) => {
    e.preventDefault();
    if (!signupName.trim() || !signupAadhar.trim() || !signupPassword || !signupPhoto) {
      alert("Please fill all fields for signup.");
      return;
    }

    const farmers = JSON.parse(localStorage.getItem(FARMERS_KEY) || "[]");
    const farmerId = generateFarmerId(farmers);
    const newFarmer = {
      farmerId,
      name: signupName.trim(),
      aadharNo: signupAadhar.trim(),
      password: signupPassword,
      photo: signupPhoto,
    };

    localStorage.setItem(FARMERS_KEY, JSON.stringify([...farmers, newFarmer]));
    alert(`Signup successful. Your Farmer ID is ${farmerId}`);
    setFarmerAuthMode("login");
    setLoginFarmerId(farmerId);
    setLoginPassword("");
  };

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h2>AgroConnect Store</h2>
        <div className="header-actions">
          <button onClick={() => navigate("/checkout")}>Cart ({cart.length})</button>
          <button onClick={() => setShowLoginModal(true)}>Login</button>
        </div>
      </header>

      <div className="grid">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} onClick={() => setSelected(p)} />
        ))}
      </div>

      {selected && (
        <div className="modal">
          <div className="modal-content">
            <img src={selected.image} alt={selected.name} />
            <h3>{selected.name}</h3>
            <p>Farmer: {selected.farmer}</p>
            <p>Expiry: {selected.expiry}</p>
            <p>Price: Rs. {selected.price}/kg</p>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button onClick={addItem}>Add to Cart</button>
            <button className="close" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="modal">
          <div className="modal-content auth-modal">
            {!selectedRole && (
              <>
                <h3>Login As</h3>
                <button onClick={() => setSelectedRole("customer")}>Customer</button>
                <button onClick={() => setSelectedRole("farmer")}>Farmer</button>
              </>
            )}

            {selectedRole === "customer" && (
              <>
                <h3>Customer Login</h3>
                <p>Continue to customer login page.</p>
                <button onClick={() => navigate("/customer-login")}>Go to Customer Login</button>
              </>
            )}

            {selectedRole === "farmer" && farmerAuthMode === "login" && (
              <form onSubmit={handleFarmerLogin}>
                <h3>Farmer Login</h3>
                <input
                  placeholder="Farmer ID"
                  value={loginFarmerId}
                  onChange={(e) => setLoginFarmerId(e.target.value.toUpperCase())}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
                <button type="button" onClick={() => setFarmerAuthMode("signup")}>
                  Sign in New Farmer
                </button>
              </form>
            )}

            {selectedRole === "farmer" && farmerAuthMode === "signup" && (
              <form onSubmit={handleFarmerSignup}>
                <h3>New Farmer Signup</h3>
                <input
                  placeholder="Farmer Name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
                <input
                  placeholder="Aadhar Number"
                  value={signupAadhar}
                  onChange={(e) => setSignupAadhar(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <input type="file" accept="image/*" onChange={handleSignupPhoto} required />
                {signupPhoto && <img src={signupPhoto} alt="Farmer preview" />}
                <button type="submit">Create Farmer Account</button>
                <button type="button" onClick={() => setFarmerAuthMode("login")}>
                  Back to Farmer Login
                </button>
              </form>
            )}

            <button className="close" onClick={closeLoginModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
