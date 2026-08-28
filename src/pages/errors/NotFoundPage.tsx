import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Home, Search } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
          <Stethoscope className="w-10 h-10 text-[#0D7A5F]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            The page or healthcare resource you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/find-doctors">
            <Button variant="outline" size="md" leftIcon={<Search className="w-4 h-4" />}>
              Find Doctors
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
