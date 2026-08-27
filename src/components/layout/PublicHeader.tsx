import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  User,
  Heart,
  LogOut,
  ChevronDown,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { useFavouritesStore } from '../../store/useFavouritesStore';
import { cn } from '../../utils/cn';

export const PublicHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { favouriteDoctorIds } = useFavouritesStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top emergency & trust announcement bar */}
      <div className="bg-[#084E3D] text-emerald-100 text-[11px] py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#0D7A5F] px-2 py-0.5 rounded text-white font-semibold">
              <ShieldCheck className="w-3 h-3" /> PMDC Verified
            </span>
            <span>Pakistan’s premier healthcare appointment platform across 10+ major cities</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <span className="flex items-center gap-1 text-white font-medium">
              <PhoneCall className="w-3 h-3" /> Helpline: 021-111-762-782
            </span>
            <span className="text-emerald-400/60">|</span>
            <Link to="/find-doctors" className="hover:text-white transition-colors underline">
              Browse Doctors in Karachi & Lahore
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            <NavLink
              to="/find-doctors"
              className={({ isActive }) =>
                cn(
                  'text-sm font-semibold transition-colors',
                  isActive ? 'text-[#0D7A5F]' : 'text-slate-600 hover:text-[#0D7A5F]'
                )
              }
            >
              Find Doctors
            </NavLink>
            <a
              href="/#specialties"
              className="text-sm font-semibold text-slate-600 hover:text-[#0D7A5F] transition-colors"
            >
              Specialties
            </a>
            <a
              href="/#how-it-works"
              className="text-sm font-semibold text-slate-600 hover:text-[#0D7A5F] transition-colors"
            >
              How It Works
            </a>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  'text-sm font-semibold transition-colors',
                  isActive ? 'text-[#0D7A5F]' : 'text-slate-600 hover:text-[#0D7A5F]'
                )
              }
            >
              About SmartCare
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  'text-sm font-semibold transition-colors',
                  isActive ? 'text-[#0D7A5F]' : 'text-slate-600 hover:text-[#0D7A5F]'
                )
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/find-doctors">
              <Button variant="ghost" size="sm" leftIcon={<Search className="w-4 h-4 text-slate-500" />}>
                Search
              </Button>
            </Link>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D7A5F]/20"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0D7A5F] text-white font-bold flex items-center justify-center text-xs">
                    {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="text-left leading-tight hidden lg:block">
                    <span className="block text-xs font-bold text-slate-800">{user.name}</span>
                    <span className="block text-[10px] text-slate-500 capitalize">{user.role}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="text-xs font-bold text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    </div>
                    <Link
                      to="/patient/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4" /> Patient Dashboard
                    </Link>
                    <Link
                      to="/patient/favourites"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Heart className="w-4 h-4" /> Saved Doctors
                      </span>
                      {favouriteDoctorIds.length > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-rose-100 text-rose-600 rounded-full font-bold">
                          {favouriteDoctorIds.length}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <NavLink
              to="/find-doctors"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl"
            >
              <Search className="w-4 h-4" /> Find Doctors in Pakistan
            </NavLink>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl"
            >
              About SmartCare
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#E6F4F1] hover:text-[#0D7A5F] rounded-xl"
            >
              Contact & Helplines
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/patient/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-[#0D7A5F] bg-[#E6F4F1] rounded-xl"
                >
                  <User className="w-4 h-4" /> Open Patient Dashboard
                </Link>
                <Link
                  to="/patient/favourites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
                >
                  <span className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-rose-500" /> Saved Doctors
                  </span>
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                    {favouriteDoctorIds.length}
                  </span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full" size="md">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full" size="md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
