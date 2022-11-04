class Building {
  constructor(scene, x, y, ind) {
    this.x = x
    this.y = y
    //this.id = count
    this.direction = null
    this.size = 1

    this.hasWater = false
    this.hasRoad = false
    this.hasBuilding = false


    this.xy = {
      x: x,
      y: y
    }

    var isoXY = scene.toIso(x, y)
    var tile = scene.add.image(centerX + isoXY.x, centerY + isoXY.y, 'tiles', ind).setOrigin(.5, 1);
    tile.setDepth(centerY + isoXY.y);
    scene.add.existing(tile);


    this.tile = tile


  }
}