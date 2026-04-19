import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home({ featuredDishes }: { featuredDishes: any[] }) {
  return (
    <PublicLayout>
      <Head title="مائدة الشيف - تجربة طعام فاخرة" />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg">
          <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1950&q=80" alt="Restaurant Background" />
        </div>
        <div className="hero__overlay"></div>
        
        <div className="hero__content animate-fade-up">
          <Typography className="hero__eyebrow">مرحباً بكم في مائدة الشيف</Typography>
          <h1 className="hero__title">
            تجربة طعام <em>مميزة</em> تداعب الحواس
          </h1>
          <p className="hero__subtitle">
            نحن نجمع بين أجود المكونات المحلية والتقنيات العالمية لنقدم لكم سيمفونية من النكهات التي لا تُنسى في قلب الرياض.
          </p>
          <div className="hero__actions">
            <Link href={route('reserve')} className="btn-primary btn-lg">احجز طاولتك</Link>
            <Link href={route('menu')} className="btn-secondary btn-lg">استكشف القائمة</Link>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section style={{ paddingBlock: 'var(--space-32) var(--space-20)' }}>
        <div className="container">
          <div className="section-divider">
            <span className="section-divider__icon">✨</span>
          </div>
          
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-12)', fontSize: 'var(--text-3xl)' }}>
            أطباق مختارة بعناية
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: 'var(--space-8)' 
          }}>
            {(featuredDishes || []).map((dish, i) => (
              <Link 
                key={i} 
                href={route('menu.show', { dish: dish.slug || dish.id })} 
                className="dish-card animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img src={dish.image_url} alt={dish.name} className="dish-card__image" />
                <div className="dish-card__body">
                  <div className="badge badge-gold" style={{ marginBottom: 'var(--space-2)' }}>طبق مميز</div>
                  <h3 className="dish-card__name">{dish.name}</h3>
                  <p className="dish-card__desc">{dish.description}</p>
                  <p className="dish-card__price">{dish.price} ريال</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
            <Link href={route('menu')} className="btn-ghost">عرض كافة الأطباق</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

// Inline helper for consistency with the brief
function Typography({ children, className }: any) {
  return <p className={className}>{children}</p>;
}
