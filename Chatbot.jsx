import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow)', zIndex: 100, transition: 'var(--transition)' }}
        className="animate-fade-in"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={28} />
      </button>

      {isOpen && (
        <div className="card glass animate-fade-in" style={{ position: 'fixed', bottom: '6rem', right: '2rem', width: '380px', height: '550px', display: 'flex', flexDirection: 'column', zIndex: 100, padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-glow)' }}>
          <div style={{ padding: '1rem', background: 'var(--accent-gradient)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Nexus AI Assistant (Claude)</h3>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'white' }}><X size={20} /></button>
          </div>
          <div style={{ flex: 1, backgroundColor: 'var(--bg-primary)' }}>
            <iframe 
              src="https://use.ai/?model=claude&utm_match_type=e&utm_funnel=&partner=WM&id=YmluZ3xjcGN8V1ctRU4tVDItQWxsRGV2aWNlcy1TZWFyY2gtVXNlQUl8NTIzNDkxODMyfGNsYXVkZXx8fDEzMjYwMTM3NTU3NTI3OTZ8V1ctRU4tVDItQ2xhdWRlLUdlbmVyaWMtRXhhY3R8fHx8fHx8fHx8&url=https%3A%2F%2Fuse.ai%3Fmodel%3Dclaude&msclkid=0fff9d871ed9121da03af429415133f6"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="AI Assistant"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
