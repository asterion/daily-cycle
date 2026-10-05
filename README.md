# Daily Cycle

A GNOME Shell extension that puts an icon in the top panel and changes it as
the day goes by: a moon in the early hours, a rising sun in the morning, a full
sun at noon, a setting sun in the afternoon and a moon again at night.

## How it works

The icon follows your system clock and switches when a new period starts:

| Period | Hours | Icon |
|---|---|---|
| Early morning | 00:00 – 06:00 | Moon with stars |
| Morning | 06:00 – 12:00 | Rising sun |
| Noon | 12:00 – 14:00 | Full sun |
| Afternoon | 14:00 – 20:00 | Setting sun |
| Night | 20:00 – 00:00 | Moon |

Click the icon to open a legend with every period, its icon and its hours.
The current period stands out: it is shown in bold, at full brightness and with
a dot next to it, while the others are dimmed.

The icons come from your system theme, so they match the rest of the panel.
The period names are available in **English, Spanish and French**, following
your system language.

## Installation

Requires GNOME Shell 50 and `git`.

```bash
git clone https://github.com/asterion/daily-cycle.git \
    ~/.local/share/gnome-shell/extensions/daily-cycle@asterion
```

Log out and back in, then enable it:

```bash
gnome-extensions enable daily-cycle@asterion
```

## Customize the periods

The periods are defined in the `PERIODS` table at the top of
[`dayPeriod.js`](dayPeriod.js). Each one has the hour it starts at and the name
of its icon; a period lasts until the next one starts. Change an hour there and
the legend in the menu updates with it.

Log out and back in after editing the file.

## Uninstalling

```bash
gnome-extensions disable daily-cycle@asterion
rm -rf ~/.local/share/gnome-shell/extensions/daily-cycle@asterion
```

## License

[GPL-2.0-or-later](LICENSE)
