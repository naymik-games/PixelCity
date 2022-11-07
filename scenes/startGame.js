class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {

    gameDataSaved = JSON.parse(localStorage.getItem('PixelCityData'));
    if (gameDataSaved === null || gameDataSaved.length <= 0) {
      localStorage.setItem('PixelCityData', JSON.stringify(gameStats));
      gameDataSaved = gameStats
    }

    /* localforage.getItem('PixelCityData1').then(function (value) {
      // This code runs once the value has been loaded
      // from the offline store.
      //gameDataSaved = value
      console.log(value)
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    }); */





    this.cameras.main.setBackgroundColor(0x091D48);


    var tablebg_top = this.add.image(game.config.width / 2, 0, 'modal_top').setOrigin(.5, 0);
    var tablebg_mid = this.add.image(game.config.width / 2, 75, 'modal_mid').setOrigin(.5, 0);
    tablebg_mid.displayHeight = 1490
    var tablebg_bot = this.add.image(game.config.width / 2, game.config.height, 'modal_bot').setOrigin(.5, 1);

    this.nameText = this.add.text(100, 7, 'PixelCity ', { fontFamily: 'PixelFont', fontSize: '32px', color: '#c76210', align: 'left', backgroundColor: '#A6CAF0' })




    //var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelCity', 150).setOrigin(.5).setTint(0xc76210);
    //var title = this.add.text(game.config.width / 2, 100, 'PixelCity', { fontFamily: 'PixelFont', fontSize: '75px', color: '#c76210', align: 'center' }).setOrigin(.5);






    var newGameButton = this.add.text(game.config.width / 2, 275, 'New Game', { fontFamily: 'PixelFont', fontSize: '50px', color: '#CAD4D8', align: 'center' }).setOrigin(.5);
    newGameButton.setInteractive();
    newGameButton.on('pointerdown', this.clickHandler, this);

    var loadGameButton = this.add.text(game.config.width / 2, 875, 'Continue Game', { fontFamily: 'PixelFont', fontSize: '50px', color: '#CAD4D8', align: 'center' }).setOrigin(.5);
    loadGameButton.setInteractive();
    loadGameButton.on('pointerdown', this.clickHandler2, this);
    var day = this.add.bitmapText(50, 975, 'topaz', 'Day: ' + gameDataSaved.day, 50).setOrigin(0, .5).setTint(0xc76210);
    var funds = this.add.bitmapText(450, 975, 'topaz', '$' + gameDataSaved.funds, 50).setOrigin(.5, .5).setTint(0xc76210);
    var pop = this.add.bitmapText(850, 975, 'topaz', 'Pop: ' + gameDataSaved.population, 50).setOrigin(1, .5).setTint(0xc76210);
  }
  clickHandler() {
    mapLoad = 'new'
    this.scene.start('playGame');

    this.scene.launch('Menu');
  }
  clickHandler2() {
    mapLoad = 'load'

    this.scene.start('playGame');

    this.scene.launch('Menu');
  }
}