import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, usePage, router } from '@inertiajs/react';
import SamaWidget from '@/Components/SamaWidget';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage().props as any;
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAiEnabled, setIsAiEnabled] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    router.post(route('logout'));
    handleClose();
  };

  const fetchData = async () => {
    const response = await fetch('/api/settings');
    const data = await response.json();
    setIsAiEnabled(data.settings.ai_enabled);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="public-layout">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <Link href="/" className="navbar__logo">مائدة الشيف</Link>

        <div className="navbar__links">
          <Link href={route('home')} className={`navbar__link ${route().current('home') ? 'navbar__link--active' : ''}`}>الرئيسية</Link>
          <Link href={route('menu')} className={`navbar__link ${route().current('menu') ? 'navbar__link--active' : ''}`}>القائمة</Link>
          <Link href={route('reserve')} className={`navbar__link ${route().current('reserve') ? 'navbar__link--active' : ''}`}>حجز طاولة</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {auth?.user ? (
            <>
              <Link
                href={auth.user.role === 'admin' ? route('admin.dashboard') : '/dashboard'}
                className="btn-secondary btn-sm"
              >
                {auth.user.role === 'admin' ? 'لوحة التحكم' : 'حسابي'}
              </Link>
              <IconButton onClick={handleMenu} sx={{ p: 0.5 }}>
                <Avatar sx={{ bgcolor: 'var(--gold-mid)', width: 32, height: 32, color: '#0A0A0A', fontSize: '0.875rem' }}>
                  {auth.user.name[0]}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{ sx: { bgcolor: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' } }}
              >
                <MenuItem onClick={handleLogout} sx={{ fontSize: 'var(--text-sm)' }}>تسجيل الخروج</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link href={route('login')} className="navbar__link">دخول</Link>
              <Link href={route('register')} className="btn-primary btn-sm">تسجيل</Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* AI Assistant */}
      {isAiEnabled === "0" ? null : <SamaWidget />}

      {/* Footer */}
      <footer style={{ paddingBlock: 'var(--space-10)', textAlign: 'center', borderBlockStart: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
        <Container>
          &copy; {new Date().getFullYear()} مائدة الشيف. جميع الحقوق محفوظة.
        </Container>
      </footer>
    </div>
  );
}
