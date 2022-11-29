
////////////////////////////////////////////////////////////////////////////////////////
// EDUCATION
////////////////////////////////////////////////////////////////////////////////////////
function addSchool(capacity) {
  sim.gameData.schoolCapacity += capacity
}
function removeSchool(capacity) {
  sim.gameData.schoolCapacity -= capacity
}
function addCollege(capacity) {
  sim.gameData.collegeCapacity += capacity
}
function removeCollege(capacity) {
  sim.gameData.collegeCapacity -= capacity
}
function getEq() {

  var wfEqTotal = 0
  var pEqTotal = 0
  for (var i = 0; i < sim.gameData.generations.length; i++) {
    if (i > 4 && i < 13) {
      wfEqTotal += sim.gameData.generations[i].EQ
    }
    pEqTotal += sim.gameData.generations[i].EQ
  }
  return { pEQ: Math.round(pEqTotal / sim.gameData.generations.length), wfEQ: Math.round(wfEqTotal / 8) }
}
function eqDecay() {
  for (var i = 0; i < sim.gameData.generations.length; i++) {
    if (i > 4) {
      sim.gameData.generations[i].EQ -= sim.gameData.generations[i].EQ * .0191
    }

  }
}
function parentalEducation() {

  var eq = getEq()

  sim.gameData.generations[1].EQ += eq.wfEQ / 50
  sim.gameData.generations[2].EQ += eq.wfEQ / 50

  var numOf10 = Math.ceil(sim.gameData.population * (sim.gameData.generations[1].count / 100))
  var numOf15 = Math.ceil(sim.gameData.population * (sim.gameData.generations[2].count / 100))
  var numOf20 = Math.ceil(sim.gameData.population * (sim.gameData.generations[3].count / 100))
  var numOf25 = Math.ceil(sim.gameData.population * (sim.gameData.generations[4].count / 100))

  var numInSchool = numOf10 + numOf15 + numOf20
  if (sim.gameData.schoolCapacity == 0) {
    var eqAdd = 0
  }
  else if (numInSchool <= sim.gameData.schoolCapacity) {
    sim.gameData.generations[1].EQ += .105 - getEduSub(sim.gameData.maintenanceCostsPer[16])
    sim.gameData.generations[2].EQ += .105 - getEduSub(sim.gameData.maintenanceCostsPer[16])
    sim.gameData.generations[3].EQ += .105 - getEduSub(sim.gameData.maintenanceCostsPer[16])
  }

  if (sim.gameData.collegeCapacity == 0) {
    var eqAdd = 0
  }
  else if (numOf25 <= sim.gameData.collegeCapacity) {
    sim.gameData.generations[4].EQ += 3 - getEduSub(sim.gameData.maintenanceCostsPer[16])
  }
  console.log('count up to 10 ' + numOf10 + 'count up to 15 ' + numOf15)


}
/////////////////////////////////////////////////////////////////////////////////
// HELPER/UTILITY
///////////////////////////////////////////////////////////////////////////////
function getTilesInRange(point, range) {
  var tilesInRange = [];
  for (var y = point.y - range; y <= point.y + range; y++) {
    for (var x = point.x - range; x <= point.x + range; x++) {
      if (this.validPoint(x, y)) {
        tilesInRange.push(grid[y][x])
      }

    }
  }
  return tilesInRange
}

function getRandomIndTile() {

  var ind = sim.gameData.zoneCounts[6] + sim.gameData.zoneCounts[7] + sim.gameData.zoneCounts[8]
  if (ind == 0) {
    return null
  }
  var found = false
  while (!found) {
    var ranX = Phaser.Math.Between(0, sim.gameData.mapConfig.width - 1)
    var ranY = Phaser.Math.Between(0, sim.gameData.mapConfig.height - 1)
    if (grid[ranY][ranX].zone == 6 || grid[ranY][ranX].zone == 7 || grid[ranY][ranX].zone == 7) {
      found = true
      return { x: ranX, y: ranY }
    }
  }
}
function getRandomResTile() {

  var res = sim.gameData.zoneCounts[0] + sim.gameData.zoneCounts[1] + sim.gameData.zoneCounts[2]
  if (res == 0) {
    return null
  }
  var found = false
  while (!found) {
    var ranX = Phaser.Math.Between(0, sim.gameData.mapConfig.width - 1)
    var ranY = Phaser.Math.Between(0, sim.gameData.mapConfig.height - 1)
    if (grid[ranY][ranX].zone == 0 || grid[ranY][ranX].zone == 1 || grid[ranY][ranX].zone == 2) {
      found = true
      return { x: ranX, y: ranY }
    }
  }
}
function getRandomComTile() {
  var com = sim.gameData.zoneCounts[3] + sim.gameData.zoneCounts[4] + sim.gameData.zoneCounts[5]
  if (com == 0) {
    return null
  }
  var found = false
  while (!found) {
    var ranX = Phaser.Math.Between(0, sim.gameData.mapConfig.width - 1)
    var ranY = Phaser.Math.Between(0, sim.gameData.mapConfig.height - 1)
    if (grid[ranY][ranX].zone == 3 || grid[ranY][ranX].zone == 4 || grid[ranY][ranX].zone == 5) {
      found = true
      return { x: ranX, y: ranY }
    }
  }
}
function getCovSub(per) {
  var sub = 0
  if (per > 110) {
    sub = -3
  } else if (per > 100) {
    sub = -2
  } else if (per == 100) {
    sub = 0
  } else if (per < 60) {
    sub = 5
  } else if (per < 70) {
    sub = 4
  } else if (per < 80) {
    sub = 3
  } else if (per < 90) {
    sub = 2
  } else if (per < 100) {
    sub = 1
  }
  return sub
}
function getEduSub(per) {
  var sub = 0
  if (per > 110) {
    sub = -.05
  } else if (per > 100) {
    sub = -.025
  } else if (per == 100) {
    sub = 0
  } else if (per < 60) {
    sub = .025
  } else if (per < 70) {
    sub = .05
  } else if (per < 80) {
    sub = .075
  } else if (per < 90) {
    sub = .1
  } else if (per < 100) {
    sub = .125
  }
  return sub
}