Actúa como un **desarrollador web senior full-stack** especializado en aplicaciones modernas enfocadas en conversión y experiencia de usuario.

Debes diseñar y desarrollar un **sitio web profesional para una agencia de autos seminuevos**, optimizado para mostrar inventario de vehículos y generar contactos mediante WhatsApp.

## Objetivo del sitio

El objetivo principal del sitio es **mostrar los autos disponibles y convertir visitantes en prospectos**, facilitando que los usuarios contacten rápidamente a la agencia.

El sitio debe ser:

* Rápido
* Optimizado para SEO
* 100% responsive
* Fácil de actualizar con nuevos autos
* Optimizado para conversión (contactos)

## Funcionalidades principales

### 1. Página de inicio

Debe incluir:

* Hero con imagen de autos y llamada a la acción
* Buscador de vehículos (marca, modelo, precio)
* Autos destacados
* Beneficios de comprar con la agencia
* Testimonios de clientes
* Ubicación del negocio con Google Maps
* Botón flotante de WhatsApp

### 2. Inventario de vehículos

Una página tipo catálogo donde se muestren los autos disponibles.

Debe incluir:

* Filtros por:

  * marca
  * precio
  * año
  * transmisión
  * tipo de combustible
* Ordenar por precio o año
* Tarjetas de vehículo con:

  * foto
  * marca y modelo
  * año
  * precio
  * kilometraje
  * botón “Ver detalles”

### 3. Página de detalle del vehículo

Cada vehículo debe tener su propia página con:

* Galería de imágenes
* Precio
* Año
* Kilometraje
* Transmisión
* Combustible
* Descripción
* Botón de contacto por WhatsApp con mensaje prellenado
* Formulario de contacto
* Autos relacionados

### 4. Panel de administración

Crear un panel sencillo para que el dueño pueda:

* Agregar autos
* Editar autos
* Marcar autos como vendidos
* Subir fotos
* Eliminar autos
* Gestionar autos destacados

Debe ser fácil de usar para usuarios no técnicos.

### 5. Página de contacto

Debe incluir:

* Formulario de contacto
* Teléfono
* WhatsApp
* Dirección
* Mapa de Google Maps

### 6. Optimización para conversiones

Agregar:

* Botón flotante de WhatsApp
* Botones de contacto en cada auto
* CTA claros
* Diseño enfocado en generar confianza

#Base de datos:

* PostgreSQL o MongoDB

Otros requisitos:

* SEO básico
* Sitemap
* Optimización de imágenes
* Carga rápida
* Seguridad básica
* Estructura modular del código

## Experiencia de usuario

El diseño debe transmitir:

* Confianza
* Profesionalismo
* Facilidad para encontrar autos
* Facilidad para contactar

El flujo ideal del usuario es:

1. Usuario entra al sitio
2. Busca un auto
3. Ve detalles
4. Presiona WhatsApp o envía formulario

---

## Bitácora de desarrollo

### Sesión 1 — 2026-03-09

**Estado: Estructura base completada ✅**

#### Stack decidido
- **Backend:** Laravel (PHP) — ya existía scaffold en el proyecto
- **Base de datos:** SQLite (desarrollo) — se descartó PostgreSQL/MongoDB por simplicidad inicial
- **Frontend:** Blade templates + TailwindCSS v4
- **Build:** Vite + laravel-vite-plugin

#### Lo que se implementó

**Base de datos**
- `vehicles` — marca, modelo, año, precio, kilometraje, combustible, transmisión, color, descripción, featured, status (available/sold), images (JSON)
- `contacts` — nombre, email, teléfono, vehicle_id (FK nullable), mensaje
- Seeder con 12 vehículos de muestra (Nissan, Toyota, Honda, Chevrolet, Ford, VW; años 2018-2023; precios $180k-$450k; 6 marcados como destacados)

**Modelos**
- `Vehicle.php` — fillable, images cast a array, scopes `featured()` / `available()`, accessor `first_image`
- `Contact.php` — fillable, relación belongsTo Vehicle

**Controladores**
- `HomeController` — carga hasta 6 vehículos destacados disponibles
- `VehicleController` — filtros (marca, año, precio, combustible, transmisión), ordenamiento, paginación (12/página), detalle con vehículos relacionados
- `ContactController` — muestra formulario y guarda contacto validado
- `Admin/AuthController` — login/logout por sesión (contraseña: `admin123`)
- `Admin/DashboardController` — estadísticas + contactos recientes
- `Admin/VehicleController` — CRUD completo con subida de imágenes via Storage facade, toggleFeatured, toggleStatus

**Middleware & Rutas**
- `AdminAuth` middleware registrado como alias `admin.auth`
- Rutas públicas: `/`, `/seminuevos`, `/seminuevos/{id}`, `/cotizacion`
- Rutas admin protegidas: `/admin`, `/admin/vehiculos` (resource)

**Vistas (10 Blade templates)**
- `layouts/app.blade.php` — doble header (topbar #343434 + navbar sticky blanco), menú hamburguesa mobile, footer 3 columnas, WhatsApp FAB verde fijo
- `home.blade.php` — hero full-screen, barra de búsqueda rápida, grid de destacados, 4 beneficios, 3 testimonios, embed Google Maps, CTA final
- `vehicles/index.blade.php` — sidebar de filtros, sort bar, grid paginado, estado vacío
- `vehicles/show.blade.php` — galería con thumbnails (JS), ficha técnica, botón WhatsApp con mensaje pre-llenado, formulario contacto, relacionados
- `contact.blade.php` — info de contacto, formulario, mapa
- `admin/login.blade.php`, `admin/layout.blade.php`, `admin/dashboard.blade.php`
- `admin/vehicles/index.blade.php`, `create.blade.php`, `edit.blade.php`

**Assets**
- `app.css` — TailwindCSS v4 con `@theme` (colores de marca), clases utilitarias custom
- `app.js` — toggle menú mobile, galería de imágenes, hero slider, WhatsApp: `526141234567`

#### Pendiente / Próxima sesión
- ~~Análisis de UI~~ ✅
- ~~Optimización de imágenes reales~~ ✅
- SEO: meta tags dinámicos por vehículo, sitemap.xml
- Cambiar contraseña admin a variable de entorno (.env)
- Considerar migración a PostgreSQL para producción

---

### Sesión 2 — 2026-03-09

**Estado: Migración a Inertia/React + diseño Editorial Oscuro completado ✅**

#### Cambios de stack
- **Frontend:** migrado de Blade templates a **Inertia.js v2 + React 18**
- **CSS:** Tailwind CSS v4 con `@theme` custom tokens
- **Build:** Vite v7 con `@vitejs/plugin-react` — JSX solo en `.jsx`/`.tsx`

#### Diseño — Sistema "Editorial Oscuro"
- Paleta: `#0c0c0c` fondo, `#141414` superficie, `#C3002F` acento rojo, `#f0f0f0` texto
- Tipografía: **Bebas Neue** (display) + **DM Sans** (cuerpo)
- Navbar transparente sobre hero, opaca al hacer scroll (`scrolled` state)
- Footer 3 columnas con redes sociales, links y datos de contacto
- WhatsApp FAB con anillo pulsante (`fabPulse` keyframe)
- Barra inferior de cotización rápida (aparece tras 600px de scroll, dismissable por sesión)

#### Animaciones implementadas (`app.css`)
- Hero entrance: `heroFadeUp`, `heroFadeIn`, `heroSlideRight` → clases `.hero-a1` a `.hero-a6`
- Scroll reveal: `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` + `.visible` con `cubic-bezier(0.16,1,0.3,1)`
- Delays: `.reveal-delay-1` a `.reveal-delay-5` (0.08s – 0.40s)
- Card shine: `.card-shine` — sweep de brillo en hover vía `::after`
- Marquee: `@keyframes marquee` + `.marquee-track` — ticker de marcas infinito
- Skeleton: `@keyframes shimmer` + `.img-skeleton` — placeholder animado de carga
- Line grow: `@keyframes lineGrow` + `.line-grow` — barra roja con entrada animada
- Stat counter: `.stat-number` — estilo Bebas Neue para contadores

#### Hooks creados
- `resources/js/hooks/useScrollReveal.jsx` — `IntersectionObserver` que añade clase `.visible`; componente `<ScrollReveal direction="up|left|right|scale" delay={0-5}>`
- `resources/js/hooks/useCountUp.js` — contador animado con ease-out cúbico vía `requestAnimationFrame`, se activa al entrar al viewport

#### Páginas públicas
- **`Home.jsx`** — Hero slider con 3 slides sincronizados (estado en padre), `BrandTicker` marquee, `StatCounter` con animación, `VehicleCard` con skeleton, sección "¿Por qué elegirnos?", testimonios, mapa Google, CTA final, barra de búsqueda rápida
- **`Vehicles/Index.jsx`** — Header cinematográfico con imagen de fondo, `CatalogCard` con skeleton + `card-shine` + `ScrollReveal`, sidebar de filtros dark, paginación dark
- **`Vehicles/Show.jsx`** — Galería con navegación por teclado (←→), botones prev/next, dots de posición, fade animado al cambiar imagen (`heroFadeIn`), ficha de especificaciones, formulario de contacto, vehículos relacionados
- **`Contact.jsx`** — Header cinematográfico con imagen de fondo, info de contacto con iconos, formulario, mapa filtrado

#### Panel admin (dark theme)
- **`AdminLayout.jsx`** — sidebar `#111111`, topbar dark, flash messages dark
- **`Admin/Login.jsx`** — layout full dark con barra roja decorativa
- **`Admin/Dashboard.jsx`** — stats con Bebas Neue + borde de color, tabla de contactos dark
- **`Admin/Vehicles/Index.jsx`** — tabla dark con badges, paginación dark
- **`Admin/Vehicles/Create.jsx`** y **`Edit.jsx`** — paneles seccionales `#141414`, zona de upload con borde punteado

#### Modelo `Vehicle.php`
- Añadido `protected $appends = ['first_image']` — garantiza que el accessor se incluya en la serialización JSON a Inertia/React

#### Imágenes
- Seeder actualizado con URLs reales de **Unsplash CDN** y **Pexels** para los 12 vehículos
- URLs verificadas con curl (HTTP 200) antes de usar
- Vehículos con imágenes reales: Frontier (Pexels pickup), Corolla, CR-V, Equinox, Mustang, Tiguan, Sentra, RAV4, Civic, Traverse, Ranger (Pexels pickup), Jetta
- Fix: `useRef` + `useEffect` en cards para detectar imágenes ya cacheadas (evita `opacity: 0` permanente)

#### Bugs corregidos
- Hero slider desincronizado — estado `heroSlide` levantado al padre `Home`, eliminado `setInterval` duplicado en `HeroSliderDots`
- Badge DESTACADO aparecía en todos los vehículos — corregido con `{vehicle.featured && ...}`
- `useScrollReveal.jsx` con extensión `.js` causaba error 500 en Vite — renombrado y todos los imports actualizados a extensión explícita
- `first_image` no llegaba a React — faltaba `$appends` en el modelo
- Imágenes con URL 404 (Unsplash) reemplazadas por URLs funcionales

#### Pendiente / Próxima sesión
- Subir imágenes reales desde el panel admin
- SEO: meta tags dinámicos por vehículo, sitemap.xml
- Cambiar contraseña admin a variable de entorno (`.env`)
- Considerar migración a PostgreSQL para producción
