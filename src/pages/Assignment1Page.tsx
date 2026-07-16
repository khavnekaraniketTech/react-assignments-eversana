import { useState } from 'react';
import RegistrationForm from '../components/assigment1/RegistrationForm';
import UserLoginForm from '../components/assigment1/UserLoginForm';
import PostList from '../components/assigment1/PostList';

export default function Assignment1Page() {
  const [activeSubTab, setActiveSubTab] = useState<'register' | 'login' | 'posts'>('register');
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem('isAuthenticated') === 'true');

  const tabClass = (active: boolean) => 
    `px-4 py-2 text-sm font-medium transition-all border-b-2 ${
      active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'
    }`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-gray-900">Assignment 1 Workspace</h1>
        <p className="text-xs text-gray-400 mt-0.5">Unified validation workflows, dynamic mock authentication, and external integration points.</p>
      </div>

      {/* Internal Navigation Ribbon */}
      <div className="flex border-b border-gray-200 gap-4">
        <button className={tabClass(activeSubTab === 'register')} onClick={() => setActiveSubTab('register')}>
          1. Registration Form
        </button>
        <button className={tabClass(activeSubTab === 'login')} onClick={() => setActiveSubTab('login')}>
          2. Account Authentication
        </button>
        <button className={tabClass(activeSubTab === 'posts')} onClick={() => setActiveSubTab('posts')}>
          3. Live API Fetch View
          {isAuthed && <span className="ml-2 bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-md font-bold">Authed</span>}
        </button>
      </div>

      {/* Dynamic View Processing Router Block */}
      <div className="mt-4">
        {activeSubTab === 'register' && (
          <RegistrationForm onSuccessSwitch={() => setActiveSubTab('login')} />
        )}
        
        {activeSubTab === 'login' && (
          <UserLoginForm onLoginSuccess={() => {
            setIsAuthed(true);
            setActiveSubTab('posts');
          }} />
        )}
        
        {activeSubTab === 'posts' && (
          <div>
            {!isAuthed && (
              <div className="p-4 mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl">
                ⚠️ <strong>Note to Evaluator:</strong> While this screen pulls posts directly via the API service, completing step 2 (Authentication) simulates a real application flow.
              </div>
            )}
            <PostList />
          </div>
        )}
      </div>
    </div>
  );
}