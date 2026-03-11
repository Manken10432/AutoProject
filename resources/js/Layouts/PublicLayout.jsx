import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

const WA_NUMBER = '526141234567';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

function BottomQuoteBar() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (sessionStorage.getItem('quoteDismissed') === '1') { setDismissed(true); return; }
        const onScroll = () => {
            if (window.scrollY > 600) { setVisible(true); window.removeEventListener('scroll', onScroll); }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const dismiss = () => { setDismissed(true); sessionStorage.setItem('quoteDismissed', '1'); };

    const submit = (e) => {
        e.preventDefault();
        router.post(route('contact.store'), form, { onSuccess: () => dismiss() });
    };

    if (dismissed) return null;

    return (
        <div className="hidden md:block" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#0c0c0c', borderTop: '1px solid #2a2a2a', zIndex: 998, transform: visible ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
            <form onSubmit={submit}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#C3002F', fontSize: '1.125rem', letterSpacing: '0.12em', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        COTIZA AHORA
                    </span>
                    <div style={{ flex: 1, display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                        {[{ name: 'name', placeholder: 'Tu nombre', type: 'text' }, { name: 'email', placeholder: 'Correo', type: 'email' }, { name: 'phone', placeholder: 'Teléfono', type: 'tel' }].map(({ name, placeholder, type }) => (
                            <input key={name} type={type} placeholder={placeholder} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} required className="form-input" style={{ flex: 1, minWidth: 110, padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }} />
                        ))}
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.5rem', whiteSpace: 'nowrap', flexShrink: 0 }}>Enviar</button>
                    <button type="button" onClick={dismiss} style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', padding: '0.25rem', flexShrink: 0, lineHeight: 1 }} aria-label="Cerrar">
                        <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function PublicLayout({ children, title, description, ogType, ogImage, transparentNav = false }) {
    const { url, props } = usePage();
    const canonicalUrl = props.ziggy?.location || '';
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isActive = (pattern) => {
        if (pattern === '/') return url === '/';
        return url.startsWith(pattern);
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navClass = transparentNav
        ? `navbar ${scrolled ? 'scrolled' : ''}`
        : 'navbar opaque';

    return (
        <>
            <Head>
                <title>{title || 'AutoGalería — Seminuevos de Calidad'}</title>
                <meta name="description" content={description || 'AutoGalería — Los mejores seminuevos en Gómez Palacio, Durango.'} />
                <meta name="robots" content="index, follow" />
                {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
                <meta property="og:type" content={ogType || 'website'} />
                <meta property="og:site_name" content="AutoGalería" />
                <meta property="og:locale" content="es_MX" />
                <meta property="og:title" content={title || 'AutoGalería — Seminuevos de Calidad'} />
                <meta property="og:description" content={description || 'AutoGalería — Los mejores seminuevos en Gómez Palacio, Durango.'} />
                {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
                {ogImage && <meta property="og:image" content={ogImage} />}
                <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
                <meta name="twitter:title" content={title || 'AutoGalería — Seminuevos de Calidad'} />
                <meta name="twitter:description" content={description || 'AutoGalería — Los mejores seminuevos en Gómez Palacio, Durango.'} />
                {ogImage && <meta name="twitter:image" content={ogImage} />}
            </Head>

            <div style={{ background: '#0c0c0c', minHeight: '100vh' }}>

                {/* NAVBAR */}
                <nav className={navClass}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

                            {/* Logo */}
                            <Link href={route('home')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '3px', height: '28px', background: '#C3002F' }} />
                                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.06em', color: '#ffffff', lineHeight: 1 }}>
                                    AUTO<span style={{ color: '#C3002F' }}>GALERÍA</span>
                                </span>
                            </Link>

                            {/* Desktop nav */}
                            <div style={{ alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
                                <Link href={route('home')} className={`nav-link ${isActive('/') && !isActive('/seminuevos') && !isActive('/cotizacion') ? 'active' : ''}`}>Inicio</Link>
                                <Link href={route('vehicles.index')} className={`nav-link ${isActive('/seminuevos') ? 'active' : ''}`}>Inventario</Link>
                                <Link href={route('contact.index')} className={`nav-link ${isActive('/cotizacion') ? 'active' : ''}`}>Cotización</Link>
                                <a
                                    href={`${WA_BASE}?text=Hola%2C%20me%20gustar%C3%ADa%20informes%20sobre%20sus%20veh%C3%ADculos.`}
                                    target="_blank" rel="noreferrer"
                                    className="btn-primary"
                                    style={{ padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <WhatsAppIcon className="w-4 h-4" />
                                    WhatsApp
                                </a>
                            </div>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                style={{ background: 'transparent', border: 'none', color: '#f0f0f0', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
                                className="md:hidden"
                                aria-label="Menú"
                            >
                                {menuOpen ? (
                                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : (
                                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                )}
                            </button>
                        </div>

                        {/* Mobile menu */}
                        {menuOpen && (
                            <div style={{ borderTop: '1px solid #2a2a2a', paddingBottom: '1.5rem', paddingTop: '1rem' }} className="md:hidden">
                                {[
                                    { href: route('home'), label: 'Inicio' },
                                    { href: route('vehicles.index'), label: 'Inventario' },
                                    { href: route('contact.index'), label: 'Cotización' },
                                ].map(({ href, label }) => (
                                    <Link key={label} href={href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 0', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', borderBottom: '1px solid #1a1a1a' }}>
                                        {label}
                                    </Link>
                                ))}
                                <a href={`${WA_BASE}`} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', padding: '0.75rem' }}>
                                    <WhatsAppIcon /> WhatsApp
                                </a>
                            </div>
                        )}
                    </div>
                </nav>

                {/* MAIN */}
                <main>{children}</main>

                {/* FOOTER */}
                <footer style={{ background: '#080808', borderTop: '1px solid #1a1a1a', paddingTop: '4rem', paddingBottom: 0 }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', paddingBottom: '3.5rem' }}>

                            {/* Brand */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '3px', height: '28px', background: '#C3002F' }} />
                                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '0.06em', color: '#fff', lineHeight: 1 }}>
                                        AUTO<span style={{ color: '#C3002F' }}>GALERÍA</span>
                                    </span>
                                </div>
                                <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '280px' }}>
                                    Tu concesionaria de confianza en Gómez Palacio, Durango. Más de 10 años ofreciendo seminuevos verificados.
                                </p>
                                <div style={{ display: 'flex', gap: '0.625rem' }}>
                                    {[
                                        { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', hoverBg: '#1877F2' },
                                        { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', hoverBg: '#E1306C' },
                                        { label: 'WhatsApp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z', hoverBg: '#25D366' },
                                    ].map(({ label, path, hoverBg }) => (
                                        <a key={label} href="#" aria-label={label} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: '#1a1a1a', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', textDecoration: 'none', transition: 'background 0.2s ease, color 0.2s ease' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = hoverBg; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#2a2a2a'; }}>
                                            <svg style={{ width: '0.875rem', height: '0.875rem', fill: 'currentColor' }} viewBox="0 0 24 24"><path d={path} /></svg>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div>
                                <h5 style={{ fontFamily: "'Bebas Neue'", fontSize: '1rem', letterSpacing: '0.12em', color: '#fff', marginBottom: '1.25rem' }}>Navegación</h5>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                    {[
                                        { label: 'Inicio', href: route('home') },
                                        { label: 'Inventario Seminuevos', href: route('vehicles.index') },
                                        { label: 'Solicitar Cotización', href: route('contact.index') },
                                        { label: 'Vehículos Híbridos', href: `${route('vehicles.index')}?fuel_type[]=Híbrido` },
                                        { label: 'Mejores Precios', href: `${route('vehicles.index')}?sort_by=price_asc` },
                                    ].map(({ label, href }) => (
                                        <li key={label}>
                                            <Link href={href} style={{ color: '#555', fontSize: '0.875rem', textDecoration: 'none', fontFamily: "'DM Sans'", transition: 'color 0.2s ease' }}
                                                onMouseEnter={e => e.currentTarget.style.color = '#C3002F'}
                                                onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h5 style={{ fontFamily: "'Bebas Neue'", fontSize: '1rem', letterSpacing: '0.12em', color: '#fff', marginBottom: '1.25rem' }}>Contacto</h5>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', text: 'Blvd. Domingo Arrieta #1234, Gómez Palacio, Durango' },
                                        { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '(614) 123-4567', href: 'tel:6141234567' },
                                        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Lun–Sáb 9am–7pm · Dom 10am–3pm' },
                                    ].map(({ icon, text, href }, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                            <svg style={{ width: '1rem', height: '1rem', color: '#C3002F', flexShrink: 0, marginTop: '0.125rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                                            </svg>
                                            {href ? (
                                                <a href={href} style={{ color: '#555', fontSize: '0.875rem', fontFamily: "'DM Sans'", textDecoration: 'none', lineHeight: 1.5 }}>{text}</a>
                                            ) : (
                                                <span style={{ color: '#555', fontSize: '0.875rem', fontFamily: "'DM Sans'", lineHeight: 1.5 }}>{text}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sub-footer */}
                    <div style={{ borderTop: '1px solid #141414', padding: '1.25rem 2rem' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                            <p style={{ color: '#333', fontSize: '0.8125rem', fontFamily: "'DM Sans'" }}>&copy; {new Date().getFullYear()} AutoGalería. Todos los derechos reservados.</p>
                            <p style={{ color: '#2a2a2a', fontSize: '0.8125rem', fontFamily: "'DM Sans'" }}>Gómez Palacio, Durango, México</p>
                        </div>
                    </div>
                </footer>

                {/* BOTTOM QUOTE BAR */}
                <BottomQuoteBar />

                {/* WHATSAPP FAB */}
                <a href={`${WA_BASE}?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20los%20veh%C3%ADculos.`} target="_blank" rel="noreferrer" className="whatsapp-fab" aria-label="WhatsApp">
                    <WhatsAppIcon className="w-7 h-7" />
                </a>
            </div>
        </>
    );
}
