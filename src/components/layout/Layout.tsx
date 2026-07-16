import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#f4f7f6] font-sans overflow-hidden text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto mt-[70px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}