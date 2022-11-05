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
let mapConfigDefault = {
  width: 16,
  height: 16,
  eastCost: true,
  westCost: false,
  northCost: false,
  southCost: true,
  eWRiver: false,
  nSRiver: false,
  numLakes: 0

}
let tileWidth, tileHeight, tileWidthHalf, tileHeightHalf, centerX, centerY
let gameData
let gameDataSaved
let mapLoad = 'new'
let gameStats = {
  day: 1,
  year: 1900,
  funds: 10000,
  population: 100,
  globalLV: [0, 0, 0, 0],
  specialJobs: 0,
  powerPlants: [],
  zoneCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rci: [0, 0, 0]
}

let gameRules = {
  roadRange: 4,
  dayLength: 24000
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
let zoneNames = ['Light Residential', 'Medium Residential', 'Dense Residential', 'Light Commercial', 'Medium Commercial', 'Dense Commercial', 'Clean Industry', 'Dirty Industry', 'Power', 'Water', 'Waste', 'Communication', 'Health', 'Police', 'Fire', 'Education', 'Culture', 'Parks', 'Recreation', 'Government', 'Special', 'Military', 'Transportation']

let sim;
let grid