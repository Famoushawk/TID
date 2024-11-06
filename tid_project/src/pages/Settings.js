import React, { useState, useEffect } from 'react';
import Parse from 'parse';

const Settings = () => {
  const [user, setUser] = useState({
    username: '',
    email: ''
  });
  const [newPassword, setNewPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type can be 'success' or 'error'

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        setUser({
          username: currentUser.get('username'),
          email: currentUser.get('email') || '',
        });
      }
    };

    getCurrentUser();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const currentUser = Parse.User.current();
      if (currentUser) {
        currentUser.set('email', user.email);
        await currentUser.save();
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
      }
    } catch (error) {
      setMessage({ text: error.message || 'Error updating profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (newPassword.new !== newPassword.confirm) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const currentUser = Parse.User.current();
      if (currentUser) {
        await Parse.User.logIn(user.username, newPassword.current);
        currentUser.setPassword(newPassword.new);
        await currentUser.save();
        setMessage({ text: 'Password changed successfully!', type: 'success' });
        setNewPassword({ current: '', new: '', confirm: '' });
      }
    } catch (error) {
      setMessage({ text: error.message || 'Error changing password', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Settings</h1>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-gray-100"
              value={user.username}
              disabled
            />
            <p className="text-sm text-gray-500 mt-1">Username cannot be changed</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-black px-4 py-2 rounded hover:bg-secondary disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={newPassword.current}
              onChange={(e) => setNewPassword({ ...newPassword, current: e.target.value })}
              disabled={loading}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={newPassword.new}
              onChange={(e) => setNewPassword({ ...newPassword, new: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={newPassword.confirm}
              onChange={(e) => setNewPassword({ ...newPassword, confirm: e.target.value })}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-black px-4 py-2 rounded hover:bg-secondary disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;