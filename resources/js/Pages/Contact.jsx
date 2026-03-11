import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ScrollReveal } from '@/hooks/useScrollReveal.jsx';

const WA_NUMBER = '526141234567';

const WaIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Contact({ flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', phone: '', message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), { onSuccess: () => reset() });
    };

    const contactItems = [
        {
            title: 'Dirección',
            content: 'Blvd. Domingo Arrieta #1234\nGómez Palacio, Durango, México',
            icon: (
                <svg width="18" height="18" fill="none" stroke="#C3002F" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            title: 'Teléfono',
            content: null,
            link: { href: 'tel:6141234567', label: '(614) 123-4567' },
            icon: (
                <svg width="18" height="18" fill="none" stroke="#C3002F" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
        },
        {
            title: 'WhatsApp',
            content: null,
            link: { href: `https://wa.me/${WA_NUMBER}`, label: '(614) 123-4567', external: true, green: true },
            icon: <WaIcon />,
            iconGreen: true,
        },
        {
            title: 'Horarios',
            content: 'Lun – Sáb: 9:00am – 7:00pm\nDomingo: 10:00am – 3:00pm',
            icon: (
                <svg width="18" height="18" fill="none" stroke="#C3002F" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <PublicLayout
            title="Contacto y Cotización — AutoGalería"
            description="Contáctanos para solicitar cotización. Asesoría personalizada, financiamiento y más."
        >
            {/* ─── PAGE HEADER ─── */}
            <div style={{
                position: 'relative', overflow: 'hidden',
                padding: '5rem 0 3.5rem',
                borderBottom: '1px solid #1c1c1c',
                background: `linear-gradient(105deg, rgba(0,0,0,0.97) 50%, rgba(0,0,0,0.6) 100%), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80') center/cover no-repeat`,
            }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#C3002F' }} />
                <div className="max-w-7xl mx-auto px-8" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <Link href={route('home')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', textDecoration: 'none' }}>Inicio</Link>
                        <span style={{ color: '#333' }}>/</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C3002F' }}>Contacto</span>
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C3002F', marginBottom: '0.625rem' }}>
                        Estamos para ayudarte
                    </div>
                    <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '0.02em', color: '#f0f0f0', lineHeight: 0.9 }}>
                        CONTÁCTANOS<br />
                        <span style={{ color: '#555', fontSize: '60%' }}>SIN COMPROMISO</span>
                    </h1>
                </div>
            </div>

            <div style={{ backgroundColor: '#0c0c0c' }}>
                <div className="max-w-7xl mx-auto px-8 py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* ─── CONTACT INFO ─── */}
                        <div>
                            <ScrollReveal>
                                <div style={{ marginBottom: '2.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                                        <div style={{ width: 3, height: 20, background: '#C3002F' }} />
                                        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.125rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>
                                            INFORMACIÓN
                                        </h2>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {contactItems.map(({ title, content, link, icon, iconGreen }) => (
                                            <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                                <div style={{
                                                    width: 40, height: 40, flexShrink: 0,
                                                    border: `1px solid ${iconGreen ? 'rgba(37,211,102,0.3)' : '#1c1c1c'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    background: iconGreen ? 'rgba(37,211,102,0.06)' : '#141414',
                                                }}>
                                                    {icon}
                                                </div>
                                                <div>
                                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginBottom: '0.3rem' }}>
                                                        {title}
                                                    </div>
                                                    {content && (
                                                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#888', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{content}</p>
                                                    )}
                                                    {link && (
                                                        <a
                                                            href={link.href}
                                                            target={link.external ? '_blank' : undefined}
                                                            rel={link.external ? 'noreferrer' : undefined}
                                                            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: link.green ? '#25D366' : '#C3002F', textDecoration: 'none' }}
                                                        >
                                                            {link.label}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* WhatsApp CTA */}
                                <a
                                    href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20veh%C3%ADculos.`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-wa"
                                >
                                    <WaIcon />
                                    Escribir por WhatsApp
                                </a>
                            </ScrollReveal>
                        </div>

                        {/* ─── FORM ─── */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <ScrollReveal delay={1}>
                                <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '2.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                        <div style={{ width: 3, height: 20, background: '#C3002F' }} />
                                        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.125rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>
                                            SOLICITAR COTIZACIÓN
                                        </h2>
                                    </div>

                                    {flash?.success && (
                                        <div style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366', padding: '1rem 1.125rem', marginBottom: '1.5rem', display: 'flex', gap: '0.625rem', alignItems: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem' }}>
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {flash.success}
                                        </div>
                                    )}

                                    <form onSubmit={submit}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ marginBottom: '1.25rem' }}>
                                            <div>
                                                <label className="form-label">Nombre completo *</label>
                                                <input type="text" className="form-input" placeholder="Juan García" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                                {errors.name && <p style={{ color: '#C3002F', fontSize: '0.75rem', marginTop: '0.3rem', fontFamily: "'DM Sans', sans-serif" }}>{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="form-label">Correo electrónico *</label>
                                                <input type="email" className="form-input" placeholder="correo@ejemplo.com" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                                {errors.email && <p style={{ color: '#C3002F', fontSize: '0.75rem', marginTop: '0.3rem', fontFamily: "'DM Sans', sans-serif" }}>{errors.email}</p>}
                                            </div>
                                            <div>
                                                <label className="form-label">Teléfono *</label>
                                                <input type="tel" className="form-input" placeholder="(614) 000-0000" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                                                {errors.phone && <p style={{ color: '#C3002F', fontSize: '0.75rem', marginTop: '0.3rem', fontFamily: "'DM Sans', sans-serif" }}>{errors.phone}</p>}
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="form-label">Mensaje</label>
                                                <textarea className="form-input" rows={4} placeholder="Cuéntanos qué modelo te interesa, tu presupuesto, si necesitas financiamiento, etc." value={data.message} onChange={e => setData('message', e.target.value)} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-primary" style={{ fontSize: '0.8125rem', padding: '0.9375rem 2.5rem' }} disabled={processing}>
                                            {processing ? 'Enviando...' : 'Enviar Solicitud'}
                                        </button>
                                    </form>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* ─── MAP ─── */}
                    <ScrollReveal>
                        <div style={{ marginTop: '4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: 3, height: 20, background: '#C3002F' }} />
                                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.125rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>
                                    CÓMO LLEGAR
                                </h2>
                            </div>
                            <div style={{ height: 340, overflow: 'hidden', border: '1px solid #1c1c1c' }}>
                                <iframe
                                    src="https://maps.google.com/maps?q=25.5694,-103.4997&z=14&output=embed"
                                    width="100%"
                                    height="340"
                                    style={{ border: 0, display: 'block', filter: 'grayscale(30%) contrast(1.1)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación AutoGalería Gómez Palacio"
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </PublicLayout>
    );
}
