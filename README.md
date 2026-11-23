# Trip Atlas

A personal travel map. Spin a globe, drill into continents, countries and US states, and keep a page for every trip with dates, notes, the places you went and your photos.

It's a static site, with no server, no accounts and no build step. Everything you add is stored in the browser you use.

## Features

- **World view:** a 3D globe you can spin and zoom. Visited countries and US states are filled in. Click a continent to open it. The **Recent trips** panel lets you search by title, place, notes, trip owner or friends.
- **Continent view:** a flat map split into countries, plus US states in North America. Click a country or state to open it.
- **State / country view:** a pin for every trip in that place, numbered in route order. Trips that carry on into other states or countries show their whole route: the stops outside the place are drawn as hollow pins.
- **Trip view:** dates, trip owner(s), route, the places it passed through, friends, notes, and a photo slideshow (swipe, use the arrow keys, or tap for full screen). Below that is a **route map** with every stop numbered and each state/country on the trip filled in.
- **Add / edit trip:** title, dates, trip owner(s), any number of locations in order, friends, notes and photos. To add a location, search for a city, country or state, or tap the map to drop a pin anywhere.
- **Who went (Tommy & Katherine):** tag every trip with Tommy, Katherine, or both if you went together.
  - **Colors:** places only Tommy has been to are **purple**, places only Katherine has been to are **green**, and places you've both been to (together or separately) are **blue**. Pins, route lines and trip cards use the same colors.
  - **Heat map:** the more trips to a state or country, the darker it gets (1 trip is lightest, 5+ is darkest). A key in the corner of every map shows the shades.
  - **Filter:** the **Who went** bar at the top of every page toggles Tommy and Katherine on or off (multi-select). The maps, colors, trip lists and counts all follow it. For example, with only Tommy selected, a trip you took together counts as Tommy's (purple).
  - **Renaming:** to use different names, change `PEOPLE` and the matching keys in `HUES` near the top of the script in `index.html`.
- **Works on phones:** you can add it to your home screen, and it works offline after the first visit.
- **Backup & restore:** download one file with all trips and photos, and restore it on another device.

## Put it on GitHub Pages

All the files sit in one folder, with no subfolders.

1. Create a new repository on GitHub, for example `trip-atlas`.
2. On the repository page, choose **Add file → Upload files**, drag in **all** the files, and click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick `main` and `/ (root)`, and click **Save**.
4. After a minute or two, your site will be at `https://<your-username>.github.io/trip-atlas/`.

### Updating later

Upload the changed files in the same way (**Add file → Upload files**). GitHub replaces files that have the same name.

Updates always include a new `sw.js` with a bumped version number. That's what tells phones that installed the app to pick up the new version.

### Install it on your phone

- **iPhone (Safari):** Share → **Add to Home Screen**.
- **Android (Chrome):** ⋮ → **Install app** (or **Add to Home screen**).

## Your data: please read

Trips and photos are saved in the browser you use (IndexedDB), on that device only.

- Your phone and your laptop each keep a **separate atlas**. Use **Backup → Download backup**, then **Restore** on the other device, to move your trips over.
- Clearing your browser's site data, or using private browsing, can erase what's stored. **Download a backup now and then.** The app reminds you every 30 days.
- Photos are resized to at most 2000px on their longest side before they're stored.
- Nothing is uploaded anywhere. GitHub Pages only serves the app's code.

## Run it on your computer

Double-clicking `index.html` won't work, because browsers block loading the map files that way. Serve the folder instead:

```bash
cd trip-atlas
python3 -m http.server 8000
# open http://localhost:8000
```

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app (HTML, CSS, JavaScript) |
| `sw.js` | Offline support and installability |
| `manifest.webmanifest` | App name, colors and icons for "Add to Home Screen" |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | App icons |
| `countries-50m.json` | World country shapes |
| `states-10m.json` | US state shapes |
| `meta.json` | Country → continent lookup, country names |
| `cities.json` | About 19,000 cities for the location search |
| `d3.min.js`, `topojson-client.min.js` | Map libraries, bundled so the app works offline |
| `LICENSE-d3.txt`, `LICENSE-topojson.txt` | Licenses for those libraries |

## Credits

- Country and state shapes: [Natural Earth](https://www.naturalearthdata.com/) (public domain), via [world-atlas](https://github.com/topojson/world-atlas) and [us-atlas](https://github.com/topojson/us-atlas) (ISC).
- City search data: [GeoNames](https://www.geonames.org/) (CC BY 4.0), via [all-the-cities](https://github.com/zeke/all-the-cities).
- Continent lookup: [mledoze/countries](https://github.com/mledoze/countries) (ODbL).
- Maps drawn with [D3](https://d3js.org/) and [TopoJSON](https://github.com/topojson/topojson-client) (both ISC).
