function SearchBar({ search, onChange, onSearch }) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] bg-slate-900/80 p-5 shadow-glow sm:flex-row sm:items-center">
      <input
        type="text"
        value={search}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && onSearch()}
        placeholder="Search products by name"
        className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-5 py-4 text-slate-100 outline-none transition focus:border-violet-500"
      />
      <button onClick={onSearch} className="rounded-3xl bg-gradient-to-r from-violet-500 to-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
