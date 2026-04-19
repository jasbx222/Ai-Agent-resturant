import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Container, Grid, Typography, Box } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Contact() {
  return (
    <PublicLayout>
      <Head title="اتصل بنا - مائدة الشيف" />
      
      <Container maxWidth="lg" sx={{ py: 'var(--space-20)' }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>تواصل معنا</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginInline: 'auto' }}>
            نحن هنا للإجابة على تساؤلاتكم وجعل تجربتكم معنا مثالية.
          </p>
        </Box>

        <Grid container spacing={8}>
          <Grid item xs={12} md={5}>
            <div className="card-glass" style={{ height: '100%' }}>
              <h3 style={{ marginBottom: 'var(--space-8)', color: 'var(--gold-mid)' }}>معلومات الاتصال</h3>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <div className="badge badge-gold" style={{ width: 40, height: 40, justifyContent: 'center' }}>
                    <PlaceIcon fontSize="small" />
                  </div>
                  <Box>
                    <Typography sx={{ color: 'var(--text-primary)', fontWeight: 700 }}>الموقع</Typography>
                    <Typography sx={{ color: 'var(--text-secondary)' }}>حي العليا، شارع الأمير سلطان، الرياض</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <div className="badge badge-gold" style={{ width: 40, height: 40, justifyContent: 'center' }}>
                    <PhoneIcon fontSize="small" />
                  </div>
                  <Box>
                    <Typography sx={{ color: 'var(--text-primary)', fontWeight: 700 }}>الهاتف</Typography>
                    <Typography sx={{ color: 'var(--text-secondary)' }} dir="ltr">+966 11 234 5678</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <div className="badge badge-gold" style={{ width: 40, height: 40, justifyContent: 'center' }}>
                    <EmailIcon fontSize="small" />
                  </div>
                  <Box>
                    <Typography sx={{ color: 'var(--text-primary)', fontWeight: 700 }}>البريد الإلكتروني</Typography>
                    <Typography sx={{ color: 'var(--text-secondary)' }}>info@chefstable.sa</Typography>
                  </Box>
                </Box>
              </Box>

              <div style={{ marginTop: 'var(--space-12)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-base)', border: '1px solid var(--glass-border)' }}>
                <Typography variant="subtitle2" sx={{ color: 'var(--gold-mid)', mb: 2 }}>ساعات العمل</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  <span>يومياً</span>
                  <span>1:00 م - 12:00 ص</span>
                </Box>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={7}>
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>أرسل لنا رسالة</h3>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <div className="input-group">
                    <label className="input-label">الاسم</label>
                    <input type="text" className="input" placeholder="اسمك الكامل" />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="input-group">
                    <label className="input-label">البريد الإلكتروني</label>
                    <input type="email" className="input" placeholder="email@example.com" />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="input-group">
                    <label className="input-label">الموضوع</label>
                    <input type="text" className="input" placeholder="كيف يمكننا مساعدتك؟" />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="input-group">
                    <label className="input-label">الرسالة</label>
                    <textarea className="input" rows={6} placeholder="اكتب رسالتك هنا..." />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <button className="btn-primary" style={{ width: '100%' }}>إرسال الرسالة</button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  );
}
