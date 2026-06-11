import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/', { state: { successMessage: 'Account created successfully!' } });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        (error.request ? 'Unable to reach the server. Please try again later.' : 'Unable to create account')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-20">
      <div className="rounded-[32px] bg-slate-900/90 p-10 shadow-glow">
        <h1 className="text-3xl font-semibold text-white">Create your account</h1>
        <p className="mt-3 text-slate-400">Sign up to save favorites, track orders, and checkout faster.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-sm font-medium text-slate-300">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-5 py-4 text-slate-100 outline-none focus:border-violet-500" />
          <label className="block text-sm font-medium text-slate-300">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-5 py-4 text-slate-100 outline-none focus:border-violet-500" />
          <label className="block text-sm font-medium text-slate-300">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-5 py-4 text-slate-100 outline-none focus:border-violet-500" />
          {error && <div className="rounded-3xl bg-orange-500/10 p-4 text-orange-200">{error}</div>}
          <button disabled={loading} className="w-full rounded-3xl bg-gradient-to-r from-violet-500 to-orange-500 px-6 py-4 text-white transition hover:brightness-110 disabled:opacity-70">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-white underline decoration-violet-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
