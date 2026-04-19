import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Index({ reservations }: any) {
  const updateStatus = (id: number, status: string) => {
    router.patch(route('admin.reservations.status', id), { status });
  };

  const deleteReservation = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      router.delete(route('admin.reservations.destroy', id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <span className="badge badge-confirmed">مؤكد</span>;
      case 'cancelled': return <span className="badge badge-cancelled">ملغي</span>;
      case 'pending': return <span className="badge badge-pending">قيد الانتظار</span>;
      case 'seated': return <span className="badge badge-seated">حضر</span>;
      case 'completed': return <span className="badge badge-completed">مكتمل</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <AdminLayout>
      <Head title="إدارة الحجوزات" />
      
      <Box sx={{ mb: 4 }}>
        <h1 style={{ fontSize: 'var(--text-2xl)' }}>الحجوزات</h1>
        <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>متابعة وإدارة حجوزات الطاولات في المطعم.</Typography>
      </Box>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>العميل</th>
              <th>التاريخ والوقت</th>
              <th>عدد الأشخاص</th>
              <th>الحالة</th>
              <th>العمليات</th>
            </tr>
          </thead>
          <tbody>
            {(reservations || []).map((res: any) => (
              <tr key={res.id}>
                <td>
                  <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>{res.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>{res.email}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon sx={{ fontSize: 16, color: 'var(--gold-mid)' }} />
                    <span className="num-arabic">{res.date} في {res.time_slot}</span>
                  </Box>
                </td>
                <td className="num-arabic">{res.party_size} أشخاص</td>
                <td>{getStatusBadge(res.status)}</td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {res.status === 'pending' && (
                      <Tooltip title="تأكيد">
                        <IconButton size="small" onClick={() => updateStatus(res.id, 'confirmed')} sx={{ color: 'var(--success)' }}>
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {['pending', 'confirmed'].includes(res.status) && (
                      <Tooltip title="إلغاء">
                        <IconButton size="small" onClick={() => updateStatus(res.id, 'cancelled')} sx={{ color: 'var(--danger)' }}>
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <IconButton size="small" onClick={() => deleteReservation(res.id)} sx={{ color: 'var(--text-muted)' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
