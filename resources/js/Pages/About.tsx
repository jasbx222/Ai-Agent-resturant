import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Container, Box, Typography, Grid } from '@mui/material';

export default function About() {
  return (
    <PublicLayout>
      <Head title="عن مائدة الشيف" />
      
      <Container maxWidth="lg" sx={{ py: 'var(--space-20)' }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <div className="animate-fade-up">
              <Typography className="hero__eyebrow" sx={{ mb: 2 }}>قصتنا</Typography>
              <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)' }}>شغف بالتميز، وفن في التقديم</h1>
              <Box sx={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 3, lineHeight: 2 }}>
                <p>
                  بدأت حكاية "مائدة الشيف" من حلم بسيط: ابتكار وجهة تجمع بين الدفء العربي التقليدي وفخامة المطابخ العالمية. نحن نؤمن أن الطعام ليس مجرد غذاء، بل هو تجربة إنسانية متكاملة تخاطب جميع الحواس.
                </p>
                <p>
                  يختار طهاتنا المكونات بعناية فائقة من المزارع المحلية، مع الاستعانة بأفضل التقنيات الحديثة لضمان جودة استثنائية في كل طبق نقدمه.
                </p>
              </Box>
              
              <div className="section-divider" style={{ marginBlock: 'var(--space-10)' }}>
                <span className="section-divider__icon">⚜️</span>
              </div>

              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <div className="kpi-card" style={{ textAlign: 'center' }}>
                    <div className="kpi-card__value" style={{ color: 'var(--gold-mid)' }}>15+</div>
                    <div className="kpi-card__label">عاماً من الخبرة</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="kpi-card" style={{ textAlign: 'center' }}>
                    <div className="kpi-card__value" style={{ color: 'var(--gold-mid)' }}>50+</div>
                    <div className="kpi-card__label">أطباق مبتكرة</div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="card-glass" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
              <img 
                src="https://images.unsplash.com/photo-1550966841-3ee32007f300?auto=format&fit=crop&w=1000&q=80" 
                alt="Chef at work" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  );
}
