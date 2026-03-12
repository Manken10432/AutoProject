import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const STATUS = {
    replied: { label: 'Respondida', bg: 'rgba(37,211,102,0.1)', color: '#25D366', border: 'rgba(37,211,102,0.3)' },
    read:    { label: 'Leída',      bg: 'rgba(245,197,24,0.08)', color: '#F5C518',  border: 'rgba(245,197,24,0.3)' },
    unread:  { label: 'Nueva',      bg: 'rgba(245,197,24,0.15)', color: '#0c0c0c',  border: '#F5C518', fontWeight: 700 },
};

function getStatus(contact) {
    if (contact.replied_at) return STATUS.replied;
    if (contact.read_at)    return STATUS.read;
    return STATUS.unread;
}

function destroy(contact) {
    if (confirm(`¿Eliminar la solicitud de ${contact.name}?`)) {
        router.delete(route('admin.contactos.destroy', contact.id));
    }
}

export default function AdminContactsIndex({ contacts, unreadCount }) {
    return (
        <AdminLayout title="Solicitudes" pageTitle="Solicitudes de Contacto">

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {unreadCount > 0 && (
                        <span style={{ background: '#F5C518', color: '#0c0c0c', fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.625rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            {unreadCount} nueva{unreadCount !== 1 ? 's' : ''}
                        </span>
                    )}
                    <span style={{ color: '#444', fontSize: '0.8rem' }}>{contacts.total} solicitudes en total</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.72rem', color: '#444' }}>
                    {Object.values(STATUS).map(s => (
                        <span key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <span style={{ width: 8, height: 8, background: s.color, display: 'inline-block', borderRadius: 2 }} />
                            {s.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div style={{ background: '#141414', border: '1px solid #1c1c1c' }}>
                {contacts.data.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #1c1c1c' }}>
                                    {['Estado', 'Nombre', 'Email', 'Teléfono', 'Vehículo', 'Fecha', 'Acciones'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#444', whiteSpace: 'nowrap' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.data.map(contact => {
                                    const status = getStatus(contact);
                                    return (
                                        <tr key={contact.id} style={{ borderBottom: '1px solid #1a1a1a', background: !contact.read_at ? 'rgba(245,197,24,0.03)' : 'transparent' }}>
                                            <td style={{ padding: '0.875rem 1rem' }}>
                                                <span style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}`, fontSize: '0.62rem', fontWeight: status.fontWeight || 600, padding: '0.2rem 0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td style={{ padding: '0.875rem 1rem', fontWeight: contact.read_at ? 400 : 700, color: '#e0e0e0', whiteSpace: 'nowrap' }}>
                                                {contact.name}
                                            </td>
                                            <td style={{ padding: '0.875rem 1rem', color: '#888', whiteSpace: 'nowrap' }}>{contact.email}</td>
                                            <td style={{ padding: '0.875rem 1rem', color: '#888', whiteSpace: 'nowrap' }}>{contact.phone}</td>
                                            <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                                                {contact.vehicle ? (
                                                    <span style={{ color: '#F5C518', fontWeight: 600 }}>
                                                        {contact.vehicle.year} {contact.vehicle.brand} {contact.vehicle.model}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: '#333' }}>General</span>
                                                )}
                                            </td>
                                            <td style={{ padding: '0.875rem 1rem', color: '#444', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                                                {new Date(contact.created_at).toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <Link
                                                        href={route('admin.contactos.show', contact.id)}
                                                        style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F5C518', textDecoration: 'none', padding: '0.3rem 0.625rem', border: '1px solid rgba(245,197,24,0.3)', background: 'rgba(245,197,24,0.06)' }}
                                                    >
                                                        Ver
                                                    </Link>
                                                    <button
                                                        onClick={() => destroy(contact)}
                                                        style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#ff4d6a', background: 'rgba(195,0,47,0.08)', border: '1px solid rgba(195,0,47,0.2)', padding: '0.3rem 0.625rem', cursor: 'pointer' }}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
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

            {/* Pagination */}
            {contacts.last_page > 1 && (
                <div style={{ display: 'flex', gap: '0.375rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                    {contacts.links.map((link, i) => (
                        link.url ? (
                            <Link key={i} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }}
                                style={{ display: 'inline-flex', alignItems: 'center', padding: '0.4rem 0.75rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 600, background: link.active ? '#F5C518' : '#141414', color: link.active ? '#0c0c0c' : '#555', border: `1px solid ${link.active ? '#F5C518' : '#2a2a2a'}`, textDecoration: 'none' }}
                            />
                        ) : (
                            <span key={i} dangerouslySetInnerHTML={{ __html: link.label }}
                                style={{ display: 'inline-flex', alignItems: 'center', padding: '0.4rem 0.75rem', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#2a2a2a', border: '1px solid #1c1c1c', background: '#111' }}
                            />
                        )
                    ))}
                </div>
            )}

        </AdminLayout>
    );
}
