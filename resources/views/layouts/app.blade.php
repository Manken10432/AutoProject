<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'AutoGalería - Seminuevos de Calidad')</title>
    <meta name="description" content="@yield('description', 'AutoGalería - Los mejores seminuevos en Gómez Palacio, Durango. Encuentra tu auto ideal con garantía y financiamiento.')">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- Open Graph --}}
    <meta property="og:type" content="@yield('og_type', 'website')">
    <meta property="og:title" content="@yield('title', 'AutoGalería - Seminuevos de Calidad')">
    <meta property="og:description" content="@yield('description', 'AutoGalería - Los mejores seminuevos en Gómez Palacio, Durango.')">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="@yield('og_image', asset('images/og-default.jpg'))">
    <meta property="og:site_name" content="AutoGalería">
    <meta property="og:locale" content="es_MX">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="@yield('title', 'AutoGalería - Seminuevos de Calidad')">
    <meta name="twitter:description" content="@yield('description', 'AutoGalería - Los mejores seminuevos en Gómez Palacio, Durango.')">
    <meta name="twitter:image" content="@yield('og_image', asset('images/og-default.jpg'))">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-white public-page" style="font-family:'Helvetica Neue',Arial,sans-serif;">

    {{-- TOP BAR --}}
    <div style="background-color:#343434;" class="text-white text-sm py-2">
        <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <span class="font-semibold tracking-wide">
                AutoGalería &nbsp;|&nbsp;
                <a href="tel:6141234567" class="hover:text-red-400 transition-colors">&#128222; (614) 123-4567</a>
            </span>
            <div class="hidden md:flex items-center gap-5">
                <a href="{{ route('vehicles.index') }}" class="hover:text-red-300 transition-colors uppercase text-xs tracking-widest font-semibold">Inventario</a>
                <a href="{{ route('contact.index') }}" class="hover:text-red-300 transition-colors uppercase text-xs tracking-widest font-semibold">Cotización</a>
                <a href="https://wa.me/526141234567" target="_blank" class="flex items-center gap-1 hover:text-green-300 transition-colors">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                </a>
            </div>
        </div>
    </div>

    {{-- NAVBAR --}}
    <nav class="bg-white sticky top-0 z-50 shadow-md">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between h-16">

                {{-- Logo --}}
                <a href="{{ route('home') }}" class="flex items-center gap-2 no-underline">
                    <span style="color:#C3002F; font-size:1.6rem; font-weight:900; letter-spacing:-0.02em; text-transform:uppercase;">Auto<span style="color:#333333;">Galería</span></span>
                </a>

                {{-- Desktop Menu --}}
                <div class="hidden md:flex items-center gap-8">
                    <a href="{{ route('home') }}" class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}">Inicio</a>
                    <a href="{{ route('vehicles.index') }}" class="nav-link {{ request()->routeIs('vehicles.*') ? 'active' : '' }}">Seminuevos</a>
                    <a href="{{ route('contact.index') }}" class="nav-link {{ request()->routeIs('contact.*') ? 'active' : '' }}">Cotización</a>
                    <a href="https://wa.me/526141234567" target="_blank" class="btn-primary text-sm py-2 px-5">
                        Contáctanos
                    </a>
                </div>

                {{-- Mobile Hamburger --}}
                <button id="mobile-menu-btn" class="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-red-700 transition-colors" aria-label="Menu">
                    <svg class="icon-open w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    <svg class="icon-close w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            {{-- Mobile Menu --}}
            <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-gray-100">
                <div class="flex flex-col gap-1 pt-3">
                    <a href="{{ route('home') }}" class="block px-3 py-2 font-bold text-sm uppercase tracking-widest {{ request()->routeIs('home') ? 'text-red-700' : 'text-gray-700' }} hover:text-red-700 hover:bg-gray-50 transition-colors">Inicio</a>
                    <a href="{{ route('vehicles.index') }}" class="block px-3 py-2 font-bold text-sm uppercase tracking-widest {{ request()->routeIs('vehicles.*') ? 'text-red-700' : 'text-gray-700' }} hover:text-red-700 hover:bg-gray-50 transition-colors">Seminuevos</a>
                    <a href="{{ route('contact.index') }}" class="block px-3 py-2 font-bold text-sm uppercase tracking-widest {{ request()->routeIs('contact.*') ? 'text-red-700' : 'text-gray-700' }} hover:text-red-700 hover:bg-gray-50 transition-colors">Cotización</a>
                    <a href="tel:6141234567" class="block px-3 py-2 font-bold text-sm uppercase tracking-widest text-gray-700 hover:text-red-700 hover:bg-gray-50 transition-colors">&#128222; (614) 123-4567</a>
                    <a href="https://wa.me/526141234567" target="_blank" class="mx-3 mt-2 btn-primary text-center text-sm py-2">WhatsApp</a>
                </div>
            </div>
        </div>
    </nav>

    {{-- PAGE CONTENT --}}
    <main>
        @yield('content')
    </main>

    {{-- FOOTER --}}
    <footer style="background-color:#000000;" class="text-white pt-12 pb-0">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">

                {{-- Column 1: Info + Socials --}}
                <div>
                    <div class="mb-4">
                        <span style="color:#C3002F; font-size:1.4rem; font-weight:900; text-transform:uppercase; letter-spacing:-0.02em;">Auto<span style="color:#ffffff;">Galería</span></span>
                    </div>
                    <p class="text-gray-400 text-sm leading-relaxed mb-5">
                        Tu concesionaria de confianza en Gómez Palacio, Durango. Más de 10 años ofreciendo los mejores seminuevos con garantía y financiamiento accesible.
                    </p>
                    <div class="flex gap-3">
                        <a href="#" class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-700 transition-colors" aria-label="Facebook">
                            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="#" class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-700 transition-colors" aria-label="Instagram">
                            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                        <a href="https://wa.me/526141234567" target="_blank" class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors" aria-label="WhatsApp">
                            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                    </div>
                </div>

                {{-- Column 2: Quick Links --}}
                <div>
                    <h4 class="text-white font-bold uppercase tracking-widest text-sm mb-5 pb-2 border-b border-gray-700">Enlaces Rápidos</h4>
                    <ul class="space-y-2">
                        <li><a href="{{ route('home') }}" class="text-gray-400 hover:text-red-400 text-sm transition-colors">Inicio</a></li>
                        <li><a href="{{ route('vehicles.index') }}" class="text-gray-400 hover:text-red-400 text-sm transition-colors">Inventario Seminuevos</a></li>
                        <li><a href="{{ route('contact.index') }}" class="text-gray-400 hover:text-red-400 text-sm transition-colors">Solicitar Cotización</a></li>
                        <li><a href="{{ route('vehicles.index') }}?fuel_type[]=Híbrido" class="text-gray-400 hover:text-red-400 text-sm transition-colors">Vehículos Híbridos</a></li>
                        <li><a href="{{ route('vehicles.index') }}?sort_by=price_asc" class="text-gray-400 hover:text-red-400 text-sm transition-colors">Mejores Precios</a></li>
                    </ul>
                </div>

                {{-- Column 3: Contact --}}
                <div>
                    <h4 class="text-white font-bold uppercase tracking-widest text-sm mb-5 pb-2 border-b border-gray-700">Contáctanos</h4>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li class="flex items-start gap-2">
                            <svg class="w-4 h-4 mt-0.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            Blvd. Domingo Arrieta #1234, Gómez Palacio, Durango
                        </li>
                        <li class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            <a href="tel:6141234567" class="hover:text-white transition-colors">(614) 123-4567</a>
                        </li>
                        <li class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            <a href="https://wa.me/526141234567" target="_blank" class="hover:text-white transition-colors">WhatsApp: (614) 123-4567</a>
                        </li>
                        <li class="flex items-start gap-2">
                            <svg class="w-4 h-4 mt-0.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>Lun-Sáb: 9:00am - 7:00pm<br>Dom: 10:00am - 3:00pm</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {{-- Sub-footer --}}
        <div style="background-color:#111111;" class="mt-0 py-4">
            <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
                <p class="text-gray-500 text-xs">&copy; {{ date('Y') }} AutoGalería. Todos los derechos reservados.</p>
                <p class="text-gray-600 text-xs">Gómez Palacio, Durango, México</p>
            </div>
        </div>
    </footer>

    {{-- BOTTOM QUOTE BAR --}}
    <div id="bottom-quote-bar" style="position:fixed;bottom:0;left:0;right:0;background:#1a1a1a;z-index:998;transform:translateY(100%);transition:transform 0.4s ease;" class="hidden md:block">
        <form action="{{ route('contact.store') }}" method="POST">
            @csrf
            <div style="max-width:80rem;margin:0 auto;padding:0.75rem 1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                <span style="color:#fff;font-weight:700;font-size:0.8125rem;text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap;flex-shrink:0;">
                    SOLICITA UNA COTIZACIÓN
                </span>
                <div style="flex:1;display:flex;gap:0.625rem;flex-wrap:wrap;">
                    <input type="text" name="name" placeholder="Nombre"
                        style="flex:1;min-width:120px;background:#2a2a2a;border:1px solid #444;color:#fff;padding:0.5rem 0.75rem;font-size:0.8125rem;outline:none;"
                        onfocus="this.style.borderColor='#C3002F'" onblur="this.style.borderColor='#444'" required>
                    <input type="email" name="email" placeholder="Correo"
                        style="flex:1;min-width:140px;background:#2a2a2a;border:1px solid #444;color:#fff;padding:0.5rem 0.75rem;font-size:0.8125rem;outline:none;"
                        onfocus="this.style.borderColor='#C3002F'" onblur="this.style.borderColor='#444'" required>
                    <input type="tel" name="phone" placeholder="Teléfono"
                        style="flex:1;min-width:120px;background:#2a2a2a;border:1px solid #444;color:#fff;padding:0.5rem 0.75rem;font-size:0.8125rem;outline:none;"
                        onfocus="this.style.borderColor='#C3002F'" onblur="this.style.borderColor='#444'" required>
                </div>
                <button type="submit" style="background:#C3002F;color:#fff;font-weight:700;text-transform:uppercase;padding:0.5rem 1.5rem;border:none;cursor:pointer;font-size:0.8125rem;letter-spacing:0.05em;white-space:nowrap;flex-shrink:0;transition:background 0.2s;" onmouseover="this.style.background='#9e0026'" onmouseout="this.style.background='#C3002F'">
                    Enviar &rsaquo;
                </button>
                <button type="button" id="close-quote-bar" style="background:transparent;border:none;color:#666;cursor:pointer;padding:0.25rem;flex-shrink:0;" aria-label="Cerrar">
                    <svg style="width:1rem;height:1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </form>
    </div>

    {{-- WHATSAPP FAB --}}
    <a href="https://wa.me/526141234567?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20veh%C3%ADculos%20disponibles."
       target="_blank"
       class="whatsapp-fab"
       aria-label="Contactar por WhatsApp"
       title="Escríbenos por WhatsApp">
        <svg class="w-7 h-7 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>

</body>
</html>
