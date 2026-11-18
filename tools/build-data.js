// Builds the data files the app loads: countries, states, cities, continent lookup.
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '..', 'data');
fs.mkdirSync(out, { recursive: true });

fs.copyFileSync(require.resolve('world-atlas/countries-50m.json'), path.join(out, 'countries-50m.json'));
fs.copyFileSync(require.resolve('us-atlas/states-10m.json'), path.join(out, 'states-10m.json'));

const wc = require('world-countries');
const continentOf = (c) => {
  if (c.region === 'Americas') return c.subregion === 'South America' ? 'south-america' : 'north-america';
  if (c.region === 'Antarctic') return 'antarctica';
  return c.region.toLowerCase(); // africa, asia, europe, oceania
};
const byNum = {};
const a2 = {};
for (const c of wc) {
  if (c.ccn3) byNum[c.ccn3] = continentOf(c);
  a2[c.cca2] = c.name.common;
}
// Russia sits in Europe in the source; keep it there (it is mostly drawn in Europe/Asia both).
fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ continentByNum: byNum, countryNameByA2: a2 }));

const cities = require('all-the-cities')
  .filter((c) => c.population >= 25000 || (c.country === 'US' && c.population >= 10000))
  .sort((a, b) => b.population - a.population)
  .map((c) => [c.name, +c.loc.coordinates[0].toFixed(3), +c.loc.coordinates[1].toFixed(3), c.country, c.country === 'US' ? c.adminCode : '', c.population]);
fs.writeFileSync(path.join(out, 'cities.json'), JSON.stringify(cities));
console.log('cities', cities.length, (fs.statSync(path.join(out, 'cities.json')).size / 1024) | 0, 'KB');
