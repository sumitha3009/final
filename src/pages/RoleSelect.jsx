import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="center-page">
      <div className="card">
        <h2 style={{ color: "#2e7d32" }}>AgroConnect</h2>
        <p>Select your role</p>

        <button onClick={() => navigate("/customer-login")}>
          Customer
        </button>

        <button onClick={() => navigate("/farmer-login")}>
          Farmer
        </button>
      </div>
    </div>
  );
}
