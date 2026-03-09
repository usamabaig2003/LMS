import { useState } from 'react';
import { CreditCard, Check, ShieldCheck, Zap, X, Lock } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Payments() {
  const { isEnrolled, setIsEnrolled } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerPayment = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const processPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(false);
      setIsEnrolled(true);
      alert(`Payment successful! You are now enrolled in the ${selectedPlan.name} Plan!`);
      navigate('/course');
    }, 1500);
  };

  const plans = [
    {
      name: "Basic",
      price: "$19",
      period: "/month",
      features: ["Access to 10 Basic Courses", "Community Forum Access", "Email Support", "Monthly Webinars"],
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      features: ["Unlimited Course Access", "Mentorship Sessions", "Premium Support", "Certificate on Completion", "Offline Downloads"],
      popular: true
    },
    {
      name: "Lifetime",
      price: "$499",
      period: " once",
      features: ["All Pro Features", "Lifetime Access to All Future Content", "1-on-1 Code Reviews", "Career Guidance"],
      popular: false
    }
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Billing & Plans</h1>
      <p className="page-subtitle">Manage your subscription and view payment history.</p>

      {isEnrolled && (
        <div className="card glass" style={{ marginBottom: '2rem', border: '1px solid var(--success)', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ShieldCheck size={28} color="var(--success)" />
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--success)' }}>Active Subscription</h3>
            <p style={{ color: 'var(--text-secondary)' }}>You are currently enrolled. You can browse all premium course content.</p>
          </div>
        </div>
      )}

      <div className="grid-3" style={{ marginBottom: '4rem' }}>
        {plans.map((plan, index) => (
          <div key={index} className="card glass" style={{ position: 'relative', border: plan.popular ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)', transform: plan.popular ? 'scale(1.05)' : 'scale(1)', zIndex: plan.popular ? 10 : 1 }}>
            {plan.popular && (
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-gradient)', color: 'white', padding: '0.25rem 1rem', borderRadius: 'var(--radius-xl)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>
                MOST POPULAR
              </div>
            )}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>{plan.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{plan.price}</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: '0.25rem' }}>{plan.period}</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  <Check size={20} color="var(--success)" />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              className={plan.popular ? "btn-primary" : "btn-secondary"} 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => triggerPayment(plan)}
            >
              {plan.popular ? "Upgrade to Pro" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Payment History</h2>
      <div className="card glass" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Description</th>
              <th style={{ padding: '1rem' }}>Amount</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: 'Oct 15, 2025', desc: 'Pro Plan Subscription', amt: '$49.00', status: 'Paid' },
              { date: 'Sep 15, 2025', desc: 'Pro Plan Subscription', amt: '$49.00', status: 'Paid' },
              { date: 'Aug 15, 2025', desc: 'Basic Plan Subscription', amt: '$19.00', status: 'Paid' }
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: i !== 2 ? '1px solid var(--border-color)' : 'none' }}>
                <td style={{ padding: '1rem' }}>{row.date}</td>
                <td style={{ padding: '1rem', color: 'white' }}>{row.desc}</td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{row.amt}</td>
                <td style={{ padding: '1rem' }}><span className="badge badge-success">{row.status}</span></td>
                <td style={{ padding: '1rem' }}>
                  <button style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
          <div className="card glass animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '2rem', position: 'relative', background: '#ffffff', color: '#333' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#666' }}><X size={24}/></button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#0d2871' }}>
              <Zap size={28} fill="#0d2871" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Razorpay</h2>
            </div>

            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>Purchasing <strong>{selectedPlan.name} Plan</strong></p>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#333', marginTop: '0.5rem' }}>{selectedPlan.price}</h3>
            </div>

            <form onSubmit={processPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', color: '#666', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Card Information</label>
                <div style={{ border: '1px solid #ddd', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid #ddd', background: '#fff' }}>
                    <CreditCard size={20} color="#999" style={{ marginRight: '0.75rem' }} />
                    <input type="text" placeholder="Card number" required style={{ width: '100%', border: 'none', background: 'transparent', color: '#333', padding: 0 }} />
                  </div>
                  <div style={{ display: 'flex', background: '#fff' }}>
                    <input type="text" placeholder="MM / YY" required style={{ width: '50%', border: 'none', borderRight: '1px solid #ddd', background: 'transparent', color: '#333', padding: '0.75rem 1rem', borderRadius: 0 }} />
                    <input type="text" placeholder="CVC" required style={{ width: '50%', border: 'none', background: 'transparent', color: '#333', padding: '0.75rem 1rem', borderRadius: 0 }} />
                  </div>
                </div>
              </div>
              <button 
                type="submit" 
                style={{ width: '100%', padding: '1rem', background: '#2B84EA', color: '#fff', fontWeight: 700, borderRadius: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', transition: 'all 0.2s', opacity: isProcessing ? 0.7 : 1 }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <><Lock size={18} /> Processing...</>
                ) : (
                  <><Lock size={18} /> Pay {selectedPlan.price}</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
