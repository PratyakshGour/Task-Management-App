import React, { useState, useMemo } from 'react';
import { TaskCard } from './TaskCard';

export const Dashboard = ({ 
  tasks, 
  loading, 
  onOpenModal, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onRefresh 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  // Calculate analytics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.is_completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, progress };
  }, [tasks]);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (task.discription && task.discription.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchesSearch) return false;

      if (activeFilter === 'completed') return task.is_completed;
      if (activeFilter === 'pending') return !task.is_completed;
      return true;
    });
  }, [tasks, searchQuery, activeFilter]);

  return (
    <div className="dashboard-wrapper animate-fade-in">
      {/* Analytics Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{stats.total}</span>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '100%', opacity: 0.3 }}></div>
          </div>
        </div>

        <div className="stat-card glass-card">
          <span className="stat-label">Completed</span>
          <span className="stat-value" style={{ color: 'var(--status-success)' }}>{stats.completed}</span>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${stats.progress}%`, background: 'var(--status-success)' }}
            ></div>
          </div>
        </div>

        <div className="stat-card glass-card">
          <span className="stat-label">Pending</span>
          <span className="stat-value" style={{ color: 'var(--accent-purple)' }}>{stats.pending}</span>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${stats.total > 0 ? 100 - stats.progress : 0}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-card glass-card">
          <span className="stat-label">Completion Rate</span>
          <span className="stat-value gradient-text">{stats.progress}%</span>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${stats.progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Action and Filter Bar */}
      <div className="action-bar glass-card">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search tasks by title or description..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button 
            type="button"
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All ({stats.total})
          </button>
          <button 
            type="button"
            className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button 
            type="button"
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed ({stats.completed})
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={onRefresh} title="Refresh Tasks" aria-label="Refresh Tasks">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
          </button>

          <button className="btn-primary" onClick={() => onOpenModal()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Task Grid / Content Area */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <span className="spinner" style={{ width: '40px', height: '40px', borderWidth: '3px' }}></span>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading your workspace tasks...</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggleComplete={onToggleComplete} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            ))
          ) : (
            <div className="empty-state glass-card">
              <div className="empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-purple)' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>
                {searchQuery || activeFilter !== 'all' ? 'No matching tasks found' : 'No tasks in your workspace yet'}
              </h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
                {searchQuery || activeFilter !== 'all' 
                  ? 'Try adjusting your search terms or clearing active status filters.' 
                  : 'Get started by creating your first task to organize your workflow and boost productivity!'}
              </p>
              {searchQuery || activeFilter !== 'all' ? (
                <button 
                  className="btn-secondary" 
                  onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                  style={{ marginTop: '0.5rem' }}
                >
                  Clear Filters
                </button>
              ) : (
                <button 
                  className="btn-primary" 
                  onClick={() => onOpenModal()}
                  style={{ marginTop: '0.5rem' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span>Create Your First Task</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
