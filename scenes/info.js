class Info extends Phaser.Scene {

  constructor() {

    super("Info");
  }
  preload() {
    /*    this.load.scenePlugin({
         key: 'rexuiplugin',
         url: '../classes/uiplug.min.js',
         //  url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
         sceneKey: 'rexUI'
       }); */
  }
  init(data) {

    this.mapXY = data;
  }
  create() {
    this.Main = this.scene.get('playGame');
    console.log(this.mapXY)
    /*    var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
       tablebg.displayWidth = 900
       tablebg.displayHeight = game.config.height / 2 */


    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 825, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 750
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    this.closeIcon = this.add.image(858, 762, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    this.nameText = this.add.text(100, 747, 'Building Data ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })


    if (grid[this.mapXY.y][this.mapXY.x].partOf == null) {
      var tile = grid[this.mapXY.y][this.mapXY.x]
      var tileImage = gridImage[this.mapXY.y][this.mapXY.x].building
      console.log(tile)
    } else {
      var tile = grid[grid[this.mapXY.y][this.mapXY.x].partOf.y][grid[this.mapXY.y][this.mapXY.x].partOf.x]
      var tileImage = gridImage[grid[this.mapXY.y][this.mapXY.x].partOf.y][grid[this.mapXY.y][this.mapXY.x].partOf.x].building
      console.log(tile)
    }


    /*  var color1 = {
       red: 19, green: 233, blue: 19
     };
     var color3 = {
       red: 255, green: 0, blue: 0
     };
     var color2 = {
       red: 255, green: 255, blue: 0
     };
     var col = colorGradient(.99, color3, color2, color1)
     console.log(col)
 
     var tescolor = this.add.image(850, 1100, 'blank').setTint(col) */

    console.log(tile.buildingData.name)
    //thumb
    this.thumbIcon = this.add.image(25, 1100, tile.building.sheet, tile.building.frame).setOrigin(0, 1)
    this.thumbIcon.displayHeight = 200
    this.thumbIcon.scaleX = this.thumbIcon.scaleY
    this.thumbIcon.flipX = tile.building.flipX

    //this.flipText = this.add.bitmapText(50, 1100, 'topaz', 'FLIP', 40).setOrigin(0, .5).setTint(0x000000).setInteractive();
    this.flipIcon = this.add.image(300, 1100, 'icons', 36).setOrigin(0, .5).setScale(2).setInteractive();
    this.flipIcon.on('pointerdown', function () {
      if (tile.building.flipX) {
        tile.building.flipX = false
        this.thumbIcon.flipX = false
        tileImage.flipX = false
      } else {
        tile.building.flipX = true
        this.thumbIcon.flipX = true
        tileImage.flipX = true
      }

    }, this)

    this.deleteIcon = this.add.image(400, 1100, 'icons', 46).setOrigin(0, .5).setScale(2).setInteractive();
    this.deleteIcon.on('pointerdown', function () {
      this.Main.deleteBuilding(tile.xy, tile.size)
      this.scene.stop()
      this.scene.resume('playGame')
      this.scene.resume('UI')
      this.scene.resume('Menu')
    }, this)
    var buildingTitle = ''
    if (tile.zone < 3) {
      buildingTitle = 'Residence'
    } else if (tile.zone < 6) {
      buildingTitle = 'Commercial'
    } else if (tile.zone < 9) {
      buildingTitle = 'Industry'
    } else {
      buildingTitle = tile.buildingData.name
    }

    this.nameText = this.add.text(25, 840, buildingTitle, { fontFamily: 'PixelFont', fontSize: '35px', color: '#CAD4D8', align: 'left' })
    //this.nameText = this.add.bitmapText(300, 860, 'topaz', tile.buildingData.name, 50).setOrigin(0, .5).setTint(0x000000)
    this.zoneText = this.add.bitmapText(300, 930, 'topaz', 'Zone: ' + zoneNames[tile.zone], 40).setOrigin(0, .5).setTint(0xCAD4D8)
    this.sizeText = this.add.bitmapText(300, 1000, 'topaz', 'Size: ' + tile.size, 40).setOrigin(0, .5).setTint(0xCAD4D8)

    if (roadInRange(tile.xy)) {
      var answer = 'Yes'
    } else {
      var answer = 'No'
    }
    this.transportationText = this.add.bitmapText(25, 1175, 'topaz', 'Road: ' + answer, 40).setOrigin(0, .5).setTint(0xA6CAF0)

    var temp = getLandValue(tile.xy)
    var lvIndex = getLVIndex(temp.landvalue)
    var rciIndex = getRCIIndex(tile.zone, lvIndex)



    var jobs = 0
    if (tile.zone < 9) {
      jobs = rciSupply[rciIndex] * tile.size
    } else {
      jobs = tile.buildingData.jobs
    }
    this.jobsText = this.add.bitmapText(25, 1475, 'topaz', 'Jobs: ' + jobs, 40).setOrigin(0, .5).setTint(0xA6CAF0)
    if (waterInRange(tile.xy)) {
      var answer = 'Yes'
    } else {
      var answer = 'No'
    }
    this.waterText = this.add.bitmapText(25, 1375, 'topaz', 'Watered: ' + answer, 40).setOrigin(0, .5).setTint(0xA6CAF0)

    if (powerInRange(tile.xy)) {
      var answer = 'Yes'
    } else {
      var answer = 'No'
    }
    this.powerText = this.add.bitmapText(25, 1275, 'topaz', 'Powered: ' + answer, 40).setOrigin(0, .5).setTint(0xA6CAF0)

    var distance = getDistanceBonus(this.mapXY)

    // this.distanceText = this.add.bitmapText(450, 1575, 'topaz', 'D Bonus: ' + distance, 40).setOrigin(0, .5).setTint(0x000000)
    var n = scaleValue(175, [100, 700], [-1, 1], true)
    // var avgPol = getAveragePollution()
    // var averCon = getAverageCongestion()
    //var avLV = sim.gameData.averageLV
    var averCrime = getAverageCrimeAfterCoverage()
    this.distanceText = this.add.bitmapText(450, 1575, 'topaz', 'D Bonus: ' + averCrime, 40).setOrigin(0, .5).setTint(0x000000)
    // var dwater = distanceFromOpenWater(this.mapXY, 5)
    //this.nearWaterText = this.add.bitmapText(25, 1575, 'topaz', 'Near Water: ' + dwater, 40).setOrigin(0, .5).setTint(0x000000)
    var fireCoverage = fireInRange(this.mapXY)
    this.fireText = this.add.bitmapText(25, 1575, 'topaz', 'Fire: ' + fireCoverage, 40).setOrigin(0, .5).setTint(0xA6CAF0)

    this.airPollutionText = this.add.bitmapText(450, 1175, 'topaz', 'Air P: ' + tile.pollution[0], 40).setOrigin(0, .5).setTint(0xA6CAF0)
    this.airPollutionText = this.add.bitmapText(450, 1275, 'topaz', 'Water P: ' + tile.pollution[1], 40).setOrigin(0, .5).setTint(0xA6CAF0)
    this.crimeText = this.add.bitmapText(450, 1375, 'topaz', 'Crime: ' + getCrimeAfterCoverage(tile.xy, tile.crime), 40).setOrigin(0, .5).setTint(0xA6CAF0)
    var pir = policeInRange(tile.xy)
    //console.log(pir)
    var lv = getLandValue(this.mapXY)
    // console.log(lv)
    if (lv.lvIndex == 0) {
      var t = 'low'
    } else if (lv.lvIndex == 1) {
      var t = 'med'
    } else {
      var t = 'high'
    }
    this.lvText = this.add.bitmapText(450, 1475, 'topaz', 'LV: ' + lv.landvalue + ' (' + t + ')', 40).setOrigin(0, .5).setTint(0xA6CAF0)
    //console.log(roadInRange(tile.xy))
    /* if (tile.hasBuilding) {
      console.log(tile.building.frame.name)
      console.log(tile.building.texture.key)
    } else {
      console.log('no building')
    } */

    //

    //close screen
    //this.closeIcon = this.add.image(450, 1550, 'icons', 20).setOrigin(.5).setScale(3).setInteractive();
    this.closeIcon.on('pointerdown', function () {
      this.scene.stop()
      this.scene.resume('playGame')
      this.scene.resume('UI')
      this.scene.resume('Menu')
    }, this)

  }
}