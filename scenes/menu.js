const COLOR_PRIMARY = 0xffffff;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Menu extends Phaser.Scene {

  constructor() {

    super("Menu");
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
    this.containers = []
    this.menuOpen = false
    this.currentMenu = null
    this.Main = this.scene.get('playGame');
    var tablebg = this.add.image(game.config.width / 2, 15, 'blank').setOrigin(.5, 0).setTint(0xf7f7f7);
    /* this.header.displayWidth = 870;
     this.header.displayHeight = 200; */
    for (var i = 0; i < buildMenu.length; i++) {
      var icon = this.add.image(50 + i * 75, 1575, 'icons', buildMenu[i].frameOff).setOrigin(0, 1).setScale(2).setInteractive()
      icon.name = buildMenu[i].name
      icon.id = buildMenu[i].id
      if (buildMenu[i].subMenu == null) {
        icon.action = 'doze'
      } else {
        // this.createSubMenu(buildMenu[i].name, buildMenu[i].id)
        icon.action = 'none'
      }

      icon.on('pointerdown', this.menuPress.bind(this, icon))

    }
    //this.createTransportationMenu()


    var scrollMode = 0; // 0:vertical, 1:horizontal
    this.gridTable = this.rexUI.add.gridTable({
      x: -450,
      y: 820,
      width: 900,
      height: 990,

      scrollMode: 0,

      //background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0xffffff),
      background: tablebg,
      table: {
        cellWidth: undefined,
        cellHeight: 200,
        columns: 1,
        mask: {
          padding: 2
        },
        reuseCellContainer: true
      },

      /*  slider: {
         track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
         thumb: this.add.image(0, 0, 'blank').setTint(0xff0000).setScale(.5),
         adaptThumbSize: true
       }, */


      mouseWheelScroller: {
        focus: false,
        speed: 0.1
      },


      header: this.rexUI.add.label({
        width: undefined,
        height: 30,

        orientation: scrollMode,
        background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, 0xffffff),
        //text: this.add.text(0, 0, 'Header', { fontFamily: 'Arial', fontSize: 24, color: '#000000' })
        text: this.add.bitmapText(0, 0, 'topaz', 'Header', 36).setTint(0x000000).setAlpha(1)
      }),


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
        cell.setCellContainerAlign('top')
        if (cellContainer === null) {
          cellContainer = scene.rexUI.add.label({
            width: width,
            height: height,
            orientation: scrollMode,

            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, 0xf7f7f7),
            //icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
            icon: scene.add.image(0, 0, buildMenu[0].subMenu[0].sheet, buildMenu[0].subMenu[0].index).setScale(.5),
            //text: scene.add.text(0, 0, '', { color: '#000000' }),
            data: buildMenu[0].subMenu[0],
            type: buildMenu[0].subMenu[0].action,
            text: scene.add.bitmapText(0, 0, 'topaz', '', 40).setTint(0x000000),

            space: {
              icon: 10,
              left: 15,
              top: 0
            }
          });

        }

        // Set properties from item value
        cellContainer.setMinSize(width, height); // Size might changed in this demo
        var text = item.name + ' (' + item.size + ')' + '\n $' + item.cost
        cellContainer.getElement('text').setText(text); // Set text of text object

        cellContainer.data = item
        var scale = getScale(item.size)

        cellContainer.getElement('icon').setTexture(item.sheet, item.index).setOrigin(.5, 1); // Set fill color of round rectangle object
        cellContainer.getElement('icon').displayHeight = 175
        cellContainer.getElement('icon').scaleX = cellContainer.getElement('icon').scaleY
        cellContainer.getElement('background').setStrokeStyle(2, 0xcccccc).setDepth(0);
        return cellContainer;
      },
      items: buildMenu[0].subMenu
    }).

      layout();
    //.drawBounds(this.add.graphics(), 0xff0000);
    //gridTable.setAlpha(0)
    //  this.print = this.add.text(0, 0, '', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });

    this.gridTable.on('cell.click', function (cellContainer, cellIndex, pointer) {
      // this.print.text += 'click ' + cellIndex + ': ' + cellContainer.data.name + '\n';
      console.log(cellContainer.data)
      this.subMenuPress(cellContainer.data)
    }, this)







  }

  update() {

  }
  menuPress(men) {
    console.log(men.name)
    if (men.action == 'doze') {
      gameMode = GM_ERASE;
      return
    }
    if (this.menuOpen) {
      var tween = this.tweens.add({
        targets: this.gridTable,
        x: -450,
        duration: 250,
        onCompleteScope: this,
        onComplete: function () {
          if (this.currentMenu != men.id) {
            var tween = this.tweens.add({
              targets: this.gridTable,
              x: 450,
              duration: 250
            })
            this.gridTable.setItems(buildMenu[men.id].subMenu)
            this.currentMenu = men.id
            // this.gridTable.header.setText(buildMenu[men.id].name)
          } else {
            this.currentMenu = null
            this.menuOpen = false
          }

        }
      })

    } else {
      var tween = this.tweens.add({
        targets: this.gridTable,
        x: 450,
        duration: 250
      })
      this.gridTable.setItems(buildMenu[men.id].subMenu)
      this.gridTable.scrollToTop()
      this.menuOpen = true
      this.currentMenu = men.id
    }

    /* if (men.name == 'Road') {
      gameMode = GM_ROAD
    } else if (men.name == 'Zone') {
      gameMode = GM_ZONE
    } */
  }
  subMenuPress(item) {
    if (item.action == 'place') {
      this.events.emit('place', item);
      this.closeMenu()
      gameMode = GM_PLACE;
    } else if (item.action == 'zone') {
      this.events.emit('zone', item);

      this.closeMenu()
      gameMode = GM_ZONE;
    } else if (item.action == 'close') {
      this.closeMenu()
      gameMode = GM_MENU;
    } else if (item.action == 'road') {
      this.events.emit('transport', item);
      gameMode = GM_ROAD
      this.closeMenu()
    } else if (item.action == 'rail') {
      this.events.emit('transport', item);
      gameMode = GM_RAIL
      this.closeMenu()
    } else if (item.action == 'trans') {

    }
  }
  closeMenu() {
    var tween = this.tweens.add({
      targets: this.gridTable,
      x: -450,
      duration: 250,
      onCompleteScope: this,
      onComplete: function () {
        this.currentMenu = null
        this.menuOpen = false
      }
    })
  }
  createSubMenu(name, id) {
    var container = this.add.container();
    var transbg = this.add.image(0, 1400 + 64, 'blank').setOrigin(0, 1).setAlpha(.8)
    transbg.displayWidth = 600
    transbg.displayHeight = 96 + buildMenu[id].subMenu.length * 145
    container.add(transbg)




    this.containers.push(container)
    for (let u = 0; u < buildMenu[id].subMenu.length; u++) {
      var scale = 3
      if (buildMenu[id].subMenu[u].size == 1) {
        scale = 3.25
      } else if (buildMenu[id].subMenu[u].size == 2) {
        scale = 1.75
      } else if (buildMenu[id].subMenu[u].size == 3) {
        scale = 1
      } else if (buildMenu[id].subMenu[u].size == 4) {
        scale = .75
      } else if (buildMenu[id].subMenu[u].size == 5) {
        scale = .625
      } else if (buildMenu[id].subMenu[u].size == 6) {
        scale = .5
      } else if (buildMenu[id].subMenu[u].size == 8) {
        scale = .375
      } else {
        scale = .4
      }
      var menuItem = this.add.image(60, 1465 - 145 * u, buildMenu[id].subMenu[u].sheet, buildMenu[id].subMenu[u].index).setScale(scale).setOrigin(.5, 1).setInteractive();
      var itemText = this.add.bitmapText(120, 1400 - 145 * u, 'topaz', buildMenu[id].subMenu[u].name + ' (' + buildMenu[id].subMenu[u].size + ')' + '\n $' + buildMenu[id].subMenu[u].cost, 36).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
      menuItem.on('pointerdown', this.subMenuPress.bind(this, menuItem))
      // var menuItem = this.add.image(50, 1400 - 79 * u, utilities[u].sheet, utilities[u].index).setScale(2).setInteractive();
      container.add(menuItem)
      container.add(itemText)
      menuItem.id = buildMenu[id].subMenu[u].id
      menuItem.data = buildMenu[id].subMenu[u];
      menuItem.type = buildMenu[id].subMenu[u].action;
    }
    var testText = this.add.bitmapText(120, 1400 - 145 * buildMenu[id].subMenu.length, 'topaz', buildMenu[id].name, 36).setOrigin(0, .5).setTint(0xff0000).setAlpha(1);
    container.add(testText)
    container.setPosition(-700, 0)
  }




}
function getScale(size) {

}
function getScale_(size) {
  var scale = 3
  if (size == 1) {
    scale = 3.25
  } else if (size == 2) {
    scale = 1.75
  } else if (size == 3) {
    scale = 1
  } else if (size == 4) {
    scale = .75
  } else if (size == 5) {
    scale = .625
  } else if (size == 6) {
    scale = .5
  } else if (size == 8) {
    scale = .375
  } else {
    scale = .4
  }
  return scale
}
let buildMenu = [
  {
    id: 0,
    name: 'Transportation',
    frameOff: 5,
    frameOn: 14,
    subMenu: [
      {
        name: 'Road',
        id: 0,
        index: 6,
        sheet: 'roads',
        size: 1,
        cost: 50,
        action: 'road',
        zone: 22,
        parentMenu: 0,
        jobs: 0,
        globalLV: [1, 3, 3, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Rail',
        id: 1,
        index: 6,
        sheet: 'rails',
        size: 1,
        cost: 50,
        action: 'rail',
        zone: 22,
        parentMenu: 0,
        jobs: 0,
        globalLV: [-4, 0, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Bus Stop',
        id: 2,
        index: 0,
        sheet: 'T_tilesx1',
        size: 1,
        cost: 50,
        action: 'place',
        zone: 22,
        parentMenu: 0,
        airPollution: 50,
        airPollutionRadius: 2,
        waterPollution: 25,
        waterPollutionRadius: 2,
        garbage: 1,
        jobs: 0,
        globalLV: [-10, 12, 5, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Train Stop',
        id: 3,
        index: 0,
        sheet: 'T_tilesx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 22,
        parentMenu: 0,
        airPollution: 50,
        airPollutionRadius: 2,
        waterPollution: 25,
        waterPollutionRadius: 2,
        garbage: 1,
        jobs: 0,
        globalLV: [-15, 10, 10, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Freight Stop',
        id: 4,
        index: 0,
        sheet: 'T_tilesx3',
        size: 3,
        cost: 50,
        action: 'place',
        zone: 22,
        parentMenu: 0,
        airPollution: 500,
        airPollutionRadius: 5,
        waterPollution: 350,
        waterPollutionRadius: 5,
        garbage: 250,
        jobs: 4,
        globalLV: [0, 0, 15, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Taxi Company',
        id: 5,
        index: 1,
        sheet: 'T_tilesx3',
        size: 3,
        cost: 200,
        action: 'place',
        zone: 22,
        parentMenu: 0,
        airPollution: 1000,
        airPollutionRadius: 5,
        waterPollution: 350,
        waterPollutionRadius: 5,
        garbage: 250,
        jobs: 8,
        globalLV: [0, 10, 0, 0],//res,com,ind, other
        localLV: -10
      },
      {
        name: 'Bus Station',
        id: 6,
        index: 0,
        sheet: 'T_tilesx4',
        size: 4,
        cost: 200,
        action: 'place',
        zone: 22,
        parentMenu: 0,
        airPollution: 2000,
        airPollutionRadius: 6,
        waterPollution: 350,
        waterPollutionRadius: 5,
        garbage: 250,
        jobs: 8,
        globalLV: [0, 15, 0, 0],//res,com,ind, other
        localLV: -10
      },
      {
        name: 'Bus System Depot',
        id: 7,
        index: 1,
        sheet: 'T_tilesx4',
        size: 4,
        cost: 200,
        action: 'place',
        zone: 22,
        parentMenu: 0,
        airPollution: 4000,
        airPollutionRadius: 7,
        waterPollution: 350,
        waterPollutionRadius: 5,
        garbage: 250,
        jobs: 8,
        globalLV: [0, 20, 5, 20],//res,com,ind, other
        localLV: -10
      }

    ]

  },
  {
    id: 1,
    name: 'Zone',
    frameOff: 7,
    frameOn: 14,
    subMenu: [
      {
        name: 'Light Residential',
        id: 0,
        index: 0,
        sheet: 'zones',
        size: 1,
        action: 'zone',
        zone: 0,
        cost: 20,
        parentMenu: 1,
        placeHolderFrame: 8,

        color: 0x34BF30,
        size4: 'R_tilesx4LIGHT',
        size3: 'R_tilesx3LIGHT',
        size2: 'R_tilesx2LIGHT',
        size1: 'R_tilesx1LIGHT',
        frames1: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        frames2: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        frames3: [6, 7, 8, 9, 10, 11],
        frames4: [5, 6, 7, 8, 9],
        airPollution: 5,
        airPollutionRadius: 7,
        waterPollution: 10,
        waterPollutionRadius: 5,
        garbage: 1,
        jobs: 0,
        globalLV: [0, 0, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Medium Residential',
        id: 1,
        index: 1,
        sheet: 'zones',
        size: 1,
        action: 'zone',
        zone: 1,
        cost: 20,
        parentMenu: 1,
        zoneArray: 'residential',
        zoneMin: 0,
        zoneMax: 5,
        placeHolderFrame: 9,
        color: 0x34BF30,
        size4: 'R_tilesx4MED',
        size3: 'R_tilesx3MED',
        size2: 'R_tilesx2MED',
        size1: 'R_tilesx1MED',
        frames1: [0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25],
        frames2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 38, 39, 40, 41, 42],
        frames3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        airPollution: 24,
        airPollutionRadius: 10,
        waterPollution: 40,
        waterPollutionRadius: 5,
        garbage: 10,
        jobs: 0,
        globalLV: [0, 0, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Dense Residential',
        id: 2,
        index: 2,
        sheet: 'zones',
        size: 1,
        action: 'zone',
        zone: 2,
        cost: 20,
        parentMenu: 1,
        zoneArray: 'residential',
        zoneMin: 0,
        zoneMax: 5,
        placeHolderFrame: 10,
        color: 0x34BF30,
        size4: 'R_tilesx4DEN',
        size3: 'R_tilesx3DEN',
        size2: 'R_tilesx2DEN',
        size1: 'R_tilesx1DEN',
        frames1: [0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25],
        frames2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        frames3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        airPollution: 59,
        airPollutionRadius: 10,
        waterPollution: 100,
        waterPollutionRadius: 5,
        garbage: 30,
        jobs: 0,
        globalLV: [0, 0, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Light Commercial',
        id: 3,
        index: 3,
        sheet: 'zones',
        size: 1,
        action: 'zone',
        zone: 3,
        cost: 20,
        parentMenu: 1,
        zoneArray: 'commercial',
        zoneMin: 0,
        zoneMax: 5,
        placeHolderFrame: 11,
        color: 0x40B3DE,
        size4: 'C_tilesx4LIGHT',
        size3: 'C_tilesx3LIGHT',
        size2: 'C_tilesx2LIGHT',
        size1: 'C_tilesx1LIGHT',
        frames1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        frames2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        frames3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        airPollution: 10,
        airPollutionRadius: 8,
        waterPollution: 8,
        waterPollutionRadius: 5,
        garbage: 2,
        jobs: 0,
        globalLV: [3, 0, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Medium Commercial',
        id: 4,
        index: 4,
        sheet: 'zones',
        size: 1,
        action: 'zone',
        zone: 4,
        cost: 20,
        parentMenu: 1,
        zoneArray: 'commercial',
        zoneMin: 0,
        zoneMax: 5,
        placeHolderFrame: 12,
        color: 0x40B3DE,
        size4: 'C_tilesx4MED',
        size3: 'C_tilesx3MED',
        size2: 'C_tilesx2MED',
        size1: 'C_tilesx1MED',
        frames1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        frames2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        frames3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        airPollution: 40,
        airPollutionRadius: 10,
        waterPollution: 35,
        waterPollutionRadius: 5,
        garbage: 15,
        jobs: 0,
        globalLV: [0, 0, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Dense Commercial',
        id: 5,
        index: 5,
        sheet: 'zones',
        size: 1,
        action: 'zone',
        zone: 5,
        cost: 20,
        parentMenu: 1,
        zoneArray: 'commercial',
        zoneMin: 0,
        zoneMax: 5,
        placeHolderFrame: 13,
        color: 0x40B3DE,
        size4: 'C_tilesx4DEN',
        size3: 'C_tilesx3DEN',
        size2: 'C_tilesx2DEN',
        size1: 'C_tilesx1DEN',
        frames1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        frames2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        frames3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
        airPollution: 70,
        airPollutionRadius: 13,
        waterPollution: 70,
        waterPollutionRadius: 5,
        garbage: 45,
        jobs: 0,
        globalLV: [0, 5, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Light Industrial',
        id: 6,
        index: 6,
        sheet: 'zones',
        size: 1,
        action: 'zone',
        zone: 6,
        cost: 20,
        parentMenu: 1,
        zoneArray: 'industrial',
        zoneMin: 0,
        zoneMax: 5,
        placeHolderFrame: 14,
        color: 0xB3C619,
        size4: 'I_tilesx4',
        size3: 'I_tilesx3',
        size2: 'I_tilesx2',
        size1: 'I_tilesx1',
        frames1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        frames2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        frames3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        airPollution: 50,
        airPollutionRadius: 7,
        waterPollution: 50,
        waterPollutionRadius: 6,
        garbage: 4,
        jobs: 0,
        globalLV: [-20, -10, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Dense Industrial',
        id: 7,
        index: 7,
        sheet: 'zones',
        size: 1,
        action: 'zone',
        zone: 7,
        cost: 20,
        parentMenu: 1,
        zoneArray: 'industrial',
        zoneMin: 0,
        zoneMax: 5,
        placeHolderFrame: 15,
        color: 0xB3C619,
        size4: 'I_tilesx4',
        size3: 'I_tilesx3',
        size2: 'I_tilesx2',
        size1: 'I_tilesx1',
        frames1: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        frames2: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        frames3: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        frames4: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        airPollution: 125,
        airPollutionRadius: 25,
        waterPollution: 125,
        waterPollutionRadius: 6,
        garbage: 100,
        jobs: 0,
        globalLV: [-30, -20, 0, 0],//res,com,ind, other
        localLV: 0
      }
    ]
  },
  {
    id: 2,
    name: 'Utilities',
    frameOff: 3,
    frameOn: 12,
    subMenu: [
      {
        name: 'Water Tower',
        id: 0,
        index: 0,
        sheet: 'utilitiesx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 9,
        parentMenu: 2,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 0,
        globalLV: [-5, -2, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Water Pump',
        id: 1,
        index: 1,
        sheet: 'utilitiesx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 9,
        parentMenu: 2,
        airPollution: 8,
        airPollutionRadius: 7,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 0,
        globalLV: [-10, 0, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Cell Tower',
        id: 2,
        index: 2,
        sheet: 'utilitiesx1',
        size: 1,
        cost: 1000,
        action: 'place',
        zone: 11,
        parentMenu: 2,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 0,
        globalLV: [-10, 3, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Coal Plant',
        id: 3,
        index: 0,
        sheet: 'utilitiesx2',
        size: 2,
        cost: 5000,
        action: 'place',
        zone: 8,
        parentMenu: 2,
        airPollution: 80000,
        airPollutionRadius: 15,
        waterPollution: 48000,
        waterPollutionRadius: 12,
        garbage: 800,
        jobs: 12,
        globalLV: [-90, -70, -15, -15],//res,com,ind, other
        localLV: -10,
        capacity: 6000
      },
      {
        name: 'Garbage Dump',
        id: 4,
        index: 2,
        sheet: 'utilitiesx2',
        size: 2,
        cost: 1000,
        action: 'place',
        zone: 10,
        parentMenu: 2,
        airPollution: 200,
        airPollutionRadius: 10,
        waterPollution: 200,
        waterPollutionRadius: 15,
        garbage: -1000,
        jobs: 4,
        globalLV: [-20, -20, -5, 0],//res,com,ind, other
        localLV: -10
      },
      {
        name: 'Large Water Tower',
        id: 5,
        index: 3,
        sheet: 'utilitiesx2',
        size: 2,
        cost: 1000,
        action: 'place',
        zone: 9,
        parentMenu: 2,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 0,
        globalLV: [-10, -4, 0, 0],//res,com,ind, other
        localLV: 0
      },
      {
        name: 'Wind Turbine',
        id: 6,
        index: 0,
        sheet: 'utilitiesx3',
        size: 3,
        cost: 250,
        action: 'place',
        zone: 8,
        parentMenu: 2,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 1,
        globalLV: [0, 0, 0, 0],//res,com,ind, other
        localLV: -10,
        capacity: 200
      },
      {
        name: 'Solar Plant',
        id: 7,
        index: 0,
        sheet: 'utilitiesx4',
        size: 4,
        cost: 825,
        action: 'place',
        zone: 8,
        parentMenu: 2,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 1,
        globalLV: [0, 0, 0, 0],//res,com,ind, other
        localLV: -10,
        capacity: 500
      },
      {
        name: 'Water Filtration Plant',
        id: 8,
        index: 1,
        sheet: 'utilitiesx4',
        size: 4,
        cost: 1000,
        action: 'place',
        zone: 9,
        parentMenu: 2,
        airPollution: 200,
        airPollutionRadius: 10,
        waterPollution: -5000,
        waterPollutionRadius: 0,
        garbage: 120,
        jobs: 4,
        globalLV: [-20, -12, -5, -10],//res,com,ind, other
        localLV: -20
      },
      {
        name: 'Fusion Plant',
        id: 9,
        index: 2,
        sheet: 'utilitiesx4',
        size: 4,
        cost: 50000,
        action: 'place',
        zone: 8,
        parentMenu: 2,
        airPollution: 400,
        airPollutionRadius: 5,
        waterPollution: 400,
        waterPollutionRadius: 5,
        garbage: 800,
        jobs: 12,
        globalLV: [-50, -18, -7, -12],
        localLV: -50,
        capacity: 50000
      },
      {
        name: 'Gas Power Plant',
        id: 10,
        index: 0,
        sheet: 'utilitiesx5',
        size: 5,
        cost: 4500,
        action: 'place',
        zone: 8,
        parentMenu: 2,
        airPollution: 32000,
        airPollutionRadius: 20,
        waterPollution: 20000,
        waterPollutionRadius: 7,
        garbage: 800,
        jobs: 12,
        globalLV: [-60, -40, -9, -14],
        localLV: -60,
        capacity: 3000
      },
      {
        name: 'Nuclear Plant',
        id: 11,
        index: 0,
        sheet: 'utilitiesx6',
        size: 6,
        cost: 20000,
        action: 'place',
        zone: 8,
        parentMenu: 2,
        airPollution: 400,
        airPollutionRadius: 5,
        waterPollution: 800,
        waterPollutionRadius: 6,
        garbage: 800,
        jobs: 24,
        globalLV: [-110, -80, -30, -12],
        localLV: -75,
        capacity: 16000
      },
      {
        name: 'Recycling Center',
        id: 12,
        index: 3,
        sheet: 'utilitiesx4',
        size: 4,
        cost: 5000,
        action: 'place',
        zone: 10,
        parentMenu: 2,
        airPollution: 75,
        airPollutionRadius: 3,
        waterPollution: 100,
        waterPollutionRadius: 5,
        garbage: -5000,
        jobs: 5,
        globalLV: [-20, -10, -3, -8],
        localLV: -15
      },

    ]
  },
  {
    id: 3,
    name: 'Health & Safety',
    frameOff: 26,
    frameOn: 27,
    subMenu: [
      {
        name: 'Clinic',
        id: 0,
        index: 0,
        sheet: 'healthx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 12,
        parentMenu: 3,
        airPollution: 150,
        airPollutionRadius: 5,
        waterPollution: 500,
        waterPollutionRadius: 3,
        garbage: 120,
        jobs: 8,
        globalLV: [5, 5, 5, 5],
        localLV: 7
      },
      {
        name: 'Hospital',
        id: 1,
        index: 1,
        sheet: 'healthx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 12,
        parentMenu: 3,
        airPollution: 540,
        airPollutionRadius: 10,
        waterPollution: 720,
        waterPollutionRadius: 5,
        garbage: 216,
        jobs: 12,
        globalLV: [0, 5, 5, 5],
        localLV: 10
      },
      {
        name: 'Police Station',
        id: 2,
        index: 0,
        sheet: 'healthx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 13,
        parentMenu: 3,
        airPollution: 450,
        airPollutionRadius: 10,
        waterPollution: 450,
        waterPollutionRadius: 5,
        garbage: 270,
        jobs: 12,
        globalLV: [10, 15, 10, 10],
        localLV: 10
      },
      {
        name: 'Fire Station',
        id: 3,
        index: 2,
        sheet: 'healthx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 14,
        parentMenu: 3,
        airPollution: 450,
        airPollutionRadius: 10,
        waterPollution: 450,
        waterPollutionRadius: 5,
        garbage: 270,
        jobs: 12,
        globalLV: [5, 12, 12, 10],
        localLV: 8
      },
      {
        name: 'Metro Hospital',
        id: 4,
        index: 1,
        sheet: 'healthx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 12,
        parentMenu: 3,
        airPollution: 850,
        airPollutionRadius: 15,
        waterPollution: 1000,
        waterPollutionRadius: 8,
        garbage: 500,
        jobs: 24,
        globalLV: [15, 15, 5, 5],
        localLV: 10
      },
      {
        name: 'Police Headquarters',
        id: 5,
        index: 0,
        sheet: 'healthx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 13,
        parentMenu: 3,
        airPollution: 850,
        airPollutionRadius: 13,
        waterPollution: 850,
        waterPollutionRadius: 8,
        garbage: 500,
        jobs: 24,
        globalLV: [25, 15, 10, 10],
        localLV: 10
      },
      {
        name: 'Fire Headquarters',
        id: 6,
        index: 2,
        sheet: 'healthx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 14,
        parentMenu: 3,
        airPollution: 850,
        airPollutionRadius: 13,
        waterPollution: 850,
        waterPollutionRadius: 8,
        garbage: 500,
        jobs: 24,
        globalLV: [15, 12, 12, 10],
        localLV: 8
      },
      {
        name: 'Prison',
        id: 7,
        index: 0,
        sheet: 'healthx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 13,
        parentMenu: 3,
        airPollution: 1750,
        airPollutionRadius: 10,
        waterPollution: 1750,
        waterPollutionRadius: 10,
        garbage: 3600,
        jobs: 63,
        globalLV: [-25, -20, -10, -10],
        localLV: -50
      }
    ]
  },
  {
    id: 4,
    name: 'Education',
    frameOff: 24,
    frameOn: 25,
    subMenu: [
      {
        name: 'Elementary School',
        id: 0,
        index: 0,
        sheet: 'E_tilesx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 15,
        parentMenu: 4,
        airPollution: 450,
        airPollutionRadius: 10,
        waterPollution: 450,
        waterPollutionRadius: 5,
        garbage: 360,
        jobs: 11,
        globalLV: [10, 10, 0, 0],
        localLV: 15
      },
      {
        name: 'High School',
        id: 1,
        index: 2,
        sheet: 'E_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 15,
        parentMenu: 4,
        airPollution: 650,
        airPollutionRadius: 10,
        waterPollution: 650,
        waterPollutionRadius: 5,
        garbage: 460,
        jobs: 16,
        globalLV: [10, 10, 0, 0],
        localLV: 15
      },
      {
        name: 'Library',
        id: 2,
        index: 1,
        sheet: 'E_tilesx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 15,
        parentMenu: 4,
        airPollution: 200,
        airPollutionRadius: 10,
        waterPollution: 200,
        waterPollutionRadius: 5,
        garbage: 120,
        jobs: 5,
        globalLV: [15, 15, 0, 0],
        localLV: 15
      },
      {
        name: 'Museum',
        id: 3,
        index: 1,
        sheet: 'E_tilesx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 16,
        parentMenu: 4,
        airPollution: 450,
        airPollutionRadius: 10,
        waterPollution: 450,
        waterPollutionRadius: 5,
        garbage: 270,
        jobs: 6,
        globalLV: [15, 15, 0, 0],
        localLV: 15
      },
      {
        name: 'Performing Arts Center',
        id: 4,
        index: 0,
        sheet: 'E_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 15,
        parentMenu: 4,
        parentMenu: 4,
        airPollution: 450,
        airPollutionRadius: 10,
        waterPollution: 450,
        waterPollutionRadius: 5,
        garbage: 270,
        jobs: 6,
        globalLV: [12, 20, 0, 0],
        localLV: 15
      },
      {
        name: 'University',
        id: 5,
        index: 0,
        sheet: 'E_tilesx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 15,
        parentMenu: 4,
        parentMenu: 4,
        airPollution: 6000,
        airPollutionRadius: 10,
        waterPollution: 6000,
        waterPollutionRadius: 5,
        garbage: 8800,
        jobs: 125,
        globalLV: [5, 15, 0, 0],
        localLV: 10
      },
      {
        name: 'Private School',
        id: 6,
        index: 1,
        sheet: 'E_tilesx6',
        size: 6,
        cost: 100,
        action: 'place',
        zone: 15,
        parentMenu: 4,
        airPollution: 650,
        airPollutionRadius: 10,
        waterPollution: 650,
        waterPollutionRadius: 5,
        garbage: 460,
        jobs: 18,
        globalLV: [5, 10, 0, 0],
        localLV: 15
      },
      {
        name: 'MOMA',
        id: 7,
        index: 0,
        sheet: 'E_tilesx6',
        size: 6,
        cost: 100,
        action: 'place',
        zone: 16,
        parentMenu: 4,
        zone: 16,
        parentMenu: 4,
        airPollution: 450,
        airPollutionRadius: 10,
        waterPollution: 450,
        waterPollutionRadius: 5,
        garbage: 270,
        jobs: 7,
        globalLV: [15, 15, 0, 0],
        localLV: 10
      },
      {
        name: 'Community College',
        id: 8,
        index: 0,
        sheet: 'E_tilesx5',
        size: 5,
        cost: 100,
        action: 'place',
        zone: 15,
        parentMenu: 4,
        zone: 16,
        parentMenu: 4,
        airPollution: 850,
        airPollutionRadius: 10,
        waterPollution: 550,
        waterPollutionRadius: 5,
        garbage: 310,
        jobs: 10,
        globalLV: [10, 10, 0, 0],
        localLV: 10
      },
      {
        name: 'Science Center',
        id: 9,
        index: 2,
        sheet: 'E_tilesx6',
        size: 6,
        cost: 100,
        action: 'place',
        zone: 16,
        parentMenu: 4,
        airPollution: 550,
        airPollutionRadius: 10,
        waterPollution: 550,
        waterPollutionRadius: 5,
        garbage: 290,
        jobs: 9,
        globalLV: [10, 10, 5, 0],
        localLV: 15
      }
    ]
  },
  {
    id: 5,
    name: 'Special',
    frameOff: 6,
    frameOn: 15,
    subMenu: [
      {
        name: 'Lighthouse',
        id: 0,
        index: 0,
        sheet: 'O_tilesx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 1,
        jobs: 1,
        globalLV: [12, 25, 0, 0],//res,com,ind, other
        localLV: 5
      },
      {
        name: 'Big Ben',
        id: 1,
        index: 0,
        sheet: 'O_tilesx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 1,
        jobs: 1,
        globalLV: [12, 25, 0, 0],//res,com,ind, other
        localLV: 5
      },
      {
        name: 'CN Tower',
        id: 2,
        index: 1,
        sheet: 'O_tilesx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 10,
        airPollutionRadius: 10,
        waterPollution: 5,
        waterPollutionRadius: 5,
        garbage: 3,
        jobs: 10,
        globalLV: [5, 55, 0, 15],//res,com,ind, other
        localLV: 25

      },
      {
        name: 'Space Needle',
        id: 3,
        index: 2,
        sheet: 'O_tilesx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 10,
        airPollutionRadius: 10,
        waterPollution: 5,
        waterPollutionRadius: 5,
        garbage: 3,
        jobs: 8,
        globalLV: [5, 40, 0, 15],//res,com,ind, other
        localLV: 15

      },
      {
        name: 'Coit Tower',
        id: 4,
        index: 0,
        sheet: 'O_tilesx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 5,
        airPollutionRadius: 3,
        waterPollution: 3,
        waterPollutionRadius: 2,
        garbage: 1,
        jobs: 1,
        globalLV: [3, 15, 0, 10],//res,com,ind, other
        localLV: 10

      },
      {
        name: 'Flat Iron',
        id: 5,
        index: 1,
        sheet: 'O_tilesx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 125,
        airPollutionRadius: 25,
        waterPollution: 125,
        waterPollutionRadius: 6,
        garbage: 100,
        jobs: 50,
        globalLV: [10, 25, 5, 20],//res,com,ind, other
        localLV: 15

      },
      {
        name: 'Observatory',
        id: 6,
        index: 2,
        sheet: 'O_tilesx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: -25,
        airPollutionRadius: 15,
        waterPollution: -5,
        waterPollutionRadius: 6,
        garbage: 2,
        jobs: 4,
        globalLV: [5, 10, 0, 10],//res,com,ind, other
        localLV: 25

      },
      {
        name: 'Statue of Liberty',
        id: 7,
        index: 0,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 3,
        globalLV: [15, 15, 15, 15],//res,com,ind, other
        localLV: 35

      },
      {
        name: 'Effel Tower',
        id: 8,
        index: 1,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 0,
        globalLV: [15, 15, 0, 15],//res,com,ind, other
        localLV: 45

      },
      {
        name: 'Cultural Palace',
        id: 9,
        index: 2,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 4,
        globalLV: [20, 20, 0, 20],//res,com,ind, other
        localLV: 20

      },
      {
        name: 'Parthonon',
        id: 10,
        index: 3,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 2,
        globalLV: [10, 10, 0, 5],//res,com,ind, other
        localLV: 17

      },
      {
        name: 'Central Station',
        id: 11,
        index: 4,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 500,
        airPollutionRadius: 10,
        waterPollution: 100,
        waterPollutionRadius: 5,
        garbage: 7,
        jobs: 8,
        globalLV: [0, 30, 0, 5],//res,com,ind, other
        localLV: 5

      },
      {
        name: 'John Hancok Building',
        id: 12,
        index: 0,
        sheet: 'O_tilesx5',
        size: 5,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 10,
        jobs: 45,
        globalLV: [70, 13, 70, 5],//res,com,ind, other
        localLV: 20

      },
      {
        name: 'Colosium',
        id: 13,
        index: 1,
        sheet: 'O_tilesx5',
        size: 5,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5,
        airPollution: 0,
        airPollutionRadius: 0,
        waterPollution: 0,
        waterPollutionRadius: 0,
        garbage: 0,
        jobs: 2,
        globalLV: [10, 10, 0, 5],//res,com,ind, other
        localLV: 17

      },
      {
        name: 'Country Club',
        id: 14,
        index: 2,
        sheet: 'O_tilesx5',
        size: 5,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Basilica',
        id: 15,
        index: 3,
        sheet: 'O_tilesx5',
        size: 5,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'United Nations',
        id: 16,
        index: 4,
        sheet: 'O_tilesx5',
        size: 5,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Sears Tower',
        id: 17,
        index: 0,
        sheet: 'O_tilesx6',
        size: 6,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Empire State Building',
        id: 18,
        index: 1,
        sheet: 'O_tilesx6',
        size: 6,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Secret Headquarters',
        id: 19,
        index: 2,
        sheet: 'O_tilesx6',
        size: 6,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Opera House',
        id: 20,
        index: 3,
        sheet: 'O_tilesx6',
        size: 6,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Woolworth Building',
        id: 21,
        index: 4,
        sheet: 'O_tilesx6',
        size: 6,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Transamerica Building',
        id: 22,
        index: 0,
        sheet: 'O_tilesx7',
        size: 7,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'City Palace',
        id: 23,
        index: 1,
        sheet: 'O_tilesx7',
        size: 7,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'City Castle',
        id: 23,
        index: 2,
        sheet: 'O_tilesx7',
        size: 7,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Palace of Fine Arts',
        id: 24,
        index: 3,
        sheet: 'O_tilesx7',
        size: 7,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Notre Dame',
        id: 25,
        index: 4,
        sheet: 'O_tilesx7',
        size: 7,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Casino',
        id: 26,
        index: 0,
        sheet: 'O_tilesx9',
        size: 9,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Giga Mall',
        id: 27,
        index: 0,
        sheet: 'O_tilesx10',
        size: 10,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Corporate Headquarters',
        id: 28,
        index: 0,
        sheet: 'O_tilesx12',
        size: 12,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'Space Complex',
        id: 29,
        index: 0,
        sheet: 'O_tilesx16',
        size: 16,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      },
      {
        name: 'International Airport',
        id: 30,
        index: 1,
        sheet: 'O_tilesx16',
        size: 16,
        cost: 100,
        action: 'place',
        zone: 20,
        parentMenu: 5

      }
    ]
  },
  {
    id: 6,
    name: 'Parks',
    frameOff: 32,
    frameOn: 33,
    subMenu: [
      {
        name: 'Fountain',
        id: 0,
        index: 0,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -5,
        airPollutionRadius: 8,
        waterPollution: -5,
        waterPollutionRadius: 8,
        garbage: 1,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Statue',
        id: 1,
        index: 1,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -5,
        airPollutionRadius: 8,
        waterPollution: -5,
        waterPollutionRadius: 8,
        garbage: 1,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Small Plaza',
        id: 2,
        index: 2,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -5,
        airPollutionRadius: 8,
        waterPollution: -5,
        waterPollutionRadius: 8,
        garbage: 8,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Small Beach',
        id: 3,
        index: 3,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -5,
        airPollutionRadius: 8,
        waterPollution: -5,
        waterPollutionRadius: 8,
        garbage: 8,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Small Forest',
        id: 4,
        index: 4,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 0,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Small Park',
        id: 5,
        index: 5,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -5,
        airPollutionRadius: 8,
        waterPollution: -5,
        waterPollutionRadius: 8,
        garbage: 8,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Picnic Park',
        id: 6,
        index: 0,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 15,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 20
      },
      {
        name: 'Gazeebo',
        id: 7,
        index: 1,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 8,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Large Park',
        id: 2,
        index: 2,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 12,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 20
      },
      {
        name: 'Large Plaza',
        id: 9,
        index: 3,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 8,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Tennis Court',
        id: 10,
        index: 4,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 5,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Statue Plaza',
        id: 11,
        index: 5,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 8,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Playground',
        id: 12,
        index: 6,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 8,
        jobs: 0,
        globalLV: [60, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Basketball Court',
        id: 13,
        index: 7,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 8,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Large Beach',
        id: 14,
        index: 8,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -10,
        airPollutionRadius: 8,
        waterPollution: -10,
        waterPollutionRadius: 8,
        garbage: 11,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Lake Park',
        id: 15,
        index: 0,
        sheet: 'parksx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -30,
        airPollutionRadius: 8,
        waterPollution: -30,
        waterPollutionRadius: 8,
        garbage: 16,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 20
      },
      {
        name: 'Nature Center',
        id: 16,
        index: 1,
        sheet: 'parksx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -30,
        airPollutionRadius: 8,
        waterPollution: -30,
        waterPollutionRadius: 8,
        garbage: 16,
        jobs: 2,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 30
      },
      {
        name: 'Deluxe Plaza',
        id: 17,
        index: 2,
        sheet: 'parksx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -30,
        airPollutionRadius: 8,
        waterPollution: -30,
        waterPollutionRadius: 8,
        garbage: 11,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Baseball',
        id: 18,
        index: 3,
        sheet: 'parksx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -130,
        airPollutionRadius: 8,
        waterPollution: -130,
        waterPollutionRadius: 8,
        garbage: 9,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Extra Lage Park',
        id: 19,
        index: 0,
        sheet: 'parksx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -140,
        airPollutionRadius: 8,
        waterPollution: -140,
        waterPollutionRadius: 8,
        garbage: 16,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 40
      },
      {
        name: 'City Pool',
        id: 20,
        index: 1,
        sheet: 'parksx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -30,
        airPollutionRadius: 8,
        waterPollution: -30,
        waterPollutionRadius: 8,
        garbage: 16,
        jobs: 2,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Oblisk Plaza',
        id: 20,
        index: 2,
        sheet: 'parksx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -30,
        airPollutionRadius: 8,
        waterPollution: -30,
        waterPollutionRadius: 8,
        garbage: 16,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Small Stadium',
        id: 21,
        index: 0,
        sheet: 'parksx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -130,
        airPollutionRadius: 8,
        waterPollution: -130,
        waterPollutionRadius: 8,
        garbage: 35,
        jobs: 3,
        globalLV: [20, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Water Park',
        id: 22,
        index: 1,
        sheet: 'parksx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -30,
        airPollutionRadius: 8,
        waterPollution: -30,
        waterPollutionRadius: 8,
        garbage: 25,
        jobs: 3,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Zoo',
        id: 23,
        index: 2,
        sheet: 'parksx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 17,
        airPollution: -130,
        airPollutionRadius: 8,
        waterPollution: -130,
        waterPollutionRadius: 8,
        garbage: 50,
        jobs: 12,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 20
      },
      {
        name: 'Large Stadium',
        id: 24,
        index: 3,
        sheet: 'parksx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -150,
        airPollutionRadius: 8,
        waterPollution: -150,
        waterPollutionRadius: 8,
        garbage: 75,
        jobs: 13,

      },
      {
        name: 'Music Festival',
        id: 25,
        index: 4,
        sheet: 'parksx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -100,
        airPollutionRadius: 8,
        waterPollution: -100,
        waterPollutionRadius: 8,
        garbage: 50,
        jobs: 4,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Lage Forest',
        id: 26,
        index: 5,
        sheet: 'parksx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -2500,
        airPollutionRadius: 16,
        waterPollution: -2500,
        waterPollutionRadius: 16,
        garbage: 16,
        jobs: 0,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 100
      },
      {
        name: 'Amusement Park',
        id: 27,
        index: 6,
        sheet: 'parksx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 18,
        parentMenu: 6,
        airPollution: -30,
        airPollutionRadius: 8,
        waterPollution: -30,
        waterPollutionRadius: 8,
        garbage: 60,
        jobs: 9,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'State Park',
        id: 28,
        index: 7,
        sheet: 'parksx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 17,
        parentMenu: 6,
        airPollution: -1500,
        airPollutionRadius: 8,
        waterPollution: -1500,
        waterPollutionRadius: 8,
        garbage: 16,
        jobs: 5,
        globalLV: [50, 30, 10, 8],//res,com,ind, other
        localLV: 100
      }

    ]
  },
  {
    id: 7,
    name: 'Government',
    frameOff: 4,
    frameOn: 13,
    subMenu: [
      {
        name: 'City Hall',
        id: 0,
        index: 0,
        sheet: 'G_tilesx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 19,
        parentMenu: 6,
        airPollution: 200,
        airPollutionRadius: 10,
        waterPollution: 200,
        waterPollutionRadius: 5,
        garbage: 64,
        jobs: 15,
        globalLV: [20, 25, 0, 0],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Post Office',
        id: 1,
        index: 1,
        sheet: 'G_tilesx3',
        size: 3,
        cost: 100,
        action: 'place',
        zone: 19,
        parentMenu: 6,

        airPollution: 200,
        airPollutionRadius: 10,
        waterPollution: 200,
        waterPollutionRadius: 5,
        garbage: 64,
        jobs: 6,
        globalLV: [20, 25, 0, 0],//res,com,ind, other
        localLV: 10

      },
      {
        name: 'Bank',
        id: 2,
        index: 0,
        sheet: 'G_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 19,

        parentMenu: 6,
        airPollution: 200,
        airPollutionRadius: 10,
        waterPollution: 200,
        waterPollutionRadius: 5,
        garbage: 64,
        jobs: 5,
        globalLV: [20, 25, 0, 0],//res,com,ind, other
        localLV: 10
      },
      {
        name: 'Courthouse',
        id: 3,
        index: 1,
        sheet: 'G_tilesx4',
        size: 4,
        cost: 100,
        action: 'place',
        zone: 19,
        parentMenu: 6,
        airPollution: 200,
        airPollutionRadius: 10,
        waterPollution: 200,
        waterPollutionRadius: 5,
        garbage: 64,
        jobs: 7,
        globalLV: [20, 25, 0, 0],//res,com,ind, other
        localLV: 10

      },
      {
        name: 'Small Military Base',
        id: 4,
        index: 0,
        sheet: 'G_tilesx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 21,
        parentMenu: 6,
        airPollution: 50000,
        airPollutionRadius: 20,
        waterPollution: 50000,
        waterPollutionRadius: 10,
        garbage: 4000,
        jobs: 250,
        globalLV: [-20, 12, 12, -8],//res,com,ind, other
        localLV: -15

      },
      {
        name: 'Embassy',
        id: 5,
        index: 1,
        sheet: 'G_tilesx8',
        size: 8,
        cost: 100,
        action: 'place',
        zone: 19,
        parentMenu: 6,
        airPollution: 300,
        airPollutionRadius: 4,
        waterPollution: 300,
        waterPollutionRadius: 3,
        garbage: 264,
        jobs: 25,
        globalLV: [10, 35, 0, 35],//res,com,ind, other
        localLV: 10

      },
      {
        name: 'Large Military Base',
        id: 6,
        index: 0,
        sheet: 'G_tilesx16',
        size: 16,
        cost: 100000,
        action: 'place',
        zone: 21,
        parentMenu: 6,
        airPollution: 70000,
        airPollutionRadius: 10,
        waterPollution: 50000,
        waterPollutionRadius: 7,
        garbage: 10000,
        jobs: 450,
        globalLV: [-60, 12, 24, -8],//res,com,ind, other
        localLV: -55

      }
    ]
  },
  {
    id: 7,
    name: 'Bulldoze',
    frameOff: 0,
    frameOn: 9,
    subMenu: null
  }
]



var lRL = [
  {
    name: 'Water Tower',
    id: 0,


  }
]