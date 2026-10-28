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
          