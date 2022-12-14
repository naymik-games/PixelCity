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
    size: 1,
    divisor: 12,
    water: 1
  },
  {
    width: 64,
    height: 64,
    seed: 3990765355,
    size: 2,
    divisor: 12,
    water: 1
  },
  {
    width: 128,
    height: 128,
    seed: 3990765355,
    divisor: 12,
    size: 3,
    water: 1
  },
  {
    width: 192,
    height: 192,
    seed: 3990765355,
    size: 4,
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
  difficulty: 0,
  demandCaps: [25000, 25000, 70000],
  globalLV: [0, 0, 0, 0],
  specialJobs: 0,
  powerPlants: [],
  waterPlants: [],
  policeStations: [],
  fireStations: [],
  schoolCapacity: 0,
  collegeCapacity: 0,
  hospitalCapacity: 0,
  averageLV: 0,
  zoneCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rciCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rci: [0, 0, 0],
  taxRates: [9, 9, 9],
  maintenanceCosts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  maintenanceCostsSpending: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  maintenanceCostsPer: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
  generations: null,
  ordinancesSet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
let birthRates = [.0075, .0085, .01, .0125, .015, .0175, .02]
let gameRules = {
  roadRange: 4,
  startingFunds: 100000,
  dayLength: 24000,
  apNormal: 1500,
  wpNormal: 1000,
  crimeNormal: 8,
  lvLow: 350,
  lvMed: 600,
  baseLV: 50,
  psRadius: 10,
  phRadius: 15,
  fsRadius: 20,
  fhRadius: 30,
  commuters: 150
}
rciSupply = [23,
  19,
  18,
  73,
  71,
  67,
  157,
  151,
  147,
  18,
  18,
  17,
  64,
  64,
  61,
  130,
  130,
  128,
  19,
  17,
  67,
  61,
  130,
  129
]
rciJobs = [
  12,
  10,
  9,
  37,
  36,
  34,
  79,
  76,
  74,
  17,
  17,
  16,
  59,
  59,
  57,
  12,
  12,
  11,
  17,
  17,
  61,
  59,
  12,
  12
]
let fundsLevel = [100000, 75000, 50000]
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


let gameModeNames = ['Road', 'Pan', 'Place', 'Erase', 'Zone', 'Select', 'Rail']
let gameMode = GM_INFO;
let zoneNames = ['Light Residential', 'Medium Residential', 'Dense Residential', 'Light Commercial', 'Medium Commercial', 'Dense Commercial', 'Light Industry', 'Medium Industry', 'Dense Industry', 'Power', 'Water', 'Waste', 'Communication', 'Health', 'Police', 'Fire', 'Education', 'Culture', 'Parks', 'Recreation', 'Government', 'Special', 'Military', 'Transportation']

let sim;
let grid
let gridImage
let gridTrans
let failedTripCount = 0
let successfullTripCount = 0
let tripsAttempted = 0
let commuteTotal = 0
let commuteAverage = 0
let congestionAverage = 0
let noRoad = 0
loadFont("PixelFont", "assets/fonts/QuinqueFive.ttf");
function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
    document.fonts.add(loaded);
  }).catch(function (error) {
    return error;
  });
}
//7.5
let ages = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]
let generations = [
  {
    added: 1900,
    count: 2,
    HQ: 80.10,
    EQ: 12,
  },
  {
    added: 1900,
    count: 5,
    HQ: 78.8985,
    EQ: 20,
  },
  {
    added: 1900,
    count: 6,
    HQ: 77.71502,
    EQ: 28,
  },
  {
    added: 1900,
    count: 7,
    HQ: 76.54929,
    EQ: 36,
  }, {
    added: 1900,
    count: 8,
    HQ: 75.40105,
    EQ: 44,
  },
  {
    added: 1900,
    count: 11,
    HQ: 74.27003,
    EQ: 62,
  },
  {
    added: 1900,
    count: 8,
    HQ: 73.15598,
    EQ: 61,
  },
  {
    added: 1900,
    count: 8,
    HQ: 72.05864,
    EQ: 60,
  },
  {
    added: 1900,
    count: 8,
    HQ: 70.97776,
    EQ: 59,
  },
  {
    added: 1900,
    count: 8,
    HQ: 69.91309,
    EQ: 57,
  },
  {
    added: 1900,
    count: 8,
    HQ: 68.86439,
    EQ: 56,
  },
  {
    added: 1900,
    count: 8,
    HQ: 67.83142,
    EQ: 55,
  },
  {
    added: 1900,
    count: 8,
    HQ: 66.81395,
    EQ: 54,
  },
  {
    added: 1900,
    count: 5,
    HQ: 65.81174,
    EQ: 50,
  },
  {
    added: 1900,
    count: 0,
    HQ: 64.82456,
    EQ: 48,
  },
  {
    added: 1900,
    count: 0,
    HQ: 63.85219,
    EQ: 46,
  },
  {
    added: 1900,
    count: 0,
    HQ: 62.89441,
    EQ: 5,
  },
  {
    added: 1900,
    count: 0,
    HQ: 61.95099,
    EQ: 5,
  }
]
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