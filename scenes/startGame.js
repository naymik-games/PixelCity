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

    //var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelCity', 150).setOrigin(.5).setTint(0xc76210);
    var title = this.add.text(game.config.width / 2, 100, 'PixelCity', { fontFamily: 'PixelFont', fontSize: '75px', color: '#c76210', align: 'center' }).setOrigin(.5);






    var newGameButton = this.add.bitmapText(game.config.width / 2 - 50, 275, 'topaz', 'New Game', 50).setOrigin(0, .5).setTint(0x000000);
    newGameButton.setInteractive();
    newGameButton.on('pointerdown', this.clickHandler, this);

    var loadGameButton = this.add.bitmapText(game.config.width / 2 - 50, 875, 'topaz', 'Load Game', 50).setOrigin(0, .5).setTint(0x000000);
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