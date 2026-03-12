import { Link, router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

const NavIcon = ({ d, fill = false }) => (
    <svg width="16" height="16" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'}
        strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={d} />
    </svg>
);

export default function AdminLayout({ children, title = 'Dashboard', pageTitle = 'Dashboard' }) {
    const { url } = usePage();
    const { flash } = usePage().props;

    const isRoute = (pattern) => url.startsWith(pattern);

    const logout = (e) => {
        e.preventDefault();
        router.post(route('admin.logout'));
    };

    const navItems = [
        {
            href: route('admin.dashboard'),
            label: 'Dashboard',
            active: url === '/admin' || url === '/admin/',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        },
        {
            href: route('admin.vehiculos.index'),
            label: 'Vehículos',
            active: isRoute('/admin/vehiculos') && !url.includes('/create') && !url.includes('/edit'),
            icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        },
        {
            href: route('admin.contactos.index'),
            label: 'Solicitudes',
            active: isRoute('/admin/contactos'),
            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        },
        {
            href: route('admin.vehiculos.create'),
            label: 'Agregar',
            active: url.includes('/create'),
            icon: 'M12 4v16m8-8H4',
        },
    ];

    return (
        <>
            <Head title={`${title} — Admin`} />
            <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', fontFamily: "'DM Sans', sans-serif" }}>

                {/* ─── SIDEBAR ─── */}
                <aside style={{ width: 220, background: '#111111', borderRight: '1px solid #1c1c1c', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

                    {/* Brand */}
                    <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid #1c1c1c' }}>
                        <Link href={route('admin.dashboard')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                            <div style={{ width: 3, height: 22, background: '#F5C518', flexShrink: 0 }} />
                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.25rem', letterSpacing: '0.06em', color: '#fff', lineHeight: 1 }}>
                                AUTO<span style={{ color: '#F5C518' }}>GALERÍA</span>
                            </span>
                        </Link>
                        <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#333', marginTop: '0.375rem', paddingLeft: '0.875rem' }}>
                            Panel Admin
                        </p>
                    </div>

                    {/* Nav */}
                    <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                        {navItems.map(({ href, label, active, icon }) => (
                            <Link key={label} href={href} className={`admin-sidebar-link ${active ? 'active' : ''}`}>
                                <NavIcon d={icon} />
                                {label}
                            </Link>
                        ))}

                        <div style={{ height: 1, background: '#1c1c1c', margin: '0.75rem 0' }} />

                        <a href={route('home')} target="_blank" rel="noreferrer" className="admin-sidebar-link">
                            <NavIcon d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            Ver Sitio
                        </a>
                    </nav>

                    {/* Logout */}
                    <div style={{ padding: '0.75rem', borderTop: '1px solid #1c1c1c' }}>
                        <form onSubmit={logout}>
                            <button type="submit" className="admin-sidebar-link" style={{ width: '100%', border: 'none', cursor: 'pointer', background: 'transparent', textAlign: 'left' }}>
                                <NavIcon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                Cerrar Sesión
                            </button>
                        </form>
                    </div>
                </aside>

                {/* ─── MAIN ─── */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                    {/* Top bar */}
                    <header style={{ background: '#111111', borderBottom: '1px solid #1c1c1c', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.125rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>
                            {pageTitle}
                        </h1>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#333' }}>
                            AutoGalería
                        </span>
                    </header>

                    {/* Flash */}
                    {flash?.success && (
                        <div style={{ background: 'rgba(37,211,102,0.08)', borderBottom: '1px solid rgba(37,211,102,0.2)', color: '#25D366', padding: '0.75rem 1.5rem', fontSize: '0.875rem', display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div style={{ background: 'rgba(195,0,47,0.08)', borderBottom: '1px solid rgba(195,0,47,0.2)', color: '#ff4d6a', padding: '0.75rem 1.5rem', fontSize: '0.875rem', display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {flash.error}
                        </div>
                    )}

                    <main style={{ flex: 1, padding: '1.75rem', overflowY: 'auto' }}>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
