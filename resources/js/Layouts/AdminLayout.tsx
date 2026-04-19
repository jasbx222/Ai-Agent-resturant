import React, { useState } from 'react';
import { 
  Box, IconButton, Avatar, Menu, MenuItem, Typography, 
  Drawer, Divider, List, ListItem, ListItemIcon, ListItemText 
} from '@mui/material';
import { Link, usePage, router } from '@inertiajs/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage().props as any;
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: 'لوحة التحكم', icon: <DashboardIcon />, href: route('admin.dashboard'), name: 'admin.dashboard' },
    { label: 'إدارة القائمة', icon: <RestaurantMenuIcon />, href: route('admin.menu'), name: 'admin.menu' },
    { label: 'الحجوزات', icon: <EventAvailableIcon />, href: route('admin.reservations'), name: 'admin.reservations' },
    { label: 'مراقب سما', icon: <SmartToyIcon />, href: route('admin.ai-monitor'), name: 'admin.ai-monitor' },
    { label: 'العملاء', icon: <PeopleIcon />, href: route('admin.customers'), name: 'admin.customers' },
    { label: 'الإعدادات', icon: <SettingsIcon />, href: route('admin.settings'), name: 'admin.settings' },
  ];

  const handleLogout = () => router.post(route('logout'));

  const sidebarContent = (
    <Box 
      component="aside" 
      className="admin-sidebar" 
      sx={{ 
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box'
      }}
    >
      <div className="admin-sidebar__logo" style={{ padding: 'var(--space-8) var(--space-6)', textAlign: 'center' }}>
        <Typography variant="h5" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-mid)', fontWeight: 700 }}>
          مائدة الشيف
        </Typography>
        <Typography variant="caption" style={{ color: 'var(--text-muted)' }}>لوحة الإدارة الفاخرة</Typography>
      </div>

      <nav className="admin-nav" style={{ flex: 1, paddingInline: 'var(--space-2)' }}>
        {menuItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href} 
            className={`admin-nav__item ${route().current(item.name) ? 'admin-nav__item--active' : ''}`}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={{ padding: 'var(--space-4)', borderBlockStart: '1px solid var(--glass-border)' }}>
        <button 
          onClick={handleLogout}
          className="admin-nav__item" 
          style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--danger)' }}
        >
          <LogoutIcon fontSize="small" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </Box>
  );

  return (
    <div className="admin-layout">
      {/* Desktop Sidebar */}
      {sidebarContent}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { bgcolor: 'var(--bg-secondary)', width: 280 } }}
      >
        {sidebarContent}
      </Drawer>

      <main className="admin-main">
        {/* Top Header */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 'var(--space-10)',
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--glass-border)' 
        }}>
          <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, color: 'var(--gold-mid)', mr: 2 }}>
            <MenuIcon />
          </IconButton>
          
          <Box />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>{auth.user?.name}</Typography>
              <Typography variant="caption" sx={{ color: 'var(--gold-mid)' }}>مدير النظام</Typography>
            </Box>
            <Avatar 
              sx={{ bgcolor: 'var(--gold-glow)', color: 'var(--gold-mid)', border: '1px solid var(--gold-border)', width: 40, height: 40 }}
            >
              {auth.user?.name?.[0]}
            </Avatar>
          </Box>
        </header>

        {/* Page Content */}
        <section className="animate-fade-up">
          {children}
        </section>
      </main>

      <style>{`
        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }
        .admin-nav__item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-3) var(--space-6);
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 200ms ease;
          border-radius: var(--radius-md);
        }
        .admin-nav__item:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .admin-nav__item--active {
          background: var(--gold-glow);
          color: var(--gold-mid);
          border-inline-start: 3px solid var(--gold-mid);
        }
      `}</style>
    </div>
  );
}
