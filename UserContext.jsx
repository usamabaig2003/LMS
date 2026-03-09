import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn');
    return saved ? JSON.parse(saved) : false;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isEnrolled, setIsEnrolled] = useState(() => {
    const saved = localStorage.getItem('isEnrolled');
    return saved ? JSON.parse(saved) : false;
  });
  
  // Progress tracking
  const [completedVideos, setCompletedVideos] = useState(() => {
    const saved = localStorage.getItem('completedVideos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('isEnrolled', JSON.stringify(isEnrolled));
  }, [isEnrolled]);

  useEffect(() => {
    localStorage.setItem('completedVideos', JSON.stringify(completedVideos));
  }, [completedVideos]);
  
  // Example playlist with the requested videos
  const playlist = [
    { id: 1, title: 'C Language Tutorial for Beginners', ytId: 'irqbmMNs2Bo', duration: '4:20:00', channel: 'ProgrammingKnowledge' },
    { id: 2, title: 'Machine Learning Full Course', ytId: '6i3EGqOBRiU', duration: '10:00:00', channel: 'Edureka' },
    { id: 3, title: 'Java Tutorial for Beginners', ytId: 'u8JZ9gU5o4g', duration: '2:30:00', channel: 'Programming with Mosh' },
    { id: 4, title: 'React JS Crash Course', ytId: 'w7ejDZ8SWv8', duration: '1:48:00', channel: 'Traversy Media' }
  ];

  const overallProgress = completedVideos.length === 0 ? 0 : Math.round((completedVideos.length / playlist.length) * 100);
  const completedCount = completedVideos.length;
  // Mocking hours spent based on completed videos
  const hoursSpent = completedVideos.length * 2; 

  const markCompleted = (id) => {
    if (!completedVideos.includes(id)) {
      setCompletedVideos([...completedVideos, id]);
    }
  };

  return (
    <UserContext.Provider value={{ 
      isLoggedIn, setIsLoggedIn, 
      user, setUser, 
      isEnrolled, setIsEnrolled,
      completedVideos, markCompleted,
      overallProgress, completedCount, hoursSpent,
      playlist
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
