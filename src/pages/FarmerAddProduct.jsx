import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { uploadImage } from "../cloudinary";

export default function FarmerAddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [expiry, setExpiry] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage(file);

    await addDoc(collection(db, "products"), {
      name, price, expiry, imageUrl, farmerId: auth.currentUser.uid
    });

    alert("Product added!");
    setName(""); setPrice(""); setExpiry(""); setFile(null);
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required/>
        <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)} required/>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required/>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
