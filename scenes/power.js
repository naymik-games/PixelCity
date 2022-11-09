class Power extends Phaser.Scene {

  constructor() {

    super("Power");
  }
  preload() {
    /*    this.load.scenePlugin({
         key: 'rexuiplugin',
         url: '../classes/uiplug.min.js',
         //  url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
         sceneKey: 'rexUI'
       }); */
    this.load.plugin('rexflashplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexflashplugin.min.js', true);

  }

  create() {
    this.Main = this.scene.get('playGame');


    /*  var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
     tablebg.displayWidth = 900
     tablebg.displayHeight = game.config.height / 2 */

    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 825, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 750
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    this.closeIcon = this.add.image(42, 762, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    this.nameText = this.add.text(100, 747, 'Power Data ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })




    //thumb

    //gameStats.population = 80


    //this.nameText = this.add.bitmapText(300, 860, 'topaz', 'Power', 50).setOrigin(0, .5).setTint(0x000000).setInteractive();

    var consumption = getPowerConsumption()
    this.consumptionText = this.add.text(25, 825, 'Consumption', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })

    this.rcText = this.add.bitmapText(25, 925, 'topaz', 'R: ' + consumption[0], 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.ccText = this.add.bitmapText(175, 925, 'topaz', 'C: ' + consumption[1], 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.iccText = this.add.bitmapText(325, 925, 'topaz', 'I: ' + consumption[2], 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.iccText = this.add.bitmapText(500, 925, 'topaz', '0: ' + consumption[3], 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.totalText = this.add.bitmapText(23, 1000, 'topaz', 'Total: ' + consumption[4], 50).setOrigin(0, .5).setTint(0xF0B060).setInteractive();


    this.consumptionText = this.add.text(25, 1100, 'Capacity', { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })

    var totalCapicity = 0
    if (sim.gameData.powerPlants.length > 0) {
      var text = ''
      for (var i = 0; i < sim.gameData.powerPlants.length; i++) {
        var plantID = sim.gameData.powerPlants[i][1]
        var plant = buildMenu[2].subMenu[plantID]
        text += plant.name
        text += ', ' + sim.gameData.powerPlants[i][2]
        text += ', ' + plant.capacity + '\n'
        totalCapicity += plant.capacity
      }
    }


    var capacityUsed = Math.round((consumption[4] / totalCapicity) * 100)
    this.totalText = this.add.bitmapText(25, 1200, 'topaz', 'Capacity ' + totalCapicity + ' MW/h', 50).setOrigin(0, .5).setTint(0xF0B060).setInteractive();
    this.percentText = this.add.bitmapText(this.totalText.x + this.totalText.width + 25, 1200, 'topaz', capacityUsed + '%', 50).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();

    var caution = this.add.image(this.percentText.x + this.percentText.width + 25, 1200, 'caution').setOrigin(0, .5).setScale(3).setAlpha(0)
    var flash = this.plugins.get('rexflashplugin').add(caution, { duration: 500, repeat: 10 });
    if (capacityUsed > 94) {
      caution.setAlpha(1)
      flash.flash()
    }


    this.numText = this.add.text(25, 1300, 'Plants: ' + sim.gameData.powerPlants.length, { fontFamily: 'PixelFont', fontSize: '30px', color: '#C0D7E2', align: 'left' })
    // this.numText = this.add.bitmapText(25, 1425, 'topaz', 'Plants: ' + sim.gameData.powerPlants.length, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();

    this.listText = this.add.bitmapText(25, 1400, 'topaz', text, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();

    //console.log(roadInRange(tile.xy))
    /* if (tile.hasBuilding) {
      console.log(tile.building.frame.name)
      console.log(tile.building.texture.key)
    } else {
      console.log('no building')
    } */

    //

    //close screen

    this.closeIcon.on('pointerdown', function () {
      this.scene.stop()
      this.scene.resume('playGame')
      this.scene.resume('UI')
      this.scene.resume('Menu')
    }, this)

  }
}