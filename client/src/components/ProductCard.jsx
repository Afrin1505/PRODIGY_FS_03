import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import placeholder from '../assets/images/placeholder.jpg';

function ProductCard({ product, onWishlist, onAddToCart }) {
  const productId = product._id || product.id;
  const imageSrc = product.image || placeholder;

  return (
    <article className="group relative overflow-hidden rounded-[28px] bg-slate-900/80 p-5 shadow-glow transition hover:-translate-y-1 hover:bg-slate-900">
      <button
        type="button"
        onClick={() => onWishlist && onWishlist(product)}
        className="absolute right-5 top-5 z-10 rounded-full bg-slate-950/80 p-3 text-slate-200 transition hover:bg-violet-500/90"
      >
        <FiHeart />
      </button>
      <Link to={`/product/${productId}`} className="block overflow-hidden rounded-3xl bg-slate-950">
        <img src={imageSrc} alt={product.name} className="h-52 w-full rounded-3xl object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="mt-5 space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-300">{product.category}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xl font-semibold text-orange-400">₹{product.price}</span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{product.rating}★</span>
        </div>
        <button onClick={() => onAddToCart && onAddToCart(product)} className="w-full rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
