"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Command,
  Headphones,
  Inbox,
  Layers3,
  LifeBuoy,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  PanelRight,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tag,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

type Channel = "web" | "whatsapp" | "slack" | "telegram" | "messenger";

const channelMeta: Record<Channel, { label: string; color: string; glyph: string }> = {
  web: { label: "Web chat", color: "#818cf8", glyph: "W" },
  whatsapp: { label: "WhatsApp", color: "#25D366", glyph: "◔" },
  slack: { label: "Slack", color: "#e879f9", glyph: "#" },
  telegram: { label: "Telegram", color: "#229ED9", glyph: "➤" },
  messenger: { label: "Messenger", color: "#0084FF", glyph: "⌁" },
};

const conversations = [
  { id: "maya", name: "Maya Chen", initials: "MC", channel: "web" as Channel, subject: "Charged twice for my plan", preview: "I see two charges on my statement...", time: "2m", unread: 2, status: "escalated", tone: "#f5a4c7" },
  { id: "jon", name: "Jon Bell", initials: "JB", channel: "whatsapp" as Channel, subject: "How do I export reports?", preview: "The CSV export is under...", time: "8m", unread: 0, status: "resolved", tone: "#a8d5ba" },
  { id: "nate", name: "Nate Williams", initials: "NW", channel: "slack" as Channel, subject: "SSO setup for our team", preview: "We need to connect Okta...", time: "14m", unread: 1, status: "ai", tone: "#c8b5ed" },
  { id: "sana", name: "Sana Iqbal", initials: "SI", channel: "telegram" as Channel, subject: "Invoice for April", preview: "Can you send this to finance?", time: "31m", unread: 0, status: "resolved", tone: "#f2c596" },
  { id: "lucas", name: "Lucas Moretti", initials: "LM", channel: "messenger" as Channel, subject: "Login link expired", preview: "The magic link isn't working...", time: "1h", unread: 0, status: "waiting", tone: "#9bc5e8" },
];

function ChannelIcon({ channel }: { channel: Channel }) {
  const meta = channelMeta[channel];
  return <span className="channel-icon" style={{ background: `${meta.color}22`, color: meta.color }}>{meta.glyph}</span>;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("maya");
  const [query, setQuery] = useState("");
  const [takeover, setTakeover] = useState(false);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const selected = conversations.find((item) => item.id === selectedId) ?? conversations[0];
  const filtered = useMemo(() => conversations.filter((item) => `${item.name} ${item.subject}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const simulate = (label: string) => {
    setNotice(label);
    window.setTimeout(() => setNotice(""), 2600);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><Sparkles size={17} fill="currentColor" /></div><span>relay</span><span className="brand-divider" /><span className="workspace-name">Acme workspace <ChevronDown size={13} /></span></div>
        <div className="demo-bar"><span className="pulse-dot" /> <b>Demo simulation mode</b><span className="demo-copy">See your AI agent in action</span><button onClick={() => simulate("Billing escalation simulated")}>Simulate billing escalation</button><button onClick={() => simulate("FAQ resolution simulated")}>Autonomous FAQ</button><button onClick={() => simulate("Inbound storm simulated")}>Multi-platform storm</button></div>
        <div className="top-actions"><button className="icon-btn"><Command size={16} /></button><div className="top-avatar">AM</div></div>
      </header>

      <div className="metric-strip">
        <div className="metric-intro"><Zap size={16} /> <span>LIVE OPERATIONS</span></div>
        <Metric label="First-contact resolution" value="78%" trend="+4.2%" />
        <Metric label="Avg. response time" value="<400ms" trend="−12ms" />
        <Metric label="Human escalation ratio" value="12%" trend="−2.1%" />
        <div className="system-status"><span className="pulse-dot" /> All systems operational</div>
      </div>

      <div className="workspace">
        <aside className="left-rail">
          <nav className="primary-nav"><NavItem icon={<Inbox size={17} />} label="Inbox" count="24" active /><NavItem icon={<Layers3 size={17} />} label="Tickets" count="8" /><NavItem icon={<Bot size={17} />} label="AI activity" /><NavItem icon={<Users size={17} />} label="Team" /><NavItem icon={<Settings2 size={17} />} label="Settings" /></nav>
          <div className="inbox-head"><div><span className="eyebrow">INBOX</span><h1>All conversations <span>24</span></h1></div><button className="tiny-btn"><Plus size={16} /></button></div>
          <div className="filter-row"><button className="filter active">Open <span>18</span></button><button className="filter">Waiting <span>4</span></button><button className="filter">Closed</button></div>
          <div className="search-box"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations" /><kbd>⌘ K</kbd></div>
          <div className="conversation-list">{filtered.map((item) => <button key={item.id} onClick={() => setSelectedId(item.id)} className={`conversation ${selectedId === item.id ? "selected" : ""}`}><div className="conversation-avatar" style={{ background: item.tone }}>{item.initials}</div><div className="conversation-main"><div className="conversation-top"><b>{item.name}</b><time>{item.time}</time></div><div className="conversation-subject">{item.subject}</div><div className="conversation-preview">{item.preview}</div><div className="conversation-foot"><ChannelIcon channel={item.channel} /><span className={`status status-${item.status}`}>{item.status === "ai" ? "AI handling" : item.status === "escalated" ? "Needs attention" : item.status}</span>{item.unread > 0 && <span className="unread">{item.unread}</span>}</div></div></button>)}</div>
          <div className="rail-footer"><div className="team-avatars"><span>AM</span><span>JK</span><span>+3</span></div><div><b>5 agents online</b><small>Coverage is healthy</small></div><span className="online-dot" /></div>
        </aside>

        <section className="chat-panel">
          <div className="chat-head"><div className="customer-title"><div className="large-avatar" style={{ background: selected.tone }}>{selected.initials}</div><div><div className="title-row"><h2>{selected.name}</h2><span className="live-badge">LIVE</span></div><p>{selected.subject} <span>·</span> <ChannelIcon channel={selected.channel} /> {channelMeta[selected.channel].label}</p></div></div><div className="chat-tools"><button className="outline-btn"><Tag size={15} /> Add tag</button><button className="icon-btn"><MoreHorizontal size={18} /></button></div></div>
          <div className="thread-meta"><span>Today, 10:42 AM</span><span className="line" /><span className="secure"><ShieldCheck size={13} /> Encrypted conversation</span></div>
          <div className="messages">
            <div className="message-row incoming"><div className="small-avatar" style={{ background: selected.tone }}>{selected.initials}</div><div><div className="bubble">Hi, I think I was charged twice for my Pro plan this month. Can you take a look?</div><span className="message-time">10:42 AM</span></div></div>
            <div className="ai-event"><div className="ai-icon"><Sparkles size={14} /></div><div><b>Relay AI</b><span> analyzed the conversation</span><p>Intent: <strong>duplicate billing</strong> <span className="confidence">98% confidence</span></p></div><ChevronDown size={15} /></div>
            <div className="ai-event tool-event"><div className="tool-icon"><Search size={14} /></div><div><b>Vector search</b><span> searched your knowledge base</span><p>Found 3 relevant sources in <strong>Billing & subscriptions</strong></p></div><Check size={15} className="check" /></div>
            <div className="message-row outgoing"><div><div className="bubble">I found the duplicate charge on your account. I’m bringing in a billing specialist now so we can get this corrected for you.</div><div className="sent-by"><Sparkles size={12} /> Relay AI <span>· 10:43 AM</span></div></div><div className="small-avatar ai-avatar"><Sparkles size={14} /></div></div>
            <div className="escalation-card"><div className="escalation-icon"><AlertCircle size={17} /></div><div><b>Escalated to human support</b><p>Reason: billing adjustment requires account access</p></div><span className="ticket-pill">Ticket #10482</span></div>
            <div className="message-row incoming last"><div className="small-avatar" style={{ background: selected.tone }}>{selected.initials}</div><div><div className="bubble">Thank you — I appreciate the quick help!</div><span className="message-time">10:44 AM</span></div></div>
          </div>
          <div className="composer"><div className="composer-mode"><button className={`mode-btn ${takeover ? "human" : ""}`} onClick={() => setTakeover(!takeover)}>{takeover ? <Headphones size={14} /> : <Sparkles size={14} />} {takeover ? "Human takeover" : "AI is handling"}<ChevronDown size={13} /></button><span className="composer-hint">Press <kbd>⌘ ↵</kbd> to send</span></div><div className="composer-input"><textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={takeover ? "Reply as Alex..." : "Let Relay draft a reply..."} rows={2} /><button className="attach"><Paperclip size={17} /></button><button className="send" onClick={() => { if (message) { setMessage(""); simulate("Reply sent to Maya Chen"); } }}><Send size={16} /></button></div></div>
        </section>

        <aside className="right-panel"><div className="right-head"><span className="eyebrow">CUSTOMER PROFILE</span><button className="icon-btn"><PanelRight size={17} /></button></div><div className="profile"><div className="profile-avatar" style={{ background: selected.tone }}>{selected.initials}</div><h2>{selected.name}</h2><p>maya.chen@northstar.io</p><span className="customer-since">Customer since Mar 2023</span></div><div className="profile-actions"><button><MessageCircle size={15} /> Message</button><button><UserRound size={15} /> View profile</button></div><InfoSection title="ACCOUNT" items={[["Plan", "Pro · Annual"], ["MRR", "$249 / month"], ["Last active", "Just now"]]} /><div className="info-section"><div className="section-title"><span>CONVERSATION DATA</span><button><Plus size={14} /></button></div><div className="tag-list"><span className="tag priority">Priority high</span><span className="tag">Billing</span><span className="tag">Duplicate charge</span></div></div><div className="rag-section"><div className="section-title"><span><Sparkles size={13} /> AI CONTEXT</span><span className="context-ready">READY</span></div><div className="rag-card"><div className="rag-top"><div className="rag-dot" /><b>Resolution confidence</b><strong>98%</strong></div><div className="confidence-bar"><span /></div><p>Answer grounded in 3 knowledge sources</p><div className="citation"><span>01</span><div><b>Billing & subscriptions</b><small>Duplicate charges · Updated 2d ago</small></div><ArrowUpRight size={14} /></div><div className="citation"><span>02</span><div><b>Refund policy</b><small>Annual plans · Updated 1w ago</small></div><ArrowUpRight size={14} /></div></div></div><div className="escalation-controls"><div className="section-title"><span>ESCALATION</span><span className="escalated-label"><span /> Escalated</span></div><button className="assign-btn"><div className="agent-avatar">JK</div><div><b>Assigned to Jordan Kim</b><small>Billing specialist · Online</small></div><ChevronDown size={15} /></button></div></aside>
      </div>
      {notice && <div className="toast"><Check size={15} /> {notice}</div>}
    </main>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) { return <div className="metric"><span>{label}</span><strong>{value}</strong><em>{trend}</em></div>; }
function NavItem({ icon, label, count, active }: { icon: React.ReactNode; label: string; count?: string; active?: boolean }) { return <button className={`nav-item ${active ? "active" : ""}`}>{icon}<span>{label}</span>{count && <small>{count}</small>}</button>; }
function InfoSection({ title, items }: { title: string; items: string[][] }) { return <div className="info-section"><div className="section-title"><span>{title}</span><button><MoreHorizontal size={14} /></button></div>{items.map(([label, value]) => <div className="data-row" key={label}><span>{label}</span><b>{value}</b></div>)}</div>; }
