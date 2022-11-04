class Menu extends Phaser.Scene {

  constructor() {

    super("Menu");
  }
  preload() {



  }
  create() {
    this.containers = []
    this.menuOpen = false
    this.currentMenu = null
    this.Main = this.scene.get('playGame');
    /*  this.header = this.add.image(game.config.width / 2, 15, 'blank').setOrigin(.5,0).setTint(0x3e5e71);
   this.header.displayWidth = 870;
   this.header.displayHeight = 200; */
    for (var i = 0; i < buildMenu.length; i++) {
      var icon = this.add.image(50 + i * 75, 1575, 'icons', buildMenu[i].frameOff).setOrigin(0, 1).setScale(2).setInteractive()
      icon.name = buildMenu[i].name
      icon.id = buildMenu[i].id
      if (buildMenu[i].subMenu == null) {
        icon.action = 'doze'
      } else {
        this.createSubMenu(buildMenu[i].name, buildMenu[i].id)
        icon.action = 'none'
      }

      icon.on('pointerdown', this.menuPress.bind(this, icon))

    }
    //this.createTransportationMenu()

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
        targets: this.containers[this.currentMenu],
        x: -700,
        duration: 250,
        onCompleteScope: this,
        onComplete: function () {
          if (this.currentMenu != men.id) {
            var tween = this.tweens.add({
              targets: this.containers[men.id],
              x: 0,
              duration: 250
            })

            this.currentMenu = men.id
          } else {
            this.currentMenu = null
            this.menuOpen = false
          }

        }
      })

    } else {
      var tween = this.tweens.add({
        targets: this.containers[men.id],
        x: 0,
        duration: 250
      })

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
    if (item.type == 'place') {
      this.events.emit('place', item.data);
      this.closeMenu()
      gameMode = GM_PLACE;
    } else if (item.type == 'zone') {
      this.events.emit('zone', item.data);

      this.closeMenu()
      gameMode = GM_ZONE;
    } else if (item.type == 'close') {
      this.closeMenu()
      gameMode = GM_MENU;
    } else if (item.type == 'road') {
      this.events.emit('transport', item.data);
      gameMode = GM_ROAD
      this.closeMenu()
    } else if (item.type == 'rail') {
      this.events.emit('transport', item.data);
      gameMode = GM_RAIL
      this.closeMenu()
    } else if (item.type == 'trans') {

    }
  }
  closeMenu() {
    var tween = this.tweens.add({
      targets: this.containers[this.currentMenu],
      x: -700,
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
        action: 'road'

      },
      {
        name: 'Rail',
        id: 1,
        index: 6,
        sheet: 'rails',
        size: 1,
        cost: 50,
        action: 'rail'

      },
      {
        name: 'Bus Stop',
        id: 2,
        index: 0,
        sheet: 'T_tilesx1',
        size: 1,
        cost: 50,
        action: 'place'

      },
      {
        name: 'Train Stop',
        id: 3,
        index: 0,
        sheet: 'T_tilesx2',
        size: 2,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Freight Stop',
        id: 4,
        index: 0,
        sheet: 'T_tilesx3',
        size: 3,
        cost: 50,
        action: 'place'

      },
      {
        name: 'Taxi Company',
        id: 5,
        index: 1,
        sheet: 'T_tilesx3',
        size: 3,
        cost: 200,
        action: 'place'

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
        placeHolderFrame: 8,
        zoneArray: 'residential',
        zoneMin: 0,
        zoneMax: 5,
        color: 0x34BF30,
        size4: 'R_tilesx4LIGHT',
        size3: 'R_tilesx3LIGHT',
        size2: 'R_tilesx2LIGHT',
        size1: 'R_tilesx1LIGHT',
        frames1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        frames2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 38, 39],
        frames3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

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
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

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
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

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
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

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
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

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
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]

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
        frames4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]


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
        frames4: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
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
        action: 'place'

      },
      {
        name: 'Water Pump',
        id: 1,
        index: 1,
        sheet: 'utilitiesx1',
        size: 1,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Water Filtration Plant',
        id: 5,
        index: 2,
        sheet: 'utilitiesx4',
        size: 4,
        cost: 1000,
        action: 'place'

      },
      {
        name: 'Wind Turbine',
        id: 6,
        index: 0,
        sheet: 'utilitiesx3',
        size: 3,
        cost: 1000,
        action: 'place'

      },
      {
        name: 'Coal Plant',
        id: 2,
        index: 0,
        sheet: 'utilitiesx2',
        size: 2,
        cost: 1000,
        action: 'place'

      },
      {
        name: 'Nuclear Plant',
        id: 3,
        index: 0,
        sheet: 'utilitiesx4',
        size: 4,
        cost: 7000,
        action: 'place'

      },
      {
        name: 'Solar Plant',
        id: 7,
        index: 1,
        sheet: 'utilitiesx4',
        size: 4,
        cost: 1000,
        action: 'place'

      },
      {
        name: 'Cell Tower',
        id: 4,
        index: 2,
        sheet: 'utilitiesx1',
        size: 1,
        cost: 1000,
        action: 'place'

      }
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
        action: 'place'

      },
      {
        name: 'Hospital',
        id: 1,
        index: 1,
        sheet: 'healthx2',
        size: 2,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Police Station',
        id: 2,
        index: 0,
        sheet: 'healthx2',
        size: 2,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Fire Station',
        id: 3,
        index: 2,
        sheet: 'healthx2',
        size: 2,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Metro Hospital',
        id: 4,
        index: 1,
        sheet: 'healthx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Police Headquarters',
        id: 5,
        index: 0,
        sheet: 'healthx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Fire Headquarters',
        id: 6,
        index: 2,
        sheet: 'healthx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Prison',
        id: 7,
        index: 0,
        sheet: 'healthx8',
        size: 8,
        cost: 100,
        action: 'place'

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
        action: 'place'

      },
      {
        name: 'High School',
        id: 1,
        index: 2,
        sheet: 'E_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Library',
        id: 2,
        index: 1,
        sheet: 'E_tilesx2',
        size: 2,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Museum',
        id: 3,
        index: 1,
        sheet: 'E_tilesx3',
        size: 3,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Science Museum',
        id: 4,
        index: 0,
        sheet: 'E_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'University',
        id: 5,
        index: 0,
        sheet: 'E_tilesx8',
        size: 8,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Private School',
        id: 6,
        index: 1,
        sheet: 'E_tilesx6',
        size: 6,
        cost: 100,
        action: 'place'

      },
      {
        name: 'MOMA',
        id: 7,
        index: 0,
        sheet: 'E_tilesx6',
        size: 6,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Community College',
        id: 8,
        index: 0,
        sheet: 'E_tilesx5',
        size: 5,
        cost: 100,
        action: 'place'

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
        action: 'place'

      },
      {
        name: 'Mayor\'s House',
        id: 1,
        index: 0,
        sheet: 'O_tilesx2',
        size: 2,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Radio Station',
        id: 2,
        index: 1,
        sheet: 'O_tilesx2',
        size: 2,
        cost: 100,
        action: 'place'

      },
      {
        name: 'City Hall',
        id: 3,
        index: 0,
        sheet: 'O_tilesx3',
        size: 3,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Mall',
        id: 4,
        index: 0,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Casino',
        id: 5,
        index: 1,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Statue of Liberty',
        id: 6,
        index: 2,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Effel Tower',
        id: 7,
        index: 3,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Lincoln Memorial',
        id: 8,
        index: 4,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'White House',
        id: 9,
        index: 5,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Castle',
        id: 10,
        index: 6,
        sheet: 'O_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

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
        action: 'place'

      },
      {
        name: 'Statue',
        id: 1,
        index: 1,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Small Plaza',
        id: 2,
        index: 2,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Small Beach',
        id: 3,
        index: 3,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Small Forest',
        id: 4,
        index: 4,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Small Park',
        id: 5,
        index: 5,
        sheet: 'parksx1',
        size: 1,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Large Park',
        id: 6,
        index: 0,
        sheet: 'parksx2',
        size: 2,
        cost: 100,
        action: 'place'

      },
      {
        name: 'City Pool',
        id: 7,
        index: 3,
        sheet: 'parksx3',
        size: 3,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Stadium',
        id: 8,
        index: 1,
        sheet: 'parksx4',
        size: 4,
        cost: 100,
        action: 'place'

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
        action: 'place'

      },
      {
        name: 'Post Office',
        id: 1,
        index: 1,
        sheet: 'G_tilesx3',
        size: 3,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Bank',
        id: 2,
        index: 0,
        sheet: 'G_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Courthouse',
        id: 3,
        index: 1,
        sheet: 'G_tilesx4',
        size: 4,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Small Military Base',
        id: 4,
        index: 0,
        sheet: 'G_tilesx8',
        size: 8,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Embassy',
        id: 5,
        index: 1,
        sheet: 'G_tilesx8',
        size: 8,
        cost: 100,
        action: 'place'

      },
      {
        name: 'Large Military Base',
        id: 6,
        index: 0,
        sheet: 'G_tilesx16',
        size: 16,
        cost: 100000,
        action: 'place'

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
let zone = [

]
//T_tilesx1
let transportation =
  [
    {
      name: 'road',
      id: 0,
      index: 6,
      sheet: 'roads',
      size: 1,
      cost: 50

    },
    {
      name: 'rail',
      id: 1,
      index: 6,
      sheet: 'rails',
      size: 1,
      cost: 50

    },
    {
      name: 'Bus Stop',
      id: 2,
      index: 0,
      sheet: 'T_tilesx1',
      size: 1,
      cost: 50

    },
    {
      name: 'Train Stop',
      id: 3,
      index: 0,
      sheet: 'T_tilesx2',
      size: 2,
      cost: 100

    },
    {
      name: 'Freight Stop',
      id: 4,
      index: 0,
      sheet: 'T_tilesx3',
      size: 3,
      cost: 50

    },
    {
      name: 'Taxi Company',
      id: 5,
      index: 1,
      sheet: 'T_tilesx3',
      size: 3,
      cost: 200

    }

  ]

let zones =
  [
    {
      name: 'Light Residential',
      id: 0,
      sheet: 'zones',
      zone: 0,
      index: 0,
      cost: 20,
      zoneArray: 'residential',
      zoneMin: 0,
      zoneMax: 5
    },
    /* {
      name: 'Medium Residential',
      id: 1,
      sheet: 'zones',
      zone: 1,
      index: 1,
      cost: 75,
      zoneArray: 'residential',
      zoneMin: 6,
      zoneMax: 12
    },
    {
      name: 'Dense Residential',
      id: 2,
      sheet: 'zones',
      zone: 2,
      index: 2,
      cost: 200,
      zoneArray: 'residential',
      zoneMin: 13,
      zoneMax: 19
    },
    {
      name: 'Light Commercial',
      id: 3,
      sheet: 'zones',
      index: 3,
      zone: 3,
      cost: 20,
      zoneArray: 'commercial',
      zoneMin: 0,
      zoneMax: 2
    },
    {
      name: 'Medium Commercial',
      id: 4,
      sheet: 'zones',
      index: 4,
      zone: 4,
      cost: 80,
      zoneArray: 'commercial',
      zoneMin: 10,
      zoneMax: 12
    },
    {
      name: 'Dense Commercial',
      id: 5,
      sheet: 'zones',
      index: 5,
      zone: 5,
      cost: 500,
      zoneArray: 'commercial',
      zoneMin: 20,
      zoneMax: 22
    },
    {
      name: 'Light Industrial',
      id: 6,
      sheet: 'zones',
      index: 6,
      zone: 6,
      cost: 10,
      zoneArray: 'industrial',
      zoneMin: 0,
      zoneMax: 7
    },
    {
      name: 'Heavy Industrial',
      id: 7,
      sheet: 'zones',
      index: 7,
      zone: 7,
      cost: 150,
      zoneArray: 'industrial',
      zoneMin: 8,
      zoneMax: 14
    } */
  ]