import { useState } from 'react';
import { PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function CourseViewer() {
  const { isEnrolled, playlist, completedVideos, markCompleted } = useUser();
  const [currentVideo, setCurrentVideo] = useState(playlist[0]);
  const navigate = useNavigate();

  if (!isEnrolled) {
    return (
      <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card glass" style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem' }}>
          <Lock size={64} color="var(--accent-secondary)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Premium Content</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            You need an active subscription to access video lectures and course materials.
          </p>
          <button className="btn-primary" onClick={() => navigate('/payments')}>View Plans to Enroll</button>
        </div>
      </div>
    );
  }

  const isCurrentCompleted = completedVideos.includes(currentVideo.id);

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1 className="page-title">Full Stack Masterclass</h1>
      <p className="page-subtitle">Module 1: Foundations of Programming and Web Development</p>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="video-container">
            <iframe 
              src={`https://www.youtube.com/embed/${currentVideo.ytId}?autoplay=0`} 
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </div>
          <div className="card glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>{currentVideo.title}</h2>
              {isCurrentCompleted && <span className="badge badge-success">Completed</span>}
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              In this lesson created by <strong>{currentVideo.channel}</strong>, we will explore fundamental concepts and see how to apply them.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary">Download Notes</button>
              <button 
                className={isCurrentCompleted ? "btn-secondary" : "btn-primary"} 
                onClick={() => markCompleted(currentVideo.id)}
                disabled={isCurrentCompleted}
              >
                {isCurrentCompleted ? 'Marked as Completed' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Course Content</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {playlist.map((video) => {
              const isVidCompleted = completedVideos.includes(video.id);
              return (
              <div 
                key={video.id} 
                onClick={() => setCurrentVideo(video)}
                style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  background: currentVideo.id === video.id ? 'var(--bg-tertiary)' : 'transparent',
                  cursor: 'pointer',
                  border: currentVideo.id === video.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ color: isVidCompleted ? 'var(--success)' : 'var(--text-secondary)' }}>
                  {isVidCompleted ? <CheckCircle size={24} /> : <PlayCircle size={24} />}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 600, color: currentVideo.id === video.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {video.id}. {video.title}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {video.duration}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseViewer;
