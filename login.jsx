import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Phone, Lock } from 'lucide-react';

function Login() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('savedLoginData');
    return saved ? JSON.parse(saved) : { fullName: '', mobile: '', password: '' };
  });
  const { setIsLoggedIn, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.mobile && formData.password) {
      localStorage.setItem('savedLoginData', JSON.stringify(formData));
      setUser({ name: formData.fullName, mobile: formData.mobile });
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert("Please fill out all fields (Full Name, Password, and Mobile Number).");
    }
  };

  return (
    <div className="animate-fade-in app-container" style={{ justifyContent: 'center', alignItems: 'center', background: 'var(--bg-primary)' }}>
      <div className="card glass" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
            <BookOpen size={40} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Welcome to Nexus</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Login to access your learning dashboard.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Full Name" 
              style={{ width: '100%', paddingLeft: '2.75rem' }} 
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Phone size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Mobile Number" 
              style={{ width: '100%', paddingLeft: '2.75rem' }} 
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
            <input 
              type="password" 
              placeholder="Password" 
              style={{ width: '100%', paddingLeft: '2.75rem' }} 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.875rem' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
