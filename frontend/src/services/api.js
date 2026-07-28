// API Service Layer interacting with proxied FastAPI backend

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response) => {
  if (response.status === 204) {
    return null;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.detail || data.message || 'An unexpected error occurred';
    throw new Error(errorMsg);
  }
  return data;
};

export const api = {
  // Auth Endpoints
  async login(username, password) {
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(response);
  },

  async register(name, username, email, password) {
    const response = await fetch('/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, email, password })
    });
    return handleResponse(response);
  },

  async isAuth() {
    const response = await fetch('/user/is_auth', {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Task Endpoints
  async getTasks() {
    const response = await fetch('/tasks/all_tasks', {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async createTask(title, discription, is_completed = false) {
    const response = await fetch('/tasks/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, discription, is_completed })
    });
    return handleResponse(response);
  },

  async updateTask(taskId, title, discription, is_completed) {
    const response = await fetch(`/tasks/update_task/${taskId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, discription, is_completed })
    });
    return handleResponse(response);
  },

  async deleteTask(taskId) {
    const response = await fetch(`/tasks/delete_task/${taskId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};
