import { useState, useEffect } from "react"
import axios from "axios"

// This will change to the Cloud Run URL once Liya deploys — Dilshan coordinates this
const API = "http://localhost:5000"

export default function NGODashboard() {
  const [description, setDescription] = useState("")
  const [needs, setNeeds]   = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeNeed, setActiveNeed] = useState("")
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    axios.get(`${API}/needs`).then(r => setNeeds(r.data)).catch(() => {})
  }, [])

  async function postNeed() {
    if (!description.trim()) return
    setPosting(true)
    const res = await axios.post(`${API}/needs`, {
      description,
      posted_at: new Date().toISOString(),
      status: "open"
    })
    const newNeed = { id: res.data.id, description }
    setNeeds(prev => [newNeed, ...prev])
    setDescription("")
    setPosting(false)
  }

  async function findMatches(need) {
    setLoading(true)
    setActiveNeed(need.description)
    setMatches([])
    try {
      const res = await axios.post(`${API}/match`, {
        description: need.description,
        need_id: need.id
      })
      setMatches(res.data.matches)
    } catch (e) {
      alert("Matching failed — check that the backend is running.")
    }
    setLoading(false)
  }

  return (
    <div style={page}>
      <div style={header}>
        <h1 style={h1}>NGO Coordinator Portal</h1>
        <p style={sub}>Describe what help you need in plain language. Gemini AI will find the best-matched volunteers instantly.</p>
      </div>

      <div style={card}>
        <h3 style={{ marginBottom: "12px", color: "#064e3b", fontSize: "16px" }}>Post a Community Need</h3>
        <textarea
          rows={4} value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Example: "Need 5 volunteers in Alappuzha who can swim and operate boats for flood rescue. Very urgent — this Saturday."'
          style={textarea}
        />
        <button onClick={postNeed} disabled={posting} style={btn}>
          {posting ? "Posting..." : "Post Need"}
        </button>
      </div>

      {needs.length > 0 && (
        <>
          <h2 style={{ ...h1, fontSize: "18px", marginTop: "32px", marginBottom: "12px" }}>Active Needs</h2>
          {needs.map((need, i) => (
            <div key={i} style={card}>
              <p style={{ marginBottom: "14px", lineHeight: "1.6" }}>{need.description}</p>
              <button onClick={() => findMatches(need)} style={btn}>
                🤖 Find Best Volunteers with AI
              </button>
            </div>
          ))}
        </>
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: "32px", color: "#064e3b" }}>
          <p style={{ fontSize: "16px", fontWeight: "500" }}>Gemini is analyzing the need and finding matches...</p>
          <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>This takes about 3–5 seconds</p>
        </div>
      )}

      {matches.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <h2 style={{ ...h1, fontSize: "18px", marginBottom: "4px" }}>AI-Matched Volunteers</h2>
          <p style={{ ...sub, fontStyle: "italic", marginBottom: "16px" }}>For: "{activeNeed}"</p>
          {matches.map((m, i) => (
            <div key={i} style={{ ...card, borderLeft: "4px solid #10b981" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "16px", color: "#111827" }}>{m.name}</strong>
                <span style={scoreBadge}>Match score: {m.score}/10</span>
              </div>
              <p style={{ color: "#4b5563", marginTop: "8px", fontSize: "14px", lineHeight: "1.5" }}>{m.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const page = { maxWidth: "720px", margin: "0 auto", padding: "32px 20px" }
const header = { marginBottom: "24px" }
const h1 = { fontSize: "24px", fontWeight: "700", color: "#064e3b", marginBottom: "8px" }
const sub = { color: "#6b7280", lineHeight: "1.6" }
const card = { background: "white", borderRadius: "12px", padding: "20px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
const textarea = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", fontFamily: "inherit", resize: "vertical", marginBottom: "12px", boxSizing: "border-box" }
const btn = { background: "#064e3b", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px" }
const scoreBadge = { background: "#d1fae5", color: "#064e3b", padding: "4px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: "600" }