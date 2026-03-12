<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Respuesta de AutoGalería</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                    {{-- Header --}}
                    <tr>
                        <td style="background:#0c0c0c;padding:28px 36px;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="width:3px;background:#F5C518;">&nbsp;</td>
                                    <td style="padding-left:14px;">
                                        <span style="font-size:22px;font-weight:900;letter-spacing:2px;color:#fff;text-transform:uppercase;">
                                            AUTO<span style="color:#F5C518;">GALERÍA</span>
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Body --}}
                    <tr>
                        <td style="background:#ffffff;padding:36px 36px 28px;">
                            <p style="margin:0 0 6px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#F5C518;">
                                Respuesta a tu solicitud
                            </p>
                            <h1 style="margin:0 0 24px;font-size:24px;font-weight:900;color:#111;line-height:1.2;">
                                Hola, {{ $contact->name }}
                            </h1>

                            <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.7;">
                                Gracias por contactarnos. A continuación encontrarás nuestra respuesta a tu solicitud:
                            </p>

                            {{-- Reply box --}}
                            <div style="background:#f9f9f9;border-left:3px solid #F5C518;padding:20px 24px;margin-bottom:28px;">
                                <p style="margin:0;font-size:15px;color:#222;line-height:1.8;white-space:pre-line;">{{ $replyMessage }}</p>
                            </div>

                            @if($contact->vehicle)
                            <div style="background:#f5f5f5;border:1px solid #e5e5e5;padding:16px 20px;margin-bottom:24px;">
                                <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#999;">Vehículo de interés</p>
                                <p style="margin:0;font-size:15px;font-weight:700;color:#111;">
                                    {{ $contact->vehicle->year }} {{ $contact->vehicle->brand }} {{ $contact->vehicle->model }}
                                </p>
                            </div>
                            @endif

                            <p style="margin:0 0 6px;font-size:14px;color:#555;line-height:1.7;">
                                Si tienes más preguntas, no dudes en contactarnos directamente:
                            </p>
                            <p style="margin:0 0 28px;font-size:14px;color:#555;line-height:1.7;">
                                📞 <strong>(614) 123-4567</strong><br>
                                💬 WhatsApp disponible
                            </p>

                            <a href="{{ url('/cotizacion') }}" style="display:inline-block;background:#F5C518;color:#0c0c0c;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:14px 28px;text-decoration:none;">
                                Nueva Solicitud
                            </a>
                        </td>
                    </tr>

                    {{-- Original message --}}
                    <tr>
                        <td style="background:#f9f9f9;padding:20px 36px;border-top:1px solid #eee;">
                            <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#aaa;">Tu mensaje original</p>
                            <p style="margin:0;font-size:13px;color:#888;line-height:1.7;white-space:pre-line;">{{ $contact->message ?: '(Sin mensaje)' }}</p>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="background:#0c0c0c;padding:20px 36px;">
                            <p style="margin:0;font-size:12px;color:#444;line-height:1.6;">
                                © {{ date('Y') }} AutoGalería · Gómez Palacio, Durango, México<br>
                                Este correo es una respuesta a tu solicitud de contacto.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
