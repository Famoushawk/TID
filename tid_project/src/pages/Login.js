import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await Parse.User.logIn(credentials.username, credentials.password);
      const sessionToken = user.getSessionToken();
      localStorage.setItem('sessionToken', sessionToken);
      navigate('/frame1');
    } catch (error) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = new Parse.User();
      user.set("username", newUser.username);
      user.set("password", newUser.password);
      user.set("email", newUser.email);
      
      await user.signUp();
      const sessionToken = user.getSessionToken();
      localStorage.setItem('sessionToken', sessionToken);
      setShowModal(false);
      navigate('/frame1');
    } catch (error) {
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-black p-2 rounded hover:bg-secondary disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Not yet signed up?{' '}
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Create an account
          </button>
        </p>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSignUp} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                disabled={loading}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                disabled={loading}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                disabled={loading}
                required
              />
            </div>
            <DialogFooter>
              <div className="flex gap-2 w-full">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-black p-2 rounded hover:bg-secondary disabled:opacity-50 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Sign Up'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-black p-2 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;