//USER KA LOGIN STATUS MANAGE KRTA HAIN . LOGIN/LOGOUT FUNCTION MANAGE KRTA HAIN.TOKEN STORE KRTA 
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserProfile {
  _id?: string;
  userId?: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  major?: string;
  year?: string;
  interests?: string[];
  bio?: string;
  createdAt?: number | Date;
  password?: string;
}

interface AuthContextType {
  user: { uid: string; email: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<UserProfile, 'userId' | 'createdAt'> & { major?: string }) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  resetDatabase: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  deleteAccount: async () => {},
  resetDatabase: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ uid: string; email: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load state from localStorage on init
    const savedUser = localStorage.getItem('nexus_user');
    const savedProfile = localStorage.getItem('nexus_profile');

    if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser));
      setProfile(JSON.parse(savedProfile));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    const { user: profileData, token } = data;
    const userId = profileData._id || profileData.userId;
    const userData = { uid: userId, email: profileData.email };

    // Ensure profile has all necessary fields
    const profileWithDefaults: UserProfile = {
      ...profileData,
      _id: userId,
      userId: userId,
      role: (profileData.role?.toLowerCase() || 'student') as 'student' | 'faculty' | 'admin',
      major: profileData.major || 'Undecided',
      year: profileData.year || '1st',
      interests: profileData.interests || [],
    };

    setUser(userData);
    setProfile(profileWithDefaults);
    localStorage.setItem('nexus_token', token);
    localStorage.setItem('nexus_user', JSON.stringify(userData));
    localStorage.setItem('nexus_profile', JSON.stringify(profileWithDefaults));
  };

  const signup = async (data: Omit<UserProfile, 'userId' | 'createdAt'> & { major?: string }) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        major: data.major || 'Undecided'
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Signup failed');
    }

    const { user: profileData, token } = result;
    const userId = profileData._id || profileData.userId;
    const userData = { uid: userId, email: profileData.email };
    
    // Ensure profile has all necessary fields
    const profileWithDefaults: UserProfile = {
      ...profileData,
      _id: userId,
      userId: userId,
      role: (profileData.role?.toLowerCase() || 'student') as 'student' | 'faculty' | 'admin',
      major: profileData.major || 'Undecided',
      year: profileData.year || '1st',
      interests: profileData.interests || [],
    };

    setUser(userData);
    setProfile(profileWithDefaults);
    localStorage.setItem('nexus_token', token);
    localStorage.setItem('nexus_user', JSON.stringify(userData));
    localStorage.setItem('nexus_profile', JSON.stringify(profileWithDefaults));
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('nexus_token');
    localStorage.removeItem('nexus_user');
    localStorage.removeItem('nexus_profile');
  };

  const resetDatabase = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const deleteAccount = async () => {
    if (!user) return;
    const users: UserProfile[] = JSON.parse(localStorage.getItem('nexus_db_users') || '[]');
    const filteredUsers = users.filter(u => (u._id || u.userId) !== user.uid);
    localStorage.setItem('nexus_db_users', JSON.stringify(filteredUsers));
    logout();
  };

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin' || profile?.role === 'faculty',
    login,
    signup,
    logout,
    deleteAccount,
    resetDatabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
