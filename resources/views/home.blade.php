@extends('layouts.app')

@section('title', 'AutoGalería - Encuentra tu Auto Ideal en Gómez Palacio')
@section('description', 'Encuentra los mejores seminuevos en Gómez Palacio, Durango. Garantía, financiamiento y asesoría personalizada.')

@section('content')

{{-- HERO SECTION --}}
<section class="hero-section" style="min-height:calc(100vh - 104px); background-color:#1a1a1a; position:relative; overflow:hidden;">

    {{-- Background image slides --}}
    <div class="hero-slide active" style="position:absolute;inset:0;background:linear-gradient(to right, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=80') center/cover no-repeat;"></div>
    <div class="hero-slide" style="position:absolute;inset:0;background:linear-gradient(to right, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80') center/cover no-repeat;"></div>

    {{-- Red accent stripe --}}
    <div style="position:absolute;left:0;top:0;bottom:0;width:5px;background-color:#F5C518;"></div>

    <div class="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
        <div class="max-w-2xl">
            <div style="display:inline-block;background-color:#F5C518;color:#fff;font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:0.35rem 1rem;margin-bottom:1.25rem;">
                GÓMEZ PALACIO, DURANGO
            </div>
            <h1 style="color:#ffffff;font-size:clamp(2.5rem,6vw,3.5rem);font-weight:900;text-transform:uppercase;line-height:1.05;letter-spacing:-0.02em;margin-bottom:1.25rem;">
                ENCUENTRA<br>
                <span style="color:#F5C518;">TU AUTO</span><br>
                IDEAL
            </h1>
            <p style="color:#cccccc;font-size:1.125rem;line-height:1.6;margin-bottom:2rem;max-width:480px;">
                Los mejores seminuevos con garantía, financiamiento accesible y asesoría personalizada. Más de 10 años de confianza en la región.
            </p>
            <div class="flex flex-wrap gap-4">
                <a href="{{ route('vehicles.index') }}" class="btn-primary text-base py-3 px-8">
                    Ver Inventario
                </a>
                <a href="{{ route('contact.index') }}" class="btn-outline text-base py-3 px-8">
                    Solicita Cotización
                </a>
            </div>

            {{-- Stats --}}
            <div class="flex flex-wrap gap-8 mt-10 pt-8" style="border-top:1px solid rgba(255,255,255,0.1);">
                <div>
                    <div style="color:#F5C518;font-size:1.75rem;font-weight:900;line-height:1;">+150</div>
                    <div style="color:#999;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:0.25rem;">Vehículos</div>
                </div>
                <div>
                    <div style="color:#F5C518;font-size:1.75rem;font-weight:900;line-height:1;">10+</div>
                    <div style="color:#999;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:0.25rem;">Años de exp.</div>
                </div>
                <div>
                    <div style="color:#F5C518;font-size:1.75rem;font-weight:900;line-height:1;">500+</div>
                    <div style="color:#999;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:0.25rem;">Clientes felices</div>
                </div>
                <div>
                    <div style="color:#F5C518;font-size:1.75rem;font-weight:900;line-height:1;">100%</div>
                    <div style="color:#999;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:0.25rem;">Verificados</div>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- QUICK SEARCH BAR --}}
<section style="background-color:#F5C518;" class="py-6">
    <div class="max-w-7xl mx-auto px-4">
        <form action="{{ route('vehicles.index') }}" method="GET">
            <div class="flex flex-col md:flex-row gap-3 items-end">
                <div class="flex-1">
                    <label style="color:rgba(255,255,255,0.8);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:0.3rem;">Marca</label>
                    <select name="brand" style="width:100%;background:#fff;border:none;padding:0.65rem 0.875rem;font-size:0.9375rem;color:#333;outline:none;">
                        <option value="">Todas las marcas</option>
                        <option>Nissan</option>
                        <option>Toyota</option>
                        <option>Honda</option>
                        <option>Chevrolet</option>
                        <option>Ford</option>
                        <option>Volkswagen</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label style="color:rgba(255,255,255,0.8);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:0.3rem;">Año</label>
                    <select name="year_min" style="width:100%;background:#fff;border:none;padding:0.65rem 0.875rem;font-size:0.9375rem;color:#333;outline:none;">
                        <option value="">Cualquier año</option>
                        @for($y = date('Y'); $y >= 2015; $y--)
                            <option value="{{ $y }}">{{ $y }} o más nuevo</option>
                        @endfor
                    </select>
                </div>
                <div class="flex-1">
                    <label style="color:rgba(255,255,255,0.8);font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:0.3rem;">Precio máximo</label>
                    <select name="price_max" style="width:100%;background:#fff;border:none;padding:0.65rem 0.875rem;font-size:0.9375rem;color:#333;outline:none;">
                        <option value="">Sin límite</option>
                        <option value="200000">$200,000</option>
                        <option value="300000">$300,000</option>
                        <option value="400000">$400,000</option>
                        <option value="500000">$500,000</option>
                    </select>
                </div>
                <div class="md:flex-none">
                    <button type="submit" class="btn-search">
                        Buscar &rsaquo;
                    </button>
                </div>
            </div>
        </form>
    </div>
</section>

{{-- FEATURED VEHICLES --}}
<section style="background-color:#F8F8F8;" class="py-16">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10">
            <h2 class="section-title centered inline-block" style="font-size:clamp(1.75rem,4vw,2.25rem);">Vehículos Destacados</h2>
            <p style="color:#666666;margin-top:1.5rem;font-size:1rem;">Selección especial de nuestros mejores seminuevos disponibles</p>
        </div>

        @if($featuredVehicles->isNotEmpty())
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($featuredVehicles as $vehicle)
            <div class="vehicle-card group">
                <div style="position:relative;overflow:hidden;height:220px;">
                    <img src="{{ $vehicle->first_image }}"
                         alt="{{ $vehicle->year }} {{ $vehicle->brand }} {{ $vehicle->model }}"
                         style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;"
                         class="group-hover:scale-105"
                         loading="lazy">
                    @if($vehicle->status === 'sold')
                    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;">
                        <span style="background:#F5C518;color:#fff;font-weight:700;text-transform:uppercase;padding:0.5rem 1.5rem;letter-spacing:0.1em;font-size:0.875rem;">VENDIDO</span>
                    </div>
                    @endif
                    <div style="position:absolute;top:0.75rem;left:0.75rem;">
                        <span style="background:#F5C518;color:#fff;font-size:0.7rem;font-weight:700;text-transform:uppercase;padding:0.25rem 0.6rem;letter-spacing:0.05em;">DESTACADO</span>
                    </div>
                </div>
                <div style="padding:1.25rem;">
                    <h3 style="font-size:1rem;font-weight:700;text-transform:uppercase;color:#333;letter-spacing:0.02em;margin-bottom:0.5rem;">
                        {{ $vehicle->year }} {{ $vehicle->brand }} {{ $vehicle->model }}
                    </h3>
                    <div style="font-size:1.375rem;font-weight:900;color:#F5C518;margin-bottom:0.75rem;">
                        ${{ number_format($vehicle->price, 0, '.', ',') }}
                    </div>
                    <div style="display:flex;gap:1rem;color:#666;font-size:0.8125rem;margin-bottom:1rem;">
                        <span>{{ number_format($vehicle->mileage, 0, '.', ',') }} km</span>
                        <span>&bull;</span>
                        <span>{{ $vehicle->fuel_type }}</span>
                        <span>&bull;</span>
                        <span>{{ $vehicle->transmission }}</span>
                    </div>
                    <div style="display:flex;gap:0.75rem;align-items:center;justify-content:space-between;">
                        <a href="{{ route('vehicles.show', $vehicle->id) }}" class="link-arrow text-sm">
                            Ver Detalles &rsaquo;
                        </a>
                        <a href="{{ route('contact.index') }}?vehicle_id={{ $vehicle->id }}" class="btn-primary text-xs py-2 px-4">
                            Cotizar
                        </a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>

        <div class="text-center mt-10">
            <a href="{{ route('vehicles.index') }}" class="btn-outline-dark py-3 px-8">
                Ver Todo el Inventario
            </a>
        </div>
        @else
        <div style="text-align:center;padding:3rem;color:#666;">
            <p>Próximamente más vehículos disponibles. <a href="{{ route('contact.index') }}" style="color:#F5C518;font-weight:700;">Contáctanos</a> para más información.</p>
        </div>
        @endif
    </div>
</section>

{{-- QUICK ACTIONS --}}
<section style="background-color:#ffffff;border-top:1px solid #f0f0f0;" class="py-10">
    <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100 border border-gray-100">

            <a href="{{ route('contact.index') }}?tipo=prueba" style="text-decoration:none;" class="group flex flex-col items-center text-center px-6 py-8 hover:bg-red-50 transition-colors">
                <div style="width:3rem;height:3rem;border-radius:50%;background:#fff3f5;display:flex;align-items:center;justify-content:center;margin-bottom:0.875rem;transition:background 0.2s;" class="group-hover:bg-red-100">
                    <svg class="w-6 h-6" style="color:#F5C518;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                    </svg>
                </div>
                <span style="font-weight:700;font-size:0.8125rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;line-height:1.3;">Agenda Prueba<br>de Manejo</span>
            </a>

            <a href="{{ route('contact.index') }}" style="text-decoration:none;" class="group flex flex-col items-center text-center px-6 py-8 hover:bg-red-50 transition-colors">
                <div style="width:3rem;height:3rem;border-radius:50%;background:#fff3f5;display:flex;align-items:center;justify-content:center;margin-bottom:0.875rem;" class="group-hover:bg-red-100">
                    <svg class="w-6 h-6" style="color:#F5C518;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                </div>
                <span style="font-weight:700;font-size:0.8125rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;line-height:1.3;">Solicita una<br>Cotización</span>
            </a>

            <a href="{{ route('vehicles.index') }}" style="text-decoration:none;" class="group flex flex-col items-center text-center px-6 py-8 hover:bg-red-50 transition-colors">
                <div style="width:3rem;height:3rem;border-radius:50%;background:#fff3f5;display:flex;align-items:center;justify-content:center;margin-bottom:0.875rem;" class="group-hover:bg-red-100">
                    <svg class="w-6 h-6" style="color:#F5C518;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
                    </svg>
                </div>
                <span style="font-weight:700;font-size:0.8125rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;line-height:1.3;">Buscar en<br>Inventario</span>
            </a>

            <a href="https://wa.me/{{ env('AGENCY_WHATSAPP', '526141234567') }}?text=Hola%2C%20quisiera%20informes%20sobre%20sus%20veh%C3%ADculos." target="_blank" style="text-decoration:none;" class="group flex flex-col items-center text-center px-6 py-8 hover:bg-red-50 transition-colors">
                <div style="width:3rem;height:3rem;border-radius:50%;background:#f0fdf0;display:flex;align-items:center;justify-content:center;margin-bottom:0.875rem;" class="group-hover:bg-green-100">
                    <svg class="w-6 h-6" style="color:#4EC248;" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </div>
                <span style="font-weight:700;font-size:0.8125rem;text-transform:uppercase;letter-spacing:0.05em;color:#333;line-height:1.3;">Escríbenos por<br>WhatsApp</span>
            </a>

        </div>
    </div>
</section>

{{-- WHY CHOOSE US --}}
<section style="background-color:#ffffff;" class="py-16">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="section-title centered inline-block">¿Por Qué Elegirnos?</h2>
            <p style="color:#666666;margin-top:1.5rem;">Tu satisfacción es nuestra prioridad</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {{-- Benefit 1 --}}
            <div style="text-align:center;padding:2rem 1.5rem;">
                <div style="width:4rem;height:4rem;background-color:#F5C518;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                </div>
                <h3 style="font-size:1rem;font-weight:700;text-transform:uppercase;color:#333;margin-bottom:0.75rem;letter-spacing:0.03em;">Garantía</h3>
                <p style="color:#666;font-size:0.875rem;line-height:1.6;">Todos nuestros vehículos cuentan con garantía para tu tranquilidad.</p>
            </div>

            {{-- Benefit 2 --}}
            <div style="text-align:center;padding:2rem 1.5rem;">
                <div style="width:4rem;height:4rem;background-color:#F5C518;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                </div>
                <h3 style="font-size:1rem;font-weight:700;text-transform:uppercase;color:#333;margin-bottom:0.75rem;letter-spacing:0.03em;">Financiamiento</h3>
                <p style="color:#666;font-size:0.875rem;line-height:1.6;">Planes de financiamiento flexibles adaptados a tu presupuesto y necesidades.</p>
            </div>

            {{-- Benefit 3 --}}
            <div style="text-align:center;padding:2rem 1.5rem;">
                <div style="width:4rem;height:4rem;background-color:#F5C518;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                </div>
                <h3 style="font-size:1rem;font-weight:700;text-transform:uppercase;color:#333;margin-bottom:0.75rem;letter-spacing:0.03em;">Autos Verificados</h3>
                <p style="color:#666;font-size:0.875rem;line-height:1.6;">Revisión mecánica completa y verificación de historial en cada vehículo.</p>
            </div>

            {{-- Benefit 4 --}}
            <div style="text-align:center;padding:2rem 1.5rem;">
                <div style="width:4rem;height:4rem;background-color:#F5C518;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                    </svg>
                </div>
                <h3 style="font-size:1rem;font-weight:700;text-transform:uppercase;color:#333;margin-bottom:0.75rem;letter-spacing:0.03em;">Asesoría Personalizada</h3>
                <p style="color:#666;font-size:0.875rem;line-height:1.6;">Nuestros expertos te guían para encontrar el vehículo perfecto para ti.</p>
            </div>
        </div>
    </div>
</section>

{{-- TESTIMONIALS --}}
<section style="background-color:#F8F8F8;" class="py-16">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="section-title centered inline-block">Lo Que Dicen Nuestros Clientes</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div style="background:#fff;padding:2rem;border-left:4px solid #F5C518;">
                <div style="display:flex;gap:2px;margin-bottom:1rem;">
                    @for($i=0;$i<5;$i++)
                    <svg class="w-5 h-5" style="fill:#F5C518;" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    @endfor
                </div>
                <p style="color:#555;font-size:0.9375rem;line-height:1.7;font-style:italic;margin-bottom:1.25rem;">"Excelente atención desde el primer momento. Encontré mi Toyota Corolla en perfectas condiciones y con un precio justo. ¡100% recomendados!"</p>
                <div>
                    <div style="font-weight:700;color:#333;font-size:0.9375rem;">Carlos Martínez</div>
                    <div style="color:#999;font-size:0.8125rem;">Gómez Palacio, Dgo.</div>
                </div>
            </div>

            <div style="background:#fff;padding:2rem;border-left:4px solid #F5C518;">
                <div style="display:flex;gap:2px;margin-bottom:1rem;">
                    @for($i=0;$i<5;$i++)
                    <svg class="w-5 h-5" style="fill:#F5C518;" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    @endfor
                </div>
                <p style="color:#555;font-size:0.9375rem;line-height:1.7;font-style:italic;margin-bottom:1.25rem;">"El proceso de financiamiento fue muy sencillo. Me asesoraron muy bien y salí manejando mi Honda CR-V el mismo día. Un servicio de primera."</p>
                <div>
                    <div style="font-weight:700;color:#333;font-size:0.9375rem;">Ana Lucía Flores</div>
                    <div style="color:#999;font-size:0.8125rem;">Lerdo, Durango</div>
                </div>
            </div>

            <div style="background:#fff;padding:2rem;border-left:4px solid #F5C518;">
                <div style="display:flex;gap:2px;margin-bottom:1rem;">
                    @for($i=0;$i<5;$i++)
                    <svg class="w-5 h-5" style="fill:#F5C518;" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    @endfor
                </div>
                <p style="color:#555;font-size:0.9375rem;line-height:1.7;font-style:italic;margin-bottom:1.25rem;">"Llevé mi familia a buscar una camioneta y quedamos muy satisfechos. Toda la documentación en orden, vehículo revisado. AutoGalería es de confianza."</p>
                <div>
                    <div style="font-weight:700;color:#333;font-size:0.9375rem;">Roberto Sánchez</div>
                    <div style="color:#999;font-size:0.8125rem;">Torreón, Coahuila</div>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- GOOGLE MAPS --}}
<section class="py-0">
    <div style="height:380px;background:#e5e7eb;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;right:0;z-index:10;background:linear-gradient(to bottom,rgba(0,0,0,0.3),transparent);padding:1.25rem 2rem;">
            <span style="background:#F5C518;color:#fff;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;padding:0.3rem 0.8rem;">Nuestra Ubicación</span>
        </div>
        <iframe
            src="https://maps.google.com/maps?q=25.5694,-103.4997&z=14&output=embed"
            width="100%"
            height="380"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Ubicación AutoGalería">
        </iframe>
    </div>
</section>

{{-- BOTTOM CTA BAR --}}
<section style="background-color:#F5C518;" class="py-12">
    <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 style="color:#ffffff;font-size:clamp(1.5rem,3vw,2rem);font-weight:900;text-transform:uppercase;margin-bottom:1rem;letter-spacing:-0.01em;">
            ¿Listo Para Encontrar Tu Auto?
        </h2>
        <p style="color:rgba(255,255,255,0.85);font-size:1rem;margin-bottom:2rem;max-width:500px;margin-left:auto;margin-right:auto;">
            Visítanos en nuestras instalaciones o contáctanos ahora. Tu próximo auto te está esperando.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="{{ route('vehicles.index') }}" class="btn-cta-white">
                Ver Inventario
            </a>
            <a href="https://wa.me/526141234567?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20autos%20disponibles."
               target="_blank"
               class="btn-cta-outline-white">
                WhatsApp Ahora
            </a>
        </div>
    </div>
</section>

@endsection
