import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const messages = {
    404: {
        code: '404',
        title: 'Página no encontrada',
        description: 'La página que buscas no existe o fue movida.',
    },
    403: {
        code: '403',
        title: 'Acceso denegado',
        description: 'No tienes permiso para ver esta página.',
    },
    500: {
        code: '500',
        title: 'Error del servidor',
        description: 'Algo salió mal. Intenta de nuevo más tarde.',
    },
};

export default function Error({ status }) {
    const { code, title, description } = messages[status] ?? {
        code: String(status),
        title: 'Error inesperado',
        description: 'Algo salió mal.',
    };

    return (
        <PublicLayout title={`${code} — AutoGalería`}>
            <div style={{
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 2rem',
                textAlign: 'center',
                backgroundColor: '#0c0c0c',
            }}>
                <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(6rem, 20vw, 12rem)',
                    lineHeight: 1,
                    color: '#1a1a1a',
                    letterSpacing: '0.05em',
                    userSelect: 'none',
                }}>
                    {code}
                </div>

                <div style={{ width: 40, height: 3, background: '#F5C518', margin: '0 auto 1.5rem' }} />

                <h1 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                    letterSpacing: '0.1em',
                    color: '#f0f0f0',
                    marginBottom: '0.75rem',
                }}>
                    {title}
                </h1>

                <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    color: '#666',
                    marginBottom: '2.5rem',
                    maxWidth: 380,
                }}>
                    {description}
                </p>

                <Link
                    href={route('home')}
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#f0f0f0',
                        background: '#F5C518',
                        padding: '0.875rem 2rem',
                        textDecoration: 'none',
                        display: 'inline-block',
                    }}
                >
                    Volver al inicio
                </Link>
            </div>
        </PublicLayout>
    );
}
