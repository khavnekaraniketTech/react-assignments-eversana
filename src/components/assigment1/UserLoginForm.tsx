import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { postService } from '../../api/postService';
import type { LoginForm } from '../../types';

interface Props {
    onLoginSuccess: () => void;
}

export default function UserLoginForm({ onLoginSuccess }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        setStatus('loading');
        try {
            await postService.loginUser(data);
            setTimeout(() => {
                setStatus('success');
                localStorage.setItem('isAuthenticated', 'true');
                onLoginSuccess();
            }, 800);
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Account Login</h3>
                <p className="text-xs text-gray-400 mt-1">Assignment 1 Part B: Identity Token Mock Verification</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Registered Email</label>
                    <input type="email" className="w-full px-4 py-2.5 border rounded-lg text-sm" {...register('email', { required: 'Email required' })} />
                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Security Password</label>
                    <input type="password" className="w-full px-4 py-2.5 border rounded-lg text-sm" {...register('password', { required: 'Password required' })} />
                    {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                </div>

                <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md">
                    {status === 'loading' ? 'Verifying Session...' : 'Authenticate Account'}
                </button>
            </form>
        </div>
    );
}