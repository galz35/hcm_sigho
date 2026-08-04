---
name: oracle_hcm_integration
description: Guidelines and utility code transformations to successfully integrate custom HTML and CSS designs into Oracle Cloud HCM Recruiting career sites without triggering security blocks.
---

# Skill: Integración Limpia en Oracle Cloud HCM Career Sites

Este skill provee instrucciones detalladas y mejores prácticas aprendidas al transformar diseños web completos en bloques HTML/CSS modulares totalmente compatibles con Oracle Recruiting Cloud (ORC).

---

## 1. Reglas de Limpieza HTML para Oracle Cloud HCM
Cuando se trabajen bloques de contenido HTML en Oracle HCM:
1. **Zero etiquetas de documento**: No incluir jamás `<html>`, `<head>`, `<body>`, `<script>`, o `<style>`.
2. **PROHIBIDO `<link rel="stylesheet">`**: La subcadena `style` dentro de `stylesheet` provoca el rechazo automático del validador estricto de HTML de Oracle ("elementos restringidos").
3. **Zero enlaces a `.html`**: Reemplazar rutas como `contacto.html` por rutas de navegación de Oracle (`#/jobs`, `#/pages/ID`) o placeholders `#`.
4. **Zero comentarios con etiquetas**: No escribir explicaciones que mencionen nombres de tags (ej: `<!-- No usar <script> -->`), ya que el validador busca coincidencias exactas del texto y arroja falso positivo.

---

## 2. Estrategia de CSS Maestro Unificado (`master_bundle.css`)
Para evitar sobrecargar el editor de Oracle HCM y resolver el problema de congelamiento del navegador:
1. **Un solo `@import` en Custom CSS**: Consolidar todas las hojas de estilo modulares (`base`, `header`, `hero`, `buscador`, `highlights`, `benefits`, `video`, `process`, `cta`, `footer`, `font-claro`) en un archivo maestro público en GitHub (`master_bundle.css`).
2. **Purga de Caché CDN Instantánea**: Usar la URL de jsDelivr incluyendo el **commit hash exacto** para que Oracle cargue los cambios de inmediato sin esperar la caché global del CDN (5-10 minutos):
   ```css
   @import url('https://cdn.jsdelivr.net/gh/USUARIO/REPO@COMMIT_HASH/PATH/TO/master_bundle.css');
   ```

---

## 3. Ancho de Pantalla Edge-to-Edge (`100vw` Full Bleed)
Para hacer que secciones personalizadas (Hero Banner, Strip de Alfombra Roja, Sección de Video, Proceso, CTA Banner y Footer) abarquen el 100% del ancho del navegador rompiendo los márgenes del contenedor nativo de Oracle HCM:
```html
<section style="width: 100vw !important; position: relative !important; left: 50% !important; right: auto !important; transform: translateX(-50%) !important; overflow: hidden !important;">
    <div style="max-width: 1152px !important; margin: 0 auto !important; padding: 0 1.5rem !important; box-sizing: border-box !important;">
        <!-- Contenido centrado -->
    </div>
</section>
```

---

## 4. Menú y Encabezado Superior Sticky / Flotante
Para lograr que el menú de navegación superior nativo de Oracle permanezca fijo en la parte superior del navegador con un efecto translúcido al hacer scroll hacia abajo (igual al diseño de `sigho-main`):
```css
.app__top .app-header,
:root [dir] .app-header-horizontal,
.app-header-horizontal {
    position: sticky !important;
    top: 0 !important;
    z-index: 9999 !important;
    background: rgba(255, 255, 255, 0.94) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
}
```

---

## 5. Ocultar Componentes Nativos Molestos (`ul.categories-list`)
Cuando el buscador nativo de Oracle inyecta automáticamente el listado de categorías/facetas debajo de los inputs (ej: *"Todos los puestos (0)"*):
```css
ul.categories-list,
.categories-list,
li.categories-list__group,
a.categories-list__button,
.categories-list__title,
.categories-list__counter,
a[data-qa="searchCategoriesShowAllJobsLink"] {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    max-height: 0 !important;
    opacity: 0 !important;
    pointer-events: none !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
}
```

---

## 6. Medalla Cuadrada de Beneficios e Íconos de Marca
- **Insignia Cuadrada**: La medalla de beneficios usa `.why-photo .badge-icon` con `border-radius: 0px`, `width: 45px`, `height: 45px`, `background: #c6272b` en posición absoluta `top: -10px`, `left: 16px`.
- **Ícono de marca**: Se incrusta la clase `<i class="ico-claro-logo"></i>` importando `@import url('.../sigho-main/assets/css/font-claro.css');`.

---

## 7. Renderizado Inmediato con Estilos Inline de Respaldo
Para evitar que bloques principales aparezcan sin formato o sin imagen durante retrasos de red o caché CDN, incrustar atributos `style="..."` inline esenciales con `!important` para:
- Imágenes de fondo de alta resolución (`bg1.jpg`, `bg2.jpg`, `bg02.jpg`).
- Capas de gradientes transparentes (`rgba(198, 39, 43, 0.35)`).
- Botones de acción principales (Pill blanco y Pill transparente con bordes).
