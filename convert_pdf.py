import fitz  # PyMuPDF
import os

pdf_path = r"d:\sigho diseño\Diseño portal web empleo_Cenam 1.pdf"
output_dir = r"d:\sigho diseño\pdf_pages"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print(f"Abriendo PDF: {pdf_path}")
doc = fitz.open(pdf_path)
print(f"Total de páginas: {len(doc)}")

for page_num in range(len(doc)):
    page = doc[page_num]
    zoom = 2.0  # Incrementa la resolución
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat)
    output_path = os.path.join(output_dir, f"page_{page_num + 1}.png")
    pix.save(output_path)
    print(f"Página {page_num + 1} guardada.")

print("Conversión de PDF completada con éxito.")
