import { useMemo, useState } from "react";
import { useProducts } from "../context/ProductContext";
import "../styles/FarmerDashboard.css";

const CURRENT_FARMER_KEY = "agroconnect_current_farmer";

export default function FarmerDashboard() {
  const { products, setProducts } = useProducts();
  const [showProfile, setShowProfile] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    expiry: "",
    image: "",
  });

  const farmer = useMemo(() => {
    const stored = localStorage.getItem(CURRENT_FARMER_KEY);
    if (!stored) {
      return {
        name: "Farmer",
        farmerId: "FARM000000",
        aadharNo: "Not available",
        photo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      };
    }

    try {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "Farmer",
        farmerId: parsed.farmerId || "FARM000000",
        aadharNo: parsed.aadharNo || "Not available",
        photo:
          parsed.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      };
    } catch {
      return {
        name: "Farmer",
        farmerId: "FARM000000",
        aadharNo: "Not available",
        photo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      };
    }
  }, []);

  const myProducts = useMemo(
    () =>
      products
        .map((product, index) => ({ product, index }))
        .filter((entry) => entry.product.farmerId === farmer.farmerId),
    [products, farmer.farmerId]
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addOrUpdateProduct = () => {
    if (!form.name || !form.price || !form.quantity || !form.expiry || !form.image) return;

    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = {
        ...updated[editingIndex],
        ...form,
      };
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([
        ...products,
        {
          ...form,
          farmerName: farmer.name,
          farmerId: farmer.farmerId,
          addedOn: new Date().toLocaleDateString(),
        },
      ]);
    }

    setForm({ name: "", price: "", quantity: "", expiry: "", image: "" });
  };

  const editProduct = (index) => {
    setForm({
      name: products[index].name || "",
      price: products[index].price || "",
      quantity: products[index].quantity || "",
      expiry: products[index].expiry || "",
      image: products[index].image || "",
    });
    setEditingIndex(index);
  };

  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="farmer-container">
      <header className="farmer-header">
        <h2>Hi {farmer.name}</h2>

        <div className="profile-wrapper">
          <img
            src={farmer.photo}
            alt="profile"
            className="profile-pic"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="profile-popup">
              <img src={farmer.photo} alt="profile" />
              <h3>{farmer.name}</h3>
              <p>Farmer ID: {farmer.farmerId}</p>
              <p>Aadhar: {farmer.aadharNo}</p>
              <button onClick={() => setShowProfile(false)}>Close</button>
            </div>
          )}
        </div>
      </header>

      <div className="product-list">
        <h3>My Produce</h3>

        {myProducts.length === 0 && <p className="empty">No produce added yet</p>}

        <div className="grid">
          {myProducts.map(({ product: p, index }) => (
            <div className="product-card" key={`${p.name}-${index}`}>
              <img src={p.image} alt={p.name} />

              <h4>{p.name}</h4>
              <p>Price: Rs. {p.price}/kg</p>
              <p>Qty: {p.quantity}</p>
              <p>Expiry: {p.expiry}</p>
              <span>Added: {p.addedOn}</span>

              <div className="actions">
                <button onClick={() => editProduct(index)}>Edit</button>
                <button className="delete" onClick={() => deleteProduct(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="add-produce">
        <h3>{editingIndex !== null ? "Edit Produce" : "Add Produce"}</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          min="1"
          placeholder="Price per kg"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <input
          type="date"
          value={form.expiry}
          onChange={(e) => setForm({ ...form, expiry: e.target.value })}
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {form.image && <img className="preview" src={form.image} alt="preview" />}

        <button onClick={addOrUpdateProduct}>
          {editingIndex !== null ? "Update Produce" : "Add Produce"}
        </button>
      </div>
    </div>
  );
}
