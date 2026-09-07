import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { saveUser, syncProgressFromFirestore } from '@/utils/storage';
import { toast } from 'sonner';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useLanguage } from '@/context/LanguageContext';

// Helper function to translate Firebase auth errors
const getAuthErrorMessage = (errorCode, isTr) => {
  if (isTr) {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Geçersiz bir e-posta adresi girdiniz.';
      case 'auth/user-disabled':
        return 'Bu kullanıcı hesabı engellenmiştir.';
      case 'auth/user-not-found':
        return 'Bu e-posta adresine kayıtlı bir kullanıcı bulunamadı.';
      case 'auth/wrong-password':
        return 'Hatalı şifre girdiniz. Lütfen tekrar deneyin.';
      case 'auth/email-already-in-use':
        return 'Bu e-posta adresi zaten kullanımda.';
      case 'auth/weak-password':
        return 'Şifreniz çok zayıf. Şifre en az 6 karakter olmalıdır.';
      case 'auth/operation-not-allowed':
        return 'Bu giriş yöntemine izin verilmedi.';
      case 'auth/too-many-requests':
        return 'Çok fazla başarısız giriş denemesi yaptınız. Lütfen daha sonra tekrar deneyin.';
      case 'auth/invalid-credential':
        return 'E-posta adresi veya şifre hatalı.';
      default:
        return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  } else {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'You entered an invalid email address.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'This email address is already in use.';
      case 'auth/weak-password':
        return 'Password is too weak. Must be at least 6 characters.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not allowed.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/invalid-credential':
        return 'Invalid email address or password.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
};

export const Login = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ?redirect= parametresini oku
  const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t('fillAllFields', 'Lütfen tüm alanları doldurun'));
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user to storage to maintain compatibility with existing tracking features
      saveUser({
        uid: user.uid,
        name: user.displayName || email.split('@')[0],
        email: email,
        joinDate: user.metadata.creationTime || new Date().toISOString()
      });

      // Synchronize progress from Firestore immediately on login
      await syncProgressFromFirestore();

      toast.success(t('loginSuccess', 'Giriş başarılı! Hoş geldiniz.'));
      // redirect parametresi varsa oraya, yoksa anasayfaya git
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      const message = getAuthErrorMessage(error.code, isTr);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-hero">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t('loginTitle', "HealthLexMed'e Giriş Yap")}</CardTitle>
          <CardDescription>{t('loginSubtitle', 'Hesabınıza erişin ve öğrenmeye devam edin')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email', 'E-posta')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('password', 'Şifre')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary shadow-lg" disabled={loading}>
              {loading ? t('loggingIn', 'Giriş Yapılıyor...') : t('login', 'Giriş Yap')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('noAccount', 'Hesabın yok mu?')}{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                {t('signUp', 'Kayıt Ol')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Register = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error(t('fillAllFields', 'Lütfen tüm alanları doldurun'));
      return;
    }

    if (!acceptTerms) {
      toast.error(t('mustAcceptTerms', 'Kayıt olabilmek için lütfen Kullanım Koşulları, Gizlilik ve İptal Politikalarını kabul edin.'));
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user profile with the displayName in Firebase Auth
      await updateProfile(user, {
        displayName: name
      });

      // Save user to storage with legal consent timestamp to maintain compliance
      saveUser({
        uid: user.uid,
        name: name,
        email: email,
        acceptedTerms: true,
        acceptedTermsAt: new Date().toISOString(),
        joinDate: user.metadata.creationTime || new Date().toISOString()
      });

      // Synchronize progress from Firestore immediately on registration
      await syncProgressFromFirestore();

      toast.success(t('registerSuccess', 'Hesap oluşturuldu! Hoş geldiniz.'));
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      const message = getAuthErrorMessage(error.code, isTr);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-hero">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t('registerTitle', "HealthLexMed'e Kayıt Ol")}</CardTitle>
          <CardDescription>{t('registerSubtitle', 'Ücretsiz hesap oluştur ve öğrenmeye başla')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('fullName', 'Ad Soyad')}</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder={t('fullNamePlaceholder', 'Adınız Soyadınız')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('email', 'E-posta')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('password', 'Şifre')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('passwordPlaceholder', 'En az 6 karakter')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
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
                disabled={loading}
                required
              />
              <Label
                htmlFor="acceptTerms"
                className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none font-normal"
              >
                {t('acceptTermsPrefix', '')}
                <Link
                  to="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  {t('termsOfService', 'Kullanım Koşulları')}
                </Link>
                {', '}
                <Link
                  to="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  {t('privacyPolicy', 'Gizlilik Politikası')}
                </Link>
                {isTr ? ' ve ' : ' and '}
                <Link
                  to="/refund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  {t('refundPolicy', 'İptal & İade Politikası')}
                </Link>
                {t('acceptTermsSuffix', '\'nı okudum, anladım ve kabul ediyorum.')}
              </Label>
            </div>

            <Button type="submit" className="w-full gradient-primary shadow-lg" disabled={loading}>
              {loading ? t('creatingAccount', 'Hesap Oluşturuluyor...') : t('createAccount', 'Hesap Oluştur')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('alreadyHaveAccount', 'Zaten hesabın var mı?')}{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                {t('login', 'Giriş Yap')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};