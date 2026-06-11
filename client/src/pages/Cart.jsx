import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartSidebar from '../components/CartSidebar';
import LoadingSpinner from '../components/LoadingSpinner';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = () => {
    setLoading(true);
    const stored = localStorage.getItem('cart');
    setCart(stored ? JSON.parse(stored) : []);
    setLoading(false);
  };

  const updateQuantity = (productId, quantity) => {
    const stored = localStorage.getItem('cart');
    const cartItems = stored ? JSON.parse(stored) : [];
    const next = cartItems.map((item) => {
      const id = item.product?.id || item.product?._id || item.id || item._id;
      if (id === productId) {
        return { ...item, quantity }; 
      }
      return item;
    }).filter((item) => item.quantity > 0);
    localStorage.setItem('cart', JSON.stringify(next));
    setCart(next);
  };

  const removeItem = (productId) => {
    const stored = localStorage.getItem('cart');
    const cartItems = stored ? JSON.parse(stored) : [];
    const next = cartItems.filter((item) => {
      const id = item.product?.id || item.product?._id || item.id || item._id;
      return id !== productId;
    });
    localStorage.setItem('cart', JSON.stringify(next));
    setCart(next);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="mx-auto max-w-7xl py-10">
      <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-[32px] bg-slate-900/90 p-8 shadow-glow">
          <h1 className="text-3xl font-semibold text-white">Your Shopping Cart</h1>
          <p className="mt-3 text-slate-400">Review the items you’ve selected before checkout.</p>
          {loading ? (
            <LoadingSpinner />
          ) : !cart.length ? (
            <div className="mt-10 rounded-[28px] bg-slate-950/70 p-10 text-center text-slate-400">
              Your cart is empty.
              <Link to="/products" className="mt-4 inline-block rounded-3xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">Shop products</Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {cart.map((item) => {
                const product = item.product || item;
                const productId = product.id || product._id;
                return (
                  <div key={productId} className="rounded-[28px] border border-slate-800 bg-slate-950 p-5">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <img src={product.image} alt={product.name} className="h-28 w-28 rounded-3xl object-cover" />
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                        <p className="mt-2 text-slate-400">₹{product.price} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(productId, item.quantity - 1)} className="rounded-full bg-slate-800 px-4 py-2">-</button>
                        <span className="text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(productId, item.quantity + 1)} className="rounded-full bg-slate-800 px-4 py-2">+</button>
                      </div>
                      <button onClick={() => removeItem(productId)} className="rounded-3xl bg-orange-500/15 px-5 py-3 text-sm text-orange-300 transition hover:bg-orange-500/25">Remove</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <CartSidebar cart={cart} onQuantityChange={updateQuantity} onRemove={removeItem} />
      </div>
    </div>
  );
}

export default Cart;
