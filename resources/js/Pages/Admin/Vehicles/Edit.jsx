import { useState, useEffect } from 'react';
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
        <div style={{ width: 3, height: 18, background: '#F5C518' }} />
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
        down_payment: vehiculo.down_payment || '',
        monthly_payment: vehiculo.monthly_payment || '',
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

    const [previews, setPreviews] = useState([]);
    useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

    const handleFiles = (files) => {
        const arr = Array.from(files);
        setData('images', arr);
        setPreviews(arr.map(f => URL.createObjectURL(f)));
    };

    const removeFile = (index) => {
        URL.revokeObjectURL(previews[index]);
        const newFiles = data.images.filter((_, i) => i !== index);
        setData('images', newFiles);
        setPreviews(p => p.filter((_, i) => i !== index));
    };

    const removeExisting = (index) => {
        if (!confirm('¿Eliminar esta imagen?')) return;
        router.delete(route('admin.vehiculos.imagen.destroy', { id: vehiculo.id, index }));
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
                    <Link href={route('admin.vehiculos.index')} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5C518', textDecoration: 'none' }}>
                        &larr; Volver a Vehículos
                    </Link>
                    <button
                        type="button"
                        onClick={destroy}
                        style={{ background: 'transparent', border: '1px solid rgba(195,0,47,0.3)', color: '#F5C518', padding: '0.4rem 0.875rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
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
                                { label: 'Enganche MXN', key: 'down_payment', type: 'number', min: 0, step: 500, placeholder: '15000' },
                                { label: 'Mensualidad MXN', key: 'monthly_payment', type: 'number', min: 0, step: 100, placeholder: '4000' },
                                { label: 'Precio contado MXN', key: 'price', type: 'number', min: 0, step: 1000, placeholder: '350000' },
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
                                <input type="checkbox" id="featured" checked={data.featured} onChange={e => setData('featured', e.target.checked)} style={{ width: '1.125rem', height: '1.125rem', accentColor: '#F5C518', cursor: 'pointer' }} />
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
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
                                {currentImages.map((img, i) => (
                                    <div key={i} style={{ position: 'relative', height: 90, border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                                        <img src={img} alt={`Imagen ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={() => removeExisting(i)}
                                            style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.75)', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', lineHeight: 1 }}
                                        >✕</button>
                                        {i === 0 && <span style={{ position: 'absolute', bottom: 4, left: 4, background: '#F5C518', color: '#fff', fontSize: '0.55rem', fontWeight: 700, padding: '0.1rem 0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Principal</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New images */}
                    <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderTop: '1px solid #1a1a1a', padding: '1.75rem', marginBottom: '1.5rem' }}>
                        <SectionHeader title={currentImages.length > 0 ? 'AGREGAR IMÁGENES' : 'IMÁGENES'} />

                        {previews.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                                {previews.map((src, i) => (
                                    <div key={i} style={{ position: 'relative', height: 90, border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                                        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(i)}
                                            style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.75)', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', lineHeight: 1 }}
                                        >✕</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <label style={{ display: 'block', border: '1px dashed #2a2a2a', padding: '1.5rem', textAlign: 'center', background: '#111', cursor: 'pointer' }}>
                            <svg width="24" height="24" fill="none" stroke="#444" strokeWidth={1.5} viewBox="0 0 24 24" style={{ margin: '0 auto 0.5rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <span style={{ color: '#888', fontSize: '0.8125rem', fontFamily: "'DM Sans', sans-serif" }}>
                                {previews.length > 0 ? `${previews.length} imagen(es) nueva(s) · Clic para cambiar` : 'Clic para agregar imágenes'}
                            </span>
                            <p style={{ color: '#333', fontSize: '0.7rem', marginTop: '0.375rem', fontFamily: "'DM Sans', sans-serif" }}>
                                {currentImages.length > 0 ? 'Se agregarán a las existentes · JPG, PNG, WebP · Máx. 5MB' : 'JPG, PNG, WebP · Máx. 5MB · La primera imagen será la principal'}
                            </p>
                            <input type="file" multiple accept="image/jpeg,image/png,image/jpg,image/webp" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
                        </label>
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
