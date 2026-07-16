import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const getLinkClass = (path: string) => 
    `flex items-center gap-3 px-4 py-3 rounded-md transition-all font-medium text-sm ${
      location.pathname === path 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <aside className="w-64 bg-[#1a2035] h-screen fixed left-0 top-0 flex flex-col z-50 shadow-xl shadow-slate-900/20">
      {/* Brand Logo Area */}
      <div className="h-[70px] flex items-center px-6 border-b border-slate-700/50 bg-[#151a2b]">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-wide">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            E
          </div>
          EVERSANA
        </div>
      </div>

      <div className="p-5 border-b border-slate-700/50 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-500 overflow-hidden border-2 border-slate-400">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" />
        </div>
        <div className="flex flex-col">
          <span className="text-white text-sm font-semibold">Aniket Khavnekar</span>
          <span className="text-slate-400 text-xs">Administrator</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-4 mt-2">
          Dashboard Components
        </div>
        <nav className="flex flex-col gap-1">
          <Link to="/assignment-1" className={getLinkClass('/assignment-1')}>
            <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Assignment 1 (Forms)
          </Link>
          
          <Link to="/assignment-2" className={getLinkClass('/assignment-2')}>
            <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Assignment 2 (Data List)
          </Link>
        </nav>
      </div>
    </aside>
  );
}