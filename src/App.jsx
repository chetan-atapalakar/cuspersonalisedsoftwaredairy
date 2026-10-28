import { useState } from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Command,
  CreditCard,
  FileText,
  Globe,
  Heart,
  Home,
  LayoutDashboard,
  ListTodo,
  LockKeyhole,
  MessageCircle,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Wallet,
  X
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Review today's priorities",
    category: "PERSONAL",
    done: true
  },
  {
    id: 2,
    title: "Update monthly expenses",
    category: "FINANCE",
    done: false
  },
  {
    id: 3,
    title: "Organise important notes",
    category: "WORKSPACE",
    done: false
  }
];

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard
      },
      {
        label: "My tasks",
        icon: ListTodo
      },
      {
        label: "Notes",
        icon: FileText
      },
      {
        label: "Calendar",
        icon: CalendarDays
      }
    ]
  },
  {
    title: "YOUR LIFE",
    items: [
      {
        label: "Finance",
        icon: Wallet
      },
      {
        label: "Wellness",
        icon: Heart
      },
      {
        label: "Home & lists",
        icon: ShoppingBasket
      }
    ]
  }
];

function GlassButton({
  children,
  onClick,
  className = "",
  type = "button"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`glass-button ${className}`}
    >
      {children}
    </button>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [tasks, setTasks] = useState(initialTasks);

  const [modal, setModal] = useState(null);

  const [toast, setToast] = useState("");

  const [chatOpen, setChatOpen] = useState(false);

  const [chatInput, setChatInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to your personal space. I can explain CüS Life features and help you explore this prototype."
    }
  ]);

  const [newTask, setNewTask] = useState("");

  const [expense, setExpense] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [notes, setNotes] = useState([]);

  const [newNote, setNewNote] = useState("");

  function notify(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2600);
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function addTask(event) {
    event.preventDefault();

    if (!newTask.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.trim(),
        category: "PERSONAL",
        done: false
      }
    ]);

    setNewTask("");

    setModal(null);

    notify("Task added to this prototype.");
  }

  function addExpense(event) {
    event.preventDefault();

    const amount = Number(expense);

    if (!Number.isFinite(amount) || amount <= 0) {
      notify("Enter a valid expense amount.");
      return;
    }

    setExpenses((current) => [
      ...current,
      {
        id: Date.now(),
        amount
      }
    ]);

    setExpense("");

    setModal(null);

    notify("Expense added to this prototype.");
  }

  function addNote(event) {
    event.preventDefault();

    if (!newNote.trim()) return;

    setNotes((current) => [
      ...current,
      {
        id: Date.now(),
        text: newNote.trim()
      }
    ]);

    setNewNote("");

    setModal(null);

    notify("Note added to this prototype.");
  }

  function handleNavigation(label) {
    setActivePage(label);

    if (label !== "Dashboard") {
      notify(`${label} workspace selected.`);
    }
  }

  function sendMessage(event) {
    event.preventDefault();

    const question = chatInput.trim();

    if (!question) return;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: question
      },
      {
        role: "assistant",
        text: getPrototypeReply(question)
      }
    ]);

    setChatInput("");
  }

  function getPrototypeReply(question) {
    const text = question.toLowerCase();

    if (
      text.includes("task") ||
      text.includes("todo")
    ) {
      const remaining = tasks.filter(
        (task) => !task.done
      ).length;

      return `Your current prototype contains ${remaining} unfinished tasks. I can demonstrate task-related interactions, but persistent personal-data analysis requires the secure backend integration.`;
    }

    if (
      text.includes("expense") ||
      text.includes("money") ||
      text.includes("finance")
    ) {
      const total = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      return `Expenses entered during this prototype session total ₹${total.toLocaleString("en-IN")}. This is only session data, not a bank balance or a complete financial report.`;
    }

    if (
      text.includes("google") ||
      text.includes("calendar")
    ) {
      return "Google integration is planned for the next development session. Real access will require Google OAuth, explicit permissions and backend configuration.";
    }

    if (
      text.includes("privacy") ||
      text.includes("private") ||
      text.includes("secure")
    ) {
      return "Privacy is a core design requirement. This interface is not yet an authenticated private service. We must implement server-enforced access controls before storing real personal information.";
    }

    if (
      text.includes("note")
    ) {
      return `You have created ${notes.length} note${notes.length === 1 ? "" : "s"} in this prototype session. Persistent storage will be implemented in the backend phase.`;
    }

    return "I'm the CüS Life interface assistant prototype. I can explain the dashboard, tasks, expenses, notes and planned integrations. A connected AI model and authorised personal-data tools will be added in the next session.";
  }

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <aside className="sidebar glass-panel">
        <button
          className="brand"
          onClick={() => handleNavigation("Dashboard")}
        >
          <span className="brand-mark">CüS</span>

          <span className="brand-copy">
            <strong>CüS Life</strong>
            <small>YOUR PERSONAL SPACE</small>
          </span>
        </button>

        <div className="workspace-pill">
          <div className="workspace-avatar">C</div>

          <div>
            <strong>Personal space</strong>
            <small>Local prototype</small>
          </div>

          <ChevronDown size={15} />
        </div>

        <div className="nav-scroll">
          {navigation.map((section) => (
            <div
              className="nav-section"
              key={section.title}
            >
              <p className="nav-heading">
                {section.title}
              </p>

              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    className={`nav-item ${
                      activePage === item.label
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleNavigation(item.label)
                    }
                  >
                    <Icon size={18} />

                    <span>{item.label}</span>

                    {item.label === "My tasks" && (
                      <span className="nav-count">
                        {
                          tasks.filter(
                            (task) => !task.done
                          ).length
                        }
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          <div className="nav-section">
            <p className="nav-heading">SYSTEM</p>

            <button
              className="nav-item"
              onClick={() => setModal("integrations")}
            >
              <Globe size={18} />
              <span>Integrations</span>
            </button>

            <button
              className="nav-item"
              onClick={() => setModal("privacy")}
            >
              <ShieldCheck size={18} />
              <span>Privacy & access</span>
            </button>

            <button
              className="nav-item"
              onClick={() => setModal("settings")}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">
              <Sparkles size={19} />
            </div>

            <strong>Your space. Your rules.</strong>

            <p>
              A calmer way to organise everyday life.
            </p>

            <button
              onClick={() => setModal("about")}
            >
              Explore CüS Life <span>↗</span>
            </button>
          </div>

          <button
            className="profile-row"
            onClick={() => setModal("account")}
          >
            <div className="profile-avatar">G</div>

            <div className="profile-details">
              <strong>Guest preview</strong>
              <small>Not signed in</small>
            </div>

            <Settings size={17} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Workspace</span>

            <span className="crumb-slash">/</span>

            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Search size={16} />

              <input
                type="search"
                placeholder="Search your workspace"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              <span className="shortcut">
                <Command size={12} /> K
              </span>
            </label>

            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() => setModal("notifications")}
            >
              <Bell size={18} />
              <span className="notification-dot" />
            </button>

            <button
              className="top-avatar"
              onClick={() => setModal("account")}
            >
              G
            </button>
          </div>
        </header>

        <div className="content">
          <motion.section
            className="welcome-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div>
              <div className="eyebrow">
                <span className="status-dot" />
                YOUR PERSONAL COMMAND CENTRE
              </div>

              <h1>
                Make room for
                <br />

                <span>what matters.</span>
              </h1>

              <p className="welcome-description">
                One thoughtful space for your work,
                money, wellbeing and everyday life.
              </p>
            </div>

            <div className="date-chip">
              <CalendarDays size={16} />

              <span>
                {new Date().toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                  }
                )}
              </span>
            </div>
          </motion.section>

          <motion.section
            className="hero-card"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.12
            }}
          >
            <div className="hero-image" />

            <div className="hero-overlay" />

            <div className="hero-content">
              <div className="hero-tag">
                <Sparkles size={13} />

                YOUR SPACE, REIMAGINED
              </div>

              <h2>
                A little more
                <br />
                clarity. Every day.
              </h2>

              <p>
                Bring your everyday essentials into
                one beautifully organised space.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onClick={() =>
                    setChatOpen(true)
                  }
                >
                  <Sparkles size={16} />
                  Explore with AI
                </button>

                <button
                  className="hero-secondary"
                  onClick={() =>
                    setModal("about")
                  }
                >
                  Discover CüS <span>↗</span>
                </button>
              </div>
            </div>

            <div className="hero-floating-card">
              <div className="floating-icon">
                <Activity size={18} />
              </div>

              <div>
                <small>YOUR NEXT CHAPTER</small>
                <strong>Starts with intention.</strong>
              </div>

              <ArrowUpRight size={18} />
            </div>
          </motion.section>

          <section className="section-heading">
            <div>
              <p className="eyebrow">YOUR OVERVIEW</p>

              <h2>The bigger picture</h2>
            </div>

            <GlassButton
              onClick={() => setModal("about")}
            >
              <CircleHelp size={15} />
              About your dashboard
            </GlassButton>
          </section>

          <div className="stats-grid">
            <motion.article
              className="stat-card glass-panel"
              whileHover={{ y: -4 }}
            >
              <div className="stat-top">
                <div className="stat-icon violet">
                  <ListTodo size={19} />
                </div>

                <span className="stat-label">
                  PRODUCTIVITY
                </span>
              </div>

              <h3>
                {completedTasks}
                <span> / {tasks.length}</span>
              </h3>

              <p>Tasks completed</p>

              <div className="progress-track">
                <div
                  className="progress-fill violet-fill"
                  style={{
                    width: `${
                      tasks.length
                        ? (completedTasks /
                            tasks.length) *
                          100
                        : 0
                    }%`
                  }}
                />
              </div>

              <small className="stat-footnote">
                {tasks.length - completedTasks} remaining
              </small>
            </motion.article>

            <motion.article
              className="stat-card glass-panel"
              whileHover={{ y: -4 }}
            >
              <div className="stat-top">
                <div className="stat-icon green">
                  <Wallet size={19} />
                </div>

                <span className="stat-label">
                  EXPENSES
                </span>
              </div>

              <h3 className="money-value">
                ₹{totalExpenses.toLocaleString("en-IN")}
              </h3>

              <p>Entered this session</p>

              <div className="stat-detail">
                <ArrowDownRight size={15} />

                <span>
                  {expenses.length} recorded entries
                </span>
              </div>

              <small className="stat-footnote">
                Prototype data only
              </small>
            </motion.article>

            <motion.article
              className="stat-card glass-panel"
              whileHover={{ y: -4 }}
            >
              <div className="stat-top">
                <div className="stat-icon blue">
                  <FileText size={19} />
                </div>

                <span className="stat-label">
                  KNOWLEDGE
                </span>
              </div>

              <h3>{notes.length}</h3>

              <p>Notes created this session</p>

              <div className="stat-detail">
                <ArrowUpRight size={15} />

                <span>
                  Keep your ideas organised
                </span>
              </div>

              <small className="stat-footnote">
                Session-only notes
              </small>
            </motion.article>
          </div>

          <div className="workspace-grid">
            <section className="content-card glass-panel">
              <div className="card-heading">
                <div>
                  <p className="eyebrow">
                    SMALL STEPS, REAL PROGRESS
                  </p>

                  <h2>Your priorities</h2>
                </div>

                <button
                  className="small-add"
                  aria-label="Add a task"
                  onClick={() => setModal("task")}
                >
                  <Plus size={17} />
                </button>
              </div>

              <div className="task-list">
                {filteredTasks.map((task) => (
                  <motion.div
                    layout
                    key={task.id}
                    className={`task-row ${
                      task.done ? "task-done" : ""
                    }`}
                  >
                    <button
                      className={`task-check ${
                        task.done ? "checked" : ""
                      }`}
                      aria-label={
                        task.done
                          ? "Mark incomplete"
                          : "Mark complete"
                      }
                      onClick={() =>
                        toggleTask(task.id)
                      }
                    >
                      {task.done && (
                        <Check size={13} />
                      )}
                    </button>

                    <div className="task-copy">
                      <strong>{task.title}</strong>

                      <small>{task.category}</small>
                    </div>

                    <button
                      className="task-menu"
                      aria-label="Task options"
                      onClick={() =>
                        notify(
                          "Task options will be expanded in a later version."
                        )
                      }
                    >
                      ···
import React, { useState } from "react";
import "./styles.css";

const initialNotes = [
  {
    id: 1,
    title: "Welcome to CüS",
    text: "Your personal space for ideas, plans and progress.",
    category: "Personal",
  },
  {
    id: 2,
    title: "Build something meaningful",
    text: "Small improvements compound into extraordinary results.",
    category: "Ideas",
  },
];

function App() {
  const [page, setPage] = useState("Overview");
  const [notes, setNotes] = useState(initialNotes);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Explore your new workspace", done: true },
    { id: 2, text: "Create your first note", done: false },
    { id: 3, text: "Plan tomorrow", done: false },
  ]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [toast, setToast] = useState("");

  const menu = [
    { name: "Overview", icon: "◈" },
    { name: "My Notes", icon: "▤" },
    { name: "Tasks", icon: "✓" },
    { name: "Calendar", icon: "▦" },
    { name: "Messages", icon: "◌" },
    { name: "AI Assistant", icon: "✳" },
    { name: "Finance", icon: "↗" },
    { name: "Settings", icon: "⚙" },
  ];

  function notify(text) {
    setToast(text);
    setTimeout(() => setToast(""), 2600);
  }

  function addNote(e) {
    e.preventDefault();

    if (!noteTitle.trim()) return;

    setNotes([
      {
        id: Date.now(),
        title: noteTitle,
        text: noteText,
        category: "Personal",
      },
      ...notes,
    ]);

    setNoteTitle("");
    setNoteText("");
    setShowNote(false);
    notify("Note created successfully");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function sendMessage(e) {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages([
      ...messages,
      { role: "You", text: userMessage },
    ]);

    setMessage("");

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          role: "CüS",
          text:
            "I'm your CüS assistant interface. AI connectivity will be configured in a later step.",
        },
      ]);
    }, 500);
  }

  function renderContent() {
    if (page === "Overview") {
      return (
        <>
          <div className="welcome-row">
            <div>
              <div className="eyebrow">YOUR PERSONAL WORKSPACE</div>
              <h1>Make room for <span>better.</span></h1>
              <p className="muted">
                One space for everything that matters.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => setShowNote(true)}
            >
              + New note
            </button>
          </div>

          <div className="hero-card">
            <div className="hero-content">
              <span className="pill">YOUR SPACE. YOUR RULES.</span>
              <h2>Think clearly.<br />Create freely.</h2>
              <p>
                Your ideas, plans and ambitions deserve
                a place of their own.
              </p>

              <button
                className="light-btn"
                onClick={() => setPage("My Notes")}
              >
                Explore workspace ↗
              </button>
            </div>

            <div className="hero-orb">
              <div className="orb-inner">CüS</div>
            </div>
          </div>

          <div className="section-heading">
            <div>
              <h2>Your workspace</h2>
              <p className="muted">A little progress, every day.</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon purple">▤</span>
              <p>YOUR NOTES</p>
              <h3>{notes.length.toString().padStart(2, "0")}</h3>
              <span className="stat-caption">Ideas captured</span>
            </div>

            <div className="stat-card">
              <span className="stat-icon green">✓</span>
              <p>COMPLETED</p>
              <h3>
                {tasks.filter((task) => task.done).length}
              </h3>
              <span className="stat-caption">Tasks finished</span>
            </div>

            <div className="stat-card">
              <span className="stat-icon orange">✳</span>
              <p>YOUR FOCUS</p>
              <h3>∞</h3>
              <span className="stat-caption">Room to grow</span>
            </div>
          </div>

          <div className="content-grid">
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Quick tasks</h3>
                  <p>Keep moving forward.</p>
                </div>
                <button
                  className="text-btn"
                  onClick={() => setPage("Tasks")}
                >
                  View all ↗
                </button>
              </div>

              <div className="task-list">
                {tasks.slice(0, 4).map((task) => (
                  <label className="task-item" key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className={task.done ? "completed" : ""}>
                      {task.text}
                    </span>
                  </label>
                ))}
              </div>

              <button
                className="outline-btn full-width"
                onClick={() => {
                  setTasks([
                    ...tasks,
                    {
                      id: Date.now(),
                      text: "New task",
                      done: false,
                    },
                  ]);
                  notify("New task added");
                }}
              >
                + Add a task
              </button>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Recent notes</h3>
                  <p>Your thoughts, collected.</p>
                </div>
                <button
                  className="text-btn"
                  onClick={() => setPage("My Notes")}
                >
                  See all ↗
                </button>
              </div>

              {notes.slice(0, 3).map((note) => (
                <div className="note-preview" key={note.id}>
                  <div className="note-symbol">✎</div>
                  <div>
                    <strong>{note.title}</strong>
                    <p>{note.text}</p>
                  </div>
                </div>
              ))}

              <button
                className="outline-btn full-width"
                onClick={() => setShowNote(true)}
              >
                + Capture an idea
              </button>
            </section>
          </div>
        </>
      );
    }

    if (page === "My Notes") {
      return (
        <>
          <div className="page-heading">
            <div>
              <div className="eyebrow">YOUR THOUGHTS</div>
              <h1>My <span>Notes.</span></h1>
              <p className="muted">
                Give your ideas somewhere to live.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => setShowNote(true)}
            >
              + New note
            </button>
          </div>

          <div className="notes-grid">
            {notes.map((note) => (
              <article className="note-card" key={note.id}>
                <span className="pill">{note.category}</span>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
                <span className="note-footer">CüS JOURNAL</span>
              </article>
            ))}
          </div>
        </>
      );
    }

    if (page === "Tasks") {
      return (
        <>
          <div className="page-heading">
            <div>
              <div className="eyebrow">SMALL STEPS ADD UP</div>
              <h1>Your <span>Tasks.</span></h1>
              <p className="muted">
                Progress over perfection.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                setTasks([
                  ...tasks,
                  {
                    id: Date.now(),
                    text: "New task",
                    done: false,
                  },
                ]);
                notify("New task added");
              }}
            >
              + Add task
            </button>
          </div>

          <section className="panel task-page-panel">
            {tasks.map((task) => (
              <label className="task-item" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.done ? "completed" : ""}>
                  {task.text}
                </span>
              </label>
            ))}

            <p className="muted task-summary">
              {tasks.filter((task) => task.done).length}
              {" of "}
              {tasks.length} tasks completed
            </p>
          </section>
        </>
      );
    }

    if (page === "AI Assistant" || page === "Messages") {
      const isAI = page === "AI Assistant";

      return (
        <>
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                {isAI ? "YOUR THINKING SPACE" : "STAY CONNECTED"}
              </div>
              <h1>
                {isAI ? <>AI <span>Assistant.</span></> : <>Private <span>Messages.</span></>}
              </h1>
              <p className="muted">
                {isAI
                  ? "A home for your questions and ideas."
                  : "A dedicated space for conversations."}
              </p>
            </div>
          </div>

          <section className="chat-panel">
            <div className="chat-header">
              <div className="chat-avatar">
                {isAI ? "✳" : "◌"}
              </div>
              <div>
                <strong>{isAI ? "CüS Intelligence" : "CüS Messenger"}</strong>
                <p>
                  {isAI
                    ? "AI connection not configured yet"
                    : "Messaging setup is coming next"}
                </p>
              </div>
              <span className="status-dot" />
            </div>

            <div className="chat-body">
              {messages.length === 0 && (
                <div className="chat-empty">
                  <div className="chat-big-icon">
                    {isAI ? "✳" : "◌"}
                  </div>
                  <h3>
                    {isAI ? "Start with a thought." : "Your conversations start here."}
                  </h3>
                  <p>
                    {isAI
                      ? "This is the interface preview. A secure AI backend will be connected in a later step."
                      : "The interface is ready for development. Real private messaging requires accounts and a database."}
                  </p>
                </div>
              )}

              {messages.map((item, index) => (
                <div
                  className={
                    item.role === "You"
                      ? "chat-message own-message"
                      : "chat-message"
                  }
                  key={index}
                >
                  <small>{item.role}</small>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <form className="chat-form" onSubmit={sendMessage}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something..."
              />
              <button className="primary-btn" type="submit">
                Send ↗
              </button>
            </form>
          </section>
        </>
      );
    }

    const descriptions = {
      Calendar: "Your dates, plans and important moments.",
      Finance: "A clearer view of your personal finances.",
      Settings: "Your profile, preferences and privacy.",
    };

    return (
      <>
        <div className="page-heading">
          <div>
            <div className="eyebrow">YOUR PERSONAL WORKSPACE</div>
            <h1>{page.split(" ")[0]} <span>{page.split(" ").slice(1).join(" ")}.</span></h1>
            <p className="muted">
              {descriptions[page] || "Your personal space."}
            </p>
          </div>
        </div>

        <section className="panel coming-soon">
          <div className="chat-big-icon">✳</div>
          <h2>Something good is taking shape.</h2>
          <p>
            This section will be developed in the next stages.
          </p>
        </section>
      </>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <strong>CüS<span>.</span></strong>
            <small>YOUR PERSONAL SPACE</small>
          </div>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="navigation">
          {menu.map((item) => (
            <button
              key={item.name}
              className={
                page === item.name
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setPage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
              {item.name === "Messages" && (
                <span className="nav-indicator" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✧</div>
            <strong>Room to become.</strong>
            <p>A little more clarity, every day.</p>
          </div>

          <div className="profile-mini">
            <div className="profile-avatar">C</div>
            <div>
              <strong>Your workspace</strong>
              <small>Local preview</small>
            </div>
            <span>···</span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>{page}</strong>
          </div>

          <div className="topbar-right">
            <span className="date-label">
              YOUR SPACE, YOUR PACE
            </span>
            <div className="top-avatar">C</div>
          </div>
        </header>

        <div className="page-content">
          {renderContent()}

          <footer className="footer">
            <span>© 2026 CüS</span>
            <span>STYLE YOUR LIFE. SHAPE YOUR WORLD.</span>
          </footer>
        </div>
      </main>

      {showNote && (
        <div
          className="modal-backdrop"
          onClick={() => setShowNote(false)}
        >
          <form
            className="note-modal"
            onSubmit={addNote}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowNote(false)}
            >
              ×
            </button>

            <div className="eyebrow">CAPTURE THE THOUGHT</div>
            <h2>Create a <span>note.</span></h2>

            <label>Title</label>
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Give your idea a name"
              required
            />

            <label>Your thoughts</label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Start writing..."
              rows="5"
            />

            <button className="primary-btn full-width" type="submit">
              Save note ↗
            </button>
          </form>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
          