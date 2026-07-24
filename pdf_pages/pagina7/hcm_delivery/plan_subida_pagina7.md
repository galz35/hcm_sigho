# Plan de Subida - Nuestra Esencia (Página 7)

Sigue estos pasos detallados para implementar el diseño en Oracle Cloud HCM Recruiting sin conflictos.

## 1. Importar el CSS desde el CDN de GitHub

Para evitar la sobrecarga y el congelamiento del editor de Oracle, el CSS se ha subido a GitHub y se consume a través de jsDelivr.

1. En el editor de Oracle HCM, ve a la pestaña **Theme** (Tema) en el panel izquierdo.
2. Abre la sección **Custom CSS**.
3. Añade la siguiente línea al inicio o al final del editor de CSS personalizado (asegúrate de que no haya comentarios sueltos):

```css
@import url('https://cdn.jsdelivr.net/gh/galz35/hcm_sigho@main/pdf_pages/pagina7/hcm_delivery/nuestra_esencia_styles.css');
```

4. Haz clic en **Save** (Guardar).

---

## 2. Implementar el HTML en Oracle Recruiting Cloud

Puedes implementar esta página usando dos opciones según tu preferencia en el constructor visual:

### Opción A: Un solo bloque HTML (Recomendado)
1. Abre el editor de la página "Nuestra Esencia".
2. Agrega una fila a ancho completo y arrastra el componente **HTML** a la fila.
3. Edita el bloque HTML y pega el contenido completo de:
   [nuestra_esencia_template.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagina7/hcm_delivery/nuestra_esencia_template.html)
4. Haz clic en **Done** (Listo) y luego en **Save** (Guardar).

### Opción B: Bloques HTML Divididos (Estructura Modular)
Si prefieres tener bloques de edición separados en Oracle:
1. **Hero Banner**: Crea un bloque HTML y pega el contenido de [seccion1_hero.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagina7/hcm_delivery/nuestra_esencia_divided/seccion1_hero.html).
2. **Características / Grid**: Crea un segundo bloque HTML justo debajo y pega el contenido de [seccion2_features.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagina7/hcm_delivery/nuestra_esencia_divided/seccion2_features.html).
3. **Franja Roja de Información**: Crea un tercer bloque HTML y pega el contenido de [seccion3_red_divider.html](file:///D:/sigho%20dise%C3%B1o/pdf_pages/pagina7/hcm_delivery/nuestra_esencia_divided/seccion3_red_divider.html).
