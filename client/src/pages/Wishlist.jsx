import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    setItems(stored ? JSON.parse(stored) : []);
  }, []);

  const removeItem = (id) => {
    const next = items.filter((item) => item._id !== id);
    setItems(next);
    localStorage.setItem('wishlist', JSON.stringify(next));
  };

  return (
    <div className="mx-auto max-w-7xl py-10">
      <div className="rounded-[32px] bg-slate-900/90 p-8 shadow-glow">
        <h1 className="text-3xl font-semibold text-white">Your Wishlist</h1>
        <p className="mt-2 text-slate-400">Save your favorite local products for later.</p>
        {!items.length ? (
          <div className="mt-10 rounded-[28px] bg-slate-950/80 p-10 text-center text-slate-400">
            No favorites yet.
            <Link to="/products" className="mt-4 inline-block rounded-3xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">Browse products</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div key={item._id} className="rounded-[28px] border border-slate-800 bg-slate-950 p-5">
                <img src={item.image} alt={item.name} className="h-52 w-full rounded-3xl object-cover" />
                <div className="mt-4 space-y-3">
                  <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                  <p className="text-slate-400">₹{item.price}</p>
                  <div className="flex items-center justify-between gap-4">
                    <button onClick={() => removeItem(item._id)} className="rounded-3xl bg-orange-500/10 px-4 py-2 text-sm text-orange-300 transition hover:bg-orange-500/15">Remove</button>
                    <Link to={`/product/${item._id}`} className="rounded-3xl bg-violet-500 px-4 py-2 text-sm text-white transition hover:brightness-110">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
