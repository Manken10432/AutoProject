import { Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminContactsShow({ contact, flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({ message: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.contactos.reply', contact.id), { onSuccess: () => reset() });
    };

    const destroy = () => {
        if (confirm(`¿Eliminar la solicitud de ${contact.name}?`)) {
            router.delete(route('admin.contactos.destroy', contact.id));
        }
    };

    return (
        <AdminLayout title="Solicitud" pageTitle="Detalle de Solicitud">
            <div style={{ maxWidth: 760 }}>

                {/* Back + delete */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <Link href={route('admin.contactos.index')} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5C518', textDecoration: 'none' }}>
                        &larr; Todas las Solicitudes
                    </Link>
                    <button onClick={destroy} style={{ background: 'transparent', border: '1px solid rgba(195,0,47,0.3)', color: '#ff4d6a', padding: '0.4rem 0.875rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                        Eliminar Solicitud
                    </button>
                </div>

                {/* Flash */}
                {flash?.success && (
                    <div style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366', padding: '0.875rem 1.125rem', marginBottom: '1.25rem', display: 'flex', gap: '0.625rem', alignItems: 'center', fontSize: '0.875rem' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {flash.success}
                    </div>
                )}

                {/* Contact info */}
                <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '1.75rem', marginBottom: '1px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: 3, height: 18, background: '#F5C518' }} />
                        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>INFORMACIÓN DEL CONTACTO</h2>
                        {contact.replied_at && (
                            <span style={{ marginLeft: 'auto', background: 'rgba(37,211,102,0.1)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)', fontSize: '0.62rem', fontWeight: 700, padding: '0.2rem 0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                Respondida
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: 'Nombre', value: contact.name },
                            { label: 'Email', value: contact.email },
                            { label: 'Teléfono', value: contact.phone },
                            { label: 'Fecha', value: new Date(contact.created_at).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }) },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#444', marginBottom: '0.3rem' }}>{label}</div>
                                <div style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>{value}</div>
                            </div>
                        ))}
                    </div>

                    {contact.vehicle && (
                        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #1c1c1c' }}>
                            <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#444', marginBottom: '0.3rem' }}>Vehículo de interés</div>
                            <Link href={route('vehicles.show', contact.vehicle.id)} target="_blank" style={{ color: '#F5C518', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
                                {contact.vehicle.year} {contact.vehicle.brand} {contact.vehicle.model} &rsaquo;
                            </Link>
                        </div>
                    )}
                </div>

                {/* Message */}
                <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderTop: '1px solid #1a1a1a', padding: '1.75rem', marginBottom: '1px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                        <div style={{ width: 3, height: 18, background: '#F5C518' }} />
                        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>MENSAJE</h2>
                    </div>
                    <p style={{ color: '#888', fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>
                        {contact.message || <span style={{ color: '#333', fontStyle: 'italic' }}>Sin mensaje.</span>}
                    </p>
                </div>

                {/* Reply form */}
                <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderTop: '1px solid #1a1a1a', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                        <div style={{ width: 3, height: 18, background: '#F5C518' }} />
                        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>RESPONDER A {contact.email}</h2>
                    </div>

                    {contact.replied_at && (
                        <div style={{ background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)', color: '#25D366', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
                            Respondida el {new Date(contact.replied_at).toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' })}. Puedes enviar otra respuesta si lo necesitas.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label className="form-label">Mensaje de respuesta *</label>
                            <textarea
                                className="form-input"
                                rows={7}
                                placeholder={`Hola ${contact.name}, gracias por contactarnos...`}
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                required
                            />
                            {errors.message && <p style={{ color: '#ff4d6a', fontSize: '0.75rem', marginTop: '0.3rem' }}>{errors.message}</p>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <button type="submit" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.75rem 1.75rem' }} disabled={processing}>
                                {processing ? 'Enviando...' : 'Enviar Respuesta por Email'}
                            </button>
                            <span style={{ fontSize: '0.75rem', color: '#444' }}>
                                Se enviará a <strong style={{ color: '#888' }}>{contact.email}</strong>
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        </AdminLayout>
    );
}
