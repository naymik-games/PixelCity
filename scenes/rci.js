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
    var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
    tablebg.displayWidth = 900
    tablebg.displayHeight = game.config.height / 2





    //thumb

    //gameStats.population = 80


    this.nameText = this.add.bitmapText(300, 860, 'topaz', 'RCI', 50).setOrigin(0, .5).setTint(0x000000).setInteractive();

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
    this.closeIcon = this.add.image(450, 1550, 'icons', 20).setOrigin(.5).setScale(3).setInteractive();
    this.closeIcon.on('pointerdown', function () {
      this.scene.stop()
      this.scene.resume('playGame')
      this.scene.resume('UI')
      this.scene.resume('Menu')
    }, this)

  }
}