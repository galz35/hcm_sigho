import fitz

pdf_path = r"d:\sigho diseño\Diseño portal web empleo_Cenam 1.pdf"
doc = fitz.open(pdf_path)

output_path = r"d:\sigho diseño\pdf_text_all.txt"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(f"--- EXTRACTED TEXT FROM {pdf_path} ---\n")
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        f.write(f"\n================ PAGE {page_num + 1} ================\n")
        f.write(text.strip() + "\n")

print(f"Texto guardado en {output_path}")
