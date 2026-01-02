import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F3F5F7' }}>
        <div className="w-full max-w-md p-8" style={{ backgroundColor: '#ffffff' }}>
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2" style={{ color: '#1b315b' }}>
              Admin Login
            </h1>
            <p className="text-sm" style={{ color: '#1b315b' }}>
              Sign in to manage content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: '#1b315b' }}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@isii.com"
                style={{ borderColor: '#1b315b' }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" style={{ color: '#1b315b' }}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{ borderColor: '#1b315b' }}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              style={{ backgroundColor: '#1b315b', color: '#ffffff' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

