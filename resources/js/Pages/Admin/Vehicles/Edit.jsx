import { Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const FUEL_TYPES = ['Gasolina', 'Diesel', 'Híbrido', 'Eléctrico'];
const TRANSMISSIONS = ['Automática', 'Manual'];
const CURRENT_YEAR = new Date().getFullYear();

const Field = ({ label, error, span2 = false, children }) => (
    <div className={span2 ? 'sm:col-span-2' : ''}>
        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#555', marginBottom: '0.375rem' }}>
            {label}
        </label>
        {children}
        {error && <p style={{ color: '#ff4d6a', fontSize: '0.72rem', marginTop: '0.25rem' }}>{error}</p>}
    </div>
);

const SectionHeader = ({ title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 3, height: 18, background: '#C3002F' }} />
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>{title}</h2>
    </div>
);

export default function AdminVehiclesEdit({ vehiculo }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        brand: vehiculo.brand || '',
        model: vehiculo.model || '',
        year: vehiculo.year || CURRENT_YEAR,
        price: vehiculo.price || '',
        mileage: vehiculo.mileage || '',
        fuel_type: vehiculo.fuel_type || '',
        transmission: vehiculo.transmission || '',
        color: vehiculo.color || '',
        status: vehiculo.status || 'available',
        featured: vehiculo.featured || false,
        description: vehiculo.description || '',
        images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.vehiculos.update', vehiculo.id), { forceFormData: true });
    };

    const destroy = () => {
        if (confirm('¿Eliminar este vehículo definitivamente?')) {
            router.delete(route('admin.vehiculos.destroy', vehiculo.id));
        }
    };

    const currentImages = vehiculo.images || [];
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout
            title="Editar Vehículo"
            pageTitle={`Editar: ${vehiculo.year} ${vehiculo.brand} ${vehiculo.model}`}
        >
            <div style={{ maxWidth: 820 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <Link href={route('admin.vehiculos.index')} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C3002F', textDecoration: 'none' }}>
                        &larr; Volver a Vehículos
                    </Link>
                    <button
                        type="button"
                        onClick={destroy}
                        style={{ background: 'transparent', border: '1px solid rgba(195,0,47,0.3)', color: '#C3002F', padding: '0.4rem 0.875rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
                    >
                        Eliminar Vehículo
                    </button>
                </div>

                {hasErrors && (
                    <div style={{ background: 'rgba(195,0,47,0.08)', border: '1px solid rgba(195,0,47,0.2)', color: '#ff4d6a', padding: '1rem 1.25rem', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
                        <p style={{ fontWeight: 700, marginBottom: '0.375rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Corrige los errores:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                            {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                        </ul>
                    </div>
                )}

                <form onSubmit={submit} encType="multipart/form-data">
                    {/* Main fields */}
                    <div style={{ background: '#141414', border: '1px solid #1c1c1c', padding: '1.75rem', marginBottom: '1px' }}>
                        <SectionHeader title="INFORMACIÓN DEL VEHÍCULO" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Marca *', key: 'brand', type: 'text', placeholder: 'Nissan, Toyota...', required: true },
                                { label: 'Modelo *', key: 'model', type: 'text', placeholder: 'Frontier, Corolla...', required: true },
                                { label: 'Año *', key: 'year', type: 'number', min: 1990, max: CURRENT_YEAR + 1, required: true },
                                { label: 'Precio MXN *', key: 'price', type: 'number', min: 0, step: 1000, required: true },
                                { label: 'Kilometraje *', key: 'mileage', type: 'number', min: 0, required: true },
                                { label: 'Color', key: 'color', type: 'text', placeholder: 'Blanco, Negro...' },
                            ].map(({ label, key, type, ...rest }) => (
                                <Field key={key} label={label} error={errors[key]}>
                                    <input type={type} className="form-input" value={data[key]} onChange={e => setData(key, e.target.value)} {...rest} />
                                </Field>
                            ))}

                            <Field label="Combustible *" error={errors.fuel_type}>
                                <select className="form-input" value={data.fuel_type} onChange={e => setData('fuel_type', e.target.value)} required>
                                    <option value="">Seleccionar...</option>
                                    {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </Field>
                            <Field label="Transmisión *" error={errors.transmission}>
                                <select className="form-input" value={data.transmission} onChange={e => setData('transmission', e.target.value)} required>
                                    <option value="">Seleccionar...</option>
                                    {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </Field>
                            <Field label="Estado *" error={errors.status}>
                                <select className="form-input" value={data.status} onChange={e => setData('status', e.target.value)} required>
                                    <option value="available">Disponible</option>
                                    <option value="sold">Vendido</option>
                                </select>
                            </Field>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem' }}>
                                <input type="checkbox" id="featured" checked={data.featured} onChange={e => setData('featured', e.target.checked)} style={{ width: '1.125rem', height: '1.125rem', accentColor: '#C3002F', cursor: 'pointer' }} />
                                <label htmlFor="featured" style={{ fontWeight: 600, color: '#888', fontSize: '0.875rem', cursor: 'pointer' }}>Marcar como Destacado</label>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderTop: '1px solid #1a1a1a', padding: '1.75rem', marginBottom: '1px' }}>
                        <SectionHeader title="DESCRIPCIÓN" />
                        <textarea className="form-input" rows={4} value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Describe las características del vehículo..." />
                    </div>

                    {/* Current images */}
                    {currentImages.length > 0 && (
                        <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderTop: '1px solid #1a1a1a', padding: '1.75rem', marginBottom: '1px' }}>
                            <SectionHeader title="IMÁGENES ACTUALES" />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.375rem' }}>
                                {currentImages.map((img, i) => (
                                    <div key={i} style={{ overflow: 'hidden', height: 75, border: '1px solid #1c1c1c' }}>
                                        <img src={img} alt={`Imagen ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New images */}
                    <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderTop: '1px solid #1a1a1a', padding: '1.75rem', marginBottom: '1.5rem' }}>
                        <SectionHeader title={currentImages.length > 0 ? 'AGREGAR IMÁGENES' : 'IMÁGENES'} />
                        <div style={{ border: '1px dashed #2a2a2a', padding: '2rem', textAlign: 'center', background: '#111' }}>
                            <input
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                style={{ display: 'block', margin: '0 auto', fontSize: '0.875rem', color: '#888' }}
                                onChange={e => setData('images', Array.from(e.target.files))}
                            />
                            <p style={{ color: '#333', fontSize: '0.72rem', marginTop: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>
                                {currentImages.length > 0 ? 'Las nuevas imágenes se agregarán a las existentes.' : 'JPG, PNG, WebP · Máx. 5MB por imagen'}
                            </p>
                        </div>
                        {errors.images && <p style={{ color: '#ff4d6a', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.images}</p>}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <button type="submit" className="btn-primary" style={{ fontSize: '0.8125rem', padding: '0.875rem 2rem' }} disabled={processing}>
                            {processing ? 'Actualizando...' : 'Actualizar Vehículo'}
                        </button>
                        <Link href={route('admin.vehiculos.index')} className="btn-ghost" style={{ fontSize: '0.8125rem', padding: '0.875rem 1.5rem' }}>
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
