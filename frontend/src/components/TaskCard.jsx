import React from 'react';

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isCompleted = Boolean(task.is_completed);

  return (
    <div className={`task-card glass-card glass-card-hover animate-scale-up ${isCompleted ? 'completed' : ''}`}>
      <div>
        <div className="task-card-header">
          <h3 className="task-title">{task.title}</h3>
          <span 
            style={{ 
              fontSize: '0.75rem', 
              padding: '0.25rem 0.6rem', 
              borderRadius: '20px', 
              fontWeight: 600,
              background: isCompleted ? 'var(--status-success-bg)' : 'rgba(139, 92, 246, 0.15)',
              color: isCompleted ? 'var(--status-success)' : 'var(--accent-purple)',
              whiteSpace: 'nowrap'
            }}
          >
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>
        <p className="task-desc">{task.discription || 'No description provided.'}</p>
      </div>

      <div className="task-card-footer">
        <label className="checkbox-label" title="Toggle completion">
          <input 
            type="checkbox" 
            checked={isCompleted} 
            onChange={() => onToggleComplete(task)} 
          />
          <div className="checkbox-custom">
            {isCompleted && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </div>
          <span style={{ color: isCompleted ? 'var(--status-success)' : 'var(--text-muted)' }}>
            {isCompleted ? 'Done' : 'Mark Done'}
          </span>
        </label>

        <div className="task-actions">
          <button 
            className="icon-btn" 
            onClick={() => onEdit(task)} 
            title="Edit Task"
            aria-label="Edit Task"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          
          <button 
            className="icon-btn delete" 
            onClick={() => onDelete(task.id)} 
            title="Delete Task"
            aria-label="Delete Task"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
