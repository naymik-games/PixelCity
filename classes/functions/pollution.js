////////////////////////////////////////////////////////////////////////////////////////
// POLLUTION
////////////////////////////////////////////////////////////////////////////////////////
function addPollution(point, data) {
  //air

  var tiles = this.getTilesInRange(point, data.airPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {

    var d = getDistanceAlt(point, tiles[i].xy)
    var v = data.airPollutionRadius - (d - 1)
    var per = v / data.airPollutionRadius
    tiles[i].pollution[0] = tiles[i].pollution[0] + Math.round(data.airPollution * per)


  }
  //water
  var tiles = this.getTilesInRange(point, data.waterPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    var d = getDistanceAlt(point, tiles[i].xy)
    var v = data.waterPollutionRadius - (d - 1)
    var per = v / data.waterPollutionRadius
    tiles[i].pollution[1] = tiles[i].pollution[1] + Math.round(data.waterPollution * per)


  }
}
function removePollution(point, data) {
  //air
  var tiles = this.getTilesInRange(point, data.airPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    var d = getDistanceAlt(point, tiles[i].xy)
    // console.log(d)
    var v = data.airPollutionRadius - (d - 1)
    var per = v / data.airPollutionRadius
    tiles[i].pollution[0] -= clamp(tiles[i].pollution[0] + Math.round(data.airPollution * per), 0, 100000)
  }
  //water
  var tiles = this.getTilesInRange(point, data.waterPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    var d = getDistanceAlt(point, tiles[i].xy)
    // console.log(d)
    var v = data.airPollutionRadius - (d - 1)
    var per = v / data.airPollutionRadius
    tiles[i].pollution[1] -= clamp(tiles[i].pollution[1] + Math.round(data.airPollution * per), 0, 100000)
  }
}
function updatePollution() {
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      tile.pollution[0] = 0
      tile.pollution[1] = 0
    }
  }
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]

      if (tile.menu != null) {
        var point = { x: x, y: y }
        addPollution(point, buildMenu[tile.parentMenu].subMenu[tile.menu])
      }
    }
  }
}