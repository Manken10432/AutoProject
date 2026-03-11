@extends('admin.layout')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')

{{-- Stats cards --}}
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

    <div style="background:#fff;border:1px solid #e5e7eb;padding:1.25rem 1.5rem;border-left:4px solid #F5C518;">
        <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;margin-bottom:0.5rem;">Total Vehículos</div>
        <div style="font-size:2rem;font-weight:900;color:#333;line-height:1;">{{ $stats['total'] }}</div>
    </div>

    <div style="background:#fff;border:1px solid #e5e7eb;padding:1.25rem 1.5rem;border-left:4px solid #16a34a;">
        <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;margin-bottom:0.5rem;">Disponibles</div>
        <div style="font-size:2rem;font-weight:900;color:#16a34a;line-height:1;">{{ $stats['available'] }}</div>
    </div>

    <div style="background:#fff;border:1px solid #e5e7eb;padding:1.25rem 1.5rem;border-left:4px solid #dc2626;">
        <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;margin-bottom:0.5rem;">Vendidos</div>
        <div style="font-size:2rem;font-weight:900;color:#dc2626;line-height:1;">{{ $stats['sold'] }}</div>
    </div>

    <div style="background:#fff;border:1px solid #e5e7eb;padding:1.25rem 1.5rem;border-left:4px solid #d97706;">
        <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;margin-bottom:0.5rem;">Destacados</div>
        <div style="font-size:2rem;font-weight:900;color:#d97706;line-height:1;">{{ $stats['featured'] }}</div>
    </div>
</div>

{{-- Quick actions --}}
<div style="display:flex;gap:1rem;margin-bottom:2rem;flex-wrap:wrap;">
    <a href="{{ route('admin.vehiculos.create') }}" class="btn-primary text-sm py-2 px-5">
        + Agregar Vehículo
    </a>
    <a href="{{ route('vehicles.index') }}" target="_blank" class="btn-outline-dark text-sm py-2 px-5">
        Ver Inventario Público
    </a>
</div>

{{-- Recent contacts --}}
<div style="background:#fff;border:1px solid #e5e7eb;">
    <div style="padding:1rem 1.5rem;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;">
        <h2 style="font-size:0.9rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#333;">Solicitudes Recientes</h2>
    </div>

    @if($recentContacts->isNotEmpty())
    <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
            <thead>
                <tr style="background:#f9fafb;border-bottom:1px solid #e5e7eb;">
                    <th style="text-align:left;padding:0.75rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Nombre</th>
                    <th style="text-align:left;padding:0.75rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Teléfono</th>
                    <th style="text-align:left;padding:0.75rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Email</th>
                    <th style="text-align:left;padding:0.75rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Vehículo</th>
                    <th style="text-align:left;padding:0.75rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Fecha</th>
                </tr>
            </thead>
            <tbody>
                @foreach($recentContacts as $contact)
                <tr style="border-bottom:1px solid #f0f0f0;" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background='transparent'">
                    <td style="padding:0.875rem 1rem;font-weight:600;color:#333;">{{ $contact->name }}</td>
                    <td style="padding:0.875rem 1rem;color:#555;">{{ $contact->phone }}</td>
                    <td style="padding:0.875rem 1rem;color:#555;">{{ $contact->email }}</td>
                    <td style="padding:0.875rem 1rem;color:#555;">
                        @if($contact->vehicle)
                        <a href="{{ route('vehicles.show', $contact->vehicle->id) }}" target="_blank" style="color:#F5C518;text-decoration:none;font-weight:600;">
                            {{ $contact->vehicle->year }} {{ $contact->vehicle->brand }} {{ $contact->vehicle->model }}
                        </a>
                        @else
                        <span style="color:#aaa;">General</span>
                        @endif
                    </td>
                    <td style="padding:0.875rem 1rem;color:#999;font-size:0.8125rem;">{{ $contact->created_at->format('d/m/Y H:i') }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @else
    <div style="padding:3rem;text-align:center;color:#999;">
        <p>No hay solicitudes de contacto aún.</p>
    </div>
    @endif
</div>

@endsection
