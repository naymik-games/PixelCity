class Laws extends Phaser.Scene {

  constructor() {

    super("Laws");
  }
  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: '../classes/uiplug.min.js',
      //  url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
  }

  create() {
    this.Main = this.scene.get('playGame');
    console.log(this.mapXY)
    /*    var tablebg = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0xf7f7f7);
       tablebg.displayWidth = 900
       tablebg.displayHeight = game.config.height / 2 */

    var tablebg_top = this.add.image(game.config.width / 2, game.config.height - 1225, 'modal_top').setOrigin(.5, 1);
    var tablebg_mid = this.add.image(game.config.width / 2, game.config.height - 75, 'modal_mid').setOrigin(.5, 1);
    tablebg_mid.displayHeight = 1150
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);
    this.closeIcon = this.add.image(42, 362, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    this.nameText = this.add.text(100, 347, 'City laws ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })

    var check = this.add.image(25, 500, 'checkbox', 1).setOrigin(0, .5)

    this.checkLabel = this.add.bitmapText(check.x + 55, 495, 'topaz', 'Youth Curfew', 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive()
    //thumb

    //gameStats.population = 80


    //this.nameText = this.add.bitmapText(300, 860, 'topaz', 'RCI', 50).setOrigin(0, .5).setTint(0x000000).setInteractive();

    /* var workers = Math.floor(sim.gameData.population * .50)

    var comJobs = sim.getTotalComCapacity()
    var indJobs = sim.getTotalIndCapacity()
    var specJobs = sim.gameData.specialJobs
    var totalJobs = comJobs + indJobs + specJobs

    this.jobsLabel = this.add.text(25, 825, 'Jobs ', { fontFamily: 'PixelFont', fontSize: '25px', color: '#CAD4D8', align: 'left' })


    this.jobText = this.add.bitmapText(25, 925, 'topaz', 'Com ' + comJobs + ' Ind ' + indJobs + ' Other ' + specJobs + ' Total: ' + totalJobs, 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive();


    this.housingText = this.add.bitmapText(25, 1000, 'topaz', 'Workers: ' + workers, 40).setOrigin(0, .5).setTint(0xCAD4D8).setInteractive(); */

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
let ordinances = [
  {
    name: 'Youth Curfew',
    cost: '50'
  },
  {
    name: 'Free Clinics',
    cost: '125'
  }
]