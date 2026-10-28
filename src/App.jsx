import { useState } from "react";
import { motion } from "framer-motion";
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
  FileText,
  Globe,
  Heart,
  LayoutDashboard,
  ListTodo,
  MessageCircle,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";

import "./styles.css";

const initialTasks = [
  {
    id: 1,
    title: "Review today's priorities",
    category: "PERSONAL",
    done: true,
  },
  {
    id: 2,
    title: "Update monthly expenses",
    category: "FINANCE",
    done: false,
  },
  {
    id: 3,
    title: "Organise important notes",
    category: "WORKSPACE",
    done: false,
  },
];

const initialNotes = [
  {
    id: 1,
    title: "Welcome to CüS",
    text: "Your personal space for ideas, plans and progress.",
  },
];

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "My tasks", icon: ListTodo },
      { label: "Notes", icon: FileText },
      { label: "Calendar", icon: CalendarDays },
    ],
  },
  {
    title: "YOUR LIFE",
    items: [
      { label: "Finance", icon: Wallet },
      { label: "Wellness", icon: Heart },
      { label: "Home & lists", icon: ShoppingBasket },
    ],
  },
];

function GlassButton({ children, onClick }) {
  return (
    <button
      type="button"
      className="glass-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [tasks, setTasks] = useState(initialTasks);
  const [notes, setNotes] = useState(initialNotes);
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState("");
  const [toast, setToast] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newNote, setNewNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [expense, setExpense] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Welcome to CüS Life! I'm your dashboard assistant prototype.",
    },
  ]);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
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
        done: false,
      },
    ]);

    setNewTask("");
    setModal("");
    notify("Task added.");
  }

  function addNote(event) {
    event.preventDefault();

    if (!noteTitle.trim()) return;

    setNotes((current) => [
      {
        id: Date.now(),
        title: noteTitle.trim(),
        text: newNote.trim(),
      },
      ...current,
    ]);

    setNoteTitle("");
    setNewNote("");
    setModal("");
    notify("Note created.");
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
      { id: Date.now(), amount },
    ]);

    setExpense("");
    setModal("");
    notify("Expense recorded.");
  }

  function sendMessage(event) {
    event.preventDefault();

    const question = chatInput.trim();

    if (!question) return;

    const text = question.toLowerCase();

    let reply =
      "I'm the CüS Life assistant prototype. I can demonstrate basic dashboard interactions, but a connected AI service has not been configured yet.";

    if (text.includes("task")) {
      const remaining = tasks.filter(
        (task) => !task.done
      ).length;

      reply = `You currently have ${remaining} unfinished tasks.`;
    } else if (
      text.includes("expense") ||
      text.includes("money") ||
      text.includes("finance")
    ) {
      const total = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      reply = `Your recorded prototype expenses total ₹${total.toLocaleString("en-IN")}.`;
    } else if (text.includes("note")) {
      reply = `You have ${notes.length} notes in this session.`;
    } else if (
      text.includes("privacy") ||
      text.includes("secure")
    ) {
      reply =
        "This is currently a frontend prototype, not an authenticated private service. Do not enter sensitive personal information.";
    } else if (text.includes("calendar")) {
      reply =
        "The calendar page is a prototype. Google Calendar integration has not been configured.";
    }

    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      { role: "assistant", text: reply },
    ]);

    setChatInput("");
  }

  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  function changePage(label) {
    setActivePage(label);
  }

  function renderTasks() {
    return (
      <section className="content-card glass-panel">
        <div className="card-heading">
          <div>
            <p className="eyebrow">STAY ON TRACK</p>
            <h2>Your tasks</h2>
          </div>

          <button
            className="small-add"
            onClick={() => setModal("task")}
            aria-label="Add task"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => (
            <div
              className={`task-row ${
                task.done ? "task-done" : ""
              }`}
              key={task.id}
            >
              <button
                className={`task-check ${
                  task.done ? "checked" : ""
                }`}
                onClick={() => toggleTask(task.id)}
                aria-label="Toggle task completion"
              >
                {task.done && <Check size={14} />}
              </button>

              <div className="task-copy">
                <strong>{task.title}</strong>
                <small>{task.category}</small>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <p>No matching tasks found.</p>
          )}
        </div>
      </section>
    );
  }

  function renderNotes() {
    return (
      <section className="content-card glass-panel">
        <div className="card-heading">
          <div>
            <p className="eyebrow">YOUR KNOWLEDGE</p>
            <h2>My notes</h2>
          </div>

          <button
            className="small-add"
            onClick={() => setModal("note")}
            aria-label="Create note"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="task-list">
          {notes.map((note) => (
            <article className="task-row" key={note.id}>
              <FileText size={20} />

              <div className="task-copy">
                <strong>{note.title}</strong>
                <small>{note.text || "No additional text."}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function renderPage() {
    if (activePage === "My tasks") {
      return renderTasks();
    }

    if (activePage === "Notes") {
      return renderNotes();
    }

    if (activePage === "Finance") {
      return (
        <section className="content-card glass-panel">
          <div className="card-heading">
            <div>
              <p className="eyebrow">YOUR MONEY</p>
              <h2>Expense tracker</h2>
            </div>

            <button
              className="small-add"
              onClick={() => setModal("expense")}
              aria-label="Add expense"
            >
              <Plus size={18} />
            </button>
          </div>

          <h3>
            ₹{totalExpenses.toLocaleString("en-IN")}
          </h3>

          <p>Expenses recorded in this session.</p>

          <div className="task-list">
            {expenses.map((item) => (
              <div className="task-row" key={item.id}>
                <Wallet size={18} />
                <div className="task-copy">
                  <strong>
                    ₹{item.amount.toLocaleString("en-IN")}
                  </strong>
                  <small>Recorded expense</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    const descriptions = {
      Calendar:
        "Your calendar workspace. External calendar integration is not connected.",
      Wellness:
        "Make space for rest, reflection and everyday wellbeing.",
      "Home & lists":
        "Keep everyday lists and household plans organised.",
    };

    if (descriptions[activePage]) {
      return (
        <section className="content-card glass-panel">
          <p className="eyebrow">YOUR PERSONAL SPACE</p>
          <h2>{activePage}</h2>
          <p>{descriptions[activePage]}</p>
        </section>
      );
    }

    return (
      <>
        <motion.section
          className="welcome-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
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
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </div>
        </motion.section>

        <motion.section
          className="hero-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="hero-image" />
          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="hero-tag">
              <Sparkles size={14} />
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
                onClick={() => setChatOpen(true)}
              >
                <Sparkles size={16} />
                Explore with AI
              </button>

              <button
                className="hero-secondary"
                onClick={() => setModal("about")}
              >
                Discover CüS ↗
              </button>
            </div>
          </div>

          <div className="hero-floating-card">
            <Activity size={20} />
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

          <GlassButton onClick={() => setModal("about")}>
            <CircleHelp size={15} />
            About your dashboard
          </GlassButton>
        </section>

        <div className="stats-grid">
          <article className="stat-card glass-panel">
            <div className="stat-top">
              <div className="stat-icon violet">
                <ListTodo size={19} />
              </div>
              <span className="stat-label">PRODUCTIVITY</span>
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
                      ? (completedTasks / tasks.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

            <small className="stat-footnote">
              {tasks.length - completedTasks} remaining
            </small>
          </article>

          <article className="stat-card glass-panel">
            <div className="stat-top">
              <div className="stat-icon green">
                <Wallet size={19} />
              </div>
              <span className="stat-label">EXPENSES</span>
            </div>

            <h3 className="money-value">
              ₹{totalExpenses.toLocaleString("en-IN")}
            </h3>

            <p>Recorded this session</p>

            <div className="stat-detail">
              <ArrowDownRight size={15} />
              <span>{expenses.length} entries</span>
            </div>
          </article>

          <article className="stat-card glass-panel">
            <div className="stat-top">
              <div className="stat-icon blue">
                <FileText size={19} />
              </div>
              <span className="stat-label">KNOWLEDGE</span>
            </div>

            <h3>{notes.length}</h3>
            <p>Notes created</p>

            <div className="stat-detail">
              <ArrowUpRight size={15} />
              <span>Keep ideas organised</span>
            </div>
          </article>
        </div>

        <div className="workspace-grid">
          {renderTasks()}

          <section className="content-card glass-panel">
            <div className="card-heading">
              <div>
                <p className="eyebrow">CAPTURE AN IDEA</p>
                <h2>Recent notes</h2>
              </div>

              <button
                className="small-add"
                onClick={() => setModal("note")}
                aria-label="Add note"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="task-list">
              {notes.slice(0, 3).map((note) => (
                <article className="task-row" key={note.id}>
                  <FileText size={18} />

                  <div className="task-copy">
                    <strong>{note.title}</strong>
                    <small>{note.text}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <aside className="sidebar glass-panel">
        <button
          className="brand"
          onClick={() => changePage("Dashboard")}
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
            <div className="nav-section" key={section.title}>
              <p className="nav-heading">{section.title}</p>

              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    className={`nav-item ${
                      activePage === item.label ? "active" : ""
                    }`}
                    onClick={() => changePage(item.label)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>

                    {item.label === "My tasks" && (
                      <span className="nav-count">
                        {tasks.filter((task) => !task.done).length}
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
            <p>A calmer way to organise everyday life.</p>

            <button onClick={() => setModal("about")}>
              Explore CüS Life ↗
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
              <Bell s