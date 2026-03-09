import { CheckCircle2, Circle, Clock, Target, PlayCircle, Lock } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, isEnrolled, overallProgress, completedCount, hoursSpent, playlist } = useUser();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Welcome back, {user?.name || 'Student'}!</h1>
      <p className="page-subtitle">Here is what's happening with your learning journey.</p>
      
      {!isEnrolled ? (
        <>
          <div className="card glass" style={{ marginBottom: '2rem', border: '1px solid var(--accent-secondary)', background: 'rgba(236, 72, 153, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Lock size={24} color="var(--accent-secondary)" />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>You are not enrolled in any course yet!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Enroll today to unlock full access to all premium courses, assignments, and learning materials.</p>
              </div>
              <button className="btn-primary" onClick={() => navigate('/payments')}>View Plans to Enroll</button>
            </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Free Course Previews</h2>
          <div className="grid-2">
            {playlist.map((video) => (
              <div key={video.id} className="card glass" style={{ padding: '1rem' }}>
                <div className="video-container" style={{ marginBottom: '1rem', paddingBottom: '56.25%' }}>
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.ytId}?autoplay=0`} 
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.25rem' }}>{video.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>by {video.channel}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{video.duration}</span>
                  <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={() => navigate('/payments')}>
                    Enroll to Unlock Full Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid-3 mb-8" style={{ marginBottom: '2rem' }}>
            <div className="card glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--accent-primary)' }}>
                  <Target size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Overall Progress</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{overallProgress}%</div>
                </div>
              </div>
              <div className="progress-bg"><div className="progress-fill" style={{ width: `${overallProgress}%` }}></div></div>
            </div>

            <div className="card glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Completed Videos</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{completedCount}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--success)' }}>{completedCount > 0 ? '+1 this week' : 'Start learning today'}</p>
            </div>

            <div className="card glass">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hours Spent</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{hoursSpent}h</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--warning)' }}>{hoursSpent > 0 ? 'Keep it up!' : 'Time to focus!'}</p>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Continue Learning</h2>
              <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Code" style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{playlist[0].title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Up Next: {completedCount > 0 ? playlist[completedCount]?.title || 'Course Completed!' : 'Introduction'}</p>
                  <div className="progress-bg"><div className="progress-fill" style={{ width: `${overallProgress}%` }}></div></div>
                </div>
                <button className="btn-primary" style={{ padding: '0.5rem', alignSelf: 'center', borderRadius: '50%' }} onClick={() => navigate('/course')}>
                  <PlayCircle size={24} />
                </button>
              </div>
            </div>

            <div className="card">
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Upcoming Assignments</h2>
              <ul style={{ listStyle: 'none' }}>
                {['Build a REST API', 'React Context Quiz', 'Database Design Draft'].map((task, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: i !== 2 ? '1px solid var(--border-color)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Circle size={16} color="var(--text-secondary)" />
                      <span>{task}</span>
                    </div>
                    <span className={`badge ${i === 0 ? 'badge-danger' : 'badge-warning'}`}>{i === 0 ? 'Due Today' : 'Tomorrow'}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
