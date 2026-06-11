function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-3xl border px-5 py-4 text-left transition ${
            activeCategory === category ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-slate-800 bg-slate-900 text-slate-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
