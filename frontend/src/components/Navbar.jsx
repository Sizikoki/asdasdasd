import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUser, logout, isLoggedIn, getStats } from '@/utils/storage';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const { currentLanguage, setLanguage, t } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setFirebaseUser(usr);
    });
    return () => unsubscribe();
  }, []);

  const loggedIn = !!firebaseUser || isLoggedIn();
  const user = getUser();
  const stats = loggedIn ? getStats() : null;

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    window.location.href = '/login';
  };

  // Giriş yapmış kullanıcılar için Dashboard linki öne eklendi
  const navLinks = loggedIn
    ? [
        { path: '/dashboard', label: t('dashboard', 'Panel'), icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
        { path: '/study', label: t('study') },
        { path: '/morphemes', label: t('morphemes', 'Morfemler') },
        { path: '/games', label: t('games') },
        { path: '/progress', label: t('progress') },
      ]
    : [
        { path: '/', label: t('home', 'Ana Sayfa') },
        { path: '/study', label: t('study') },
        { path: '/morphemes', label: t('morphemes', 'Morfemler') },
        { path: '/games', label: t('games') },
        { path: '/progress', label: t('progress') },
      ];

  const LanguageSwitcher = () => (
    <div className="flex items-center bg-card border border-border rounded-lg p-1 text-xs font-semibold shadow-sm">
      <button
        onClick={() => setLanguage('tr')}
        className={`px-2.5 py-1 rounded transition-colors ${
          currentLanguage === 'tr'
            ? 'bg-primary text-primary-foreground font-bold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Türkçe"
      >
        TR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded transition-colors ${
          currentLanguage === 'en'
            ? 'bg-primary text-primary-foreground font-bold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border" data-purpose="main-header">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo — giriş yapmış kullanıcıda /dashboard'a götürür */}
          <Link to={loggedIn ? '/dashboard' : '/'} className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-primary p-2 rounded-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h4l2 7 4-14 2 7h6" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Health<span className="text-primary font-semibold font-serif italic">Lex</span>Med
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-[0.92rem] font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-card border border-border text-foreground shadow-sm rounded-lg font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg'
                }`}
              >
                {link.icon && <span className="opacity-70">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Actions + Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />

            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-[14px] cursor-pointer select-none">
                    <div className="streak-badge flex items-center gap-[6px] bg-amber-500/10 border border-amber-500/30 px-[12px] py-[7px] rounded-[20px] font-semibold text-[0.85rem] text-amber-700 dark:text-amber-400">
                      🔥 {stats?.currentStreak || 0} {t('daysStreak')}
                    </div>
                    <div className="avatar w-[36px] h-[36px] rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-[0.95rem]">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border border-border">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer px-4 py-2 text-foreground hover:bg-muted">
                      <User className="w-4 h-4 mr-2 text-muted-foreground" />
                      {t('myProfile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer px-4 py-2 hover:bg-destructive/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="px-6 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors bg-card">
                  {t('login')}
                </Link>
                <Link to="/register" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm">
                  {t('startFree')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button & Language switcher */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {loggedIn ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      {user?.name || t('myProfile')}
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 border border-border rounded-lg font-medium text-foreground bg-card hover:bg-muted">
                    {t('login')}
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
                    {t('startFree')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};