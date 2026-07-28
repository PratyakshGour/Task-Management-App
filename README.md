# TaskPulse — Premium Task Management Application

A state-of-the-art, full-stack Task Management application featuring a high-performance **FastAPI** backend and a dynamic, visually stunning **React + Vite** frontend designed with modern **Glassmorphism aesthetics** and **Vanilla CSS**.

---

## ✨ Features

### 🎨 Frontend (React + Vite)
- **Rich Visual Aesthetics**: Modern glassmorphic cards (`backdrop-filter`), vibrant mesh gradients, smooth micro-interactions, and refined typography using Google Fonts (*Outfit* and *Inter*).
- **Dark & Light Mode**: Integrated theme toggle with persistent user preference storage in `localStorage`.
- **Dashboard Analytics**: Real-time summary cards displaying Total Tasks, Completed Tasks, Pending Tasks, and a dynamic completion progress bar.
- **Search & Filtering**: Instant live search by title or description and tabbed filtering (*All*, *Pending*, *Completed*).
- **Optimistic UI & Toasts**: Immediate visual feedback for task status toggles, deletion, and auth actions with custom toast notifications.
- **Zero CORS Issues**: Configured with Vite's dev server proxy to route API requests seamlessly to the backend without modifying backend code.

### ⚙️ Backend (FastAPI + SQLAlchemy)
- **Authentication**: JWT-based user authentication and password hashing via `pwdlib`.
- **User Management**: Secure account registration and login endpoints with email notification support.
- **Task CRUD**: Robust REST APIs for creating, reading, updating, and deleting tasks mapped to authenticated users.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Vanilla CSS (Custom Design Tokens & Animations)
- **Backend**: Python, FastAPI, SQLAlchemy, SQLite, Pydantic, PyJWT
- **Database**: SQLite (`user_tasks` and `user_table` schemas)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Python** 3.10+
- **Node.js** 18+ and **npm**

---

### 2. Backend Setup & Start

Open a terminal in the root project directory:

```bash
# 1. Activate the Python virtual environment
source env/bin/activate

# 2. Install backend dependencies (if not already installed)
pip install -r requirement.txt

# 3. Run the FastAPI development server
uvicorn main:app --port 8000 --reload
```

The FastAPI backend will start running at `http://127.0.0.1:8000`.
You can access interactive API docs (Swagger UI) at `http://127.0.0.1:8000/docs`.

---

### 3. Frontend Setup & Start

Open a second terminal window and navigate to the `frontend/` directory:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

The React frontend will start running at `http://localhost:5173`. Open this URL in your web browser to enjoy the application!

---

## 🔌 API Architecture & Proxying

To maintain strict adherence to the existing backend codebase without introducing CORS modifications, the frontend utilizes **Vite Server Proxying** configured in `vite.config.js`:
- Requests to `/user/*` are proxied to `http://127.0.0.1:8000/user/*`
- Requests to `/tasks/*` are proxied to `http://127.0.0.1:8000/tasks/*`

---

## 📁 Project Structure

```text
Task_Management/
├── main.py                 # FastAPI application entrypoint & routers setup
├── requirement.txt         # Python dependencies
├── src/                    # Backend source code
│   ├── tasks/              # Task models, schemas, and CRUD controllers
│   ├── user/               # User authentication & registration controllers
│   └── utils/              # Database config, JWT helpers, and mail utility
└── frontend/               # React Frontend Application
    ├── index.html          # Entry HTML with Google Fonts & SEO tags
    ├── vite.config.js      # Vite build and API proxy configuration
    └── src/
        ├── index.css       # Design system tokens, animations & glass styles
        ├── services/
        │   └── api.js      # API client layer with JWT header injection
        └── components/
            ├── Navbar.jsx  # Top navigation bar with theme switcher
            ├── AuthView.jsx# Login and Registration tabbed view
            ├── Dashboard.jsx # Analytics cards, filters, and task grid
            ├── TaskCard.jsx  # Interactive task item card
            ├── TaskModal.jsx # Popup modal for creating/editing tasks
            └── Toast.jsx     # Floating notification alert system
```
