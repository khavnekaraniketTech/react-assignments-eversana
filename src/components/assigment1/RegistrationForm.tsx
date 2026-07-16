import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { postService } from '../../api/postService';
import type { UserForm } from '../../types';

interface Props {
    onSuccessSwitch: () => void;
}

export default function RegistrationForm({ onSuccessSwitch }: Props) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserForm>();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const password = watch('password');

    const onSubmit: SubmitHandler<UserForm> = async (data) => {
        setStatus('loading');
        try {
            await postService.registerUser({ name: data.name, email: data.email, password: data.password });
            setTimeout(() => {
                setStatus('success');
                reset();
                setTimeout(() => onSuccessSwitch(), 1200);
            }, 800);
        } catch {
            setStatus('error');
        }
    };

    const inputClass = (hasError: boolean) =>
        `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-4 transition-all text-sm ${hasError ? 'border-red-500 focus:ring-red-100 bg-red-50/30' : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
        }`;

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Create Account</h3>
                <p className="text-xs text-gray-400 mt-1">Assignment 1 Part A: Client-side Validation & POST integration</p>
            </div>

            {status === 'success' && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl font-medium">
                    ✅ Account registered successfully! Redirecting to login...
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Full Name</label>
                    <input type="text" className={inputClass(!!errors.name)} {...register('name', { required: 'Name is required' })} />
                    {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Email</label>
                    <input type="email" className={inputClass(!!errors.email)} {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid format' } })} />
                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Password</label>
                    <input type="password" className={inputClass(!!errors.password)} {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Minimum 6 chars' } })} />
                    {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Confirm Password</label>
                    <input type="password" className={inputClass(!!errors.confirmPassword)} {...register('confirmPassword', { required: 'Confirm password', validate: v => v === password || 'Passwords mismatch' })} />
                    {errors.confirmPassword && <span className="text-red-500 text-xs mt-1 block">{errors.confirmPassword.message}</span>}
                </div>

                <button type="submit" disabled={status === 'loading'} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-xl transition-all shadow-md">
                    {status === 'loading' ? 'Submitting Form...' : 'Register User'}
                </button>
            </form>
        </div>
    );
}