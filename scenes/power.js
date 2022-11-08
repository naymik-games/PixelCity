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

    this.rcText = this.add.bitmapText(25, 925, 'topaz', 'R: ' + consumption[0], 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.ccText = this.add.bitmapText(25, 1025, 'topaz', 'C: ' + consumption[1], 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();
    this.iccText = this.add.bitmapText(25, 1125, 'topaz', 'I: ' + consumption[2], 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();



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



    this.totalText = this.add.bitmapText(25, 1225, 'topaz', 'Total Used/Capacity ' + consumption[3] + ' / ' + totalCapicity + 'MW/h', 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();

    this.numText = this.add.bitmapText(25, 1325, 'topaz', 'Plants: ' + sim.gameData.powerPlants.length, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();

    this.listText = this.add.bitmapText(25, 1425, 'topaz', 'Plants: ' + text, 40).setOrigin(0, .5).setTint(0xC0D7E2).setInteractive();

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