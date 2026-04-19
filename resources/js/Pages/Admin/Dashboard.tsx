import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Grid, Box, Typography, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { BarChart, LineChart } from '@mui/x-charts';

interface DashboardProps {
  stats: {
    todayReservations: number;
    totalReservations: number;
    activeDishes: number;
    aiConversations: number;
  };
  charts: {
    reservationHistory: { date: string, count: number }[];
    popularDishes: { name: string, count: number }[];
  };
}

export default function Dashboard({ stats, charts }: DashboardProps) {
  const kpiData = [
    { label: 'حجوزات اليوم', value: stats.todayReservations || 0, icon: <CalendarMonthIcon />, color: 'var(--gold-mid)', delta: '+12%', deltaUp: true },
    { label: 'إجمالي الحجوزات', value: stats.totalReservations || 0, icon: <TrendingUpIcon />, color: 'var(--success)', delta: '+5%', deltaUp: true },
    { label: 'الأطباق النشطة', value: stats.activeDishes || 0, icon: <RestaurantIcon />, color: 'var(--info)', delta: 'ثابت', deltaUp: true },
    { label: 'محادثات ذكية', value: stats.aiConversations || 0, icon: <SmartToyIcon />, color: 'var(--gold-bright)', delta: '+18%', deltaUp: true },
  ];

  return (
    <AdminLayout>
      <Head title="لوحة التحكم الفاخرة" />

      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-1)' }}>لوحة القيادة</h1>
        <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>مرحباً بك مجدداً، إليك ملخص أداء مائدة الشيف اليوم.</Typography>
      </div>

      {/* KPI Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {kpiData.map((kpi, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <div className="kpi-card">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ p: 1, borderRadius: 'var(--radius-md)', bgcolor: `${kpi.color}15`, color: kpi.color, display: 'flex' }}>
                  {kpi.icon}
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: kpi.deltaUp ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}
                >
                  {kpi.delta}
                </Typography>
              </Box>
              <div className="kpi-card__value">{kpi.value}</div>
              <div className="kpi-card__label">{kpi.label}</div>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <div className="card" style={{ height: '100%' }}>
            <h3 style={{ marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>
              نشاط الحجوزات
            </h3>

            <Box sx={{ height: 350, width: '100%' }}>
              {charts?.reservationHistory?.length > 0 ? (
                <LineChart
                  xAxis={[
                    {
                      data: charts.reservationHistory.map((d: any) => d.date),
                      scaleType: 'point',
                      tickLabelStyle: { fill: '#94a3b8', fontSize: 10 },
                    },
                  ]}
                  series={[
                    {
                      data: charts.reservationHistory.map((d: any) => Number(d.count) || 0),
                      color: '#C8A45D',
                      area: true,
                    },
                  ]}
                  height={300}
                  margin={{ left: 40, right: 20, top: 40, bottom: 40 }}
                  sx={{
                    '.MuiLineElement-root': { strokeWidth: 3 },
                    '.MuiAreaElement-root': {
                      fill: 'url(#goldGradient)',
                      opacity: 0.18,
                    },
                  }}
                >
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8A45D" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#C8A45D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </LineChart>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'var(--text-muted)',
                  }}
                >
                  لا توجد بيانات كافية
                </div>
              )}
            </Box>
          </div>
        </Grid>

        <Grid item xs={12} md={4}>
          <div className="card" style={{ height: '100%' }}>
            <h3 style={{ marginBottom: 'var(--space-6)', color: 'var(--text-primary)' }}>
              الأطباق الأكثر طلباً
            </h3>

            <Box sx={{ height: 350, width: '100%' }}>
              {charts?.popularDishes?.length > 0 ? (
                <BarChart
                  dataset={charts.popularDishes.map((d: any) => ({
                    name: d.name ?? '-',
                    count: Number(d.count) || 0,
                  }))}
                  yAxis={[
                    {
                      scaleType: 'band',
                      dataKey: 'name',
                      tickLabelStyle: { fill: '#94a3b8', fontSize: 10 },
                    },
                  ]}
                  series={[
                    {
                      dataKey: 'count',
                      color: '#A67C52',
                    },
                  ]}
                  layout="horizontal"
                  height={300}
                  margin={{ left: 70, right: 20, top: 20, bottom: 20 }}
                />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'var(--text-muted)',
                  }}
                >
                  لا توجد بيانات كافية
                </div>
              )}
            </Box>
          </div>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
