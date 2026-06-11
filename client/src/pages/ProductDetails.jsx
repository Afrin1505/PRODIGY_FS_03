import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const showStatus = (text) => {
    setStatus(text);
    window.setTimeout(() => setStatus(''), 2200);
  };

  const product = useMemo(() => products.find((item) => String(item.id) === String(id)), [id]);

  const addToWishlist = (item) => {
    const stored = localStorage.getItem('wishlist');
    const list = stored ? JSON.parse(stored) : [];
    const next = list.find((entry) => entry.id === item.id) ? list : [...list, item];
    localStorage.setItem('wishlist', JSON.stringify(next));
    showStatus('Added to wishlist');
  };

  const addToCart = (item) => {
    const stored = localStorage.getItem('cart');
    const cart = stored ? JSON.parse(stored) : [];
    const index = cart.findIndex((entry) => entry.id === item.id);
    if (index >= 0) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showStatus('Added to cart');
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="py-20 text-center text-slate-400">Product not found.</div>;

  const description = product.description || 'Discover fresh local delivery with top-quality produce and pantry staples.';
  const stock = product.stock ?? 20;

  return (
    <div className="mx-auto max-w-6xl py-12">
      {status && <div className="mb-6 rounded-3xl bg-emerald-500/10 p-4 text-emerald-200">{status}</div>}
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
        <div className="rounded-[32px] bg-slate-900/90 p-6 shadow-glow">
          <img src={product.image} alt={product.name} className="w-full rounded-[28px] object-cover" />
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-violet-300">{product.category}</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">{product.name}</h1>
              </div>
              <span className="rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">{product.rating}★</span>
            </div>
            <p className="text-2xl font-semibold text-white">₹{product.price}</p>
            <p className="text-slate-400">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => addToCart(product)} className="rounded-3xl bg-gradient-to-r from-violet-500 to-orange-500 px-7 py-4 font-semibold text-white transition hover:brightness-110">Add to Cart</button>
              <button onClick={() => addToWishlist(product)} className="rounded-3xl border border-slate-700 px-7 py-4 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">Add to Wishlist</button>
              <Link to="/checkout" className="rounded-3xl border border-slate-700 px-7 py-4 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">Buy Now</Link>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[32px] bg-slate-900/90 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">Product details</h2>
            <ul className="mt-6 space-y-4 text-slate-400">
              <li>Category: {product.category}</li>
              <li>Stock: {stock} pieces</li>
              <li>Fast local delivery</li>
            </ul>
          </div>
          <div className="rounded-[32px] bg-slate-900/90 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white">Customer reviews</h2>
            {product.reviews?.length ? (
              <div className="mt-4 space-y-4">
                {product.reviews.map((review) => (
                  <div key={review._id} className="rounded-3xl border border-slate-800 p-4 text-slate-300">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{review.user?.name || 'Customer'}</p>
                      <span className="text-sm text-orange-300">{review.rating}★</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-slate-400">No reviews for this product yet.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ProductDetails;
