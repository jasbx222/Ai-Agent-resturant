import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { Container, Grid, Box } from '@mui/material';

type ReservationForm = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  party_size: number;
  special_requests: string;
};

export default function Reservation({ status }: any) {
  const { data, setData, post, processing, errors, reset } = useForm<ReservationForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time_slot: '',
    party_size: 2,
    special_requests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('reserve.store'), {
      onSuccess: () =>
        reset('name', 'email', 'phone', 'date', 'time_slot', 'party_size', 'special_requests'),
    });
  };

  return (
    <PublicLayout>
      <Head title="حجز طاولة - مائدة الشيف" />

      <Container maxWidth="md" sx={{ py: 'var(--space-20)' }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
            احجز طاولتك
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              marginInline: 'auto',
            }}
          >
            اختر وقتك المفضل وسنقوم بالاعتناء بكافة التفاصيل لتوفير تجربة استثنائية لك ولضيوفك.
          </p>
        </Box>

        {status === 'success' ? (
          <div className="card-glass animate-fade-up" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 'var(--space-4)' }}>🎉</div>
            <h2 style={{ color: 'var(--gold-mid)', marginBottom: 'var(--space-2)' }}>
              تم استلام طلب الحجز بنجاح
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              سنتواصل معك عبر البريد الإلكتروني لتأكيد الحجز قريباً.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="animate-fade-up">
            <div className="card" style={{ marginBottom: 'var(--space-8)' }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <div className="input-group">
                    <label className="input-label">الاسم الكامل</label>
                    <input
                      type="text"
                      className={`input ${errors.name ? 'input--error' : ''}`}
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="أدخل اسمك الكريم"
                    />
                    {errors.name && <span className="input-error-msg">{errors.name}</span>}
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="input-group">
                    <label className="input-label">البريد الإلكتروني</label>
                    <input
                      type="email"
                      className={`input ${errors.email ? 'input--error' : ''}`}
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="لإرسال تفاصيل التأكيد"
                    />
                    {errors.email && <span className="input-error-msg">{errors.email}</span>}
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="input-group">
                    <label className="input-label">التاريخ</label>
                    <input
                      type="date"
                      className={`input ${errors.date ? 'input--error' : ''}`}
                      value={data.date}
                      onChange={(e) => setData('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.date && <span className="input-error-msg">{errors.date}</span>}
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="input-group">
                    <label className="input-label">الوقت</label>
                    <input
                      type="time"
                      className={`input ${errors.time_slot ? 'input--error' : ''}`}
                      value={data.time_slot}
                      onChange={(e) => setData('time_slot', e.target.value)}
                      min="13:00"
                      max="23:30"
                    />
                    {errors.time_slot && (
                      <span className="input-error-msg">{errors.time_slot}</span>
                    )}
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="input-group">
                    <label className="input-label">عدد الأشخاص</label>
                    <select
                      className={`input ${errors.party_size ? 'input--error' : ''}`}
                      value={data.party_size}
                      onChange={(e) => setData('party_size', parseInt(e.target.value, 10))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'شخص' : 'أشخاص'}
                        </option>
                      ))}
                    </select>
                    {errors.party_size && (
                      <span className="input-error-msg">{errors.party_size}</span>
                    )}
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="input-group">
                    <label className="input-label">رقم الهاتف</label>
                    <input
                      type="tel"
                      className={`input ${errors.phone ? 'input--error' : ''}`}
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      placeholder="05xxxxxxx"
                    />
                    {errors.phone && <span className="input-error-msg">{errors.phone}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div className="input-group">
                    <label className="input-label">طلبات خاصة</label>
                    <textarea
                      className={`input ${errors.special_requests ? 'input--error' : ''}`}
                      rows={4}
                      value={data.special_requests}
                      onChange={(e) => setData('special_requests', e.target.value)}
                      placeholder="هل تود إخبارنا بأي تفاصيل حول الحساسية أو مناسبة خاصة؟"
                    />
                    {errors.special_requests && (
                      <span className="input-error-msg">{errors.special_requests}</span>
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                className="btn-primary btn-lg"
                disabled={processing}
                style={{ width: 'min(100%, 300px)' }}
              >
                {processing ? 'جاري الإرسال...' : 'تأكيد طلب الحجز'}
              </button>
            </div>
          </form>
        )}
      </Container>
    </PublicLayout>
  );
}