Crea un sistema web completo para la venta de autos seminuevos, replicando el estilo visual del sitio nissangomezpalacio.com.mx. A continuación están todas las especificaciones de diseño extraídas del sitio.
---
## PALETA DE COLORES
- **Rojo primario (brand/CTA):** `#C3002F` (rgb 195, 0, 47) — usado en todos los botones principales, íconos activos y acentos
- **Rojo secundario (hover/variante):** `#C93214` (rgb 201, 50, 20)
- **Negro de navbar/footer:** `#000000`
- **Gris oscuro (top bar):** `#343434`
- **Blanco de fondo principal:** `#FFFFFF`
- **Gris claro (fondo secciones alternas):** `#F8F8F8`
- **Gris medio (textos secundarios):** `#666666`
- **Gris oscuro texto:** `#333333`
- **Verde WhatsApp FAB:** `#4EC248`
---
## TIPOGRAFÍA
- **Fuente principal:** `"Nissan Brand"` — como alternativa usar `"Helvetica Neue", Arial, sans-serif`
- **Pesos usados:** 300 (light para párrafos y h2), 400 (normal), 700 (bold para precios y destacados)
- **Títulos en mayúsculas:** Todos los headings principales (h1, h2, sección títulos) van en `text-transform: uppercase`
- **Tamaño h1 hero:** ~48-56px
- **Tamaño h2 sección:** ~32-40px
- **Subtítulo small caps:** ~12-14px, letter-spacing amplio
- **Precio:** ~28-32px bold negro
---
## ESTRUCTURA DE LAYOUT
### Double Header (2 capas):
1. **Top bar (barra superior):** Fondo `#343434`, texto blanco, 40px de altura
   - Izquierda: Nombre de la agencia + teléfono en bold
   - Derecha: links de acceso rápido con íconos (Prueba de manejo, Precios especiales, Cita de servicio, Cotiza hoy, Horarios, Contáctanos)
2. **Navbar principal:** Fondo blanco con sombra sutil, 80px de altura, `position: sticky; top: 0`
   - Izquierda: Logo SVG
   - Centro/derecha: Menú horizontal con links en uppercase
   - Link activo: color `#C3002F`
   - Hover: color `#C3002F`
### Barra flotante inferior (Solicita una cotización):
- Fija al fondo de la pantalla (`position: fixed; bottom: 0`)
- Fondo `#1A1A1A`, texto "SOLICITA UNA COTIZACIÓN" blanco bold
- Formulario inline: campos Nombre, Correo, Teléfono, Select de modelo
- Botón rojo `#C3002F` con flecha "›" al final
---
## SECCIONES DE LA PÁGINA PRINCIPAL
### 1. Hero Slider (full-width)
- Ocupa 100vh
- Imagen de fondo full-bleed del auto
- Texto superpuesto izquierda: modelo en bold blanco + subtítulo en mayúsculas pequeño
- Botón CTA rojo con ícono "›": `CONOCE MÁS ›`
- Mini-navbar de thumbnails de modelos debajo del slider (fondo negro semitransparente)
- Indicadores/dots de paginación centrados
### 2. Sección "Intro / CTA Buttons"
- Fondo blanco, centrado
- H1: nombre del negocio en uppercase
- Subtítulo: descripción en letra pequeña uppercase
- 3 botones rojos inline: "CONOCE NUESTROS MODELOS | BUSCAR AUTOS SEMINUEVOS | NUESTRAS PROMOCIONES"
### 3. Sección "Nuestros Modelos" (grid de tarjetas)
- H2: "NUESTROS MODELOS" alineado izquierda
- Tabs de filtro: "MODELOS DESTACADOS | CROSSOVERS Y SUVS | AUTOS | PICK-UPS | TODOS"
  - Tab activo: underline rojo de 3px
  - Tabs inactivos: texto gris
- Grid horizontal con scroll/carousel (5 items visibles)
- **Tarjeta de modelo:**
  - Fondo blanco
  - Imagen del auto centrada (sin fondo)
  - Nombre modelo: uppercase bold negro
  - Texto "PRECIO ESPECIAL DESDE" en gris pequeño
  - Precio: grande bold negro `$000,000*`
  - Texto "IVA INCLUIDO" gris pequeño
  - Separador `<hr>` gris
  - Link "VER DETALLES ›" en rojo
### 4. Sección "Explora Autos Seminuevos" (fondo #F8F8F8)
- H2: "EXPLORA NUESTROS AUTOS SEMINUEVOS" centrado uppercase
- Grid 4 columnas (responsive: 2 cols en tablet, 1 en móvil)
- **Tarjeta de Seminuevo:**
  - Imagen cuadrada/rectangular del auto (aspect-ratio 4:3)
  - Año + Marca + Modelo en bold uppercase: "2019 NISSAN FRONTIER"
  - Precio grande bold: `$380,000`
  - Kilometraje | Combustible: `105,442 km | Gasolina` — texto gris
  - Botón rojo full-width: "OBTENER COTIZACIÓN"
  - Link texto: "VER DETALLES ›" en rojo
- Link al final: "VER TODO EL INVENTARIO DE SEMINUEVOS ›" centrado, en rojo
### 5. Sección Quick Actions (4 iconos)
- Fondo blanco, 4 columnas con borde gris claro
- Cada item: ícono rojo SVG arriba + texto bold centrado
- Items: "Agenda una prueba de manejo | Solicita una cotización | Agenda una cita de servicio | Cotiza tus refacciones y accesorios"
### 6. Sección Promociones (fondo negro)
- Texto blanco
- Grid 2 columnas: texto izquierda + imagen derecha
- Título H2 blanco uppercase
- Párrafo descripción blanco ligero
- Botón rojo: "VER TODAS LAS PROMOCIONES ›"
- Slider/carousel con dots rojos abajo
### 7. Footer (fondo negro completo)
- **Columna 1:** Nombre agencia bold + dirección + teléfonos por departamento + íconos sociales
- **Columna 2:** "PROMOCIONES Y SERVICIOS" + links en blanco
- **Columna 3:** "CONTÁCTANOS" + links en blanco
- **Sub-footer:** App stores badges + copyright + links legales
- Texto color `rgba(255,255,255,0.8)` para links normales
---
## ESTILOS DE COMPONENTES REUTILIZABLES
### Botón Primario Rojo:
```css
.btn-primary {
  background: #C3002F;
  color: white;
  padding: 14px 28px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #9e0026; }
```
### Botón con flecha:
- Incluir `›` o `▸` al final del texto
- Variante outline: fondo transparente, borde blanco 1px (para usar en fondos oscuros)
### Link tipo "VER DETALLES ›":
```css
.link-arrow {
  color: #C3002F;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
}
```
### Tarjeta con hover:
```css
.card {
  background: white;
  border: 1px solid #EEEEEE;
  transition: box-shadow 0.3s;
}
.card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
```
### Tabs de filtro:
```css
.tab-active {
  color: #000;
  font-weight: 700;
  border-bottom: 3px solid #C3002F;
}
.tab-inactive { color: #999; font-weight: 400; }
```
---
## PÁGINAS DEL SISTEMA
Crea estas páginas/vistas:
1. **Home (`/`)** — Estructura completa descrita arriba
2. **Inventario de Seminuevos (`/seminuevos`)** — Grid con filtros laterales:
   - Sidebar: filtros por Marca, Modelo, Año, Precio (range slider), Kilometraje, Combustible, Transmisión
   - Grid principal: tarjetas de autos
   - Ordenar por: precio, año, km
3. **Detalle de Seminuevo (`/seminuevos/:id`)** — Galería de fotos, ficha técnica, botón cotización, mapa de la agencia
4. **Página de Cotización / Contacto (`/cotizacion`)** — Formulario: nombre, correo, teléfono, modelo de interés, mensaje
5. **Admin / Dashboard (`/admin`)** — CRUD de inventario de seminuevos (subir fotos, precio, km, año, etc.)
---
## STACK TECNOLÓGICO SUGERIDO
- **Frontend:** React + Vite + TailwindCSS (configurar con los colores de la paleta arriba)
- **O bien:** Next.js con App Router
- **Backend:** Node.js + Express o Next.js API Routes
- **DB:** PostgreSQL o SQLite (desarrollo)
- **Imágenes:** Almacenamiento local o Cloudinary
---
## RESPONSIVE
- Mobile: menú hamburguesa, tarjetas 1 columna, barra cotización colapsada
- Tablet: tarjetas 2 columnas
- Desktop: tarjetas 4-5 columnas, sidebar visible
---
## NOTAS ADICIONALES
- El FAB de WhatsApp va fijo abajo-izquierda, círculo verde `#4EC248`
- Usar íconos de Heroicons o Lucide React para los quick actions
- El navbar se vuelve pegajoso al hacer scroll (sticky)
- Carousel/slider del hero puede implementarse con Swiper.js o Embla Carousel
- Todas las fuentes en sistema fallback si "Nissan Brand" no está disponible