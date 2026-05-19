import { useState, useEffect } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const THEMES = {
  barbearia: {
    accent: "#C8A96E", accentDim: "#8B6914", accentSoft: "#C8A96E18",
    bg: "#080808", surface: "#0F0F0F", card: "#141414", cardHov: "#1A1A1A",
    border: "#1E1E1E", border2: "#2A2A2A",
    text: "#F5F0E8", textMid: "#8A8078", textDim: "#3A3530",
    green: "#4CAF82", red: "#E05050", yellow: "#D4A840", blue: "#5090D0",
    emoji: "✂️", label: "Barbearia Kings",
  },
  salao: {
    accent: "#E8A0A0", accentDim: "#C0505A", accentSoft: "#E8A0A018",
    bg: "#080608", surface: "#0F0A0A", card: "#160E0E", cardHov: "#1C1212",
    border: "#201616", border2: "#2A1E1E",
    text: "#F8F0F0", textMid: "#8A7070", textDim: "#3A2828",
    green: "#4CAF82", red: "#E05050", yellow: "#D4A840", blue: "#5090D0",
    emoji: "💅", label: "Salão Elegance",
  },
};

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const today = new Date();
const todayStr = today.toLocaleDateString("pt-BR");
const fmt = n => new Intl.NumberFormat("pt-BR", { style:"currency", currency:"BRL", maximumFractionDigits:2 }).format(n||0);
const fmtN = n => new Intl.NumberFormat("pt-BR").format(n||0);
const uid = () => Date.now() + Math.random();

const PROFESSIONALS = {
  barbearia: [
    { id:1, name:"Rafael Costa",  role:"Barbeiro Master",  avatar:"RC", color:"#C8A96E", services:["Corte Degradê","Corte + Barba","Barba Completa"], rating:5.0, totalAtend:342, totalRec:18540 },
    { id:2, name:"Diego Mendes",  role:"Barbeiro Senior",  avatar:"DM", color:"#7090C0", services:["Corte Clássico","Nevado","Sobrancelha"], rating:4.9, totalAtend:278, totalRec:12900 },
    { id:3, name:"Lucas Silva",   role:"Barbeiro",          avatar:"LS", color:"#80A880", services:["Navalhado","Corte Infantil"], rating:4.8, totalAtend:198, totalRec:8820 },
  ],
  salao: [
    { id:1, name:"Ana Paula",     role:"Cabeleireira Master", avatar:"AP", color:"#E8A0A0", services:["Coloração","Luzes","Balayage"], rating:5.0, totalAtend:412, totalRec:52600 },
    { id:2, name:"Fernanda Lima", role:"Cabeleireira Senior", avatar:"FL", color:"#A0C0D8", services:["Corte Feminino","Escova","Hidratação"], rating:4.9, totalAtend:316, totalRec:28400 },
    { id:3, name:"Camila Rocha",  role:"Manicure & Pedicure", avatar:"CR", color:"#C8A0D0", services:["Manicure","Pedicure","Nail Art"], rating:4.8, totalAtend:524, totalRec:21000 },
  ],
};

const makeAppts = (type) => {
  const profs = PROFESSIONALS[type];
  const services = type === "barbearia"
    ? [["Corte Degradê",45,45],["Corte + Barba",60,65],["Barba Completa",30,35],["Nevado",45,50],["Corte Infantil",30,30]]
    : [["Corte Feminino",60,80],["Coloração Completa",150,180],["Luzes / Balayage",180,250],["Escova Progressiva",120,150],["Manicure + Pedicure",90,70]];
  const names = ["Marcos Alves","João Pedro","Carlos Silva","Rafael Souza","Bruno Lima","Thiago Costa","André Nunes","Felipe Ramos","Diego Mendes","Paulo Santos","Lucas Ferreira","Gabriel Cruz"];
  const times = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];
  const statuses = ["confirmado","confirmado","confirmado","aguardando","confirmado","concluido","concluido","concluido"];

  let id = 1;
  const appts = [];
  // Today appointments
  [0,1,2,3,5,6,9,10,12,13,14,16].forEach((tIdx, i) => {
    const prof = profs[i % profs.length];
    const svc = services[i % services.length];
    const name = names[i % names.length];
    const status = tIdx < 10 ? "concluido" : tIdx < 13 ? "confirmado" : statuses[i%statuses.length];
    appts.push({
      id: id++, date: todayStr, time: times[tIdx], profId: prof.id,
      profName: prof.name, service: svc[0], duration: svc[1], price: svc[2],
      client: name, phone: `21 9${Math.floor(Math.random()*9000+1000)}-${Math.floor(Math.random()*9000+1000)}`,
      status, notes: i===2?"Preferência por produto sem álcool":"",
    });
  });
  // Yesterday
  [0,2,5,8,10,13,15].forEach((tIdx, i) => {
    const prof = profs[i % profs.length];
    const svc = services[(i+1) % services.length];
    const d = new Date(today); d.setDate(d.getDate()-1);
    appts.push({
      id: id++, date: d.toLocaleDateString("pt-BR"), time: times[tIdx], profId: prof.id,
      profName: prof.name, service: svc[0], duration: svc[1], price: svc[2],
      client: names[(i+3) % names.length], phone: `21 9${Math.floor(Math.random()*9000+1000)}-${Math.floor(Math.random()*9000+1000)}`,
      status: "concluido", notes: "",
    });
  });
  // Tomorrow
  [1,3,6,9,11,14,16].forEach((tIdx, i) => {
    const prof = profs[i % profs.length];
    const svc = services[(i+2) % services.length];
    const d = new Date(today); d.setDate(d.getDate()+1);
    appts.push({
      id: id++, date: d.toLocaleDateString("pt-BR"), time: times[tIdx], profId: prof.id,
      profName: prof.name, service: svc[0], duration: svc[1], price: svc[2],
      client: names[(i+5) % names.length], phone: `21 9${Math.floor(Math.random()*9000+1000)}-${Math.floor(Math.random()*9000+1000)}`,
      status: "confirmado", notes: "",
    });
  });
  return appts.sort((a,b) => a.time.localeCompare(b.time));
};

const makeClients = (type) => {
  const names = ["Marcos Alves","João Pedro","Carlos Silva","Rafael Souza","Bruno Lima","Thiago Costa","André Nunes","Felipe Ramos","Diego Santos","Paulo Lima","Lucas Ferreira","Gabriel Cruz","Ricardo Mendes","Daniel Costa","Mateus Alves","Eduardo Rocha","Vinicius Lima","Henrique Santos","Leonardo Costa","Alexandre Nunes"];
  return names.map((name, i) => ({
    id: i+1, name, phone: `21 9${Math.floor(Math.random()*9000+1000)}-${Math.floor(Math.random()*9000+1000)}`,
    visits: Math.floor(Math.random()*30+1), totalSpent: Math.floor(Math.random()*800+100),
    lastVisit: new Date(today.getTime() - Math.random()*60*24*60*60*1000).toLocaleDateString("pt-BR"),
    status: i < 3 ? "vip" : i < 12 ? "ativo" : "inativo",
    rating: (4.5 + Math.random()*0.5).toFixed(1),
  }));
};

const makeWaLogs = () => [
  { id:1, client:"Marcos Alves",  phone:"21 99001-0001", msg:"🔔 Novo agendamento: Corte Degradê · Rafael · Hoje às 14:00", status:"lido", time:"13:45", type:"novo" },
  { id:2, client:"João Pedro",    phone:"21 99001-0002", msg:"⏰ Lembrete: Seu agendamento é amanhã às 09:00. Confirme sua presença!", status:"respondido", time:"13:00", type:"lembrete" },
  { id:3, client:"Carlos Silva",  phone:"21 99001-0003", msg:"✅ Agendamento confirmado! Corte + Barba com Diego · Amanhã às 10:30", status:"enviado", time:"12:30", type:"confirmacao" },
  { id:4, client:"Rafael Souza",  phone:"21 99001-0004", msg:"🔔 Novo agendamento: Barba Completa · Lucas · Hoje às 16:00", status:"lido", time:"11:20", type:"novo" },
  { id:5, client:"Bruno Lima",    phone:"21 99001-0005", msg:"⭐ Como foi seu atendimento? Deixe sua avaliação! [link]", status:"respondido", time:"10:00", type:"nps" },
  { id:6, client:"Thiago Costa",  phone:"21 99001-0006", msg:"🎉 Olá Thiago! Você não nos visita há 45 dias. Que tal agendar?", status:"enviado", time:"09:30", type:"reativacao" },
];

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────
function Bd({ c, sm, children }) {
  return <span style={{ background:c+"22", color:c, border:`1px solid ${c}44`, borderRadius:5, padding:sm?"1px 7px":"3px 10px", fontSize:sm?10:11, fontWeight:700, whiteSpace:"nowrap" }}>{children}</span>;
}
function Cd({ children, sx, onClick }) {
  const [h, sH] = useState(false);
  return <div onMouseEnter={() => onClick && sH(true)} onMouseLeave={() => sH(false)} onClick={onClick}
    style={{ background: h ? "#1A1A1A" : "#141414", border:`1px solid ${h?"#2A2A2A":"#1E1E1E"}`, borderRadius:14, transition:"all .18s", cursor:onClick?"pointer":"default", ...sx }}>{children}</div>;
}
function Kpi({ icon, label, value, sub, color, trend }) {
  return <Cd sx={{ padding:"20px 22px", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:0, right:0, width:90, height:90, background:`radial-gradient(circle at top right,${color}18,transparent 70%)`, pointerEvents:"none" }}/>
    <div style={{ fontSize:22, marginBottom:10 }}>{icon}</div>
    <div style={{ fontSize:24, fontWeight:900, color, letterSpacing:-1, marginBottom:2 }}>{value}</div>
    <div style={{ fontSize:13, fontWeight:700, color:"#F5F0E8", marginBottom:2 }}>{label}</div>
    {sub && <div style={{ fontSize:11, color:"#8A8078" }}>{sub}</div>}
    {trend !== undefined && <div style={{ fontSize:11, color: trend >= 0 ? "#4CAF82" : "#E05050", marginTop:4, fontWeight:700 }}>{trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs ontem</div>}
  </Cd>;
}
function StatusBd({ status }) {
  const map = { confirmado:["#4CAF82","Confirmado"], aguardando:["#D4A840","Aguardando"], concluido:["#8A8078","Concluído"], cancelado:["#E05050","Cancelado"], vip:["#C8A96E","VIP"], ativo:["#4CAF82","Ativo"], inativo:["#8A8078","Inativo"] };
  const [c, l] = map[status] || ["#8A8078", status];
  return <Bd c={c} sm>{l}</Bd>;
}
function Avatar({ initials, color, size = 36 }) {
  return <div style={{ width:size, height:size, borderRadius:size/3.5, background:`${color}25`, border:`1.5px solid ${color}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.32, fontWeight:800, color, flexShrink:0 }}>{initials}</div>;
}
function Modal({ children, onClose, wide }) {
  return <div onClick={onClose} style={{ position:"fixed", inset:0, background:"#000000B0", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200 }}>
    <div onClick={e => e.stopPropagation()} style={{ background:"#141414", border:"1px solid #2A2A2A", borderRadius:18, padding:28, width:wide?680:460, maxHeight:"88vh", overflowY:"auto" }}>
      {children}
    </div>
  </div>;
}

// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════════════════
function Dashboard({ appts, T }) {
  const todayAppts = appts.filter(a => a.date === todayStr);
  const done = todayAppts.filter(a => a.status === "concluido");
  const upcoming = todayAppts.filter(a => a.status !== "concluido" && a.status !== "cancelado");
  const revenue = done.reduce((s, a) => s + a.price, 0);
  const projRevenue = todayAppts.filter(a => a.status !== "cancelado").reduce((s, a) => s + a.price, 0);
  const occupancy = Math.round((todayAppts.length / 18) * 100);

  const now = new Date();
  const nextAppt = upcoming.find(a => {
    const [h, m] = a.time.split(":").map(Number);
    const apptTime = new Date(); apptTime.setHours(h, m, 0);
    return apptTime > now;
  });

  return <div>
    <div style={{ marginBottom:28 }}>
      <div style={{ fontSize:13, color:T.textMid, marginBottom:4 }}>{today.toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long",year:"numeric"})}</div>
      <div style={{ fontSize:26, fontWeight:900, color:T.text, letterSpacing:-0.5 }}>Bom dia! ☀️ <span style={{ color:T.accent }}>{T.label.split(" ")[0]}</span></div>
    </div>

    {/* KPIs */}
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
      <Kpi icon="✂️" label="Atendimentos Hoje" value={todayAppts.length} sub={`${done.length} concluídos · ${upcoming.length} pendentes`} color={T.accent} trend={8}/>
      <Kpi icon="💰" label="Receita do Dia" value={fmt(revenue)} sub={`Projeção: ${fmt(projRevenue)}`} color={T.green} trend={12}/>
      <Kpi icon="📊" label="Ocupação" value={`${occupancy}%`} sub="da agenda preenchida" color={T.yellow} trend={-5}/>
      <Kpi icon="⭐" label="Avaliação Média" value="4.9" sub="últimos 30 dias" color={T.blue}/>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:14, marginBottom:14 }}>
      {/* Agenda do dia */}
      <Cd sx={{ padding:"22px 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.text }}>📅 Agenda de Hoje</div>
          <Bd c={T.accent}>{todayAppts.length} agendamentos</Bd>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, maxHeight:340, overflowY:"auto" }}>
          {todayAppts.sort((a,b) => a.time.localeCompare(b.time)).map(a => {
            const isNow = a.status === "confirmado" && (() => {
              const [h,m] = a.time.split(":").map(Number);
              const t = new Date(); t.setHours(h,m,0);
              const diff = t - now;
              return diff >= 0 && diff < 60*60*1000;
            })();
            return <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, background: isNow ? T.accentSoft : "#0F0F0F", border:`1px solid ${isNow ? T.accent+"44" : "#1E1E1E"}`, transition:"all .2s" }}>
              <div style={{ textAlign:"center", flexShrink:0, width:44 }}>
                <div style={{ fontSize:13, fontWeight:800, color: a.status==="concluido" ? T.textDim : T.accent }}>{a.time}</div>
                <div style={{ fontSize:9, color:T.textDim }}>{a.duration}min</div>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color: a.status==="concluido" ? T.textMid : T.text, marginBottom:2 }}>{a.client}</div>
                <div style={{ fontSize:11, color:T.textMid, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.service} · {a.profName}</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.green, marginBottom:3 }}>{fmt(a.price)}</div>
                <StatusBd status={a.status}/>
              </div>
            </div>;
          })}
        </div>
      </Cd>

      {/* Right column */}
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {/* Próximo */}
        {nextAppt && <Cd sx={{ padding:"18px 20px", border:`1px solid ${T.accent}44`, background:T.accentSoft }}>
          <div style={{ fontSize:11, color:T.accent, fontWeight:700, marginBottom:10, letterSpacing:1 }}>⏱ PRÓXIMO ATENDIMENTO</div>
          <div style={{ fontSize:20, fontWeight:900, color:T.accent, marginBottom:4 }}>{nextAppt.time}</div>
          <div style={{ fontSize:15, fontWeight:700, color:T.text, marginBottom:4 }}>{nextAppt.client}</div>
          <div style={{ fontSize:12, color:T.textMid, marginBottom:8 }}>{nextAppt.service}</div>
          <div style={{ fontSize:11, color:T.textMid }}>👤 {nextAppt.profName}</div>
        </Cd>}

        {/* Performance por profissional */}
        <Cd sx={{ padding:"18px 20px", flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:14 }}>Performance Hoje</div>
          {PROFESSIONALS[T.type || "barbearia"].map(p => {
            const pAppts = todayAppts.filter(a => a.profId === p.id);
            const pDone = pAppts.filter(a => a.status === "concluido");
            const pRev = pDone.reduce((s, a) => s + a.price, 0);
            return <div key={p.id} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                <Avatar initials={p.avatar} color={p.color} size={32}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{p.name.split(" ")[0]}</div>
                  <div style={{ fontSize:10, color:T.textMid }}>{pDone.length}/{pAppts.length} atend. · {fmt(pRev)}</div>
                </div>
              </div>
              <div style={{ height:4, background:"#1E1E1E", borderRadius:2 }}>
                <div style={{ width:`${pAppts.length ? (pDone.length/pAppts.length)*100 : 0}%`, height:"100%", background:p.color, borderRadius:2, transition:"width .5s" }}/>
              </div>
            </div>;
          })}
        </Cd>
      </div>
    </div>

    {/* Notificações recentes */}
    <Cd sx={{ padding:"20px 22px" }}>
      <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:14 }}>💬 Notificações WhatsApp Recentes</div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {makeWaLogs().slice(0,4).map(l => (
          <div key={l.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, background:"#0F0F0F", border:"1px solid #1E1E1E" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background: l.status==="respondido"?"#4CAF82":l.status==="lido"?"#5090D0":"#8A8078", flexShrink:0 }}/>
            <div style={{ flex:1, minWidth:0 }}>
              <span style={{ fontSize:12, fontWeight:600, color:T.text }}>{l.client}</span>
              <span style={{ fontSize:11, color:T.textMid, marginLeft:8, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", display:"inline-block", maxWidth:300, verticalAlign:"middle" }}>{l.msg}</span>
            </div>
            <span style={{ fontSize:10, color:T.textDim, flexShrink:0 }}>{l.time}</span>
          </div>
        ))}
      </div>
    </Cd>
  </div>;
}

// ════════════════════════════════════════════════════════════════════════════
// AGENDA
// ════════════════════════════════════════════════════════════════════════════
function Agenda({ appts, setAppts, T }) {
  const [selDate, setSelDate] = useState(todayStr);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState("todos");

  const days = Array.from({length:7},(_,i) => {
    const d = new Date(today); d.setDate(d.getDate() + i - 1);
    return { date:d, str:d.toLocaleDateString("pt-BR") };
  });

  const dayAppts = appts
    .filter(a => a.date === selDate)
    .filter(a => filter === "todos" || a.status === filter)
    .sort((a,b) => a.time.localeCompare(b.time));

  const profs = PROFESSIONALS[T.type || "barbearia"];

  const updateStatus = (id, status) => {
    setAppts(p => p.map(a => a.id === id ? {...a, status} : a));
  };

  const addAppt = () => {
    if (!form.client || !form.time || !form.profId) return;
    const prof = profs.find(p => p.id === parseInt(form.profId));
    setAppts(p => [...p, {
      ...form, id: uid(), date: selDate, profId: parseInt(form.profId),
      profName: prof?.name || "", price: parseFloat(form.price||0),
      duration: parseInt(form.duration||30), status:"confirmado",
    }]);
    setModal(null); setForm({});
  };

  return <div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
      <div>
        <div style={{ fontSize:20, fontWeight:900, color:T.text }}>Agenda</div>
        <div style={{ fontSize:12, color:T.textMid }}>{dayAppts.length} agendamentos · {fmt(dayAppts.filter(a=>a.status!=="cancelado").reduce((s,a)=>s+a.price,0))}</div>
      </div>
      <button onClick={() => { setForm({ date:selDate }); setModal("add"); }} style={{ background:T.accent, border:"none", borderRadius:10, padding:"10px 18px", color:"#000", fontWeight:800, fontSize:13, cursor:"pointer" }}>
        + Novo Agendamento
      </button>
    </div>

    {/* Week strip */}
    <div style={{ display:"flex", gap:8, marginBottom:20, overflowX:"auto", paddingBottom:4 }}>
      {days.map(({date:d, str}) => {
        const cnt = appts.filter(a => a.date === str).length;
        const isSel = str === selDate;
        const isToday = str === todayStr;
        return <button key={str} onClick={() => setSelDate(str)} style={{ flexShrink:0, width:72, background: isSel ? T.accent : "#141414", border:`1px solid ${isSel ? T.accent : isToday ? T.accent+"44" : "#1E1E1E"}`, borderRadius:12, padding:"10px 6px", cursor:"pointer", textAlign:"center", transition:"all .2s" }}>
          <div style={{ fontSize:9, color: isSel ? "#000" : T.textMid, marginBottom:4, textTransform:"uppercase", fontWeight:600 }}>
            {d.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".","")}
          </div>
          <div style={{ fontSize:20, fontWeight:900, color: isSel ? "#000" : T.text }}>{d.getDate()}</div>
          {cnt > 0 && <div style={{ fontSize:9, color: isSel ? "#000" : T.accent, fontWeight:700, marginTop:2 }}>{cnt} agend.</div>}
          {isToday && !isSel && <div style={{ width:4, height:4, borderRadius:"50%", background:T.accent, margin:"3px auto 0" }}/>}
        </button>;
      })}
    </div>

    {/* Filters */}
    <div style={{ display:"flex", gap:8, marginBottom:16 }}>
      {["todos","confirmado","aguardando","concluido","cancelado"].map(f => (
        <button key={f} onClick={() => setFilter(f)} style={{ background: filter===f ? T.accentSoft : "transparent", border:`1px solid ${filter===f ? T.accent+"55" : "#1E1E1E"}`, color: filter===f ? T.accent : T.textMid, borderRadius:8, padding:"6px 12px", fontSize:11, fontWeight:600, cursor:"pointer", textTransform:"capitalize" }}>
          {f}
        </button>
      ))}
    </div>

    {/* Appointments list */}
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {dayAppts.length === 0 && (
        <div style={{ textAlign:"center", padding:"48px 20px", color:T.textMid }}>
          <div style={{ fontSize:36, marginBottom:12 }}>📅</div>
          <div style={{ fontSize:14 }}>Nenhum agendamento{filter !== "todos" ? ` com status "${filter}"` : ""} para este dia</div>
        </div>
      )}
      {dayAppts.map(a => (
        <Cd key={a.id} sx={{ padding:"16px 18px" }} onClick={() => { setForm({...a}); setModal("view"); }}>
          <div style={{ display:"grid", gridTemplateColumns:"auto 1fr auto", gap:14, alignItems:"center" }}>
            <div style={{ textAlign:"center", width:52 }}>
              <div style={{ fontSize:16, fontWeight:900, color: a.status==="concluido" ? T.textDim : T.accent }}>{a.time}</div>
              <div style={{ fontSize:10, color:T.textDim }}>{a.duration}min</div>
            </div>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <span style={{ fontSize:14, fontWeight:700, color: a.status==="cancelado" ? T.textDim : T.text, textDecoration: a.status==="cancelado" ? "line-through" : "none" }}>{a.client}</span>
                <StatusBd status={a.status}/>
              </div>
              <div style={{ fontSize:12, color:T.textMid, marginBottom:2 }}>{a.service} · {a.profName}</div>
              {a.notes && <div style={{ fontSize:11, color:T.textDim, fontStyle:"italic" }}>📝 {a.notes}</div>}
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:15, fontWeight:800, color:T.green, marginBottom:6 }}>{fmt(a.price)}</div>
              <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
                {a.status === "aguardando" && (
                  <button onClick={e => { e.stopPropagation(); updateStatus(a.id,"confirmado"); }} style={{ background:"#4CAF8222", border:"1px solid #4CAF8244", color:"#4CAF82", borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>Confirmar</button>
                )}
                {a.status === "confirmado" && (
                  <button onClick={e => { e.stopPropagation(); updateStatus(a.id,"concluido"); }} style={{ background:T.accentSoft, border:`1px solid ${T.accent}44`, color:T.accent, borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>Concluir</button>
                )}
                {a.status !== "cancelado" && a.status !== "concluido" && (
                  <button onClick={e => { e.stopPropagation(); updateStatus(a.id,"cancelado"); }} style={{ background:"#E0505015", border:"1px solid #E0505033", color:"#E05050", borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>✕</button>
                )}
              </div>
            </div>
          </div>
        </Cd>
      ))}
    </div>

    {/* Add Modal */}
    {modal === "add" && <Modal onClose={() => setModal(null)}>
      <div style={{ fontWeight:800, fontSize:16, color:T.text, marginBottom:20 }}>+ Novo Agendamento</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
        {[["client","Cliente"],["phone","WhatsApp"]].map(([k,l]) => (
          <div key={k}><div style={{ fontSize:11, color:T.textMid, marginBottom:5, fontWeight:600 }}>{l}</div>
            <input value={form[k]||""} onChange={e => setForm(p=>({...p,[k]:e.target.value}))} style={{ width:"100%", background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:8, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }}/></div>
        ))}
      </div>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:11, color:T.textMid, marginBottom:5, fontWeight:600 }}>Serviço</div>
        <input value={form.service||""} onChange={e => setForm(p=>({...p,service:e.target.value}))} style={{ width:"100%", background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:8, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:14 }}>
        <div><div style={{ fontSize:11, color:T.textMid, marginBottom:5, fontWeight:600 }}>Horário</div>
          <select value={form.time||""} onChange={e => setForm(p=>({...p,time:e.target.value}))} style={{ width:"100%", background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:8, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }}>
            <option value="">--</option>
            {["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"].map(t => <option key={t}>{t}</option>)}
          </select></div>
        <div><div style={{ fontSize:11, color:T.textMid, marginBottom:5, fontWeight:600 }}>Duração (min)</div>
          <input value={form.duration||""} onChange={e => setForm(p=>({...p,duration:e.target.value}))} type="number" style={{ width:"100%", background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:8, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }}/></div>
        <div><div style={{ fontSize:11, color:T.textMid, marginBottom:5, fontWeight:600 }}>Valor (R$)</div>
          <input value={form.price||""} onChange={e => setForm(p=>({...p,price:e.target.value}))} type="number" style={{ width:"100%", background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:8, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }}/></div>
      </div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, color:T.textMid, marginBottom:5, fontWeight:600 }}>Profissional</div>
        <select value={form.profId||""} onChange={e => setForm(p=>({...p,profId:e.target.value}))} style={{ width:"100%", background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:8, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }}>
          <option value="">Selecione</option>
          {profs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
        <button onClick={() => setModal(null)} style={{ background:"transparent", border:"1px solid #2A2A2A", color:T.textMid, borderRadius:8, padding:"9px 18px", fontWeight:600, fontSize:13, cursor:"pointer" }}>Cancelar</button>
        <button onClick={addAppt} style={{ background:T.accent, border:"none", color:"#000", borderRadius:8, padding:"9px 18px", fontWeight:800, fontSize:13, cursor:"pointer" }}>Confirmar</button>
      </div>
    </Modal>}
  </div>;
}

// ════════════════════════════════════════════════════════════════════════════
// CLIENTES
// ════════════════════════════════════════════════════════════════════════════
function Clientes({ clients, T }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [sel, setSel] = useState(null);

  const filtered = clients
    .filter(c => filter === "todos" || c.status === filter)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));
  const selected = clients.find(c => c.id === sel);

  return <div style={{ display:"grid", gridTemplateColumns: sel ? "1fr 320px" : "1fr", gap:16 }}>
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div><div style={{ fontSize:20, fontWeight:900, color:T.text }}>Clientes</div><div style={{ fontSize:12, color:T.textMid }}>{clients.length} cadastrados</div></div>
      </div>

      <div style={{ display:"flex", gap:10, marginBottom:16 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou telefone..." style={{ flex:1, background:"#141414", border:"1px solid #1E1E1E", borderRadius:10, padding:"10px 14px", color:T.text, fontSize:13, outline:"none" }}/>
        {["todos","vip","ativo","inativo"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: filter===f ? T.accentSoft : "transparent", border:`1px solid ${filter===f ? T.accent+"55" : "#1E1E1E"}`, color: filter===f ? T.accent : T.textMid, borderRadius:8, padding:"8px 12px", fontSize:11, fontWeight:600, cursor:"pointer", textTransform:"capitalize", whiteSpace:"nowrap" }}>{f}</button>
        ))}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {filtered.map(c => (
          <Cd key={c.id} sx={{ padding:"14px 16px" }} onClick={() => setSel(sel===c.id ? null : c.id)}>
            <div style={{ display:"grid", gridTemplateColumns:"auto 1fr auto auto auto", gap:12, alignItems:"center" }}>
              <Avatar initials={c.name.split(" ").map(n=>n[0]).slice(0,2).join("")} color={c.status==="vip"?T.accent:"#6A8078"} size={40}/>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:T.text }}>{c.name}</span>
                  {c.status === "vip" && <Bd c={T.accent} sm>VIP</Bd>}
                </div>
                <div style={{ fontSize:11, color:T.textMid }}>{c.phone} · Última visita: {c.lastVisit}</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:16, fontWeight:800, color:T.text }}>{c.visits}</div>
                <div style={{ fontSize:9, color:T.textMid }}>visitas</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:14, fontWeight:700, color:T.green }}>{fmt(c.totalSpent)}</div>
                <div style={{ fontSize:9, color:T.textMid }}>total gasto</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:13, color:T.yellow }}>⭐ {c.rating}</div>
              </div>
            </div>
          </Cd>
        ))}
      </div>
    </div>

    {selected && (
      <Cd sx={{ padding:20, alignSelf:"start", position:"sticky", top:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:18 }}>
          <Avatar initials={selected.name.split(" ").map(n=>n[0]).slice(0,2).join("")} color={selected.status==="vip"?T.accent:"#6A8078"} size={48}/>
          <button onClick={() => setSel(null)} style={{ background:"none", border:"none", color:T.textMid, cursor:"pointer", fontSize:18 }}>✕</button>
        </div>
        <div style={{ fontWeight:800, fontSize:16, color:T.text, marginBottom:4 }}>{selected.name}</div>
        <div style={{ fontSize:12, color:T.textMid, marginBottom:16 }}>{selected.phone}</div>

        {[["Visitas",selected.visits],["Total Gasto",fmt(selected.totalSpent)],["Última Visita",selected.lastVisit],["Avaliação",`⭐ ${selected.rating}`]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid #1E1E1E` }}>
            <span style={{ fontSize:12, color:T.textMid }}>{k}</span>
            <span style={{ fontSize:12, fontWeight:700, color:T.text }}>{v}</span>
          </div>
        ))}

        <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:8 }}>
          <button style={{ background:"#25D36622", color:"#25D366", border:"1px solid #25D36644", borderRadius:8, padding:10, fontSize:12, fontWeight:700, cursor:"pointer" }}>💬 Enviar WhatsApp</button>
          <button style={{ background:T.accentSoft, color:T.accent, border:`1px solid ${T.accent}44`, borderRadius:8, padding:10, fontSize:12, fontWeight:700, cursor:"pointer" }}>📅 Novo Agendamento</button>
        </div>
      </Cd>
    )}
  </div>;
}

// ════════════════════════════════════════════════════════════════════════════
// PROFISSIONAIS
// ════════════════════════════════════════════════════════════════════════════
function Profissionais({ appts, T }) {
  const profs = PROFESSIONALS[T.type || "barbearia"];
  const todayAppts = appts.filter(a => a.date === todayStr);

  return <div>
    <div style={{ fontSize:20, fontWeight:900, color:T.text, marginBottom:4 }}>Profissionais</div>
    <div style={{ fontSize:12, color:T.textMid, marginBottom:24 }}>{profs.length} profissionais ativos</div>

    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
      {profs.map(p => {
        const pToday = todayAppts.filter(a => a.profId === p.id);
        const pDone = pToday.filter(a => a.status === "concluido");
        const pRev = pDone.reduce((s,a) => s+a.price, 0);
        return <Cd key={p.id} sx={{ padding:"22px", overflow:"hidden", position:"relative" }}>
          <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, background:`radial-gradient(circle, ${p.color}18, transparent 70%)`, pointerEvents:"none" }}/>
          <Avatar initials={p.avatar} color={p.color} size={52}/>
          <div style={{ marginTop:14, marginBottom:6 }}>
            <div style={{ fontSize:16, fontWeight:800, color:T.text, marginBottom:3 }}>{p.name}</div>
            <div style={{ fontSize:12, color:p.color, fontWeight:600, marginBottom:6 }}>{p.role}</div>
            <div style={{ fontSize:11, color:T.textMid, marginBottom:12 }}>{p.services.join(" · ")}</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[["⭐ Avaliação",p.rating,"#D4A840"],["✂️ Total Atend.",fmtN(p.totalAtend),T.textMid],["💰 Total Rec.",fmt(p.totalRec),T.green],["📅 Hoje",`${pDone.length}/${pToday.length}`,T.accent]].map(([l,v,c]) => (
              <div key={l} style={{ background:"#0F0F0F", borderRadius:8, padding:"10px" }}>
                <div style={{ fontSize:9, color:T.textDim, marginBottom:4, letterSpacing:.5 }}>{l}</div>
                <div style={{ fontSize:14, fontWeight:800, color:c||T.text }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:14 }}>
            <div style={{ fontSize:10, color:T.textMid, marginBottom:6 }}>Receita hoje: <strong style={{ color:T.green }}>{fmt(pRev)}</strong></div>
            <div style={{ height:5, background:"#1E1E1E", borderRadius:3 }}>
              <div style={{ width:`${pToday.length ? (pDone.length/pToday.length)*100 : 0}%`, height:"100%", background:p.color, borderRadius:3 }}/>
            </div>
          </div>
        </Cd>;
      })}
    </div>

    {/* Ranking */}
    <Cd sx={{ padding:"22px 24px" }}>
      <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:18 }}>🏆 Ranking de Performance — Histórico</div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead><tr>{["#","Profissional","Total Atend.","Receita Total","Avaliação","Serviços"].map(h => <th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:11, color:T.textMid, fontWeight:700, borderBottom:`1px solid #1E1E1E` }}>{h}</th>)}</tr></thead>
        <tbody>{[...profs].sort((a,b)=>b.totalRec-a.totalRec).map((p, i) => (
          <tr key={p.id} style={{ borderBottom:`1px solid #1E1E1E` }}>
            <td style={{ padding:"12px 12px", fontSize:16 }}>{["🥇","🥈","🥉"][i]||i+1}</td>
            <td style={{ padding:"12px 12px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <Avatar initials={p.avatar} color={p.color} size={32}/>
                <div><div style={{ fontSize:13, fontWeight:700, color:T.text }}>{p.name}</div><div style={{ fontSize:10, color:T.textMid }}>{p.role}</div></div>
              </div>
            </td>
            <td style={{ padding:"12px 12px", fontSize:13, fontWeight:700, color:T.text }}>{fmtN(p.totalAtend)}</td>
            <td style={{ padding:"12px 12px", fontSize:13, fontWeight:800, color:T.green }}>{fmt(p.totalRec)}</td>
            <td style={{ padding:"12px 12px" }}><span style={{ color:"#D4A840", fontWeight:700 }}>⭐ {p.rating}</span></td>
            <td style={{ padding:"12px 12px", fontSize:11, color:T.textMid }}>{p.services.slice(0,2).join(", ")}</td>
          </tr>
        ))}</tbody>
      </table>
    </Cd>
  </div>;
}

// ════════════════════════════════════════════════════════════════════════════
// FINANCEIRO
// ════════════════════════════════════════════════════════════════════════════
function Financeiro({ appts, T }) {
  const todayAppts = appts.filter(a => a.date === todayStr && a.status === "concluido");
  const revenue = todayAppts.reduce((s,a) => s+a.price, 0);
  const profs = PROFESSIONALS[T.type || "barbearia"];
  const weekRevs = [820, 1240, 680, 1480, 940, revenue, 0];
  const months = [
    {m:"Nov",v:8200},{m:"Dez",v:11400},{m:"Jan",v:9800},{m:"Fev",v:12600},{m:"Mar",v:10400},{m:"Abr",v:14200},{m:"Mai",v:revenue*22},
  ];
  const maxM = Math.max(...months.map(m=>m.v));

  return <div>
    <div style={{ fontSize:20, fontWeight:900, color:T.text, marginBottom:22 }}>Financeiro</div>

    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
      <Kpi icon="💰" label="Receita Hoje" value={fmt(revenue)} sub={`${todayAppts.length} atendimentos`} color={T.green} trend={12}/>
      <Kpi icon="📅" label="Receita Semana" value={fmt(weekRevs.reduce((a,b)=>a+b,0))} sub="Segunda a Sábado" color={T.accent}/>
      <Kpi icon="📈" label="Receita Mês" value={fmt(revenue*22)} sub="Projeção atual" color={T.yellow}/>
      <Kpi icon="🎯" label="Ticket Médio" value={fmt(todayAppts.length ? revenue/todayAppts.length : 0)} sub="por atendimento" color={T.blue}/>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:14, marginBottom:14 }}>
      <Cd sx={{ padding:"22px 24px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:18 }}>Receita Mensal — 7 meses</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:120 }}>
          {months.map((m, i) => {
            const h = (m.v / maxM) * 120;
            const isLast = i === months.length - 1;
            return <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              {isLast && <div style={{ fontSize:9, color:T.green, fontWeight:700 }}>{fmt(m.v)}</div>}
              <div style={{ width:"100%", height:h, borderRadius:"4px 4px 0 0", background: isLast ? `linear-gradient(180deg,${T.green},${T.green}80)` : "#1E1E1E", transition:"height .5s" }}/>
              <div style={{ fontSize:9, color:T.textMid }}>{m.m}</div>
            </div>;
          })}
        </div>
      </Cd>

      <Cd sx={{ padding:"22px 24px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:16 }}>Receita por Profissional</div>
        {profs.map(p => {
          const pRev = appts.filter(a => a.profId === p.id && a.status === "concluido").reduce((s,a) => s+a.price, 0);
          const total = appts.filter(a => a.status === "concluido").reduce((s,a) => s+a.price, 0);
          return <div key={p.id} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:p.color }}/>
                <span style={{ fontSize:12, color:T.text, fontWeight:600 }}>{p.name.split(" ")[0]}</span>
              </div>
              <span style={{ fontSize:12, fontWeight:700, color:p.color }}>{fmt(pRev)}</span>
            </div>
            <div style={{ height:5, background:"#1E1E1E", borderRadius:3 }}>
              <div style={{ width:`${total ? (pRev/total)*100 : 0}%`, height:"100%", background:p.color, borderRadius:3 }}/>
            </div>
            <div style={{ fontSize:9, color:T.textDim, marginTop:2 }}>{total ? Math.round((pRev/total)*100) : 0}% da receita</div>
          </div>;
        })}
      </Cd>
    </div>

    {/* Tabela do dia */}
    <Cd sx={{ overflow:"hidden" }}>
      <div style={{ padding:"18px 22px", borderBottom:"1px solid #1E1E1E" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text }}>Extrato de Hoje — {todayStr}</div>
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead><tr style={{ background:"#0F0F0F" }}>{["Horário","Cliente","Serviço","Profissional","Valor","Status"].map(h => <th key={h} style={{ textAlign:"left", padding:"11px 16px", fontSize:11, color:T.textMid, fontWeight:700, borderBottom:"1px solid #1E1E1E" }}>{h}</th>)}</tr></thead>
        <tbody>
          {appts.filter(a => a.date === todayStr).sort((a,b) => a.time.localeCompare(b.time)).map(a => (
            <tr key={a.id} style={{ borderBottom:"1px solid #1E1E1E" }}>
              <td style={{ padding:"12px 16px", fontSize:13, color:T.accent, fontWeight:700 }}>{a.time}</td>
              <td style={{ padding:"12px 16px", fontSize:13, fontWeight:600, color:T.text }}>{a.client}</td>
              <td style={{ padding:"12px 16px", fontSize:12, color:T.textMid }}>{a.service}</td>
              <td style={{ padding:"12px 16px", fontSize:12, color:T.textMid }}>{a.profName}</td>
              <td style={{ padding:"12px 16px", fontSize:13, fontWeight:800, color:a.status==="cancelado"?T.textDim:T.green }}>{a.status==="cancelado"?"—":fmt(a.price)}</td>
              <td style={{ padding:"12px 16px" }}><StatusBd status={a.status}/></td>
            </tr>
          ))}
          <tr style={{ background:"#0F0F0F" }}>
            <td colSpan={4} style={{ padding:"14px 16px", fontSize:13, fontWeight:700, color:T.text }}>TOTAL DO DIA</td>
            <td style={{ padding:"14px 16px", fontSize:16, fontWeight:900, color:T.green }}>{fmt(revenue)}</td>
            <td/>
          </tr>
        </tbody>
      </table>
    </Cd>
  </div>;
}

// ════════════════════════════════════════════════════════════════════════════
// WHATSAPP
// ════════════════════════════════════════════════════════════════════════════
function WhatsApp({ T }) {
  const [logs, setLogs] = useState(makeWaLogs());
  const [tab, setTab] = useState("logs");
  const [msg, setMsg] = useState(""); const [to, setTo] = useState("");
  const send = () => {
    if (!to || !msg) return;
    setLogs(p => [{ id:uid(), client:to, phone:"—", msg, status:"enviado", time:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}), type:"manual" }, ...p]);
    setMsg(""); setTo("");
  };
  const stC = { enviado:T.textMid, lido:"#5090D0", respondido:"#4CAF82" };
  const typeC = { novo:T.accent, lembrete:"#D4A840", confirmacao:"#4CAF82", nps:"#A090D0", reativacao:"#D08040", manual:T.textMid };

  return <div>
    <div style={{ fontSize:20, fontWeight:900, color:T.text, marginBottom:4 }}>WhatsApp Hub</div>
    <div style={{ fontSize:12, color:T.textMid, marginBottom:20 }}>
      Status: <span style={{ color:"#4CAF82", fontWeight:700 }}>● Conectado</span> · Evolution API · {logs.length} mensagens hoje
    </div>

    <div style={{ display:"flex", gap:6, marginBottom:20 }}>
      {["logs","envio","automacoes"].map(t => (
        <button key={t} onClick={() => setTab(t)} style={{ background: tab===t ? "#25D36622" : "transparent", border:`1px solid ${tab===t ? "#25D36666" : "#1E1E1E"}`, color: tab===t ? "#25D366" : T.textMid, borderRadius:8, padding:"8px 16px", fontSize:12, fontWeight:600, cursor:"pointer" }}>
          {t==="logs"?"📋 Logs":t==="envio"?"✉️ Envio":"🤖 Automações"}
        </button>
      ))}
    </div>

    {tab === "logs" && <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {logs.map(l => (
        <Cd key={l.id} sx={{ padding:"14px 18px" }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background: stC[l.status]||T.textMid, marginTop:4, flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:T.text }}>{l.client}</span>
                  <Bd c={typeC[l.type]||T.textMid} sm>{l.type}</Bd>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <Bd c={stC[l.status]||T.textMid} sm>{l.status}</Bd>
                  <span style={{ fontSize:11, color:T.textDim }}>{l.time}</span>
                </div>
              </div>
              <div style={{ fontSize:12, color:T.text, background:"#0F0F0F", borderRadius:8, padding:"10px 12px", borderLeft:"3px solid #25D366", lineHeight:1.5 }}>{l.msg}</div>
            </div>
          </div>
        </Cd>
      ))}
    </div>}

    {tab === "envio" && <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
      <Cd sx={{ padding:"22px 24px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:18 }}>Envio Manual</div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, color:T.textMid, marginBottom:5, fontWeight:600 }}>Para (cliente)</div>
          <input value={to} onChange={e => setTo(e.target.value)} placeholder="Nome do cliente" style={{ width:"100%", background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:8, padding:"9px 12px", color:T.text, fontSize:13, outline:"none" }}/>
        </div>
        <div style={{ marginBottom:18 }}>
          <div style={{ fontSize:11, color:T.textMid, marginBottom:5, fontWeight:600 }}>Mensagem</div>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Digite sua mensagem..." rows={5} style={{ width:"100%", background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:8, padding:"10px 12px", color:T.text, fontSize:13, outline:"none", resize:"none", fontFamily:"inherit" }}/>
        </div>
        <button onClick={send} style={{ width:"100%", background:"#25D366", border:"none", borderRadius:10, padding:13, color:"#000", fontWeight:800, fontSize:13, cursor:"pointer" }}>💬 Enviar Mensagem</button>
      </Cd>
      <Cd sx={{ padding:"22px 24px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:14 }}>Templates Rápidos</div>
        {[
          { l:"Confirmação",  t:"✅ Olá [Nome]! Seu agendamento está confirmado para [data] às [hora]. Qualquer dúvida é só falar! 😊" },
          { l:"Lembrete D-1", t:"⏰ Oi [Nome]! Lembrete: você tem horário amanhã às [hora]. Te esperamos! 💈" },
          { l:"Reativação",   t:"🎉 Oi [Nome]! Saudades de você! Faz um tempo que não te vemos. Que tal agendar? Temos horário disponível! 📅" },
          { l:"NPS",          t:"⭐ Olá [Nome]! Como foi seu atendimento? Em 1 a 10, o quanto você nos indicaria para um amigo?" },
          { l:"Aniversário",  t:"🎂 Feliz aniversário, [Nome]! Como presente, te oferecemos 20% de desconto no próximo atendimento. Válido por 7 dias! 🎁" },
        ].map((t, i) => (
          <div key={i} onClick={() => setMsg(t.t)} style={{ padding:"10px 12px", borderRadius:8, background:"#0F0F0F", border:"1px solid #1E1E1E", cursor:"pointer", marginBottom:8, transition:"border .15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#25D36644"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#1E1E1E"}>
            <div style={{ fontSize:12, fontWeight:700, color:"#25D366", marginBottom:3 }}>{t.l}</div>
            <div style={{ fontSize:11, color:T.textMid, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.t.substring(0,60)}...</div>
          </div>
        ))}
      </Cd>
    </div>}

    {tab === "automacoes" && <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {[
        { trigger:"Novo agendamento recebido", action:"Notificar dono via WhatsApp", status:"ativo", runs:87, c:T.accent },
        { trigger:"Agendamento D-1", action:"Lembrete automático ao cliente", status:"ativo", runs:64, c:"#4CAF82" },
        { trigger:"Agendamento D-0 (manhã)", action:"Lembrete 2h antes ao cliente", status:"ativo", runs:52, c:"#D4A840" },
        { trigger:"Atendimento concluído", action:"Solicitar avaliação Google", status:"ativo", runs:41, c:"#A090D0" },
        { trigger:"Cliente sem visita há 30 dias", action:"Mensagem de reativação", status:"ativo", runs:28, c:"#D08040" },
        { trigger:"Aniversário do cliente", action:"Mensagem + cupom de desconto", status:"pausado", runs:12, c:T.textMid },
      ].map((r, i) => (
        <Cd key={i} sx={{ padding:"16px 18px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background: r.status==="ativo" ? "#4CAF82" : T.textDim, boxShadow: r.status==="ativo" ? "0 0 8px #4CAF82" : "none", flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:3 }}>SE: {r.trigger}</div>
              <div style={{ fontSize:12, color:T.textMid }}>ENTÃO: {r.action}</div>
            </div>
            <div style={{ textAlign:"right", marginRight:16 }}>
              <div style={{ fontSize:18, fontWeight:900, color:r.c }}>{r.runs}</div>
              <div style={{ fontSize:10, color:T.textDim }}>disparos</div>
            </div>
            <Bd c={r.status==="ativo"?"#4CAF82":T.textMid} sm>{r.status}</Bd>
          </div>
        </Cd>
      ))}
    </div>}
  </div>;
}

// ════════════════════════════════════════════════════════════════════════════
// CONFIGURAÇÕES
// ════════════════════════════════════════════════════════════════════════════
function Configuracoes({ T, bizType, onSwitch }) {
  const [link] = useState(`dilon.tech/${T.label.toLowerCase().replace(/ /g,"-")}`);
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(link).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return <div>
    <div style={{ fontSize:20, fontWeight:900, color:T.text, marginBottom:24 }}>Configurações</div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
      <Cd sx={{ padding:"22px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:16 }}>🔗 Link de Agendamento</div>
        <div style={{ background:"#0F0F0F", border:"1px solid #2A2A2A", borderRadius:10, padding:"12px 14px", marginBottom:12, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:12, color:T.accent, fontFamily:"monospace" }}>{link}</span>
          <button onClick={copy} style={{ background: copied ? "#4CAF82" : T.accentSoft, border:`1px solid ${copied?"#4CAF82":T.accent+"44"}`, color: copied ? "#000" : T.accent, borderRadius:6, padding:"5px 12px", fontSize:11, fontWeight:700, cursor:"pointer" }}>
            {copied ? "✓ Copiado" : "Copiar"}
          </button>
        </div>
        <div style={{ fontSize:11, color:T.textMid, lineHeight:1.6 }}>
          Compartilhe este link no Instagram, WhatsApp e Google Meu Negócio para que seus clientes agendem online 24h por dia.
        </div>
      </Cd>

      <Cd sx={{ padding:"22px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:16 }}>📱 QR Code</div>
        <div style={{ width:"100%", aspectRatio:"1", background:"#fff", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, padding:16 }}>
            {Array.from({length:49},(_,i) => {
              const pattern = [0,1,2,3,4,5,6,7,14,21,28,35,42,43,44,45,46,47,48,8,15,22,29,36,10,11,12,16,18,20,24,25,26,30,32,34,38,40,41];
              return <div key={i} style={{ width:8, height:8, borderRadius:1, background: pattern.includes(i) ? "#000" : "#fff" }}/>;
            })}
          </div>
        </div>
        <button style={{ width:"100%", background:T.accentSoft, border:`1px solid ${T.accent}44`, color:T.accent, borderRadius:8, padding:10, fontSize:12, fontWeight:700, cursor:"pointer" }}>
          Baixar QR Code
        </button>
      </Cd>

      <Cd sx={{ padding:"22px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:16 }}>⚙️ Dados do Negócio</div>
        {[["Nome do Estabelecimento", T.label], ["Tipo", bizType==="barbearia"?"Barbearia":"Salão de Beleza"], ["Endereço","Duque de Caxias, RJ"], ["WhatsApp","21 99001-2233"], ["Horário","Seg–Sáb · 08h às 20h"]].map(([l,v]) => (
          <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid #1E1E1E" }}>
            <span style={{ fontSize:12, color:T.textMid }}>{l}</span>
            <span style={{ fontSize:12, fontWeight:600, color:T.text }}>{v}</span>
          </div>
        ))}
        <button style={{ marginTop:14, width:"100%", background:"#1E1E1E", border:"1px solid #2A2A2A", color:T.text, borderRadius:8, padding:10, fontSize:12, fontWeight:600, cursor:"pointer" }}>Editar Dados</button>
      </Cd>

      <Cd sx={{ padding:"22px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:16 }}>🔔 Notificações WhatsApp</div>
        {[["Novo agendamento",true],["Confirmação automática",true],["Lembrete D-1 para cliente",true],["Lembrete manhã (2h antes)",true],["NPS pós-atendimento",true],["Reativação (30 dias)",false]].map(([l,on],i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #1E1E1E" }}>
            <span style={{ fontSize:12, color:T.text }}>{l}</span>
            <div style={{ width:36, height:20, borderRadius:10, background: on ? T.accent : "#2A2A2A", position:"relative", cursor:"pointer" }}>
              <div style={{ width:14, height:14, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left: on ? 19 : 3, transition:"left .2s" }}/>
            </div>
          </div>
        ))}
      </Cd>

      <Cd sx={{ padding:"22px", gridColumn:"span 2" }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, marginBottom:16 }}>🏪 Trocar Estabelecimento</div>
        <div style={{ display:"flex", gap:12 }}>
          {[{k:"barbearia",l:"Barbearia Kings",e:"✂️",c:"#C8A96E"},{k:"salao",l:"Salão Elegance",e:"💅",c:"#E8A0A0"}].map(opt => (
            <button key={opt.k} onClick={() => onSwitch(opt.k)} style={{ flex:1, background: bizType===opt.k ? `${opt.c}15` : "#0F0F0F", border:`1px solid ${bizType===opt.k ? opt.c : "#2A2A2A"}`, borderRadius:12, padding:"16px", cursor:"pointer", textAlign:"center", transition:"all .2s" }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{opt.e}</div>
              <div style={{ fontSize:13, fontWeight:700, color: bizType===opt.k ? opt.c : T.text }}>{opt.l}</div>
              {bizType===opt.k && <div style={{ fontSize:10, color:opt.c, marginTop:4, fontWeight:700 }}>ATIVO ✓</div>}
            </button>
          ))}
        </div>
      </Cd>
    </div>
  </div>;
}

// ════════════════════════════════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════════════════════════════════
const NAV = [
  { id:"dashboard",    icon:"◈",  label:"Dashboard" },
  { id:"agenda",       icon:"📅", label:"Agenda" },
  { id:"clientes",     icon:"◉",  label:"Clientes" },
  { id:"profissionais",icon:"👤", label:"Profissionais" },
  { id:"financeiro",   icon:"◐",  label:"Financeiro" },
  { id:"whatsapp",     icon:"💬", label:"WhatsApp" },
  { id:"configuracoes",icon:"⚙️", label:"Configurações" },
];

export default function App() {
  const [bizType, setBizType] = useState(null);
  const [page, setPage] = useState("dashboard");
  const T_base = THEMES[bizType] || THEMES.barbearia;
  const T = { ...T_base, type: bizType };

  const [appts, setAppts] = useState([]);
  const [clients] = useState(makeClients(bizType || "barbearia"));

  useEffect(() => {
    if (bizType) setAppts(makeAppts(bizType));
  }, [bizType]);

  // New appointment notification state
  const [newNotif, setNewNotif] = useState(null);
  useEffect(() => {
    if (!bizType) return;
    const t = setTimeout(() => {
      setNewNotif({ client:"Pedro Alves", service: bizType==="barbearia"?"Corte Degradê":"Coloração Completa", time:"16:30", prof: PROFESSIONALS[bizType][0].name });
      setTimeout(() => setNewNotif(null), 6000);
    }, 4000);
    return () => clearTimeout(t);
  }, [bizType]);

  // ── Business Selector ──────────────────────────────────────────────────
  if (!bizType) {
    return (
      <div style={{ minHeight:"100vh", background:"#080808", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}} *{box-sizing:border-box;}`}</style>
        <div style={{ textAlign:"center", marginBottom:40, animation:"fadeIn .6s ease" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#141414", border:"1px solid #2A2A2A", borderRadius:100, padding:"8px 18px", marginBottom:20 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#C8A96E", boxShadow:"0 0 8px #C8A96E" }}/>
            <span style={{ fontSize:11, color:"#888", letterSpacing:2, textTransform:"uppercase", fontWeight:600 }}>Dilon Tech</span>
          </div>
          <h1 style={{ fontSize:38, fontWeight:900, color:"#fff", margin:"0 0 10px", letterSpacing:-1 }}>Painel do Dono</h1>
          <p style={{ fontSize:14, color:"#555", margin:0 }}>Selecione seu estabelecimento</p>
        </div>
        <div style={{ display:"flex", gap:20, animation:"fadeIn .6s ease .15s both" }}>
          {[{k:"barbearia",l:"Barbearia Kings",e:"✂️",c:"#C8A96E",sub:"Cortes, barba e gestão completa"},{k:"salao",l:"Salão Elegance",e:"💅",c:"#E8A0A0",sub:"Beleza, tratamentos e controle total"}].map(opt => (
            <button key={opt.k} onClick={() => setBizType(opt.k)} style={{ width:240, background:"#141414", border:`1px solid ${opt.c}33`, borderRadius:20, padding:"36px 24px", cursor:"pointer", textAlign:"center", transition:"all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor=opt.c+"88"; e.currentTarget.style.boxShadow=`0 20px 40px ${opt.c}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.borderColor=opt.c+"33"; e.currentTarget.style.boxShadow=""; }}>
              <div style={{ fontSize:52, marginBottom:16 }}>{opt.e}</div>
              <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:6 }}>{opt.l}</div>
              <div style={{ fontSize:12, color:"#666" }}>{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const todayAppts = appts.filter(a => a.date === todayStr);
  const crit = todayAppts.filter(a => a.status === "aguardando").length;
  const revenue = todayAppts.filter(a=>a.status==="concluido").reduce((s,a)=>s+a.price,0);

  return (
    <div style={{ display:"flex", height:"100vh", background:T.bg, fontFamily:"'Segoe UI', system-ui, sans-serif", color:T.text, overflow:"hidden" }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
        @keyframes pop{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
        @keyframes notif{0%{transform:translateX(120%);opacity:0}10%{transform:translateX(0);opacity:1}85%{transform:translateX(0);opacity:1}100%{transform:translateX(120%);opacity:0}}
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-thumb{background:#2A2A2A;border-radius:4px;}
        select option{background:#141414;color:#F5F0E8;}
        input::placeholder,textarea::placeholder{color:#3A3530;}
      `}</style>

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <div style={{ width:220, background:T.surface, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        {/* Header */}
        <div style={{ padding:"20px 16px 14px", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${T.accent},${T.accentDim})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{T.emoji}</div>
            <div>
              <div style={{ fontSize:12, fontWeight:800, color:T.text, letterSpacing:-.2 }}>{T.label}</div>
              <div style={{ fontSize:9, color:T.textMid }}>Dilon Tech · Painel do Dono</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:10, padding:"6px 10px", background:T.accentSoft, borderRadius:8 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:T.accent }}/>
            <span style={{ fontSize:10, color:T.accent, fontWeight:700 }}>Sistema online · {new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
          {NAV.map((n, i) => {
            const active = page === n.id;
            const badge = n.id === "agenda" && crit > 0;
            return (
              <div key={n.id} onClick={() => setPage(n.id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 10px", borderRadius:9, cursor:"pointer", marginBottom:1, background: active ? T.accentSoft : "transparent", border:`1px solid ${active ? T.accent+"33" : "transparent"}`, transition:"all .15s", animation:`fadeIn .3s ease ${i*.04}s both` }}>
                <span style={{ fontSize:15, color:active?T.accent:T.textMid }}>{n.icon}</span>
                <span style={{ fontSize:12, fontWeight:active?700:400, color:active?T.accent:T.textMid, flex:1 }}>{n.label}</span>
                {badge && <span style={{ background:"#E05050", color:"#fff", borderRadius:10, padding:"1px 7px", fontSize:9, fontWeight:700 }}>{crit}</span>}
              </div>
            );
          })}
        </nav>

        {/* Bottom stats */}
        <div style={{ padding:"14px 14px", borderTop:`1px solid ${T.border}` }}>
          <div style={{ fontSize:10, color:T.textMid, marginBottom:3 }}>Receita de Hoje</div>
          <div style={{ fontSize:20, fontWeight:900, color:T.green, letterSpacing:-.5 }}>{fmt(revenue)}</div>
          <div style={{ fontSize:9, color:T.textDim, marginTop:2 }}>
            {todayAppts.filter(a=>a.status==="concluido").length} concluídos · {todayAppts.filter(a=>a.status==="confirmado").length} pendentes
          </div>
          <div style={{ marginTop:10, height:3, background:T.border, borderRadius:2 }}>
            <div style={{ width:`${Math.min((todayAppts.filter(a=>a.status==="concluido").length/Math.max(todayAppts.length,1))*100,100)}%`, height:"100%", background:T.accent, borderRadius:2 }}/>
          </div>
        </div>
      </div>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      <div style={{ flex:1, overflow:"auto", padding:"28px 32px", animation:"fadeIn .25s ease" }}>
        {page === "dashboard"     && <Dashboard appts={appts} T={T}/>}
        {page === "agenda"        && <Agenda appts={appts} setAppts={setAppts} T={T}/>}
        {page === "clientes"      && <Clientes clients={clients} T={T}/>}
        {page === "profissionais" && <Profissionais appts={appts} T={T}/>}
        {page === "financeiro"    && <Financeiro appts={appts} T={T}/>}
        {page === "whatsapp"      && <WhatsApp T={T}/>}
        {page === "configuracoes" && <Configuracoes T={T} bizType={bizType} onSwitch={v=>{setBizType(v);setPage("dashboard");}}/>}
      </div>

      {/* ── FLOATING WHATSAPP NOTIFICATION ──────────────────────────────── */}
      {newNotif && (
        <div style={{ position:"fixed", bottom:24, right:24, zIndex:300, width:320, background:"#141414", border:`1px solid ${T.accent}44`, borderRadius:16, padding:"16px 18px", boxShadow:`0 20px 40px #00000060, 0 0 0 1px ${T.accent}22`, animation:"notif 6s ease forwards" }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
            <div style={{ width:38, height:38, borderRadius:10, background:"#25D36620", border:"1px solid #25D36644", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>💬</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:"#25D366", fontWeight:700, marginBottom:4, display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#25D366", animation:"pulse 1s infinite" }}/>
                NOVO AGENDAMENTO
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:3 }}>{newNotif.client}</div>
              <div style={{ fontSize:11, color:T.textMid }}>{newNotif.service} · {newNotif.time} · {newNotif.prof}</div>
            </div>
            <button onClick={() => setNewNotif(null)} style={{ background:"none", border:"none", color:T.textMid, cursor:"pointer", fontSize:16, flexShrink:0 }}>✕</button>
          </div>
          <div style={{ marginTop:12, display:"flex", gap:8 }}>
            <button onClick={() => { setPage("agenda"); setNewNotif(null); }} style={{ flex:1, background:T.accentSoft, border:`1px solid ${T.accent}44`, color:T.accent, borderRadius:8, padding:"7px", fontSize:11, fontWeight:700, cursor:"pointer" }}>Ver Agenda</button>
            <button onClick={() => setNewNotif(null)} style={{ background:"#25D36622", border:"1px solid #25D36644", color:"#25D366", borderRadius:8, padding:"7px 12px", fontSize:11, fontWeight:700, cursor:"pointer" }}>OK ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}