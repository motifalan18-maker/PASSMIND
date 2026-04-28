import { useState, useRef, useEffect } from "react";

// ── VISUAL COMPONENTS ─────────────────────────────────────────────────────────

function FractionBar({ numerator, denominator, color = "#22c55e" }) {
  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>{numerator}/{denominator} shown as a bar:</div>
      <div style={{ display: "flex", gap: 3, height: 38 }}>
        {Array.from({ length: denominator }, (_, i) => (
          <div key={i} style={{ flex: 1, borderRadius: 5, background: i < numerator ? color : "#1e293b", border: `1.5px solid ${i < numerator ? color : "#334155"}` }} />
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#64748b", marginTop: 5 }}>{numerator} out of {denominator} parts filled</div>
    </div>
  );
}

function NumberLine({ start = 0, end = 10, highlight = [] }) {
  return (
    <div style={{ margin: "12px 0", overflowX: "auto" }}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Number line:</div>
      <div style={{ display: "flex", alignItems: "center", minWidth: "max-content", gap: 0 }}>
        {Array.from({ length: end - start + 1 }, (_, i) => i + start).map(n => (
          <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid", borderColor: highlight.includes(n) ? "#22c55e" : "#334155", background: highlight.includes(n) ? "#022c1a" : "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: highlight.includes(n) ? "bold" : "normal", color: highlight.includes(n) ? "#22c55e" : "#94a3b8" }}>{n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MathSteps({ steps }) {
  return (
    <div style={{ margin: "12px 0", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: 14 }}>
      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Step by step:</div>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#22c55e", color: "#000", fontSize: 12, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
          <div style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.5, paddingTop: 3 }}>{s}</div>
        </div>
      ))}
    </div>
  );
}

function PhonicsCard({ word, phonemes }) {
  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Sound it out — {word}:</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        {phonemes.map((p, i) => (
          <div key={i} style={{ padding: "10px 14px", background: i % 2 === 0 ? "#022c1a" : "#1e3a5f", border: `2px solid ${i % 2 === 0 ? "#22c55e" : "#3b82f6"}`, borderRadius: 8, fontSize: 22, fontWeight: "bold", color: i % 2 === 0 ? "#22c55e" : "#60a5fa" }}>{p}</div>
        ))}
        <span style={{ fontSize: 18, color: "#64748b" }}>→</span>
        <div style={{ padding: "10px 16px", background: "#1e293b", borderRadius: 8, fontSize: 20, fontWeight: "bold", color: "#e2e8f0" }}>{word}</div>
      </div>
    </div>
  );
}

function CellDiagram() {
  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Animal Cell Diagram:</div>
      <svg viewBox="0 0 320 220" style={{ width: "100%", maxWidth: 320, display: "block" }}>
        <ellipse cx="160" cy="110" rx="145" ry="95" fill="#022c1a" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="6,3" />
        <ellipse cx="148" cy="102" rx="48" ry="40" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
        <ellipse cx="148" cy="102" rx="20" ry="16" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5" />
        <ellipse cx="242" cy="78" rx="28" ry="13" fill="#1a1a2e" stroke="#8b5cf6" strokeWidth="1.5" />
        <line x1="218" y1="78" x2="266" y2="78" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,2" />
        <ellipse cx="78" cy="142" rx="22" ry="18" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
        {[[202,132],[212,147],[197,157],[222,122],[187,142]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3" fill="#f43f5e" />
        ))}
        <text x="128" y="105" fill="#60a5fa" fontSize="9" textAnchor="middle">Nucleus</text>
        <text x="148" y="101" fill="#93c5fd" fontSize="7" textAnchor="middle">Nucleolus</text>
        <text x="242" y="62" fill="#a78bfa" fontSize="9" textAnchor="middle">Mitochondria</text>
        <text x="78" y="144" fill="#fbbf24" fontSize="9" textAnchor="middle">Vacuole</text>
        <text x="207" y="150" fill="#fb7185" fontSize="8">Ribosomes</text>
        <text x="268" y="187" fill="#22c55e" fontSize="8">Cell membrane</text>
      </svg>
    </div>
  );
}

function PhotosynthesisDiagram() {
  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Photosynthesis:</div>
      <svg viewBox="0 0 320 185" style={{ width: "100%", maxWidth: 320, display: "block" }}>
        <path d="M160,18 Q222,40 232,102 Q200,152 160,162 Q120,152 88,102 Q98,40 160,18Z" fill="#022c1a" stroke="#22c55e" strokeWidth="2" />
        <line x1="160" y1="18" x2="160" y2="162" stroke="#16a34a" strokeWidth="1.5" />
        <line x1="160" y1="70" x2="202" y2="97" stroke="#16a34a" strokeWidth="1" />
        <line x1="160" y1="92" x2="114" y2="112" stroke="#16a34a" strokeWidth="1" />
        <circle cx="38" cy="33" r="20" fill="#fbbf24" opacity="0.9" />
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <line key={i} x1={38+22*Math.cos(a*Math.PI/180)} y1={33+22*Math.sin(a*Math.PI/180)} x2={38+30*Math.cos(a*Math.PI/180)} y2={33+30*Math.sin(a*Math.PI/180)} stroke="#fbbf24" strokeWidth="2"/>
        ))}
        <text x="4" y="75" fill="#60a5fa" fontSize="9">CO₂</text>
        <text x="4" y="118" fill="#60a5fa" fontSize="9">H₂O</text>
        <line x1="28" y1="73" x2="88" y2="90" stroke="#60a5fa" strokeWidth="1.5"/>
        <line x1="28" y1="116" x2="88" y2="108" stroke="#60a5fa" strokeWidth="1.5"/>
        <line x1="60" y1="42" x2="108" y2="65" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,2"/>
        <text x="60" y="57" fill="#fbbf24" fontSize="8">Light</text>
        <text x="248" y="75" fill="#22c55e" fontSize="9">Glucose</text>
        <text x="254" y="110" fill="#a78bfa" fontSize="9">O₂</text>
        <line x1="230" y1="90" x2="246" y2="78" stroke="#22c55e" strokeWidth="1.5"/>
        <line x1="230" y1="105" x2="252" y2="108" stroke="#a78bfa" strokeWidth="1.5"/>
        <text x="160" y="96" fill="#4ade80" fontSize="8" textAnchor="middle">Chloroplast</text>
        <rect x="48" y="168" width="224" height="14" rx="4" fill="#0f172a" stroke="#334155"/>
        <text x="160" y="178" fill="#94a3b8" fontSize="7.5" textAnchor="middle">6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂</text>
      </svg>
    </div>
  );
}

function WaterCycleDiagram() {
  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>The Water Cycle:</div>
      <svg viewBox="0 0 320 180" style={{ width: "100%", maxWidth: 320, display: "block" }}>
        <rect x="0" y="0" width="320" height="132" fill="#020817" rx="6"/>
        <rect x="0" y="132" width="320" height="48" fill="#0f2a0a" rx="4"/>
        <ellipse cx="68" cy="133" rx="58" ry="13" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1"/>
        <polygon points="238,132 275,58 312,132" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
        <ellipse cx="155" cy="37" rx="40" ry="22" fill="#1e293b" stroke="#94a3b8" strokeWidth="1"/>
        <ellipse cx="133" cy="44" rx="25" ry="16" fill="#1e293b"/>
        <ellipse cx="177" cy="44" rx="25" ry="16" fill="#1e293b"/>
        {[[138,67],[153,71],[168,67],[146,78],[161,80]].map(([x,y],i)=>(
          <ellipse key={i} cx={x} cy={y} rx="2" ry="4" fill="#60a5fa"/>
        ))}
        <path d="M78,118 Q88,70 128,47" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2"/>
        <text x="12" y="92" fill="#f59e0b" fontSize="8">Evaporation</text>
        <text x="155" y="20" fill="#94a3b8" fontSize="8" textAnchor="middle">Condensation</text>
        <text x="190" y="77" fill="#60a5fa" fontSize="8">Precipitation</text>
        <path d="M278,122 Q200,130 128,132" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
        <text x="192" y="147" fill="#22c55e" fontSize="8">Runoff</text>
        <text x="68" y="136" fill="#93c5fd" fontSize="8" textAnchor="middle">Sea / Lake</text>
      </svg>
    </div>
  );
}

function AtomDiagram({ element = "Carbon", protons = 6, neutrons = 6, electrons = 6 }) {
  const shells = protons <= 2 ? [electrons] : protons <= 10 ? [2, electrons - 2] : [2, 8, electrons - 10];
  const colors = ["#f59e0b", "#22c55e", "#3b82f6"];
  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>{element} atom:</div>
      <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 200, display: "block" }}>
        <circle cx="100" cy="100" r="22" fill="#1e293b" stroke="#f43f5e" strokeWidth="2"/>
        <text x="100" y="97" fill="#fca5a5" fontSize="9" textAnchor="middle">{protons}p⁺</text>
        <text x="100" y="109" fill="#94a3b8" fontSize="9" textAnchor="middle">{neutrons}n</text>
        {shells.map((count, si) => {
          const r = 38 + si * 28;
          return (
            <g key={si}>
              <circle cx="100" cy="100" r={r} fill="none" stroke={colors[si]} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.5"/>
              {Array.from({ length: count }, (_, ei) => {
                const angle = (ei * 360) / count;
                return <circle key={ei} cx={100 + r * Math.cos((angle - 90) * Math.PI / 180)} cy={100 + r * Math.sin((angle - 90) * Math.PI / 180)} r="4" fill={colors[si]}/>;
              })}
            </g>
          );
        })}
        <text x="100" y="192" fill="#94a3b8" fontSize="9" textAnchor="middle">{element} — {electrons} electrons</text>
      </svg>
    </div>
  );
}

function PeriodicElements() {
  const elems = [
    { symbol:"H", name:"Hydrogen", number:1, mass:"1.008", color:"#f43f5e" },
    { symbol:"C", name:"Carbon", number:6, mass:"12.01", color:"#22c55e" },
    { symbol:"O", name:"Oxygen", number:8, mass:"16.00", color:"#3b82f6" },
    { symbol:"N", name:"Nitrogen", number:7, mass:"14.01", color:"#8b5cf6" },
  ];
  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Key elements:</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {elems.map(e => (
          <div key={e.symbol} style={{ width: 76, height: 86, border: `2px solid ${e.color}`, borderRadius: 8, background: "#0f172a", padding: 6, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#64748b" }}>{e.number}</div>
            <div style={{ fontSize: 26, fontWeight: "bold", color: e.color, lineHeight: 1.1 }}>{e.symbol}</div>
            <div style={{ fontSize: 10, color: "#e2e8f0" }}>{e.name}</div>
            <div style={{ fontSize: 9, color: "#64748b" }}>{e.mass}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VISUAL DETECTOR ───────────────────────────────────────────────────────────

function detectVisuals(text, subject, stage) {
  const low = text.toLowerCase();
  const visuals = [];
  if (stage === "primary") {
    if (subject === "reading") {
      const m = text.match(/\b([a-z]{3,8})\b/i);
      if (m) { const w = m[1].toLowerCase(); visuals.push(<PhonicsCard key="ph" word={w} phonemes={w.length <= 4 ? w.split("") : [w.slice(0,2), w.slice(2,4), w.slice(4)].filter(Boolean)} />); }
    }
    if (subject === "maths") {
      const f = text.match(/(\d+)\s*\/\s*(\d+)/);
      if (f) { const n=+f[1],d=+f[2]; if(d<=12&&n<=d) visuals.push(<FractionBar key="fb" numerator={n} denominator={d}/>); }
      if (low.includes("number line")||low.includes("count")||low.includes("add")||low.includes("subtract")) visuals.push(<NumberLine key="nl" start={0} end={10} highlight={[3,7]}/>);
      if (low.includes("step")||low.includes("solve")||low.includes("how")) visuals.push(<MathSteps key="ms" steps={["Read the question carefully","Write down what you know","Set up the number sentence","Work out the answer","Check your work!"]}/>);
    }
    if (subject === "science") {
      if (low.includes("water cycle")||low.includes("evaporation")||low.includes("rain")||low.includes("cloud")) visuals.push(<WaterCycleDiagram key="wc"/>);
    }
  }
  if (stage === "olevel" || stage === "alevel") {
    if (subject === "biology") {
      if (low.includes("cell")&&(low.includes("animal")||low.includes("structure")||low.includes("organelle")||low.includes("membrane"))) visuals.push(<CellDiagram key="cell"/>);
      if (low.includes("photosynthesis")||low.includes("chlorophyll")||low.includes("glucose")&&low.includes("light")) visuals.push(<PhotosynthesisDiagram key="ps"/>);
      if (low.includes("water cycle")||low.includes("evaporation")) visuals.push(<WaterCycleDiagram key="wc"/>);
    }
    if (subject === "chemistry") {
      if (low.includes("atom")||low.includes("electron")||low.includes("shell")||low.includes("orbit")||low.includes("proton")) visuals.push(<AtomDiagram key="atom" element="Carbon" protons={6} neutrons={6} electrons={6}/>);
      if (low.includes("element")||low.includes("periodic")||low.includes("hydrogen")||low.includes("oxygen")) visuals.push(<PeriodicElements key="pe"/>);
    }
    if (subject === "maths"||subject === "physics") {
      if (low.includes("step")||low.includes("solve")||low.includes("proof")||low.includes("method")) visuals.push(<MathSteps key="ms" steps={["Write down given information","Identify the correct formula","Substitute values carefully","Show all working clearly","State your answer with units"]}/>);
      const f = text.match(/(\d+)\s*\/\s*(\d+)/);
      if (f) { const n=+f[1],d=+f[2]; if(d<=12&&n<=d) visuals.push(<FractionBar key="fb" numerator={n} denominator={d}/>); }
    }
  }
  return visuals;
}

// ── APP DATA ──────────────────────────────────────────────────────────────────

const CURRICULA = ["ZIMSEC","Cambridge"];
const STAGES = [
  {id:"primary",label:"Primary",range:"Grade 1–6",emoji:"🌱",color:"#22c55e",ages:"Ages 6–12"},
  {id:"olevel",label:"O-Level",range:"Form 1–4",emoji:"📘",color:"#3b82f6",ages:"Ages 13–16"},
  {id:"alevel",label:"A-Level",range:"Form 5–6",emoji:"🎓",color:"#8b5cf6",ages:"Ages 17–18"},
];
const GRADES = {
  primary:["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"],
  olevel:["Form 1","Form 2","Form 3","Form 4"],
  alevel:["Form 5","Form 6"],
};
const SUBJECTS = {
  primary:[{id:"reading",label:"Reading & Phonics",emoji:"📖"},{id:"english",label:"English Language",emoji:"✏️"},{id:"maths",label:"Mathematics",emoji:"🔢"},{id:"science",label:"General Science",emoji:"🔬"}],
  olevel:[{id:"english",label:"English Language",emoji:"✏️"},{id:"maths",label:"Mathematics",emoji:"🔢"},{id:"biology",label:"Biology",emoji:"🧬"},{id:"chemistry",label:"Chemistry",emoji:"⚗️"},{id:"physics",label:"Physics",emoji:"⚡"},{id:"combined",label:"Combined Science",emoji:"🔭"}],
  alevel:[{id:"english",label:"English Literature",emoji:"📚"},{id:"maths",label:"Pure Mathematics",emoji:"∑"},{id:"biology",label:"Biology",emoji:"🧬"},{id:"chemistry",label:"Chemistry",emoji:"⚗️"},{id:"physics",label:"Physics",emoji:"⚡"}],
};
const MODES = [
  {id:"teach",label:"Teach Me",emoji:"💡",desc:"Learn a new concept with examples"},
  {id:"practice",label:"Practice",emoji:"✏️",desc:"Answer questions on this topic"},
  {id:"explain",label:"Explain a Topic",emoji:"🔍",desc:"Deep-dive into anything"},
  {id:"quiz",label:"Quick Quiz",emoji:"⚡",desc:"Test what you know"},
  {id:"mark",label:"Mark My Work",emoji:"✅",desc:"Submit your answer for feedback"},
];
const FREE_LIMIT = 4;

function buildPrompt({stage,grade,subject,curriculum,mode,topic,userInput,markAnswer}){
  const subLabel = SUBJECTS[stage]?.find(s=>s.id===subject)?.label||subject;
  const isPrimary = stage==="primary";
  const isA = stage==="alevel";
  const voice = isPrimary
    ? `You are a warm, encouraging primary school teacher. Use very simple words and short sentences for children aged 6–12. Use emojis. Always praise effort. For maths: show step-by-step working. For reading: break words into sounds. For science: use everyday examples.`
    : isA
    ? `You are an expert A-Level ${subLabel} teacher preparing students for ${curriculum} university entrance exams. Be thorough and precise. Include equations and formulas where relevant.`
    : `You are an experienced ${curriculum} ${subLabel} teacher for ${grade}. Balance clarity with exam rigour. Use relatable examples aligned to ${curriculum} expectations.`;
  const base = `${voice}\n\nCurriculum: ${curriculum} | Level: ${grade} | Subject: ${subLabel}\n\n`;
  if(mode==="teach") return `${base}Teach${topic?` the topic "${topic}"`:" a key foundational concept for this level"}.\n1. Clear explanation with real-world example\n2. Key points to remember (3–5 bullets)\n3. Memory trick or fun fact\n${isPrimary?"4. Simple home activity to practise":"4. How this appears in exams and key formulas"}`;
  if(mode==="practice") return `${base}Generate 3 practice questions on${topic?` "${topic}"`:" a key topic"}.\nFor each: question with marks, model answer, one exam tip.\n${isPrimary?"Fun and age-appropriate.":"Aligned to "+curriculum+" exam style."}`;
  if(mode==="explain") return `${base}Explain: "${userInput||topic||"a key concept for this level"}"\n1. Definition\n2. Why it matters\n3. Real-world example\n4. Common misconception\n${isPrimary?"5. How to explain to a friend":"5. How examiners test this"}`;
  if(mode==="quiz") return `${base}Create a 5-question quiz on${topic?` "${topic}"`:" this subject at this level"}.\nMix: multiple choice, short answer, true/false.\nAfter all questions, provide answers with brief explanations.`;
  if(mode==="mark") return `${base}Question: "${userInput}"\nStudent answer: "${markAnswer}"\n\n1. Marks awarded (state total)\n2. What was correct ✓\n3. What was missing or wrong ✗\n4. Model answer\n5. One specific improvement tip\n${isPrimary?"Be very encouraging — young learner.":"Be constructive and exam-focused."}`;
  return base;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function PassMind() {
  const [screen, setScreen] = useState("home");
  const [curriculum, setCurriculum] = useState("ZIMSEC");
  const [stage, setStage] = useState(null);
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [mode, setMode] = useState(null);
  const [topic, setTopic] = useState("");
  const [userInput, setUserInput] = useState("");
  const [markAnswer, setMarkAnswer] = useState("");
  const [streamText, setStreamText] = useState("");
  const [visuals, setVisuals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const responseRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(()=>{ if(streamText&&responseRef.current) responseRef.current.scrollIntoView({behavior:"smooth",block:"nearest"}); },[streamText]);

  const sc = STAGES.find(s=>s.id===stage);
  const color = sc?.color||"#22c55e";
  const subs = SUBJECTS[stage]||[];
  const remaining = FREE_LIMIT - usage;

  const ask = async () => {
    if(!isPro&&usage>=FREE_LIMIT){setShowPaywall(true);return;}
    if((mode==="explain"||mode==="mark")&&!userInput.trim()) return;
    if(mode==="mark"&&!markAnswer.trim()) return;
    setLoading(true); setStreamText(""); setVisuals([]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:buildPrompt({stage,grade,subject,curriculum,mode,topic,userInput,markAnswer})}]})});
      const data = await res.json();
      const text = data.content?.[0]?.text||"Something went wrong. Please try again.";
      setVisuals(detectVisuals(text,subject,stage));
      let i=0; if(timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(()=>{ i+=8; setStreamText(text.slice(0,i)); if(i>=text.length){clearInterval(timerRef.current);setStreamText(text);setLoading(false);} },12);
      setUsage(u=>u+1);
    } catch { setStreamText("Connection error. Please try again."); setLoading(false); }
  };

  const reset = ()=>{setStreamText("");setVisuals([]);setUserInput("");setMarkAnswer("");setTopic("");setMode(null);};
  const fullReset = ()=>{reset();setStage(null);setGrade(null);setSubject(null);setScreen("home");};

  const sub = subs.find(s=>s.id===subject);

  if(screen==="home") return (
    <div style={$.root}>
      <div style={$.hw}>
        <div style={$.hero}>
          <div style={$.glow}/>
          <div style={$.lr}><span style={{fontSize:32}}>🎓</span><span style={$.lt}>PassMind</span></div>
          <h1 style={$.ht}>Your child's AI teacher.<br/>Grade 1 to Form 6.</h1>
          <p style={$.hs}>ZIMSEC &amp; Cambridge · All subjects · Visual learning</p>
          <div style={$.tags}>{["📖 Reading","🔢 Maths","🧬 Biology","⚗️ Chemistry","⚡ Physics","✏️ English"].map(t=><span key={t} style={$.tag}>{t}</span>)}</div>
        </div>
        <div style={$.card}>
          <p style={$.cl}>Select curriculum</p>
          <div style={{display:"flex",gap:10}}>
            {CURRICULA.map(c=><button key={c} onClick={()=>setCurriculum(c)} style={{...$.sb,...(curriculum===c?$.sba:{})}}>{c}</button>)}
          </div>
        </div>
        <div style={$.card}>
          <p style={$.cl}>Select stage</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {STAGES.map(s=>(
              <button key={s.id} onClick={()=>{setStage(s.id);setGrade(GRADES[s.id][0]);setScreen("setup");}} style={{...$.stb,borderColor:s.color}}>
                <span style={{fontSize:24}}>{s.emoji}</span>
                <span style={{fontSize:13,fontWeight:"bold",color:s.color}}>{s.label}</span>
                <span style={{fontSize:11,color:"#64748b"}}>{s.range}</span>
                <span style={{fontSize:10,color:"#475569"}}>{s.ages}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={$.vbadge}><span style={{fontSize:16}}>👁️</span><span style={{fontSize:13,color:"#e2e8f0"}}>Visual diagrams auto-generated — cells, atoms, number lines, phonics &amp; more</span></div>
        <div style={$.fb}>
          <span style={{fontSize:13,color:"#64748b"}}>Free: {remaining>0?`${remaining} lessons remaining`:"Limit reached"}</span>
          <button onClick={()=>setShowPaywall(true)} style={$.pb}>Go Pro · $5/mo</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {[["12","Years"],["6","Subjects"],["2","Curricula"],["👁️","Visual"]].map(([n,l])=>(
            <div key={l} style={$.stat}><span style={$.sn}>{n}</span><span style={{fontSize:10,color:"#64748b"}}>{l}</span></div>
          ))}
        </div>
      </div>
      {showPaywall&&<PW onClose={()=>setShowPaywall(false)} onActivate={()=>{setIsPro(true);setShowPaywall(false);}}/>}
    </div>
  );

  if(screen==="setup") return (
    <div style={$.root}>
      <div style={$.wrap}>
        <TB onBack={fullReset} label={`${curriculum} · ${sc?.label}`} color={color}/>
        <div style={$.sec}><p style={$.stl}>Grade / Form</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {GRADES[stage].map(g=><button key={g} onClick={()=>setGrade(g)} style={{...$.chip,...(grade===g?{background:color,color:"#fff",borderColor:color}:{})}}>{g}</button>)}
          </div>
        </div>
        <div style={$.sec}><p style={$.stl}>Subject</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {subs.map(s=><button key={s.id} onClick={()=>setSubject(s.id)} style={{...$.subj,...(subject===s.id?{borderColor:color,background:color+"18"}:{})}}>
              <span style={{fontSize:20}}>{s.emoji}</span>
              <span style={{fontSize:13,fontWeight:"bold",color:subject===s.id?color:"#e2e8f0"}}>{s.label}</span>
            </button>)}
          </div>
        </div>
        <button disabled={!grade||!subject} onClick={()=>setScreen("learn")} style={{...$.cta,background:(!grade||!subject)?"#334155":color,cursor:(!grade||!subject)?"not-allowed":"pointer"}}>Start Learning →</button>
      </div>
    </div>
  );

  return (
    <div style={$.root}>
      <div style={$.wrap}>
        <TB onBack={()=>{reset();setScreen("setup");}} label={`${grade} · ${sub?.label}`} color={color} extra={<span style={{fontSize:11,color:isPro?color:"#f59e0b"}}>{isPro?"✓ PRO":`${remaining} free left`}</span>}/>
        {!mode&&(
          <div style={$.sec}><p style={$.stl}>What do you want to do?</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {MODES.map(m=><button key={m.id} onClick={()=>setMode(m.id)} style={$.modeBtn}>
                <span style={{fontSize:20}}>{m.emoji}</span>
                <span style={{fontSize:13,fontWeight:"bold",color:"#e2e8f0"}}>{m.label}</span>
                <span style={{fontSize:11,color:"#64748b",lineHeight:1.4}}>{m.desc}</span>
              </button>)}
            </div>
          </div>
        )}
        {mode&&(
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <button onClick={reset} style={$.back}>← Back</button>
              <span style={{fontSize:13,fontWeight:"bold",color}}>{MODES.find(m=>m.id===mode)?.emoji} {MODES.find(m=>m.id===mode)?.label}</span>
            </div>
            {(mode==="teach"||mode==="practice"||mode==="quiz")&&(
              <div style={$.iw}><label style={$.il}>Topic (optional)</label>
                <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder={subject==="maths"?"e.g. Fractions":subject==="biology"?"e.g. Photosynthesis":subject==="reading"?"e.g. Vowel sounds":"Topic name..."} style={$.input}/>
              </div>
            )}
            {(mode==="explain"||mode==="mark")&&(
              <div style={$.iw}><label style={$.il}>{mode==="explain"?"What do you want explained?":"The question or task"}</label>
                <textarea value={userInput} onChange={e=>setUserInput(e.target.value)} placeholder={mode==="explain"?"Type the topic or concept...":"Paste the question here..."} style={$.ta}/>
              </div>
            )}
            {mode==="mark"&&(
              <div style={$.iw}><label style={$.il}>Your answer (to be marked)</label>
                <textarea value={markAnswer} onChange={e=>setMarkAnswer(e.target.value)} placeholder="Write your full answer here..." style={$.ta}/>
              </div>
            )}
            <button onClick={ask} disabled={loading} style={{...$.cta,background:loading?"#334155":color,cursor:loading?"not-allowed":"pointer"}}>
              {loading?"⟳  Thinking...":"Get Answer →"}
            </button>
            {(streamText||visuals.length>0)&&(
              <div ref={responseRef} style={$.resp}>
                <div style={{fontSize:11,color,textTransform:"uppercase",letterSpacing:1,fontWeight:"bold",marginBottom:12}}>✦ PassMind Teacher</div>
                {visuals.length>0&&(
                  <div style={$.vblock}>
                    <div style={{fontSize:11,color:"#64748b",marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>👁️ Visual aids</div>
                    {visuals}
                  </div>
                )}
                <div style={{fontSize:14,lineHeight:1.9,color:"#e2e8f0",whiteSpace:"pre-wrap"}}>{streamText}</div>
                {!isPro&&usage>=FREE_LIMIT&&(
                  <div style={$.nudge}>You've used all {FREE_LIMIT} free lessons.
                    <button onClick={()=>setShowPaywall(true)} style={$.nb}>Upgrade to Pro →</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div style={$.bnav}>
          <button onClick={fullReset} style={$.nav}>🏠 Home</button>
          <button onClick={()=>{reset();setScreen("setup");}} style={$.nav}>📚 Subjects</button>
          <button onClick={()=>setShowPaywall(true)} style={{...$.nav,color:isPro?color:"#f59e0b"}}>{isPro?"✓ Pro":"⭐ Pro"}</button>
        </div>
      </div>
      {showPaywall&&<PW onClose={()=>setShowPaywall(false)} onActivate={()=>{setIsPro(true);setShowPaywall(false);}}/>}
    </div>
  );
}

function TB({onBack,label,color,extra}){
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 0 20px",borderBottom:"1px solid #1e293b",marginBottom:20}}>
      <button onClick={onBack} style={{background:"none",border:"1px solid #334155",borderRadius:6,color:"#94a3b8",padding:"4px 12px",cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>←</button>
      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:"bold",color}}>{label}</span>{extra}</div>
      <span style={{fontSize:20}}>🎓</span>
    </div>
  );
}

function PW({onClose,onActivate}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:20}}>
      <div style={{background:"#0f172a",border:"1.5px solid #22c55e",borderRadius:16,padding:"32px 28px",maxWidth:420,width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{fontSize:32,textAlign:"center",marginBottom:10}}>🎓</div>
        <h2 style={{fontSize:20,fontWeight:"bold",color:"#22c55e",textAlign:"center",margin:"0 0 8px"}}>Upgrade to PassMind Pro</h2>
        <p style={{fontSize:13,color:"#94a3b8",textAlign:"center",marginBottom:20,lineHeight:1.5}}>Unlimited AI lessons with visual diagrams — every subject, every grade, both curricula.</p>
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          {[["1 Child","$5","#22c55e"],["Family (3 kids)","$8","#8b5cf6"]].map(([l,a,c])=>(
            <div key={l} style={{flex:1,background:"#020817",border:`1.5px solid ${c}`,borderRadius:10,padding:12,textAlign:"center"}}>
              <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{l}</div>
              <div style={{fontSize:24,fontWeight:"bold",color:"#e2e8f0"}}>{a}<span style={{fontSize:12,color:"#64748b"}}>/mo</span></div>
            </div>
          ))}
        </div>
        {["Unlimited AI lessons","Visual diagrams auto-generated","All subjects · All grades","ZIMSEC + Cambridge","Mark my work feature","Step-by-step visual explanations"].map(f=>(
          <div key={f} style={{display:"flex",gap:8,fontSize:13,color:"#e2e8f0",marginBottom:8}}><span style={{color:"#22c55e"}}>✓</span>{f}</div>
        ))}
        <div style={{fontSize:12,color:"#64748b",textAlign:"center",margin:"14px 0"}}>Pay via EcoCash USD · WhatsApp receipt to activate</div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:11,background:"none",border:"1px solid #334155",borderRadius:8,color:"#64748b",cursor:"pointer",fontFamily:"inherit",fontSize:13}}>Later</button>
          <button onClick={onActivate} style={{flex:2,padding:11,background:"linear-gradient(135deg,#22c55e,#16a34a)",border:"none",borderRadius:8,color:"#fff",fontWeight:"bold",cursor:"pointer",fontFamily:"inherit",fontSize:13}}>Pay via EcoCash →</button>
        </div>
        <p style={{fontSize:10,color:"#475569",textAlign:"center",marginTop:12}}>Send USD to your EcoCash number · WhatsApp your receipt · Activated within 1 hour</p>
      </div>
    </div>
  );
}

const $ = {
  root:{minHeight:"100vh",background:"#020817",color:"#e2e8f0",fontFamily:"'Georgia',serif"},
  hw:{maxWidth:680,margin:"0 auto",padding:"0 16px 60px"},
  wrap:{maxWidth:680,margin:"0 auto",padding:"0 16px 80px"},
  hero:{position:"relative",textAlign:"center",padding:"48px 16px 28px",overflow:"hidden"},
  glow:{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:400,height:200,background:"radial-gradient(ellipse,rgba(34,197,94,0.15) 0%,transparent 70%)",pointerEvents:"none"},
  lr:{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:14},
  lt:{fontSize:28,fontWeight:"bold",color:"#22c55e",letterSpacing:"-0.5px"},
  ht:{fontSize:24,fontWeight:"bold",color:"#f1f5f9",margin:"0 0 10px",lineHeight:1.3},
  hs:{fontSize:13,color:"#64748b",marginBottom:18},
  tags:{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"},
  tag:{fontSize:12,background:"#0f172a",border:"1px solid #1e293b",borderRadius:20,padding:"4px 12px",color:"#94a3b8"},
  card:{background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:18,marginBottom:14},
  cl:{fontSize:11,color:"#64748b",textTransform:"uppercase",letterSpacing:1,margin:"0 0 12px"},
  sb:{flex:1,padding:10,background:"#1e293b",border:"1.5px solid #334155",borderRadius:8,color:"#94a3b8",fontSize:14,cursor:"pointer",fontFamily:"inherit"},
  sba:{background:"#022c1a",borderColor:"#22c55e",color:"#22c55e"},
  stb:{background:"#020817",border:"1.5px solid",borderRadius:12,padding:"16px 10px",cursor:"pointer",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:4,fontFamily:"inherit"},
  vbadge:{display:"flex",alignItems:"center",gap:10,background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"12px 16px",marginBottom:14},
  fb:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,marginBottom:14},
  pb:{background:"linear-gradient(135deg,#f59e0b,#d97706)",border:"none",borderRadius:20,padding:"6px 16px",color:"#fff",fontSize:12,fontWeight:"bold",cursor:"pointer",fontFamily:"inherit"},
  stat:{background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,padding:"14px 8px",textAlign:"center",display:"flex",flexDirection:"column",gap:2},
  sn:{fontSize:22,fontWeight:"bold",color:"#22c55e"},
  sec:{marginBottom:20},
  stl:{fontSize:11,color:"#64748b",textTransform:"uppercase",letterSpacing:1,margin:"0 0 10px"},
  chip:{padding:"7px 16px",fontSize:13,fontFamily:"inherit",background:"#0f172a",border:"1.5px solid #1e293b",borderRadius:20,color:"#94a3b8",cursor:"pointer"},
  subj:{background:"#0f172a",border:"1.5px solid #1e293b",borderRadius:12,padding:14,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:10,fontFamily:"inherit"},
  cta:{width:"100%",padding:14,fontSize:15,fontWeight:"bold",border:"none",borderRadius:10,color:"#fff",fontFamily:"inherit",marginTop:8},
  modeBtn:{background:"#0f172a",border:"1.5px solid #1e293b",borderRadius:12,padding:"16px 14px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",display:"flex",flexDirection:"column",gap:4},
  back:{background:"none",border:"1px solid #334155",borderRadius:6,color:"#94a3b8",padding:"4px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit"},
  iw:{marginBottom:14},
  il:{display:"block",fontSize:11,color:"#64748b",textTransform:"uppercase",letterSpacing:0.5,marginBottom:6},
  input:{width:"100%",padding:"12px 14px",background:"#0f172a",border:"1.5px solid #1e293b",borderRadius:10,color:"#e2e8f0",fontSize:14,fontFamily:"inherit",boxSizing:"border-box"},
  ta:{width:"100%",minHeight:90,padding:"12px 14px",background:"#0f172a",border:"1.5px solid #1e293b",borderRadius:10,color:"#e2e8f0",fontSize:14,fontFamily:"inherit",resize:"vertical",lineHeight:1.6,boxSizing:"border-box"},
  resp:{marginTop:20,background:"#0f172a",border:"1.5px solid #1e293b",borderRadius:12,padding:20},
  vblock:{background:"#020817",border:"1px solid #1e293b",borderRadius:10,padding:14,marginBottom:16},
  nudge:{marginTop:16,padding:12,background:"#1e293b",borderRadius:8,fontSize:13,color:"#f59e0b",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8},
  nb:{background:"#f59e0b",border:"none",borderRadius:6,padding:"6px 12px",color:"#000",fontSize:12,fontWeight:"bold",cursor:"pointer",fontFamily:"inherit"},
  bnav:{position:"fixed",bottom:0,left:0,right:0,background:"#0f172a",borderTop:"1px solid #1e293b",display:"flex",justifyContent:"space-around",padding:"12px 0"},
  nav:{background:"none",border:"none",color:"#64748b",fontSize:13,cursor:"pointer",fontFamily:"inherit",padding:"4px 12px"},
};
