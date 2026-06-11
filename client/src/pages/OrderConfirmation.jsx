import { useLocation, Link } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const successMessage = location.state?.successMessage || 'Your order has been placed successfully.';

  return (
    <div className="mx-auto max-w-4xl py-20 text-center">
      <div className="inline-flex max-w-3xl flex-col gap-6 rounded-[32px] bg-slate-900/90 p-14 shadow-glow">
        <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold text-violet-200">Order confirmed</span>
        <h1 className="text-4xl font-semibold text-white">Thank you for ordering with E-Kart!</h1>
        <p className="text-slate-400">{successMessage}</p>
        {orderId && <p className="rounded-3xl bg-slate-950 px-6 py-4 text-slate-300">Order reference: <span className="font-semibold text-white">{orderId}</span></p>}
        <Link to="/products" className="mx-auto rounded-3xl bg-gradient-to-r from-violet-500 to-orange-500 px-8 py-4 text-sm font-semibold text-white transition hover:brightness-110">Continue shopping</Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
