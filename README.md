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
- **GitHub sync:** trips and photos are saved automatically to a private GitHub repository and shared between your phones (see below).

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

## GitHub sync (recommended)

Trips and photos are saved on the phone you use. Turn on **GitHub sync** and the app also keeps everything in a **private** GitHub repository, so:

- nothing is lost if a phone is lost or its browser data is cleared,
- Tommy's and Katherine's phones share **one atlas**: a trip added on one phone shows up on the other,
- there are no backup files to download or upload.

Sync runs on its own whenever you open the app, come back to it, or add, edit or delete a trip. If you're offline, changes wait and upload once you're back online. The cloud icon in the top bar shows the status: green = synced, blue = syncing, yellow = offline, red = needs attention.

### Set it up once (about 5 minutes, easiest on a computer)

1. **Create a private repository for your data.** This is separate from the public repository that hosts the app. On GitHub, click **New repository**, name it e.g. `trip-atlas-data`, choose **Private**, tick **Add a README file**, and click **Create repository**.
2. **Create an access token** that can only touch that repository:
   - GitHub → your profile photo → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
   - **Expiration:** the longest GitHub allows.
   - **Repository access:** *Only select repositories* → `trip-atlas-data`.
   - **Permissions:** Repository permissions → **Contents → Read and write**.
   - Click **Generate token** and copy it (it starts with `github_pat_`).
3. **Connect each phone.** In Trip Atlas, tap the cloud icon (**Sync**), then enter your GitHub username, `trip-atlas-data` and the token, and tap **Connect**. Do the same on the other phone. You can use the same token on both.

Trips already on a phone are merged in when it connects. If the same trip is edited on both phones, the most recent edit wins.

### Good to know

- The token is stored only on the phones you enter it on. **Never put it in the app's repository**, which is public. If a phone is lost, delete the token on GitHub (Settings → Developer settings → Fine-grained tokens) and make a new one.
- When the token expires, the cloud icon turns red. Make a new token and use **Change token** in the Sync screen.
- In the data repository you'll see `trips/` (one small file per trip) and `photos/` (one image per photo). Each change is a commit, so GitHub also keeps a full history.
- Photos added on the other phone download the first time you open that trip, then stay on the phone.
- The app refuses to connect to a **public** repository, so your photos can't end up public by mistake.

### Backup file (optional)

**Sync → Backup file** still downloads a single file with everything, and **Restore** loads one. You don't need it if sync is on.

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
| `countries-50m.json` | World country shapes (detailed) |
| `countries-110m.json` | World country shapes (light, used while the globe is moving) |
| `states-lite.json` | US state shapes (light, used on the globe) |
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
