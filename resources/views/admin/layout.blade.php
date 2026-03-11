<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin') - AutoGalería</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="admin-page" style="background-color:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;min-height:100vh;">

<div style="display:flex;min-height:100vh;">

    {{-- SIDEBAR --}}
    <aside style="width:240px;background-color:#111827;flex-shrink:0;display:flex;flex-direction:column;">

        {{-- Logo --}}
        <div style="padding:1.5rem 1.25rem;border-bottom:1px solid #1f2937;">
            <a href="{{ route('admin.dashboard') }}" style="text-decoration:none;">
                <span style="color:#C3002F;font-size:1.25rem;font-weight:900;text-transform:uppercase;letter-spacing:-0.01em;">Auto<span style="color:#fff;">Galería</span></span>
            </a>
            <p style="color:#6b7280;font-size:0.6875rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:0.25rem;">Panel Admin</p>
        </div>

        {{-- Nav --}}
        <nav style="flex:1;padding:1rem 0.75rem;display:flex;flex-direction:column;gap:0.25rem;">
            <a href="{{ route('admin.dashboard') }}"
               class="admin-sidebar-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                Dashboard
            </a>

            <a href="{{ route('admin.vehiculos.index') }}"
               class="admin-sidebar-link {{ request()->routeIs('admin.vehiculos.*') ? 'active' : '' }}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                Vehículos
            </a>

            <a href="{{ route('admin.vehiculos.create') }}"
               class="admin-sidebar-link {{ request()->routeIs('admin.vehiculos.create') ? 'active' : '' }}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                Agregar Vehículo
            </a>

            <div style="height:1px;background:#1f2937;margin:0.5rem 0;"></div>

            <a href="{{ route('home') }}" target="_blank" class="admin-sidebar-link">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                Ver Sitio
            </a>
        </nav>

        {{-- Logout --}}
        <div style="padding:0.75rem;border-top:1px solid #1f2937;">
            <form action="{{ route('admin.logout') }}" method="POST">
                @csrf
                <button type="submit" class="admin-sidebar-link" style="width:100%;border:none;cursor:pointer;background:transparent;text-align:left;">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Cerrar Sesión
                </button>
            </form>
        </div>
    </aside>

    {{-- MAIN CONTENT --}}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;">

        {{-- Top bar --}}
        <header style="background:#fff;border-bottom:1px solid #e5e7eb;padding:0 1.5rem;height:60px;display:flex;align-items:center;justify-content:space-between;">
            <h1 style="font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#333;">
                @yield('page-title', 'Dashboard')
            </h1>
            <span style="font-size:0.8125rem;color:#6b7280;">AutoGalería Admin</span>
        </header>

        {{-- Flash messages --}}
        @if(session('success'))
        <div style="background:#dcfce7;border-bottom:1px solid #86efac;color:#166534;padding:0.875rem 1.5rem;font-size:0.875rem;display:flex;gap:0.75rem;align-items:center;">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            {{ session('success') }}
        </div>
        @endif

        {{-- Page content --}}
        <main style="flex:1;padding:1.5rem;overflow-auto;">
            @yield('content')
        </main>
    </div>
</div>

</body>
</html>
