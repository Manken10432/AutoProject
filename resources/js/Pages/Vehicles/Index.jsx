import { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal.jsx';

function CatalogCard({ vehicle, index }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgRef = useRef(null);
    useEffect(() => { if (imgRef.current?.complete) setImgLoaded(true); }, []);

    return (
        <ScrollReveal delay={index % 3} direction="up">
            <Link href={route('vehicles.show', vehicle.id)} style={{ textDecoration: 'none', display: 'block', background: '#0c0c0c', height: '100%' }}>
                <div className="vehicle-card card-shine group" style={{ height: '100%' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', height: 195 }}>
                        {!imgLoaded && <div className="img-skeleton" style={{ position: 'absolute', inset: 0 }} />}
                        <img
                            ref={imgRef}
                            src={vehicle.first_image}
                            alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease', opacity: imgLoaded ? 1 : 0 }}
                            className="group-hover:scale-105"
                            loading="lazy"
                            onLoad={() => setImgLoaded(true)}
                        />
                        {vehicle.status === 'sold' && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ background: '#C3002F', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, textTransform: 'uppercase', padding: '0.35rem 1rem', letterSpacing: '0.1em', fontSize: '0.75rem' }}>VENDIDO</span>
                            </div>
                        )}
                        {vehicle.featured && (
                            <div style={{ position: 'absolute', top: '0.625rem', left: '0.625rem' }}>
                                <span style={{ background: '#C3002F', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.2rem 0.5rem', letterSpacing: '0.06em' }}>DESTACADO</span>
                            </div>
                        )}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)', opacity: 0, transition: 'opacity 0.3s ease' }} className="group-hover:opacity-100" />
                    </div>
                    <div style={{ padding: '1.125rem 1.25rem 1.375rem' }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C3002F', marginBottom: '0.3rem' }}>
                            {vehicle.brand}
                        </div>
                        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.125rem', letterSpacing: '0.04em', color: '#f0f0f0', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                            {vehicle.year} {vehicle.model}
                        </h3>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.375rem', color: '#C3002F', letterSpacing: '0.03em', marginBottom: '0.75rem' }}>
                            ${Number(vehicle.price).toLocaleString('es-MX')}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555', borderTop: '1px solid #1c1c1c', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
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

export default function VehiclesIndex({ vehicles, brands, years, filters = {} }) {
    const [form, setForm] = useState({
        brand: filters.brand || [],
        year_min: filters.year_min || '',
        year_max: filters.year_max || '',
        price_min: filters.price_min || '',
        price_max: filters.price_max || '',
        fuel_type: filters.fuel_type || [],
        transmission: filters.transmission || [],
        sort_by: filters.sort_by || '',
    });
    const [filterOpen, setFilterOpen] = useState(false);

    const applyFilters = (e) => {
        e.preventDefault();
        const params = {};
        Object.entries(form).forEach(([k, v]) => {
            if (v !== '' && !(Array.isArray(v) && v.length === 0)) params[k] = v;
        });
        router.get(route('vehicles.index'), params, { preserveState: true, replace: true });
    };

    const onSortChange = (e) => {
        const sort_by = e.target.value;
        setForm(f => ({ ...f, sort_by }));
        const params = {};
        Object.entries({ ...form, sort_by }).forEach(([k, v]) => {
            if (v !== '' && !(Array.isArray(v) && v.length === 0)) params[k] = v;
        });
        router.get(route('vehicles.index'), params, { preserveState: true, replace: true });
    };

    const toggleArray = (field, value) => {
        setForm(f => ({
            ...f,
            [field]: f[field].includes(value)
                ? f[field].filter(v => v !== value)
                : [...f[field], value],
        }));
    };

    const clearFilters = () => {
        setForm({ brand: [], year_min: '', year_max: '', price_min: '', price_max: '', fuel_type: [], transmission: [], sort_by: '' });
        router.get(route('vehicles.index'), {});
    };

    const hasFilters = form.brand.length || form.year_min || form.year_max || form.price_min || form.price_max || form.fuel_type.length || form.transmission.length;

    const SidebarSection = ({ title, children }) => (
        <div style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid #1c1c1c' }}>
            <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0', marginBottom: '1rem' }}>
                {title}
            </h4>
            {children}
        </div>
    );

    return (
        <PublicLayout title="Inventario de Seminuevos — AutoGalería" description="Explora nuestro inventario completo de seminuevos. Filtra por marca, año, precio y más.">

            {/* ─── PAGE HEADER ─── */}
            <div style={{
                position: 'relative', overflow: 'hidden',
                padding: '4.5rem 0 3.5rem',
                borderBottom: '1px solid #1c1c1c',
                background: `linear-gradient(105deg, rgba(0,0,0,0.97) 40%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1552519491-37d8564f8fc4?w=1600&q=80') center/cover no-repeat`,
            }}>
                {/* Left red bar */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#C3002F' }} />
                <div className="max-w-7xl mx-auto px-8" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Breadcrumb */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Link href={route('home')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#555', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Inicio</Link>
                        <span style={{ color: '#333' }}>/</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#C3002F', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Seminuevos</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C3002F', marginBottom: '0.5rem' }}>
                                AutoGalería — Gómez Palacio
                            </div>
                            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '0.03em', color: '#f0f0f0', lineHeight: 0.9 }}>
                                INVENTARIO<br />
                                <span style={{ color: '#C3002F' }}>SEMINUEVOS</span>
                            </h1>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: '#C3002F', lineHeight: 1, letterSpacing: '0.02em' }}>
                                {vehicles.total}
                            </div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555' }}>
                                vehículo{vehicles.total !== 1 ? 's' : ''} disponible{vehicles.total !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#0c0c0c', minHeight: '60vh' }}>
                <div className="max-w-7xl mx-auto px-8 py-10">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* ─── SIDEBAR ─── */}
                        <aside className="lg:w-64 shrink-0 w-full">
                            {/* Mobile toggle */}
                            <button
                                type="button"
                                onClick={() => setFilterOpen(!filterOpen)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: '#141414', border: '1px solid #2a2a2a', padding: '0.875rem 1rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f0f0f0', cursor: 'pointer', marginBottom: '0.75rem' }}
                                className="lg:hidden"
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                                    </svg>
                                    Filtros
                                </span>
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ transform: filterOpen ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }}>
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`${filterOpen ? '' : 'hidden'} lg:block`}>
                                <form onSubmit={applyFilters}>
                                    <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '1.5rem' }}>
                                        {/* Header */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.125rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>FILTROS</span>
                                            {hasFilters && (
                                                <button type="button" onClick={clearFilters} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C3002F', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                                    Limpiar
                                                </button>
                                            )}
                                        </div>

                                        {/* Brand */}
                                        <SidebarSection title="Marca">
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {brands.map(brand => (
                                                    <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
                                                        <input type="checkbox" className="filter-checkbox" checked={form.brand.includes(brand)} onChange={() => toggleArray('brand', brand)} />
                                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: form.brand.includes(brand) ? '#f0f0f0' : '#888', fontWeight: form.brand.includes(brand) ? 600 : 400 }}>{brand}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </SidebarSection>

                                        {/* Year */}
                                        <SidebarSection title="Año">
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <input type="number" placeholder="Desde" value={form.year_min} onChange={e => setForm(f => ({ ...f, year_min: e.target.value }))} min="2000" max={new Date().getFullYear()} className="form-input" style={{ fontSize: '0.8125rem', padding: '0.5rem 0.625rem' }} />
                                                <span style={{ color: '#333', flexShrink: 0 }}>—</span>
                                                <input type="number" placeholder="Hasta" value={form.year_max} onChange={e => setForm(f => ({ ...f, year_max: e.target.value }))} min="2000" max={new Date().getFullYear()} className="form-input" style={{ fontSize: '0.8125rem', padding: '0.5rem 0.625rem' }} />
                                            </div>
                                        </SidebarSection>

                                        {/* Price */}
                                        <SidebarSection title="Precio MXN">
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <input type="number" placeholder="Mínimo" value={form.price_min} onChange={e => setForm(f => ({ ...f, price_min: e.target.value }))} className="form-input" style={{ fontSize: '0.8125rem', padding: '0.5rem 0.625rem' }} />
                                                <span style={{ color: '#333', flexShrink: 0 }}>—</span>
                                                <input type="number" placeholder="Máximo" value={form.price_max} onChange={e => setForm(f => ({ ...f, price_max: e.target.value }))} className="form-input" style={{ fontSize: '0.8125rem', padding: '0.5rem 0.625rem' }} />
                                            </div>
                                        </SidebarSection>

                                        {/* Fuel */}
                                        <SidebarSection title="Combustible">
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {['Gasolina', 'Diesel', 'Híbrido', 'Eléctrico'].map(f => (
                                                    <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
                                                        <input type="checkbox" className="filter-checkbox" checked={form.fuel_type.includes(f)} onChange={() => toggleArray('fuel_type', f)} />
                                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: form.fuel_type.includes(f) ? '#f0f0f0' : '#888', fontWeight: form.fuel_type.includes(f) ? 600 : 400 }}>{f}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </SidebarSection>

                                        {/* Transmission */}
                                        <div style={{ marginBottom: '1.75rem' }}>
                                            <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0', marginBottom: '1rem' }}>
                                                Transmisión
                                            </h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {['Automática', 'Manual'].map(t => (
                                                    <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
                                                        <input type="checkbox" className="filter-checkbox" checked={form.transmission.includes(t)} onChange={() => toggleArray('transmission', t)} />
                                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: form.transmission.includes(t) ? '#f0f0f0' : '#888', fontWeight: form.transmission.includes(t) ? 600 : 400 }}>{t}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center', fontSize: '0.75rem', padding: '0.875rem' }}>
                                            Aplicar Filtros
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </aside>

                        {/* ─── MAIN CONTENT ─── */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {/* Sort bar */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#141414', border: '1px solid #1c1c1c', padding: '0.875rem 1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#555', letterSpacing: '0.04em' }}>
                                    {vehicles.from ?? 0}–{vehicles.to ?? 0} de <strong style={{ color: '#888' }}>{vehicles.total}</strong> resultados
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>Ordenar:</span>
                                    <select value={form.sort_by} onChange={onSortChange} className="form-input" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.75rem', width: 'auto' }}>
                                        <option value="">Más reciente</option>
                                        <option value="price_asc">Precio ↑</option>
                                        <option value="price_desc">Precio ↓</option>
                                        <option value="year_desc">Año más nuevo</option>
                                        <option value="mileage_asc">Menor km</option>
                                    </select>
                                </div>
                            </div>

                            {/* Grid */}
                            {vehicles.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px" style={{ background: '#1c1c1c' }}>
                                        {vehicles.data.map((vehicle, i) => (
                                            <CatalogCard key={vehicle.id} vehicle={vehicle} index={i} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {vehicles.last_page > 1 && (
                                        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
                                            {vehicles.links.map((link, i) => (
                                                link.url ? (
                                                    <Link
                                                        key={i}
                                                        href={link.url}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        style={{
                                                            display: 'inline-flex', alignItems: 'center', padding: '0.4rem 0.75rem',
                                                            fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 600,
                                                            background: link.active ? '#C3002F' : '#141414',
                                                            color: link.active ? '#fff' : '#555',
                                                            border: `1px solid ${link.active ? '#C3002F' : '#2a2a2a'}`,
                                                            textDecoration: 'none',
                                                            transition: 'all 0.15s',
                                                        }}
                                                        preserveState
                                                    />
                                                ) : (
                                                    <span
                                                        key={i}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        style={{ display: 'inline-flex', alignItems: 'center', padding: '0.4rem 0.75rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#2a2a2a', border: '1px solid #1c1c1c', background: '#111' }}
                                                    />
                                                )
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#141414', border: '1px solid #1c1c1c' }}>
                                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', letterSpacing: '0.06em', color: '#2a2a2a', marginBottom: '0.75rem' }}>
                                        SIN RESULTADOS
                                    </div>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#555', fontSize: '0.9375rem', marginBottom: '1.75rem' }}>
                                        Intenta ajustar los filtros de búsqueda.
                                    </p>
                                    <button onClick={clearFilters} className="btn-primary" style={{ fontSize: '0.8125rem' }}>
                                        Ver Todo el Inventario
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
