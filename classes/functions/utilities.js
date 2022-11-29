//////////////////////////////////////////////////////////////////////////////
// POWER/WATER
////////////////////////////////////////////////////////////////////////////
function getPowerConsumption() {
  var resCapacity = (sim.gameData.zoneCounts[0] * 3) + (sim.gameData.zoneCounts[1] * 12) + (sim.gameData.zoneCounts[2] * 50)
  var comCapacity = (sim.gameData.zoneCounts[3] * 6) + (sim.gameData.zoneCounts[4] * 20) + (sim.gameData.zoneCounts[5] * 80)
  var indCapacity = (sim.gameData.zoneCounts[6] * 12) + (sim.gameData.zoneCounts[7] * 64) + (sim.gameData.zoneCounts[8] * 64)
  var otherCapacity = 0
  for (i = 9; i < sim.gameData.zoneCounts.length; i++) {
    if (i == 19) {
      otherCapacity += sim.gameData.zoneCounts[i] * 5
    } else if (i == 22) {
      otherCapacity += sim.gameData.zoneCounts[i] * 1000
    } else if (i == 23) {
      otherCapacity += sim.gameData.zoneCounts[i] * 1
    } else if (i == 17 || i == 16) {
      otherCapacity += sim.gameData.zoneCounts[i] * 20
    } else {
      otherCapacity += sim.gameData.zoneCounts[i] * 100
    }

  }
  var totalCapicity = resCapacity + comCapacity + indCapacity + otherCapacity
  return [resCapacity, comCapacity, indCapacity, otherCapacity, totalCapicity]
}
function addPowerPlant(mapXY, id, yearAdded) {
  sim.gameData.powerPlants.push([mapXY, id, yearAdded])
}
function addWaterPlant(mapXY, id, yearAdded) {
  sim.gameData.waterPlants.push([mapXY, id, yearAdded])
}
function removePowerPlant(mapxy) {
  var ind = -1
  for (var i = 0; i < sim.gameData.powerPlants.length; i++) {
    var station = sim.gameData.powerPlants[i][0]
    if (station.x == mapxy.x && station.y == mapxy.y) {
      ind = i
    }
  }
  if (ind > -1) {
    sim.gameData.powerPlants.splice(ind, 1)
  }
}
function removeWaterPlant(mapxy) {
  var ind = -1
  for (var i = 0; i < sim.gameData.waterPlants.length; i++) {
    var station = sim.gameData.waterPlants[i][0]
    if (station.x == mapxy.x && station.y == mapxy.y) {
      ind = i
    }
  }
  if (ind > -1) {
    sim.gameData.waterPlants.splice(ind, 1)
  }
}
function waterInRange(point) {
  //0 1 5
  var smallTower = false
  var waterPump = false
  var largeTower = false

  var tiles = getTilesInRange(point, buildMenu[2].subMenu[0].waterRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 0 && tiles[i].parentMenu == 2) {
      smallTower = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[1].waterRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 1 && tiles[i].parentMenu == 2) {
      waterPump = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[5].waterRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 5 && tiles[i].parentMenu == 2) {
      largeTower = true
    }
  }
  if (smallTower || largeTower || waterPump) {
    return true
  } else {
    return false
  }
}
function powerInRange(point) {
  //0 1 5
  var coal = false //3
  var wind = false //6
  var solar = false //7
  var gas = false //9
  var fusion = false //10
  var nuclear = false //11

  var tiles = getTilesInRange(point, buildMenu[2].subMenu[3].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 3 && tiles[i].parentMenu == 2) {
      coal = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[6].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 6 && tiles[i].parentMenu == 2) {
      wind = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[7].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 7 && tiles[i].parentMenu == 2) {
      solar = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[9].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 9 && tiles[i].parentMenu == 2) {
      gas = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[10].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 10 && tiles[i].parentMenu == 2) {
      fusion = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[11].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 11 && tiles[i].parentMenu == 2) {
      nuclear = true
    }
  }
  if (coal || wind || solar || gas || fusion || nuclear) {
    return true
  } else {
    return false
  }
}