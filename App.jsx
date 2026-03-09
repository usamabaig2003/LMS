import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CheckSquare, CreditCard, PlayCircle, Search, Menu, Bell, LogOut, User } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import CourseViewer from './pages/CourseViewer';
import Assignments from './pages/Assignments';
import Quiz from './pages/Quiz';
import Payments from './pages/Payments';
import Login from './pages/Login';
import { UserProvider, useUser } from './context/UserContext';
import Chatbot from './components/Chatbot';

function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/course', name: 'My Courses', icon: <PlayCircle size={20} /> },
    { path: '/assignments', name: 'Assignments', icon: <BookOpen size={20} /> },
    { path: '/quiz', name: 'Quizzes', icon: <CheckSquare size={20} /> },
    { path: '/payments', name: 'Payments', icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon"><BookOpen size={28} /></div>
        <span>Nexus LMS</span>
      </div>
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function Topbar() {
  const { user, setIsLoggedIn, setUser, setIsEnrolled } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsEnrolled(false);
  };
  
  return (
    <div className="topbar">
      <div className="search-bar">
        <Search className="search-icon" />
        <input type="text" placeholder="Search courses, assignments..." />
      </div>
      <div className="user-profile" style={{ position: 'relative' }}>
        {user?.name && <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</span>}
        <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Bell size={20} />
        </button>
        <img 
          src={`https://ui-avatars.com/api/?name=${user?.name || 'Student'}&background=8B5CF6&color=fff`} 
          alt="Profile" 
          className="profile-img" 
          style={{ cursor: 'pointer' }}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        
        {menuOpen && (
          <div className="card glass animate-fade-in" style={{ position: 'absolute', top: '120%', right: '0', padding: '0.5rem', width: '200px', zIndex: 1000 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
              <User size={16} />
              <span style={{ fontSize: '0.875rem' }}>My Profile</span>
            </div>
            <button 
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', width: '100%', textAlign: 'left', color: 'var(--danger)', borderRadius: 'var(--radius-md)', transition: 'var(--transition)', background: 'transparent', cursor: 'pointer' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={16} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MainLayout() {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/course" element={<CourseViewer />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <MainLayout />
      </Router>
    </UserProvider>
  );
}

export default App;
