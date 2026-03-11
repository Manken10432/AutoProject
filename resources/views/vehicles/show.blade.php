@extends('layouts.app')

@section('title', $vehicle->year . ' ' . $vehicle->brand . ' ' . $vehicle->model . ' - AutoGalería')
@section('description', $vehicle->year . ' ' . $vehicle->brand . ' ' . $vehicle->model . ' en $' . number_format($vehicle->price, 0, '.', ',') . ' MXN. ' . number_format($vehicle->mileage, 0, '.', ',') . ' km, ' . $vehicle->fuel_type . ', ' . $vehicle->transmission . '. En AutoGalería, Gómez Palacio.')
@section('og_type', 'product')
@section('og_image', $vehicle->first_image)

@section('content')

{{-- BREADCRUMB --}}
<div style="background-color:#F8F8F8;border-bottom:1px solid #e5e7eb;padding:0.875rem 0;">
    <div class="max-w-7xl mx-auto px-4">
        <div style="display:flex;align-items:center;gap:0.5rem;color:#999;font-size:0.8125rem;">
            <a href="{{ route('home') }}" class="breadcrumb-link">Inicio</a>
            <span>&rsaquo;</span>
            <a href="{{ route('vehicles.index') }}" class="breadcrumb-link">Seminuevos</a>
            <span>&rsaquo;</span>
            <span style="color:#333;font-weight:600;">{{ $vehicle->brand }} {{ $vehicle->model }}</span>
        </div>
    </div>
</div>

{{-- MOBILE STICKY CTA (solo visible en móvil / tablet) --}}
@php
    $waMessage = urlencode('Hola, estoy interesado en el ' . $vehicle->year . ' ' . $vehicle->brand . ' ' . $vehicle->model . ' - $' . number_format($vehicle->price, 0, '.', ',') . ' MXN. ¿Está disponible?');
@endphp
<div class="lg:hidden" style="background:#fff;border-bottom:3px solid #C3002F;padding:1rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;position:sticky;top:64px;z-index:40;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <div>
        <div style="font-size:1.375rem;font-weight:900;color:#C3002F;line-height:1;">${{ number_format($vehicle->price, 0, '.', ',') }}</div>
        <div style="font-size:0.75rem;color:#666;text-transform:uppercase;letter-spacing:0.05em;">{{ $vehicle->year }} {{ $vehicle->brand }} {{ $vehicle->model }}</div>
    </div>
    <a href="https://wa.me/526141234567?text={{ $waMessage }}" target="_blank"
       style="display:inline-flex;align-items:center;gap:0.4rem;background:#4EC248;color:#fff;font-weight:700;text-transform:uppercase;padding:0.6rem 1.25rem;text-decoration:none;font-size:0.8125rem;letter-spacing:0.05em;white-space:nowrap;">
        <svg class="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
    </a>
</div>

<div class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {{-- LEFT: Gallery + Description --}}
        <div class="lg:col-span-2">

            {{-- STATUS BADGE --}}
            <div style="margin-bottom:1rem;">
                @if($vehicle->status === 'available')
                <span class="badge-available">Disponible</span>
                @else
                <span class="badge-sold">Vendido</span>
                @endif
                @if($vehicle->featured)
                <span style="margin-left:0.5rem;background:#fff3cd;color:#856404;font-size:0.7rem;font-weight:700;padding:0.2rem 0.6rem;border-radius:9999px;text-transform:uppercase;letter-spacing:0.05em;">Destacado</span>
                @endif
            </div>

            {{-- VEHICLE TITLE --}}
            <h1 style="font-size:clamp(1.5rem,3.5vw,2rem);font-weight:900;text-transform:uppercase;color:#333;letter-spacing:-0.01em;margin-bottom:0.5rem;">
                {{ $vehicle->year }} {{ $vehicle->brand }} {{ $vehicle->model }}
            </h1>
            @if($vehicle->color)
            <p style="color:#666;font-size:0.9375rem;margin-bottom:1.5rem;">Color: {{ $vehicle->color }}</p>
            @endif

            {{-- GALLERY --}}
            @php
                $images = $vehicle->images ?? [];
                if (empty($images)) {
                    $images = [$vehicle->first_image];
                }
            @endphp

            <div style="margin-bottom:1.5rem;">
                {{-- Main image --}}
                <div style="overflow:hidden;background:#f0f0f0;height:420px;border:1px solid #e5e7eb;">
                    <img id="main-vehicle-image"
                         src="{{ $images[0] }}"
                         alt="{{ $vehicle->year }} {{ $vehicle->brand }} {{ $vehicle->model }}"
                         style="width:100%;height:100%;object-fit:cover;">
                </div>

                {{-- Thumbnails --}}
                @if(count($images) > 1)
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:0.5rem;margin-top:0.75rem;">
                    @foreach($images as $i => $img)
                    <div class="thumb-item {{ $i === 0 ? 'active' : '' }}" data-src="{{ $img }}" style="height:75px;overflow:hidden;">
                        <img src="{{ $img }}"
                             alt="Foto {{ $i+1 }}"
                             style="width:100%;height:100%;object-fit:cover;"
                             loading="lazy">
                    </div>
                    @endforeach
                </div>
                @endif
            </div>

            {{-- DESCRIPTION --}}
            @if($vehicle->description)
            <div style="background:#fff;border:1px solid #e5e7eb;padding:1.5rem;margin-bottom:1.5rem;">
                <h2 style="font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#333;margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:2px solid #C3002F;">
                    Descripción
                </h2>
                <p style="color:#555;font-size:0.9375rem;line-height:1.8;">{{ $vehicle->description }}</p>
            </div>
            @endif

            {{-- CONTACT FORM --}}
            <div style="background:#F8F8F8;border:1px solid #e5e7eb;padding:1.75rem;">
                <h2 style="font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#333;margin-bottom:1.25rem;padding-bottom:0.5rem;border-bottom:2px solid #C3002F;">
                    Solicitar Información
                </h2>

                @if(session('success'))
                <div style="background:#dcfce7;border:1px solid #86efac;color:#166534;padding:1rem;margin-bottom:1rem;font-size:0.875rem;">
                    {{ session('success') }}
                </div>
                @endif

                <form action="{{ route('contact.store') }}" method="POST">
                    @csrf
                    <input type="hidden" name="vehicle_id" value="{{ $vehicle->id }}">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="form-label">Nombre *</label>
                            <input type="text" name="name" required class="form-input" placeholder="Tu nombre completo" value="{{ old('name') }}">
                            @error('name')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label class="form-label">Email *</label>
                            <input type="email" name="email" required class="form-input" placeholder="correo@ejemplo.com" value="{{ old('email') }}">
                            @error('email')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                        <div class="sm:col-span-2">
                            <label class="form-label">Teléfono *</label>
                            <input type="tel" name="phone" required class="form-input" placeholder="(614) 000-0000" value="{{ old('phone') }}">
                            @error('phone')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                        <div class="sm:col-span-2">
                            <label class="form-label">Mensaje</label>
                            <textarea name="message" rows="3" class="form-input" placeholder="¿Tienes alguna pregunta sobre este vehículo?">{{ old('message') }}</textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn-primary w-full py-3 text-sm">
                        Enviar Solicitud
                    </button>
                </form>
            </div>
        </div>

        {{-- RIGHT: Price + Specs + WhatsApp --}}
        <div>
            <div style="position:sticky;top:80px;">

                {{-- Price Card --}}
                <div style="background:#fff;border:1px solid #e5e7eb;padding:1.75rem;margin-bottom:1.25rem;">
                    <div style="font-size:2rem;font-weight:900;color:#C3002F;margin-bottom:0.25rem;">
                        ${{ number_format($vehicle->price, 0, '.', ',') }}
                    </div>
                    <div style="color:#666;font-size:0.8125rem;margin-bottom:1.5rem;">Precio de lista en MXN</div>

                    {{-- WhatsApp CTA --}}
                    @php
                        $waMessage = urlencode('Hola, estoy interesado en el ' . $vehicle->year . ' ' . $vehicle->brand . ' ' . $vehicle->model . ' - $' . number_format($vehicle->price, 0, '.', ',') . ' MXN. ¿Está disponible?');
                    @endphp
                    <a href="https://wa.me/526141234567?text={{ $waMessage }}" target="_blank" class="btn-wa" style="margin-bottom:0.75rem;">
                        <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                    </a>

                    <a href="tel:6141234567" class="btn-call">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        Llamar Ahora
                    </a>
                </div>

                {{-- Specs --}}
                <div style="background:#fff;border:1px solid #e5e7eb;padding:1.5rem;margin-bottom:1.25rem;">
                    <h3 style="font-size:0.9rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#333;margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:2px solid #C3002F;">
                        Especificaciones
                    </h3>
                    <div style="display:flex;flex-direction:column;gap:0;">
                        <div style="display:flex;justify-content:space-between;padding:0.625rem 0;border-bottom:1px solid #f0f0f0;">
                            <span style="color:#666;font-size:0.875rem;">Año</span>
                            <span style="font-weight:700;color:#333;font-size:0.875rem;">{{ $vehicle->year }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:0.625rem 0;border-bottom:1px solid #f0f0f0;">
                            <span style="color:#666;font-size:0.875rem;">Kilometraje</span>
                            <span style="font-weight:700;color:#333;font-size:0.875rem;">{{ number_format($vehicle->mileage, 0, '.', ',') }} km</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:0.625rem 0;border-bottom:1px solid #f0f0f0;">
                            <span style="color:#666;font-size:0.875rem;">Combustible</span>
                            <span style="font-weight:700;color:#333;font-size:0.875rem;">{{ $vehicle->fuel_type }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;padding:0.625rem 0;border-bottom:1px solid #f0f0f0;">
                            <span style="color:#666;font-size:0.875rem;">Transmisión</span>
                            <span style="font-weight:700;color:#333;font-size:0.875rem;">{{ $vehicle->transmission }}</span>
                        </div>
                        @if($vehicle->color)
                        <div style="display:flex;justify-content:space-between;padding:0.625rem 0;border-bottom:1px solid #f0f0f0;">
                            <span style="color:#666;font-size:0.875rem;">Color</span>
                            <span style="font-weight:700;color:#333;font-size:0.875rem;">{{ $vehicle->color }}</span>
                        </div>
                        @endif
                        <div style="display:flex;justify-content:space-between;padding:0.625rem 0;">
                            <span style="color:#666;font-size:0.875rem;">Estado</span>
                            <span style="font-weight:700;font-size:0.875rem;">
                                @if($vehicle->status === 'available')
                                <span style="color:#16a34a;">Disponible</span>
                                @else
                                <span style="color:#dc2626;">Vendido</span>
                                @endif
                            </span>
                        </div>
                    </div>
                </div>

                {{-- Info box --}}
                <div style="background:#F8F8F8;border:1px solid #e5e7eb;padding:1.25rem;">
                    <div style="display:flex;gap:0.5rem;align-items:flex-start;">
                        <svg class="w-5 h-5 shrink-0 mt-0.5" style="color:#C3002F;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        <p style="font-size:0.8125rem;color:#555;line-height:1.6;">Todos nuestros vehículos pasan por una revisión mecánica completa y contamos con financiamiento disponible.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- RELATED VEHICLES --}}
    @if($relatedVehicles->isNotEmpty())
    <div style="margin-top:3rem;padding-top:3rem;border-top:1px solid #e5e7eb;">
        <h2 class="section-title" style="margin-bottom:1.5rem;">
            Más {{ $vehicle->brand }} Disponibles
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            @foreach($relatedVehicles as $related)
            <div class="vehicle-card group">
                <div style="overflow:hidden;height:170px;">
                    <img src="{{ $related->first_image }}"
                         alt="{{ $related->year }} {{ $related->brand }} {{ $related->model }}"
                         style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;"
                         loading="lazy">
                </div>
                <div style="padding:1rem;">
                    <h3 style="font-size:0.875rem;font-weight:700;text-transform:uppercase;color:#333;margin-bottom:0.375rem;">
                        {{ $related->year }} {{ $related->brand }} {{ $related->model }}
                    </h3>
                    <div style="font-size:1.1rem;font-weight:900;color:#C3002F;margin-bottom:0.75rem;">
                        ${{ number_format($related->price, 0, '.', ',') }}
                    </div>
                    <a href="{{ route('vehicles.show', $related->id) }}" class="link-arrow text-xs">Ver Detalles &rsaquo;</a>
                </div>
            </div>
            @endforeach
        </div>
    </div>
    @endif
</div>

@endsection
