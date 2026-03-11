import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function AdminLogin() {
    const { data, setData, post, processing, errors } = useForm({ password: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.post'));
    };

    return (
        <>
            <Head title="Admin — AutoGalería" />
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', fontFamily: "'DM Sans', sans-serif" }}>

                {/* Decorative left bar */}
                <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 3, background: '#C3002F' }} />

                <div style={{ width: '100%', maxWidth: 380, padding: '0 1.5rem' }}>

                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: 3, height: 28, background: '#C3002F' }} />
                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.75rem', letterSpacing: '0.06em', color: '#fff', lineHeight: 1 }}>
                                AUTO<span style={{ color: '#C3002F' }}>GALERÍA</span>
                            </span>
                        </div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#333' }}>
                            Panel Administrativo
                        </p>
                    </div>

                    {/* Card */}
                    <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '2rem' }}>
                        <div style={{ marginBottom: '1.75rem' }}>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.25rem', letterSpacing: '0.1em', color: '#f0f0f0', marginBottom: '0.25rem' }}>
                                ACCESO
                            </div>
                            <p style={{ fontSize: '0.8125rem', color: '#555' }}>Ingresa tu contraseña para continuar</p>
                        </div>

                        <form onSubmit={submit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555', marginBottom: '0.5rem' }}>
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="form-input"
                                    style={{ borderColor: errors.password ? '#C3002F' : undefined }}
                                    placeholder="••••••••"
                                    required
                                    autoFocus
                                />
                                {errors.password && (
                                    <p style={{ color: '#ff4d6a', fontSize: '0.75rem', marginTop: '0.375rem', fontWeight: 500 }}>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary"
                                style={{ width: '100%', textAlign: 'center', opacity: processing ? 0.7 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}
                            >
                                {processing ? 'Accediendo...' : 'Acceder'}
                            </button>
                        </form>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: '#2a2a2a' }}>
                        &copy; {new Date().getFullYear()} AutoGalería
                    </p>
                </div>
            </div>
        </>
    );
}
