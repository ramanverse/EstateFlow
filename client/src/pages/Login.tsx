import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Button } from '../new-src/app/components/ui/button';
import { Input } from '../new-src/app/components/ui/input';
import { Label } from '../new-src/app/components/ui/label';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result && result.success) {
      navigate('/dashboard');
    } else {
      setError(result?.error || 'Login failed');
    }

    setLoading(false);
  };

  const handleDemoLogin = async (role: 'user' | 'agent' | 'admin') => {
    setError('');
    setLoading(true);
    let email = 'user@example.com';
    if (role === 'agent') {
      email = 'agent@example.com';
    } else if (role === 'admin') {
      email = 'admin@example.com';
    }
    const password = 'password123';

    // Visual autofill
    setFormData({ email, password });

    const result = await login(email, password);

    if (result && result.success) {
      navigate('/dashboard');
    } else {
      setError(result?.error || 'Demo login failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 flex items-center justify-center">
      <Helmet>
        <title>Login | EstateFlow</title>
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Login</h1>
          <p className="text-gray-500">Welcome back! Please login to your account.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or login as Demo User</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              disabled={loading}
              className="flex flex-col items-center justify-center p-2 border border-gray-200 hover:border-black rounded-xl bg-gray-50 hover:bg-black hover:text-white transition-all text-xs font-semibold group cursor-pointer"
            >
              <span className="text-lg mb-0.5 group-hover:scale-110 transition-transform">👤</span>
              <span>Buyer</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('agent')}
              disabled={loading}
              className="flex flex-col items-center justify-center p-2 border border-gray-200 hover:border-black rounded-xl bg-gray-50 hover:bg-black hover:text-white transition-all text-xs font-semibold group cursor-pointer"
            >
              <span className="text-lg mb-0.5 group-hover:scale-110 transition-transform">💼</span>
              <span>Agent</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              className="flex flex-col items-center justify-center p-2 border border-gray-200 hover:border-black rounded-xl bg-gray-50 hover:bg-black hover:text-white transition-all text-xs font-semibold group cursor-pointer"
            >
              <span className="text-lg mb-0.5 group-hover:scale-110 transition-transform">👑</span>
              <span>Admin</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-black font-semibold hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
