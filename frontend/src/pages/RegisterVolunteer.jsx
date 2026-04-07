import { useState } from "react"
import axios from "axios"

const API = "https://resqai-110106214707.asia-south1.run.app"
const districts = [
  "Alappuzha","Ernakulam","Thrissur","Kozhikode","Kottayam",
  "Palakkad","Thiruvananthapuram","Kollam","Pathanamthitta",
  "Idukki","Malappuram","Wayanad","Kannur","Kasaragod"
]

export default function RegisterVolunteer() {
  const [form, setForm] = useState({ name: "", phone: "", district: "", skills: "", available: true })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  function update(field, val) { setForm(prev => ({ ...prev, [field]: val })) }

  async function submit() {
    if (!form.name || !form.phone || !form.district || !form.skills) {
      alert("Please fill in all fields before registering.")
      return
    }
    setLoading(true)
    await axios.post(`${API}/volunteers`, form)
    setDone(true)
  }

  if (done) return (
    <div style={{ ...page, textAlign: "center", paddingTop: "60px" }}>
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
      <h2 style={{ color: "#064e3b", fontSize: "22px", marginBottom: "8px" }}>You're registered!</h2>
      <p style={{ color: "#6b7280" }}>Thank you for joining Kerala's volunteer network. You'll be matched when your skills are needed most.</p>
    </div>
  )

  return (
    <div style={page}>
      <h1 style={h1}>Register as a Volunteer</h1>
      <p style={sub}>Join Kerala's AI-powered volunteer network. Write your skills naturally — Gemini reads and matches them to real needs.</p>
      <div style={card}>
        {[["Full Name", "name", "text"], ["Phone Number", "phone", "tel"]].map(([label, field, type]) => (
          <div key={field} style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>{label}</label>
            <input type={type} value={form[field]} onChange={e => update(field, e.target.value)} style={input} placeholder={label} />
          </div>
        ))}
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>District</label>
          <select value={form.district} onChange={e => update("district", e.target.value)} style={input}>
            <option value="">Select your district</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Your Skills</label>
          <input value={form.skills} onChange={e => update("skills", e.target.value)} style={input}
            placeholder="e.g. swimming, first aid, nursing, cooking, driving..." />
          <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "6px" }}>
            Write naturally — Gemini reads this and matches you to the right needs automatically.
          </p>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", cursor: "pointer" }}>
          <input type="checkbox" checked={form.available} onChange={e => update("available", e.target.checked)} style={{ width: "16px", height: "16px" }} />
          <span style={{ fontSize: "14px", color: "#374151" }}>I'm currently available for volunteering</span>
        </label>
        <button onClick={submit} disabled={loading} style={{ ...btn, width: "100%", padding: "13px", fontSize: "15px" }}>
          {loading ? "Registering..." : "Register Now"}
        </button>
      </div>
    </div>
  )
}

const page = { maxWidth: "600px", margin: "0 auto", padding: "32px 20px" }
const h1 = { fontSize: "24px", fontWeight: "700", color: "#064e3b", marginBottom: "8px" }
const sub = { color: "#6b7280", marginBottom: "24px", lineHeight: "1.6" }
const card = { background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }
const input = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }
const btn = { background: "#064e3b", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }