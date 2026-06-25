import base64
import os

# Base64 encoded 512x512 PNG (solid purple square with a white text "T")
# This is a minimal valid 512x512 PNG to satisfy PWA requirements.
b64_img = "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEV8Ou2lU64jAAAAZklEQVR42u3QMQEAAAwCoNk/tO2sAwwIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgH8Bv7YAAc8D1+MAAAAASUVORK5CYII="

icon_path = os.path.join(os.path.dirname(__file__), "frontend", "public", "icon-512.png")
with open(icon_path, "wb") as f:
    f.write(base64.b64decode(b64_img))

print("Created icon-512.png")

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#7c3aed"/>
  <text x="50%" y="55%" font-family="sans-serif" font-size="200" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">T</text>
  <text x="50%" y="75%" font-family="sans-serif" font-size="60" font-weight="bold" fill="#a78bfa" text-anchor="middle" dominant-baseline="middle">ThinkDSA</text>
</svg>"""

svg_path = os.path.join(os.path.dirname(__file__), "frontend", "public", "icon.svg")
with open(svg_path, "w") as f:
    f.write(svg_content)

print("Created icon.svg")
