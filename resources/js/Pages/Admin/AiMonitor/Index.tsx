import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function Index({ conversations }: any) {
  return (
    <AdminLayout>
      <Head title="مراقب المحادثات الذكية" />
      
      <Box sx={{ mb: 4 }}>
        <h1 style={{ fontSize: 'var(--text-2xl)' }}>مراقب سما (AI Monitor)</h1>
        <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>متابعة وتحليل تفاعلات العملاء مع مرافقتكم الذكية "سما".</Typography>
      </Box>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>المعرف</th>
              <th>العميل</th>
              <th>عدد الرسائل</th>
              <th>آخر ظهور</th>
              <th>الأداء</th>
              <th>العمليات</th>
            </tr>
          </thead>
          <tbody>
            {(conversations || []).map((conv: any) => (
              <tr key={conv.id}>
                <td>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SmartToyIcon sx={{ fontSize: 16, color: 'var(--gold-mid)' }} />
                    <span className="num-arabic">#{conv.id}</span>
                  </Box>
                </td>
                <td>
                  <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {conv.user?.name || conv.session_id.substring(0, 8)}
                  </Typography>
                </td>
                <td className="num-arabic">{conv.messages_count} رسائل</td>
                <td>
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>{conv.updated_at_human}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <div style={{ 
                      width: 50, 
                      height: 4, 
                      borderRadius: 2, 
                      bgcolor: 'var(--bg-elevated)', 
                      overflow: 'hidden', 
                      position: 'relative' 
                    }}>
                      <div style={{ 
                        width: '85%', 
                        height: '100%', 
                        background: 'var(--gold-mid)',
                        position: 'absolute'
                      }} />
                    </div>
                    <span style={{ fontSize: 10, color: 'var(--gold-mid)' }}>85%</span>
                  </Box>
                </td>
                <td>
                  <Tooltip title="عرض المحادثة">
                    <Link href={route('admin.ai-monitor.conversation', conv.id)}>
                      <IconButton size="small" sx={{ color: 'var(--gold-mid)' }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
