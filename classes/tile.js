class Tile {
  constructor(scene, x, y, ind) {
    this.x = x
    this.y = y
    //this.id = count
    this.direction = null
    this.size = 1
    if (ind == 0) {
      this.terrain = 'concrete'
    } else if (ind == 1) {
      this.terrain = 'dirt'
    } else if (ind == 2) {
      this.terrain = 'water'
    } else if (ind == 3) {
      this.terrain = 'grass'
    } else if (ind == 4) {
      this.terrain = 'sand'
    }
    this.type = 'blank'
    this.hasWater = false
    this.hasPower = false
    this.hasRoad = false
    this.hasBuilding = false
    this.partOf = null
    this.menu = null
    this.parentMenu = null
    this.zone = -1
    this.localLandValue = 0
    this.pollution = [0, 0, 0]
    this.xy = {
      x: x,
      y: y
    }

    var isoXY = scene.toIso(x, y)
    var tile = scene.add.image(centerX + isoXY.x, centerY + isoXY.y + 8, 'tiles', ind).setOrigin(.5, 1);

    tile.setDepth(centerY + isoXY.y - 16);
    scene.add.existing(tile);
    gridImage[y][x].tile = tile
    gridImage[y][x].building = null
    gridImage[y][x].road = null
    var imageInfo = { sheet: 'tiles', frame: ind }

    this.buildingData = {
      name: null,
      added: null,

    }

    this.tile = imageInfo
    this.building = null
    this.road = null

  }
}