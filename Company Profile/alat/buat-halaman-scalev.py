"""
Membuat versi SATU FILE dari website/kelas.html untuk di-upload ke Scalev
(Pages -> HTML Checkout Page -> tab Code -> Upload File).

Scalev hanya menerima satu dokumen HTML, jadi skrip ini memasukkan
gaya.css, pengaturan.js, umum.js, favicon, dan logo alat langsung ke dalam file.

Cara pakai (jalankan setiap kali website/ diubah, lalu upload ulang ke Scalev):
    python "F:/Motion Bareng/Company Profile/alat/buat-halaman-scalev.py"

Hasil:
    Company Profile/scalev/kelas-scalev.html
"""
import base64
import json
import re
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent          # folder "Company Profile"
WEB = AKAR / "website"
HASIL = AKAR / "scalev" / "kelas-scalev.html"

MIME = {".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp"}


def baca(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def data_uri(path: Path) -> str:
    isi = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{MIME.get(path.suffix.lower(), 'application/octet-stream')};base64,{isi}"


def aman_untuk_script(js: str) -> str:
    # mencegah teks "</script" di dalam kode menutup tag <script> lebih awal
    return js.replace("</script", "<\\/script")


def ganti(pola: str, pengganti: str, teks: str, nama: str) -> str:
    hasil, jumlah = re.subn(pola, lambda _m: pengganti, teks)
    if jumlah != 1:
        raise SystemExit(f"GAGAL: tag {nama} tidak ditemukan tepat satu kali di kelas.html (ketemu {jumlah}).")
    return hasil


def main() -> None:
    html = baca(WEB / "kelas.html")
    css = baca(WEB / "aset" / "css" / "gaya.css")
    pengaturan = baca(WEB / "pengaturan.js")
    umum = baca(WEB / "aset" / "js" / "umum.js")

    # logo alat (aset/gambar/logo/...) dimasukkan sebagai data URI supaya tidak perlu izin gambar eksternal
    tambahan = []
    for nama, path in re.findall(r'(\w+)\s*:\s*"(aset/gambar/logo/[^"]+)"', pengaturan):
        file_logo = WEB / path
        if file_logo.exists():
            tambahan.append(f"window.PENGATURAN.logoAlat.{nama} = {json.dumps(data_uri(file_logo))};")

    html = ganti(r'<link rel="stylesheet" href="aset/css/gaya\.css[^"]*">',
                 "<style>\n" + css + "\n</style>", html, "gaya.css")
    html = ganti(r'<script src="pengaturan\.js[^"]*"></script>',
                 "<script>\n" + aman_untuk_script(pengaturan) + "\n" + "\n".join(tambahan) + "\n</script>", html, "pengaturan.js")
    html = ganti(r'<script src="aset/js/umum\.js[^"]*"></script>',
                 "<script>\n" + aman_untuk_script(umum) + "\n</script>", html, "umum.js")
    html = ganti(r'<link rel="icon" href="favicon\.svg"[^>]*>',
                 f'<link rel="icon" href="{data_uri(WEB / "favicon.svg")}" type="image/svg+xml">', html, "favicon")

    catatan = ("<!--\n  FILE INI DIBUAT OTOMATIS oleh alat/buat-halaman-scalev.py dari website/kelas.html.\n"
               "  Jangan diedit langsung: ubah file di folder website/, lalu jalankan skripnya lagi.\n-->\n")
    html = html.replace("<!doctype html>", "<!doctype html>\n" + catatan, 1)

    HASIL.parent.mkdir(parents=True, exist_ok=True)
    HASIL.write_text(html, encoding="utf-8", newline="\n")

    ukuran = HASIL.stat().st_size / 1024
    print(f"Selesai: {HASIL}  ({ukuran:.0f} KB)")
    print("Di Scalev, tab Security, izinkan:")
    print("  style_src : https://fonts.googleapis.com")
    print("  font_src  : https://fonts.gstatic.com")
    if '"alamatWebsite": ""' in pengaturan or re.search(r'alamatWebsite:\s*""', pengaturan):
        print("Catatan: alamatWebsite di pengaturan.js masih kosong (tautan beranda & gambar karya relatif).")
    else:
        alamat = re.search(r'alamatWebsite:\s*"([^"]+)"', pengaturan)
        if alamat:
            print(f"  img_src   : {alamat.group(1)}   (kalau gambar karya dipakai)")


if __name__ == "__main__":
    main()
