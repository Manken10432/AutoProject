<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo contacto — AutoGalería</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; color: #333; }
        .wrapper { max-width: 560px; margin: 32px auto; background: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .header { background: #0c0c0c; padding: 24px 32px; }
        .header-logo { font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 2px; text-transform: uppercase; }
        .header-logo span { color: #F5C518; }
        .badge { display: inline-block; background: #F5C518; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; }
        .body { padding: 32px; }
        .body h2 { font-size: 18px; color: #111; margin: 0 0 20px; }
        .field { margin-bottom: 16px; }
        .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #111; background: #f8f8f8; padding: 10px 14px; border-left: 3px solid #F5C518; }
        .vehicle-box { background: #fff8f8; border: 1px solid #f0d0d5; padding: 12px 16px; margin-bottom: 16px; border-radius: 2px; font-size: 14px; color: #333; }
        .footer { background: #f8f8f8; padding: 20px 32px; font-size: 12px; color: #999; border-top: 1px solid #eee; }
        .btn { display: inline-block; background: #F5C518; color: #fff; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="header-logo">AUTO<span>GALERÍA</span></div>
            <div class="badge">Nuevo Contacto</div>
        </div>

        <div class="body">
            <h2>Tienes un nuevo mensaje de contacto</h2>

            <div class="field">
                <div class="field-label">Nombre</div>
                <div class="field-value">{{ $contact->name }}</div>
            </div>

            <div class="field">
                <div class="field-label">Correo electrónico</div>
                <div class="field-value">{{ $contact->email }}</div>
            </div>

            <div class="field">
                <div class="field-label">Teléfono</div>
                <div class="field-value">{{ $contact->phone }}</div>
            </div>

            @if($contact->vehicle)
            <div class="vehicle-box">
                🚗 Interesado en: <strong>{{ $contact->vehicle->year }} {{ $contact->vehicle->brand }} {{ $contact->vehicle->model }}</strong>
                — ${{ number_format($contact->vehicle->price, 0, '.', ',') }} MXN
            </div>
            @endif

            @if($contact->message)
            <div class="field">
                <div class="field-label">Mensaje</div>
                <div class="field-value" style="white-space: pre-line;">{{ $contact->message }}</div>
            </div>
            @endif

            <a href="{{ route('admin.dashboard') }}" class="btn">Ver en el panel admin</a>
        </div>

        <div class="footer">
            Este correo fue enviado automáticamente por AutoGalería · {{ now()->format('d/m/Y H:i') }}
        </div>
    </div>
</body>
</html>
