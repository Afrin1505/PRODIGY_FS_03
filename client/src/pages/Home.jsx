import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';

const categories = ['all', 'Groceries', 'Fruits', 'Vegetables', 'Dairy'];

function Home() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setStatus(location.state.successMessage);
      window.history.replaceState({}, document.title);
      window.setTimeout(() => setStatus(''), 2200);
    }
  }, [location.state]);
  const [status, setStatus] = useState('');

  const showStatus = (text) => {
    setStatus(text);
    window.setTimeout(() => setStatus(''), 2200);
  };

  const displayedProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => (query ? product.name.toLowerCase().includes(query) : true))
      .slice(0, 8);
  }, [category, search]);

  const addToWishlist = (product) => {
    const stored = localStorage.getItem('wishlist');
    const list = stored ? JSON.parse(stored) : [];
    const next = list.find((item) => item.id === product.id) ? list : [...list, product];
    localStorage.setItem('wishlist', JSON.stringify(next));
    showStatus('Added to wishlist');
  };

  const addToCart = (product) => {
    const stored = localStorage.getItem('cart');
    const cart = stored ? JSON.parse(stored) : [];
    const index = cart.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showStatus('Added to cart');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-16 py-10">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-semibold text-violet-200">E-Kart Premium</span>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-6xl">Shop Local, Support Local — Fresh groceries delivered instantly.</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">Browse the finest selection of local fruits, vegetables, dairy and pantry essentials. Powered by modern design and a smooth shopping experience.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="rounded-full bg-gradient-to-r from-violet-500 to-orange-500 px-8 py-4 text-base font-semibold text-white transition hover:brightness-110">Explore Products</Link>
            <Link to="/wishlist" className="rounded-full border border-slate-700 px-8 py-4 text-base font-semibold text-slate-200 transition hover:bg-slate-900">View Wishlist</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[32px] bg-slate-900/90 p-6 shadow-glow">
              <p className="text-slate-400">Secure checkout</p>
              <p className="mt-2 text-lg font-semibold text-white">15+ payment methods</p>
            </div>
            <div className="rounded-[32px] bg-slate-900/90 p-6 shadow-glow">
              <p className="text-slate-400">Freshness guarantee</p>
              <p className="mt-2 text-lg font-semibold text-white">Local produce curated daily</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-slate-900/90 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Featured Picks</p>
          <div className="mt-8 space-y-6">
            <div className="rounded-[28px] bg-gradient-to-br from-slate-950 to-slate-900 p-6">
              <h2 className="text-2xl font-semibold text-white">Groceries trending now</h2>
              <p className="mt-3 text-slate-400">Quality pantry essentials sourced from trusted local vendors with fast delivery.</p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[28px] bg-slate-950 p-5 text-slate-300">Free delivery on orders above ₹799</div>
              <div className="rounded-[28px] bg-slate-950 p-5 text-slate-300">Trusted local vendors and authentic products</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        {status && <div className="rounded-3xl bg-emerald-500/10 p-4 text-emerald-200">{status}</div>}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Popular categories</h2>
            <p className="mt-2 text-slate-400">Filter the best products from local inventories.</p>
          </div>
          <SearchBar search={search} onChange={setSearch} onSearch={() => {}} />
        </div>

        <CategoryFilter categories={categories} activeCategory={category} onSelect={setCategory} />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {displayedProducts.length ? (
            displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onWishlist={addToWishlist} onAddToCart={addToCart} />
            ))
          ) : (
            <div className="col-span-full rounded-[32px] bg-slate-900/90 p-10 text-center text-slate-400">No products found for your search.</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
