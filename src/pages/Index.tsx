
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect based on user role
    if (user) {
      navigate(user.role === 'student' ? '/student' : '/admin');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);
  
  return null; // This component only handles redirection
};

export default Index;
