export default function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.qty}</p>
      <p>Rs. {product.price}/kg</p>
    </div>
  );
}
