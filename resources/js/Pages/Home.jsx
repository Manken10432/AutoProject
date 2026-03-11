import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal.jsx';
import { useCountUp } from '@/hooks/useCountUp.js';

const WA_NUMBER = '526141234567';

const HERO_SLIDES = [
    'https://images.unsplash.com/photo-1552519491-37d8564f8fc4?w=1920&q=85',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=85',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85',
];

const BRANDS = ['NISSAN', 'TOYOTA', 'HONDA', 'CHEVROLET', 'FORD', 'VOLKSWAGEN', 'KIA', 'MAZDA', 'HYUNDAI', 'JEEP', 'RAM', 'AUDI'];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 2014 }, (_, i) => CURRENT_YEAR - i);

// ─── Hero Slider ───────────────────────────────────────────────────────────────
function HeroSlider({ current }) {
    return (
        <>
            {HERO_SLIDES.map((src, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url('${src}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: i === current ? 1 : 0,
                        transform: i === current ? 'scale(1)' : 'scale(1.04)',
                        transition: 'opacity 1.4s cubic-bezier(0.4,0,0.2,1), transform 1.4s cubic-bezier(0.4,0,0.2,1)',
                    }}
                />
            ))}
            {/* Cinematic overlays */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.2) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 240, background: 'linear-gradient(to top, #0c0c0c 0%, transparent 100%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)' }} />
        </>
    );
}

// ─── Stat with counter ────────────────────────────────────────────────────────
function StatCounter({ value, suffix = '', label }) {
    const numeric = parseInt(value.replace(/\D/g, ''), 10);
    const prefix = value.match(/^\+/) ? '+' : '';
    const [count, ref] = useCountUp(numeric, 1600);
    return (
        <div ref={ref}>
            <div className="stat-number" style={{ fontSize: '2.5rem' }}>
                {prefix}{count.toLocaleString('es-MX')}{suffix}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>
                {label}
            </div>
        </div>
    );
}

// ─── Vehicle Card ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle, index }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgRef = useRef(null);
    useEffect(() => { if (imgRef.current?.complete) setImgLoaded(true); }, []);

    return (
        <ScrollReveal delay={index % 3} direction="up">
            <Link href={route('vehicles.show', vehicle.id)} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="vehicle-card card-shine group" style={{ height: '100%' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', height: 215 }}>
                        {!imgLoaded && <div className="img-skeleton" style={{ position: 'absolute', inset: 0 }} />}
                        <img
                            ref={imgRef}
                            src={vehicle.first_image}
                            alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease', opacity: imgLoaded ? 1 : 0 }}
                            className="group-hover:scale-105"
                            loading="lazy"
                            onLoad={() => setImgLoaded(true)}
                        />
                        {vehicle.status === 'sold' && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ background: '#C3002F', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '0.4rem 1.25rem', letterSpacing: '0.12em', fontSize: '0.75rem' }}>VENDIDO</span>
                            </div>
                        )}
                        {vehicle.featured && (
                            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                <span style={{ background: '#C3002F', color: '#fff', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.2rem 0.6rem', letterSpacing: '0.08em', fontFamily: "'DM Sans', sans-serif" }}>DESTACADO</span>
                            </div>
                        )}
                        {/* Gradient overlay on hover */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)', opacity: 0, transition: 'opacity 0.3s ease' }} className="group-hover:opacity-100" />
                    </div>
                    <div style={{ padding: '1.25rem 1.375rem 1.5rem' }}>
                        <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#C3002F', marginBottom: '0.3rem', fontFamily: "'DM Sans', sans-serif" }}>
                            {vehicle.brand}
                        </div>
                        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.25rem', letterSpacing: '0.04em', color: '#f0f0f0', marginBottom: '0.5rem', lineHeight: 1.05 }}>
                            {vehicle.year} {vehicle.model}
                        </h3>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#C3002F', letterSpacing: '0.03em', marginBottom: '0.875rem' }}>
                            ${Number(vehicle.price).toLocaleString('es-MX')}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#555', borderTop: '1px solid #1c1c1c', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
                            <span>{Number(vehicle.mileage).toLocaleString('es-MX')} km</span>
                            <span style={{ color: '#2a2a2a' }}>·</span>
                            <span>{vehicle.fuel_type}</span>
                            <span style={{ color: '#2a2a2a' }}>·</span>
                            <span>{vehicle.transmission}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </ScrollReveal>
    );
}

// ─── Brand marquee ────────────────────────────────────────────────────────────
function BrandTicker() {
    const items = [...BRANDS, ...BRANDS]; // duplicate for seamless loop
    return (
        <div style={{ overflow: 'hidden', backgroundColor: '#0c0c0c', borderTop: '1px solid #1c1c1c', borderBottom: '1px solid #1c1c1c', padding: '1rem 0' }}>
            <div className="marquee-track">
                {items.map((brand, i) => (
                    <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem', paddingRight: '3rem' }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.125rem', letterSpacing: '0.18em', color: '#2a2a2a', whiteSpace: 'nowrap' }}>
                            {brand}
                        </span>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C3002F', flexShrink: 0 }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home({ featuredVehicles }) {
    const [heroSlide, setHeroSlide] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setHeroSlide(c => (c + 1) % HERO_SLIDES.length), 6000);
        return () => clearInterval(t);
    }, []);

    return (
        <PublicLayout
            title="AutoGalería — Seminuevos en Gómez Palacio, Durango"
            description="Los mejores seminuevos con garantía, financiamiento accesible y asesoría personalizada. Más de 10 años de confianza en la región."
            transparentNav
        >
            {/* ─── HERO ─── */}
            <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', backgroundColor: '#0c0c0c' }}>
                <HeroSlider current={heroSlide} />

                {/* Left accent bar */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#C3002F', zIndex: 10 }} />

                <div className="max-w-7xl mx-auto px-8 relative" style={{ zIndex: 10, width: '100%', paddingTop: '8rem', paddingBottom: '6rem' }}>
                    <div style={{ maxWidth: 700 }}>

                        {/* Overline */}
                        <div className="hero-a1" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.75rem' }}>
                            <div className="line-grow" style={{ width: 36, height: 2, background: '#C3002F' }} />
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C3002F' }}>
                                Gómez Palacio, Durango — Est. 2014
                            </span>
                        </div>

                        {/* Main headline */}
                        <h1 className="hero-a3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4.5rem,10vw,8rem)', lineHeight: 0.88, letterSpacing: '0.02em', color: '#ffffff', marginBottom: '1.75rem' }}>
                            EL AUTO<br />
                            <span style={{ color: '#C3002F', WebkitTextStroke: '0', textShadow: '0 0 60px rgba(195,0,47,0.4)' }}>QUE BUSCAS</span><br />
                            TE ESPERA
                        </h1>

                        {/* Subtext */}
                        <p className="hero-a4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'rgba(240,240,240,0.6)', lineHeight: 1.75, maxWidth: 460, marginBottom: '2.5rem' }}>
                            Seminuevos seleccionados y garantizados. Financiamiento accesible y asesoría personalizada sin presión.
                        </p>

                        {/* CTAs */}
                        <div className="hero-a4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href={route('vehicles.index')} className="btn-primary" style={{ fontSize: '0.8125rem' }}>
                                Ver Inventario
                            </Link>
                            <a
                                href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20me%20gustar%C3%ADa%20informes.`}
                                target="_blank" rel="noreferrer"
                                className="btn-ghost"
                                style={{ fontSize: '0.8125rem' }}
                            >
                                WhatsApp
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="hero-a6" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                            <StatCounter value="+150" label="Vehículos" />
                            <StatCounter value="10" suffix="+" label="Años de experiencia" />
                            <StatCounter value="500" suffix="+" label="Clientes satisfechos" />
                            <StatCounter value="100" suffix="%" label="Verificados" />
                        </div>
                    </div>
                </div>

                {/* Slide dots */}
                <HeroSliderDots total={HERO_SLIDES.length} current={heroSlide} />
            </section>

            {/* ─── BRAND TICKER ─── */}
            <BrandTicker />

            {/* ─── QUICK SEARCH ─── */}
            <section style={{ backgroundColor: '#141414', borderBottom: '1px solid #1c1c1c' }} className="py-8">
                <div className="max-w-7xl mx-auto px-8">
                    <form action={route('vehicles.index')} method="GET">
                        <div className="flex flex-col md:flex-row gap-3 items-end">
                            <div style={{ flex: '0 0 auto' }}>
                                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.375rem', letterSpacing: '0.06em', color: '#f0f0f0' }}>
                                    BUSCA TU AUTO
                                </div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#333', marginTop: '0.1rem' }}>
                                    Filtros rápidos
                                </div>
                            </div>
                            {[
                                {
                                    name: 'brand', label: 'Marca',
                                    options: [{ value: '', label: 'Todas' }, 'Nissan', 'Toyota', 'Honda', 'Chevrolet', 'Ford', 'Volkswagen'].map(o =>
                                        typeof o === 'string' ? { value: o, label: o } : o
                                    ),
                                },
                                {
                                    name: 'year_min', label: 'Año mínimo',
                                    options: [{ value: '', label: 'Cualquier año' }, ...YEAR_OPTIONS.map(y => ({ value: y, label: `${y}+` }))],
                                },
                                {
                                    name: 'price_max', label: 'Precio máximo',
                                    options: [
                                        { value: '', label: 'Sin límite' },
                                        { value: '200000', label: '$200,000' },
                                        { value: '300000', label: '$300,000' },
                                        { value: '400000', label: '$400,000' },
                                        { value: '500000', label: '$500,000' },
                                    ],
                                },
                            ].map(({ name, label, options }) => (
                                <div key={name} style={{ flex: 1, minWidth: 150 }}>
                                    <label className="form-label">{label}</label>
                                    <select name={name} className="form-input">
                                        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                    </select>
                                </div>
                            ))}
                            <button type="submit" className="btn-search" style={{ height: '2.8125rem', flexShrink: 0 }}>
                                Buscar &rsaquo;
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* ─── FEATURED VEHICLES ─── */}
            <section style={{ backgroundColor: '#0c0c0c' }} className="py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <ScrollReveal>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <span className="section-label">Selección especial</span>
                                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem,5.5vw,3.75rem)', color: '#f0f0f0', lineHeight: 0.9, letterSpacing: '0.02em' }}>
                                    VEHÍCULOS<br />
                                    <span style={{ color: '#C3002F' }}>DESTACADOS</span>
                                </h2>
                            </div>
                            <Link href={route('vehicles.index')} className="link-arrow" style={{ marginBottom: '0.5rem' }}>
                                Todo el inventario &rsaquo;
                            </Link>
                        </div>
                    </ScrollReveal>

                    {featuredVehicles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1c1c1c' }}>
                            {featuredVehicles.map((v, i) => (
                                <div key={v.id} style={{ background: '#0c0c0c' }}>
                                    <VehicleCard vehicle={v} index={i} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#333', border: '1px solid #1c1c1c' }}>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>PRÓXIMAMENTE</div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem' }}>
                                <Link href={route('contact.index')} style={{ color: '#C3002F', fontWeight: 700 }}>Contáctanos</Link> para más información.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── WHY US ─── */}
            <section style={{ backgroundColor: '#111111', borderTop: '1px solid #1c1c1c' }} className="py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left text */}
                        <ScrollReveal direction="left">
                            <span className="section-label">Nuestras ventajas</span>
                            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', color: '#f0f0f0', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '1.5rem' }}>
                                ¿POR QUÉ ELEGIRNOS?
                            </h2>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', color: '#555', lineHeight: 1.8, maxWidth: 420, marginBottom: '2rem' }}>
                                Más de 10 años de experiencia en la región, ofreciendo seminuevos de calidad con un proceso de compra transparente y sin presión.
                            </p>
                            <Link href={route('contact.index')} className="btn-outline" style={{ fontSize: '0.8125rem' }}>
                                Solicitar Asesoría
                            </Link>
                        </ScrollReveal>

                        {/* Right benefits grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: '#1c1c1c' }}>
                            {[
                                { title: 'Garantía', desc: 'Todos nuestros vehículos cuentan con garantía para tu tranquilidad.', path: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                                { title: 'Financiamiento', desc: 'Planes flexibles y aprobación rápida adaptados a tu presupuesto.', path: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                                { title: 'Verificados', desc: 'Revisión mecánica completa y verificación de historial vehicular.', path: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
                                { title: 'Asesoría', desc: 'Expertos que te guían para encontrar el vehículo ideal sin presión.', path: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
                            ].map(({ title, desc, path }, i) => (
                                <ScrollReveal key={title} delay={i} direction="scale">
                                    <div style={{ background: '#141414', padding: '2rem 1.75rem', height: '100%' }}>
                                        <div style={{ width: 40, height: 40, border: '1px solid rgba(195,0,47,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                            <svg width="18" height="18" fill="none" stroke="#C3002F" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d={path} />
                                            </svg>
                                        </div>
                                        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.25rem', letterSpacing: '0.06em', color: '#f0f0f0', marginBottom: '0.625rem' }}>{title}</h3>
                                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: '#555', lineHeight: 1.7 }}>{desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section style={{ backgroundColor: '#0c0c0c', borderTop: '1px solid #1c1c1c' }} className="py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <span className="section-label">Testimonios</span>
                            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.25rem,4.5vw,3.25rem)', color: '#f0f0f0', lineHeight: 0.9, letterSpacing: '0.02em' }}>
                                LO QUE DICEN<br />
                                <span style={{ color: '#C3002F' }}>NUESTROS CLIENTES</span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#1c1c1c' }}>
                        {[
                            { quote: 'Encontré mi Toyota Corolla en perfectas condiciones y con un precio justo. Excelente atención desde el primer momento.', name: 'Carlos Martínez', city: 'Gómez Palacio, Dgo.' },
                            { quote: 'El proceso de financiamiento fue muy sencillo. Salí manejando mi Honda CR-V el mismo día. Un servicio de primera clase.', name: 'Ana Lucía Flores', city: 'Lerdo, Durango' },
                            { quote: 'Toda la documentación en orden, vehículo revisado. AutoGalería es de total confianza para toda mi familia.', name: 'Roberto Sánchez', city: 'Torreón, Coahuila' },
                        ].map(({ quote, name, city }, i) => (
                            <ScrollReveal key={name} delay={i} direction="up">
                                <div style={{ background: '#111111', padding: '2.25rem 2rem', height: '100%', position: 'relative' }}>
                                    {/* Large quote mark */}
                                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '6rem', color: '#1a1a1a', lineHeight: 0.8, marginBottom: '1rem', userSelect: 'none' }}>"</div>
                                    {/* Stars */}
                                    <div style={{ display: 'flex', gap: 3, marginBottom: '1.25rem' }}>
                                        {Array.from({ length: 5 }).map((_, j) => (
                                            <svg key={j} width="13" height="13" viewBox="0 0 20 20" fill="#C3002F">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', color: '#888', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.75rem' }}>
                                        "{quote}"
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: 2, height: 36, background: '#C3002F' }} />
                                        <div>
                                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: '#e0e0e0', fontSize: '0.875rem' }}>{name}</div>
                                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#444', letterSpacing: '0.05em' }}>{city}</div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── MAP ─── */}
            <section style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '1.5rem 2.5rem', background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)', pointerEvents: 'none' }}>
                    <span className="section-label" style={{ marginBottom: 0 }}>Nuestra Ubicación</span>
                </div>
                <iframe
                    src="https://maps.google.com/maps?q=25.5694,-103.4997&z=14&output=embed"
                    width="100%"
                    height="360"
                    style={{ border: 0, display: 'block', filter: 'grayscale(35%) contrast(1.05) brightness(0.85)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación AutoGalería"
                />
            </section>

            {/* ─── BOTTOM CTA ─── */}
            <section style={{ backgroundColor: '#111111', borderTop: '1px solid #1c1c1c' }} className="py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <ScrollReveal direction="up">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                            <div>
                                <span className="section-label">¿Listo para comprar?</span>
                                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem,5.5vw,4rem)', color: '#f0f0f0', lineHeight: 0.88, letterSpacing: '0.02em', marginBottom: '1.25rem' }}>
                                    TU PRÓXIMO AUTO<br />
                                    <span style={{ color: '#C3002F' }}>TE ESPERA AQUÍ</span>
                                </h2>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', color: '#555', lineHeight: 1.7, maxWidth: 380 }}>
                                    Visítanos en Gómez Palacio o escríbenos ahora. Atendemos sin compromiso y sin presión.
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Link href={route('vehicles.index')} className="btn-primary" style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                                    Ver Todo el Inventario
                                </Link>
                                <a
                                    href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20autos%20disponibles.`}
                                    target="_blank" rel="noreferrer"
                                    className="btn-wa"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Escríbenos por WhatsApp
                                </a>
                                <Link href={route('contact.index')} className="btn-call" style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                                    Solicitar Cotización
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </PublicLayout>
    );
}

// ─── Hero slide dots ──────────────────────────────────────────────────────────
function HeroSliderDots({ total, current }) {
    return (
        <div style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: i === current ? 24 : 6,
                        height: 6,
                        background: i === current ? '#C3002F' : 'rgba(255,255,255,0.25)',
                        transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s',
                        borderRadius: 3,
                    }}
                />
            ))}
        </div>
    );
}
