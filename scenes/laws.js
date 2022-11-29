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
    this.closeIcon = this.add.image(858, 362, 'icons', 20).setOrigin(.5).setScale(1.5).setInteractive().setAlpha(0.01);
    this.nameText = this.add.text(100, 347, 'City laws ', { fontFamily: 'PixelFont', fontSize: '30px', color: '#0057AF', align: 'left', backgroundColor: '#A6CAF0' })

    var scrollMode = 0; // 0:vertical, 1:horizontal
    var gridTable = this.rexUI.add.gridTable({
      x: 450,
      y: 850,
      width: 850,
      height: 820,

      scrollMode: scrollMode,

      background: this.add.image(0, 0, 'blank').setTint(0x0060C0),

      table: {
        cellWidth: undefined,
        cellHeight: 80,

        columns: 1,

        mask: {
          padding: 2
        },


        reuseCellContainer: true
      },


      slider: {
        track: this.add.image(0, 0, 'scroll_track'),
        thumb: this.add.image(0, 0, 'scroll_thumb'),
        adaptThumbSize: false,
        buttons: {
          top: this.add.image(0, 0, 'scroll_top').setScale(2),
          bottom: this.add.image(0, 0, 'scroll_bot').setScale(2),

          step: 0.01,
        }
      },


      mouseWheelScroller: {
        focus: false,
        speed: 0.1
      },


      /* header: this.rexUI.add.label({
        width: undefined,
        height: 30,

        orientation: scrollMode,
        background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
        text: this.add.text(0, 0, 'Header')
      }),

 */
      /*  footer: GetFooterSizer(this, scrollMode), */

      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,

        table: 10,
        header: 10,
        footer: 10
      },


      createCellContainerCallback: function (cell, cellContainer) {
        var scene = cell.scene,
          width = cell.width,
          height = cell.height,
          item = cell.item,
          index = cell.index;
        if (cellContainer === null) {
          cellContainer = scene.rexUI.add.label({
            width: width,
            height: height,

            orientation: scrollMode,
            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, 0x0060C0),
            icon: scene.add.image(25, 500, 'checkbox', 1),
            text: scene.add.bitmapText(0, 0, 'topaz', '', 40).setOrigin(0, .5).setTint(0xCAD4D8),

            space: {
              icon: 10,
              left: 15,
              top: 0
            }
          });


          console.log(cell.index + ': create new cell-container');
        } else {
          console.log(cell.index + ': reuse cell-container');
        }

        // Set properties from item value
        cellContainer.setMinSize(width, height); // Size might changed in this demo
        cellContainer.getElement('text').setText(item.name); // Set text of text object
        cellContainer.getElement('icon').setFrame(sim.gameData.ordinancesSet[cell.index]); // Set fill color of round rectangle object
        cellContainer.getElement('background').setStrokeStyle(2, 0x0060C0).setDepth(0);
        return cellContainer;
      },
      items: ordinances
    }).

      layout();
    //.drawBounds(this.add.graphics(), 0xff0000);

    this.print = this.add.text(200, 0, '');
    gridTable.on('cell.click', function (cellContainer, cellIndex, pointer) {
      this.print.text += 'click ' + cellIndex + ': ' + cellContainer.text + '\n';
      if (sim.gameData.ordinancesSet[cellIndex] == 0) {
        cellContainer.getElement('icon').setFrame(1)
        sim.gameData.ordinancesSet[cellIndex] = 1
      } else {
        cellContainer.getElement('icon').setFrame(0)
        sim.gameData.ordinancesSet[cellIndex] = 0
      }

      var nextCellIndex = cellIndex + 1;
      var nextItem = gridTable.items[nextCellIndex];
      if (!nextItem) {
        return;
      }
      nextItem.color = 0xffffff - nextItem.color;
      gridTable.updateVisibleCell(nextCellIndex);

    }, this)

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
    name: 'Aerospace Tax Incentive',
    cost: '50'
  },
  {
    name: 'Alternate Day Driving',
    cost: '125'
  },
  {
    name: 'Backyard Composting',
    cost: '125'
  },
  {
    name: 'Biotech Tax Incentive',
    cost: '125'
  },
  {
    name: 'Carpool Incentive',
    cost: '125'
  },
  {
    name: 'Clean Air',
    cost: '125'
  },
  {
    name: 'Clean Air Asoociation',
    cost: '125'
  },
  {
    name: 'Community CPR Training',
    cost: '125'
  },
  {
    name: 'Conservation Corps',
    cost: '125'
  },
  {
    name: 'Crossing Gaurds',
    cost: '125'
  },
  {
    name: 'Earthquake Retrofitting',
    cost: '125'
  },
  {
    name: 'Electronics Job Fair',
    cost: '125'
  },
  {
    name: 'Electronics Tax Incentive',
    cost: '125'
  },
  {
    name: 'Farmers Market',
    cost: '125'
  },
  {
    name: 'Free Clinics',
    cost: '125'
  },
  {
    name: 'Homeless Shelter',
    cost: '125'
  },
  {
    name: 'Industrial Pollutant Fee',
    cost: '125'
  },
  {
    name: 'Industrial Waste Disposal Tax',
    cost: '125'
  },
  {
    name: 'Junior Sports',
    cost: '125'
  },
  {
    name: 'Landfill Gas Reovery',
    cost: '125'
  },
  {
    name: 'Lawn Chemical Ban',
    cost: '125'
  },
  {
    name: 'Leaf Burning Ban',
    cost: '125'
  },
  {
    name: 'Legalized Gambling',
    cost: '125'
  },
  {
    name: 'Mandatory Car Smogging',
    cost: '125'
  },
  {
    name: 'Mandatory Smoke Detectors',
    cost: '125'
  },
  {
    name: 'Mandatory Water Meters',
    cost: '125'
  },
  {
    name: 'Neighborhood Watch',
    cost: '125'
  },
  {
    name: 'Nuclear Free Zone',
    cost: '125'
  },
  {
    name: 'Paper Reduction Act',
    cost: '125'
  },
  {
    name: 'Parking Fines',
    cost: '125'
  },
  {
    name: 'Power Conservation',
    cost: '125'
  },
  {
    name: 'Pro Reading Campaign',
    cost: '125'
  },
  {
    name: 'Public Access Cable',
    cost: '125'
  },
  {
    name: 'Public Smoking Ban',
    cost: '125'
  },
  {
    name: 'Shuttle Service',
    cost: '125'
  },
  {
    name: 'Staorwell Lighting',
    cost: '125'
  },
  {
    name: 'Subsidized Mass Transit',
    cost: '125'
  },
  {
    name: 'Tire Recycling',
    cost: '125'
  },
  {
    name: 'Trourism Promotion',
    cost: '125'
  },
  {
    name: 'Trash Presort',
    cost: '125'
  },
  {
    name: 'Water Convervation',
    cost: '125'
  },
  {
    name: 'Youth Curfew',
    cost: '125'
  }

]