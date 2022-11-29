////////////////////////////////////////////////////////////////////////////////////
// TRAFFIC
////////////////////////////////////////////////////////////////////////////////////
function driveTimes() {

  // console.log('drive times')
  gridTrans = null
  gridTrans = create2DArrayValue(mapConfig.width, mapConfig.height)
  createRoadMap()
  failedTripCount = 0
  successfullTripCount = 0
  tripsAttempted = 0
  commuteAverage = 0
  commuteTotal = 0
  var com = sim.gameData.zoneCounts[3] + sim.gameData.zoneCounts[4] + sim.gameData.zoneCounts[5]
  var ind = sim.gameData.zoneCounts[6] + sim.gameData.zoneCounts[7] + sim.gameData.zoneCounts[8]
  var total = com + ind
  var comPer = (com / total) - .05
  var indPer = (ind / total) - .05
  // console.log('com per:' + comPer + ' ind per: ' + indPer)
  for (var y = 0; y < sim.gameData.mapConfig.height; y++) {
    for (var x = 0; x < sim.gameData.mapConfig.width; x++) {
      if (Phaser.Math.Between(1, 100) < 26) {
        if (grid[y][x].zone == 0 || grid[y][x].zone == 1 || grid[y][x].zone == 2) {
          var rand = Math.random()
          var dest
          if (rand < comPer) {
            //dest = [3, 4, 5]
            dest = 'com'
          } else if (rand < total) {
            //dest = [6, 7, 8]
            dest = 'ind'
          } else {
            //dest = [0, 1, 2]
            dest = 'res'
          }
          // var test = aStar({ x: x, y: y }, dest, getDensityMultiplier(grid[y][x].zone))
          var tr = tryDriveTo({ x: x, y: y }, dest, getDensityMultiplier(grid[y][x].zone))
          //console.log(tr)
          if (tr) {
            // grid[y][x].driveToWork = tr;
          } else {
            // grid[y][x].driveToWork = 0
          }
        } else if (grid[y][x].zone == 3 || grid[y][x].zone == 4 || grid[y][x].zone == 5) {
          var rand = Math.random()
          var dest
          if (rand < .70) {
            //dest = [0, 1, 2]
            dest = 'res'
          } else if (rand < .9) {
            //dest = [6, 7, 8]
            dest = 'ind'
          } else {
            // dest = [3, 4, 5]
            dest = 'com'
          }
          var tr = tryDriveTo({ x: x, y: y }, dest, getDensityMultiplier(grid[y][x].zone))
        } else if (grid[y][x].zone == 6 || grid[y][x].zone == 7 || grid[y][x].zone == 8) {
          var rand = Math.random()
          var dest
          if (rand < .50) {
            //dest = [0, 1, 2]
            dest = 'res'
          } else if (rand < .3) {
            // dest = [6, 7, 8]
            dest = 'ind'
          } else {
            //. dest = [3, 4, 5]
            dest = 'com'
          }
          var tr = tryDriveTo({ x: x, y: y }, dest, getDensityMultiplier(grid[y][x].zone))
        }
      }
    }
  }
  //console.log(gridTrans)
  //console.log('failed ' + failedTripCount)
  //console.log('success ' + successfullTripCount)
  //console.log('attempted ' + tripsAttempted)
  //console.log('total commute ' + commuteTotal)
  commuteAverage = Math.round(commuteTotal / successfullTripCount)// * (1 + (failedTripCount * sim.gameData.mapConfig.size)
  //console.log('Average commute ' + commuteAverage)
  congestionAverage = getAverageCongestion()
  //console.log(gridTrans)
}

function tryDriveTo(point, target, density) {
  tripsAttempted++
  var road = findRoad(point);
  //console.log(road)
  if (!road) {
    failedTripCount++
    return -1;
  }
  if (target == 'res') {
    var target1 = getRandomResTile()
  } else if (target == 'com') {
    var target1 = getRandomComTile()
  } else if (target == 'ind') {
    var target1 = getRandomIndTile()
  }
  if (target1 == null) { return }
  var roadT = findRoad(target1);
  //console.log(roadT)
  if (!roadT) {
    failedTripCount++
    return -1;
  }

  //console.log(roadT)
  var graph = new Graph(gridTrans);
  //console.log(graph)
  var start = graph.grid[road.y][road.x];
  var end = graph.grid[roadT.y][roadT.x];
  var result = astar.search(graph, start, end);
  //console.log(result)
  if (result.length > 0) {
    successfullTripCount++
    commuteTotal += result.length
    addCongestion(result, density)
  } else {
    failedTripCount++

  }
}
/* function tryDriveTo_(point, target, density) {
  // console.log(point)
  tripsAttempted++
  var road = findRoad(point);
  //	console.log(road)
  if (!road) {
    failedTripCount++
    return -1;
  }
  if (target == 'res') {
    var target1 = getRandomResTile()
  } else if (target == 'com') {
    var target1 = getRandomComTile()
  } else if (target == 'ind') {
    var target1 = getRandomIndTile()
  }
  if (target1 == null) { return }
  var route = [];

  //Maximum steps to try driving to destination
  var maxDist = 200;
  var lastPos = null;
  var currentPos = road;
  var targetFound = false;
  var found = -1;
  for (var distance = 0; distance < maxDist; distance++) {
    var pos = findNextRoad({ x: currentPos.x, y: currentPos.y }, lastPos);

    //No road found
    if (pos == null) {
      //Go back if possible
      if (lastPos != null) {
        pos = lastPos;
        lastPos = currentPos;
        currentPos = pos;
        // distance += 3;
      }
      else {
        failedTripCount++
        return false;

      }
    }
    //Found road so go there
    else {
      lastPos = currentPos;
      currentPos = pos;
      gridTrans[pos.y][pos.x] += density
      //every other
      //	if(distance & 1) {
      route.push(pos);
      //	}
      found = findTargetTile(pos, target1)
      if (found) {
        targetFound = true;
        break;
      }
    }
  }

  if (!targetFound) {
    failedTripCount++
    return false;
  } else {
    // console.log('route length ' + route.length + ' startX ' + point.x + ',startY ' + point.y)
    //console.log(route)
    successfullTripCount++

    return route.length
  }


  //return true;
} */
/* function findNextRoad(point, prevPos) {
  //offsets for up, down, left, right for moving
  var posX = [-1, 1, 0, 0];
  var posY = [0, 0, -1, 1];

  if (!prevPos) {
    prevPos = { x: -1, y: -1 };
  }

  var directions = [];
  for (var i = 0; i < 4; i++) {
    var xx = point.x + posX[i];
    var yy = point.y + posY[i];
    //console.log(point)
    //console.log('xx ' + xx + ', yy ' + yy)
    if (!(xx == prevPos.x && yy == prevPos.y) && isRoad({ x: xx, y: yy })) {
      directions.push({ x: xx, y: yy });
    }
  }

  var options = directions.length;
  if (options == 0) {
    return null;
  }

  if (options == 1) {
    return directions[0];
  }

  return directions[Phaser.Math.Between(0, directions.length - 1)];
} */
/* function findTarget(pos, target) {
  //offsets for up, down, left, right
  var posX = [-1, 1, 0, 0];
  var posY = [0, 0, -1, 1];
  var tiles = getTilesInRange(pos, gameRules.roadRange);
  for (var i = 0; i < tiles.length; i++) {
    //var xx = pos.x + posX[i];
    //var yy = pos.y + posY[i];
    for (var j = 0; j < target.length; j++) {
      if (validPoint(tiles[i].xy.x, tiles[i].xy.y) && tiles[i].zone == target[j]) {
        return true;
      }
    }
  }

  return false;
} */
/* function findTargetTile(pos, target) {
  //offsets for up, down, left, right
  var posX = [-1, 1, 0, 0];
  var posY = [0, 0, -1, 1];
  var tiles = getTilesInRange(pos, gameRules.roadRange);
  for (var i = 0; i < tiles.length; i++) {
    //var xx = pos.x + posX[i];
    //var yy = pos.y + posY[i];

    if (validPoint(tiles[i].xy.x, tiles[i].xy.y) && tiles[i].xy.x == target.x && tiles[i].xy.y == target.y) {
      return true;
    }

  }

  return false;
} */
function roadInRange(point) {
  var tiles = getTilesInRange(point, gameRules.roadRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].type == 'road' || tiles[i].type == 'rail') {
      return true
    }
  }
  return false
}
function findRoad(point) {
  var availableRoads = []
  var tiles = getTilesInRange(point, gameRules.roadRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].type == 'road' || tiles[i].type == 'rail') {
      //return tiles[i].xy
      availableRoads.push(tiles[i].xy)
    }
  }
  if (availableRoads.length > 0) {
    return availableRoads[Phaser.Math.Between(0, availableRoads.length - 1)]
  } else {
    return false
  }

}
function isRoad(point) {
  if (grid[point.y][point.x].type == 'road' || grid[point.y][point.x].type == 'rail') {
    return true
  }
  return false
}
function createRoadMap() {
  for (var y = 0; y < sim.gameData.mapConfig.height; y++) {
    for (var x = 0; x < sim.gameData.mapConfig.width; x++) {
      if (isRoad({ x: x, y: y })) {
        gridTrans[y][x] = 1
      }
    }
  }
  //console.log(gridTrans)
}
function getAverageCongestion() {
  var count = 0
  var conTotal = 0
  for (var y = 0; y < sim.gameData.mapConfig.height; y++) {
    for (var x = 0; x < sim.gameData.mapConfig.width; x++) {
      if (gridTrans[y][x] > 1) {
        conTotal += gridTrans[y][x]
        count++
      }
    }
  }
  return Math.round(conTotal / count)
}
function addCongestion(path, density) {
  for (var i = 0; i < path.length; i++) {


    gridTrans[path[i].x][path[i].y] += 1 * density
  }
}
function getDensityMultiplier(zone) {
  if (zone == 0 || zone == 3 || zone == 6) {
    return 1
  } else if (zone == 1 || zone == 4 || zone == 7) {
    return 2
  } else if (zone == 2 || zone == 5 || zone == 8) {
    return 3
  }
}
function setNoRoad() {
  noRoad = 0
  var totalLV = 0
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      if (tile.building != null) {
        if (!findRoad(tile.xy)) {
          gridImage[y][x].building.setTint(0x8E8E8E)
          noRoad++
        } else {
          gridImage[y][x].building.clearTint()
        }


      }

    }
  }
  //console.log('no road ' + noRoad)

}