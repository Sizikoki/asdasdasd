import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Login, Register } from '@/pages/Auth';
import { Study } from '@/pages/Study';
import { Games } from '@/pages/Games';
import { Flashcards } from '@/pages/Flashcards';
import { MatchGame } from '@/pages/MatchGame';
import { Quiz } from '@/pages/Quiz';
import { MorphemeGame } from '@/pages/MorphemeGame';
import { MorphemeExplorer } from '@/pages/MorphemeExplorer';
import { MorphemeDetail } from '@/pages/MorphemeDetail';
import { TermDetail } from '@/pages/TermDetail';
import { ProgressPage } from '@/pages/Progress';
import { Profile } from '@/pages/Profile';
import { Contact } from '@/pages/Contact';
import { Legal } from '@/pages/Legal';
import { Welcome } from '@/pages/Welcome';
import { isLoggedIn, syncProgressFromFirestore } from '@/utils/storage';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { getPaddle } from '@/services/paddle';
import { LanguageProvider } from '@/context/LanguageContext';
import { CookieBanner } from '@/components/CookieBanner';
import { initAnalyticsOnLoad } from '@/services/analytics';
import './App.css';

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

function App() {
  useEffect(() => {
    getPaddle(); // Pre-warm & initialize Paddle.js with live client-side token
    initAnalyticsOnLoad(); // Check cookie consent and boot Google Analytics if accepted

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        syncProgressFromFirestore();
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <LanguageProvider>
      <BrowserRouter>

        <div className="App min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/panel" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/study" element={<Study />} />
            <Route path="/study/:slug" element={<TermDetail />} />
            <Route path="/terms/:slug" element={<TermDetail />} />
            <Route path="/games" element={<Games />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/match" element={<MatchGame />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/morpheme" element={<MorphemeGame />} />
            <Route path="/morphemes" element={<MorphemeExplorer />} />
            <Route path="/morphemes/:slug" element={<MorphemeDetail />} />
            <Route path="/morpheme-explorer" element={<MorphemeExplorer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/iletisim" element={<Navigate to="/contact" replace />} />
            <Route path="/terms" element={<Legal activeDoc="terms" />} />
            <Route path="/privacy" element={<Legal activeDoc="privacy" />} />
            <Route path="/refund" element={<Legal activeDoc="refund" />} />
            <Route path="/legal" element={<Navigate to="/terms" replace />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/success" element={<Navigate to="/welcome" replace />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" richColors />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;