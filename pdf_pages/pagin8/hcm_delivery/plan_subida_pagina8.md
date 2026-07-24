# Plan de Subida - Claro en Honduras (Página 8)

Sigue estos pasos detallados para implementar el diseño en Oracle Cloud HCM Recruiting sin conflictos.

## 1. Importar el CSS desde el CDN de GitHub

El CSS se ha subido a tu repositorio y está disponible mediante CDN.

1. En el editor de Oracle HCM, ve a la pestaña **Theme** (Tema) en el panel izquierdo.
2. Abre la sección **Custom CSS**.
3. Añade la siguiente línea al inicio o al final del editor de CSS personalizado (asegúrate de que no haya comentarios sueltos):

```css
@import url('https://cdn.jsdelivr.net/gh/galz35/hcm_sigho@main/pdf_pages/pagin8/hcm_delivery/honduras_styles.css');
```

4. Haz clic en **Save** (Guardar).

---

## 2. Implementar el HTML en Oracle Recruiting Cloud

Puedes implementar esta página usando dos opciones según tu preferencia en el constructor visual:

### Opción A: Un solo bloque HTML (Recomendado)
1. Abre el editor de la página "Claro en tu País (Honduras)".
2. Agrega una fila a ancho completo y arrastra el componente **HTML** a la fila.
3. Edita el bloque HTML y pega el contenido completo de:
   [honduras_template.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagin8/hcm_delivery/honduras_template.html)
4. Haz clic en **Done** (Listo) y luego en **Save** (Guardar).

### Opción B: Bloques HTML Divididos (Estructura Modular)
Si prefieres tener bloques de edición separados en Oracle:
1. **Hero Banner**: [seccion1_hero.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagin8/hcm_delivery/honduras_divided/seccion1_hero.html).
2. **Programa de Pasantía**: [seccion2_pasantia.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagin8/hcm_delivery/honduras_divided/seccion2_pasantia.html).
3. **Cultura Local**: [seccion3_cultura.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagin8/hcm_delivery/honduras_divided/seccion3_cultura.html).
4. **Testimonios**: [seccion4_testimonios.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagin8/hcm_delivery/honduras_divided/seccion4_testimonios.html).
5. **Nuestra Historia (Timeline)**: [seccion5_historia.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagin8/hcm_delivery/honduras_divided/seccion5_historia.html).
6. **Call to Action**: [seccion6_cta.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagin8/hcm_delivery/honduras_divided/seccion6_cta.html).
