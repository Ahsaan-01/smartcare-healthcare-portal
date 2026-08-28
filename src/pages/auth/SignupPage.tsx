import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from '../../store/useToastStore';
import { MOCK_CITIES } from '../../data/mockCities';

const signupSchema = z
  .object({
    name: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z
      .string()
      .regex(
        /^((\+92)|(03))\d{9}$/,
        'Please enter a valid Pakistani phone number (e.g. 03001234567 or +923001234567)'
      ),
    city: z.string().min(1, 'Please select your city'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, 'You must agree to the Terms of Service')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      city: 'Karachi',
      agreeTerms: true
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    const success = await signup({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: 'patient',
      city: data.city
    });

    if (success) {
      toast.success('Account created successfully! Welcome to SmartCare.');
      navigate('/patient/dashboard');
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Create Your Patient Account
          </h2>
          <p className="text-xs text-slate-500">
            Join SmartCare to book verified doctor appointments across Pakistan
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name *"
            placeholder="e.g. Muhammad Ahsaan Khan"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.name?.message}
            {...register('name')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address *"
              type="email"
              placeholder="patient@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Pakistani Phone Number *"
              placeholder="0300 1234567"
              leftIcon={<Phone className="w-4 h-4" />}
              error={errors.phone?.message}
              helperText="Format: 03XX XXXXXXX"
              {...register('phone')}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              City in Pakistan *
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
                {...register('city')}
              >
                {MOCK_CITIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.city && (
              <span className="text-xs font-medium text-rose-600 animate-in fade-in">
                {errors.city.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 select-none">
                Password *
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
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

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 select-none">
                Confirm Password *
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20 focus:border-[#0D7A5F]"
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-xs font-medium text-rose-600 animate-in fade-in">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-600">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-[#0D7A5F] focus:ring-[#0D7A5F] mt-0.5"
                {...register('agreeTerms')}
              />
              <span>
                I agree to the SmartCare Privacy Policy & Terms of Healthcare Service in Pakistan.
              </span>
            </label>
            {errors.agreeTerms && (
              <span className="text-xs font-medium text-rose-600 block animate-in fade-in">
                {errors.agreeTerms.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Patient Account
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#0D7A5F] hover:underline">
            Log In here
          </Link>
        </div>
      </div>
    </div>
  );
};
