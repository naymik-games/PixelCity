let game;


window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },
    //pixelArt: true,
    // roundPixels: true,

    dom: {
      createContainer: true
    },
    scene: [preloadGame, startGame, playGame, UI, Menu, Info, People, Rci, Power, Finance]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {

    super('playGame');


  }
  preload() {
    var url;
    url = 'classes/pinch.min.js'
    //url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
    // url2 = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js';
    this.load.plugin('rexpinchplugin', url, true);


  }
  create() {


    if (mapLoad == 'load') {
      mapConfig = gameDataSaved.mapConfig
      // grid = JSON.parse(localStorage.getItem('PixelCityGrid'));


      sim = new Sim(this, gameDataSaved, mapConfig)

      tileWidth = 32;
      tileHeight = 16;
      tileWidthHalf = 16;
      tileHeightHalf = 8;
      centerX = (mapConfig.width / 2) * tileWidth;
      centerY = 600;

      let temp = this
      localforage.getItem('PixelCityGrid1').then(function (value) {
        // This code runs once the value has been loaded
        // from the offline store.
        console.log(value);

        temp.loadMap(value)
      }).catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });









    } else {

      sim = new Sim(this, gameStats, mapConfig)

      tileWidth = 32;
      tileHeight = 16;
      tileWidthHalf = 16;
      tileHeightHalf = 8;
      centerX = (mapConfig.width / 2) * tileWidth;
      centerY = 600;


      this.createMap()
    }



    //console.log(sim.gameData.day)

    this.scene.launch('UI')

    this.cameras.main.setBackgroundColor(0x0CB8F9);
    var dragScale = this.plugins.get('rexpinchplugin').add(this);
    this.drag = false;
    dragScale
      .on('drag1', function (dragScale) {
        if (this.drag) {
          var drag1Vector = dragScale.drag1Vector;
          this.cameras.main.scrollX -= drag1Vector.x / this.cameras.main.zoom;
          this.cameras.main.scrollY -= drag1Vector.y / this.cameras.main.zoom;
        }
        //this.drag = true;
      }, this)
      .on('pinch', function (dragScale) {
        if (this.drag) {
          var scaleFactor = dragScale.scaleFactor;
          this.cameras.main.zoom *= scaleFactor;
        }
      }, this)





    //this.buildings = this.create2DArray(mapConfig.width, mapConfig.height)




    this.UI = this.scene.get('UI');
    var Menu = this.scene.get('Menu');
    this.UI.events.on('cursor', function () {
      this.toggleCursor()
    }, this);
    /* var isoXY = this.toIso(5, 5)
    var tile = this.add.image(centerX + isoXY.x, centerY + isoXY.y, 'tilesx3', 1).setOrigin(.5, 1);
    tile.setDepth(centerY + isoXY.y); */



    const cursors = this.input.keyboard.createCursorKeys();

    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.04,
      drag: 0.0005,
      maxSpeed: 0.7
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    this.cameras.main.zoom = 5;
    //this.cameras.main.scrollX = -210;
    this.cameras.main.centerOn(centerX, centerY + 200)

    this.graphics = this.add.graphics(),
      this.graphics.lineStyle(5, 0x262B44, 2);
    this.graphics.fillStyle(0x00ff00, 1)

    this.selected = []
    this.dragType = 'place'

    //////////////////////////////////////////
    // menu listeners
    //////////////////////////////////////////
    Menu.events.on('zone', function (data) {
      this.zoneData = data
      // console.log(this.zoneData)
    }, this);
    Menu.events.on('transport', function (data) {
      this.transportType = data
      console.log(this.transportType)
    }, this);
    Menu.events.on('place', function (data) {
      if (this.drag) {
        this.drag = false;
        this.UI.togglePan()
      }
      this.dragType = 'place'
      console.log(this.cameras.main.centerX)
      console.log(this.cameras.main.centerY)
      var test = this.cameras.main.getWorldPoint(this.cameras.main.centerX, this.cameras.main.centerY)
      //const screenCenterX = this.cameras.main.worldView.x + game.config.width / 2;
      // const screenCenterY = this.cameras.main.worldView.y + game.config.height / 2;
      var pageX = test.x - centerX + tileWidthHalf
      var pageY = test.y - centerY + tileHeightHalf
      var mapXY = this.toMap(pageX, pageY)
      console.log(mapXY)
      this.placeData = data
      console.log(this.placeData)
      var isoXY = this.toIso(mapXY.x, mapXY.y)
      this.selectCursor = this.add.image(centerX + isoXY.x, centerY + isoXY.y, 'selectx1', 0).setOrigin(.5, 1).setInteractive();
      this.selectCursor.setDepth(centerY + isoXY.y + 1000);
      this.input.setDraggable(this.selectCursor);
    }, this);


    Menu.events.on('testErase', function (data) {
      if (this.drag) {
        this.drag = false;
        this.UI.togglePan()
      }
      gameMode = GM_PLACE;
      this.dragType = 'erase'
      console.log(this.cameras.main.centerX)
      console.log(this.cameras.main.centerY)
      var test = this.cameras.main.getWorldPoint(this.cameras.main.centerX, this.cameras.main.centerY)
      //const screenCenterX = this.cameras.main.worldView.x + game.config.width / 2;
      // const screenCenterY = this.cameras.main.worldView.y + game.config.height / 2;
      var pageX = test.x - centerX + tileWidthHalf
      var pageY = test.y - centerY + tileHeightHalf
      var mapXY = this.toMap(pageX, pageY)

      var isoXY = this.toIso(mapXY.x, mapXY.y)
      this.selectCursor = this.add.image(centerX + isoXY.x, centerY + isoXY.y, 'selectx1', 4).setOrigin(.5, 1).setInteractive();
      this.selectCursor.setDepth(centerY + isoXY.y + 1000);
      this.input.setDraggable(this.selectCursor);
    }, this);



    this.input.dragDistanceThreshold = 16;
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      if (this.dragType == 'place') {
        this.dragPlace(pointer, gameObject)
      } else {
        this.dragErase(pointer, gameObject)
      }

    }, this);

    this.input.on('dragend', function (pointer, gameObject) {
      if (this.dragType == 'place') {
        this.dragEndPlace(pointer, gameObject)
      } else {
        this.dragEndErase(pointer, gameObject)
      }


    }, this);
    //////////////////////////////////////////



    this.input.on("pointerdown", this.inputDown, this);
    this.input.on("pointermove", this.inputMove, this)
    this.input.on("pointerup", this.inputUp, this)
    // this.cameras.main.setZoom(4)

    /*  
     this.input.on("pointerup", this.removeGems, this);
    */
    //this.drawMapGrid()
  }
  update(time, delta) {
    this.controls.update(delta);
  }

  toIso(x, y) {
    var isoXY = {}
    isoXY.x = (x - y) * tileWidthHalf;
    isoXY.y = (x + y) * tileHeightHalf;
    // screen.x = (map.x - map.y) * TILE_WIDTH_HALF;
    // screen.y = (map.x + map.y) * TILE_HEIGHT_HALF;
    return isoXY
  }
  toMap(x, y) {
    var mapXY = {}
    mapXY.x = Math.floor((x / tileWidthHalf + y / tileHeightHalf) / 2);
    mapXY.y = Math.floor((y / tileHeightHalf - x / tileWidthHalf) / 2);

    mapXY.y += 1
    // mapXY.x = (x / tileWidthHalf + y / tileHeightHalf) / 2;
    //mapXY.y = (y / tileHeightHalf - (x / tileWidthHalf)) / 2;
    return mapXY
  }
  dragErase(pointer, gameObject) {
    gameObject.x = pointer.worldX;
    gameObject.y = pointer.worldY;
    gameObject.setDepth(centerY + 1000);
    var pageX = gameObject.x - centerX + tileWidthHalf
    var pageY = gameObject.y - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    this.graphics.clear()
    this.graphics.lineStyle(1, 0xEBF518, 2);
    this.graphics.fillStyle(0xff0000, .5)
    var tile = grid[mapXY.y][mapXY.x]
    if (tile.partOf != null) {
      this.drawTileSize(tile.partOf, grid[tile.partOf.y][tile.partOf.x].size)
    } else if (tile.road != null) {
      this.drawTileSize(mapXY, 1)
    }



  }
  dragEndErase(pointer, gameObject) {
    this.graphics.clear()
    this.selectCursor.destroy()
    gameMode = GM_INFO

    gameObject.x = pointer.worldX;
    gameObject.y = pointer.worldY;
    gameObject.setDepth(centerY + 1000);
    var pageX = gameObject.x - centerX + tileWidthHalf
    var pageY = gameObject.y - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    var tile = grid[mapXY.y][mapXY.x]
    if (tile.partOf != null) {
      this.deleteBuilding(tile.partOf, grid[tile.partOf.y][tile.partOf.x].size)
    } else if (tile.road != null) {
      this.deleteRoad(mapXY)
    }

  }
  deleteRoad(point) {
    var tile = grid[point.y][point.x]
    var tileIMG = gridImage[point.y][point.x]
    if (tileIMG.road) {
      tileIMG.road.destroy()
      tile.road = null
      tile.type = 'blank'
    }
  }
  deleteBuilding(point, size) {
    var tile = grid[point.y][point.x]
    var tileIMG = gridImage[point.y][point.x]
    if (tileIMG.building) {
      tileIMG.building.destroy()
      if (tile.zone > 7) {
        sim.gameData.zoneCounts[tile.zone] -= 1
      }
      if (tile.zone >= 0 || tile.zone < 8) {
        sim.gameData.zoneCounts[tile.zone] -= zoneSizeTable[tile.size]
      }
      tileIMG.building = null
    }
    var tiles = this.getTileArea(point, size)

    for (var i = 0; i < tiles.length; i++) {
      var t = grid[tiles[i].y][tiles[i].x]
      var tI = gridImage[tiles[i].y][tiles[i].x]
      tI.tile.destroy()


      var ind
      if (grid[tiles[i].y][tiles[i].x].terrain == 'concrete') {
        ind = 0
      } else if (grid[tiles[i].y][tiles[i].x].terrain == 'dirt') {
        ind = 1
      } else if (grid[tiles[i].y][tiles[i].x].terrain == 'water') {
        ind = 2
      } else if (grid[tiles[i].y][tiles[i].x].terrain == 'grass') {
        ind = 3
      } else if (grid[tiles[i].y][tiles[i].x].terrain == 'sand') {
        ind = 4
      }
      grid[tiles[i].y][tiles[i].x] = null
      var tileNew = new Tile(this, tiles[i].x, tiles[i].y, ind)
      grid[tiles[i].y][tiles[i].x] = tileNew
    }

  }
  dragPlace(pointer, gameObject) {
    // gameObject.setScale(gameObject.y / height);

    // gameObject.x = pointer.worldX;
    // gameObject.y = pointer.worldY;
    gameObject.x = pointer.worldX;
    gameObject.y = pointer.worldY;
    gameObject.setDepth(centerY + 1000);
    // gameObject.x = Phaser.Math.Snap.To(dragX, 32);
    // gameObject.y = Phaser.Math.Snap.To(dragY, 32);
    var pageX = gameObject.x - centerX + tileWidthHalf
    var pageY = gameObject.y - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    //console.log(mapXY)
    this.addScore(mapXY)
    this.graphics.clear()
    this.graphics.lineStyle(1, 0xEBF518, 2);
    if (this.canPlaceBuilding(mapXY, this.placeData.size)) {
      this.graphics.fillStyle(0x00ff00, .5)
    } else {
      this.graphics.fillStyle(0xff0000, .5)
    }


    if (this.placeData.size > 1) {
      this.drawTileSize(mapXY, this.placeData.size)
    } else {
      this.drawTile(mapXY)
    }
  }
  dragEndPlace(pointer, gameObject) {
    gameObject.x = pointer.worldX;
    gameObject.y = pointer.worldY;
    var pageX = gameObject.x - centerX + tileWidthHalf
    var pageY = gameObject.y - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    //gameObject.setDepth(centerY + pointer.worldY);
    var isoXY = this.toIso(mapXY.x, mapXY.y)
    gameObject.setDepth(centerY + isoXY.y);
    gameObject.setPosition(centerX + isoXY.x, centerY + isoXY.y)

    this.placeItem(mapXY)
  }
  inputDown(p) {
    if (this.drag) {
      return
    }
    if (gameMode == GM_ROAD || gameMode == GM_RAIL) {
      this.tileSelect(p)
    } else if (gameMode == GM_ZONE) {
      this.zoneDown(p)
    } else if (gameMode == GM_ERASE) {
      this.eraseDown(p)
    } else if (gameMode == GM_INFO) {
      this.infoDown(p)
    }
  }
  inputMove(p) {
    if (this.drag) {
      return
    }
    if (gameMode == GM_ROAD || gameMode == GM_RAIL) {
      this.tileDrag(p)
    } else if (gameMode == GM_ZONE) {
      this.zoneMove(p)
    } else if (gameMode == GM_ERASE) {
      this.eraseMove(p)
    }
  }
  inputUp(p) {
    if (this.drag) {
      return
    }
    if (gameMode == GM_ROAD || gameMode == GM_RAIL) {
      this.tileStop(p)
    } else if (gameMode == GM_ZONE) {
      this.zoneUp(p)
    } else if (gameMode == GM_ERASE) {
      this.eraseUp(p)
    }
  }
  infoDown(p) {
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    if (!this.onMap(mapXY)) { return }
    console.log(grid[mapXY.y][mapXY.x].partOf)
    /* if (grid[mapXY.y][mapXY.x].partOf == null) {
      var tile = grid[mapXY.y][mapXY.x]

    } else {
      var tile = grid[grid[mapXY.y][mapXY.x].partOf.y][grid[mapXY.y][mapXY.x].partOf.x]
    } */
    var tile = grid[mapXY.y][mapXY.x]
    if (tile.hasBuilding) {
      console.log(grid[mapXY.y][mapXY.x])
      this.scene.launch('Info', mapXY)
      this.scene.pause()
      this.scene.pause('UI')
      this.scene.pause('Menu')
    } else {
      console.log(grid[mapXY.y][mapXY.x])
    }

    //this.getTileArea(mapXY, 4)
  }
  zoneDown(p) {

    this.graphics.clear()
    this.graphics.lineStyle(1, 0xff0000, 2);
    this.graphics.fillStyle(this.zoneData.color, .1)
    this.selected = []
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    if (!this.onMap(mapXY)) { return }
    // console.log(mapXY)
    this.drawTile(mapXY)
    this.selected.push(mapXY)
  }
  zoneMove(p) {
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    if (!this.onMap(mapXY)) { return }// && this.areNext(mapXY, this.selected[this.selected.length - 1])


    for (var y = this.selected[0].y; y < mapXY.y + 1; y++) {

      for (var x = this.selected[0].x; x < mapXY.x + 1; x++) {
        if (this.canZoneSelect(mapXY) && this.onMap(mapXY)) {
          this.drawTile({ x: x, y: y })

        }

      }
    }

  }
  zoneUp(p) {
    //console.log(this.selected)
    buildingsBright()
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    var rowcount = 0
    var colcount = 0
    if (!this.onMap(mapXY)) { return }// && this.areNext(mapXY, this.selected[this.selected.length - 1])
    if (this.newTile(mapXY)) {
      this.selected.push(mapXY)
    }
    this.drawTile(mapXY)
    this.selected.push(mapXY)
    //console.log(this.selected)
    var testSelect = []
    var testSelect2 = []
    //create selected grid from first tile to last
    for (var y = this.selected[0].y; y < this.selected[1].y + 1; y++) {
      var temp = []
      for (var x = this.selected[0].x; x < this.selected[1].x + 1; x++) {
        if (this.canZoneSelect({ x: x, y: y })) {
          //if available for building, add coordinate
          testSelect.push({ x: x, y: y })
          temp.push({ x: x, y: y })
          //this.drawTile({ x: x, y: y })
          grid[y][x].zone = this.zoneData.zone
          //grid[y][x].tile.setFrame(this.zoneData.placeHolderFrame)
          /* var isoXY = this.toIso(x, y)
          var build = this.add.image(centerX + isoXY.x, centerY + isoXY.y, '1placeholder', 0).setOrigin(.5, 1);
          build.setDepth(centerY + isoXY.y); */
          colcount++
        } else {
          //if not available for building, mark null
          temp.push(null)
          colcount++
        }

      }
      testSelect2.push(temp)
      rowcount++
    }

    //console.log(testSelect)
    // console.log(testSelect2)
    var totalCost = this.selected.length * this.zoneData.cost
    if (this.canAfford(totalCost)) {
      this.buildZone(testSelect)

      sim.gameData.funds -= totalCost

      console.log(sim.gameData.zoneCounts[this.zoneData.zone])
      this.events.emit('updateStats')
    }

    this.selected = []
    this.graphics.clear()

  }
  buildZone(testSelect) {
    //actully building the zone. For each tile in selection, check if certain size will fit, builds it, then moves to the next clear tile and checks again.
    var fixedSize = true

    for (let i = 0; i < testSelect.length; i++) {
      const coord = testSelect[i];
      if (this.fitSize(coord, 4)) {

        var zone = grid[coord.y][coord.x].zone
        if (fixedSize) {
          this.buildSize(coord, 4, zone)
        } else {
          var randSize = Phaser.Math.Between(1, 4)
          this.buildSize(coord, randSize, zone)
        }

      } else if (this.fitSize(coord, 3)) {

        var zone = grid[coord.y][coord.x].zone
        if (fixedSize) {
          this.buildSize(coord, 3, zone)
        } else {
          var randSize = Phaser.Math.Between(1, 3)
          this.buildSize(coord, randSize, zone)
        }

      } else if (this.fitSize(coord, 2)) {

        var zone = grid[coord.y][coord.x].zone
        if (fixedSize) {
          this.buildSize(coord, 2, zone)
        } else {
          var randSize = Phaser.Math.Between(1, 2)
          this.buildSize(coord, randSize, zone)
        }

      } else if (this.fitSize(coord, 1)) {

        var zone = grid[coord.y][coord.x].zone
        this.buildSize(coord, 1, zone)
      }
    }

  }
  buildSize(mapXY, size, zone) {
    var area = this.getPlaceArea(mapXY, size)
    sim.gameData.zoneCounts[zone] += zoneSizeTable[size]
    for (let i = 0; i < area.length; i++) {
      const tile = area[i];
      //all tiles
      grid[tile.y][tile.x].hasBuilding = true
      grid[tile.y][tile.x].partOf = area[area.length - 1]
      addGlobalLandValue(this.zoneData)
      addLocalLandValue(tile, this.zoneData)
      if (i < area.length - 1) {

      } else {
        //main tile
        var isoXY = this.toIso(tile.x, tile.y)
        if (size == 4) {
          var rand = Phaser.Math.Between(0, this.zoneData.frames4.length - 1)
          var buildFrame = this.zoneData.frames4[rand]
          var sheet = this.zoneData.size4
        } else if (size == 3) {
          var rand = Phaser.Math.Between(0, this.zoneData.frames3.length - 1)
          var buildFrame = this.zoneData.frames3[rand]
          var sheet = this.zoneData.size3
        } else if (size == 2) {
          var rand = Phaser.Math.Between(0, this.zoneData.frames2.length - 1)
          var buildFrame = this.zoneData.frames2[rand]
          var sheet = this.zoneData.size2
        } else {
          var rand = Phaser.Math.Between(0, this.zoneData.frames1.length - 1)
          var buildFrame = this.zoneData.frames1[rand]
          var sheet = this.zoneData.size1
        }
        addPollution(tile, this.zoneData)
        var build = this.add.image(centerX + isoXY.x, centerY + isoXY.y, sheet, buildFrame).setOrigin(.5, 1);
        build.setDepth(centerY + isoXY.y);
        gameMode = GM_INFO
        grid[tile.y][tile.x].menu = this.zoneData.id
        grid[tile.y][tile.x].parentMenu = this.zoneData.parentMenu
        grid[tile.y][tile.x].size = size
        grid[tile.y][tile.x].building = { sheet: sheet, frame: buildFrame, flipX: false }
        grid[tile.y][tile.x].buildingData.name = 'Dwelling'
        grid[tile.y][tile.x].buildingData.added = 1
        gridImage[tile.y][tile.x].building = build
      }

    }

  }

  fitSize(point, size) {
    //console.log('checking...')
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {

        if (!this.onMap({ x: point.x + x, y: point.y + y })) {
          return false
        }
        if (this.onMap(point) && grid[point.y + y][point.x + x].zone == this.zoneData.zone && !grid[point.y + y][point.x + x].hasBuilding) {
          //console.log(grid[point.y + y][point.x + x])

        } else {
          return false
        }


      }
    }
    return true
  }
  eraseDown(p) {
    this.graphics.clear()
    this.graphics.lineStyle(1, 0x00ff000, 2);
    this.graphics.fillStyle(0xff0000, .1)
    this.selected = []
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    if (!this.onMap(mapXY)) { return }
    console.log(mapXY)
    this.drawTile(mapXY)
    this.selected.push(mapXY)
  }
  eraseMove(p) {
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    if (!this.onMap(mapXY)) { return }// && this.areNext(mapXY, this.selected[this.selected.length - 1])


    for (var y = this.selected[0].y; y < mapXY.y + 1; y++) {

      for (var x = this.selected[0].x; x < mapXY.x + 1; x++) {
        if (this.onMap(mapXY)) {
          this.drawTile({ x: x, y: y })

        }

      }
    }

  }
  eraseUp(p) {
    console.log(this.selected)
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    var rowcount = 0
    var colcount = 0
    if (!this.onMap(mapXY)) { return }// && this.areNext(mapXY, this.selected[this.selected.length - 1])
    if (this.newTile(mapXY)) {
      this.selected.push(mapXY)
    }
    this.drawTile(mapXY)
    this.selected.push(mapXY)
    console.log(this.selected)

    var testSelect2 = []
    for (var y = this.selected[0].y; y < this.selected[1].y + 1; y++) {
      var temp = []
      for (var x = this.selected[0].x; x < this.selected[1].x + 1; x++) {

        temp.push({ x: x, y: y })
        //this.drawTile({ x: x, y: y })
        //grid[y][x].tile.setTint(0x668EE0)
        colcount++


      }
      testSelect2.push(temp)
      rowcount++
    }
    this.eraseZone(this.selected)
    //this.buldResidentialZone(testSelect2, rowcount, colcount / rowcount)
    this.selected = []
    this.graphics.clear()
    gameMode = GM_INFO

  }

  eraseZone(tileArray) {
    console.log(tileArray)
    for (let i = 0; i < tileArray.length; i++) {


      let coord = tileArray[i];
      let tile = grid[coord.y][coord.x]
      let tileIMG = gridImage[coord.y][coord.x]
      console.log(tile)
      console.log(tileIMG)
      tileIMG.tile.destroy()
      if (tileIMG.building) {
        tileIMG.building.destroy()
        if (tile.zone > 7) {
          sim.gameData.zoneCounts[tile.zone] -= 1
        }
        if (tile.zone >= 0 || tile.zone < 8) {
          sim.gameData.zoneCounts[tile.zone] -= zoneSizeTable[tile.size]
        }
      }
      if (tileIMG.road) {
        tileIMG.road.destroy()
      }

      grid[coord.y][coord.x] = null
      var tileNew = new Tile(this, coord.x, coord.y, 3)
      grid[coord.y][coord.x] = tileNew

    }
  }
















  eraseZone_(tileArray) {
    console.log(tileArray)
    for (let i = 0; i < tileArray.length; i++) {


      let coord = tileArray[i];
      let tile = grid[coord.y][coord.x]
      let tileIMG = gridImage[coord.y][coord.x]

      tile.hasBuilding = false
      tile.partOf = null
      tileIMG.tile.destroy()
      if (tileIMG.building) {
        tileIMG.building.destroy()
        tileIMG.building = null
        tile.building = null
        if (tile.zone > 7) {
          gameStats.zoneCounts[tile.zone] -= 1

        }
        if (tile.zone >= 0 || tile.zone < 8) {
          gameStats.zoneCounts[tile.zone] -= zoneSizeTable[tile.size]

        }
      }

      if (tile.menu != null) {
        console.log(buildMenu[tile.parentMenu].subMenu[tile.menu])
        removePollution(coord, buildMenu[tile.parentMenu].subMenu[tile.menu])
        removeGlobalLandValue(buildMenu[tile.parentMenu].subMenu[tile.menu])
        removeLocalLandValue(coord, buildMenu[tile.parentMenu].subMenu[tile.menu])
        sim.gameData.specialJobs -= buildMenu[tile.parentMenu].subMenu[tile.menu].jobs
      }
      if (tileIMG.road) {
        tile.road = null
        tileIMG.road.destroy()
      }
      grid[coord.y][coord.x] = null
      var tileNew = new Tile(this, coord.x, coord.y, 3)
      grid[coord.y][coord.x] = tileNew



    }
  }













  eraseZone__(tileArray) {
    console.log(tileArray)
    for (let i = 0; i < tileArray.length; i++) {
      for (let j = 0; j < tileArray[0].length; j++) {

        let coord = tileArray[i][j];
        let tile = grid[coord.y][coord.x]
        let tileIMG = gridImage[coord.y][coord.x]

        tile.hasBuilding = false
        tile.partOf = null
        tileIMG.tile.destroy()
        if (tileIMG.building) {
          tileIMG.building.destroy()
          tileIMG.building = null
          tile.building = null
          if (tile.zone > 7) {
            gameStats.zoneCounts[tile.zone] -= 1

          }
          if (tile.zone >= 0 || tile.zone < 8) {
            gameStats.zoneCounts[tile.zone] -= zoneSizeTable[tile.size]

          }
        }

        if (tile.menu != null) {
          console.log(buildMenu[tile.parentMenu].subMenu[tile.menu])
          removePollution(tileArray[i][j], buildMenu[tile.parentMenu].subMenu[tile.menu])
          removeGlobalLandValue(buildMenu[tile.parentMenu].subMenu[tile.menu])
          removeLocalLandValue(tileArray[i][j], buildMenu[tile.parentMenu].subMenu[tile.menu])
          sim.gameData.specialJobs -= buildMenu[tile.parentMenu].subMenu[tile.menu].jobs
        }
        if (tile.road) {
          tileIMG.road.destroy()
        }
        var tileNew = new Tile(this, tileArray[i][j].x, tileArray[i][j].y, 3)
        grid[tileArray[i][j].y][tileArray[i][j].x] = tileNew


      }
    }
  }

  tileSelect(p) {
    this.selected = []
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    if (!this.onMap(mapXY)) { return }
    if (!this.canAfford(this.transportType.cost)) { return }
    console.log(mapXY)
    this.selected.push(mapXY)
    this.addScore(mapXY)


    var value = this.calculatePath(mapXY)
    console.log(value)
    this.setRoad(mapXY, value)
    sim.gameData.funds -= this.transportType.cost
    sim.gameData.maintenanceCosts[this.transportType.zone] += this.transportType.maintenance
    this.events.emit('updateStats')


    // var isoXY = this.toIso(mapXY.x, mapXY.y)
    // var tile = this.add.image(centerX + isoXY.x, centerY + isoXY.y, 'roads', 1).setOrigin(.5, 1);
    // tile.setDepth(centerY + isoXY.y);
    //this.coordText.setText(mapXY.x + ', ' + mapXY.y)
  }
  tileDrag(p) {
    var pageX = p.worldX - centerX + tileWidthHalf
    var pageY = p.worldY - centerY + tileHeightHalf
    var mapXY = this.toMap(pageX, pageY)
    if (this.selected.length == 0) { return }
    if (!this.onMap(mapXY) && this.areNext(mapXY, this.selected[this.selected.length - 1])) { return }
    if (this.newTile(mapXY) && this.canContinueRoad(mapXY) && this.canAfford(this.transportType.cost)) {
      console.log('next road')
      sim.gameData.maintenanceCosts[this.transportType.zone] += this.transportType.maintenance
      sim.gameData.maintenanceCostsSpending[this.transportType.zone] += this.transportType.maintenance
      var value = this.calculatePath(mapXY)
      if (grid[mapXY.y][mapXY.x].terrain == 'water') {
        if (value == 2 || value == 4) {
          value = 18
        } else if (value == 1 || value == 8) {
          value = 17
        }
      }
      if (this.transportType.action == 'road' && grid[mapXY.y][mapXY.x].type == 'rail') {
        if (value == 2 || value == 4) {
          value = 19
        } else if (value == 1 || value == 8) {
          value = 20
        }

      }
      if (this.transportType.action == 'rail' && grid[mapXY.y][mapXY.x].type == 'road') {
        if (value == 2 || value == 4) {
          value = 20
        } else if (value == 1 || value == 8) {
          value = 19
        }

      }
      this.setRoad(mapXY, value)
      console.log(this.selected.length)
      if (this.selected.length > 0) {
        var preTile = this.selected[this.selected.length - 1]
        var preValue = this.calculatePath(preTile)
        if (grid[preTile.y][preTile.x].road.frame == 18) {
          preValue = 18
        } else if (grid[preTile.y][preTile.x].road.frame == 17) {
          preValue = 17
        }
        if (grid[preTile.y][preTile.x].road.frame == 19) {
          preValue = 19
        } else if (grid[preTile.y][preTile.x].road.frame == 20) {
          preValue = 20
        }
        console.log('previous value')
        console.log(preValue)
        this.setRoad(preTile, preValue)
      }
      sim.gameData.funds -= this.transportType.cost
      this.events.emit('updateStats')
      this.selected.push(mapXY)
    }

    /* var isoXY = this.toIso(mapXY.x, mapXY.y)
    var tile = this.add.image(centerX + isoXY.x, centerY + isoXY.y, 'roads', 1).setOrigin(.5, 1);
    tile.setDepth(centerY + isoXY.y); */
  }
  tileStop(p) {
    this.selected = []
    gameMode = GM_INFO
  }
  setRoad(mapXY, value) {
    var isoXY = this.toIso(mapXY.x, mapXY.y)
    if (value == 0) {
      if (grid[mapXY.y][mapXY.x].raod == null) {
        var road = this.add.image(centerX + isoXY.x, centerY + isoXY.y, this.transportType.sheet, 1).setOrigin(.5, 1).setDepth(centerY + isoXY.y);
        grid[mapXY.y][mapXY.x].road = { sheet: this.transportType.sheet, frame: 1 }
        gridImage[mapXY.y][mapXY.x].road = road
      } else {
        grid[mapXY.y][mapXY.x].road.frame = 1
        gridImage[mapXY.y][mapXY.x].road.setFrame(1)
      }
      grid[mapXY.y][mapXY.x].type = this.transportType.action
    } else {
      if (grid[mapXY.y][mapXY.x].road == null) {
        var road = this.add.image(centerX + isoXY.x, centerY + isoXY.y, this.transportType.sheet, value).setOrigin(.5, 1).setDepth(centerY + isoXY.y);
        grid[mapXY.y][mapXY.x].road = { sheet: this.transportType.sheet, frame: value }
        gridImage[mapXY.y][mapXY.x].road = road
      } else {
        grid[mapXY.y][mapXY.x].road.frame = value
        gridImage[mapXY.y][mapXY.x].road.setFrame(value)
      }
      grid[mapXY.y][mapXY.x].type = this.transportType.action
    }
  }
  calculatePath(point) {
    var value = 0
    if (this.onMap({ x: point.x, y: point.y - 1 })) {
      if (grid[point.y - 1][point.x].type == this.transportType.action || grid[point.y - 1][point.x].type == 'crossing') {
        value += 1;
      }
    }
    if (this.onMap({ x: point.x, y: point.y + 1 })) {
      if (grid[point.y + 1][point.x].type == this.transportType.action || grid[point.y - 1][point.x].type == 'crossing') {
        value += 8;
      }
    }
    if (this.onMap({ x: point.x - 1, y: point.y })) {
      if (grid[point.y][point.x - 1].type == this.transportType.action || grid[point.y - 1][point.x].type == 'crossing') {
        value += 2;
      }
    }
    if (this.onMap({ x: point.x + 1, y: point.y })) {
      if (grid[point.y][point.x + 1].type == this.transportType.action || grid[point.y - 1][point.x].type == 'crossing') {
        value += 4;
      }
    }







    return value
  }

  placeItem(mapXY) {
    this.selectCursor.destroy()
    console.log(this.placeData)
    //check if can build
    if (this.canPlaceBuilding(mapXY, this.placeData.size) && this.canAfford(this.placeData.cost)) {
      var isoXY = this.toIso(mapXY.x, mapXY.y)
      var building = this.add.image(centerX + isoXY.x, centerY + isoXY.y, this.placeData.sheet, this.placeData.index).setOrigin(.5, 1);
      building.setDepth(centerY + isoXY.y);
      addPollution(mapXY, this.placeData)
      grid[mapXY.y][mapXY.x].building = { sheet: this.placeData.sheet, frame: this.placeData.index, flipX: false }
      gridImage[mapXY.y][mapXY.x].building = building
      grid[mapXY.y][mapXY.x].zone = this.placeData.zone
      grid[mapXY.y][mapXY.x].size = this.placeData.size
      grid[mapXY.y][mapXY.x].buildingData.name = this.placeData.name
      grid[mapXY.y][mapXY.x].buildingData.added = 1
      grid[mapXY.y][mapXY.x].buildingData.jobs = this.placeData.jobs
      sim.gameData.specialJobs += this.placeData.jobs
      grid[mapXY.y][mapXY.x].menu = this.placeData.id
      grid[mapXY.y][mapXY.x].parentMenu = this.placeData.parentMenu
      this.setBuilding(mapXY, this.placeData.size)
      sim.gameData.zoneCounts[this.placeData.zone] += 1
      sim.gameData.maintenanceCosts[this.placeData.zone] += this.placeData.maintenance
      sim.gameData.maintenanceCostsSpending[this.placeData.zone] += this.placeData.maintenance
      addGlobalLandValue(this.placeData)
      addLocalLandValue(mapXY, this.placeData)
      sim.gameData.funds -= this.placeData.cost
      this.events.emit('updateStats')
      if (this.placeData.zone == 8) {
        addPowerPlant(mapXY, this.placeData.id, sim.gameData.year)
      }
    }
    gameMode = GM_INFO
    this.graphics.clear()
    //modifile grid tile for building
  }
  setBuilding(mapXY, size) {
    var area = this.getTileArea(mapXY, size)
    for (let i = 0; i < area.length; i++) {
      const tile = area[i];
      grid[tile.y][tile.x].hasBuilding = true
      grid[tile.y][tile.x].partOf = mapXY
    }
  }
  canAfford(cost) {
    if (sim.gameData.funds >= cost) {
      return true
    }
    return false
  }
  canPlaceBuilding(mapXY, size) {
    var area = this.getTileArea(mapXY, size)
    for (let i = 0; i < area.length; i++) {
      const tile = area[i];
      if (!this.onMap(tile)) {
        return false
      }
      if ((grid[tile.y][tile.x].terrain != 'grass' || grid[tile.y][tile.x].terrain != 'water' || grid[tile.y][tile.x].terrain != 'sand') && grid[tile.y][tile.x].hasBuilding || grid[mapXY.y][mapXY.x].type == 'road' || grid[mapXY.y][mapXY.x].type == 'rail') {
        return false
      }
    }
    return true
  }

  newTile(point) {
    for (var i = 0; i < this.selected.length; i++) {
      if (this.selected[i].x == point.x && this.selected[i].y == point.y) {
        return false
      }

    }
    return true
  }
  canContinueRoad(mapXY) {
    if ((grid[mapXY.y][mapXY.x].terrain == 'grass' || grid[mapXY.y][mapXY.x].terrain == 'sand' || grid[mapXY.y][mapXY.x].type == 'road' || grid[mapXY.y][mapXY.x].type == 'rail' || grid[mapXY.y][mapXY.x].terrain == 'water') && !grid[mapXY.y][mapXY.x].hasBuilding) {
      return true
    }
    return false
  }
  canZoneSelect(mapXY) {
    if ((grid[mapXY.y][mapXY.x].terrain == 'grass' || grid[mapXY.y][mapXY.x].terrain == 'sand') && !grid[mapXY.y][mapXY.x].hasBuilding && grid[mapXY.y][mapXY.x].zone == -1 && grid[mapXY.y][mapXY.x].type != 'road' && grid[mapXY.y][mapXY.x].type != 'rail') {
      return true
    }
    return false
  }
  areNext(p1, p2) {
    return (Math.abs(p1.x - p2.x) == 1 && p1.y - p2.y == 0 || Math.abs(p1.y - p2.y) == 1 && p1.x - p2.x == 0)
  }
  onMap(mapXY) {
    if (mapXY.x < 0 || mapXY.x > mapConfig.width - 1 || mapXY.y < 0 || mapXY.y > mapConfig.height - 1) {
      return false
    } else {
      return true
    }
  }
  getTileArea(mapXY, size) {
    var area = []
    for (var y = mapXY.y; y > mapXY.y - size; y--) {
      for (var x = mapXY.x; x > mapXY.x - size; x--) {
        area.push({ x: x, y: y })
      }
    }
    //console.log(area)
    return area
  }
  getPlaceArea(mapXY, size) {
    var area = []
    for (var y = mapXY.y; y < mapXY.y + size; y++) {
      for (var x = mapXY.x; x < mapXY.x + size; x++) {
        area.push({ x: x, y: y })
      }
    }
    //console.log(area)
    return area
  }
  getTilesSquare(point) {
    var tilesInSquare = [];
    if (this.validPoint(point.x, point.y)) {
      tilesInSquare.push(grid[point.y][point.x])
    }
    if (this.validPoint(point.x + 1, point.y)) {
      tilesInSquare.push(grid[point.y][point.x + 1])
    }
    if (this.validPoint(point.x, point.y + 1)) {
      tilesInSquare.push(grid[point.y + 1][point.x])
    }
    if (this.validPoint(point.x + 1, point.y + 1)) {
      tilesInSquare.push(grid[point.y + 1][point.x + 1])
    }
    return tilesInSquare
  }
  addScore(coord) {
    this.events.emit('score', coord);
  }

  create2DArray(numRows, numColumns) {
    let array = new Array(numRows);

    for (let i = 0; i < numColumns; i++) {
      array[i] = new Array(numColumns);
    }

    return array;
  }
  drawMapGrid() {

    this.graphics.clear()
    this.graphics.lineStyle(1, 0x00ff000, .2);
    this.graphics.fillStyle(0xff0000, .1)
    for (var y = 0; y < mapConfig.height; y++) {
      for (var x = 0; x < mapConfig.width; x++) {
        var point = { x: x, y: y }
        var airPol = grid[point.y][point.x].pollution[0]

        var polper = airPol / 10000
        var color1 = perc2color(polper)
        var colorTest = Phaser.Display.Color.HexStringToColor(color1).color

        //this.graphics.fillStyle(colorTest, .8)
        if (airPol < 50) {
          this.graphics.fillStyle(0x03FA61, .5)
        } else if (airPol < 100) {
          this.graphics.fillStyle(0x1DF603, .5)
        } else if (airPol < 250) {
          this.graphics.fillStyle(0x6EF603, .5)
        } else if (airPol < 500) {
          this.graphics.fillStyle(0xB7F603, .5)
        } else if (airPol < 750) {
          this.graphics.fillStyle(0xEFF603, .5)
        } else if (airPol < 1000) {
          this.graphics.fillStyle(0xF6D903, .5)
        } else if (airPol < 2000) {
          this.graphics.fillStyle(0xF6C603, .5)
        } else if (airPol < 5000) {
          this.graphics.fillStyle(0xF6A903, .5)
        } else if (airPol < 10000) {
          this.graphics.fillStyle(0xF68003, .5)
        } else {
          this.graphics.fillStyle(0xFA0303, .5)
        }
        this.drawTile(point)
      }
    }
  }
  drawTile(mapXY) {


    var isoXY = this.toIso(mapXY.x, mapXY.y)
    //var tile = scene.add.image(scene.centerX + isoXY.x, scene.centerY + isoXY.y, 'tiles', ind).setOrigin(.5, 1);
    //var point = new Phaser.Geom.Point(centerX + isoXY.x, (centerY + isoXY.y) - 5);
    //console.log(centerY + isoXY.y)
    this.graphics.setDepth(centerY + isoXY.y + 900);

    this.graphics.beginPath();
    this.graphics.moveTo(centerX + isoXY.x, (centerY + isoXY.y));
    this.graphics.lineTo((centerX + isoXY.x) - tileWidthHalf, ((centerY + isoXY.y)) - tileHeightHalf);
    this.graphics.lineTo((centerX + isoXY.x), ((centerY + isoXY.y)) - tileHeight);
    this.graphics.lineTo((centerX + isoXY.x) + tileWidthHalf, ((centerY + isoXY.y)) - tileHeightHalf);
    this.graphics.closePath();
    this.graphics.fillPath()
    this.graphics.strokePath();
    //this.graphics.fillPointShape(point, 2);
  }
  drawTileSize(mapXY, size) {
    var diff = size - 1

    var isoXY = this.toIso(mapXY.x, mapXY.y)
    var isoXYUp = this.toIso(mapXY.x - diff, mapXY.y - diff)
    var isoXYUpL = this.toIso(mapXY.x - diff, mapXY.y)
    var isoXYUpR = this.toIso(mapXY.x, mapXY.y - diff)
    //var tile = scene.add.image(scene.centerX + isoXY.x, scene.centerY + isoXY.y, 'tiles', ind).setOrigin(.5, 1);
    //var point = new Phaser.Geom.Point(centerX + isoXY.x, (centerY + isoXY.y) - 5);
    //console.log(centerY + isoXY.y)

    this.graphics.setDepth(centerY + isoXY.y + 900);

    this.graphics.beginPath();
    this.graphics.moveTo(centerX + isoXY.x, (centerY + isoXY.y));
    this.graphics.lineTo((centerX + isoXYUpL.x) - tileWidthHalf, ((centerY + isoXYUpL.y)) - tileHeightHalf);
    this.graphics.lineTo((centerX + isoXYUp.x), ((centerY + isoXYUp.y)) - tileHeight);
    this.graphics.lineTo((centerX + isoXYUpR.x) + tileWidthHalf, ((centerY + isoXYUpR.y)) - tileHeightHalf);
    this.graphics.closePath();
    this.graphics.fillPath()
    this.graphics.strokePath();
    //this.graphics.fillPointShape(point, 2);
  }
  redrawTiles() {
    // for (var Xi = (this.Xtiles - 1); Xi >= 0; Xi--) {
    //   for (var Yi = 0; Yi < this.Ytiles; Yi++) {
    for (var Xi = 0; Xi < this.Xtiles; Xi++) {
      for (var Yi = 0; Yi < this.Ytiles; Yi++) {
        //offX left corner
        var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
        var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY;

        // Draw tile outline
        this.graphics.lineStyle(5, 0x262B44, 2);
        this.graphics.fillStyle(0x00ff00, 1)


        this.graphics.beginPath();

        this.graphics.moveTo(offX, offY + this.tileRowOffset / 2);
        this.graphics.lineTo(offX + this.tileColumnOffset / 2, offY);
        this.graphics.lineTo(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2);
        this.graphics.lineTo(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset);

        this.graphics.closePath();
        this.graphics.fillPath()
        this.graphics.strokePath();

        this.graphics.fillStyle(0xff0000, 1)
        var point = new Phaser.Geom.Point(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset / 2);
        this.graphics.fillPointShape(point, 10);


        var tile = this.add.image(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, 'tiles', grid[Xi][Yi]).setOrigin(.5, 1)
        /*      var color = '#999';
        
             this.drawLine(offX, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY, color);
             this.drawLine(offX + this.tileColumnOffset / 2, offY, offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, color);
             this.drawLine(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, color);
             this.drawLine(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, offX, offY + this.tileRowOffset / 2, color); */
      }
    }
  }

  drawLine(x1, y1, x2, y2, color) {
    this.graphics.lineBetween(x1, y1, x2, y2);
    /*  color = typeof color !== 'undefined' ? color : 'white';
     this.context.strokeStyle = color;
     this.context.beginPath();
     this.context.lineWidth = 1;
     this.context.moveTo(x1, y1);
     this.context.lineTo(x2, y2);
     this.context.stroke(); */
  }

  ////////////////////////////////////////////
  //
  // TOGGLE CURSOR
  //
  //////////////////////////////////////////////
  toggleCursor() {

    if (this.drag) {
      this.drag = false;
    } else {
      this.drag = true;
    }
  }

  ////////////////////////////////////////////
  //
  // create new map
  //
  //////////////////////////////////////////////
  createMap() {
    let m = new Map(mapConfig);
    m.generateMap()
    this.map = m.getMap()

    grid = this.create2DArray(mapConfig.width, mapConfig.height)
    gridImage = this.create2DArray(mapConfig.width, mapConfig.height)

    var test = new Map2(mapConfig.width, mapConfig.height, mapConfig.seed, mapConfig.divisor, mapConfig.water)//mapConfig.seed 64 888567 389864 219000
    //console.log(test)
    for (var y = 0; y < mapConfig.height; y++) {
      for (var x = 0; x < mapConfig.width; x++) {
        gridImage[y][x] = {}
        //var tile = new Tile(this, x, y, this.map[y][x])
        var tile = new Tile(this, x, y, test.dataMap[y][x])
        //console.log(tile)
        grid[y][x] = tile

        /* var isoXY = this.toIso(x, y)
        var text = this.add.bitmapText(centerX + isoXY.x, centerY + isoXY.y - 7, 'topaz', x + ',' + y, 7).setOrigin(.5, 1);
        text.setDepth(centerY + isoXY.y); */

      }
    }
  }
  ////////////////////////////////////////////
  //
  // LOAD EXISTING MAP
  //
  //////////////////////////////////////////////
  loadMap(value) {

    grid = value
    gridImage = this.create2DArray(mapConfig.width, mapConfig.height)
    console.log(grid)
    for (var y = 0; y < grid.length; y++) {
      for (var x = 0; x < grid[0].length; x++) {
        //load terrain tile
        var ind
        if (grid[y][x].terrain == 'concrete') {
          ind = 0
        } else if (grid[y][x].terrain == 'dirt') {
          ind = 1
        } else if (grid[y][x].terrain == 'water') {
          ind = 2
        } else if (grid[y][x].terrain == 'grass') {
          ind = 3
        } else if (grid[y][x].terrain == 'sand') {
          ind = 4
        }
        var isoXY = this.toIso(x, y)
        var tile = this.add.image(centerX + isoXY.x, centerY + isoXY.y + 8, 'tiles', ind).setOrigin(.5, 1);
        tile.setDepth(centerY + isoXY.y - 16);
        gridImage[y][x] = {}
        gridImage[y][x].tile = tile
        //load road image

        //load building image
        if (grid[y][x].building != null) {
          //console.log(grid[y][x].building.textureKey)
          var isoXY = this.toIso(x, y)
          var building = this.add.image(centerX + isoXY.x, centerY + isoXY.y, grid[y][x].building.sheet, grid[y][x].building.frame).setOrigin(.5, 1);
          building.setDepth(centerY + isoXY.y);
          gridImage[y][x].building = building
        }
        if (grid[y][x].road != null) {
          var isoXY = this.toIso(x, y)
          var road = this.add.image(centerX + isoXY.x, centerY + isoXY.y, grid[y][x].road.sheet, grid[y][x].road.frame).setOrigin(.5, 1);
          road.setDepth(centerY + isoXY.y);
          gridImage[y][x].road = road
        }
      }

    }
  }
  ////////////////////////////////////////////
  //
  // SAVE MAP
  //
  //////////////////////////////////////////////
  saveMap() {

    //localStorage.setItem('PixelCityGrid', JSON.stringify(grid));
    localStorage.setItem('PixelCityData', JSON.stringify(sim.gameData));
    //localStorage.setItem('PixelCityGrid', JSON.stringify(grid));

    localforage.setItem('PixelCityData1', sim.gameData).then(function (value) {
      // Do other things once the value has been saved.
      console.log('saved data');
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });

    localforage.setItem('PixelCityGrid1', grid).then(function (value) {
      // Do other things once the value has been saved.
      console.log('saved grid');
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });
  }
  saveStats() {


  }


}
function cartesianToIsometric(cartPt) {
  var tempPt = new Phaser.Geom.Point();
  console.log(tempPt)
  tempPt.x = cartPt.x - cartPt.y;
  tempPt.y = (cartPt.x + cartPt.y) / 2;
  return (tempPt);
}
function isometricToCartesian(isoPt) {
  var tempPt = new Phaser.Point();
  tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
  tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
  return (tempPt);
}