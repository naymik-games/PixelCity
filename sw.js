var cacheName = 'PixelCity v.10';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',



  '/scenes/preload.js',
  '/scenes/startGame.js',
  '/scenes/info.js',
  '/scenes/menu.js',
  '/scenes/UI.js',
  '/scenes/people.js',
  '/scenes/power.js',
  '/scenes/rci.js',

  'assets/fonts/QuinqueFive.ttf',
  '/assets/fonts/topaz.png',
  '/assets/fonts/topaz.xml',

  '/classes/building.js',
  '/classes/functions.js',
  '/classes/grid.js',
  '/classes/map.js',
  '/classes/pinch.min.js',
  '/classes/seedrandom.min.js',
  '/classes/settings.js',
  '/classes/simulation.js',
  '/classes/tile.js',
  /*   '/classes/uiplug.min.js', */


  '/assets/sprites/blank.png',
  '/assets/sprites/menu_icons.png',
  '/assets/sprites/placeholder.png',
  '/assets/sprites/playpause.png',
  '/assets/sprites/selectx2.png',
  '/assets/sprites/zonesiso.png',


  '/assets/sprites/commercial/C_tiles1DEN.png',
  '/assets/sprites/commercial/C_tiles1LIGHT.png',
  '/assets/sprites/commercial/C_tiles1MED.png',
  '/assets/sprites/commercial/C_tiles2DEN.png',
  '/assets/sprites/commercial/C_tiles2LIGHT.png',
  '/assets/sprites/commercial/C_tiles2MED.png',
  '/assets/sprites/commercial/C_tiles3DEN.png',
  '/assets/sprites/commercial/C_tiles3LIGHT.png',
  '/assets/sprites/commercial/C_tiles3MED.png',
  '/assets/sprites/commercial/C_tiles4DEN.png',
  '/assets/sprites/commercial/C_tiles4LIGHT.png',
  '/assets/sprites/commercial/C_tiles4MED.png',

  '/assets/sprites/residential/C_tiles1DEN.png',
  '/assets/sprites/residential/C_tiles1LIGHT.png',
  '/assets/sprites/residential/C_tiles1MED.png',
  '/assets/sprites/residential/C_tiles2DEN.png',
  '/assets/sprites/residential/C_tiles2LIGHT.png',
  '/assets/sprites/residential/C_tiles2MED.png',
  '/assets/sprites/residential/C_tiles3DEN.png',
  '/assets/sprites/residential/C_tiles3LIGHT.png',
  '/assets/sprites/residential/C_tiles3MED.png',
  '/assets/sprites/residential/C_tiles4DEN.png',
  '/assets/sprites/residential/C_tiles4LIGHT.png',
  '/assets/sprites/residential/C_tiles4MED.png',

  '/assets/sprites/industrial/I_tilesx1.png',
  '/assets/sprites/industrial/I_tilesx3.png',
  '/assets/sprites/industrial/I_tilesx2.png',
  '/assets/sprites/industrial/I_tilesx4.png',

  '/assets/sprites/education/E_tilesx2.png',
  '/assets/sprites/education/E_tilesx3.png',
  '/assets/sprites/education/E_tilesx4.png',
  '/assets/sprites/education/E_tilesx5.png',
  '/assets/sprites/education/E_tilesx6.png',
  '/assets/sprites/education/E_tilesx8.png',

  '/assets/sprites/government/G_tilesx3.png',
  '/assets/sprites/government/G_tilesx4.png',
  '/assets/sprites/government/G_tilesx8.png',
  '/assets/sprites/government/G_tilesx16.png',

  '/assets/sprites/other/O_tilesx1.png',
  '/assets/sprites/other/O_tilesx2.png',
  '/assets/sprites/other/O_tilesx3.png',
  '/assets/sprites/other/O_tilesx4.png',
  '/assets/sprites/other/O_tilesx5.png',
  '/assets/sprites/other/O_tilesx6.png',
  '/assets/sprites/other/O_tilesx7.png',
  '/assets/sprites/other/O_tilesx9.png',
  '/assets/sprites/other/O_tilesx10.png',
  '/assets/sprites/other/O_tilesx12.png',
  '/assets/sprites/other/O_tilesx16.png',

  '/assets/sprites/parks/parksx1.png',
  '/assets/sprites/parks/parksx2.png',
  '/assets/sprites/parks/parksx3.png',
  '/assets/sprites/parks/parksx4.png',
  '/assets/sprites/parks/parksx8.png',

  '/assets/sprites/transportation/T_tilesx1.png',
  '/assets/sprites/transportation/T_tilesx2.png',
  '/assets/sprites/transportation/T_tilesx3.png',
  '/assets/sprites/transportation/T_tilesx4.png',
  '/assets/sprites/transportation/rails.png',
  '/assets/sprites/transportation/roads.png',

  '/assets/sprites/utilities/utilitiesx1.png',
  '/assets/sprites/utilities/utilitiesx2.png',
  '/assets/sprites/utilities/utilitiesx3.png',
  '/assets/sprites/utilities/utilitiesx4.png',
  '/assets/sprites/utilities/utilitiesx5.png',
  '/assets/sprites/utilities/utilitiesx6.png',

  '/assets/sprites/tiles/1x1placeholder.png',
  '/assets/sprites/tiles/2x2placeholder.png',
  '/assets/sprites/tiles/3x3placeholder.png',
  '/assets/sprites/tiles/4x4placeholder.png',
  '/assets/sprites/tiles/construction.png',
  '/assets/sprites/tiles/selectx1.png',
  '/assets/sprites/tiles/tiles32x17theo.png',

  '/assets/sprites/backs.png',

];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});