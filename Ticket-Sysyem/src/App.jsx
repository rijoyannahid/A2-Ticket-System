import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INITIAL_TICKETS = [
  { id: "#1001", title: "Login Issues – Can't Access Account",      desc: "Customer is unable to log in to their account. They've tried resetting their password multiple times but still...", status: "Open",        priority: "HIGH PRIORITY",   assignee: "John Smith",      date: "1/15/2024" },
  { id: "#1002", title: "Payment Failed – Card Declined",           desc: "Customer attempted to pay using Visa ending 1234 but the payment keeps failing despite sufficient balance.",          status: "Open",        priority: "HIGH PRIORITY",   assignee: "Sarah Johnson",   date: "1/16/2024" },
  { id: "#1003", title: "Unable to Download Invoice",               desc: "Customer cannot download their January invoice from the billing section. The download button is...",                 status: "In-Progress", priority: "MEDIUM PRIORITY", assignee: "Michael Brown",   date: "1/17/2024" },
  { id: "#1004", title: "Incorrect Billing Address",                desc: "Customer's billing address shows a different city. They updated it but it still displays the old one.",              status: "Open",        priority: "LOW PRIORITY",    assignee: "Emily Davis",     date: "1/18/2024" },
  { id: "#1005", title: "App Crash on Launch",                      desc: "Customer reports that the mobile app crashes immediately upon opening on Android 13.",                               status: "Open",        priority: "HIGH PRIORITY",   assignee: "David Wilson",    date: "1/19/2024" },
  { id: "#1006", title: "Refund Not Processed",                     desc: "Customer requested a refund two weeks ago but has not received the amount yet.",                                    status: "In-Progress", priority: "MEDIUM PRIORITY", assignee: "Sophia Taylor",   date: "1/20/2024" },
  { id: "#1007", title: "Two-Factor Authentication Issue",          desc: "Customer is not receiving 2FA codes on their registered phone number.",                                              status: "Open",        priority: "HIGH PRIORITY",   assignee: "James Anderson",  date: "1/21/2024" },
  { id: "#1008", title: "Unable to Update Profile Picture",         desc: "Customer tries to upload a new profile picture but gets 'Upload failed' error.",                                    status: "Open",        priority: "LOW PRIORITY",    assignee: "Olivia Martinez", date: "1/22/2024" },
  { id: "#1009", title: "Subscription Auto-Renewal",                desc: "Customer wants to enable auto-renewal for their subscription but the toggle is disabled.",                          status: "In-Progress", priority: "MEDIUM PRIORITY", assignee: "Liam Thomas",     date: "1/17/2024" },
  { id: "#1010", title: "Missing Order Confirmation Email",         desc: "Customer placed an order but didn't receive a confirmation email even though payment succeeded.",                    status: "Open",        priority: "MEDIUM PRIORITY", assignee: "Isabella Garcia", date: "1/24/2024" },
];

const STATUS_CLASS  = { "Open": "badge-open", "In-Progress": "badge-inprogress" };
const PRIORITY_CLASS = { "HIGH PRIORITY": "pri-high", "MEDIUM PRIORITY": "pri-medium", "LOW PRIORITY": "pri-low" };


// ─── ICONS ────────────────────────────────────────────────────────────────────
const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="2" width="14" height="13" rx="2"/>
    <line x1="1" y1="6" x2="15" y2="6"/>
    <line x1="5" y1="1" x2="5" y2="4"/>
    <line x1="11" y1="1" x2="11" y2="4"/>
  </svg>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ onNewTicket }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <span className="nav-brand">CS — Ticket System</span>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        <span/><span/><span/>
      </button>
      <ul className={`nav-links${open ? " open" : ""}`}>
        {["Home","FAQ","Changelog","Blog","Download","Contact"].map(l => (
          <li key={l}><a href="#">{l}</a></li>
        ))}
      </ul>
      <button className="btn-primary" onClick={onNewTicket}>+ New Ticket</button>
    </nav>
  );
}

// ─── STAT CARDS ───────────────────────────────────────────────────────────────
function StatCards({ inProgress, resolved }) {
  return (
    <div className="stat-cards">
      <div className="stat-card stat-purple">
        <p className="stat-lbl">In-Progress</p>
        <h2 className="stat-num">{inProgress}</h2>
      </div>
      <div className="stat-card stat-green">
        <p className="stat-lbl">Resolved</p>
        <h2 className="stat-num">{resolved}</h2>
      </div>
    </div>
  );
}

// ─── TICKET CARD ──────────────────────────────────────────────────────────────
function TicketCard({ ticket, onClick, selected }) {
  return (
    <div className={`ticket-card${selected ? " selected" : ""}`} onClick={() => onClick(ticket)}>
      <div className="tc-top">
        <span className="tc-title">{ticket.title}</span>
        <span className={`badge ${STATUS_CLASS[ticket.status] || "badge-open"}`}>{ticket.status}</span>
      </div>
      <p className="tc-desc">{ticket.desc}</p>
      <div className="tc-meta">
        <span className={`pri-tag ${PRIORITY_CLASS[ticket.priority]}`}>{ticket.id} · {ticket.priority}</span>
        <span className="tc-assignee">{ticket.assignee}</span>
        <span className="tc-date"><CalIcon /> {ticket.date}</span>
      </div>
    </div>
  );
}

// ─── TASK STATUS PANEL ────────────────────────────────────────────────────────
function TaskStatus({ taskQueue, resolvedList, onComplete }) {
  return (
    <div className="task-panel">
      <h3 className="task-title">Task Status</h3>

      {/* hint when empty */}
      {taskQueue.length === 0 && (
        <p className="task-hint">Select a ticket to add its Task Status</p>
      )}

      {/* active tasks */}
      {taskQueue.map(t => (
        <div className="task-item" key={t.id}>
          <div className="task-item-head">
            <span className="task-item-name">{t.title}</span>
          </div>
          <button className="btn-complete" onClick={() => onComplete(t)}>Complete</button>
        </div>
      ))}

      {/* resolved section — always visible */}
      <div className="resolved-block">
        <h4 className="resolved-title">Resolved Task</h4>
        {resolvedList.length === 0
          ? <p className="resolved-empty">No resolved tasks yet.</p>
          : resolvedList.map(t => (
              <div className="resolved-pill" key={t.id}>{t.title}</div>
            ))
        }
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h4>CS — Ticket System</h4>
          <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Contact Sales</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="#">Products &amp; Services</a></li>
            <li><a href="#">Customer Stories</a></li>
            <li><a href="#">Download Apps</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Information</h5>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Join Us</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Social Links</h5>
          <ul>
            <li><a href="#">🐦 @CS — Ticket System</a></li>
            <li><a href="#">💼 @CS — Ticket System</a></li>
            <li><a href="#">📘 @CS — Ticket System</a></li>
            <li><a href="#">✉ support@cst.com</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-copy">© 2025 CS — Ticket System. All rights reserved.</div>
    </footer>
  );
}

// ─── NEW TICKET MODAL ─────────────────────────────────────────────────────────
function Modal({ onClose, onSubmit }) {
  const [title, setTitle]       = useState("");
  const [desc, setDesc]         = useState("");
  const [priority, setPriority] = useState("MEDIUM PRIORITY");
  const [status, setStatus]     = useState("Open");

  const submit = () => {
    if (!title.trim()) { toast.error("⚠️ Please enter a ticket title."); return; }
    onSubmit({ title: title.trim(), desc: desc.trim(), priority, status });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3>New Ticket</h3>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Issue title..." />
        <label>Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the issue..." rows={4}/>
        <label>Priority</label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>HIGH PRIORITY</option>
          <option>MEDIUM PRIORITY</option>
          <option>LOW PRIORITY</option>
        </select>
        <label>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Open</option>
          <option>In-Progress</option>
        </select>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tickets,      setTickets]      = useState(INITIAL_TICKETS);
  const [taskQueue,    setTaskQueue]    = useState([]);
  const [resolvedList, setResolvedList] = useState([]);
  const [selected,     setSelected]    = useState(null);
  const [showModal,    setShowModal]   = useState(false);
  const [counter,      setCounter]     = useState(1011);

  const inProgressCount = tickets.filter(t => t.status === "In-Progress").length;
  const resolvedCount   = resolvedList.length;

  const handleTicketClick = ticket => {
    setSelected(ticket);
    if (taskQueue.some(t => t.id === ticket.id)) {
      toast.info(`📋 Already in Task Status.`, { autoClose: 2000 }); return;
    }
    if (resolvedList.some(t => t.id === ticket.id)) {
      toast.success(`✅ Already resolved!`, { autoClose: 2000 }); return;
    }
    setTaskQueue(prev => [...prev, ticket]);
    toast.info("📋 Ticket added to Task Status.", { autoClose: 2000 });
  };

  const handleComplete = ticket => {
    setTaskQueue(prev    => prev.filter(t => t.id !== ticket.id));
    setResolvedList(prev => [...prev, ticket]);
    setTickets(prev      => prev.filter(t => t.id !== ticket.id));
    if (selected?.id === ticket.id) setSelected(null);
    toast.success(`✅ "${ticket.title}" resolved!`, { autoClose: 3000 });
  };

  const handleNewTicket = ({ title, desc, priority, status }) => {
    const t = {
      id: `#${counter}`, title, desc: desc || "No description.",
      status, priority,
      assignee: "Unassigned",
      date: new Date().toLocaleDateString("en-US"),
    };
    setTickets(prev => [t, ...prev]);
    setCounter(c => c + 1);
    toast.success(`🎫 Ticket "${title}" created!`, { autoClose: 3000 });
  };

  return (
    <div className="app">
      <ToastContainer position="top-right" newestOnTop closeOnClick pauseOnHover draggable theme="colored" />

      {showModal && <Modal onClose={() => setShowModal(false)} onSubmit={handleNewTicket} />}

      <Navbar onNewTicket={() => setShowModal(true)} />

      <div className="page-body">
        <StatCards inProgress={inProgressCount} resolved={resolvedCount} />

        <div className="content-grid">
          {/* LEFT — tickets */}
          <section className="tickets-section">
            <h2 className="section-heading">Customer Tickets</h2>
            {tickets.length === 0
              ? <div className="all-done"><span>🎉</span><p>All tickets resolved!</p></div>
              : <div className="tickets-grid">
                  {tickets.map(t => (
                    <TicketCard key={t.id} ticket={t}
                      onClick={handleTicketClick}
                      selected={selected?.id === t.id} />
                  ))}
                </div>
            }
          </section>

          {/* RIGHT — task status */}
          <aside className="task-sidebar">
            <TaskStatus taskQueue={taskQueue} resolvedList={resolvedList} onComplete={handleComplete} />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
