import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import {
  Box, Typography, Button, IconButton, TextField,
  Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Index({ dishes, categories }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<any>(null);

  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image: null as File | string | null,
    is_available: true,
    is_featured: false,
    is_spicy: false,
    is_vegan: false,
  });

  const handleOpenDialog = (dish: any = null) => {
    if (dish) {
      setEditingDish(dish);
      setData({
        name: dish.name ?? '',
        description: dish.description ?? '',
        price: dish.price ?? '',
        category_id: dish.category_id ?? '',
        image: dish.image ?? null,
        is_available: dish.is_available ?? true,
        is_featured: dish.is_featured ?? false,
        is_spicy: dish.is_spicy ?? false,
        is_vegan: dish.is_vegan ?? false,
      });
    } else {
      setEditingDish(null);
      reset();
    }
    setIsDialogOpen(true);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingDish) {
      post(route('admin.menu.update', editingDish.id), {
        forceFormData: true,
        data: {
          ...data,
          _method: 'put',
        },
        onSuccess: () => {
          setIsDialogOpen(false);
          reset();
        },
      });
    } else {
      post(route('admin.menu.store'), {
        forceFormData: true,
        onSuccess: () => {
          setIsDialogOpen(false);
          reset();
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الطبق؟')) {
      destroy(route('admin.menu.destroy', id));
    }
  };

  return (
    <AdminLayout>
      <Head title="إدارة القائمة" />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <h1 style={{ fontSize: 'var(--text-2xl)' }}>إدارة قائمة الطعام</h1>
        <button onClick={() => handleOpenDialog()} className="btn-primary">
          <AddIcon sx={{ ml: 1 }} fontSize="small" /> إضافة طبق جديد
        </button>
      </Box>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>الطبق</th>
              <th>التصنيف</th>
              <th>السعر</th>
              <th>الحالة</th>
              <th>العمليات</th>
            </tr>
          </thead>
          <tbody>
            {(dishes || []).map((dish: any) => (
              <tr key={dish.id}>
                <td>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={dish.image} alt={dish.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                    <Box>
                      <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>{dish.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>{dish.slug}</Typography>
                    </Box>
                  </Box>
                </td>
                <td>{dish.category?.name}</td>
                <td className="num-arabic" style={{ color: 'var(--gold-mid)', fontWeight: 700 }}>{dish.price} ر.س</td>
                <td>
                  <span className={`badge ${dish.is_active ? 'badge-confirmed' : 'badge-cancelled'}`}>
                    {dish.is_active ? 'نشط' : 'متوقف'}
                  </span>
                </td>
                <td>
                  <IconButton onClick={() => handleOpenDialog(dish)} size="small" sx={{ color: 'var(--gold-mid)' }}><EditIcon fontSize="small" /></IconButton>
                  <IconButton onClick={() => handleDelete(dish.id)} size="small" sx={{ color: 'var(--danger)' }}><DeleteIcon fontSize="small" /></IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { bgcolor: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' } }}
      >
        <DialogTitle sx={{ fontFamily: 'var(--font-display)', color: 'var(--gold-mid)' }}>
          {editingDish ? 'تعديل طبق' : 'إضافة طبق جديد'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="اسم الطبق" variant="outlined"
                  value={data.name} onChange={e => setData('name', e.target.value)}
                  error={!!errors.name} helperText={errors.name}
                  sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)' }, '& .MuiInputLabel-root': { color: 'var(--text-muted)' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="السعر" variant="outlined"
                  value={data.price} onChange={e => setData('price', e.target.value)}
                  error={!!errors.price} helperText={errors.price}
                  sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)' }, '& .MuiInputLabel-root': { color: 'var(--text-muted)' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: 'var(--text-muted)' }}>التصنيف</InputLabel>
                  <Select
                    value={data.category_id}
                    label="التصنيف"
                    onChange={e => setData('category_id', e.target.value)}
                    sx={{ color: 'var(--text-primary)', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {categories.map((cat: any) => (
                      <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="file"
                  variant="outlined"
                  inputProps={{ accept: "image/*" }}
                  onChange={(e) => setData('image', e.target.files[0])}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: 'var(--text-primary)' },
                    '& .MuiInputLabel-root': { color: 'var(--text-muted)' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth multiline rows={3} label="الوصف" variant="outlined"
                  value={data.description} onChange={e => setData('description', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)' }, '& .MuiInputLabel-root': { color: 'var(--text-muted)' } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <button type="button" onClick={() => setIsDialogOpen(false)} className="btn-ghost">إلغاء</button>
            <button type="submit" disabled={processing} className="btn-primary">
              {editingDish ? 'حفظ التعديلات' : 'إضافة الطبق'}
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </AdminLayout>
  );
}
