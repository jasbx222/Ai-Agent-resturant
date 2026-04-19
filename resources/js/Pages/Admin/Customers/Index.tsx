import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip } from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface CustomersProps {
  customers: User[];
}

export default function Customers({ customers }: CustomersProps) {
  return (
    <AdminLayout>
      <Head title="إدارة العملاء" />

      <Typography variant="h4" sx={{ color: '#F5F0E8', mb: 4, fontFamily: '"Amiri", serif' }}>
        إدارة العملاء
      </Typography>

      <TableContainer component={Paper} sx={{ bgcolor: '#111', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
            <TableRow>
              <TableCell sx={{ color: '#888' }}>العميل</TableCell>
              <TableCell sx={{ color: '#888' }}>البريد الإلكتروني</TableCell>
              <TableCell sx={{ color: '#888' }}>رقم الهاتف</TableCell>
              <TableCell sx={{ color: '#888' }}>تاريخ التسجيل</TableCell>
              <TableCell sx={{ color: '#888' }}>الحالة</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(customers || []).map((customer) => (
              <TableRow key={customer.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.01)' } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#C9A84C' }}>{customer.name?.[0]}</Avatar>
                    <Typography sx={{ color: '#F5F0E8' }}>{customer.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: '#888' }}>{customer.email}</TableCell>
                <TableCell sx={{ color: '#888' }}>{customer.phone || '—'}</TableCell>
                <TableCell sx={{ color: '#888' }}>{new Date(customer.created_at).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell>
                  <Chip label="نشط" size="small" sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', border: '1px solid rgba(76, 175, 80, 0.2)' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
