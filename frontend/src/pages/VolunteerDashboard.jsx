import { useState, useEffect } from "react"
import axios from "axios"

const API = "https://resqai-110106214707.asia-south1.run.app"

export default function VolunteerDashboard() {
  const [needs, setNeeds] = useState([])
  const [accepted, setAccepted] = useState([])

  useEffect(() => {
    axios.get(`${API}/needs`).then(r => setNeeds(r.data)).catch(() => {})
  }, [])

  function accept(id) { setAccepted(prev => [...prev, id]) }

  return (
    <div style={page}>
      <h1 style={h1}>Volunteer Portal</h1>
      <p style={sub}>Active community needs. Accept the ones where you can help.</p>

      {needs.length === 0 && (
        <div style={{ ...card, textAlign: "center", color: "#6b7280", padding: "40px" }}>
          No active needs right now. Check back soon.
        </div>
      )}

      {needs.map((need, i) => (
        <div key={i} style={{ ...card, opacity: accepted.includes(need.id) ? 0.65 : 1 }}>
          <p style={{ marginBottom: "14px", lineHeight: "1.6" }}>{need.description}</p>
          {accepted.includes(need.id)
            ? <span style={acceptedBadge}>✓ You accepted this need</span>
            : <button onClick={() => accept(need.id)} style={btn}>Accept & Help</button>
          }
        </div>
      ))}

      <div style={{ ...card, marginTop: "24px", background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Your impact this session</p>
        <p style={{ fontSize: "32px", fontWeight: "700", color: "#064e3b", marginBottom: "2px" }}>{accepted.length}</p>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>needs accepted</p>
      </div>
    </div>
  )
}

const page = { maxWidth: "720px", margin: "0 auto", padding: "32px 20px" }
const h1 = { fontSize: "24px", fontWeight: "700", color: "#064e3b", marginBottom: "8px" }
const sub = { color: "#6b7280", marginBottom: "24px" }
const card = { background: "white", borderRadius: "12px", padding: "20px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
const btn = { background: "#064e3b", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }
const acceptedBadge = { background: "#d1fae5", color: "#064e3b", padding: "6px 14px", borderRadius: "100px", fontSize: "13px", fontWeight: "600" }