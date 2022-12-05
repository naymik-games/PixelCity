


//reference

/////////////////////////////////////////////////////////////////////////////////
// HELPER/UTILITY
///////////////////////////////////////////////////////////////////////////////
function getBuildableCount() {
  var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      if (tile.zone > -1 && tile.zone < 9) {
        if (!waterInRange(tile.xy) || !roadInRange(tile.xy) || !powerInRange(tile.xy)) {
          var value = getLandValue(tile.xy)
          var lvIndex = getLVIndex(value)
          var rciIndex = getRCIIndex(tile.zone, lvIndex)
          count[rciIndex] += 1
        }
      }

    }
  }
  return count
}
//getLVIndex(value)
//getRCIIndex(zone, lvIndex)
function getResBuildableCount() {
  var count = 0
  var buildCounts = getBuildableCount()
  for (var i = 0; i < 9; i++) {
    count += buildCounts[i]
  }
  return count
}
function getComBuildableCount() {
  var count = 0
  var buildCounts = getBuildableCount()
  for (var i = 9; i < 18; i++) {
    count += buildCounts[i]
  }

  return count
}
// 012 345 678
function getIndBuildableCount() {
  var count = 0
  var buildCounts = getBuildableCount()
  for (var i = 18; i < 24; i++) {
    count += buildCounts[i]
  }

  return count
}
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
function getNeighborPoints(point) {
  var neighbors = []
  var n1 = { x: point.x + 1, y: point.y }
  if (onMap(n1)) {
    neighbors.push(n1)
  }
  var n2 = { x: point.x - 1, y: point.y }
  if (onMap(n2)) {
    neighbors.push(n2)
  }
  var n3 = { x: point.x, y: point.y + 1 }
  if (onMap(n3)) {
    neighbors.push(n3)
  }
  var n4 = { x: point.x, y: point.y - 1 }
  if (onMap(n4)) {
    neighbors.push(n4)
  }
  return neighbors
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
function onMap(mapXY) {
  if (mapXY.x < 0 || mapXY.x > mapConfig.width - 1 || mapXY.y < 0 || mapXY.y > mapConfig.height - 1) {
    return false
  } else {
    return true
  }
}
/* // Convert 33 from a 0-100 range to a 0-65535 range
* var n = scaleValue(33, [0,100], [0,65535]);
*
* // Ranges don't have to be positive
* var n = scaleValue(0, [-50,+50], [0,65535]);
*value to scale, array of min,max of value range, array of scale range, boolean to round result
* Ranges are defined as arrays of two values, inclusive
*
* The ~~ trick on return value does the equivalent of Math.floor, just faster.
*
*/
function scaleValue(value, from, to, round) {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  if (round) {
    return ~~(capped * scale + to[0]);
  } else {
    return (capped * scale + to[0]);
  }

}


////////////////////////////////////////////////////////////////////////////////
// MAP
////////////////////////////////////////////////////////////////////////////////
function buildingsDim() {
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = gridImage[y][x]
      if (tile.building != null) {
        tile.building.setAlpha(.3)
      }
    }
  }

}
function buildingsBright() {
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = gridImage[y][x]
      if (tile.building != null) {
        tile.building.setAlpha(1)
      }
    }
  }

}



function getDistanceAlt(point1, point2) {
  return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y)
}
function getDistance(point1, point2) {
  var a = point1.x - point2.x;
  var b = point1.y - point2.y;

  var c = Math.hypot(a, b)
  return c
}
function validPoint(x, y) {
  return x >= 0 && x < sim.gameData.mapConfig.width && y >= 0 && y < sim.gameData.mapConfig.height
}
function getPoint(x, y) {
  return { x: x, y: y }
}
function clamp(value, min, max) {
  if (value < min)
    return min;
  if (value > max)
    return max;

  return value;
};
function perc2color(perc) {

  var r, g, b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  }
  else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  //return ('000000' + h.toString(16)).slice(-6)
  return '0x' + ('000000' + h.toString(16)).slice(-6);
}
function create2DArrayValue(numRows, numColumns) {
  let array = new Array(numRows);

  for (let i = 0; i < numRows; i++) {
    array[i] = new Array(numColumns).fill(0);
  }

  return array;
}
function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {

  var color1 = rgbColor1;
  var color2 = rgbColor2;
  var fade = fadeFraction;

  // Do we have 3 colors for the gradient? Need to adjust the params.
  if (rgbColor3) {
    fade = fade * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      color1 = rgbColor2;
      color2 = rgbColor3;
    }
  }

  var diffRed = color2.red - color1.red;
  var diffGreen = color2.green - color1.green;
  var diffBlue = color2.blue - color1.blue;

  var gradient = {
    red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
    green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
    blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
  };

  //return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';

  var h = gradient.red * 0x10000 + gradient.green * 0x100 + gradient.blue * 0x1;
  //return ('000000' + h.toString(16)).slice(-6)
  return '0x' + ('000000' + h.toString(16)).slice(-6);

}
/*
var color1 = {
  red: 19, green: 233, blue: 19
};
var color3 = {
  red: 255, green: 0, blue: 0
};
var color2 = {
  red: 255, green: 255, blue: 0
};
var col = colorGradient(.99, color3, color2, color1) */

/*
let mapConfig = {
  width: 64,
  height: 64,
  eastCost: false,
  westCost: true,
  northCost: false,
  southCost: true,
  eWRiver: true,
  nSRiver: false,
  numLakes: 1


} */

//reference
/* let zoneNames = [
  0 'Light Residential', 
  1 'Medium Residential', 
  2 'Dense Residential', 
  3 'Light Commercial', 
  4 'Medium Commercial', 
  5 'Dense Commercial', 
  6 'Clean Industry', 
  7 'Dirty Industry', 
  8 'Dirty Industry', 
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
  ] */