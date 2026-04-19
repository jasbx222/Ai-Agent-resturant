import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Container, Grid, Typography } from '@mui/material';

export default function Menu({ dishes, categories, currentCategory }: any) {

  console.log(dishes)
  return (
    <PublicLayout>
      <Head title="قائمة الطعام الفاخرة" />

      <Container maxWidth="lg">
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <h1 style={{ fontSize: 'var(--text-hero)', marginBottom: 'var(--space-4)' }}>القائمة</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginInline: 'auto' }}>
            نقدم لكم تشكيلة مختارة من الأطباق التي تجمع بين الفن والنكهة، محضرة يدوياً بكل حب وشغف.
          </p>
        </header>

        {/* Category Filters */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div className="filter-tabs">
            <Link
              href={route('menu')}
              className={`filter-tab ${!currentCategory || currentCategory === 'all' ? 'filter-tab--active' : ''}`}
            >
              الكل
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={route('menu', { category: cat.id })}
                className={`filter-tab ${currentCategory?.toString() === cat.id.toString() ? 'filter-tab--active' : ''}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Dish Grid */}
        <Grid container spacing={4}>
          {(dishes || []).map((dish: any, i: number) => (
            <Grid item xs={12} md={6} key={dish.id}>
              <Link
                href={route('menu.show', { dish: dish.slug || dish.id })}
                className="dish-card animate-fade-up"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '200px',
                  animationDelay: `${i * 100}ms`
                }}
              >
                <img
                  src={`/storage/${dish.image}`}
                  alt={dish.name}
                  className="dish-card__image"
                  style={{ width: '180px', height: '100%', aspectRatio: 'auto' }}
                />
                <div className="dish-card__body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className="dish-card__name">{dish.name}</h3>
                    <p className="dish-card__price" style={{ margin: 0, fontSize: 'var(--text-lg)' }}>{dish.price} ر.س</p>
                  </div>
                  <p className="dish-card__desc" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {dish.description}
                  </p>
                  <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
                    {dish.is_vegan && <span className="badge badge-vegan">نباتي</span>}
                    {dish.is_spicy && <span className="badge badge-spicy">حار</span>}
                  </div>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PublicLayout>
  );
}
