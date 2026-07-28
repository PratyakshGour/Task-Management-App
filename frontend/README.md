# TaskPulse — React Frontend Application

This directory contains the dynamic, visually stunning **React 19 + Vite** frontend for the **TaskPulse Task Management Application**. It features a modern **Glassmorphism design system** crafted entirely in **Vanilla CSS** to deliver a responsive, premium user experience.

---

## ✨ Highlights & Key Features

### 🎨 Design System & Aesthetics
- **Glassmorphism UI**: Uses translucent cards with `backdrop-filter: blur(16px)`, glowing borders, and subtle shadow elevations that react dynamically to user hovers.
- **Dark & Light Mode**: Seamless theme switcher built into the navigation bar that persists user preferences in `localStorage`.
- **Animated Mesh Backgrounds**: Floating, multi-colored background mesh gradients (`#8b5cf6` electric purple and `#06b6d4` neon cyan) that animate smoothly using CSS keyframes.
- **Modern Typography**: Integrated with Google Fonts (*Outfit* for bold headings and *Inter* for clean body copy).
- **Micro-interactions**: Custom animated checkmarks with bounce effects, button hover elevations, modal popups, and pulsing loading skeletons.

### ⚡ Performance & State Management
- **Optimistic UI Updates**: Task completion toggles and deletions update the UI instantly while syncing with the server in the background for a lightning-fast feel.
- **Integrated Toast System**: Floating notification alerts in the bottom-right corner provide immediate success, error, and informational feedback for all user actions.
- **Zero CORS Configuration**: Configured with Vite Server Proxying in `vite.config.js`. API requests to `/user/*` and `/tasks/*` are automatically forwarded to the backend (`http://127.0.0.1:8000`), requiring **0 modifications** to the backend codebase.

---

## 🧩 Component Architecture

```text
src/
├── components/
│   ├── Navbar.jsx       # Top navigation bar with branding, user badge, theme toggle, and logout
│   ├── AuthView.jsx     # Tabbed Login and Registration interface with validation & loading states
│   ├── Dashboard.jsx    # Analytics cards, live search bar, status filters, and task grid layout
│   ├── TaskCard.jsx     # Interactive task card with custom animated checkbox and action triggers
│   ├── TaskModal.jsx    # Glassmorphic modal popup for task creation and editing (keyboard accessible)
│   └── Toast.jsx        # Floating notification alert system for instant user feedback
├── services/
│   └── api.js           # API client layer with automatic JWT Bearer token header injection
├── App.jsx              # Core application state, authentication verification, and router logic
└── index.css            # Complete design system tokens, keyframe animations, and utility classes
```

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (version 18 or higher) and **npm** installed.

### 2. Installation
Navigate into the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

### 3. Running the Development Server
Before starting the frontend, ensure your FastAPI backend is running on port `8000` (via `uvicorn main:app --port 8000 --reload` in the project root).

Start the Vite dev server:

```bash
npm run dev
```

The application will launch at `http://localhost:5173`. Open this URL in your web browser.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This will bundle and optimize the application into the `dist/` directory, ready for deployment. To preview the production build locally, run:

```bash
npm run preview
```

---

## 🔌 API Mapping Reference

The frontend `api.js` service interacts directly with your existing backend endpoints:
- **`POST /user/register`**: Registers a new user account.
- **`POST /user/login`**: Authenticates credentials and stores the JWT token in `localStorage`.
- **`GET /user/is_auth`**: Validates stored tokens on application mount and fetches user profile details.
- **`GET /tasks/all_tasks`**: Retrieves all tasks belonging to the authenticated user.
- **`POST /tasks/create`**: Creates a new task (automatically maps description to the backend's `discription` field).
- **`PUT /tasks/update_task/{id}`**: Updates task title, description, and completion status.
- **`DELETE /tasks/delete_task/{id}`**: Removes a task from the workspace.
