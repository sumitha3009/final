import { useNavigate } from "react-router-dom";

export default function FarmerLogin() {
  const navigate = useNavigate();

  return (
    <div className="center-page">
      <div className="card">
        <h2>Farmer Login</h2>

        <input placeholder="Farmer Name" />
        <input placeholder="Farmer ID" />
        <input type="password" placeholder="Password" />

        <button onClick={() => navigate("/farmer-dashboard")}>
          Login
        </button>
      </div>
    </div>
  );
}
