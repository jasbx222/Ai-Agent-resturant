import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Container, Box } from '@mui/material';

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <PublicLayout>
      <Head title="تسجيل حساب جديد - مائدة الشيف" />
      
      <Container maxWidth="xs" sx={{ py: 'var(--space-20)' }}>
        <div className="card-glass animate-fade-up">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <h1 className="text-gold" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>إنشاء حساب</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              انضم إلينا للاستمتاع بتجربة طعام استثنائية
            </p>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              
              <div className="input-group">
                <label className="input-label">الاسم الكامل</label>
                <input 
                  type="text" 
                  className={`input ${errors.name ? 'input--error' : ''}`}
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  placeholder="محمد عبدالله"
                />
                {errors.name && <span className="input-error-msg">{errors.name}</span>}
              </div>

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
                <label className="input-label">كلمة المرور</label>
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

              <div className="input-group">
                <label className="input-label">تأكيد كلمة المرور</label>
                <input 
                  type="password" 
                  className={`input ${errors.password_confirmation ? 'input--error' : ''}`}
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                />
                {errors.password_confirmation && <span className="input-error-msg">{errors.password_confirmation}</span>}
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={processing}
                style={{ width: '100%', marginTop: 'var(--space-2)' }}
              >
                {processing ? 'جاري التسجيل...' : 'تسجيل الحساب'}
              </button>

            </Box>
          </form>

          <Box sx={{ mt: 5, textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            لديك حساب بالفعل؟ <Link href={route('login')} className="text-gold" style={{ textDecoration: 'none', fontWeight: 500 }}>سجل الدخول</Link>
          </Box>
        </div>
      </Container>
    </PublicLayout>
  );
}
