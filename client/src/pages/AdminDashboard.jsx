import { useEffect, useState } from 'react';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('/admin/stats', { headers: { Authorization: `Bearer ${token}` } });
      setStats(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Admin access required or invalid token.');
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    try {
      setMessage('');
      const token = localStorage.getItem('token');
      await api.post('/admin/seed', {}, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Sample data seeded successfully. Reloading stats...');
      loadStats();
    } catch (error) {
      console.error(error);
      setMessage('Unable to seed data. Admin login required.');
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="mx-auto max-w-6xl py-10">
      <div className="rounded-[32px] bg-slate-900/90 p-8 shadow-glow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Admin dashboard</p>
            <h1 className="text-4xl font-semibold text-white">Operational metrics</h1>
          </div>
          <button onClick={seedData} className="rounded-3xl bg-gradient-to-r from-violet-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">Seed sample data</button>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : stats ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[28px] bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Total users</p>
              <p className="mt-4 text-3xl font-semibold text-white">{stats.users}</p>
            </div>
            <div className="rounded-[28px] bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Products available</p>
              <p className="mt-4 text-3xl font-semibold text-white">{stats.products}</p>
            </div>
            <div className="rounded-[28px] bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Orders processed</p>
              <p className="mt-4 text-3xl font-semibold text-white">{stats.orders}</p>
            </div>
            <div className="rounded-[28px] bg-slate-950 p-6">
              <p className="text-sm text-slate-400">Total revenue</p>
              <p className="mt-4 text-3xl font-semibold text-white">₹{stats.revenue.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-[28px] bg-slate-950 p-8 text-slate-400">Login with an admin account to view the dashboard.</div>
        )}
        {message && <div className="mt-8 rounded-3xl bg-orange-500/10 p-4 text-orange-200">{message}</div>}
      </div>
    </div>
  );
}

export default AdminDashboard;
