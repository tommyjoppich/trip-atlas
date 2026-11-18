# Trip Atlas

A personal travel map. Spin a globe, drill into continents, countries and US states, and keep a page for every trip with dates, notes, the places you went and your photos.

It's a static site, with no server, no accounts and no build step. Everything you add is stored in your own browser.

## Features

- **World view:** a 3D globe you can spin and zoom. Countries you've visited are filled in. Click a continent to open it. The **Recent trips** panel lets you search by title, place, notes or the people you went with, and it shows trips with several stops along with their route.
- **Continent view:** a flat map split into countries, plus US states in North America. Visited places are filled in. Click a country or state to open it.
- **State / country view:** a pin for every trip in that place. Trips with several stops in one place are joined by a dashed route line. Click a pin or a trip in the list to open it.
- **Trip view:** dates, route, friends and notes, plus a photo slideshow. You can swipe it on a phone, use the arrow keys on a computer, or tap a photo for full screen.
- **Add / edit trip:** title, dates, any number of locations, friends, notes and photos. To add a location, search for a city, country or state, or tap the map to drop a pin anywhere (parks, beaches, trailheads). The app works out the country and state on its own.
- **Works on phones:** you can add it to your home screen, and it works offline after the first visit.
- **Backup & restore:** download a single file with all your trips and photos, and restore it on another device.

## Put it on GitHub Pages

1. Create a new repository on GitHub, for example `trip-atlas`.
2. Upload everything in this folder to the repository, keeping the folder structure as it is. You can drag and drop the files on the repository page: **Add file → Upload files**.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Then pick the `main` branch and the `/ (root)` folder, and click **Save**.
5. Wait a minute or two. Your site will be at `https://<your-username>.github.io/trip-atlas/`.

To use your own domain, add it under **Settings → Pages → Custom domain**.

### Install it on your phone

Open your site on the phone, then:
- **iPhone (Safari):** tap Share, then **Add to Home Screen**.
- **Android (Chrome):** tap ⋮, then **Install app** or **Add to Home screen**.

## Your data: please read

Trips and photos are saved in the browser you use (IndexedDB), on that device only.

- Your **phone and your laptop each keep a separate atlas**. To move your trips from one to the other, use **Backup → Download backup**, then **Restore** on the other device.
- Clearing your browser's site data, or using private browsing, will erase or skip what's stored. **Download a backup now and then.** The app reminds you if you haven't backed up in 30 days.
- Photos are resized to at most 2000px on their longest side before they're stored, to save space.
- Nothing is ever uploaded anywhere. Hosting the site on GitHub Pages only serves the app's code. Your trips never leave your browser.

## Run it on your computer

Browsers won't load the map data from a file opened by double-clicking. Serve the folder instead:

```bash
cd trip-atlas
python3 -m http.server 8000
# then open http://localhost:8000
```

Or use `npx serve`, or the VS Code "Live Server" extension.

## Updating the app

After you change any file, open `sw.js` and bump `VERSION` (for example `trip-atlas-v2`). That way phones that installed the app pick up the new version instead of keeping the old one cached.

## Project layout

```
index.html              the whole app (HTML, CSS, JavaScript)
sw.js                   offline support / installability
manifest.webmanifest    app name, colors and icons for "Add to Home Screen"
icons/                  app icons
data/
  countries-50m.json    world country shapes
  states-10m.json       US state shapes
  meta.json             country → continent lookup, country names
  cities.json           ~19,000 cities for the location search
vendor/                 D3 and TopoJSON (bundled so the app works offline)
tools/                  optional script to regenerate data/ (needs Node.js)
.nojekyll               tells GitHub Pages to serve files as they are
```

## Credits

- Country and state shapes: [Natural Earth](https://www.naturalearthdata.com/) (public domain), via [world-atlas](https://github.com/topojson/world-atlas) and [us-atlas](https://github.com/topojson/us-atlas) (ISC).
- City search data: [GeoNames](https://www.geonames.org/) (CC BY 4.0), via [all-the-cities](https://github.com/zeke/all-the-cities).
- Continent lookup: [mledoze/countries](https://github.com/mledoze/countries) (ODbL).
- Maps drawn with [D3](https://d3js.org/) (ISC) and [TopoJSON](https://github.com/topojson/topojson-client) (ISC).
