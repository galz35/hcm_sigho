---
name: oracle_hcm_integration
description: Guidelines and utility code transformations to successfully integrate custom HTML and CSS designs into Oracle Cloud HCM Recruiting career sites without triggering security blocks.
---

# Skill: Integración Limpia en Oracle Cloud HCM Career Sites

Este skill provee instrucciones detalladas para transformar diseños HTML/CSS planos en código compatible con Oracle Recruiting Cloud (ORC) sin activar las restricciones de seguridad sobre etiquetas o palabras clave, ni sobrecargar la interfaz.

## 1. Procedimiento de Limpieza HTML
Cuando se trabaje en archivos de plantilla para HCM:
1. **Remover cualquier estructura de documento** (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`).
2. **Remover o desviar bloques** `<style>` y `<script>`.
3. **Sanitizar atributos de enlaces** (`href="archivo.html"` -> `href="#"`).
4. **Reemplazar estilos en línea** (`style="background..."`) por clases de utilidad que se agregarán en el CSS.
5. **Purgar todo comentario** que contenga nombres de tags entre `< >` (ej: no escribir `<!-- No usar <script> -->` ya que arroja falsos positivos).
6. **PROHIBIDO `<link rel="stylesheet">`:** Nunca usar esta etiqueta para cargar hojas de estilo en los bloques Custom HTML, ya que la palabra `stylesheet` contiene la subcadena `style`, la cual es bloqueada por el validador estricto de HTML de Oracle.

## 2. Procedimiento de Evasión en CSS (Theme Custom CSS)
Dado que el Custom CSS del Theme tab en Oracle HCM no acepta selectores directos de `body`/`html` y posee filtros WAF estrictos:
1. **Reemplazar `html` selector** por `:root`.
2. **Reemplazar `body` selector** por `:root > *:last-child` o por la clase de carga `.app-loading`.
3. **Quitar todo bloque de comentarios** del CSS para evitar falsos positivos de palabras reservadas.
4. **Evitar parámetros en `@import` (Bypass WAF 403):** El WAF de Oracle bloquea peticiones de guardado si los imports contienen caracteres XSS comunes (`?`, `&`, `=`, `:`), como ocurre con los URLs complejos de Google Fonts. Importar las fuentes de forma simple o gestionarlas nativamente en el Theme, y mantener solo imports de CDNs limpios (ej: Tailwind CSS en archivo directo `.min.css`).
5. **Carga remota via CDN (Solución a congelamientos):** Si el CSS consolidado supera los 10KB, el editor de Oracle HCM suele congelar el navegador al pegar el código. La solución recomendada es alojar el archivo CSS en un repositorio de GitHub público y consumirlo en el Custom CSS de Oracle mediante una única línea de importación:
   ```css
   @import url('https://cdn.jsdelivr.net/gh/USERNAME/REPO@BRANCH/PATH/TO/styles.css');
   ```
