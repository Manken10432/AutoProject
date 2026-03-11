@extends('layouts.app')

@section('title', 'Inventario de Seminuevos - AutoGalería')
@section('description', 'Explora nuestro inventario completo de seminuevos. Filtra por marca, año, precio y más.')

@section('content')

{{-- PAGE HERO --}}
<div style="background-color:#1a1a1a;padding:2.5rem 0;border-bottom:4px solid #F5C518;">
    <div class="max-w-7xl mx-auto px-4">
        <div style="display:flex;align-items:center;gap:0.5rem;color:#999;font-size:0.8125rem;margin-bottom:0.75rem;">
            <a href="{{ route('home') }}" style="color:#999;text-decoration:none;hover:color:#fff;">Inicio</a>
            <span>&rsaquo;</span>
            <span style="color:#F5C518;">Seminuevos</span>
        </div>
        <h1 style="color:#ffffff;font-size:clamp(1.5rem,4vw,2.25rem);font-weight:900;text-transform:uppercase;letter-spacing:-0.01em;">
            Inventario de Seminuevos
        </h1>
        <p style="color:#999;margin-top:0.5rem;font-size:0.9375rem;">
            {{ $vehicles->total() }} vehículo{{ $vehicles->total() != 1 ? 's' : '' }} disponible{{ $vehicles->total() != 1 ? 's' : '' }}
        </p>
    </div>
</div>

<div class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">

        {{-- FILTER SIDEBAR --}}
        <aside class="lg:w-72 shrink-0 w-full">

            {{-- Mobile toggle button --}}
            <button id="filter-toggle-btn" type="button"
                style="display:flex;align-items:center;justify-content:space-between;width:100%;background:#fff;border:1px solid #e5e7eb;padding:0.875rem 1rem;font-weight:700;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;cursor:pointer;"
                class="lg:hidden mb-2">
                <span style="display:flex;align-items:center;gap:0.5rem;">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/></svg>
                    Filtros
                </span>
                <svg id="filter-toggle-icon" class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>

            <div id="filter-panel" class="hidden lg:block">
            <form action="{{ route('vehicles.index') }}" method="GET" id="filter-form">

                <div style="background:#fff;border:1px solid #e5e7eb;padding:1.5rem;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;padding-bottom:0.75rem;border-bottom:2px solid #F5C518;">
                        <h3 style="font-weight:700;font-size:0.9375rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;">Filtros</h3>
                        @if(request()->hasAny(['brand','year_min','year_max','price_min','price_max','fuel_type','transmission']))
                        <a href="{{ route('vehicles.index') }}" style="font-size:0.75rem;color:#F5C518;text-decoration:none;font-weight:600;">Limpiar</a>
                        @endif
                    </div>

                    {{-- Brand --}}
                    <div style="margin-bottom:1.5rem;">
                        <h4 style="font-size:0.8125rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#555;margin-bottom:0.75rem;">Marca</h4>
                        <div style="display:flex;flex-direction:column;gap:0.5rem;">
                            @foreach($brands as $brand)
                            <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;font-size:0.875rem;color:#444;">
                                <input type="checkbox" name="brand[]" value="{{ $brand }}" class="filter-checkbox"
                                    {{ in_array($brand, (array)request('brand', [])) ? 'checked' : '' }}>
                                <span>{{ $brand }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>

                    {{-- Year --}}
                    <div style="margin-bottom:1.5rem;">
                        <h4 style="font-size:0.8125rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#555;margin-bottom:0.75rem;">Año</h4>
                        <div style="display:flex;gap:0.5rem;align-items:center;">
                            <input type="number" name="year_min" placeholder="Desde" value="{{ request('year_min') }}"
                                min="2000" max="{{ date('Y') }}"
                                class="form-input" style="width:calc(50% - 0.25rem);font-size:0.8125rem;padding:0.5rem;">
                            <span style="color:#999;">-</span>
                            <input type="number" name="year_max" placeholder="Hasta" value="{{ request('year_max') }}"
                                min="2000" max="{{ date('Y') }}"
                                class="form-input" style="width:calc(50% - 0.25rem);font-size:0.8125rem;padding:0.5rem;">
                        </div>
                    </div>

                    {{-- Price --}}
                    <div style="margin-bottom:1.5rem;">
                        <h4 style="font-size:0.8125rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#555;margin-bottom:0.75rem;">Precio (MXN)</h4>
                        <div style="display:flex;gap:0.5rem;align-items:center;">
                            <input type="number" name="price_min" placeholder="Mínimo" value="{{ request('price_min') }}"
                                class="form-input" style="width:calc(50% - 0.25rem);font-size:0.8125rem;padding:0.5rem;">
                            <span style="color:#999;">-</span>
                            <input type="number" name="price_max" placeholder="Máximo" value="{{ request('price_max') }}"
                                class="form-input" style="width:calc(50% - 0.25rem);font-size:0.8125rem;padding:0.5rem;">
                        </div>
                    </div>

                    {{-- Fuel Type --}}
                    <div style="margin-bottom:1.5rem;">
                        <h4 style="font-size:0.8125rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#555;margin-bottom:0.75rem;">Combustible</h4>
                        <div style="display:flex;flex-direction:column;gap:0.5rem;">
                            @foreach(['Gasolina','Diesel','Híbrido','Eléctrico'] as $fuel)
                            <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;font-size:0.875rem;color:#444;">
                                <input type="checkbox" name="fuel_type[]" value="{{ $fuel }}" class="filter-checkbox"
                                    {{ in_array($fuel, (array)request('fuel_type', [])) ? 'checked' : '' }}>
                                <span>{{ $fuel }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>

                    {{-- Transmission --}}
                    <div style="margin-bottom:1.5rem;">
                        <h4 style="font-size:0.8125rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#555;margin-bottom:0.75rem;">Transmisión</h4>
                        <div style="display:flex;flex-direction:column;gap:0.5rem;">
                            @foreach(['Automática','Manual'] as $trans)
                            <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;font-size:0.875rem;color:#444;">
                                <input type="checkbox" name="transmission[]" value="{{ $trans }}" class="filter-checkbox"
                                    {{ in_array($trans, (array)request('transmission', [])) ? 'checked' : '' }}>
                                <span>{{ $trans }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>

                    <button type="submit" class="btn-primary w-full text-sm py-3">
                        Aplicar Filtros
                    </button>
                </div>
            </form>
            </div>{{-- /filter-panel --}}
        </aside>

        {{-- MAIN CONTENT --}}
        <div style="flex:1;min-width:0;">

            {{-- Sort bar --}}
            <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid #e5e7eb;padding:0.75rem 1rem;margin-bottom:1.25rem;flex-wrap:wrap;gap:0.75rem;">
                <span style="font-size:0.875rem;color:#666;">
                    Mostrando {{ $vehicles->firstItem() ?? 0 }}-{{ $vehicles->lastItem() ?? 0 }} de {{ $vehicles->total() }} resultados
                </span>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <span style="font-size:0.875rem;color:#666;font-weight:600;">Ordenar:</span>
                    <select id="sort_by" form="filter-form" name="sort_by" style="border:1px solid #d1d5db;padding:0.35rem 0.6rem;font-size:0.875rem;color:#333;outline:none;background:#fff;">
                        <option value="" {{ request('sort_by') == '' ? 'selected' : '' }}>Más reciente</option>
                        <option value="price_asc" {{ request('sort_by') == 'price_asc' ? 'selected' : '' }}>Precio ↑</option>
                        <option value="price_desc" {{ request('sort_by') == 'price_desc' ? 'selected' : '' }}>Precio ↓</option>
                        <option value="year_desc" {{ request('sort_by') == 'year_desc' ? 'selected' : '' }}>Año más nuevo</option>
                        <option value="mileage_asc" {{ request('sort_by') == 'mileage_asc' ? 'selected' : '' }}>Menor km</option>
                    </select>
                </div>
            </div>

            {{-- Vehicle Grid --}}
            @if($vehicles->isNotEmpty())
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                @foreach($vehicles as $vehicle)
                <div class="vehicle-card group">
                    <div style="position:relative;overflow:hidden;height:200px;">
                        <img src="{{ $vehicle->first_image }}"
                             alt="{{ $vehicle->year }} {{ $vehicle->brand }} {{ $vehicle->model }}"
                             style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;"
                             loading="lazy">
                        @if($vehicle->featured)
                        <div style="position:absolute;top:0.6rem;left:0.6rem;">
                            <span style="background:#F5C518;color:#fff;font-size:0.65rem;font-weight:700;text-transform:uppercase;padding:0.2rem 0.5rem;letter-spacing:0.05em;">Destacado</span>
                        </div>
                        @endif
                    </div>
                    <div style="padding:1.125rem;">
                        <h3 style="font-size:0.9375rem;font-weight:700;text-transform:uppercase;color:#333;letter-spacing:0.02em;margin-bottom:0.375rem;line-height:1.3;">
                            {{ $vehicle->year }} {{ $vehicle->brand }} {{ $vehicle->model }}
                        </h3>
                        <div style="font-size:1.3rem;font-weight:900;color:#F5C518;margin-bottom:0.6rem;">
                            ${{ number_format($vehicle->price, 0, '.', ',') }}
                        </div>
                        <div style="display:flex;gap:0.875rem;color:#666;font-size:0.8rem;margin-bottom:1rem;flex-wrap:wrap;">
                            <span style="display:flex;align-items:center;gap:0.25rem;">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                {{ number_format($vehicle->mileage, 0, '.', ',') }} km
                            </span>
                            <span>{{ $vehicle->fuel_type }}</span>
                            <span>{{ $vehicle->transmission }}</span>
                        </div>
                        <div style="display:flex;gap:0.625rem;align-items:center;justify-content:space-between;padding-top:0.75rem;border-top:1px solid #f0f0f0;">
                            <a href="{{ route('vehicles.show', $vehicle->id) }}" class="link-arrow text-xs">
                                Ver Detalles &rsaquo;
                            </a>
                            <a href="{{ route('contact.index') }}?vehicle_id={{ $vehicle->id }}" class="btn-primary text-xs py-2 px-3" style="font-size:0.7rem;padding:0.4rem 0.75rem;">
                                Cotizar
                            </a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>

            {{-- Pagination --}}
            @if($vehicles->hasPages())
            <div class="pagination-container mt-8">
                {{ $vehicles->links() }}
            </div>
            @endif

            @else
            <div style="text-align:center;padding:4rem 2rem;background:#fff;border:1px solid #e5e7eb;">
                <svg class="w-16 h-16 mx-auto mb-4" style="color:#d1d5db;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 style="font-size:1.25rem;font-weight:700;text-transform:uppercase;color:#333;margin-bottom:0.75rem;">No se encontraron vehículos</h3>
                <p style="color:#666;margin-bottom:1.5rem;">Intenta ajustar los filtros de búsqueda o explora todo nuestro inventario.</p>
                <a href="{{ route('vehicles.index') }}" class="btn-primary">Ver Todo el Inventario</a>
            </div>
            @endif
        </div>
    </div>
</div>

@endsection
