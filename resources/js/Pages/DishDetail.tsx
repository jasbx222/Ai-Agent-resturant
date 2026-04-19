import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Box, Typography, Container, Grid, Paper, Button, Divider, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DishDetail({ dish }: any) {
  if (!dish) return <PublicLayout><Container><Typography>الطبق غير موجود</Typography></Container></PublicLayout>;

  return (
    <PublicLayout>
      <Head title={dish.name} />
      <Container maxWidth="lg">
        <Button 
          component={Link} 
          href={route('menu')} 
          startIcon={<ArrowBackIcon sx={{ ml: 1, mr: 0 }} />} 
          sx={{ mb: 4, color: '#C9A84C' }}
        >
          العودة للقائمة
        </Button>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ overflow: 'hidden', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)', bgcolor: '#111' }}>
              <Box component="img" src={dish.image_url} sx={{ width: '100%', height: 'auto', display: 'block' }} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h3" sx={{ fontFamily: '"Amiri", serif', color: '#F5F0E8', mb: 1 }}>{dish.name}</Typography>
              <Chip label={dish.category?.name} sx={{ bgcolor: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }} />
            </Box>
            
            <Typography variant="h4" sx={{ color: '#C9A84C', fontWeight: 'bold' }}>{dish.price} ريال</Typography>
            
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            
            <Box>
              <Typography variant="h6" sx={{ color: '#F5F0E8', mb: 2 }}>عن الطبق:</Typography>
              <Typography variant="body1" sx={{ color: '#888', lineHeight: 2 }}>{dish.description}</Typography>
            </Box>

            <Box sx={{ mt: 'auto', pt: 4 }}>
              <Button 
                variant="contained" 
                size="large" 
                component={Link} 
                href={route('reserve')}
                sx={{ bgcolor: '#C9A84C', color: '#0A0A0A', px: 6, py: 2, fontSize: '1.2rem', '&:hover': { bgcolor: '#E2C97E' } }}
              >
                احجز لتجربة هذا الطبق
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  );
}
