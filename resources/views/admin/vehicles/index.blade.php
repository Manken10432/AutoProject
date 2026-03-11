@extends('admin.layout')

@section('title', 'Vehículos')
@section('page-title', 'Gestión de Vehículos')

@section('content')

<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
    <p style="color:#6b7280;font-size:0.875rem;">{{ $vehicles->total() }} vehículo{{ $vehicles->total() != 1 ? 's' : '' }} en total</p>
    <a href="{{ route('admin.vehiculos.create') }}" class="btn-primary text-sm py-2 px-5">+ Agregar Vehículo</a>
</div>

<div style="background:#fff;border:1px solid #e5e7eb;overflow:hidden;">
    <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.875rem;white-space:nowrap;">
            <thead>
                <tr style="background:#f9fafb;border-bottom:2px solid #e5e7eb;">
                    <th style="text-align:left;padding:0.875rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">ID</th>
                    <th style="text-align:left;padding:0.875rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Vehículo</th>
                    <th style="text-align:left;padding:0.875rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Precio</th>
                    <th style="text-align:left;padding:0.875rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Km</th>
                    <th style="text-align:left;padding:0.875rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Estado</th>
                    <th style="text-align:left;padding:0.875rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Destacado</th>
                    <th style="text-align:left;padding:0.875rem 1rem;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse($vehicles as $vehicle)
                <tr style="border-bottom:1px solid #f0f0f0;" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background='transparent'">
                    <td style="padding:0.875rem 1rem;color:#999;font-size:0.8125rem;">#{{ $vehicle->id }}</td>
                    <td style="padding:0.875rem 1rem;">
                        <div style="display:flex;align-items:center;gap:0.875rem;">
                            <div style="width:56px;height:42px;overflow:hidden;background:#f0f0f0;flex-shrink:0;">
                                <img src="{{ $vehicle->first_image }}" alt="{{ $vehicle->brand }}" style="width:100%;height:100%;object-fit:cover;">
                            </div>
                            <div>
                                <div style="font-weight:700;color:#333;font-size:0.875rem;">{{ $vehicle->year }} {{ $vehicle->brand }} {{ $vehicle->model }}</div>
                                <div style="color:#999;font-size:0.75rem;">{{ $vehicle->fuel_type }} &bull; {{ $vehicle->transmission }}</div>
                            </div>
                        </div>
                    </td>
                    <td style="padding:0.875rem 1rem;font-weight:700;color:#C3002F;">${{ number_format($vehicle->price, 0, '.', ',') }}</td>
                    <td style="padding:0.875rem 1rem;color:#555;">{{ number_format($vehicle->mileage, 0, '.', ',') }}</td>
                    <td style="padding:0.875rem 1rem;">
                        <form action="{{ route('admin.vehiculos.status', $vehicle->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('PATCH')
                            <button type="submit" style="cursor:pointer;border:none;background:none;padding:0;">
                                @if($vehicle->status === 'available')
                                <span class="badge-available" style="cursor:pointer;">Disponible</span>
                                @else
                                <span class="badge-sold" style="cursor:pointer;">Vendido</span>
                                @endif
                            </button>
                        </form>
                    </td>
                    <td style="padding:0.875rem 1rem;">
                        <form action="{{ route('admin.vehiculos.featured', $vehicle->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('PATCH')
                            <button type="submit" style="cursor:pointer;border:none;background:none;padding:0;" title="{{ $vehicle->featured ? 'Quitar destacado' : 'Destacar' }}">
                                @if($vehicle->featured)
                                <svg class="w-5 h-5" style="color:#d97706;fill:#d97706;" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                @else
                                <svg class="w-5 h-5" style="color:#d1d5db;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                                @endif
                            </button>
                        </form>
                    </td>
                    <td style="padding:0.875rem 1rem;">
                        <div style="display:flex;gap:0.5rem;align-items:center;">
                            <a href="{{ route('vehicles.show', $vehicle->id) }}" target="_blank"
                               style="background:#f3f4f6;border:1px solid #e5e7eb;color:#555;padding:0.375rem 0.625rem;font-size:0.75rem;font-weight:600;text-decoration:none;transition:all 0.2s;"
                               title="Ver en sitio">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                            </a>
                            <a href="{{ route('admin.vehiculos.edit', $vehicle->id) }}"
                               style="background:#dbeafe;border:1px solid #bfdbfe;color:#1d4ed8;padding:0.375rem 0.75rem;font-size:0.75rem;font-weight:600;text-transform:uppercase;text-decoration:none;letter-spacing:0.05em;">
                                Editar
                            </a>
                            <form action="{{ route('admin.vehiculos.destroy', $vehicle->id) }}" method="POST"
                                  onsubmit="return confirm('¿Eliminar este vehículo? Esta acción no se puede deshacer.')">
                                @csrf
                                @method('DELETE')
                                <button type="submit"
                                        style="background:#fee2e2;border:1px solid #fca5a5;color:#dc2626;padding:0.375rem 0.75rem;font-size:0.75rem;font-weight:600;text-transform:uppercase;cursor:pointer;letter-spacing:0.05em;">
                                    Eliminar
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="7" style="padding:3rem;text-align:center;color:#999;">
                        No hay vehículos registrados. <a href="{{ route('admin.vehiculos.create') }}" style="color:#C3002F;">Agregar uno ahora</a>.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($vehicles->hasPages())
    <div style="padding:1rem 1.5rem;border-top:1px solid #e5e7eb;">
        {{ $vehicles->links() }}
    </div>
    @endif
</div>

@endsection
