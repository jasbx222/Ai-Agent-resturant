import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Container, Box } from '@mui/material';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <PublicLayout>
      <Head title="تسجيل الدخول - مائدة الشيف" />
      
      <Container maxWidth="xs" sx={{ py: 'var(--space-20)' }}>
        <div className="card-glass animate-fade-up">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <h1 className="text-gold" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>دخول الأعضاء</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              أهلاً بك مجدداً في مائدة الشيف
            </p>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              
              <div className="input-group">
                <label className="input-label">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className={`input ${errors.email ? 'input--error' : ''}`}
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  placeholder="email@example.com"
                  dir="ltr"
                />
                {errors.email && <span className="input-error-msg">{errors.email}</span>}
              </div>

              <div className="input-group">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="input-label" style={{ marginBottom: 0 }}>كلمة المرور</label>
                  <Link href={route('password.request')} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none' }}>نسيت الكلمة؟</Link>
                </Box>
                <input 
                  type="password" 
                  className={`input ${errors.password ? 'input--error' : ''}`}
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                />
                {errors.password && <span className="input-error-msg">{errors.password}</span>}
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={data.remember}
                  onChange={e => setData('remember', e.target.checked)}
                  style={{ accentColor: 'var(--gold-mid)' }}
                />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>تذكرني</span>
              </label>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={processing}
                style={{ width: '100%', marginTop: 'var(--space-2)' }}
              >
                {processing ? 'جاري الدخول...' : 'تسجيل الدخول'}
              </button>

            </Box>
          </form>

          <Box sx={{ mt: 5, textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            ليس لديك حساب؟ <Link href={route('register')} className="text-gold" style={{ textDecoration: 'none', fontWeight: 500 }}>سجل الآن</Link>
          </Box>
        </div>
      </Container>
    </PublicLayout>
  );
}
