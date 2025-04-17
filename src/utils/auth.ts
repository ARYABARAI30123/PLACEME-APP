
// This is a mock authentication service
// In a real application, this would connect to a backend service

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Mock users for demo purposes
const MOCK_USERS = {
  student: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'student' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=098577&color=fff'
  },
  admin: {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=2E8B57&color=fff'
  }
};

// Mock login function
export const login = (email: string, password: string, role: UserRole): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Simple validation for demo
      if (email && password && (role === 'student' || role === 'admin')) {
        resolve(MOCK_USERS[role]);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

// Store user in session storage
export const setUser = (user: User) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

// Get user from session storage
export const getUser = (): User | null => {
  const userStr = sessionStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as User;
  } catch (e) {
    console.error('Failed to parse user from session storage', e);
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return getUser() !== null;
};

// Logout user
export const logout = () => {
  sessionStorage.removeItem('user');
};
