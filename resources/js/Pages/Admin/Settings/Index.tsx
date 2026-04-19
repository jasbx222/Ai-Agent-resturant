import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import {
  Box, Typography, Paper, Grid, TextField, Button, Switch,
  FormControlLabel, Divider, Snackbar, Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface SettingsProps {
  settings: Record<string, string>;
}

export default function Settings({ settings }: SettingsProps) {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { data, setData, patch, processing, errors } = useForm({
    settings: {
      restaurant_name: settings.restaurant_name || 'مائدة الشيف',
      opening_time: settings.opening_time || '12:00',
      closing_time: settings.closing_time || '23:00',
      ai_enabled: settings.ai_enabled === '1' || settings.ai_enabled === 'true',
      max_party_size: settings.max_party_size || '10',
      contact_email: settings.contact_email || 'info@maidathalchef.com',
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route('admin.settings.update'), {
      onSuccess: () => setSnackbar({ open: true, message: 'تم حفظ الإعدادات بنجاح', severity: 'success' }),
      onError: () => setSnackbar({ open: true, message: 'حدث خطأ أثناء حفظ الإعدادات', severity: 'error' })
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setData('settings', {
      ...data.settings,
      [key]: value
    });
  };

  return (
    <AdminLayout>
      <Head title="إعدادات النظام" />

      <Typography variant="h4" sx={{ color: '#F5F0E8', mb: 4, fontFamily: '"Amiri", serif' }}>
        إعدادات النظام
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, bgcolor: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: '#C9A84C', mb: 3, fontFamily: '"Amiri", serif' }}>الإعدادات العامة</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth label="اسم المطعم" variant="outlined"
                  value={data.settings.restaurant_name}
                  onChange={e => handleSettingChange('restaurant_name', e.target.value)}
                  error={!!errors['settings.restaurant_name']}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#F5F0E8' }, '& .MuiInputLabel-root': { color: '#888' } }}
                />
                <TextField
                  fullWidth label="البريد الإلكتروني للتواصل" variant="outlined"
                  value={data.settings.contact_email}
                  onChange={e => handleSettingChange('contact_email', e.target.value)}
                  error={!!errors['settings.contact_email']}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#F5F0E8' }, '& .MuiInputLabel-root': { color: '#888' } }}
                />
                <TextField
                  fullWidth label="أقصى عدد للأشخاص في الحجز" type="number" variant="outlined"
                  value={data.settings.max_party_size}
                  onChange={e => handleSettingChange('max_party_size', e.target.value)}
                  error={!!errors['settings.max_party_size']}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#F5F0E8' }, '& .MuiInputLabel-root': { color: '#888' } }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, bgcolor: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: '#C9A84C', mb: 3, fontFamily: '"Amiri", serif' }}>ساعات العمل والذكاء الاصطناعي</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth label="وقت الافتتاح" type="time" variant="outlined"
                      value={data.settings.opening_time}
                      onChange={e => handleSettingChange('opening_time', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { color: '#F5F0E8' }, '& .MuiInputLabel-root': { color: '#888' } }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth label="وقت الإغلاق" type="time" variant="outlined"
                      value={data.settings.closing_time}
                      onChange={e => handleSettingChange('closing_time', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { color: '#F5F0E8' }, '& .MuiInputLabel-root': { color: '#888' } }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', my: 1 }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={data.settings.ai_enabled}
                      onChange={e => handleSettingChange('ai_enabled', e.target.checked)}
                      sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#C9A84C' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#C9A84C' } }}
                    />
                  }
                  label={<Typography sx={{ color: '#F5F0E8' }}>تفعيل المساعد الذكي "سما"</Typography>}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button

              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={processing}
              sx={{ bgcolor: '#C9A84C', color: '#0A0A0A', px: 4, py: 1.5, '&:hover': { bgcolor: '#E2C97E' } }}
            >
              حفظ جميع الإعدادات
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
}
