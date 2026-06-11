import { FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 py-10 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 lg:grid-cols-3">
        <div>
          <p className="text-xl font-semibold text-white">E-Kart</p>
          <p className="mt-4 max-w-md leading-7 text-slate-400">A polished marketplace for local groceries, fruits, vegetables, dairy, and curated daily essentials.</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p className="flex items-center gap-2"><FiMail /> support@ekart.com</p>
            <p className="flex items-center gap-2"><FiMapPin /> 123 Local Street, City Market</p>
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Follow</p>
          <div className="mt-4 flex flex-wrap gap-3 text-slate-400">
            <a href="#" className="rounded-2xl bg-slate-900/80 px-4 py-3 transition hover:bg-slate-800"><FiInstagram className="inline-block" /> Instagram</a>
            <a href="#" className="rounded-2xl bg-slate-900/80 px-4 py-3 transition hover:bg-slate-800"><FiFacebook className="inline-block" /> Facebook</a>
            <a href="#" className="rounded-2xl bg-slate-900/80 px-4 py-3 transition hover:bg-slate-800"><FiTwitter className="inline-block" /> Twitter</a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">© 2026 E-Kart. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
