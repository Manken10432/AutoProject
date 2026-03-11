import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminVehiclesIndex({ vehicles }) {
    const toggleStatus = (id) => router.patch(route('admin.vehiculos.status', id), {}, { preserveScroll: true });
    const toggleFeatured = (id) => router.patch(route('admin.vehiculos.featured', id), {}, { preserveScroll: true });
    const destroy = (id) => {
        if (confirm('¿Eliminar este vehículo? Esta acción no se puede deshacer.')) {
            router.delete(route('admin.vehiculos.destroy', id));
        }
    };

    return (
        <AdminLayout title="Vehículos" pageTitle="Gestión de Vehículos">

            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <p style={{ fontSize: '0.8125rem', color: '#444', fontWeight: 600 }}>
                    {vehicles.total} vehículo{vehicles.total !== 1 ? 's' : ''} en total
                </p>
                <Link href={route('admin.vehiculos.create')} className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.625rem 1.25rem' }}>
                    + Agregar Vehículo
                </Link>
            </div>

            <div style={{ background: '#141414', border: '1px solid #1c1c1c' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #1c1c1c' }}>
                                {['#', 'Vehículo', 'Precio', 'Km', 'Estado', '★', 'Acciones'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '0.875rem 1rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#444' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.data.length > 0 ? vehicles.data.map(vehicle => (
                                <tr key={vehicle.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                    <td style={{ padding: '0.875rem 1rem', color: '#333', fontSize: '0.75rem' }}>
                                        {vehicle.id}
                                    </td>
                                    <td style={{ padding: '0.875rem 1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                                            <div style={{ width: 54, height: 40, overflow: 'hidden', background: '#1c1c1c', flexShrink: 0 }}>
                                                <img src={vehicle.first_image} alt={vehicle.brand} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, color: '#e0e0e0', fontSize: '0.8125rem' }}>
                                                    {vehicle.year} {vehicle.brand} {vehicle.model}
                                                </div>
                                                <div style={{ color: '#444', fontSize: '0.72rem', marginTop: '0.125rem' }}>
                                                    {vehicle.fuel_type} · {vehicle.transmission}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.875rem 1rem', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.04em', color: '#F5C518' }}>
                                        ${Number(vehicle.price).toLocaleString('es-MX')}
                                    </td>
                                    <td style={{ padding: '0.875rem 1rem', color: '#555', fontSize: '0.75rem' }}>
                                        {Number(vehicle.mileage).toLocaleString('es-MX')} km
                                    </td>
                                    <td style={{ padding: '0.875rem 1rem' }}>
                                        <button onClick={() => toggleStatus(vehicle.id)} style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}>
                                            <span className={vehicle.status === 'available' ? 'badge-available' : 'badge-sold'}>
                                                {vehicle.status === 'available' ? 'Disponible' : 'Vendido'}
                                            </span>
                                        </button>
                                    </td>
                                    <td style={{ padding: '0.875rem 1rem' }}>
                                        <button onClick={() => toggleFeatured(vehicle.id)} style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }} title={vehicle.featured ? 'Quitar destacado' : 'Destacar'}>
                                            <svg width="16" height="16" viewBox="0 0 20 20"
                                                fill={vehicle.featured ? '#f59e0b' : 'none'}
                                                stroke={vehicle.featured ? 'none' : '#333'}
                                                strokeWidth={1.5}>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td style={{ padding: '0.875rem 1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                                            <a
                                                href={route('vehicles.show', vehicle.id)}
                                                target="_blank" rel="noreferrer"
                                                style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', color: '#666', padding: '0.3rem 0.5rem', fontSize: '0.7rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                                                title="Ver en sitio"
                                            >
                                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </a>
                                            <Link
                                                href={route('admin.vehiculos.edit', vehicle.id)}
                                                style={{ background: 'rgba(195,0,47,0.1)', border: '1px solid rgba(195,0,47,0.2)', color: '#F5C518', padding: '0.3rem 0.625rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.06em' }}
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => destroy(vehicle.id)}
                                                style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#444', padding: '0.3rem 0.625rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.06em' }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} style={{ padding: '4rem', textAlign: 'center' }}>
                                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', letterSpacing: '0.08em', color: '#222', marginBottom: '0.625rem' }}>SIN VEHÍCULOS</div>
                                        <Link href={route('admin.vehiculos.create')} style={{ color: '#F5C518', fontWeight: 700, fontSize: '0.875rem' }}>
                                            Agregar el primero
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {vehicles.last_page > 1 && (
                    <div style={{ padding: '1rem', borderTop: '1px solid #1c1c1c', display: 'flex', gap: '0.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {vehicles.links.map((link, i) => (
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', padding: '0.35rem 0.625rem',
                                        fontSize: '0.75rem', fontWeight: 600,
                                        background: link.active ? '#F5C518' : '#1c1c1c',
                                        color: link.active ? '#fff' : '#555',
                                        border: `1px solid ${link.active ? '#F5C518' : '#2a2a2a'}`,
                                        textDecoration: 'none',
                                    }}
                                />
                            ) : (
                                <span
                                    key={i}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    style={{ display: 'inline-flex', alignItems: 'center', padding: '0.35rem 0.625rem', fontSize: '0.75rem', color: '#2a2a2a', border: '1px solid #1c1c1c' }}
                                />
                            )
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
