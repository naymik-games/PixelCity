class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {


    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("particle", "assets/particle.png");
    for (var i = 0; i < 125; i++) {
      this.load.image("particle", "assets/particle.png");
    }




    //this.load.image("particle", "assets/sprites/particle.png");
    this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');



    this.load.spritesheet("particle_color", "assets/particles.png", {
      frameWidth: 6,
      frameHeight: 6
    });

    this.load.spritesheet("tiles", "assets/sprites/tiles/tiles32x17theo.png", {
      frameWidth: 32,
      frameHeight: 24
    });
    ////////////////////////////////////
    this.load.spritesheet("1placeholder", "assets/sprites/tiles/1x1placeholder.png", {
      frameWidth: 32,
      frameHeight: 24
    });
    this.load.spritesheet("2placeholder", "assets/sprites/tiles/2x2placeholder.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("3placeholder", "assets/sprites/tiles/3x3placeholder.png", {
      frameWidth: 96,
      frameHeight: 84
    });
    this.load.spritesheet("4placeholder", "assets/sprites/tiles/4x4placeholder.png", {
      frameWidth: 128,
      frameHeight: 84
    });
    /////////////////////
    this.load.spritesheet("R_tilesx1LIGHT", "assets/sprites/residential/R_tilesx1LIGHT.png", {
      frameWidth: 32,
      frameHeight: 34
    });
    this.load.spritesheet("R_tilesx1MED", "assets/sprites/residential/R_tilesx1MED.png", {
      frameWidth: 32,
      frameHeight: 100
    });
    this.load.spritesheet("R_tilesx1DEN", "assets/sprites/residential/R_tilesx1DEN.png", {
      frameWidth: 32,
      frameHeight: 100
    });
    this.load.spritesheet("R_tilesx2LIGHT", "assets/sprites/residential/R_tilesx2LIGHT.png", {
      frameWidth: 64,
      frameHeight: 150
    });
    this.load.spritesheet("R_tilesx2MED", "assets/sprites/residential/R_tilesx2MED.png", {
      frameWidth: 64,
      frameHeight: 150
    });
    this.load.spritesheet("R_tilesx2DEN", "assets/sprites/residential/R_tilesx2DEN.png", {
      frameWidth: 64,
      frameHeight: 200
    });
    this.load.spritesheet("R_tilesx3LIGHT", "assets/sprites/residential/R_tilesx3LIGHT.png", {
      frameWidth: 96,
      frameHeight: 100
    });
    this.load.spritesheet("R_tilesx3MED", "assets/sprites/residential/R_tilesx3MED.png", {
      frameWidth: 96,
      frameHeight: 150
    });
    this.load.spritesheet("R_tilesx3DEN", "assets/sprites/residential/R_tilesx3DEN.png", {
      frameWidth: 96,
      frameHeight: 250
    });
    this.load.spritesheet("R_tilesx4LIGHT", "assets/sprites/residential/R_tilesx4LIGHT.png", {
      frameWidth: 128,
      frameHeight: 300
    });
    this.load.spritesheet("R_tilesx4MED", "assets/sprites/residential/R_tilesx4MED.png", {
      frameWidth: 128,
      frameHeight: 300
    });
    this.load.spritesheet("R_tilesx4DEN", "assets/sprites/residential/R_tilesx4DEN.png", {
      frameWidth: 128,
      frameHeight: 300
    });
    ////////////////////////////////////////

    this.load.spritesheet("C_tilesx1LIGHT", "assets/sprites/commercial/C_tilesx1LIGHT.png", {
      frameWidth: 32,
      frameHeight: 50
    });
    this.load.spritesheet("C_tilesx1MED", "assets/sprites/commercial/C_tilesx1MED.png", {
      frameWidth: 32,
      frameHeight: 50
    });
    this.load.spritesheet("C_tilesx1DEN", "assets/sprites/commercial/C_tilesx1DEN.png", {
      frameWidth: 32,
      frameHeight: 100
    });
    this.load.spritesheet("C_tilesx2LIGHT", "assets/sprites/commercial/C_tilesx2LIGHT.png", {
      frameWidth: 64,
      frameHeight: 75
    });
    this.load.spritesheet("C_tilesx2MED", "assets/sprites/commercial/C_tilesx2MED.png", {
      frameWidth: 64,
      frameHeight: 150
    });
    this.load.spritesheet("C_tilesx2DEN", "assets/sprites/commercial/C_tilesx2DEN.png", {
      frameWidth: 64,
      frameHeight: 200
    });
    this.load.spritesheet("C_tilesx3LIGHT", "assets/sprites/commercial/C_tilesx3LIGHT.png", {
      frameWidth: 96,
      frameHeight: 130
    });
    this.load.spritesheet("C_tilesx3MED", "assets/sprites/commercial/C_tilesx3MED.png", {
      frameWidth: 96,
      frameHeight: 175
    });
    this.load.spritesheet("C_tilesx3DEN", "assets/sprites/commercial/C_tilesx3DEN.png", {
      frameWidth: 96,
      frameHeight: 275
    });
    this.load.spritesheet("C_tilesx4LIGHT", "assets/sprites/commercial/C_tilesx4LIGHT.png", {
      frameWidth: 128,
      frameHeight: 126
    });
    this.load.spritesheet("C_tilesx4MED", "assets/sprites/commercial/C_tilesx4MED.png", {
      frameWidth: 128,
      frameHeight: 175
    });
    this.load.spritesheet("C_tilesx4DEN", "assets/sprites/commercial/C_tilesx4DEN.png", {
      frameWidth: 128,
      frameHeight: 500
    });




    /////////////////////////////////////////////
    this.load.spritesheet("I_tilesx1", "assets/sprites/industrial/I_tilesx1.png", {
      frameWidth: 32,
      frameHeight: 50
    });
    this.load.spritesheet("I_tilesx2", "assets/sprites/industrial/I_tilesx2.png", {
      frameWidth: 64,
      frameHeight: 90
    });
    this.load.spritesheet("I_tilesx3", "assets/sprites/industrial/I_tilesx3.png", {
      frameWidth: 96,
      frameHeight: 125
    });
    this.load.spritesheet("I_tilesx4", "assets/sprites/industrial/I_tilesx4.png", {
      frameWidth: 128,
      frameHeight: 150
    });
    /////////////////////////////////////
    this.load.spritesheet("E_tilesx2", "assets/sprites/education/E_tilesx2.png", {
      frameWidth: 64,
      frameHeight: 100
    });
    this.load.spritesheet("E_tilesx3", "assets/sprites/education/E_tilesx3.png", {
      frameWidth: 96,
      frameHeight: 100
    });
    this.load.spritesheet("E_tilesx4", "assets/sprites/education/E_tilesx4.png", {
      frameWidth: 128,
      frameHeight: 100
    });
    this.load.spritesheet("E_tilesx5", "assets/sprites/education/E_tilesx5.png", {
      frameWidth: 160,
      frameHeight: 100
    });
    this.load.spritesheet("E_tilesx6", "assets/sprites/education/E_tilesx6.png", {
      frameWidth: 192,
      frameHeight: 175
    });
    this.load.spritesheet("E_tilesx8", "assets/sprites/education/E_tilesx8.png", {
      frameWidth: 256,
      frameHeight: 200
    });
    ////////////////////////////////////////
    this.load.spritesheet("G_tilesx3", "assets/sprites/government/G_tilesx3.png", {
      frameWidth: 96,
      frameHeight: 100
    });
    this.load.spritesheet("G_tilesx4", "assets/sprites/government/G_tilesx4.png", {
      frameWidth: 128,
      frameHeight: 200
    });
    this.load.spritesheet("G_tilesx8", "assets/sprites/government/G_tilesx8.png", {
      frameWidth: 256,
      frameHeight: 158
    });
    this.load.spritesheet("G_tilesx16", "assets/sprites/government/G_tilesx16.png", {
      frameWidth: 512,
      frameHeight: 314
    });
    ////////////////////////////////////////
    this.load.spritesheet("O_tilesx1", "assets/sprites/other/O_tilesx1.png", {
      frameWidth: 32,
      frameHeight: 100
    });
    this.load.spritesheet("O_tilesx2", "assets/sprites/other/O_tilesx2.png", {
      frameWidth: 64,
      frameHeight: 256
    });
    this.load.spritesheet("O_tilesx3", "assets/sprites/other/O_tilesx3.png", {
      frameWidth: 96,
      frameHeight: 213
    });
    this.load.spritesheet("O_tilesx4", "assets/sprites/other/O_tilesx4.png", {
      frameWidth: 128,
      frameHeight: 200
    });
    this.load.spritesheet("O_tilesx5", "assets/sprites/other/O_tilesx5.png", {
      frameWidth: 160,
      frameHeight: 460
    });
    this.load.spritesheet("O_tilesx6", "assets/sprites/other/O_tilesx6.png", {
      frameWidth: 192,
      frameHeight: 720
    });
    this.load.spritesheet("O_tilesx7", "assets/sprites/other/O_tilesx7.png", {
      frameWidth: 224,
      frameHeight: 559
    });
    this.load.spritesheet("O_tilesx9", "assets/sprites/other/O_tilesx9.png", {
      frameWidth: 288,
      frameHeight: 261
    });
    this.load.spritesheet("O_tilesx10", "assets/sprites/other/O_tilesx10.png", {
      frameWidth: 320,
      frameHeight: 159
    });
    this.load.spritesheet("O_tilesx12", "assets/sprites/other/O_tilesx12.png", {
      frameWidth: 384,
      frameHeight: 259
    });
    this.load.spritesheet("O_tilesx16", "assets/sprites/other/O_tilesx16.png", {
      frameWidth: 512,
      frameHeight: 429
    });
    ///////////////////////////////////////
    this.load.spritesheet("utilitiesx1", "assets/sprites/utilities/utilitiesx1.png", {
      frameWidth: 32,
      frameHeight: 80
    });
    this.load.spritesheet("utilitiesx2", "assets/sprites/utilities/utilitiesx2.png", {
      frameWidth: 64,
      frameHeight: 100
    });
    this.load.spritesheet("utilitiesx3", "assets/sprites/utilities/utilitiesx3.png", {
      frameWidth: 96,
      frameHeight: 125
    });
    this.load.spritesheet("utilitiesx4", "assets/sprites/utilities/utilitiesx4.png", {
      frameWidth: 128,
      frameHeight: 175
    });
    this.load.spritesheet("utilitiesx5", "assets/sprites/utilities/utilitiesx5.png", {
      frameWidth: 160,
      frameHeight: 232
    });
    this.load.spritesheet("utilitiesx6", "assets/sprites/utilities/utilitiesx6.png", {
      frameWidth: 192,
      frameHeight: 190
    });
    ////////////////////////////////////////////////////
    this.load.spritesheet("healthx1", "assets/sprites/healthsafety/healthx1.png", {
      frameWidth: 32,
      frameHeight: 50
    });
    this.load.spritesheet("healthx2", "assets/sprites/healthsafety/healthx2.png", {
      frameWidth: 64,
      frameHeight: 75
    });
    this.load.spritesheet("healthx4", "assets/sprites/healthsafety/healthx4.png", {
      frameWidth: 128,
      frameHeight: 166
    });
    this.load.spritesheet("healthx8", "assets/sprites/healthsafety/healthx8.png", {
      frameWidth: 256,
      frameHeight: 156
    });
    /////////////////////////////////////////////////////
    this.load.spritesheet("parksx1", "assets/sprites/parks/parksx1.png", {
      frameWidth: 32,
      frameHeight: 36
    });
    this.load.spritesheet("parksx2", "assets/sprites/parks/parksx2.png", {
      frameWidth: 64,
      frameHeight: 58
    });
    this.load.spritesheet("parksx3", "assets/sprites/parks/parksx3.png", {
      frameWidth: 96,
      frameHeight: 100
    });
    this.load.spritesheet("parksx4", "assets/sprites/parks/parksx4.png", {
      frameWidth: 128,
      frameHeight: 109
    });
    this.load.spritesheet("parksx8", "assets/sprites/parks/parksx8.png", {
      frameWidth: 256,
      frameHeight: 240
    });
    ////////////////////////////////////////////////////////////////

    /*   this.load.spritesheet("municipalx1", "assets/sprites/municipalx1.png", {
        frameWidth: 34,
        frameHeight: 100
      });
      this.load.spritesheet("municipalx2", "assets/sprites/municipalx2.png", {
        frameWidth: 70,
        frameHeight: 100
      }); */
    /////////////////////////////////////////////////////
    /*   this.load.spritesheet("tilesx2", "assets/sprites/tilesx2.png", {
        frameWidth: 70,
        frameHeight: 100
      });
      this.load.spritesheet("tilesx3", "assets/sprites/tilesx3.png", {
        frameWidth: 102,
        frameHeight: 150
      }); */
    /////////////////////////////////////////////////
    this.load.spritesheet("roads", "assets/sprites/transportation/roads.png", {
      frameWidth: 32,
      frameHeight: 34
    });
    this.load.spritesheet("rails", "assets/sprites/transportation/rails.png", {
      frameWidth: 32,
      frameHeight: 34
    });
    this.load.spritesheet("T_tilesx1", "assets/sprites/transportation/T_tilesx1.png", {
      frameWidth: 32,
      frameHeight: 34
    });
    this.load.spritesheet("T_tilesx2", "assets/sprites/transportation/T_tilesx2.png", {
      frameWidth: 64,
      frameHeight: 50
    });
    this.load.spritesheet("T_tilesx3", "assets/sprites/transportation/T_tilesx3.png", {
      frameWidth: 96,
      frameHeight: 100
    });
    this.load.spritesheet("T_tilesx4", "assets/sprites/transportation/T_tilesx4.png", {
      frameWidth: 128,
      frameHeight: 90
    });
    ////////////////////////////////////////////////////////
    this.load.spritesheet("icons", "assets/sprites/menu_icons.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("zones", "assets/sprites/zonesiso.png", {
      frameWidth: 32,
      frameHeight: 17,
      // margin: 1,
      // spacing: 1
    });
    this.load.spritesheet("playpause", "assets/sprites/playpause.png", {
      frameWidth: 14,
      frameHeight: 14,
      // margin: 1,
      // spacing: 1
    });
    this.load.spritesheet("radio", "assets/sprites/radio.png", {
      frameWidth: 40,
      frameHeight: 40,
      // margin: 1,
      // spacing: 1
    });
    this.load.spritesheet("selectx1", "assets/sprites/tiles/selectx1.png", {
      frameWidth: 64,
      frameHeight: 31,
      // margin: 1,
      // spacing: 1
    });
    this.load.spritesheet("start_buttons", "assets/sprites/start_buttons.png", {
      frameWidth: 319,
      frameHeight: 48,
      // margin: 1,
      // spacing: 1
    });
    this.load.spritesheet("arrows", "assets/sprites/arrows.png", {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet("modal_tab", "assets/sprites/modal_tab_finance.png", {
      frameWidth: 900,
      frameHeight: 117,
    });
    //this.load.image('selectx1', 'assets/sprites/tiles/selectx1.png');
    this.load.image('settings', 'assets/sprites/settings.png');
    this.load.image('slider_track', 'assets/sprites/slider_track.png');
    this.load.image('slider_thumb', 'assets/sprites/slider_thumb.png');
    this.load.image('trash', 'assets/sprites/trash.png');
    this.load.image('caution', 'assets/sprites/caution.png');
    this.load.image('modal_top', 'assets/sprites/modal_top.png');
    this.load.image('modal_mid', 'assets/sprites/modal_mid.png');
    this.load.image('modal_bot', 'assets/sprites/modal_bot.png');
    this.load.image('modal_break', 'assets/sprites/modal_break.png');
    this.load.image('scroll_thumb', 'assets/sprites/scroll_thumb.png');
    this.load.image('scroll_track', 'assets/sprites/scroll_track.png');
    this.load.image('scroll_top', 'assets/sprites/scroll_top.png');
    this.load.image('scroll_bot', 'assets/sprites/scroll_bot.png');
    this.load.image('main_ui', 'assets/sprites/main_ui.png');
    this.load.image('home', 'assets/sprites/home.png');
    this.load.image('blank', 'assets/sprites/blank.png');
    // this.load.image('tile', 'assets/sprites/tile.png');
    // this.load.image('cube', 'assets/sprites/cube.png');
    //this.load.image('grass', 'assets/sprites/grass.png');
  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








