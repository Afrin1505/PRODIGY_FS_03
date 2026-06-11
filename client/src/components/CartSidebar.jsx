import { Link } from 'react-router-dom';

function CartSidebar({ cart, onQuantityChange, onRemove }) {
  const total = cart.reduce((sum, item) => {
    const product = item.product || item;
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <aside className="space-y-6 rounded-[32px] bg-slate-900/90 p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-sm text-violet-200">{cart.length} items</span>
      </div>
      <div className="space-y-4">
        {cart.map((item) => {
          const product = item.product || item;
          const productId = product.id || product._id;
          return (
            <div key={productId} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="h-20 w-20 rounded-3xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">₹{product.price} x {item.quantity}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                    <button onClick={() => onQuantityChange(productId, item.quantity - 1)} className="rounded-full bg-slate-800 px-3 py-1">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onQuantityChange(productId, item.quantity + 1)} className="rounded-full bg-slate-800 px-3 py-1">+</button>
                  </div>
                </div>
              </div>
              <button onClick={() => onRemove(productId)} className="mt-4 text-sm text-orange-400 transition hover:text-orange-300">Remove</button>
            </div>
          );
        })}
      </div>
      <div className="rounded-3xl bg-slate-950 p-5">
        <div className="flex items-center justify-between text-sm text-slate-400">Subtotal</div>
        <div className="mt-3 text-2xl font-semibold text-white">₹{total.toFixed(2)}</div>
        <Link to="/checkout" className="mt-5 inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-orange-500 px-5 py-4 text-sm font-semibold text-white transition hover:brightness-110">
          Checkout
        </Link>
      </div>
    </aside>
  );
}

export default CartSidebar;
