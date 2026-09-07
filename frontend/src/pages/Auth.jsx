import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { saveUser, syncProgressFromFirestore } from '@/utils/storage';
import { toast } from 'sonner';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/firebase/config';
import { useLanguage } from '@/context/LanguageContext';

// ── Firestore Kullanici Belgesi Olustur / Kontrol Et ─────────────────────────
// users/{uid} belgesi yoksa otomatik olusturur.
// Google ile ilk kez giris yapan kullanicilar icin kritiktir.
const ensureUserDoc = async (user) => {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      subscriptionStatus: 'free',
      isPro: false,
      createdAt: serverTimestamp()
    });
  }
};
// ─────────────────────────────────────────────────────────────────────────────

// Firebase hata mesajlari
const getAuthErrorMessage = (errorCode, isTr) => {
  const msgs = {
    tr: {
      'auth/invalid-email':          'Gecersiz bir e-posta adresi girdiniz.',
      'auth/user-disabled':          'Bu kullanici hesabi engellenmistir.',
      'auth/user-not-found':         'Bu e-posta adresine kayitli bir kullanici bulunamadi.',
      'auth/wrong-password':         'Hatali sifre girdiniz. Lutfen tekrar deneyin.',
      'auth/email-already-in-use':   'Bu e-posta adresi zaten kullanimda.',
      'auth/weak-password':          'Sifreniz cok zayif. Sifre en az 6 karakter olmalidir.',
      'auth/operation-not-allowed':  'Bu giris yontemine izin verilmedi.',
      'auth/too-many-requests':      'Cok fazla basarisiz giris denemesi. Lutfen daha sonra tekrar deneyin.',
      'auth/invalid-credential':     'E-posta adresi veya sifre hatali.',
      'auth/popup-closed-by-user':   'Google giris penceresi kapatildi.',
      'auth/cancelled-popup-request':'Giris islemi iptal edildi.'
    },
    en: {
      'auth/invalid-email':          'You entered an invalid email address.',
      'auth/user-disabled':          'This user account has been disabled.',
      'auth/user-not-found':         'No user found with this email address.',
      'auth/wrong-password':         'Incorrect password. Please try again.',
      'auth/email-already-in-use':   'This email address is already in use.',
      'auth/weak-password':          'Password is too weak. Must be at least 6 characters.',
      'auth/operation-not-allowed':  'This sign-in method is not allowed.',
      'auth/too-many-requests':      'Too many failed attempts. Please try again later.',
      'auth/invalid-credential':     'Invalid email address or password.',
      'auth/popup-closed-by-user':   'Google sign-in window was closed.',
      'auth/cancelled-popup-request':'Sign-in was cancelled.'
    }
  };
  return (isTr ? msgs.tr : msgs.en)[errorCode] || (isTr ? 'Bir hata olustu.' : 'An error occurred.');
};

// Google SVG ikonu (resmi renkler)
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

// ── Paylasilan Google Butonu ──────────────────────────────────────────────────
const GoogleButton = ({ onClick, loading, isTr }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border bg-card hover:bg-muted rounded-lg text-sm font-medium text-foreground transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading
      ? <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
      : <GoogleIcon />}
    {loading
      ? (isTr ? 'Giris yapiliyor...' : 'Signing in...')
      : (isTr ? 'Google ile Devam Et' : 'Continue with Google')}
  </button>
);

// ── Ayirac ────────────────────────────────────────────────────────────────────
const Divider = ({ isTr, withEmail }) => (
  <div className="relative my-5">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-border" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-card px-3 text-muted-foreground font-medium">
        {withEmail
          ? (isTr ? 'veya e-posta ile' : 'or with email')
          : (isTr ? 'veya' : 'or')}
      </span>
    </div>
  </div>
);

// =============================================================================
// LOGIN
// =============================================================================
export const Login = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ?redirect= parametresini oku, yoksa /dashboard
  const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t('fillAllFields', 'Lutfen tum alanlari doldurun'));
      return;
    }
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await ensureUserDoc(user);
      saveUser({ uid: user.uid, name: user.displayName || email.split('@')[0], email, joinDate: user.metadata.creationTime || new Date().toISOString() });
      await syncProgressFromFirestore();
      toast.success(t('loginSuccess', 'Giris basarili! Hos geldiniz.'));
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast.error(getAuthErrorMessage(error.code, isTr));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const { user } = await signInWithPopup(auth, googleProvider);
      await ensureUserDoc(user);
      saveUser({ uid: user.uid, name: user.displayName || user.email?.split('@')[0] || 'User', email: user.email, joinDate: user.metadata.creationTime || new Date().toISOString() });
      await syncProgressFromFirestore();
      toast.success(isTr ? 'Google ile giris basarili! Hos geldiniz.' : 'Signed in with Google! Welcome.');
      navigate(redirectTo, { replace: true });
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        console.error('Google login error:', error);
        toast.error(getAuthErrorMessage(error.code, isTr));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const isAnyLoading = loading || googleLoading;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-hero">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t('loginTitle', "HealthLexMed'e Giris Yap")}</CardTitle>
          <CardDescription>{t('loginSubtitle', 'Hesabiniza erisin ve ogrenmeye devam edin')}</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleButton onClick={handleGoogleLogin} loading={googleLoading} isTr={isTr} />
          <Divider isTr={isTr} withEmail={false} />

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email', 'E-posta')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" disabled={isAnyLoading} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password', 'Sifre')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" disabled={isAnyLoading} />
              </div>
            </div>
            <Button type="submit" className="w-full gradient-primary shadow-lg" disabled={isAnyLoading}>
              {loading ? t('loggingIn', 'Giris Yapiliyor...') : t('login', 'Giris Yap')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('noAccount', 'Hesabin yok mu?')}{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                {t('signUp', 'Kayit Ol')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// REGISTER
// =============================================================================
export const Register = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error(t('fillAllFields', 'Lutfen tum alanlari doldurun'));
      return;
    }
    if (!acceptTerms) {
      toast.error(t('mustAcceptTerms', 'Lutfen Kullanim Kosullari, Gizlilik ve Iptal Politikalarini kabul edin.'));
      return;
    }
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await ensureUserDoc({ ...user, displayName: name });
      saveUser({ uid: user.uid, name, email, acceptedTerms: true, acceptedTermsAt: new Date().toISOString(), joinDate: user.metadata.creationTime || new Date().toISOString() });
      await syncProgressFromFirestore();
      toast.success(t('registerSuccess', 'Hesap olusturuldu! Hos geldiniz.'));
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(getAuthErrorMessage(error.code, isTr));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);
      const { user } = await signInWithPopup(auth, googleProvider);
      await ensureUserDoc(user);
      saveUser({ uid: user.uid, name: user.displayName || user.email?.split('@')[0] || 'User', email: user.email, joinDate: user.metadata.creationTime || new Date().toISOString() });
      await syncProgressFromFirestore();
      toast.success(isTr ? 'Google ile giris basarili! Hos geldiniz.' : 'Signed in with Google! Welcome.');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        console.error('Google register error:', error);
        toast.error(getAuthErrorMessage(error.code, isTr));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const isAnyLoading = loading || googleLoading;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-hero">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t('registerTitle', "HealthLexMed'e Kayit Ol")}</CardTitle>
          <CardDescription>{t('registerSubtitle', 'Ucretsiz hesap olustur ve ogrenmeye basla')}</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleButton onClick={handleGoogleRegister} loading={googleLoading} isTr={isTr} />
          <Divider isTr={isTr} withEmail={true} />

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('fullName', 'Ad Soyad')}</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="name" type="text" placeholder={t('fullNamePlaceholder', 'Adiniz Soyadiniz')} value={name} onChange={(e) => setName(e.target.value)} className="pl-10" disabled={isAnyLoading} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('email', 'E-posta')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" disabled={isAnyLoading} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password', 'Sifre')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder={t('passwordPlaceholder', 'En az 6 karakter')} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" disabled={isAnyLoading} />
              </div>
            </div>

            {/* Legal Agreement Checkbox */}
            <div className="flex items-start space-x-2.5 pt-1 pb-1">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary shrink-0"
                disabled={isAnyLoading}
                required
              />
              <Label htmlFor="acceptTerms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none font-normal">
                {t('acceptTermsPrefix', '')}
                <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">{t('termsOfService', 'Kullanim Kosullari')}</Link>
                {', '}
                <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">{t('privacyPolicy', 'Gizlilik Politikasi')}</Link>
                {isTr ? ' ve ' : ' and '}
                <Link to="/refund" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">{t('refundPolicy', 'Iptal ve Iade Politikasi')}</Link>
                {t('acceptTermsSuffix', "'ni okudum, anladim ve kabul ediyorum.")}
              </Label>
            </div>

            <Button type="submit" className="w-full gradient-primary shadow-lg" disabled={isAnyLoading}>
              {loading ? t('creatingAccount', 'Hesap Olusturuluyor...') : t('createAccount', 'Hesap Olustur')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('alreadyHaveAccount', 'Zaten hesabin var mi?')}{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                {t('login', 'Giris Yap')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
