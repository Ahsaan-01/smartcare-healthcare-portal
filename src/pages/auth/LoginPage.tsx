import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from '../../store/useToastStore';
import { DEMO_CREDENTIALS } from '../../utils/constants';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, loginAsDemo, isLoading, error } = useAuthStore();

  const redirectUrl = searchParams.get('redirect') || '/patient/dashboard';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data.email, data.password);
    if (success) {
      toast.success('Welcome back to SmartCare!');
      navigate(redirectUrl);
    }
  };

  const handleQuickDemo = async (role: 'patient' | 'doctor' | 'admin') => {
    const creds = DEMO_CREDENTIALS[role];
    setValue('email', creds.email);
    setValue('password', creds.password);
    const success = await loginAsDemo(role);
    if (success) {
      toast.success(`Logged in as Demo ${role.toUpperCase()}`);
      navigate('/patient/dashboard');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Sign In to SmartCare
          </h2>
          <p className="text-xs text-slate-500">
            Access your patient dashboard, saved doctors, and medical appointments
          </p>
        </div>

        {/* 1-Click Demo Evaluation Box */}
        <div className="p-3.5 rounded-2xl bg-[#E6F4F1]/70 border border-[#0D7A5F]/20 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0D7A5F]">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> 1-Click Demo Accounts
            </span>
            <span className="text-[10px] text-slate-500 font-normal">For Review</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo('patient')}
              className="px-2 py-1.5 rounded-xl bg-white border border-[#0D7A5F]/30 hover:border-[#0D7A5F] hover:bg-[#0D7A5F] hover:text-white text-[#0D7A5F] text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('doctor')}
              className="px-2 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-teal-600 hover:bg-teal-700 hover:text-white text-slate-700 text-[11px] font-semibold transition-all shadow-2xs cursor-pointer"
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="px-2 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-800 hover:bg-slate-900 hover:text-white text-slate-700 text-[11px] font-semibold transition-all shadow-2xs cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-in fade-in">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="patient@smartcare.pk"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 select-none">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-[#0D7A5F] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F] transition-all"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs font-medium text-rose-600 animate-in fade-in">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-[#0D7A5F] focus:ring-[#0D7A5F]"
                {...register('rememberMe')}
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have a SmartCare account yet?{' '}
          <Link to="/signup" className="font-bold text-[#0D7A5F] hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
