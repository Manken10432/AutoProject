<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - AutoGalería</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body style="background-color:#1a1a1a;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Helvetica Neue',Arial,sans-serif;">
    <div style="width:100%;max-width:400px;padding:1rem;">
        <div style="text-align:center;margin-bottom:2rem;">
            <span style="color:#F5C518;font-size:1.75rem;font-weight:900;text-transform:uppercase;letter-spacing:-0.02em;">Auto<span style="color:#fff;">Galería</span></span>
            <p style="color:#999;font-size:0.875rem;margin-top:0.5rem;text-transform:uppercase;letter-spacing:0.1em;">Panel de Administración</p>
        </div>

        <div style="background:#fff;padding:2.5rem;">
            <h1 style="font-size:1.25rem;font-weight:700;text-transform:uppercase;color:#333;letter-spacing:0.05em;margin-bottom:1.75rem;text-align:center;">Iniciar Sesión</h1>

            @if($errors->any())
            <div style="background:#fee2e2;border:1px solid #fca5a5;color:#dc2626;padding:0.875rem;margin-bottom:1.25rem;font-size:0.875rem;">
                @foreach($errors->all() as $error)
                <p>{{ $error }}</p>
                @endforeach
            </div>
            @endif

            <form action="{{ route('admin.login.post') }}" method="POST">
                @csrf
                <div style="margin-bottom:1.25rem;">
                    <label class="form-label">Contraseña</label>
                    <input type="password"
                           name="password"
                           required
                           class="form-input"
                           placeholder="Ingresa tu contraseña"
                           autofocus>
                </div>
                <button type="submit" class="btn-primary w-full py-3 text-sm" style="width:100%;">
                    Entrar al Panel
                </button>
            </form>
        </div>

        <p style="text-align:center;margin-top:1.5rem;">
            <a href="{{ route('home') }}" style="color:#666;font-size:0.8125rem;text-decoration:none;" onmouseover="this.style.color='#F5C518'" onmouseout="this.style.color='#666'">&larr; Volver al sitio</a>
        </p>
    </div>
</body>
</html>
