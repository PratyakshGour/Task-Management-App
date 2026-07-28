import React, { useState, useEffect, useCallback } from 'react';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { AuthView } from './components/AuthView';
import { Dashboard } from './components/Dashboard';
import { TaskModal } from './components/TaskModal';
import { Toast } from './components/Toast';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Auth & User State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Tasks State
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Update Theme in DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Fetch Tasks from API
  const fetchTasks = useCallback(async () => {
    setTasksLoading(true);
    try {
      const data = await api.getTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      addToast(err.message || 'Failed to fetch tasks', 'error');
    } finally {
      setTasksLoading(false);
    }
  }, [addToast]);

  // Initial Auth Check
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const userData = await api.isAuth();
        if (userData && userData.id) {
          setUser(userData);
          await fetchTasks();
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [fetchTasks]);

  // Handlers
  const handleLoginSuccess = async (token) => {
    setAuthLoading(true);
    try {
      const userData = await api.isAuth();
      if (userData && userData.id) {
        setUser(userData);
        await fetchTasks();
      }
    } catch (err) {
      addToast('Failed to load user profile.', 'error');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTasks([]);
    addToast('You have been logged out.', 'info');
  };

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskData.id) {
        // Update existing task
        const updated = await api.updateTask(
          taskData.id, 
          taskData.title, 
          taskData.discription, 
          taskData.is_completed
        );
        setTasks(prev => prev.map(t => t.id === taskData.id ? (updated || { ...t, ...taskData }) : t));
        addToast('Task updated successfully!', 'success');
      } else {
        // Create new task
        const created = await api.createTask(
          taskData.title, 
          taskData.discription, 
          taskData.is_completed
        );
        if (created) {
          setTasks(prev => [created, ...prev]);
        } else {
          await fetchTasks();
        }
        addToast('New task created successfully!', 'success');
      }
    } catch (err) {
      addToast(err.message || 'Failed to save task.', 'error');
      throw err;
    }
  };

  const handleToggleComplete = async (task) => {
    const newStatus = !task.is_completed;
    // Optimistic UI update
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, is_completed: newStatus } : t));

    try {
      await api.updateTask(task.id, task.title, task.discription, newStatus);
      if (newStatus) {
        addToast(`Completed: "${task.title}"`, 'success');
      }
    } catch (err) {
      // Revert optimistic update on error
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, is_completed: !newStatus } : t));
      addToast('Failed to update task status.', 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    // Optimistic delete
    const previousTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== taskId));

    try {
      await api.deleteTask(taskId);
      addToast('Task deleted.', 'info');
    } catch (err) {
      setTasks(previousTasks);
      addToast('Failed to delete task.', 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />

      {authLoading ? (
        <div style={{ textAlign: 'center', padding: '6rem 0' }}>
          <span className="spinner" style={{ width: '48px', height: '48px', borderWidth: '4px' }}></span>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Verifying authentication...</p>
        </div>
      ) : !user ? (
        <AuthView 
          onLoginSuccess={handleLoginSuccess} 
          addToast={addToast} 
        />
      ) : (
        <Dashboard 
          tasks={tasks} 
          loading={tasksLoading} 
          onOpenModal={handleOpenModal} 
          onToggleComplete={handleToggleComplete} 
          onEdit={handleOpenModal} 
          onDelete={handleDeleteTask} 
          onRefresh={fetchTasks} 
        />
      )}

      <TaskModal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveTask} 
        initialTask={editingTask} 
      />

      <Toast 
        toasts={toasts} 
        onDismiss={dismissToast} 
      />
    </div>
  );
}
