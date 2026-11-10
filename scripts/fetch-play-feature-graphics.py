"""
Builds real store graphics for our own published apps from their Google
Play screenshots, and writes them to public/media/work/{slug}.jpg and
{slug}-hero.jpg. Real files automatically replace the stamped SAMPLE
placeholders everywhere (see public/media/README.txt).

The listings have no uploaded feature graphics, so each card is composed
here from the app's real Play Store screenshots: a light paper panel
matching the site cards, with one landscape screenshot or up to three
portrait screenshots, rounded corners and a soft shadow.

Run: python scripts/fetch-play-feature-graphics.py
"""
import io
import re
import time
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "media" / "work"
OUT.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}

CANVAS_W, CANVAS_H = 1600, 900
BORDER = (227, 230, 234)


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as res:
        return res.read()


def background() -> Image.Image:
    """Paper-to-mint vertical gradient with a soft brand glow, matching the site."""
    top = (248, 249, 251)
    bottom = (230, 248, 240)
    grad = Image.new("RGB", (1, CANVAS_H))
    for y in range(CANVAS_H):
        t = y / (CANVAS_H - 1)
        grad.putpixel((0, y), tuple(round(a + (b - a) * t) for a, b in zip(top, bottom)))
    canvas = grad.resize((CANVAS_W, CANVAS_H)).convert("RGBA")

    glow = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    d.ellipse([CANVAS_W - 620, -260, CANVAS_W + 180, 340], fill=(0, 245, 160, 26))
    d.ellipse([-300, CANVAS_H - 420, 380, CANVAS_H + 160], fill=(0, 210, 255, 22))
    return Image.alpha_composite(canvas, glow.filter(ImageFilter.GaussianBlur(90)))


def rounded(img: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, img.size[0] - 1, img.size[1] - 1], radius=radius, fill=255
    )
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def framed(shot: Image.Image, radius: int) -> Image.Image:
    """Screenshot with border, rounded corners and a soft shadow, on transparency."""
    pad = 90  # room for the shadow
    tile = Image.new("RGBA", (shot.width + pad * 2, shot.height + pad * 2), (0, 0, 0, 0))
    shadow = Image.new("RGBA", tile.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        [pad, pad + 8, pad + shot.width, pad + 8 + shot.height],
        radius=radius,
        fill=(9, 6, 26, 80),
    )
    tile.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(30)))
    ImageDraw.Draw(tile).rounded_rectangle(
        [pad - 2, pad - 2, pad + shot.width + 1, pad + shot.height + 1],
        radius=radius + 2,
        fill=BORDER + (255,),
    )
    tile.alpha_composite(rounded(shot, radius), (pad, pad))
    return tile


def paste(canvas: Image.Image, tile: Image.Image, cx: int, cy: int, angle: float = 0) -> None:
    if angle:
        tile = tile.rotate(angle, expand=True, resample=Image.BICUBIC)
    canvas.alpha_composite(tile, (round(cx - tile.width / 2), round(cy - tile.height / 2)))


def paste_icon(canvas: Image.Image, icon: Image.Image | None) -> None:
    if icon is None:
        return
    size = 132
    icon = icon.convert("RGBA").resize((size, size), Image.LANCZOS)
    tile = Image.new("RGBA", (size + 120, size + 120), (0, 0, 0, 0))
    shadow = Image.new("RGBA", tile.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        [60, 66, 60 + size, 66 + size], radius=34, fill=(9, 6, 26, 90)
    )
    tile.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(22)))
    ImageDraw.Draw(tile).rounded_rectangle(
        [56, 56, 60 + size + 3, 60 + size + 3], radius=38, fill=(255, 255, 255, 255)
    )
    tile.alpha_composite(rounded(icon, 32), (60, 60))
    canvas.alpha_composite(tile, (40, CANVAS_H - tile.height - 40))


def compose(shots: list[Image.Image], icon: Image.Image | None) -> Image.Image:
    canvas = background()
    portrait = shots[0].height > shots[0].width

    if portrait:
        picks = shots[:3] if len(shots) >= 3 else shots[:2]
        center_h = 780
        side_h = 710

        def scale(s: Image.Image, h: int) -> Image.Image:
            return s.resize((round(s.width * h / s.height), h), Image.LANCZOS)

        tiles = [framed(scale(s, center_h if i == 1 or len(picks) < 3 else side_h), 46)
                 for i, s in enumerate(picks)]
        spacing = round(center_h * 0.42)
        mid = len(tiles) // 2
        for i, tile in enumerate(tiles):
            offset = i - mid
            angle = -7 * offset if len(tiles) == 3 else 0
            lift = -18 if i == mid and len(tiles) == 3 else 10 * abs(offset)
            paste(canvas, tile, CANVAS_W // 2 + offset * spacing, CANVAS_H // 2 + lift + 10, angle)
    else:
        shot = shots[0]
        scale = min(1300 / shot.width, 720 / shot.height)
        s = shot.resize((round(shot.width * scale), round(shot.height * scale)), Image.LANCZOS)
        paste(canvas, framed(s, 30), CANVAS_W // 2, CANVAS_H // 2, angle=-3)

    paste_icon(canvas, icon)
    return canvas.convert("RGB")


def main() -> None:
    source = (ROOT / "src" / "content" / "case-studies.ts").read_text(encoding="utf-8")
    apps = re.findall(
        r'androidApp\(\{.*?slug:\s*"([^"]+)".*?id:\s*"([^"]+)"', source, re.DOTALL
    )
    print(f"Found {len(apps)} apps")

    for slug, app_id in apps:
        page = f"https://play.google.com/store/apps/details?id={app_id}&hl=en&gl=US"
        try:
            html = fetch(page).decode("utf-8", "replace")

            # Screenshot hashes appear in order before their w526-h296 render.
            hashes = []
            for m in re.finditer(
                r"play-lh\.googleusercontent\.com/([A-Za-z0-9_-]+)=w526-h296", html
            ):
                if m.group(1) not in hashes:
                    hashes.append(m.group(1))
            if not hashes:
                print(f"NO SCREENSHOTS   {slug}")
                continue

            shots = []
            for h in hashes[:3]:
                img = Image.open(
                    io.BytesIO(fetch(f"https://play-lh.googleusercontent.com/{h}=s0"))
                )
                shots.append(img)

            icon = None
            icon_m = re.search(
                r'<meta property="og:image" content="(https://play-lh[^"]+)"', html
            )
            if icon_m:
                base = re.sub(r"=.*$", "", icon_m.group(1))
                icon = Image.open(io.BytesIO(fetch(f"{base}=s512")))

            graphic = compose(shots, icon)
            graphic.save(OUT / f"{slug}.jpg", "JPEG", quality=88, optimize=True)
            graphic.save(OUT / f"{slug}-hero.jpg", "JPEG", quality=88, optimize=True)
            orient = "portrait" if shots[0].height > shots[0].width else "landscape"
            print(f"OK {orient:9s} x{len(shots)}  {slug}")
        except Exception as err:  # noqa: BLE001 - report and continue
            print(f"FAILED           {slug}  {err}")
        time.sleep(0.4)


if __name__ == "__main__":
    main()
