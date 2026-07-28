import React, { useState, useEffect } from 'react';

export const TaskModal = ({ isOpen, onClose, onSave, initialTask }) => {
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDiscription(initialTask.discription || '');
    } else {
      setTitle('');
      setDiscription('');
    }
  }, [initialTask, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onSave({
        id: initialTask ? initialTask.id : undefined,
        title: title.trim(),
        discription: discription.trim(),
        is_completed: initialTask ? initialTask.is_completed : false
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {initialTask ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="task-title">Task Title *</label>
            <input 
              type="text" 
              id="task-title" 
              className="form-input" 
              placeholder="e.g. Redesign homepage hero section"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="task-desc">Description</label>
            <textarea 
              id="task-desc" 
              className="form-input" 
              placeholder="Add key details, action items, or notes..."
              rows="4"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading || !title.trim()}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{initialTask ? 'Update Task' : 'Create Task'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
