"""
Generates SAMPLE images for every empty media slot, so the site can be
previewed with pictures in place before the real assets exist.

    python scripts/make-sample-media.py

Output goes to public/media/_sample/, mirroring the real folder names. Every
image carries a visible "SAMPLE" badge. The site only uses them when sample
media is switched on (see src/lib/media.ts), and a real file in public/media
always wins over its sample.
"""

import hashlib
import os
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "media", "_sample")

NAVY = (9, 6, 26)
NAVY_2 = (30, 24, 69)
MINT = (0, 245, 160)
CYAN = (0, 210, 255)
PURPLE = (138, 43, 226)
PAPER = (248, 249, 252)
WHITE = (255, 255, 255)
ACCENTS = [MINT, CYAN, PURPLE]


def font(size, bold=True):
    for name in (["segoeuib.ttf", "arialbd.ttf"] if bold else ["segoeui.ttf", "arial.ttf"]):
        path = os.path.join(os.environ.get("WINDIR", "C:/Windows"), "Fonts", name)
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default(size)


def rng_for(name):
    return random.Random(int(hashlib.sha1(name.encode()).hexdigest()[:8], 16))


def mix(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def background(w, h, top, bottom, glow, rng):
    img = Image.new("RGB", (w, h), top)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        draw.line([(0, y), (w, y)], fill=mix(top, bottom, y / h))
    # Two soft colour glows, blurred, so no two images look the same.
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    for colour in glow:
        cx, cy = rng.randint(0, w), rng.randint(0, h)
        r = rng.randint(h // 2, h)
        ld.ellipse([cx - r, cy - r, cx + r, cy + r], fill=colour + (70,))
    layer = layer.filter(ImageFilter.GaussianBlur(h // 5))
    img.paste(layer, (0, 0), layer)
    return img


def badge(img, title, subtitle, dark):
    """The label that makes it impossible to mistake this for a real asset."""
    w, h = img.size
    draw = ImageDraw.Draw(img, "RGBA")
    s = h / 900
    ink = WHITE if dark else NAVY
    f_tag, f_title, f_sub = font(round(22 * s)), font(round(54 * s)), font(round(26 * s), bold=False)
    pad = round(56 * s)
    tag = "SAMPLE IMAGE"
    tw = draw.textlength(tag, font=f_tag)
    # Centred, because slots crop to the middle and a corner badge gets cut off.
    bw = tw + round(36 * s)
    bx = (w - bw) / 2
    draw.rounded_rectangle(
        [bx, pad, bx + bw, pad + round(46 * s)],
        radius=round(23 * s),
        fill=MINT + (255,),
    )
    draw.text((bx + round(18 * s), pad + round(8 * s)), tag, font=f_tag, fill=NAVY)
    draw.text((pad, h - pad - round(110 * s)), title, font=f_title, fill=ink)
    draw.text((pad, h - pad - round(40 * s)), subtitle, font=f_sub, fill=ink + (190,))


def card(draw, box, fill, radius, outline=None):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline)


def dashboard(img, rng, accent):
    """A browser window with stat tiles and a bar chart."""
    w, h = img.size
    draw = ImageDraw.Draw(img, "RGBA")
    x0, y0, x1, y1 = round(w * 0.36), round(h * 0.14), round(w * 0.95), round(h * 0.80)
    card(draw, [x0, y0, x1, y1], WHITE + (245,), 28)
    for i, colour in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        draw.ellipse([x0 + 26 + i * 30, y0 + 24, x0 + 44 + i * 30, y0 + 42], fill=colour)
    card(draw, [x0 + 130, y0 + 20, x1 - 30, y0 + 46], (236, 238, 245), 13)
    # Sidebar
    card(draw, [x0 + 24, y0 + 72, x0 + 84, y1 - 24], (244, 245, 250), 16)
    for i in range(5):
        fill = NAVY if i == 0 else (214, 217, 228)
        card(draw, [x0 + 38, y0 + 92 + i * 52, x0 + 70, y0 + 124 + i * 52], fill, 9)
    # Stat tiles
    gx = x0 + 110
    tile_w = (x1 - 30 - gx - 40) // 3
    for i in range(3):
        tx = gx + i * (tile_w + 20)
        card(draw, [tx, y0 + 76, tx + tile_w, y0 + 190], (247, 248, 252), 16, (228, 230, 238))
        card(draw, [tx + 18, y0 + 96, tx + 18 + tile_w // 2, y0 + 110], (214, 217, 228), 7)
        card(draw, [tx + 18, y0 + 128, tx + 18 + rng.randint(tile_w // 3, tile_w - 50), y0 + 162], NAVY, 8)
    # Chart
    cy0, cy1 = y0 + 214, y1 - 30
    card(draw, [gx, cy0, x1 - 30, cy1], (247, 248, 252), 16, (228, 230, 238))
    bars = 12
    bw = (x1 - 30 - gx - 60) // bars
    for i in range(bars):
        bh = rng.randint(30, cy1 - cy0 - 60)
        bx = gx + 30 + i * bw
        colour = mix(accent, NAVY, 0.15 if i % 3 else 0.55)
        card(draw, [bx, cy1 - 24 - bh, bx + bw - 12, cy1 - 24], colour, 8)


def phone(img, rng, accent):
    """A phone showing a balance card, a sparkline and a list."""
    w, h = img.size
    draw = ImageDraw.Draw(img, "RGBA")
    pw, ph = round(h * 0.42), round(h * 0.80)
    x0, y0 = round(w * 0.62), round(h * 0.08)
    card(draw, [x0, y0, x0 + pw, y0 + ph], (14, 10, 36), 54, (60, 54, 100))
    card(draw, [x0 + pw // 2 - 50, y0 + 18, x0 + pw // 2 + 50, y0 + 44], (0, 0, 0), 13)
    ix0, ix1 = x0 + 24, x0 + pw - 24
    card(draw, [ix0, y0 + 70, ix1, y0 + 250], (30, 24, 69), 24)
    card(draw, [ix0 + 20, y0 + 92, ix0 + 130, y0 + 106], (120, 116, 160), 7)
    card(draw, [ix0 + 20, y0 + 122, ix0 + 230, y0 + 160], WHITE, 10)
    pts, px = [], ix0 + 20
    step = (ix1 - ix0 - 40) / 9
    level = y0 + 220
    for i in range(10):
        level = max(y0 + 180, min(y0 + 236, level + rng.randint(-22, 14)))
        pts.append((px + i * step, level))
    draw.line(pts, fill=accent, width=5, joint="curve")
    for i in range(4):
        cx = ix0 + 28 + i * ((ix1 - ix0 - 56) / 3)
        draw.ellipse([cx - 22, y0 + 276, cx + 22, y0 + 320], fill=(30, 24, 69), outline=accent, width=2)
    for i in range(4):
        ry = y0 + 348 + i * 64
        if ry + 50 > y0 + ph - 30:
            break
        card(draw, [ix0, ry, ix1, ry + 50], (24, 19, 56), 14)
        draw.ellipse([ix0 + 12, ry + 9, ix0 + 44, ry + 41], fill=mix(accent, NAVY, 0.3))
        card(draw, [ix0 + 58, ry + 18, ix0 + 58 + rng.randint(80, 150), ry + 32], (120, 116, 160), 7)
    # A second, lighter card behind for depth.
    card(draw, [round(w * 0.40), round(h * 0.26), round(w * 0.60), round(h * 0.62)], WHITE + (235,), 28)
    for i in range(4):
        y = round(h * 0.30) + i * 62
        card(draw, [round(w * 0.42), y, round(w * 0.42) + rng.randint(120, 250), y + 22], (214, 217, 228), 11)
        card(draw, [round(w * 0.42), y + 30, round(w * 0.58), y + 40], mix(accent, WHITE, 0.6), 5)


def chat(img, rng, accent):
    """An assistant conversation, for the AI pieces."""
    w, h = img.size
    draw = ImageDraw.Draw(img, "RGBA")
    x0, y0, x1, y1 = round(w * 0.42), round(h * 0.12), round(w * 0.94), round(h * 0.80)
    card(draw, [x0, y0, x1, y1], WHITE + (245,), 28)
    y = y0 + 40
    for i in range(5):
        mine = i % 2 == 1
        bw = rng.randint(round((x1 - x0) * 0.35), round((x1 - x0) * 0.62))
        bh = rng.choice([58, 84, 110])
        if y + bh > y1 - 100:
            break
        bx = x1 - 36 - bw if mine else x0 + 36
        card(draw, [bx, y, bx + bw, y + bh], NAVY if mine else (240, 242, 248), 22)
        for line in range(bh // 28):
            lw = bw - 44 - (rng.randint(0, bw // 3) if line == bh // 28 - 1 else 0)
            card(draw, [bx + 22, y + 20 + line * 26, bx + 22 + lw, y + 32 + line * 26],
                 (150, 146, 190) if mine else (200, 204, 218), 6)
        y += bh + 20
    card(draw, [x0 + 36, y1 - 78, x1 - 36, y1 - 28], (244, 245, 250), 25, (228, 230, 238))
    draw.ellipse([x1 - 84, y1 - 72, x1 - 46, y1 - 34], fill=accent)


def scene(img, rng, accent):
    """Soft abstract shapes, standing in for a photograph."""
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    for _ in range(7):
        r = rng.randint(h // 10, h // 3)
        cx, cy = rng.randint(w // 3, w), rng.randint(0, round(h * 0.75))
        colour = rng.choice([accent, WHITE, mix(accent, PURPLE, 0.5)])
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=colour + (rng.randint(40, 110),))
    for _ in range(3):
        x = rng.randint(w // 3, w - 300)
        y = rng.randint(h // 6, h // 2)
        bw, bh = rng.randint(220, 420), rng.randint(160, 300)
        draw.rounded_rectangle([x, y, x + bw, y + bh], radius=32, fill=WHITE + (60,), outline=WHITE + (150,), width=3)
    layer = layer.filter(ImageFilter.GaussianBlur(3))
    img.paste(layer, (0, 0), layer)


LAYOUTS = {"dashboard": dashboard, "phone": phone, "chat": chat, "scene": scene}

# (folder/file, title, subtitle, layout, dark background?)
IMAGES = [
    # Case study stills and wide heroes
    ("work/logistics-control-tower", "Logistics control tower", "Case study still", "dashboard", True),
    ("work/finance-ops-platform", "Finance ops platform", "Case study still", "dashboard", False),
    ("work/healthcare-ops-portal", "Healthcare ops portal", "Case study still", "dashboard", False),
    ("work/retail-inventory-ai", "Retail inventory AI", "Case study still", "chat", True),
    ("work/claims-assistant", "Claims assistant", "Case study still", "chat", False),
    ("work/retail-app-rebuild", "Retail app rebuild", "Case study still", "phone", True),
    # Practice covers
    ("solutions/ai-development", "AI-driven development", "Practice cover", "chat", True),
    ("solutions/app-development", "Mobile app development", "Practice cover", "phone", False),
    ("solutions/web-platforms", "Custom web development", "Practice cover", "dashboard", True),
    ("solutions/product-design", "UI/UX design", "Practice cover", "phone", True),
    ("solutions/mvp-prototyping", "MVP & prototyping", "Practice cover", "phone", False),
    ("solutions/cloud", "Maintenance & DevOps", "Practice cover", "dashboard", False),
    ("solutions/cms", "CMS development", "Practice cover", "dashboard", True),
    # Studio photographs
    ("studio/studio", "Studio", "Studio photograph goes here", "scene", True),
    ("studio/whiteboarding", "Whiteboarding", "Studio photograph goes here", "scene", False),
    ("studio/pods", "Pods", "Studio photograph goes here", "scene", True),
    ("studio/reviews", "Reviews", "Studio photograph goes here", "scene", False),
    ("studio/launch", "Launch", "Studio photograph goes here", "scene", True),
    # Industries
    ("industries/healthcare", "Healthcare", "Industry photograph goes here", "scene", False),
    ("industries/retail", "Retail", "Industry photograph goes here", "scene", True),
    ("industries/saas", "SaaS", "Industry photograph goes here", "scene", False),
    ("industries/education", "Education", "Industry photograph goes here", "scene", True),
]


def make(name, title, subtitle, layout, dark, size=(1600, 900)):
    rng = rng_for(name)
    accent = rng.choice(ACCENTS)
    others = [c for c in ACCENTS if c != accent]
    if dark:
        img = background(*size, NAVY, NAVY_2, [accent, rng.choice(others)], rng)
    else:
        img = background(*size, PAPER, mix(accent, WHITE, 0.82), [accent, rng.choice(others)], rng)
    LAYOUTS[layout](img, rng, accent)
    badge(img, title, subtitle, dark)
    path = os.path.join(ROOT, name + ".jpg")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "JPEG", quality=84, optimize=True)
    return path


if __name__ == "__main__":
    count = 0
    for name, title, subtitle, layout, dark in IMAGES:
        make(name, title, subtitle, layout, dark)
        count += 1
        if name.startswith("work/"):
            make(name + "-hero", title, "Case study hero", layout, dark)
            count += 1
    print(f"wrote {count} sample images to {ROOT}")
