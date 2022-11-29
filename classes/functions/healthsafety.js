////////////////////////////////////////////////////////////////////////////////////////
// HEALTH SAFETY
////////////////////////////////////////////////////////////////////////////////////////
function addCrime(point, data) {
  //crime
  if (data.crime == 0) { return }
  if (data.zone < 9) {
    var lv = getLandValue(point)
    var tiles = this.getTilesInRange(point, data.crimeRadius[lv.lvIndex])
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].crime = tiles[i].crime + data.crime[lv.lvIndex]
    }
  } else {
    var tiles = this.getTilesInRange(point, data.crimeRadius)
    for (var i = 0; i < tiles.length; i++) {
      // var d = Math.round(getDistance(point, tiles[i].xy))
      tiles[i].crime = tiles[i].crime + data.crime
    }
  }
}
function removeCrime(point, data) {
  //crime
  if (data.crime == 0) { return }
  if (data.zone < 9) {
    var lv = getLandValue(point)
    var tiles = this.getTilesInRange(point, data.crimeRadius[lv.lvIndex])
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].crime = tiles[i].crime - data.crime[lv.lvIndex]
    }
  } else {
    var tiles = this.getTilesInRange(point, data.crimeRadius)
    for (var i = 0; i < tiles.length; i++) {
      // var d = Math.round(getDistance(point, tiles[i].xy))
      tiles[i].crime = tiles[i].crime - data.crime
    }
  }

}
function addPoliceStation(mapXY, id, yearAdded) {
  sim.gameData.policeStations.push([mapXY, id, yearAdded])
}

function removePoliceStation(mapxy) {
  var ind = -1
  for (var i = 0; i < sim.gameData.policeStations.length; i++) {
    var station = sim.gameData.policeStations[i][0]
    if (station.x == mapxy.x && station.y == mapxy.y) {
      ind = i
    }
  }
  if (ind > -1) {
    sim.gameData.policeStations.splice(ind, 1)
  }
}
function policeInRange(point) {
  //0 1 5
  var ps = 0
  // var ph = 0
  var policePer = sim.gameData.maintenanceCostsPer[14]
  var radPS = gameRules.phRadius - getCovSub(policePer)

  var radPH = gameRules.phRadius - getCovSub(policePer)

  var tiles = getTilesInRange(point, radPS)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 2 && tiles[i].parentMenu == 3) {
      ps++
    }
  }
  var tiles = getTilesInRange(point, radPH)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 5 && tiles[i].parentMenu == 3) {
      ps += 2
    }
  }
  //console.log(ps)
  return ps
  /* if (ps || ph) {
    return true
  } else {
    return false
  } */
}
function getCrimeAfterCoverage(point, crime) {
  var crimefighting = policeInRange(point)
  var finalCrime = 0
  if (crimefighting == 0) {
    finalCrime = crime
  } else if (crimefighting == 1) {
    finalCrime = crime * .75
  } else if (crimefighting == 2) {
    finalCrime = crime * .5
  } else if (crimefighting >= 3) {
    finalCrime = crime * .25
  }
  return finalCrime
}
function getAverageCrime() {
  var count = 0
  var totalC = 0
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      if (tile.hasBuilding) {

        totalC += tile.crime
        count++
      }

    }
  }
  console.log('total' + totalC + 'count ' + count)
  /*  if (totalC < 1) {
     totalC = 1
   } */
  return Math.round(totalC / count)
}
function addHospital(capacity) {
  sim.gameData.hospitalCapacity += capacity
}
function removeHospital(capacity) {
  sim.gameData.hospitalCapacity -= capacity
}
function getHq() {

  var wfHqTotal = 0
  var pHqTotal = 0
  for (var i = 0; i < sim.gameData.generations.length; i++) {
    if (i > 4 && i < 13) {
      wfHqTotal += sim.gameData.generations[i].HQ
    }
    pHqTotal += sim.gameData.generations[i].HQ
  }
  return { pHQ: Math.round(pHqTotal / sim.gameData.generations.length), wfHQ: Math.round(wfHqTotal / 8) }
}
function hqDecay() {
  for (var i = 0; i < sim.gameData.generations.length; i++) {
    sim.gameData.generations[i].HQ -= sim.gameData.generations[i].HQ * .015
  }
}