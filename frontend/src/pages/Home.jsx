import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  return (
    <div style={outer}>
      <div style={hero}>
        <div style={badge}><span style={dot}></span> Powered by Gemini 2.0 Flash</div>
        <h1 style={h1}>Kerala's AI<br />Volunteer <span style={{color:"#1d9e75"}}>Coordinator</span></h1>
        <p style={sub}>NGOs post a need in plain language. Gemini reads it, understands it, and surfaces the right volunteers — in under 10 seconds.</p>
        <div style={btns}>
          <button style={btnPrimary} onClick={() => navigate("/")}>I'm an NGO Coordinator</button>
          <button style={btnSecondary} onClick={() => navigate("/register")}>I want to Volunteer</button>
        </div>
      </div>
      <div style={cards}>
        <div style={card}><div style={stat}>10s</div><h3 style={cardH}>Match time</h3><p style={cardP}>From posting a need to a ranked volunteer list</p></div>
        <div style={card}><div style={stat}>14</div><h3 style={cardH}>Districts covered</h3><p style={cardP}>Volunteers registered across all of Kerala</p></div>
        <div style={card}><div style={stat}>AI</div><h3 style={cardH}>Understands context</h3><p style={cardP}>Skills, urgency, and safety — not just keyword search</p></div>
      </div>
    </div>
  )
}

const outer = {background:"#0a1a12",minHeight:"100vh",color:"#e8f5e0",fontFamily:"'DM Sans',sans-serif"}
const hero = {minHeight:"85vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"40px 24px"}
const badge = {display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(29,158,117,0.15)",border:"1px solid rgba(29,158,117,0.4)",borderRadius:"100px",padding:"6px 16px",fontSize:"13px",color:"#5dcaa5",marginBottom:"32px"}
const dot = {display:"inline-block",width:"7px",height:"7px",borderRadius:"50%",background:"#1d9e75"}
const h1 = {fontSize:"clamp(40px,7vw,76px)",fontWeight:"900",lineHeight:"1.05",color:"#e8f5e0",marginBottom:"20px",letterSpacing:"-1px"}
const sub = {fontSize:"18px",color:"#9fce9e",maxWidth:"520px",lineHeight:"1.7",marginBottom:"48px"}
const btns = {display:"flex",gap:"16px",flexWrap:"wrap",justifyContent:"center"}
const btnPrimary = {background:"#1d9e75",color:"#fff",padding:"14px 32px",borderRadius:"12px",border:"none",fontSize:"15px",fontWeight:"500",cursor:"pointer"}
const btnSecondary = {background:"transparent",color:"#5dcaa5",padding:"14px 32px",borderRadius:"12px",border:"1px solid rgba(93,202,165,0.4)",fontSize:"15px",fontWeight:"500",cursor:"pointer"}
const cards = {display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"16px",maxWidth:"800px",margin:"0 auto",padding:"0 24px 64px"}
const card = {background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"16px",padding:"24px"}
const stat = {fontSize:"36px",fontWeight:"700",color:"#1d9e75",marginBottom:"4px"}
const cardH = {fontSize:"15px",fontWeight:"500",color:"#e8f5e0",marginBottom:"6px"}
const cardP = {fontSize:"13px",color:"#7aab7a",lineHeight:"1.6"}