import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Wishlist', path: '/wishlist' }
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-glow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-orange-500 text-xl font-bold shadow-lg shadow-violet-500/20">EK</span>
          <div>
            <p className="text-lg font-semibold">E-Kart</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.label} to={link.path} className="text-sm font-medium text-slate-300 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-sm text-white transition hover:bg-slate-800">
            <FiShoppingCart /> Cart
          </Link>
          <Link to="/login" className="hidden rounded-full bg-slate-900/90 px-4 py-2 text-sm text-white transition hover:bg-slate-800 md:inline-flex">
            <FiUser /> Login
          </Link>
          <button onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-white md:hidden">
            <FiHeart />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
