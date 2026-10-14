"""
Draws the seven place scenes of the library of places (spec 0002) and
writes them to src/components/scenes/artwork.ts.

Run it from the repository root after changing a drawing:

    python3 scripts/draw-scenes.py
    python3 scripts/draw-scenes.py --preview /some/folder/preview.html

The scenes are original pixel art on an integer grid, drawn here as code so
they stay small, easy to change, and free of any game asset. Every pixel
carries a color class, never a color. src/styles/scenes.css turns each
class into a fill from the mood tokens, so one drawing serves every mood
and both themes. Runs of equal pixels merge into rectangles and each class
becomes one path, which keeps every variant under 6 KB.

Each scene has three variants. The band is the wide strip at the top of
every page, the home variant is the same place with more sky for the taller
home header, and the card is the small picture on a shelf card. The band
crops to its center on phones and the title panel covers its bottom 48
pixels, so key motifs sit in the middle third and above the bottom 30
percent. The ground below that line is plain.

The optional --preview flag also writes a plain HTML page that links the
real tokens.css and scenes.css and shows every variant in its default mood.
Add #dark to its address to see dark mode, and #narrow to squeeze it to
a 400 pixel phone column, since headless Chrome will not open a window
narrower than 500 pixels. Standard library only.
"""

import math
import random
import sys
from pathlib import Path

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
ARTWORK_PATH = REPOSITORY_ROOT / 'src' / 'components' / 'scenes' / 'artwork.ts'
TOKENS_PATH = REPOSITORY_ROOT / 'src' / 'styles' / 'tokens.css'
SCENE_STYLES_PATH = REPOSITORY_ROOT / 'src' / 'styles' / 'scenes.css'

VARIANT_SIZES = {
    'band': (384, 64),
    'home': (384, 88),
    'card': (80, 40),
}
MARKUP_LIMIT_BYTES = 6 * 1024

DEFAULT_MOODS = {
    'maple-island': 'morning',
    'henesys': 'midday',
    'ellinia': 'dawn',
    'perion': 'dusk',
    'kerning-city': 'night',
    'sleepywood': 'cave',
    'default': 'morning',
}


class Canvas:
    """
    A grid of pixels in layers. Each layer maps a pixel to one color class,
    and later layers paint over earlier ones. Drawing calls take local
    coordinates measured from an origin, so a scene can be drawn once
    around its ground line and center and placed on canvases of different
    heights. Pixels outside the canvas are dropped.
    """

    def __init__(self, width, height, origin_x, origin_y):
        """Starts an empty canvas with one layer, its origin at the given pixel."""
        self.width = width
        self.height = height
        self.origin_x = origin_x
        self.origin_y = origin_y
        self.ground_absolute = origin_y
        self.layers = []
        self.new_layer()

    @property
    def left(self):
        """The leftmost column in local coordinates."""
        return -self.origin_x

    @property
    def right(self):
        """One past the rightmost column in local coordinates."""
        return self.width - self.origin_x

    @property
    def top(self):
        """The top row in local coordinates."""
        return -self.origin_y

    @property
    def bottom(self):
        """One past the bottom row in local coordinates."""
        return self.height - self.origin_y

    def from_top(self, rows):
        """The local row that sits a number of rows below the top edge."""
        return self.top + rows

    def new_layer(self):
        """Starts a layer above every earlier one and draws into it."""
        self.current_layer = {}
        self.layers.append(self.current_layer)
        return self.current_layer

    def use_layer(self, layer):
        """Switches drawing back to an earlier layer."""
        self.current_layer = layer

    def plot(self, x, y, color_class):
        """Paints one pixel, dropping it when it falls outside the canvas."""
        absolute_x = x + self.origin_x
        absolute_y = y + self.origin_y
        if 0 <= absolute_x < self.width and 0 <= absolute_y < self.height:
            self.current_layer[(absolute_x, absolute_y)] = color_class

    def fill_rectangle(self, x, y, width, height, color_class):
        """Paints a rectangle, clipped to the canvas."""
        for row in range(max(y, self.top), min(y + height, self.bottom)):
            for column in range(max(x, self.left), min(x + width, self.right)):
                self.plot(column, row, color_class)

    def stepped_hill(self, center_x, top, radius, base, color_class, step=2):
        """A dome whose height snaps to steps, so its edge reads as pixel stairs."""
        full_height = base - top
        for column in range(center_x - radius, center_x + radius + 1):
            distance = (column - center_x) / radius
            if abs(distance) > 1:
                continue
            rise = full_height * math.sqrt(1 - distance * distance)
            rise = int(round(rise / step) * step)
            self.fill_rectangle(column, base - rise, 1, rise, color_class)

    def disc(self, center_x, center_y, radius, color_class):
        """A filled pixel circle, for suns, moons, canopies, and glows."""
        for row in range(center_y - radius, center_y + radius + 1):
            for column in range(center_x - radius, center_x + radius + 1):
                if (column - center_x) ** 2 + (row - center_y) ** 2 <= radius * radius + radius * 0.6:
                    self.plot(column, row, color_class)

    def bitmap(self, x, y, rows, color_map):
        """Paints a small picture given as rows of characters."""
        for row_index, row in enumerate(rows):
            for column_index, character in enumerate(row):
                if character in color_map:
                    self.plot(x + column_index, y + row_index, color_map[character])

    def markup(self):
        """The svg paths for every layer, bottom layer first."""
        return ''.join(layer_markup(layer) for layer in self.layers)


def merge_into_rectangles(cells):
    """
    Turns a set of pixels into few rectangles: horizontal runs first, then
    runs with the same start and width on consecutive rows merge downward.
    The result comes out in row order, which keeps relative moves short.
    """
    rows = {}
    for x, y in cells:
        rows.setdefault(y, []).append(x)
    rectangles = []
    open_runs = {}
    for y in range(min(rows), max(rows) + 2):
        columns = sorted(rows.get(y, []))
        runs = []
        if columns:
            start = previous = columns[0]
            for column in columns[1:]:
                if column == previous + 1:
                    previous = column
                else:
                    runs.append((start, previous - start + 1))
                    start = previous = column
            runs.append((start, previous - start + 1))
        still_open = {}
        for run in runs:
            if run in open_runs:
                open_runs[run]['height'] += 1
                still_open[run] = open_runs[run]
            else:
                rectangle = {'x': run[0], 'y': y, 'width': run[1], 'height': 1}
                rectangles.append(rectangle)
                still_open[run] = rectangle
        open_runs = still_open
    rectangles.sort(key=lambda rectangle: (rectangle['y'], rectangle['x']))
    return rectangles


def number_pair(first, second):
    """
    Writes two path numbers with the shortest separator. A minus sign
    already separates, so no space is needed before a negative number.
    """
    return f'{first}{second}' if second < 0 else f'{first} {second}'


def encode_rectangles(rectangles):
    """
    Writes rectangles as one path. Each rectangle is an open subpath, which
    a fill closes on its own, and each move is relative to where the last
    rectangle ended, so most numbers stay one or two digits.
    """
    parts = []
    pen = None
    for rectangle in rectangles:
        x, y = rectangle['x'], rectangle['y']
        width, height = rectangle['width'], rectangle['height']
        if pen is None:
            parts.append('M' + number_pair(x, y))
        else:
            parts.append('m' + number_pair(x - pen[0], y - pen[1]))
        parts.append(f'h{width}v{height}h-{width}')
        pen = (x, y + height)
    return ''.join(parts)


def layer_markup(layer):
    """
    Writes one path per color class in a layer. Classes inside one layer
    never overlap, so their order does not matter.
    """
    by_class = {}
    for cell, color_class in layer.items():
        by_class.setdefault(color_class, set()).add(cell)
    return ''.join(
        f'<path class="{color_class}" d="{encode_rectangles(merge_into_rectangles(cells))}"/>'
        for color_class, cells in sorted(by_class.items())
    )


def ground_line(height):
    """
    The row where the plain ground begins: 70 percent down the canvas, so
    the bottom 30 percent holds no motif.
    """
    return int(height * 0.7)


def make_canvas(width, height, source_center_x=0, source_ground_y=0):
    """
    Places a drawing on a canvas. The drawing's own center and ground line
    land on the canvas center and ground line, so the same drawing works on
    the band and on the taller home canvas.
    """
    ground = ground_line(height)
    canvas = Canvas(width, height, width // 2 - source_center_x, ground - source_ground_y)
    canvas.ground_absolute = ground
    return canvas


def paint_sky(canvas, stops=None):
    """
    Four flat sky bands from the sky top token down to the sky bottom
    token. The bands follow the ground line, and the last one runs to the
    bottom of the canvas so no gap ever shows.
    """
    ground = canvas.ground_absolute
    if stops is None:
        stops = [0, round(ground * 0.3), round(ground * 0.53), round(ground * 0.73)]
    edges = stops + [canvas.height]
    for index, color_class in enumerate(['sky-1', 'sky-2', 'sky-3', 'sky-4']):
        canvas.fill_rectangle(
            canvas.left, edges[index] - canvas.origin_y, canvas.width, edges[index + 1] - edges[index], color_class
        )


def scatter_stars(canvas, density, seed, sky_fraction=0.62):
    """
    Single pixel stars in the upper sky. They only show at night and in
    dark mode. The count grows with the sky area, so the home canvas is
    not emptier than the band.
    """
    generator = random.Random(seed)
    lowest = max(2, int(canvas.ground_absolute * sky_fraction))
    count = round(density * canvas.width * lowest / 10000)
    for _ in range(count):
        canvas.plot(
            generator.randrange(canvas.left, canvas.right),
            generator.randrange(1, lowest) - canvas.origin_y,
            'star',
        )


def cloud(canvas, x, y, width, color_class='cloud'):
    """A flat pixel cloud: a wide base, a short top, and one bump."""
    canvas.fill_rectangle(x + 2, y, width - 6, 1, color_class)
    canvas.fill_rectangle(x, y + 1, width, 2, color_class)
    canvas.fill_rectangle(x + width // 3, y - 2, width // 3, 2, color_class)


def sky_row(canvas, fraction):
    """A local row placed as a share of the sky, measured from the top."""
    return canvas.from_top(round(canvas.ground_absolute * fraction))


def generic_mushroom(canvas, x, y, size):
    """
    A small generic mushroom with its own shape: a flat dome cap, a pale
    stem, and two spots. It is not any game sprite.
    """
    canvas.fill_rectangle(x - 1, y - size, 2, size, 'wall')
    canvas.fill_rectangle(x - size - 1, y - size - 1, 2 * size + 2, 2, 'mushroom-cap')
    canvas.fill_rectangle(x - size, y - size - 2, 2 * size, 1, 'mushroom-cap')
    canvas.fill_rectangle(x - size + 2, y - size - 3, 2 * size - 4, 1, 'mushroom-cap')
    canvas.plot(x - size + 1, y - size - 1, 'mushroom-spot')
    canvas.plot(x + 1, y - size - 2, 'mushroom-spot')


def plain_ground(canvas, top_class='ground', top_rows=4):
    """The plain strip below the ground line: a lit top and a shaded rest."""
    canvas.fill_rectangle(canvas.left, 0, canvas.width, top_rows, top_class)
    canvas.fill_rectangle(canvas.left, top_rows, canvas.width, canvas.bottom, 'ground-shadow')


def draw_maple_island(width, height):
    """
    Maple Island in the morning. A green island on the left with one small
    tree, a short dock on posts over the water, and a boat with one sail.
    The dock and the boat sit in the middle third.
    """
    canvas = make_canvas(width, height)
    paint_sky(canvas)
    canvas.new_layer()
    scatter_stars(canvas, 9, 2)
    canvas.disc(48, sky_row(canvas, 0.24), 4, 'light')
    for x, fraction, cloud_width in [(-112, 0.32, 22), (-24, 0.16, 14), (92, 0.4, 20), (148, 0.14, 24), (-178, 0.58, 16)]:
        cloud(canvas, x, sky_row(canvas, fraction), cloud_width)
    canvas.new_layer()
    canvas.fill_rectangle(canvas.left, -13, canvas.width, 13, 'water')
    generator = random.Random(14)
    for _ in range(40):
        canvas.fill_rectangle(
            generator.randrange(canvas.left, canvas.right), generator.randrange(-11, 0), generator.randrange(2, 5), 1, 'wave'
        )
    canvas.fill_rectangle(canvas.left, -13, canvas.width, 1, 'wave')
    canvas.new_layer()
    canvas.stepped_hill(128, -21, 26, -12, 'ground-far')
    canvas.stepped_hill(162, -16, 24, -12, 'ground-far')
    canvas.new_layer()
    canvas.stepped_hill(-106, -27, 56, 1, 'ground-far')
    canvas.stepped_hill(-138, -17, 66, 1, 'ground')
    canvas.fill_rectangle(-107, -33, 2, 7, 'trunk')
    canvas.disc(-106, -36, 4, 'canopy')
    canvas.new_layer()
    canvas.fill_rectangle(-62, -8, 48, 2, 'dock')
    for post_x in (-52, -40, -28, -16):
        canvas.fill_rectangle(post_x, -6, 1, 6, 'dock')
    canvas.fill_rectangle(-16, -14, 1, 6, 'dock')
    canvas.fill_rectangle(-17, -16, 3, 2, 'lantern')
    canvas.fill_rectangle(6, -6, 28, 1, 'dock')
    canvas.fill_rectangle(7, -5, 26, 1, 'dock')
    canvas.fill_rectangle(9, -4, 22, 1, 'dock')
    canvas.fill_rectangle(19, -34, 1, 28, 'dock')
    canvas.fill_rectangle(20, -35, 4, 2, 'roof')
    for row in range(23):
        canvas.fill_rectangle(20, -32 + row, 1 + (row * 13) // 22, 1, 'sail')
    canvas.fill_rectangle(20, -9, 14, 1, 'dock')
    canvas.fill_rectangle(3, -3, 5, 1, 'wave')
    canvas.fill_rectangle(32, -3, 4, 1, 'wave')
    canvas.new_layer()
    plain_ground(canvas, 'field', 3)
    return canvas


def draw_henesys(width, height):
    """
    Henesys at midday, ported from direction B. Round green hills, a cream
    cottage with a fence, and a cottage under a generic mushroom roof with
    its own shape and spots. Drawn in direction B's coordinates, where the
    ground line is row 59 and the scene centers on column 160.
    """
    canvas = make_canvas(width, height, 160, 59)
    paint_sky(canvas)
    canvas.new_layer()
    scatter_stars(canvas, 9, 7)
    canvas.disc(112, sky_row(canvas, 0.22), 5, 'light')
    for x, fraction, cloud_width in [(28, 0.36, 22), (206, 0.18, 26), (282, 0.46, 18), (150, 0.08, 14), (-16, 0.14, 16), (334, 0.24, 20)]:
        cloud(canvas, x, sky_row(canvas, fraction), cloud_width)
    canvas.new_layer()
    for center_x, top, radius in [(-40, 39, 40), (10, 40, 42), (96, 36, 52), (196, 39, 48), (300, 37, 50), (370, 40, 44)]:
        canvas.stepped_hill(center_x, top, radius, 71, 'ground-far')
    canvas.new_layer()
    for center_x, top, radius in [(-30, 54, 40), (40, 53, 64), (166, 56, 76), (300, 52, 58), (366, 55, 40)]:
        canvas.stepped_hill(center_x, top, radius, 71, 'ground')
    generator = random.Random(3)
    for _ in range(40):
        canvas.plot(
            generator.randrange(canvas.left, canvas.right),
            generator.randrange(56, 59),
            generator.choice(['ground-shadow', 'ground-shadow', 'flower-yellow', 'flower-pink']),
        )
    for x in range(108, 126, 4):
        canvas.fill_rectangle(x, 53, 1, 6, 'fence')
    canvas.fill_rectangle(107, 54, 20, 1, 'fence')
    canvas.fill_rectangle(107, 57, 20, 1, 'fence')
    canvas.new_layer()
    canvas.fill_rectangle(128, 48, 22, 11, 'wall')
    for row in range(7):
        canvas.fill_rectangle(136 - row * 2, 40 + row, 6 + row * 4, 1, 'roof')
    canvas.fill_rectangle(126, 47, 26, 1, 'roof')
    canvas.fill_rectangle(144, 38, 3, 5, 'chimney')
    canvas.fill_rectangle(137, 52, 4, 7, 'door')
    canvas.fill_rectangle(131, 51, 3, 3, 'window-pane')
    canvas.fill_rectangle(144, 51, 3, 3, 'window-pane')
    canvas.fill_rectangle(166, 46, 16, 13, 'wall-shade')
    canvas.fill_rectangle(172, 51, 4, 8, 'door')
    canvas.fill_rectangle(173, 50, 2, 1, 'door')
    canvas.fill_rectangle(168, 49, 2, 3, 'window-pane')
    canvas.fill_rectangle(178, 49, 2, 3, 'window-pane')
    cap_rows = [
        (32, 172, 176), (33, 168, 180), (34, 165, 183), (35, 163, 185), (36, 161, 187), (37, 160, 188),
        (38, 159, 189), (39, 159, 189), (40, 158, 190), (41, 158, 190), (42, 157, 191), (43, 157, 191), (44, 157, 191),
    ]
    for row, start, end in cap_rows:
        canvas.fill_rectangle(start, row, end - start, 1, 'mushroom-cap')
    canvas.fill_rectangle(173, 30, 2, 2, 'mushroom-cap')
    canvas.fill_rectangle(158, 45, 32, 1, 'mushroom-rim')
    for x, y in [(164, 38), (176, 34), (183, 40), (169, 42), (186, 36)]:
        canvas.fill_rectangle(x, y, 2, 2, 'mushroom-spot')
    canvas.plot(178, 37, 'mushroom-spot')
    canvas.new_layer()
    canvas.fill_rectangle(canvas.left, 59, canvas.width, 4, 'ground')
    canvas.fill_rectangle(canvas.left, 63, canvas.width, canvas.bottom, 'ground-shadow')
    return canvas


def draw_ellinia(width, height):
    """
    Ellinia at dawn. Tall trunks rise out of frame under a canopy that
    hangs from the top edge, with far trunks in the haze behind. Lanterns
    hang on vines between the two center trunks and stay warm in dark mode.
    """
    canvas = make_canvas(width, height)
    paint_sky(canvas)
    canvas.new_layer()
    scatter_stars(canvas, 6, 6, 0.5)
    canvas.new_layer()
    generator = random.Random(31)
    x = canvas.left + 4
    while x < canvas.right:
        canvas.fill_rectangle(x, canvas.top, generator.randrange(2, 5), -canvas.top, 'trunk-far')
        x += generator.randrange(13, 24)
    x = canvas.left - 4
    while x < canvas.right:
        canvas.fill_rectangle(x, canvas.top, 12, generator.randrange(8, 14), 'canopy-far')
        x += 10
    canvas.new_layer()
    trunk_layer = canvas.current_layer
    trunks = [(-176, 7), (-112, 6), (-56, 12), (40, 13), (104, 6), (166, 8)]
    for trunk_x, trunk_width in trunks:
        canvas.fill_rectangle(trunk_x, canvas.top, trunk_width, -canvas.top, 'trunk')
        canvas.fill_rectangle(trunk_x - 1, -3, trunk_width + 2, 3, 'trunk')
        canvas.fill_rectangle(trunk_x - 3, -1, trunk_width + 6, 1, 'trunk')
    canvas.new_layer()
    for trunk_x, trunk_width in trunks:
        canvas.fill_rectangle(trunk_x + trunk_width - 2, canvas.top, 2, -canvas.top - 1, 'trunk-shade')
        canvas.fill_rectangle(trunk_x + 2, -22 + (trunk_x % 7), 1, 3, 'trunk-shade')
    for column in range(-44, 40):
        sag = round(4 * math.sin(math.pi * (column + 44) / 84))
        canvas.fill_rectangle(column, -30 + sag, 1, 2, 'dock')
        canvas.plot(column, -34 + sag, 'trunk-shade')
        if column % 6 == 0:
            canvas.fill_rectangle(column, -33 + sag, 1, 3, 'trunk-shade')
    canvas.use_layer(trunk_layer)
    canvas.new_layer()
    x = canvas.left - 6
    while x < canvas.right:
        depth = 5 + (x * 7) % 5
        canvas.fill_rectangle(x, canvas.top, 10, depth, 'canopy')
        canvas.fill_rectangle(x + 2, canvas.top + depth, 6, 2, 'canopy')
        canvas.plot(x + 4, canvas.top + depth + 2, 'canopy')
        x += 9
    canvas.new_layer()
    for lantern_x, lantern_top in [(-80, -24), (-18, -19), (10, -22), (70, -21), (136, -25)]:
        canvas.fill_rectangle(lantern_x, canvas.top + 4, 1, lantern_top - canvas.top - 4, 'trunk-shade')
        canvas.fill_rectangle(lantern_x - 2, lantern_top, 5, 1, 'trunk-shade')
        canvas.fill_rectangle(lantern_x - 2, lantern_top + 1, 1, 4, 'trunk-shade')
        canvas.fill_rectangle(lantern_x + 2, lantern_top + 1, 1, 4, 'trunk-shade')
        canvas.fill_rectangle(lantern_x - 1, lantern_top + 1, 3, 4, 'lantern')
        canvas.fill_rectangle(lantern_x - 1, lantern_top + 5, 3, 1, 'trunk-shade')
        canvas.plot(lantern_x, lantern_top + 6, 'lantern')
    generator = random.Random(8)
    for _ in range(9):
        canvas.plot(generator.randrange(-34, 30), generator.randrange(-34, -6), 'light')
    canvas.new_layer()
    plain_ground(canvas)
    generator = random.Random(12)
    for _ in range(26):
        canvas.fill_rectangle(generator.randrange(canvas.left, canvas.right), -1, 1, 1, 'canopy')
    generic_mushroom(canvas, -8, 0, 3)
    generic_mushroom(canvas, 24, 0, 2)
    return canvas


def mesa(canvas, start, end, top, color_class, shade_class=None):
    """
    A flat topped rock with stepped shoulders, wider at the foot. Shade
    lines every few rows read as rock layers.
    """
    for row in range(top, 0):
        inset = max(0, 3 - (row - top)) * 2
        widen = (row - top) // 6
        canvas.fill_rectangle(start + inset - widen, row, end - start - 2 * inset + 2 * widen, 1, color_class)
        if shade_class and (row - top) % 5 == 3:
            canvas.fill_rectangle(start + inset - widen + 2, row, end - start - 2 * inset + 2 * widen - 4, 1, shade_class)


def draw_perion(width, height):
    """
    Perion at dusk. A low sun sinks behind far mesas, near mesas with rock
    layers frame the sides, and a carved totem post with spread wings
    stands in the center.
    """
    canvas = make_canvas(width, height)
    paint_sky(canvas)
    canvas.new_layer()
    scatter_stars(canvas, 7, 8, 0.45)
    canvas.disc(62, -17, 8, 'light')
    canvas.new_layer()
    mesa(canvas, -206, -112, -24, 'rock-far')
    mesa(canvas, -64, 18, -13, 'rock-far')
    mesa(canvas, 82, 214, -20, 'rock-far')
    canvas.new_layer()
    mesa(canvas, -214, -76, -30, 'rock', 'rock-shade')
    mesa(canvas, 108, 214, -23, 'rock', 'rock-shade')
    mesa(canvas, 40, 66, -8, 'rock', 'rock-shade')
    canvas.new_layer()
    canvas.fill_rectangle(-3, -31, 7, 31, 'totem')
    canvas.fill_rectangle(-11, -29, 23, 2, 'totem')
    canvas.fill_rectangle(-12, -31, 3, 2, 'totem')
    canvas.fill_rectangle(10, -31, 3, 2, 'totem')
    canvas.fill_rectangle(-2, -35, 5, 4, 'totem')
    canvas.new_layer()
    canvas.fill_rectangle(3, -34, 3, 1, 'totem-paint')
    canvas.plot(-1, -33, 'totem-paint')
    canvas.fill_rectangle(-11, -29, 3, 2, 'totem-paint')
    canvas.fill_rectangle(9, -29, 3, 2, 'totem-paint')
    for band_row in (-25, -16, -7):
        canvas.fill_rectangle(-3, band_row, 7, 1, 'totem-paint')
    canvas.fill_rectangle(-2, -22, 2, 1, 'totem-paint')
    canvas.fill_rectangle(1, -22, 2, 1, 'totem-paint')
    canvas.fill_rectangle(-1, -19, 3, 1, 'totem-paint')
    canvas.fill_rectangle(-1, -12, 3, 2, 'totem-paint')
    canvas.fill_rectangle(-7, -2, 15, 2, 'rock-shade')
    canvas.fill_rectangle(-26, -3, 6, 3, 'rock')
    canvas.fill_rectangle(-25, -4, 4, 1, 'rock')
    canvas.fill_rectangle(22, -2, 5, 2, 'rock')
    canvas.new_layer()
    plain_ground(canvas)
    generator = random.Random(5)
    for _ in range(18):
        canvas.fill_rectangle(generator.randrange(canvas.left, canvas.right), generator.randrange(0, 3), 2, 1, 'rock-shade')
    return canvas


def draw_kerning_city(width, height):
    """
    Kerning City after dark, ported from direction B. A far skyline, near
    rooftops with fire escapes and lit windows, and a water tower on
    stilts in the center. Some windows light only in dark mode, and a rim
    light traces the near roofs. Drawn in direction B's coordinates, where
    the ground line is row 39 and the tower centers on column 138.
    """
    canvas = make_canvas(width, height, 138, 39)
    paint_sky(canvas, [0, round(canvas.ground_absolute * 0.27), round(canvas.ground_absolute * 0.5), round(canvas.ground_absolute * 0.68)])
    canvas.new_layer()
    scatter_stars(canvas, 9, 11)
    canvas.disc(104, sky_row(canvas, 0.2), 4, 'light')
    canvas.disc(106, sky_row(canvas, 0.2) - 1, 3, 'sky-1')
    far_layer = canvas.new_layer()
    far_windows = canvas.new_layer()
    canvas.use_layer(far_layer)
    generator = random.Random(5)
    x = canvas.left
    while x < canvas.right:
        building_width = generator.randrange(7, 15)
        building_top = generator.randrange(17, 27)
        canvas.fill_rectangle(x, building_top, building_width, 39 - building_top, 'building-far')
        if generator.random() < 0.3:
            canvas.fill_rectangle(x + building_width // 2, building_top - 4, 1, 4, 'building-far')
        for window_row in range(building_top + 2, 37, 3):
            for window_column in range(x + 1, x + building_width - 1, 2):
                if generator.random() < 0.03:
                    canvas.use_layer(far_windows)
                    canvas.plot(window_column, window_row, 'light')
                    canvas.use_layer(far_layer)
        x += building_width + generator.randrange(0, 2)
    near_layer = canvas.new_layer()
    detail_layer = canvas.new_layer()
    window_layer = canvas.new_layer()
    generator = random.Random(9)

    def building(left_x, building_width, building_top, flat_roof):
        """One near building with its roof, fire escape, and windows."""
        canvas.use_layer(near_layer)
        canvas.fill_rectangle(left_x, building_top, building_width, 39 - building_top, 'building')
        if flat_roof:
            canvas.fill_rectangle(left_x - 1, building_top, building_width + 2, 1, 'building')
            if generator.random() < 0.6:
                canvas.fill_rectangle(left_x + building_width - 5, building_top - 3, 2, 3, 'building')
            else:
                canvas.fill_rectangle(left_x + 3, building_top - 5, 1, 5, 'building')
        else:
            step = 1
            while building_width - 4 * step >= 2:
                canvas.fill_rectangle(left_x + 2 * step, building_top - step, building_width - 4 * step, 1, 'building')
                step += 1
        canvas.use_layer(detail_layer)
        if generator.random() < 0.4:
            for landing_row in range(building_top + 3, 37, 4):
                canvas.fill_rectangle(left_x + 1, landing_row, 3, 1, 'building-dark')
                canvas.fill_rectangle(left_x + 2, landing_row + 1, 1, 3, 'building-dark')
        canvas.use_layer(window_layer)
        for window_row in range(building_top + 3, 38, 3):
            for window_column in range(left_x + 5, left_x + building_width - 2, 4):
                chance = generator.random()
                if chance < 0.15:
                    canvas.fill_rectangle(window_column, window_row, 2, 1, 'light')
                elif chance < 0.24:
                    canvas.fill_rectangle(window_column, window_row, 2, 1, 'light-late')

    x = canvas.left - 2
    while x < canvas.right:
        if 112 <= x < 164:
            x = 164
            continue
        building_width = generator.randrange(12, 21)
        if x < 112 < x + building_width:
            building_width = max(6, 111 - x)
        building(x, building_width, generator.randrange(26, 33), generator.random() < 0.55)
        x += building_width + generator.randrange(1, 3)
    building(116, 44, 31, True)
    canvas.use_layer(near_layer)
    canvas.fill_rectangle(129, 13, 20, 11, 'building-dark')
    step = 0
    while 20 - 4 * step >= 2:
        canvas.fill_rectangle(129 + 2 * step, 12 - step, 20 - 4 * step, 1, 'building-dark')
        step += 1
    canvas.fill_rectangle(138, 4, 2, 4, 'building-dark')
    for leg_x in (131, 136, 141, 146):
        canvas.fill_rectangle(leg_x, 24, 1, 7, 'building-dark')
    for brace in range(7):
        canvas.plot(132 + brace * 2, 26 + (brace % 2) * 2, 'building-dark')
    canvas.use_layer(detail_layer)
    canvas.fill_rectangle(129, 16, 20, 1, 'building')
    canvas.fill_rectangle(129, 20, 20, 1, 'building')
    near_cells = set(near_layer)
    rim_layer = canvas.new_layer()
    for cell_x, cell_y in near_cells:
        if (cell_x, cell_y - 1) not in near_cells:
            rim_layer[(cell_x, cell_y)] = 'rim-light'
    canvas.new_layer()
    canvas.plot(138, 3, 'light')
    canvas.fill_rectangle(canvas.left, 39, canvas.width, canvas.bottom, 'ground-shadow')
    return canvas


def draw_sleepywood(width, height):
    """
    Sleepywood below the roots. A ceiling of roots hangs from the top edge,
    two great roots arch down to the floor, and a lantern on a crooked post
    glows in the center beside two generic mushrooms. Mist drifts across
    the floor and a few fireflies hang in the dark.
    """
    canvas = make_canvas(width, height)
    paint_sky(canvas)
    canvas.new_layer()
    for center_x, top, radius in [(-160, -18, 44), (-70, -11, 36), (36, -13, 36), (128, -19, 46), (196, -12, 30)]:
        canvas.stepped_hill(center_x, top, radius, 0, 'ground-far', 3)
    canvas.new_layer()
    canvas.fill_rectangle(canvas.left, canvas.top, canvas.width, 4, 'root')
    generator = random.Random(17)
    x = canvas.left + 2
    while x < canvas.right:
        length = generator.randrange(4, 9) if abs(x) < 50 else generator.randrange(6, 18)
        direction = generator.choice([-1, 1])
        column = x
        for row in range(canvas.top + 4, canvas.top + 4 + length):
            canvas.fill_rectangle(column, row, 2, 1, 'root')
            if row % 4 == 0:
                column += direction
        x += generator.randrange(8, 16)
    for start_x, end_x, thickness in [(-146, -86, 8), (150, 82, 8)]:
        span = -canvas.top
        for row in range(canvas.top, 0):
            progress = (row - canvas.top - (row - canvas.top) % 2) / span
            column = round(start_x + (end_x - start_x) * math.sin(progress * math.pi / 2))
            canvas.fill_rectangle(column, row, thickness, 1, 'root')
        canvas.fill_rectangle(end_x - 4, -3, thickness + 8, 3, 'root')
        canvas.fill_rectangle(end_x - 7, -1, thickness + 14, 1, 'root')
    canvas.new_layer()
    canvas.disc(6, -15, 9, 'glow')
    canvas.new_layer()
    canvas.fill_rectangle(-2, -22, 2, 22, 'root-light')
    canvas.fill_rectangle(-2, -23, 9, 1, 'root-light')
    canvas.plot(6, -22, 'root-light')
    canvas.fill_rectangle(3, -21, 7, 1, 'root')
    canvas.fill_rectangle(3, -20, 1, 7, 'root')
    canvas.fill_rectangle(9, -20, 1, 7, 'root')
    canvas.fill_rectangle(4, -20, 5, 7, 'lantern')
    canvas.fill_rectangle(4, -13, 5, 1, 'root')
    generic_mushroom(canvas, -22, 0, 3)
    generic_mushroom(canvas, 26, 0, 2)
    generator = random.Random(23)
    for _ in range(12):
        canvas.plot(generator.randrange(-150, 150), generator.randrange(-30, -6), 'light')
    canvas.new_layer()
    plain_ground(canvas)
    canvas.new_layer()
    for start, end, row in [(-200, -70, -7), (-100, 20, -4), (40, 200, -6)]:
        canvas.fill_rectangle(start + 6, row, end - start - 12, 1, 'mist')
        canvas.fill_rectangle(start, row + 1, end - start, 2, 'mist')
    return canvas


FALLEN_LEAF = [
    "......##.",
    "...######",
    ".######v#",
    "####vvv##",
    "#vvv####.",
    "v#####...",
    "..###....",
]


DRIFTING_LEAF = [
    "......#......",
    ".....###.....",
    "..#..#v#..#..",
    "..####v####..",
    "#.####v####.#",
    ".#v###v###v#.",
    "..#v##v##v#..",
    ".###v#v#v###.",
    "..###vvv###..",
    "...###v###...",
    ".....#v#.....",
    "......v......",
    "......v......",
]


def fence(canvas, x, base, length):
    """A short wooden fence: posts every four pixels and two rails."""
    for post_x in range(x, x + length, 4):
        canvas.fill_rectangle(post_x, base - 5, 1, 5, 'fence')
    canvas.fill_rectangle(x - 1, base - 4, length + 1, 1, 'fence')
    canvas.fill_rectangle(x - 1, base - 2, length + 1, 1, 'fence')


def signpost(canvas, x, base):
    """A plain signpost with a blank board that points right. No text."""
    canvas.fill_rectangle(x, base - 10, 1, 10, 'fence')
    canvas.fill_rectangle(x - 5, base - 10, 11, 4, 'dock')
    canvas.fill_rectangle(x + 6, base - 9, 1, 2, 'dock')


def draw_default(width, height):
    """
    The default scene. A cream field under low hills, with the wordmark
    leaf drifting down through the sky. The leaf is the header leaf at half
    its grid, so it keeps the same shape and vein. It sits left of center,
    inside the phone crop, and well above the title panel, so it never
    looks clipped. On the ground to the right stand a short fence, a
    generic mushroom, and a blank signpost, so the field is never empty.
    In the cave mood a ceiling of roots and a few fireflies appear, which
    is how a monster with no map still feels underground. Drawn in
    direction B's coordinates, where the ground line is row 39 and the
    scene centers on column 156.
    """
    canvas = make_canvas(width, height, 156, 39)
    paint_sky(canvas)
    canvas.new_layer()
    scatter_stars(canvas, 9, 13)
    canvas.disc(196, sky_row(canvas, 0.26), 4, 'light open-sky')
    for x, fraction, cloud_width in [(52, 0.36, 20), (250, 0.16, 24), (-20, 0.12, 16), (330, 0.42, 18)]:
        cloud(canvas, x, sky_row(canvas, fraction), cloud_width, 'cloud open-sky')
    generator = random.Random(21)
    for _ in range(14):
        canvas.plot(generator.randrange(60, 260), generator.randrange(12, 34), 'light cave-only')
    canvas.new_layer()
    for center_x, top, radius in [(-40, 23, 50), (40, 22, 60), (150, 25, 46), (262, 21, 66), (360, 24, 50)]:
        canvas.stepped_hill(center_x, top, radius, 39, 'ground-far', 3)
    canvas.new_layer()
    generator = random.Random(4)
    x = canvas.left
    while x < canvas.right:
        strip_width = generator.randrange(6, 14)
        canvas.fill_rectangle(x, 30 + generator.randrange(0, 3), strip_width, 10, 'ground')
        x += strip_width
    x = canvas.left
    while x < canvas.right:
        strip_width = generator.randrange(8, 18)
        canvas.fill_rectangle(x, 34 + generator.randrange(0, 3), strip_width, 6, 'field')
        x += strip_width
    canvas.new_layer()
    canvas.fill_rectangle(canvas.left, canvas.top, canvas.width, 3, 'root cave-only')
    generator = random.Random(8)
    x = canvas.left + 2
    while x < canvas.right:
        length = generator.randrange(4, 15)
        direction = generator.choice([-1, 1])
        column = x
        for row in range(canvas.top + 3, canvas.top + 3 + length):
            canvas.fill_rectangle(column, row, 2, 1, 'root cave-only' if row % 5 else 'root-light cave-only')
            if row % 4 == 0:
                column += direction
        x += generator.randrange(9, 18)
    canvas.new_layer()
    fence(canvas, 160, 33, 15)
    generic_mushroom(canvas, 184, 33, 4)
    signpost(canvas, 198, 33)
    canvas.bitmap(99, canvas.from_top(6), DRIFTING_LEAF, {'#': 'maple-leaf', 'v': 'maple-leaf-vein'})
    canvas.fill_rectangle(canvas.left, 39, canvas.width, canvas.bottom, 'field')
    return canvas


CARD_SKY = [0, 10, 18, 24]


def card_canvas():
    """
    Cards keep direction B's own 80 by 40 grid, which fits a card whole at
    scale 2 or 3, so they need no ground line placement.
    """
    canvas = Canvas(80, 40, 0, 0)
    canvas.ground_absolute = 28
    return canvas


def card_maple_island():
    """The Maple Island card from direction B: an island, a dock, one sail."""
    canvas = card_canvas()
    paint_sky(canvas, CARD_SKY)
    canvas.new_layer()
    scatter_stars(canvas, 60, 2)
    canvas.disc(62, 8, 3, 'light')
    cloud(canvas, 14, 9, 12)
    canvas.new_layer()
    canvas.fill_rectangle(0, 27, 80, 13, 'water')
    for x, y in [(50, 30), (62, 33), (70, 29), (44, 36), (58, 37), (66, 35)]:
        canvas.fill_rectangle(x, y, 3, 1, 'wave')
    canvas.stepped_hill(10, 18, 20, 30, 'ground-far')
    canvas.stepped_hill(0, 22, 14, 31, 'ground')
    canvas.fill_rectangle(0, 28, 26, 3, 'ground')
    canvas.new_layer()
    canvas.fill_rectangle(24, 27, 16, 2, 'dock')
    for x in (26, 32, 38):
        canvas.fill_rectangle(x, 29, 1, 5, 'dock')
    canvas.fill_rectangle(50, 30, 12, 2, 'dock')
    canvas.fill_rectangle(52, 32, 8, 1, 'dock')
    canvas.fill_rectangle(55, 15, 1, 15, 'dock')
    for row in range(12):
        canvas.fill_rectangle(56, 16 + row, 1 + (row * 2) // 3, 1, 'sail')
    return canvas


def card_henesys():
    """The Henesys card from direction B: hills, a cottage, a mushroom roof."""
    canvas = card_canvas()
    paint_sky(canvas, CARD_SKY)
    canvas.new_layer()
    scatter_stars(canvas, 60, 4)
    canvas.disc(18, 7, 3, 'light')
    cloud(canvas, 52, 8, 14)
    canvas.new_layer()
    canvas.stepped_hill(14, 22, 22, 40, 'ground-far')
    canvas.stepped_hill(64, 21, 22, 40, 'ground-far')
    canvas.new_layer()
    canvas.stepped_hill(40, 31, 50, 40, 'ground')
    canvas.fill_rectangle(0, 37, 80, 3, 'ground-shadow')
    canvas.new_layer()
    canvas.fill_rectangle(22, 25, 12, 7, 'wall')
    for row in range(4):
        canvas.fill_rectangle(26 - row * 2, 21 + row, 4 + row * 4, 1, 'roof')
    canvas.fill_rectangle(26, 28, 3, 4, 'door')
    canvas.fill_rectangle(31, 27, 2, 2, 'window-pane')
    canvas.fill_rectangle(44, 25, 10, 7, 'wall-shade')
    canvas.fill_rectangle(48, 28, 3, 4, 'door')
    canvas.fill_rectangle(45, 27, 2, 2, 'window-pane')
    for row, start, end in [(17, 46, 52), (18, 44, 54), (19, 42, 56), (20, 41, 57), (21, 41, 57), (22, 40, 58), (23, 40, 58)]:
        canvas.fill_rectangle(start, row, end - start, 1, 'mushroom-cap')
    canvas.fill_rectangle(40, 24, 18, 1, 'mushroom-rim')
    canvas.fill_rectangle(44, 20, 2, 1, 'mushroom-spot')
    canvas.plot(51, 18, 'mushroom-spot')
    canvas.fill_rectangle(54, 21, 2, 1, 'mushroom-spot')
    return canvas


def card_ellinia():
    """The Ellinia card from direction B: trunks, a canopy, three lanterns."""
    canvas = card_canvas()
    paint_sky(canvas, CARD_SKY)
    canvas.new_layer()
    scatter_stars(canvas, 60, 6)
    canvas.new_layer()
    canvas.fill_rectangle(0, 34, 80, 6, 'ground')
    for x, trunk_width in [(6, 5), (30, 6), (54, 5), (72, 4)]:
        canvas.fill_rectangle(x, 0, trunk_width, 35, 'trunk')
        canvas.fill_rectangle(x, 0, 1, 35, 'trunk-shade')
        canvas.fill_rectangle(x - 1, 32, trunk_width + 2, 2, 'trunk')
    for x in range(-2, 80, 9):
        canvas.fill_rectangle(x, 0, 8, 4 + (x % 3), 'canopy')
        canvas.fill_rectangle(x + 2, 4 + (x % 3), 4, 2, 'canopy')
    canvas.new_layer()
    for x, length in [(20, 14), (45, 18), (65, 11)]:
        canvas.fill_rectangle(x, 4, 1, length, 'trunk-shade')
        canvas.fill_rectangle(x - 1, 4 + length, 3, 3, 'lantern')
        canvas.fill_rectangle(x - 1, 4 + length, 3, 1, 'trunk-shade')
    return canvas


def card_perion():
    """The Perion card from direction B: two mesas, a low sun, a totem."""
    canvas = card_canvas()
    paint_sky(canvas, CARD_SKY)
    canvas.new_layer()
    scatter_stars(canvas, 60, 8)
    canvas.disc(62, 10, 4, 'light')
    canvas.new_layer()
    for x, top, mesa_width in [(-2, 17, 26), (48, 21, 34)]:
        canvas.fill_rectangle(x + 2, top, mesa_width - 4, 1, 'rock')
        canvas.fill_rectangle(x, top + 1, mesa_width, 40 - top, 'rock')
        for row in range(top + 4, 40, 5):
            canvas.fill_rectangle(x + 1, row, mesa_width - 2, 1, 'rock-shade')
    canvas.fill_rectangle(0, 33, 80, 7, 'ground')
    canvas.new_layer()
    canvas.fill_rectangle(35, 12, 6, 22, 'totem')
    for row in (15, 21, 27):
        canvas.fill_rectangle(35, row, 6, 1, 'totem-paint')
    canvas.fill_rectangle(31, 13, 14, 2, 'totem')
    canvas.plot(36, 17, 'totem-paint')
    canvas.plot(39, 17, 'totem-paint')
    canvas.fill_rectangle(37, 10, 2, 2, 'totem-paint')
    return canvas


def card_kerning_city():
    """The Kerning City card from direction B: a skyline and a water tower."""
    canvas = card_canvas()
    paint_sky(canvas, CARD_SKY)
    canvas.new_layer()
    scatter_stars(canvas, 100, 10)
    canvas.new_layer()
    generator = random.Random(2)
    x = 0
    for building_width, building_top in [(10, 20), (8, 16), (12, 22), (9, 18), (11, 21), (10, 17), (12, 23), (10, 19)]:
        canvas.fill_rectangle(x, building_top, building_width, 40 - building_top, 'building-far')
        for window_row in range(building_top + 2, 38, 3):
            for window_column in range(x + 2, x + building_width - 1, 3):
                if generator.random() < 0.25:
                    canvas.plot(window_column, window_row, 'light')
        x += building_width
    canvas.new_layer()
    canvas.fill_rectangle(0, 30, 80, 10, 'building')
    for step in range(4):
        canvas.fill_rectangle(4 + 2 * step, 29 - step, 14 - 4 * step, 1, 'building')
    canvas.fill_rectangle(54, 26, 18, 4, 'building')
    canvas.fill_rectangle(53, 26, 20, 1, 'building')
    canvas.fill_rectangle(68, 23, 2, 3, 'building')
    canvas.fill_rectangle(37, 14, 10, 7, 'building-dark')
    canvas.fill_rectangle(38, 12, 8, 2, 'building-dark')
    canvas.fill_rectangle(41, 10, 2, 2, 'building-dark')
    for x in (38, 41, 43, 46):
        canvas.fill_rectangle(x, 21, 1, 9, 'building-dark')
    canvas.plot(42, 9, 'light')
    for window_row in (32, 36):
        for window_column in range(3, 80, 5):
            if (window_column * 7 + window_row) % 3:
                canvas.fill_rectangle(window_column, window_row, 2, 2, 'light')
    return canvas


def card_sleepywood():
    """The Sleepywood card from direction B: roots, a lantern, mist."""
    canvas = card_canvas()
    paint_sky(canvas, CARD_SKY)
    canvas.new_layer()
    canvas.fill_rectangle(0, 0, 80, 4, 'root')
    for x, length, direction in [(6, 22, 1), (20, 14, -1), (34, 26, 1), (52, 18, -1), (68, 24, 1)]:
        column = x
        for row in range(4, 4 + length):
            canvas.fill_rectangle(column, row, 2, 1, 'root' if row % 5 else 'root-light')
            if row % 4 == 0:
                column += direction
    canvas.fill_rectangle(0, 34, 80, 6, 'ground')
    canvas.stepped_hill(70, 28, 16, 35, 'ground')
    canvas.new_layer()
    canvas.fill_rectangle(44, 25, 1, 9, 'root-light')
    canvas.fill_rectangle(42, 20, 5, 1, 'root-light')
    canvas.fill_rectangle(42, 21, 1, 4, 'root-light')
    canvas.fill_rectangle(46, 21, 1, 4, 'root-light')
    canvas.fill_rectangle(42, 25, 5, 1, 'root-light')
    canvas.fill_rectangle(43, 21, 3, 4, 'lantern')
    canvas.new_layer()
    canvas.fill_rectangle(0, 28, 34, 2, 'mist')
    canvas.fill_rectangle(10, 31, 50, 2, 'mist')
    canvas.fill_rectangle(52, 27, 28, 2, 'mist')
    return canvas


def card_default():
    """The default card: low hills, a cream field, and the small leaf."""
    canvas = card_canvas()
    paint_sky(canvas, CARD_SKY)
    canvas.new_layer()
    scatter_stars(canvas, 60, 12)
    canvas.disc(60, 9, 3, 'light open-sky')
    cloud(canvas, 12, 10, 12, 'cloud open-sky')
    canvas.new_layer()
    canvas.stepped_hill(14, 21, 26, 32, 'ground-far', 3)
    canvas.stepped_hill(66, 23, 24, 32, 'ground-far', 3)
    canvas.fill_rectangle(0, 28, 80, 4, 'ground')
    canvas.fill_rectangle(0, 31, 80, 9, 'field')
    for x, y in [(8, 31), (22, 32), (58, 31), (70, 33), (48, 34)]:
        canvas.fill_rectangle(x, y, 3, 1, 'ground')
    canvas.new_layer()
    canvas.fill_rectangle(0, 0, 80, 3, 'root cave-only')
    canvas.new_layer()
    canvas.bitmap(35, 27, FALLEN_LEAF, {'#': 'maple-leaf', 'v': 'maple-leaf-vein'})
    return canvas


SCENE_DRAWINGS = {
    'maple-island': (draw_maple_island, card_maple_island),
    'henesys': (draw_henesys, card_henesys),
    'ellinia': (draw_ellinia, card_ellinia),
    'perion': (draw_perion, card_perion),
    'kerning-city': (draw_kerning_city, card_kerning_city),
    'sleepywood': (draw_sleepywood, card_sleepywood),
    'default': (draw_default, card_default),
}


def draw_everything():
    """
    Draws every scene in every variant and checks the size budget, so a
    drawing that grows past 6 KB fails here and never reaches the site.
    """
    artwork = {}
    for scene, (draw_wide, draw_card) in SCENE_DRAWINGS.items():
        artwork[scene] = {}
        for variant, (width, height) in VARIANT_SIZES.items():
            canvas = draw_card() if variant == 'card' else draw_wide(width, height)
            markup = canvas.markup()
            size = len(markup.encode('utf-8'))
            if size > MARKUP_LIMIT_BYTES:
                raise SystemExit(f'{scene} {variant} is {size} bytes, over the {MARKUP_LIMIT_BYTES} byte limit.')
            if "'" in markup or '\\' in markup:
                raise SystemExit(f'{scene} {variant} markup cannot be written as a plain string.')
            artwork[scene][variant] = (width, height, markup)
    return artwork


def typescript_source(artwork):
    """
    Writes artwork.ts. Markup holds only paths with double quoted
    attributes, so a single quoted string carries it unchanged.
    """
    lines = [
        '/*',
        '   Generated by scripts/draw-scenes.py. Do not edit by hand. Change the',
        '   drawing in the script and run python3 scripts/draw-scenes.py again.',
        '',
        '   The seven scenes of the library of places (spec 0002), each in three',
        '   variants: band for page headers, home for the taller home header, and',
        '   card for small shelf cards. Markup is the inside of one svg: paths on a',
        '   pixel grid, each with a color class that scenes.css fills from the mood',
        '   tokens. Key motifs sit in the middle third and above the bottom 30',
        '   percent, so the phone crop and the title panel never hide them.',
        '*/',
        "import type { SceneIdentifier } from '../../../schemas/shared';",
        '',
        "export type SceneVariant = 'band' | 'home' | 'card';",
        '',
        '/*',
        '   One drawing: the size of its pixel grid, used as the svg viewBox, and',
        '   the svg markup that goes inside it.',
        '*/',
        'export interface SceneArtwork {',
        '\tviewBoxWidth: number;',
        '\tviewBoxHeight: number;',
        '\tmarkup: string;',
        '}',
        '',
        '/*',
        '   Every scene in every variant, so a page can never ask for a drawing',
        '   that does not exist.',
        '*/',
        'export const sceneArtwork: Record<SceneIdentifier, Record<SceneVariant, SceneArtwork>> = {',
    ]
    for scene, variants in artwork.items():
        key = f"'{scene}'" if '-' in scene else scene
        lines.append(f'\t{key}: {{')
        for variant, (width, height, markup) in variants.items():
            lines.append(f"\t\t{variant}: {{ viewBoxWidth: {width}, viewBoxHeight: {height}, markup: '{markup}' }},")
        lines.append('\t},')
    lines.append('};')
    return '\n'.join(lines) + '\n'


def preview_page(artwork):
    """
    A plain page for checking the drawings by eye. It links the real token
    and scene styles, shows each band in a content column and each home
    variant at full width, both with a panel over the bottom 48 pixels the
    way the title panel sits, and each card at its two sizes.
    """
    tokens_address = TOKENS_PATH.as_uri()
    scene_styles_address = SCENE_STYLES_PATH.as_uri()
    sections = []
    entries = [(scene, DEFAULT_MOODS[scene]) for scene in artwork] + [('default', 'cave')]
    for scene, mood in entries:
        variants = artwork[scene]

        def picture(variant):
            """One variant as a complete inline svg, as Scene.astro renders it."""
            width, height, markup = variants[variant]
            return (
                f'<svg class="scene" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMax slice" '
                f'shape-rendering="crispEdges" aria-hidden="true" focusable="false">{markup}</svg>'
            )

        sizes = ' '.join(f'{variant} {len(variants[variant][2].encode("utf-8"))} B' for variant in variants)
        sections.append(
            f'<section data-mood="{mood}"><h2>{scene}, {mood} <small>{sizes}</small></h2>'
            f'<div class="preview-band">{picture("band")}<div class="preview-panel"></div></div>'
            f'<div class="preview-home">{picture("home")}<div class="preview-panel"></div></div>'
            f'<div class="preview-cards"><div class="preview-card">{picture("card")}</div>'
            f'<div class="preview-card preview-card--large">{picture("card")}</div></div></section>'
        )
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Scene preview</title>
<link rel="stylesheet" href="{tokens_address}">
<link rel="stylesheet" href="{scene_styles_address}">
<script>
if (location.hash.includes('dark')) document.documentElement.dataset.theme = 'dark';
if (location.hash.includes('narrow')) document.documentElement.classList.add('preview-narrow');
</script>
<style>
body {{ margin: 0; padding: 16px; background: var(--color-paper); color: var(--color-ink); font: 14px system-ui, sans-serif; }}
.preview-narrow body {{ box-sizing: border-box; width: 400px; overflow: hidden; }}
section {{ margin-bottom: 24px; }}
h2 {{ font-size: 14px; margin: 0 0 6px; }}
small {{ font-weight: 400; color: var(--color-ink-muted); }}
.preview-band, .preview-home {{ position: relative; overflow: hidden; background: var(--scene-ground); margin-bottom: 8px; }}
.preview-band {{ height: var(--scene-height); max-width: 720px; }}
.preview-home {{ height: var(--scene-height-home); }}
.preview-panel {{ position: absolute; left: 16px; right: 16px; bottom: 0; height: var(--scene-overlap); background: var(--color-panel); border: 1px solid var(--color-edge); border-bottom: 0; }}
.preview-cards {{ display: flex; gap: 8px; align-items: end; }}
.preview-card {{ width: 160px; height: 80px; overflow: hidden; background: var(--scene-sky-bottom); }}
.preview-card--large {{ width: 240px; height: 120px; }}
</style>
</head>
<body>
{''.join(sections)}
</body>
</html>
'''


def main(arguments):
    """
    Draws everything, writes artwork.ts, prints each variant's size, and
    writes the preview page when asked.
    """
    artwork = draw_everything()
    ARTWORK_PATH.parent.mkdir(parents=True, exist_ok=True)
    ARTWORK_PATH.write_text(typescript_source(artwork), encoding='utf-8')
    for scene, variants in artwork.items():
        sizes = ', '.join(f'{variant} {len(markup.encode("utf-8"))}' for variant, (_width, _height, markup) in variants.items())
        print(f'{scene}: {sizes}')
    if '--preview' in arguments:
        index = arguments.index('--preview')
        if index + 1 >= len(arguments):
            raise SystemExit('Give a file path after --preview.')
        preview_path = Path(arguments[index + 1])
        preview_path.parent.mkdir(parents=True, exist_ok=True)
        preview_path.write_text(preview_page(artwork), encoding='utf-8')
        print(f'Preview written to {preview_path}')


if __name__ == '__main__':
    main(sys.argv[1:])
