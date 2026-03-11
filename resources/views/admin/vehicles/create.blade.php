@extends('admin.layout')

@section('title', 'Agregar Vehículo')
@section('page-title', 'Agregar Nuevo Vehículo')

@section('content')

<div style="max-width:800px;">
    <div style="margin-bottom:1.25rem;">
        <a href="{{ route('admin.vehiculos.index') }}" style="color:#F5C518;font-size:0.875rem;font-weight:600;text-decoration:none;">&larr; Volver a Vehículos</a>
    </div>

    @if($errors->any())
    <div style="background:#fee2e2;border:1px solid #fca5a5;color:#dc2626;padding:1rem;margin-bottom:1.5rem;font-size:0.875rem;">
        <p style="font-weight:700;margin-bottom:0.5rem;">Por favor corrige los siguientes errores:</p>
        <ul style="list-style:disc;padding-left:1.5rem;">
            @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    <div style="background:#fff;border:1px solid #e5e7eb;padding:2rem;">
        <form action="{{ route('admin.vehiculos.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

                <div>
                    <label class="form-label">Marca *</label>
                    <input type="text" name="brand" required class="form-input" value="{{ old('brand') }}"
                           placeholder="Nissan, Toyota, Honda...">
                </div>

                <div>
                    <label class="form-label">Modelo *</label>
                    <input type="text" name="model" required class="form-input" value="{{ old('model') }}"
                           placeholder="Frontier, Corolla, CR-V...">
                </div>

                <div>
                    <label class="form-label">Año *</label>
                    <input type="number" name="year" required class="form-input" value="{{ old('year', date('Y')) }}"
                           min="1990" max="{{ date('Y') + 1 }}">
                </div>

                <div>
                    <label class="form-label">Precio (MXN) *</label>
                    <input type="number" name="price" required class="form-input" value="{{ old('price') }}"
                           min="0" step="1000" placeholder="350000">
                </div>

                <div>
                    <label class="form-label">Kilometraje *</label>
                    <input type="number" name="mileage" required class="form-input" value="{{ old('mileage') }}"
                           min="0" placeholder="25000">
                </div>

                <div>
                    <label class="form-label">Combustible *</label>
                    <select name="fuel_type" required class="form-input">
                        <option value="">Seleccionar...</option>
                        @foreach(['Gasolina','Diesel','Híbrido','Eléctrico'] as $fuel)
                        <option value="{{ $fuel }}" {{ old('fuel_type') == $fuel ? 'selected' : '' }}>{{ $fuel }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="form-label">Transmisión *</label>
                    <select name="transmission" required class="form-input">
                        <option value="">Seleccionar...</option>
                        @foreach(['Automática','Manual'] as $trans)
                        <option value="{{ $trans }}" {{ old('transmission') == $trans ? 'selected' : '' }}>{{ $trans }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="form-label">Color</label>
                    <input type="text" name="color" class="form-input" value="{{ old('color') }}"
                           placeholder="Blanco, Negro, Plata...">
                </div>

                <div>
                    <label class="form-label">Estado *</label>
                    <select name="status" required class="form-input">
                        <option value="available" {{ old('status', 'available') == 'available' ? 'selected' : '' }}>Disponible</option>
                        <option value="sold" {{ old('status') == 'sold' ? 'selected' : '' }}>Vendido</option>
                    </select>
                </div>

                <div style="display:flex;align-items:center;gap:0.75rem;padding-top:1.5rem;">
                    <input type="checkbox" name="featured" value="1" id="featured"
                           style="width:1.125rem;height:1.125rem;accent-color:#F5C518;cursor:pointer;"
                           {{ old('featured') ? 'checked' : '' }}>
                    <label for="featured" style="font-weight:600;color:#333;font-size:0.875rem;cursor:pointer;text-transform:none;letter-spacing:0;">
                        Marcar como Destacado
                    </label>
                </div>
            </div>

            <div style="margin-bottom:1.25rem;">
                <label class="form-label">Descripción</label>
                <textarea name="description" rows="4" class="form-input" placeholder="Describe las características, estado y equipamiento del vehículo...">{{ old('description') }}</textarea>
            </div>

            <div style="margin-bottom:1.75rem;">
                <label class="form-label">Imágenes</label>
                <div style="border:2px dashed #d1d5db;padding:1.5rem;text-align:center;background:#fafafa;">
                    <input type="file" name="images[]" multiple accept="image/jpeg,image/png,image/jpg,image/webp"
                           style="display:block;margin:0 auto;font-size:0.875rem;color:#555;">
                    <p style="color:#999;font-size:0.75rem;margin-top:0.75rem;">JPG, PNG, WebP. Máximo 5MB por imagen. Se pueden subir varias.</p>
                </div>
            </div>

            <div style="display:flex;gap:0.875rem;">
                <button type="submit" class="btn-primary py-3 px-8 text-sm">
                    Guardar Vehículo
                </button>
                <a href="{{ route('admin.vehiculos.index') }}" class="btn-outline-dark py-3 px-6 text-sm">
                    Cancelar
                </a>
            </div>
        </form>
    </div>
</div>

@endsection
