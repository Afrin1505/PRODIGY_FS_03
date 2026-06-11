import { useMemo, useState } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';

const categories = ['all', 'Groceries', 'Fruits', 'Vegetables', 'Dairy'];

function Products() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [status, setStatus] = useState('');

  const showStatus = (text) => {
    setStatus(text);
    window.setTimeout(() => setStatus(''), 2200);
  };

  const sortedProducts = useMemo(() => {
    const filtered = products.filter((product) => category === 'all' || product.category === category);
    const query = search.trim().toLowerCase();
    const result = filtered.filter((product) => (query ? product.name.toLowerCase().includes(query) : true));
    if (sort === 'low-high') return result.slice().sort((a, b) => a.price - b.price);
    if (sort === 'high-low') return result.slice().sort((a, b) => b.price - a.price);
    return result;
  }, [category, search, sort]);

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
    <div className="mx-auto max-w-7xl space-y-10 py-10">
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Browse our catalog</p>
          <h1 className="text-4xl font-semibold text-white">Shop all categories</h1>
          <p className="max-w-2xl text-slate-400">Find the perfect local grocery essentials for your home. Use filters, search, and quick actions for a fast shopping experience.</p>
        </div>
        <div className="rounded-[32px] bg-slate-900/90 p-6 shadow-glow">
          <label className="text-sm text-slate-400">Sort by</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-slate-100 outline-none">
            <option value="default">Recommended</option>
            <option value="low-high">Price Low to High</option>
            <option value="high-low">Price High to Low</option>
          </select>
          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300">Top categories</p>
            <CategoryFilter categories={categories} activeCategory={category} onSelect={setCategory} />
          </div>
        </div>
      </section>

      <SearchBar search={search} onChange={setSearch} onSearch={() => {}} />
      {status && <div className="rounded-3xl bg-emerald-500/10 p-4 text-emerald-200">{status}</div>}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {sortedProducts.length ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onWishlist={addToWishlist} onAddToCart={addToCart} />
          ))
        ) : (
          <div className="col-span-full rounded-[32px] bg-slate-900/90 p-10 text-center text-slate-400">No products match the selected filters.</div>
        )}
      </div>
    </div>
  );
}

export default Products;
