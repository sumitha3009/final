import { useNavigate } from "react-router-dom";

export default function CustomerLogin() {
  const navigate = useNavigate();

  return (
    <div className="center-page">
      <div className="card">
        <h2>Customer Login</h2>

        <input placeholder="Username" />
        <input placeholder="Phone Number" />
        <input type="password" placeholder="Password" />

        <button onClick={() => navigate("/customer-home")}>
          Login
        </button>
      </div>
    </div>
  );
}
