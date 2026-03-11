import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard({ stats, recentContacts }) {
    const statCards = [
        { label: 'Total', value: stats.total, color: '#F5C518', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { label: 'Disponibles', value: stats.available, color: '#25D366', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { label: 'Vendidos', value: stats.sold, color: '#888', icon: 'M5 13l4 4L19 7' },
        { label: 'Destacados', value: stats.featured, color: '#f59e0b', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    ];

    return (
        <AdminLayout title="Dashboard" pageTitle="Dashboard">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" style={{ marginBottom: '1.75rem' }}>
                {statCards.map(({ label, value, color, icon }) => (
                    <div key={label} style={{ background: '#141414', border: '1px solid #1c1c1c', borderLeft: `3px solid ${color}`, padding: '1.25rem 1.375rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#444' }}>{label}</span>
                            <svg width="14" height="14" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
                                <path d={icon} />
                            </svg>
                        </div>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.25rem', color, lineHeight: 1, letterSpacing: '0.02em' }}>{value}</div>
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                <Link href={route('admin.vehiculos.create')} className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.625rem 1.25rem' }}>
                    + Agregar Vehículo
                </Link>
                <a href={route('vehicles.index')} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.625rem 1.25rem' }}>
                    Ver Inventario Público
                </a>
            </div>

            {/* Recent contacts */}
            <div style={{ background: '#141414', border: '1px solid #1c1c1c' }}>
                <div style={{ padding: '1rem 1.375rem', borderBottom: '1px solid #1c1c1c', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>
                        SOLICITUDES RECIENTES
                    </h2>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#333' }}>
                        Últimas {recentContacts.length}
                    </span>
                </div>

                {recentContacts.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #1c1c1c' }}>
                                    {['Nombre', 'Teléfono', 'Email', 'Vehículo', 'Fecha'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1.125rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#444' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentContacts.map(contact => (
                                    <tr key={contact.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                        <td style={{ padding: '0.875rem 1.125rem', fontWeight: 600, color: '#e0e0e0' }}>{contact.name}</td>
                                        <td style={{ padding: '0.875rem 1.125rem', color: '#888' }}>{contact.phone}</td>
                                        <td style={{ padding: '0.875rem 1.125rem', color: '#888' }}>{contact.email}</td>
                                        <td style={{ padding: '0.875rem 1.125rem' }}>
                                            {contact.vehicle ? (
                                                <a href={route('vehicles.show', contact.vehicle.id)} target="_blank" rel="noreferrer" style={{ color: '#F5C518', textDecoration: 'none', fontWeight: 600 }}>
                                                    {contact.vehicle.year} {contact.vehicle.brand} {contact.vehicle.model}
                                                </a>
                                            ) : (
                                                <span style={{ color: '#333' }}>General</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '0.875rem 1.125rem', color: '#444', fontSize: '0.75rem' }}>
                                            {new Date(contact.created_at).toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.08em', color: '#222', marginBottom: '0.5rem' }}>SIN SOLICITUDES</div>
                        <p style={{ color: '#333', fontSize: '0.875rem' }}>Las solicitudes de contacto aparecerán aquí.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
