let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}


let gameSettings;
var defaultValues = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  levelStatus: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  totalSquares: 0,
  group: 0,
  currentLevel: 0
}
let mapConfig
let mapConfigDefault1 = {
  width: 64,
  height: 64,
  seed: 44456
}
//32,   / bhvcgg364, 128, 192
let mapConfigDefault = {
  width: 128,
  height: 128,
  seed: 3990765355,
  divisor: 12
}
let mapConfigs = [
  {
    width: 32,
    height: 32,
    seed: 3990765355,
    divisor: 12,
    water: 1
  },
  {
    width: 64,
    height: 64,
    seed: 3990765355,
    divisor: 12,
    water: 1
  },
  {
    width: 128,
    height: 128,
    seed: 3990765355,
    divisor: 12,
    water: 1
  },
  {
    width: 192,
    height: 192,
    seed: 3990765355,
    divisor: 12,
    water: 1
  }
]
//64  234234 20002 2730764127
let tileWidth, tileHeight, tileWidthHalf, tileHeightHalf, centerX, centerY
let gameData
let gameDataSaved
let mapLoad = 'new'
let gameStats = {
  day: 1,
  year: 1900,
  funds: 100000,
  population: 100,
  maxPlotSize: 1,
  globalLV: [0, 0, 0, 0],
  specialJobs: 0,
  powerPlants: [],
  waterPlants: [],
  averageLV: 0,
  zoneCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rci: [0, 0, 0],
  taxRates: [7, 7, 7],
  maintenanceCosts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  maintenanceCostsSpending: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  maintenanceCostsPer: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
}

let gameRules = {
  roadRange: 4,
  dayLength: 24000,
  apNormal: 1500,
  wpNormal: 1000,
  lvLow: 200,
  lvMed: 350,

}

let zoneSizeTable = [0, 1, 4, 9, 16, 25, 36, 49, 64]
let GM = {
  road: 0,
  pan: 1,
  place: 2
}

const GM_ROAD = 0
const GM_PAN = 1
const GM_PLACE = 2

const GM_ERASE = 3
const GM_ZONE = 4
const GM_INFO = 5
const GM_RAIL = 7


let gameModeNames = ['Road', 'Pan', 'Place', 'Erase', 'Zone', 'Info', 'Rail']
let gameMode = GM_INFO;
let zoneNames = ['Light Residential', 'Medium Residential', 'Dense Residential', 'Light Commercial', 'Medium Commercial', 'Dense Commercial', 'Light Industry', 'Medium Industry', 'Dense Industry', 'Power', 'Water', 'Waste', 'Communication', 'Health', 'Police', 'Fire', 'Education', 'Culture', 'Parks', 'Recreation', 'Government', 'Special', 'Military', 'Transportation']

let sim;
let grid
let gridImage
let gridTrans
let failedTripCount = 0
let successfullTripCount = 0
let tripsAttempted = 0
loadFont("PixelFont", "assets/fonts/QuinqueFive.ttf");
function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
    document.fonts.add(loaded);
  }).catch(function (error) {
    return error;
  });
}


//reference
/* let zoneNames = [
  0 'Light Residential', 
  1 'Medium Residential', 
  2 'Dense Residential', 
  3 'Light Commercial', 
  4 'Medium Commercial', 
  5 'Dense Commercial', 
  6 'Low Industry', 
  7 'Medium Industry', 
  8 'Dense Industry', 
  9 'Power', 
  10 'Water', 
  11 'Waste', 
  12 'Communication', 
  13 'Health', 
  14 'Police', 
  15 'Fire', 
  16 'Education', 
  17 'Culture', 
  18 'Parks', 
  19 'Recreation', 
  20 'Government', 
  21'Special', 
  22 'Military', 
  23 'Transportation'
  ] 
  Power, water, health, police, fire, Education, parks,gove, trans
  
  */