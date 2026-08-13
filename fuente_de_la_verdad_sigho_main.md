# Fuente de la Verdad: Rediseño y Migración SIGHT Main a Oracle Cloud HCM

**Fecha de Última Actualización**: 2026-08-13  
**Repositorio GitHub**: `https://github.com/galz35/hcm_sigho.git` (Rama `main`)

---

## 1. Resumen Ejecutivo del Proyecto
Este proyecto consolida el rediseño del portal de empleo de **Claro Talento (SIGHT)** migrando la plantilla maquetada en `sigho-main/` hacia la arquitectura modular compatible con el maquetador **Oracle Cloud HCM Recruiting (ORC)** sin desencadenar bloqueos de seguridad del WAF ni errores de renderizado.

---

## 2. Estado de Migración por Páginas

| Página | Estado | Ubicación Copia Aislada | Componentes Divididos |
| :--- | :---: | :--- | :--- |
| **Home (Index)** | 100% Completada | `pdf_pages/pagina1_sigho_main_copia/` | `seccion1b_hero.html`, `seccion2_strip_highlights.html`, `seccion3_benefits.html`, `seccion4_video.html`, `seccion5_process.html`, `seccion6_cta.html`, `seccion7_footer.html` |
| **Nuestra Esencia** | 100% Completada | `pdf_pages/nuestra_esencia_sigho_main_copia/` | `seccion1_hero.html`, `seccion_unificada_esencia.html` (Quad grid + Strip sin espacios), `seccion4_footer.html` |
| **Claro en tu País** | 100% Completada | `pdf_pages/claro_pais_sigho_main_copia/` | `seccion1_hero.html`, `seccion2_pasantia_pais.html`, `seccion3_cultura_video.html`, `seccion4_testimonios.html`, `seccion5_historia_timeline.html`, `seccion6_cta.html`, `seccion7_footer.html` |
| **Apoyo al Candidato** | Pendiente | `sigho-main/apoyo-candidato.html` | Por dividir en su carpeta copia correspondiente |
| **Vacantes** | Pendiente | `sigho-main/vacantes.html` | Por dividir en su carpeta copia correspondiente |

---

## 3. Configuración del CSS Maestro Unificado (`master_bundle.css`)

Para evitar bloqueos WAF (403), sobrecargar el editor de Oracle HCM o pegar múltiples líneas de importación, **toda la hoja de estilos global está empaquetada en un solo archivo maestro**.

### Única línea requerida en Oracle HCM (Theme Custom CSS):
```css
@import url('https://cdn.jsdelivr.net/gh/galz35/hcm_sigho@fa0c9a7/pdf_pages/pagina1_sigho_main_copia/css/master_bundle.css');
```

> **Nota**: `master_bundle.css` empaqueta e importa internamente los módulos de `base`, `header`, `hero`, `buscador`, `highlights`, `benefits`, `video`, `process`, `cta`, `footer`, `font-claro`, `nuestra_esencia.css`, `claro_pais.css` y los estilos nativos para el **Login/Gestionar Perfil de Oracle HCM** (`cs-sign-in`).

---

## 4. Reglas Técnicas y Mejores Prácticas Aprendidas

### A. Anulación de Envoltorios Nativos de Oracle (`.cc-column` Reset)
Oracle HCM envuelve cada Custom HTML en contenedores `.cc-column` y `.cc-element--custom-html` que agregan bordes blancos y franjas grises laterales. Se neutralizan globalmente en el paquete CSS con:
```css
.cc-column,
.cc-column--default,
.cc-column__content,
.cc-element,
.cc-element--custom-html,
div[class*="cc-column"],
div[class*="cc-element"] {
    background-color: transparent !important;
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    max-width: 100% !important;
    width: 100% !important;
    overflow: visible !important;
}
```

### B. Ancho Completo de Pantalla Edge-to-Edge (`100vw` Full Bleed)
Para hacer que secciones individuales abarquen de borde a borde a todo lo ancho de la pantalla:
```html
<section style="width: 100vw !important; min-width: 100vw !important; position: relative !important; left: 50% !important; right: auto !important; transform: translateX(-50%) !important; overflow: hidden !important;">
    <div style="max-width: 1152px !important; margin: 0 auto !important; padding: 0 1.5rem !important;">
        <!-- Contenido centrado a 1152px -->
    </div>
</section>
```

### C. Menú y Encabezado Superior Sticky / Flotante
Fijación del encabezado nativo de Oracle en la parte superior con translucidez difuminada (`backdrop-filter`):
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

### D. Footer Verbatim con Redes e Íconos a la Izquierda
El pie de página mantiene la estructura exacta de `sigho-main/index.html` con los logos de Claro Rojo, América Móvil Blanco e íconos de redes sociales (`ico-facebook-s`, `ico-x-s`, `ico-instagram-s`, `ico-whatsapp-s`) anidados a la izquierda dentro de `.logo.logo-mini`.

### E. Restricciones del Validador de Seguridad de Oracle HCM
- **Cero etiquetas prohibidas**: Prohibido incluir `<html>`, `<head>`, `<body>`, `<script>`, `<style>`, o `<link rel="stylesheet">`.
- **Cero atributos de eventos JS inline**: Prohibido el uso de `onchange="..."`, `onclick="..."` o `onmouseover="..."`.
- **Cero comentarios con nombres de etiquetas**: No incluir comentarios explicativos que contengan caracteres `< >`.

---

## 5. Instrucciones para la Siguiente Conversación
1. Cargar este archivo (`fuente_de_la_verdad_sigho_main.md`) al iniciar la nueva interacción.
2. Iniciar la migración de la página **Apoyo al Candidato (`apoyo-candidato.html`)** creando su carpeta copia independiente `pdf_pages/apoyo_candidato_sigho_main_copia/`.
3. Mantener la única línea de importación máster para el CSS global.
