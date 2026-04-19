import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Box, Typography, Container, Paper, TextField, Button, Grid, Divider } from '@mui/material';

export default function Profile({ mustVerifyEmail, status }: any) {
  const user = (usePage().props.auth as any).user;

  const { data, setData, patch, processing, errors } = useForm({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <PublicLayout>
      <Head title="الملف الشخصي" />
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ fontFamily: '"Amiri", serif', mb: 4, color: '#C9A84C' }}>إعدادات الحساب</Typography>
        
        <Paper sx={{ p: 4, bgcolor: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: '#F5F0E8', mb: 3 }}>المعلومات الشخصية</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField 
                fullWidth label="الاسم" variant="outlined" 
                value={data.name} onChange={e => setData('name', e.target.value)}
                error={!!errors.name} helperText={errors.name}
                sx={{ '& .MuiOutlinedInput-root': { color: '#F5F0E8' }, '& .MuiInputLabel-root': { color: '#888' } }}
              />
              <TextField 
                fullWidth label="البريد الإلكتروني" variant="outlined" 
                value={data.email} onChange={e => setData('email', e.target.value)}
                error={!!errors.email} helperText={errors.email}
                sx={{ '& .MuiOutlinedInput-root': { color: '#F5F0E8' }, '& .MuiInputLabel-root': { color: '#888' } }}
              />
              <Button 
                variant="contained" type="submit" 
                disabled={processing}
                sx={{ bgcolor: '#C9A84C', color: '#0A0A0A', py: 1.5, '&:hover': { bgcolor: '#E2C97E' } }}
              >
                حفظ التغييرات
              </Button>
            </Box>
          </form>
        </Paper>

        <Paper sx={{ p: 4, mt: 4, bgcolor: '#111', border: '1px solid rgba(244, 67, 54, 0.2)', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: '#f44336', mb: 2 }}>منطقة الخطر</Typography>
          <Typography variant="body2" sx={{ color: '#888', mb: 3 }}>حذف الحساب سيؤدي إلى مسح كافة بياناتك بشكل دائم.</Typography>
          <Button variant="outlined" color="error">حذف الحساب</Button>
        </Paper>
      </Container>
    </PublicLayout>
  );
}
