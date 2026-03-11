import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
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

export default function AdminVehiclesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        brand: '', model: '', year: CURRENT_YEAR, price: '', down_payment: '', monthly_payment: '', mileage: '',
        fuel_type: '', transmission: '', color: '', status: 'available',
        featured: false, description: '', images: [],
    });
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

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.vehiculos.store'), { forceFormData: true });
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout title="Agregar Vehículo" pageTitle="Agregar Vehículo">
            <div style={{ maxWidth: 820 }}>
                <div style={{ marginBottom: '1.25rem' }}>
                    <Link href={route('admin.vehiculos.index')} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5C518', textDecoration: 'none' }}>
                        &larr; Volver a Vehículos
                    </Link>
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: 3, height: 18, background: '#F5C518' }} />
                            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>
                                INFORMACIÓN DEL VEHÍCULO
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Marca *" error={errors.brand}>
                                <input type="text" className="form-input" value={data.brand} onChange={e => setData('brand', e.target.value)} placeholder="Nissan, Toyota, Honda..." required />
                            </Field>
                            <Field label="Modelo *" error={errors.model}>
                                <input type="text" className="form-input" value={data.model} onChange={e => setData('model', e.target.value)} placeholder="Frontier, Corolla, CR-V..." required />
                            </Field>
                            <Field label="Año *" error={errors.year}>
                                <input type="number" className="form-input" value={data.year} onChange={e => setData('year', e.target.value)} min="1990" max={CURRENT_YEAR + 1} required />
                            </Field>
                            <Field label="Enganche MXN" error={errors.down_payment}>
                                <input type="number" className="form-input" value={data.down_payment} onChange={e => setData('down_payment', e.target.value)} min="0" step="500" placeholder="15000" />
                            </Field>
                            <Field label="Mensualidad MXN" error={errors.monthly_payment}>
                                <input type="number" className="form-input" value={data.monthly_payment} onChange={e => setData('monthly_payment', e.target.value)} min="0" step="100" placeholder="4000" />
                            </Field>
                            <Field label="Precio contado MXN" error={errors.price}>
                                <input type="number" className="form-input" value={data.price} onChange={e => setData('price', e.target.value)} min="0" step="1000" placeholder="350000" />
                            </Field>
                            <Field label="Kilometraje *" error={errors.mileage}>
                                <input type="number" className="form-input" value={data.mileage} onChange={e => setData('mileage', e.target.value)} min="0" placeholder="25000" required />
                            </Field>
                            <Field label="Color" error={errors.color}>
                                <input type="text" className="form-input" value={data.color} onChange={e => setData('color', e.target.value)} placeholder="Blanco, Negro, Plata..." />
                            </Field>
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                            <div style={{ width: 3, height: 18, background: '#F5C518' }} />
                            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>DESCRIPCIÓN</h2>
                        </div>
                        <textarea
                            className="form-input"
                            rows={4}
                            placeholder="Describe las características, estado y equipamiento del vehículo..."
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                    </div>

                    {/* Images */}
                    <div style={{ background: '#141414', border: '1px solid #1c1c1c', borderTop: '1px solid #1a1a1a', padding: '1.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                            <div style={{ width: 3, height: 18, background: '#F5C518' }} />
                            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em', color: '#f0f0f0' }}>IMÁGENES</h2>
                        </div>

                        {/* Preview grid */}
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
                                        {i === 0 && <span style={{ position: 'absolute', bottom: 4, left: 4, background: '#F5C518', color: '#fff', fontSize: '0.55rem', fontWeight: 700, padding: '0.1rem 0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Principal</span>}
                                    </div>
                                ))}
                            </div>
                        )}

                        <label style={{ display: 'block', border: '1px dashed #2a2a2a', padding: '1.5rem', textAlign: 'center', background: '#111', cursor: 'pointer' }}>
                            <svg width="24" height="24" fill="none" stroke="#444" strokeWidth={1.5} viewBox="0 0 24 24" style={{ margin: '0 auto 0.5rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <span style={{ color: '#888', fontSize: '0.8125rem', fontFamily: "'DM Sans', sans-serif" }}>
                                {previews.length > 0 ? `${previews.length} imagen(es) seleccionada(s) · Clic para cambiar` : 'Clic para seleccionar imágenes'}
                            </span>
                            <p style={{ color: '#333', fontSize: '0.7rem', marginTop: '0.375rem', fontFamily: "'DM Sans', sans-serif" }}>JPG, PNG, WebP · Máx. 5MB · La primera imagen será la principal</p>
                            <input type="file" name="images[]" multiple accept="image/jpeg,image/png,image/jpg,image/webp" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
                        </label>
                        {errors.images && <p style={{ color: '#ff4d6a', fontSize: '0.75rem', marginTop: '0.375rem' }}>{errors.images}</p>}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <button type="submit" className="btn-primary" style={{ fontSize: '0.8125rem', padding: '0.875rem 2rem' }} disabled={processing}>
                            {processing ? 'Guardando...' : 'Guardar Vehículo'}
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
