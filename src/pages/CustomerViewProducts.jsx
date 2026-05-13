import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function CustomerViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <img src={p.imageUrl} alt={p.name} width={150}/>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <p>Expiry: {p.expiry}</p>
        </div>
      ))}
    </div>
  );
}
