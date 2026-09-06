import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getStats, getUser, saveUser, getStreak, getQuizScores, getProgress, getMatchScores, getMorphemeScores, logout, clearAllUserData } from '@/utils/storage';
import { signOut, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const user = getUser();
  const stats = getStats();
  const streak = getStreak();
  const quizScores = getQuizScores();

  // ----------------------------------------------------
  // States
  // ----------------------------------------------------
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [saveLoading, setSaveLoading] = useState(false);

  // Toggle States
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Showcase pins state (Max 3 pins)
  const [pinnedBadges, setPinnedBadges] = useState(['first_step', 'quick_start']);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('user_preferences');
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        if (parsed.emailNotifications !== undefined) setEmailNotifications(parsed.emailNotifications);
        if (parsed.pinnedBadges) setPinnedBadges(parsed.pinnedBadges);
      } catch (err) {
        console.error('Error parsing user preferences:', err);
      }
    }
  }, []);

  // Save preferences helper
  const savePreferences = (updated) => {
    const current = {
      emailNotifications,
      pinnedBadges,
      ...updated
    };
    localStorage.setItem('user_preferences', JSON.stringify(current));
  };

  // ----------------------------------------------------
  // Username casing formatter
  // ----------------------------------------------------
  const formatName = (name) => {
    if (!name) return currentLanguage === 'en' ? 'User' : 'Kullanıcı';
    return name
      .split(' ')
      .map(word => {
        if (!word) return '';
        return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR');
      })
      .join(' ');
  };
  const userName = formatName(user?.name);

  const formatDate = (dateStr) => {
    if (!dateStr) return currentLanguage === 'en' ? 'June 15, 2026' : '15 Haziran 2026';
    return new Date(dateStr).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // ----------------------------------------------------
  // Handlers
  // ----------------------------------------------------
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    toast.success(t('loggedOut', 'Çıkış yapıldı'));
    navigate('/login');
  };

  const handleSaveChanges = async () => {
    if (!editName.trim()) {
      toast.error(t('nameRequired', 'İsim alanı boş bırakılamaz.'));
      return;
    }
    try {
      setSaveLoading(true);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: editName });
      }
      saveUser({
        ...user,
        name: editName,
        email: editEmail
      });
      toast.success(t('profileUpdated', 'Profil başarıyla güncellendi!'));
      setIsEditOpen(false);
    } catch (err) {
      console.error('Update profile error:', err);
      toast.error(t('profileUpdateError', 'Profil güncellenirken bir sorun oluştu.'));
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success(t('resetEmailSent', 'Şifre sıfırlama e-postası gönderildi!'));
    } catch (err) {
      console.error('Reset password error:', err);
      toast.error(t('resetEmailError', 'Şifre sıfırlama e-postası gönderilemedi.'));
    }
  };

  const handleExportData = () => {
    const data = {
      user,
      stats,
      progress: getProgress(),
      quizScores: getQuizScores(),
      matchScores: getMatchScores(),
      morphemeScores: getMorphemeScores()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `healthlex_data_${user?.uid || 'user'}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(t('dataDownloaded', 'Verileriniz JSON olarak indirildi.'));
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      t('deleteAccountConfirm', 'Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')
    );
    if (confirmation) {
      try {
        const currentUser = auth.currentUser;
        const userObj = user || { uid: currentUser?.uid, email: currentUser?.email };

        // 1. Firestore ve LocalStorage'daki tüm kullanıcı ilerleme ve skor verilerini kalıcı olarak temizle
        await clearAllUserData(currentUser || userObj);

        // 2. Firebase Auth kullanıcısını kalıcı olarak sil
        if (currentUser) {
          await currentUser.delete();
        }

        // 3. Yerel oturumu temizle ve kayıt sayfasına yönlendir
        logout();
        toast.success(t('accountDeleted', 'Hesabınız ve tüm verileriniz kalıcı olarak silindi.'));
        navigate('/register');
      } catch (err) {
        console.error('Delete account error:', err);
        toast.error(
          t('deleteAccountRelogin', 'Güvenlik nedeniyle, hesabınızı silmeden önce çıkış yapıp tekrar giriş yapmanız gerekmektedir.')
        );
      }
    }
  };

  // Badge list definitions
  const badgeShowcaseList = [
    { id: 'first_step', icon: '🥇', name: t('badgeFirstStep', 'İlk Adım'), unlocked: stats.learnedTerms >= 1 },
    { id: 'quick_start', icon: '🎯', name: t('badgeQuickStart', 'Hızlı Başlangıç'), unlocked: stats.learnedTerms >= 10 },
    { id: 'quiz_master', icon: '🏆', name: t('badgeQuizMaster', 'Quiz Ustadı'), unlocked: stats.quizzesTaken >= 5 },
    { id: 'on_fire', icon: '🔥', name: t('badgeOnFire', 'Ateşli'), unlocked: streak.currentStreak >= 7 || streak.longestStreak >= 7 },
  ];

  const handleTogglePin = (badgeId) => {
    const isAlreadyPinned = pinnedBadges.includes(badgeId);
    if (!isAlreadyPinned && pinnedBadges.length >= 3) {
      toast.warning(t('maxBadgesWarning', 'En fazla 3 adet rozet vitrine ekleyebilirsiniz.'));
      return;
    }
    const updated = isAlreadyPinned
      ? pinnedBadges.filter(b => b !== badgeId)
      : [...pinnedBadges, badgeId];
    setPinnedBadges(updated);
    savePreferences({ pinnedBadges: updated });
  };

  const handleToggleEmail = () => {
    const val = !emailNotifications;
    setEmailNotifications(val);
    savePreferences({ emailNotifications: val });
  };

  return (
    <div className="profile-theme min-h-screen bg-[var(--paper)]">
      <main className="py-[36px] px-0">
        <div className="wrap">

          {/* Heading Section */}
          <div className="mb-[24px]">
            <div className="eyebrow text-[0.72rem] font-bold text-[var(--teal)] uppercase tracking-wider mb-1">{t('myAccount')}</div>
            <h1 className="font-serif font-semibold text-[1.7rem] leading-none mb-1 text-[var(--ink)]">{t('myProfile')}</h1>
            <p className="section-sub text-[0.86rem] text-[var(--muted)] m-0">
              {t('profileSubtitle')}
            </p>
          </div>

          {/* IDENTITY CARD */}
          <section className="mb-[36px]">
            <div className="card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[28px]">
              <div className="identity flex justify-between items-start gap-[20px] flex-wrap">
                <div className="identity-left flex gap-[18px] items-center">
                  <div className="avatar-wrap relative flex-shrink-0">
                    <div className="avatar-lg w-[74px] h-[74px] rounded-full bg-gradient-to-br from-[var(--blue)] to-[var(--teal)] flex items-center justify-center text-white font-serif text-[1.7rem] font-bold">
                      {userName.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="id-name font-serif font-semibold text-[1.32rem] text-[var(--ink)] capitalize mb-1">
                      {userName}
                    </div>
                    <div className="id-meta flex gap-[16px] flex-wrap text-[0.86rem] text-[var(--muted)]">
                      <span className="flex items-center gap-[6px]">
                        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
                        </svg>
                        {user?.email}
                      </span>
                      <span className="flex items-center gap-[6px]">
                        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                        </svg>
                        {t('membership')} {formatDate(user?.joinDate)}
                      </span>
                    </div>
                    <div className="badge-pins flex gap-[8px] mt-[10px]">
                      {badgeShowcaseList
                        .filter(b => pinnedBadges.includes(b.id) && b.unlocked)
                        .map(b => (
                          <div className="pin-badge w-[30px] h-[30px] rounded-[8px] bg-[var(--paper-dim)] flex items-center justify-center text-[0.95rem]" key={b.id} title={b.name}>
                            {b.icon}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="identity-actions flex gap-[10px]">
                  <button 
                    onClick={() => setIsEditOpen(!isEditOpen)}
                    className="btn btn-outline bg-transparent border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper-dim)] transition-all font-semibold rounded-[9px]"
                  >
                    {isEditOpen ? t('close') : t('edit')}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-danger-outline bg-transparent border border-[#F0C9C0] text-[var(--coral)] hover:bg-[#FBEAE6] transition-all font-semibold rounded-[9px]"
                  >
                    {t('logout')}
                  </button>
                </div>
              </div>

              {/* Edit Panel */}
              <div className={`edit-panel ${isEditOpen ? 'open block' : 'hidden'} mt-[22px] pt-[20px] border-t border-[var(--line)]`}>
                <div className="field-row grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[14px]">
                  <div className="field">
                    <label className="block text-[0.8rem] text-[var(--muted)] font-semibold mb-1">{t('fullName')}</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-[10px_12px] border border-[var(--line)] rounded-[8px] text-[0.92rem] bg-[var(--paper)] focus:outline-none focus:border-[var(--teal)]"
                    />
                  </div>
                  <div className="field">
                    <label className="block text-[0.8rem] text-[var(--muted)] font-semibold mb-1">{t('email')}</label>
                    <input 
                      type="email" 
                      value={editEmail}
                      disabled
                      title={t('emailCannotBeChanged')}
                      className="w-full p-[10px_12px] border border-[var(--line)] rounded-[8px] text-[0.92rem] bg-[var(--paper-dim)] text-[var(--muted)] cursor-not-allowed focus:outline-none"
                    />
                  </div>
                </div>
                <div className="edit-actions flex gap-[10px] mt-1.5">
                  <button 
                    onClick={handleSaveChanges}
                    disabled={saveLoading}
                    className="btn btn-primary bg-[var(--teal)] text-white hover:bg-[var(--teal-deep)] transition-all font-semibold rounded-[9px]"
                  >
                    {saveLoading ? t('saving') : t('saveChanges')}
                  </button>
                  <button 
                    onClick={() => {
                      setEditName(user?.name || '');
                      setIsEditOpen(false);
                    }}
                    className="btn btn-outline bg-transparent border border-[var(--line)] hover:bg-[var(--paper-dim)] transition-all font-semibold rounded-[9px]"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* STATUS STRIP */}
          <section className="mb-[36px]">
            <div className="status-strip flex items-center justify-between gap-[14px] flex-wrap bg-[var(--paper-dim)] border border-dashed border-[var(--line)] rounded-[12px] p-[14px_20px] text-[0.87rem] text-[var(--muted)]">
              <span>
                <strong>{stats.learnedTerms}</strong> {t('termsCount', 'terim')} · 🔥 <strong>{streak.currentStreak} {t('daysStreak', 'gün')}</strong> {t('statusStripStreakText')}
              </span>
              <Link to="/progress" className="font-bold text-[var(--teal-deep)] hover:underline whitespace-nowrap">
                {t('progressPageLink')}
              </Link>
            </div>
          </section>

          {/* SHOWCASE BADGES SECTION */}
          <section className="mb-[36px]">
            <div className="card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[28px]">
              <h2 className="font-serif font-semibold text-[1.2rem] text-[var(--ink)] mb-1">{t('showcaseBadges')}</h2>
              <p className="section-sub text-[0.86rem] text-[var(--muted)] m-0 mb-[18px]">
                {t('showcaseSub')}
              </p>
              <div className="showcase-grid grid grid-cols-2 md:grid-cols-4 gap-[14px]">
                {badgeShowcaseList.map((badge) => {
                  const isPinned = pinnedBadges.includes(badge.id);
                  return (
                    <div 
                      key={badge.id} 
                      className="showcase-item relative bg-[var(--paper)] border border-[var(--line)] rounded-[11px] p-[18px_12px] text-center"
                      style={{ opacity: badge.unlocked ? 1 : 0.5 }}
                    >
                      <div className="ic text-[1.6rem] mb-[8px]">{badge.icon}</div>
                      <div className="nm text-[0.8rem] font-semibold text-[var(--ink)]">{badge.name}</div>
                      {badge.unlocked && (
                        <div 
                          onClick={() => handleTogglePin(badge.id)}
                          className={`pin-toggle absolute top-[8px] right-[8px] w-[22px] h-[22px] rounded-full flex items-center justify-center border border-[var(--line)] transition-all cursor-pointer ${
                            isPinned ? 'pinned bg-[var(--gold)] border-[var(--gold)]' : 'bg-white'
                          }`}
                        >
                          <svg className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 6.9L12 17.3 5.7 20.8l1.7-6.9L2 9.2l7.1-.6z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link to="/progress" className="showcase-more flex items-center justify-center text-[0.83rem] text-[var(--teal-deep)] font-bold hover:underline">
                  {t('viewAll')}
                </Link>
              </div>
            </div>
          </section>

          {/* ACCOUNT SETTINGS SECTION */}
          <section className="mb-[36px]">
            <div className="card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[28px]">
              <h2 className="font-serif font-semibold text-[1.2rem] text-[var(--ink)] mb-1">{t('accountSettings')}</h2>
              <p className="section-sub text-[0.86rem] text-[var(--muted)] m-0 mb-[18px]">
                {t('accountSettingsSub')}
              </p>

              {/* Interface Language Setting (Dropdown) */}
              <div className="setting-row flex justify-between items-center gap-[16px] py-[16px] border-b border-[var(--line)]">
                <div>
                  <div className="setting-label text-[0.92rem] font-semibold text-[var(--ink)]">{t('interfaceLanguage')}</div>
                  <div className="setting-sub text-[0.8rem] text-[var(--muted)] mt-0.5">{t('interfaceLanguageSub')}</div>
                </div>
                <div className="relative">
                  <select
                    value={currentLanguage}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-white border border-[var(--line)] rounded-[9px] px-3.5 py-2 text-sm font-semibold text-[var(--ink)] focus:outline-none focus:border-[var(--teal)] cursor-pointer shadow-xs hover:border-[var(--teal)] transition-all"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              {/* Email Notifications Settings */}
              <div className="setting-row flex justify-between items-center gap-[16px] py-[16px] border-b border-[var(--line)]">
                <div>
                  <div className="setting-label text-[0.92rem] font-semibold text-[var(--ink)]">{t('emailNotificationsTitle')}</div>
                  <div className="setting-sub text-[0.8rem] text-[var(--muted)] mt-0.5">{t('emailNotificationsSub')}</div>
                </div>
                <button 
                  onClick={handleToggleEmail}
                  className={`toggle w-[42px] h-[24px] rounded-[14px] relative flex-shrink-0 transition-all ${
                    emailNotifications ? 'on bg-[var(--teal)]' : 'bg-[var(--line)]'
                  }`}
                ></button>
              </div>

              {/* Security: Change Password */}
              <div className="setting-row flex justify-between items-center gap-[16px] py-[16px] border-b border-[var(--line)]">
                <div>
                  <div className="setting-label text-[0.92rem] font-semibold text-[var(--ink)]">{t('changePassword')}</div>
                  <div className="setting-sub text-[0.8rem] text-[var(--muted)] mt-0.5">{t('changePasswordSub')}</div>
                </div>
                <button 
                  onClick={handlePasswordReset}
                  className="btn btn-outline bg-transparent border border-[var(--line)] hover:bg-[var(--paper-dim)] transition-all font-semibold rounded-[9px]"
                >
                  {t('change')}
                </button>
              </div>

              {/* Export Data */}
              <div className="setting-row flex justify-between items-center gap-[16px] py-[16px] last:border-none">
                <div>
                  <div className="setting-label text-[0.92rem] font-semibold text-[var(--ink)]">{t('downloadData')}</div>
                  <div className="setting-sub text-[0.8rem] text-[var(--muted)] mt-0.5">{t('downloadDataSub')}</div>
                </div>
                <button 
                  onClick={handleExportData}
                  className="btn btn-outline bg-transparent border border-[var(--line)] hover:bg-[var(--paper-dim)] transition-all font-semibold rounded-[9px]"
                >
                  {t('download')}
                </button>
              </div>
            </div>
          </section>

          {/* DANGER ZONE SECTION */}
          <section className="mb-0">
            <div className="card danger-card bg-white border border-[#F0C9C0] rounded-[var(--radius)] p-[28px]">
              <h2 className="font-serif font-semibold text-[1.2rem] text-[var(--coral)] mb-1">{t('dangerZone')}</h2>
              <p className="section-sub text-[0.86rem] text-[var(--muted)] m-0 mb-[18px]">{t('dangerZoneSub')}</p>
              
              <div className="setting-row flex justify-between items-center gap-[16px] py-[16px] last:border-none">
                <div>
                  <div className="setting-label text-[0.92rem] font-semibold text-[var(--ink)]">{t('deleteAccount')}</div>
                  <div className="setting-sub text-[0.8rem] text-[var(--muted)] mt-0.5">{t('deleteAccountSub')}</div>
                </div>
                <button 
                  onClick={handleDeleteAccount}
                  className="btn btn-danger-outline bg-transparent border border-[#F0C9C0] text-[var(--coral)] hover:bg-[#FBEAE6] transition-all font-semibold rounded-[9px]"
                >
                  {t('deleteAccountBtn')}
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};