import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Edit2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'pending' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/tasks/${currentTask._id}`, currentTask);
      } else {
        await api.post('/tasks', currentTask);
      }
      setIsModalOpen(false);
      setCurrentTask({ title: '', description: '', status: 'pending' });
      setIsEditing(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="badge badge-completed">Completed</span>;
      case 'in-progress': return <span className="badge badge-progress">In Progress</span>;
      default: return <span className="badge badge-pending">Pending</span>;
    }
  };

  return (
    <div className="container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Your Tasks</h1>
          <p style={{ color: '#94a3b8' }}>Manage and track your daily productivity</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setIsEditing(false); setCurrentTask({ title: '', description: '', status: 'pending' }); setIsModalOpen(true); }}>
          <Plus size={20} />
          Create Task
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading tasks...</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {tasks.length === 0 ? (
            <div className="glass" style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
              <Clock size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No tasks found. Create your first task to get started!</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="glass task-card">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{task.title}</h3>
                    {getStatusBadge(task.status)}
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{task.description}</p>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                    Created by: {task.user?.name || 'You'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => openEditModal(task)}
                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8', padding: '8px', borderRadius: '8px' }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)}
                    style={{ background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', padding: '8px', borderRadius: '8px' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '500px', padding: '2rem', margin: '1rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Edit Task' : 'New Task'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Title</label>
                <input 
                  value={currentTask.title}
                  onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                  placeholder="Task title"
                  required
                />
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description</label>
                <textarea 
                  value={currentTask.description}
                  onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                  placeholder="Task details"
                  required
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: '8px', color: 'white', width: '100%', minHeight: '100px', fontFamily: 'inherit' }}
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Status</label>
                <select 
                  value={currentTask.status}
                  onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: '8px', color: 'white', width: '100%', cursor: 'pointer' }}
                >
                  <option value="pending" style={{ background: '#1e293b' }}>Pending</option>
                  <option value="in-progress" style={{ background: '#1e293b' }}>In Progress</option>
                  <option value="completed" style={{ background: '#1e293b' }}>Completed</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', color: 'white', padding: '12px', borderRadius: '8px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>{isEditing ? 'Update Task' : 'Create Task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
