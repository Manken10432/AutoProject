# Herramientas y Dependencias del Proyecto

**Framework:** Laravel 12.53.0 | **PHP:** ^8.2 | **Build Tool:** Vite 7.0.7

---

## Configuración de Nueva Computadora

### 1. Requisitos del sistema (instalar antes que nada)

| Software | Versión mínima | Notas |
|----------|---------------|-------|
| **PHP** | 8.2+ | Con extensiones listadas abajo |
| **Composer** | 2.x | Gestor de dependencias PHP |
| **Node.js** | 20.19+ | Requerido por Vite 7 |
| **npm** | 10+ | Viene incluido con Node.js |
| **Git** | cualquiera | Para clonar el repositorio |
| **SQLite** | 3.x | Base de datos por defecto en desarrollo |

### 2. Extensiones de PHP requeridas

Estas extensiones deben estar habilitadas en `php.ini`:

```
php-mbstring      # Manejo de strings multibyte
php-xml           # Procesamiento XML
php-curl          # Peticiones HTTP (Guzzle)
php-zip           # Compresión de archivos
php-bcmath        # Aritmética de precisión
php-tokenizer     # Análisis de tokens PHP
php-pdo           # Abstracción de base de datos
php-sqlite3       # Driver SQLite
php-fileinfo      # Detección de tipos de archivo
php-openssl       # Cifrado y seguridad
php-ctype         # Validación de tipos de caracteres
php-json          # Manejo de JSON
```

> En Ubuntu/Debian: `sudo apt install php8.2-{mbstring,xml,curl,zip,bcmath,sqlite3,pdo}`
> En macOS con Homebrew: generalmente ya vienen incluidas con `brew install php`

### 3. Pasos de instalación (después de clonar el repo)

```bash
# 1. Instalar dependencias PHP
composer install

# 2. Instalar dependencias JavaScript
npm install

# 3. Crear archivo de entorno
cp .env.example .env

# 4. Generar clave de aplicación
php artisan key:generate

# 5. Crear enlace simbólico de storage
php artisan storage:link

# 6. Ejecutar migraciones y seeders
php artisan migrate --seed

# 7. Compilar assets (desarrollo)
npm run dev
# o para producción:
npm run build
```

### 4. Levantar el servidor de desarrollo

```bash
# Opción A — Servidor integrado de PHP (simple)
php artisan serve

# Opción B — Todo en paralelo (recomendado, usa el script del proyecto)
npm run dev     # en una terminal
php artisan serve   # en otra terminal
```

### 5. Accesos por defecto

| Panel | URL | Credenciales |
|-------|-----|-------------|
| Sitio principal | `http://localhost:8000` | — |
| Panel admin | `http://localhost:8000/admin` | contraseña: `admin123` |

> **Nota:** La contraseña del admin está pendiente de migrar a variable de entorno (`.env`).

---

## Paquetes PHP (composer.json)

### Dependencias principales

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| laravel/framework | v12.53.0 | Framework principal |
| laravel/fortify | v1.35.0 | Scaffolding de autenticación |
| laravel/tinker | v2.11.1 | REPL interactivo para Laravel |
| laravel/mcp | v0.6.0 | Soporte para Model Context Protocol |
| inertiajs/inertia-laravel | v2.0.21 | Adaptador de Inertia.js para Laravel |
| livewire/livewire | v4.2.1 | Componentes reactivos full-stack |
| tightenco/ziggy | v2.6.2 | Helpers de rutas Laravel en JavaScript |
| pragmarx/google2fa | v9.0.0 | Autenticación de dos factores (2FA) |
| bacon/bacon-qr-code | v3.0.3 | Generador de códigos QR (para 2FA) |
| nesbot/carbon | 3.11.1 | Librería de fechas/horas |

### Dependencias de desarrollo

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| laravel/pint | v1.27.1 | Formateador de código PHP |
| laravel/sail | v1.53.0 | Entorno de desarrollo con Docker |
| laravel/pail | v1.2.6 | Tail de logs en tiempo real |
| phpunit/phpunit | 11.5.55 | Framework de testing |
| fakerphp/faker | v1.24.1 | Generación de datos falsos |
| mockery/mockery | 1.6.12 | Framework de mocking para tests |
| nunomaduro/collision | v8.9.1 | Reporte de errores mejorado |

---

## Paquetes JavaScript (package.json)

### Frontend & UI

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| react | ^19.2.4 | Librería de UI |
| react-dom | ^19.2.4 | Renderizado React en el DOM |
| @inertiajs/react | ^2.3.17 | Adaptador React para Inertia.js |
| tailwindcss | ^4.0.0 | Framework CSS utility-first |

### Build & Herramientas

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| vite | ^7.0.7 | Bundler y servidor de desarrollo |
| laravel-vite-plugin | ^2.0.0 | Plugin Vite para Laravel |
| @vitejs/plugin-react | ^5.1.4 | Plugin React para Vite |
| @tailwindcss/vite | ^4.0.0 | Plugin Tailwind CSS para Vite |
| axios | ^1.11.0 | Cliente HTTP |
| ziggy-js | ^2.6.2 | Helper de rutas en el cliente |
| concurrently | ^9.0.1 | Ejecutar múltiples comandos en paralelo |

---

## Stack Tecnológico

### Frontend
- **React 19** + **Inertia.js** — SPA sin API REST explícita
- **Livewire 4** — Componentes reactivos del lado del servidor
- **Tailwind CSS 4** — Estilos
- **Ziggy** — Rutas de Laravel disponibles en JavaScript
- **Vite 7** — Build y HMR en desarrollo

### Autenticación
- **Laravel Fortify** — Registro, login, reset de contraseña
- **Google 2FA** + **QR Code** — Autenticación de dos factores habilitada

### Base de Datos & Storage
- **SQLite** por defecto (soporta MySQL y PostgreSQL)
- Sesiones, caché y colas gestionadas en base de datos

### Herramientas de Desarrollo
- **Laravel Sail** — Docker para entorno local
- **Laravel Pint** — Formateo de código (PSR-12)
- **Laravel Pail** — Logs en tiempo real en terminal
- **Laravel Tinker** — Shell REPL interactivo
- **PHPUnit 11** — Tests unitarios y de feature
- **Collision** — Output de errores mejorado en tests

---

## Configuración del Entorno (.env.example)

| Variable | Valor por defecto | Descripción |
|----------|-------------------|-------------|
| DB_CONNECTION | sqlite | Motor de base de datos |
| SESSION_DRIVER | database | Driver de sesiones |
| CACHE_STORE | database | Driver de caché |
| QUEUE_CONNECTION | database | Driver de colas |
| MAIL_MAILER | log | Driver de correo (log en dev) |
| REDIS_CLIENT | phpredis | Cliente Redis |
| BCRYPT_ROUNDS | 12 | Rondas de hashing |

---

## Archivos de Configuración Clave

| Archivo | Descripción |
|---------|-------------|
| `config/app.php` | Configuración general de la aplicación |
| `config/auth.php` | Guards y providers de autenticación |
| `config/fortify.php` | Features de Fortify habilitadas |
| `config/mcp.php` | Configuración de Model Context Protocol |
| `config/database.php` | Conexiones de base de datos |
| `config/queue.php` | Configuración de colas |
| `config/cache.php` | Configuración de caché |
| `config/session.php` | Configuración de sesiones |
| `vite.config.js` | Configuración de Vite (plugins, entrada) |
| `phpunit.xml` | Configuración de PHPUnit |
