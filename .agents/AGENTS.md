# Reglas de Integración para Oracle Cloud HCM Career Sites

Estas reglas previenen los bloqueos de seguridad del validador de Oracle HCM en archivos HTML y CSS, así como problemas de rendimiento del editor.

## 1. Reglas para HTML Personalizado (Custom HTML)
* **Cero etiquetas restringidas**: Jamás incluir las etiquetas `<html>`, `<head>`, `<body>`, `<script>`, o `<style>` en los bloques de HTML.
* **Prohibido `<link rel="stylesheet">`**: No usar esta etiqueta para importar fuentes o CSS, ya que la subcadena `style` dentro de `stylesheet` provoca el rechazo automático del HTML con error de "elementos restringidos".
* **Cero enlaces a archivos `.html`**: No usar rutas que terminen en `.html` (ej: `contacto.html`), ya que el validador a veces lo bloquea. Reemplazarlos por rutas internas de Oracle (`#/jobs`, `#/pages/ID`) o placeholders `#`.
* **Cero estilos en línea con la palabra `style`**: Evitar los atributos de estilo en línea (`style="..."`) si el validador está muy estricto. Es mejor moverlos como clases al Custom CSS.
* **Cero comentarios con etiquetas**: No incluir comentarios explicativos que mencionen etiquetas restringidas (ej: no escribir `<!-- No usar <script> -->`), ya que el motor de Oracle busca coincidencias exactas del texto y arroja falso positivo.

## 2. Reglas para CSS Personalizado (Custom CSS / Theme)
* **Cero selectores `body` o `html`**: Oracle rechaza hojas de estilo que contengan textualmente los selectores `body` o `html`. Para darles estilos, usar equivalentes:
  * Para `html` → usar `:root`
  * Para `body` → usar `:root > *:last-child` o clases del contenedor (ej: `.app-loading`)
* **Evitar `@import` complejos con parámetros (Bypass WAF 403)**: El cortafuegos WAF de Oracle bloquea las llamadas CSS que contienen caracteres especiales en URLs de `@import` como `?`, `&`, `=`, `:`. Por tanto, evita importar URLs complejas de fuentes de Google. El import de Tailwind directo `.min.css` sí está permitido.
* **Importación externa por CDN (Bypass de congelamiento)**: Dado que el editor web de Oracle se congela si se pegan bloques grandes de CSS (>10KB), se debe alojar el archivo CSS en un repositorio de GitHub público y llamarlo con una única línea usando jsDelivr:
  ```css
  @import url('https://cdn.jsdelivr.net/gh/USUARIO/REPO@BRANCH/PATH/TO/style.css');
  ```
* **Cero comentarios explicativos**: Quitar comentarios explicativos del CSS antes de entregarlo, especialmente si contienen palabras como `style`, `html`, `body`, `head` o `link` en cualquier idioma.

## 3. Buscador Nativo y Posicionamiento
* **Superposición (Overlap)**: Para lograr que el buscador nativo flote sobre el Hero Banner como en el diseño de Figma/HTML, se debe colocar el componente de búsqueda nativo justo debajo del bloque Hero en el editor de Oracle, y aplicar un margen negativo en CSS (`margin-top: -65px !important; z-index: 40; position: relative;`).

## 4. Estilo de Comunicación del Agente
* **Explicaciones breves y directas**: Al final de cada interacción, el agente debe proporcionar una explicación o resumen de su trabajo de forma extremadamente concisa, directa y utilizando viñetas claras, sin rodeos ni explicaciones largas.
