class Rci extends Phaser.Scene {

  constructor() {

    super("Rci");
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
    console.log(this.mapXY)
    /*    var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
       tablebg.displayWidth = 900
       tablebg.displayHeight = game.config.height / 2 */

    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 825, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 750
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    this.closeIcon = this.add.image(42, 762, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    this.nameText = this.add.text(100, 747, 'RCI Data ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })




    //thumb

    //gameStats.population = 80


    //this.nameText = this.add.bitmapText(300, 860, 'topaz', 'RCI', 50).setOrigin(0, .5).setTint(0x000000).setInteractive();

    var workers = Math.floor(gameStats.population * .50)

    var comJobs = sim.getTotalComCapacity()
    var indJobs = sim.getTotalIndCapacity()
    var specJobs = sim.gameData.specialJobs
    var totalJobs = comJobs + indJobs + specJobs
    this.jobText = this.add.bitmapText(25, 925, 'topaz', 'Com ' + comJobs + ' Ind ' + indJobs + ' Other ' + specJobs + ' Total: ' + totalJobs, 40).setOrigin(0, .5).setTint(0x000000).setInteractive();
    this.housingText = this.add.bitmapText(25, 1000, 'topaz', 'Housing Capacity: ' + sim.getTotalResCapacity(), 40).setOrigin(0, .5).setTint(0x000000).setInteractive();

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