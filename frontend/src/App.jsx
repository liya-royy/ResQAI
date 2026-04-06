import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import NGODashboard from "./pages/NGODashboard"
import VolunteerDashboard from "./pages/VolunteerDashboard"
import RegisterVolunteer from "./pages/RegisterVolunteer"

export default function App() {
  return (
    <BrowserRouter>
      <nav style={nav}>
        <span style={logo}>🌿 VolunteerConnect Kerala</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={link}>NGO Portal</Link>
          <Link to="/volunteer" style={link}>Volunteer Portal</Link>
          <Link to="/register" style={link}>Register as Volunteer</Link>
        </div>
      </nav>
      <div style={{ background: "#f0fdf4", minHeight: "100vh", padding: "0 0 40px 0" }}>
        <Routes>
          <Route path="/" element={<NGODashboard />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/register" element={<RegisterVolunteer />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

const nav = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
  padding: "16px 40px", background: "#064e3b", color: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
}
const logo = { fontWeight: "700", fontSize: "20px", letterSpacing: "-0.3px" }
const link = { color: "#6ee7b7", textDecoration: "none", fontWeight: "500", fontSize: "14px" }