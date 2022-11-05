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

    }

    this.cameras.main.setBackgroundColor(0xf7eac6);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelCity', 150).setOrigin(.5).setTint(0xc76210);

    var newGameButton = this.add.bitmapText(game.config.width / 2 - 50, 275, 'topaz', 'New Game', 50).setOrigin(0, .5).setTint(0x000000);
    newGameButton.setInteractive();
    newGameButton.on('pointerdown', this.clickHandler, this);

    var loadGameButton = this.add.bitmapText(game.config.width / 2 - 50, 375, 'topaz', 'Load Game', 50).setOrigin(0, .5).setTint(0x000000);
    loadGameButton.setInteractive();
    loadGameButton.on('pointerdown', this.clickHandler2, this);

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