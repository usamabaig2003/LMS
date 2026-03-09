import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const quizQuestions = [
  {
    question: "What hook should you use to fetch data when a component mounts?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    correct: 0
  },
  {
    question: "Which of the following is NOT a rule of React Hooks?",
    options: [
      "Only call Hooks at the top level",
      "Only call Hooks from React function components",
      "Only call Hooks inside loops or conditions",
      "Hooks can be called from custom Hooks"
    ],
    correct: 2
  },
  {
    question: "What does useState return?",
    options: [
      "An object with the state value and a setter function",
      "An array with the state value and a setter function",
      "Just the state value",
      "A boolean indicating if state changed"
    ],
    correct: 1
  }
];

function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selected === quizQuestions[currentQ].correct) {
      setScore(score + 1);
    }
    
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    return (
      <div className="animate-fade-in" style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card glass" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '3rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            {score === quizQuestions.length ? (
              <CheckCircle2 size={80} color="var(--success)" style={{ margin: '0 auto' }} />
            ) : (
              <CheckCircle2 size={80} color="var(--accent-primary)" style={{ margin: '0 auto' }} />
            )}
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Quiz Completed!</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            You scored {score} out of {quizQuestions.length}.
          </p>
          <div className="progress-bg" style={{ height: '12px', marginBottom: '2rem' }}>
            <div className="progress-fill" style={{ width: `${(score / quizQuestions.length) * 100}%` }}></div>
          </div>
          <button className="btn-primary" onClick={restart}>Retake Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">React Fundamentals Quiz</h1>
      <p className="page-subtitle">Module 4 - Test your knowledge before moving on to the final project.</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>Question {currentQ + 1} of {quizQuestions.length}</div>
        <div style={{ color: 'var(--text-secondary)' }}>Score: {score}</div>
      </div>
      <div className="progress-bg" style={{ marginBottom: '3rem', height: '6px' }}>
        <div className="progress-fill" style={{ width: `${((currentQ) / quizQuestions.length) * 100}%` }}></div>
      </div>

      <div className="card glass" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{quizQuestions[currentQ].question}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {quizQuestions[currentQ].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              style={{
                width: '100%',
                padding: '1.25rem',
                textAlign: 'left',
                borderRadius: 'var(--radius-md)',
                border: selected === idx ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                background: selected === idx ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                transition: 'var(--transition)'
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'right' }}>
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={selected === null}
            style={{ opacity: selected === null ? 0.5 : 1, cursor: selected === null ? 'not-allowed' : 'pointer' }}
          >
            {currentQ === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
