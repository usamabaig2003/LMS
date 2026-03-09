import { Upload, FileText, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';

const assignmentsData = [
  { id: 1, title: 'Build a REST API', course: 'Advanced Node.js', due: '2025-11-20', status: 'pending' },
  { id: 2, title: 'Database Schema Design', course: 'Database Fundamentals', due: '2025-11-22', status: 'pending' },
  { id: 3, title: 'React Context API Draft', course: 'Advanced React', due: '2025-11-25', status: 'pending' },
  { id: 4, title: 'CSS Layouts Responsive', course: 'Web Fundamentals', due: '2025-11-10', status: 'pending' },
];

function Assignments() {
  const [activeTab, setActiveTab] = useState('pending');

  const filtered = assignmentsData.filter(a => activeTab === 'all' || a.status === activeTab);

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">My Assignments</h1>
      <p className="page-subtitle">Manage your coursework and submit assignments.</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        {['pending', 'submitted', 'graded', 'all'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: 'var(--radius-xl)',
              background: activeTab === tab ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filtered.map(assignment => (
          <div key={assignment.id} className="card glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                padding: '1rem', 
                borderRadius: '50%', 
                background: assignment.status === 'graded' ? 'rgba(16, 185, 129, 0.1)' 
                  : assignment.status === 'submitted' ? 'rgba(245, 158, 11, 0.1)'
                  : 'rgba(139, 92, 246, 0.1)',
                color: assignment.status === 'graded' ? 'var(--success)' 
                  : assignment.status === 'submitted' ? 'var(--warning)'
                  : 'var(--accent-primary)'
              }}>
                <FileText size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>{assignment.title}</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> Due: {assignment.due}</span>
                  <span>|</span>
                  <span>{assignment.course}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {assignment.status === 'pending' && (
                <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                  <Upload size={18} /> Submit Work
                </button>
              )}
              {assignment.status === 'submitted' && (
                <span className="badge badge-warning" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                  <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }}/>
                  Awaiting Review
                </span>
              )}
              {assignment.status === 'graded' && (
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16}/> Graded
                  </span>
                  <div style={{ marginTop: '0.5rem', fontWeight: 700, color: 'var(--success)' }}>Score: {assignment.score}</div>
                </div>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <p>No assignments found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignments;
