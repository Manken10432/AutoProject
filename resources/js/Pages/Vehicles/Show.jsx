import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal.jsx';

const WA_NUMBER = '526141234567';

const WaIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function VehicleShow({ vehicle, relatedVehicles, flash }) {
    const images = (vehicle.images && vehicle.images.length > 0) ? vehicle.images : [vehicle.first_image];
    const [mainIdx, setMainIdx] = useState(0);
    const [fadeKey, setFadeKey] = useState(0);
    const mainImage = images[mainIdx];

    const switchToIdx = (i) => {
        setMainIdx(i);
        setFadeKey(k => k + 1);
    };

    useEffect(() => {
        if (images.length <= 1) return;
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') setMainIdx(i => (i + 1) % images.length);
            else if (e.key === 'ArrowLeft') setMainIdx(i => (i - 1 + images.length) % images.length);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [images.length]);

    const waMessage = encodeURIComponent(
        `Hola, estoy interesado en el ${vehicle.year} ${vehicle.brand} ${vehicle.model} - $${Number(vehicle.price).toLocaleString('es-MX')} MXN. ¿Está disponible?`
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', phone: '', message: '', vehicle_id: vehicle.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), { onSuccess: () => reset('name', 'email', 'phone', 'message') });
    };

    const specsData = [
        { label: 'Año', value: vehicle.year },
        { label: 'Kilometraje', value: `${Number(vehicle.mileage).toLocaleString('es-MX')} km` },
        { label: 'Combustible', value: vehicle.fuel_type },
        { label: 'Transmisión', value: vehicle.transmission },
        ...(vehicle.color ? [{ label: 'Color', value: vehicle.color }] : []),
        { label: 'Estado', value: vehicle.status === 'available' ? 'Disponible' : 'Vendido', accent: vehicle.status === 'available' ? '#25D366' : '#C3002F' },
    ];

    return (
        <PublicLayout
            title={`${vehicle.year} ${vehicle.brand} ${vehicle.model} — AutoGalería`}
            description={`${vehicle.year} ${vehicle.brand} ${vehicle.model} en $${Number(vehicle.price).toLocaleString('es-MX')} MXN. ${Number(vehicle.mileage).toLocaleString('es-MX')} km, ${vehicle.fuel_type}, ${vehicle.transmission}.`}
            ogType="product"
            ogImage={vehicle.first_image}
        >
            {/* ─── BREADCRUMB ─── */}
            <div style={{ backgroundColor: '#111111', padding: '1rem 0', borderBottom: '1px solid #1c1c1c' }}>
                <div className="max-w-7xl mx-auto px-8">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Link href={route('home')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#555', textDecoration: 'none' }}>Inicio</Link>
                        <span style={{ color: '#2a2a2a' }}>/</span>
                        <Link href={route('vehicles.index')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#555', textDecoration: 'none' }}>Seminuevos</Link>
                        <span style={{ color: '#2a2a2a' }}>/</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#888' }}>{vehicle.brand} {vehicle.model}</span>
                    </div>
                </div>
            </div>

            {/* ─── MOBILE STICKY CTA ─── */}
            <div className="lg:hidden" style={{ background: '#141414', borderBottom: '2px solid #C3002F', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', position: 'sticky', top: 64, zIndex: 40 }}>
                <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#C3002F', letterSpacing: '0.02em', lineHeight: 1 }}>
                        ${Number(vehicle.price).toLocaleString('es-MX')}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {vehicle.year} {vehicle.brand} {vehicle.model}
                    </div>
                </div>
                <a href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`} target="_blank" rel="noreferrer" className="btn-wa" style={{ width: 'auto', padding: '0.625rem 1.125rem', fontSize: '0.75rem', gap: '0.35rem' }}>
                    <WaIcon />
                    WhatsApp
                </a>
            </div>

            <div style={{ backgroundColor: '#0c0c0c' }}>
                <div className="max-w-7xl mx-auto px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* ─── LEFT: Gallery + Description + Form ─── */}
                        <div className="lg:col-span-2">
                            {/* Status + title */}
                            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span className={vehicle.status === 'available' ? 'badge-available' : 'badge-sold'}>
                                    {vehicle.status === 'available' ? 'Disponible' : 'Vendido'}
                                </span>
                                {vehicle.featured && (
                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f0f0f0', background: '#1c1c1c', border: '1px solid #2a2a2a', padding: '0.2rem 0.625rem' }}>
                                        DESTACADO
                                    </span>
                                )}
                            </div>

                            <div style={{ marginBottom: '0.375rem' }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#C3002F' }}>
                                    {vehicle.brand}
                                </span>
                            </div>
                            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem,4vw,2.75rem)', letterSpacing: '0.03em', color: '#f0f0f0', lineHeight: 0.95, marginBottom: '1.5rem' }}>
                                {vehicle.year} {vehicle.model}
                                {vehicle.color && <span style={{ fontSize: '1.25rem', color: '#555', marginLeft: '0.75rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.9rem', letterSpacing: '0.04em', verticalAlign: 'middle' }}>{vehicle.color}</span>}
                            </h1>

                            {/* GALLERY */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ overflow: 'hidden', background: '#111', height: 420, border: '1px solid #1c1c1c', position: 'relative' }}>
                                    <img
                                        key={fadeKey}
                                        src={mainImage}
                                        alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'heroFadeIn 0.4s ease forwards' }}
                                    />
                                    {images.length > 1 && (
                                        <>
                                            <button onClick={() => switchToIdx((mainIdx - 1 + images.length) % images.length)} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }} aria-label="Anterior">
                                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                                            </button>
                                            <button onClick={() => switchToIdx((mainIdx + 1) % images.length)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }} aria-label="Siguiente">
                                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                            <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.375rem' }}>
                                                {images.map((_, i) => (
                                                    <div key={i} onClick={() => switchToIdx(i)} style={{ width: i === mainIdx ? 20 : 6, height: 6, background: i === mainIdx ? '#C3002F' : 'rgba(255,255,255,0.3)', borderRadius: 3, cursor: 'pointer', transition: 'width 0.3s ease, background 0.2s ease' }} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                {images.length > 1 && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.375rem', marginTop: '0.5rem' }}>
                                        {images.map((img, i) => (
                                            <div
                                                key={i}
                                                onClick={() => switchToIdx(i)}
                                                className={`thumb-item ${mainIdx === i ? 'active' : ''}`}
                                                style={{ height: 68 }}
                                            >
                                                <img src={img} alt={`Foto ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* DESCRIPTION */}
                            {vehicle.description && (
                                <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '1.75rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                        <div style={{ width: 3, height: 20, background: '#C3002F' }} />
                                        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>
                                            DESCRIPCIÓN
                                        </h2>
                                    </div>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#888', fontSize: '0.9375rem', lineHeight: 1.8 }}>{vehicle.description}</p>
                                </div>
                            )}

                            {/* CONTACT FORM */}
                            <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '1.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    <div style={{ width: 3, height: 20, background: '#C3002F' }} />
                                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>
                                        SOLICITAR INFORMACIÓN
                                    </h2>
                                </div>

                                {flash?.success && (
                                    <div style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366', padding: '0.875rem 1rem', marginBottom: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {flash.success}
                                    </div>
                                )}

                                <form onSubmit={submit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '1rem' }}>
                                        <div>
                                            <label className="form-label">Nombre *</label>
                                            <input type="text" className="form-input" placeholder="Tu nombre completo" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                            {errors.name && <p style={{ color: '#C3002F', fontSize: '0.75rem', marginTop: '0.25rem', fontFamily: "'DM Sans', sans-serif" }}>{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="form-label">Email *</label>
                                            <input type="email" className="form-input" placeholder="correo@ejemplo.com" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                            {errors.email && <p style={{ color: '#C3002F', fontSize: '0.75rem', marginTop: '0.25rem', fontFamily: "'DM Sans', sans-serif" }}>{errors.email}</p>}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="form-label">Teléfono *</label>
                                            <input type="tel" className="form-input" placeholder="(614) 000-0000" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                                            {errors.phone && <p style={{ color: '#C3002F', fontSize: '0.75rem', marginTop: '0.25rem', fontFamily: "'DM Sans', sans-serif" }}>{errors.phone}</p>}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="form-label">Mensaje</label>
                                            <textarea className="form-input" rows={3} placeholder="¿Tienes alguna pregunta sobre este vehículo?" value={data.message} onChange={e => setData('message', e.target.value)} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center', fontSize: '0.8125rem', padding: '0.875rem' }} disabled={processing}>
                                        {processing ? 'Enviando...' : 'Enviar Solicitud'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* ─── RIGHT: Price + Specs ─── */}
                        <div>
                            <div style={{ position: 'sticky', top: 80 }}>
                                {/* Price card */}
                                <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '1.75rem', marginBottom: '1rem' }}>
                                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: '#C3002F', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '0.25rem' }}>
                                        ${Number(vehicle.price).toLocaleString('es-MX')}
                                    </div>
                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '1.5rem' }}>
                                        Precio de lista en MXN
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                        <a href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`} target="_blank" rel="noreferrer" className="btn-wa">
                                            <WaIcon />
                                            WhatsApp
                                        </a>
                                        <a href="tel:6141234567" className="btn-call">
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Llamar Ahora
                                        </a>
                                    </div>
                                </div>

                                {/* Specs */}
                                <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '1.5rem', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                                        <div style={{ width: 3, height: 16, background: '#C3002F' }} />
                                        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.9375rem', letterSpacing: '0.12em', color: '#f0f0f0' }}>
                                            ESPECIFICACIONES
                                        </h3>
                                    </div>
                                    <div>
                                        {specsData.map(({ label, value, accent }, i) => (
                                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: i < specsData.length - 1 ? '1px solid #1c1c1c' : 'none' }}>
                                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#555' }}>{label}</span>
                                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.8125rem', color: accent || '#f0f0f0' }}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Trust badge */}
                                <div style={{ background: '#111', border: '1px solid #1c1c1c', padding: '1.125rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <svg width="18" height="18" fill="none" stroke="#C3002F" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#555', lineHeight: 1.65 }}>
                                        Revisión mecánica completa y financiamiento disponible en todos nuestros vehículos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── RELATED VEHICLES ─── */}
                    {relatedVehicles.length > 0 && (
                        <ScrollReveal>
                            <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid #1c1c1c' }}>
                                <div style={{ marginBottom: '2rem' }}>
                                    <span className="section-label">Más opciones</span>
                                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.875rem', letterSpacing: '0.04em', color: '#f0f0f0' }}>
                                        MÁS {vehicle.brand.toUpperCase()} DISPONIBLES
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1c1c1c' }}>
                                    {relatedVehicles.map(related => (
                                        <Link key={related.id} href={route('vehicles.show', related.id)} style={{ textDecoration: 'none', display: 'block' }}>
                                            <div className="vehicle-card group" style={{ height: '100%' }}>
                                                <div style={{ overflow: 'hidden', height: 165 }}>
                                                    <img src={related.first_image} alt={`${related.year} ${related.brand} ${related.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} loading="lazy" className="group-hover:scale-105" />
                                                </div>
                                                <div style={{ padding: '1rem 1.125rem 1.25rem' }}>
                                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C3002F', marginBottom: '0.25rem' }}>{related.brand}</div>
                                                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.04em', color: '#f0f0f0', marginBottom: '0.375rem', lineHeight: 1.1 }}>
                                                        {related.year} {related.model}
                                                    </h3>
                                                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#C3002F', letterSpacing: '0.03em' }}>
                                                        ${Number(related.price).toLocaleString('es-MX')}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
