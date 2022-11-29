


//reference





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