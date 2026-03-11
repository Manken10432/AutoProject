@extends('layouts.app')

@section('title', 'Cotización y Contacto - AutoGalería')
@section('description', 'Contáctanos para solicitar cotización. Asesoría personalizada, financiamiento y más.')

@section('content')

{{-- PAGE HERO --}}
<div style="background-color:#1a1a1a;padding:3rem 0;border-bottom:4px solid #C3002F;">
    <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 style="color:#ffffff;font-size:clamp(1.75rem,5vw,2.5rem);font-weight:900;text-transform:uppercase;letter-spacing:-0.01em;margin-bottom:0.75rem;">
            Contáctanos
        </h1>
        <p style="color:#999;font-size:1rem;max-width:500px;margin:0 auto;">
            Estamos aquí para ayudarte a encontrar tu auto ideal. Contáctanos y te respondemos a la brevedad.
        </p>
    </div>
</div>

<div class="max-w-7xl mx-auto px-4 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {{-- Contact Info --}}
        <div>
            <h2 class="section-title" style="font-size:1.25rem;margin-bottom:1.75rem;">Información de Contacto</h2>

            <div style="display:flex;flex-direction:column;gap:1.25rem;margin-bottom:2.5rem;">

                <div style="display:flex;gap:1rem;align-items:flex-start;">
                    <div style="width:2.5rem;height:2.5rem;background:#C3002F;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                    <div>
                        <div style="font-weight:700;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;margin-bottom:0.25rem;">Dirección</div>
                        <p style="color:#666;font-size:0.9rem;line-height:1.5;">Blvd. Domingo Arrieta #1234<br>Gómez Palacio, Durango, México</p>
                    </div>
                </div>

                <div style="display:flex;gap:1rem;align-items:flex-start;">
                    <div style="width:2.5rem;height:2.5rem;background:#C3002F;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </div>
                    <div>
                        <div style="font-weight:700;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;margin-bottom:0.25rem;">Teléfono</div>
                        <a href="tel:6141234567" style="color:#C3002F;font-size:0.9rem;text-decoration:none;font-weight:600;">(614) 123-4567</a>
                    </div>
                </div>

                <div style="display:flex;gap:1rem;align-items:flex-start;">
                    <div style="width:2.5rem;height:2.5rem;background:#4EC248;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <div>
                        <div style="font-weight:700;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;margin-bottom:0.25rem;">WhatsApp</div>
                        <a href="https://wa.me/526141234567" target="_blank" style="color:#4EC248;font-size:0.9rem;text-decoration:none;font-weight:600;">(614) 123-4567</a>
                    </div>
                </div>

                <div style="display:flex;gap:1rem;align-items:flex-start;">
                    <div style="width:2.5rem;height:2.5rem;background:#C3002F;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div>
                        <div style="font-weight:700;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;margin-bottom:0.25rem;">Horarios</div>
                        <p style="color:#666;font-size:0.9rem;line-height:1.5;">
                            Lun - Sáb: 9:00am - 7:00pm<br>
                            Domingo: 10:00am - 3:00pm
                        </p>
                    </div>
                </div>
            </div>

            {{-- WhatsApp CTA --}}
            <a href="https://wa.me/526141234567?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20veh%C3%ADculos%20disponibles."
               target="_blank"
               class="btn-wa" style="margin-top:0;">
                <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Escribir por WhatsApp
            </a>
        </div>

        {{-- Contact Form --}}
        <div style="grid-column:span 2;">
            <div style="background:#fff;border:1px solid #e5e7eb;padding:2rem;">
                <h2 class="section-title" style="font-size:1.25rem;margin-bottom:1.75rem;">Solicitar Cotización</h2>

                @if(session('success'))
                <div style="background:#dcfce7;border:1px solid #86efac;color:#166534;padding:1rem;margin-bottom:1.5rem;font-size:0.9375rem;display:flex;gap:0.75rem;align-items:center;">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {{ session('success') }}
                </div>
                @endif

                <form action="{{ route('contact.store') }}" method="POST">
                    @csrf
                    @if(request('vehicle_id'))
                    <input type="hidden" name="vehicle_id" value="{{ request('vehicle_id') }}">
                    @endif

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label class="form-label">Nombre completo *</label>
                            <input type="text" name="name" required class="form-input" placeholder="Juan García" value="{{ old('name') }}">
                            @error('name')<p style="color:#dc2626;font-size:0.75rem;margin-top:0.25rem;">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label class="form-label">Correo electrónico *</label>
                            <input type="email" name="email" required class="form-input" placeholder="correo@ejemplo.com" value="{{ old('email') }}">
                            @error('email')<p style="color:#dc2626;font-size:0.75rem;margin-top:0.25rem;">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label class="form-label">Teléfono *</label>
                            <input type="tel" name="phone" required class="form-input" placeholder="(614) 000-0000" value="{{ old('phone') }}">
                            @error('phone')<p style="color:#dc2626;font-size:0.75rem;margin-top:0.25rem;">{{ $message }}</p>@enderror
                        </div>
                        <div class="sm:col-span-2">
                            <label class="form-label">Mensaje</label>
                            <textarea name="message" rows="4" class="form-input" placeholder="Cuéntanos qué modelo te interesa, tu presupuesto, si necesitas financiamiento, etc.">{{ old('message') }}</textarea>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary py-3 px-8 text-sm w-full sm:w-auto">
                        Enviar Solicitud
                    </button>
                </form>
            </div>
        </div>
    </div>

    {{-- Map --}}
    <div style="margin-top:3rem;">
        <h2 class="section-title" style="font-size:1.25rem;margin-bottom:1.5rem;">¿Cómo Llegar?</h2>
        <div style="height:350px;overflow:hidden;border:1px solid #e5e7eb;">
            <iframe
                src="https://maps.google.com/maps?q=25.5694,-103.4997&z=14&output=embed"
                width="100%"
                height="350"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Ubicación AutoGalería Gómez Palacio">
            </iframe>
        </div>
    </div>
</div>

@endsection
