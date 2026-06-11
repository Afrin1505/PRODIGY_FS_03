import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Checkout() {
  const [shipping, setShipping] = useState('123 Local Street, City Market');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login before placing an order.');
        return;
      }
      const response = await api.post('/orders', { shippingAddress: shipping }, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess('Order placed successfully!');
      navigate('/confirmation', { state: { orderId: response.data._id, successMessage: 'Order placed successfully!' } });
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Unable to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl py-10">
      <div className="space-y-8 rounded-[32px] bg-slate-900/90 p-10 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Checkout</p>
          <h1 className="text-4xl font-semibold text-white">Secure your order</h1>
          <p className="text-slate-400">Complete payment and confirm your shipment details for the freshest local items.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-6">
            <label className="block text-sm font-medium text-slate-300">Shipping address</label>
            <textarea
              value={shipping}
              onChange={(event) => setShipping(event.target.value)}
              rows="4"
              className="mt-4 w-full rounded-3xl border border-slate-800 bg-slate-900 px-5 py-4 text-slate-100 outline-none focus:border-violet-500"
            />
          </div>
          <div className="rounded-[28px] bg-slate-950 p-6 text-slate-400">
            <p className="text-sm">Payment details are securely handled by our platform.</p>
          </div>
          {message && <div className="rounded-3xl bg-orange-500/10 p-4 text-orange-200">{message}</div>}
          {success && <div className="rounded-3xl bg-emerald-500/10 p-4 text-emerald-200">{success}</div>}
          <button disabled={loading} className="w-full rounded-3xl bg-gradient-to-r from-violet-500 to-orange-500 px-6 py-4 text-lg font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Processing...' : 'Place order'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
