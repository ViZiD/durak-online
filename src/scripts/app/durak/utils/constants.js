// regex
export const durakRe = {
  card: /\d+\-\d+/
}

export const DURAK_SUIT = {
  hearts: 0,
  diamonds: 1,
  clubs: 2,
  spades: 3
}

export const SUIT_EMOJI = {
  0: '♥',
  1: '♦',
  2: '♣',
  3: '♠'
}

export const CARDS_VALUE = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 'В',
  12: 'Д',
  13: 'К',
  14: 'Т'
}

export const DURAK_SUITNAME = {
  0: 'hearts',
  1: 'diamonds',
  2: 'clubs',
  3: 'spades'
}

export const DURAK_GAMETYPE = {
  durak: 1,
  bura: 2,
  ochko: 3
}

export const DURAK_DECKLENGTH = {
  deck24: 24,
  deck36: 36,
  deck52: 52
}

export const HELPER_FLAGS = {
  show: 'show',
  hide: 'hide'
}

export const MODE_FLAGS = {
  detailed: 'detailed',
  simple: 'simple'
}

export const DECK_LENGTH_IDS = {
  36: [
    {
      Type: 0,
      Value: 2
    },
    {
      Type: 1,
      Value: 2
    },
    {
      Type: 2,
      Value: 2
    },
    {
      Type: 3,
      Value: 2
    },
    {
      Type: 0,
      Value: 3
    },
    {
      Type: 1,
      Value: 3
    },
    {
      Type: 2,
      Value: 3
    },
    {
      Type: 3,
      Value: 3
    },
    {
      Type: 0,
      Value: 4
    },
    {
      Type: 1,
      Value: 4
    },
    {
      Type: 2,
      Value: 4
    },
    {
      Type: 3,
      Value: 4
    },
    {
      Type: 0,
      Value: 5
    },
    {
      Type: 1,
      Value: 5
    },
    {
      Type: 2,
      Value: 5
    },
    {
      Type: 3,
      Value: 5
    }
  ],

  24: [
    {
      Type: 0,
      Value: 2
    },
    {
      Type: 1,
      Value: 2
    },
    {
      Type: 2,
      Value: 2
    },
    {
      Type: 3,
      Value: 2
    },
    {
      Type: 0,
      Value: 3
    },
    {
      Type: 1,
      Value: 3
    },
    {
      Type: 2,
      Value: 3
    },
    {
      Type: 3,
      Value: 3
    },
    {
      Type: 0,
      Value: 4
    },
    {
      Type: 1,
      Value: 4
    },
    {
      Type: 2,
      Value: 4
    },
    {
      Type: 3,
      Value: 4
    },
    {
      Type: 0,
      Value: 5
    },
    {
      Type: 1,
      Value: 5
    },
    {
      Type: 2,
      Value: 5
    },
    {
      Type: 3,
      Value: 5
    },
    {
      Type: 0,
      Value: 6
    },
    {
      Type: 1,
      Value: 6
    },
    {
      Type: 2,
      Value: 6
    },
    {
      Type: 3,
      Value: 6
    },
    {
      Type: 0,
      Value: 7
    },
    {
      Type: 1,
      Value: 7
    },
    {
      Type: 2,
      Value: 7
    },
    {
      Type: 3,
      Value: 7
    },
    {
      Type: 0,
      Value: 8
    },
    {
      Type: 1,
      Value: 8
    },
    {
      Type: 2,
      Value: 8
    },
    {
      Type: 3,
      Value: 8
    }
  ]
}

// selectors
export const selectors = {
  Table: {
    Card: '.front .OneCardSnippet img[src]',
    OneEnemy: '.oneEnemy',
    TrumpCard: '.isTrump .addClasstrump img'
  },
  MeUser: {
    Me: '.MeUserRound',
    Card: '.OneMyCard .OneCardSnippet img'
  },
  Users: {
    User: '#UserByte',
    EnemyUserSnippet: '.EnemyUserSnippet',
    RemainCards: '.remainCards'
  },
  Enemys: '.Enemys',
  Game: {
    MainScreen: '#root .wrapper',
    Options: '.IcoInfo',
    Type: {
      Durak: '.IcoInfo .TableType.TableTypeIco1',
      Bura: '.IcoInfo .TableType.TableTypeIco2',
      Ochko: '.IcoInfo .TableType.TableTypeIco3'
    }
  },
  GardageList: '.GardageList .GargageCard:last-child',
  ExitButton: '.StopGame .buttonExit',
  TableTypeButton: '.TableType',
  Extension: {
    StyleId: 'link#durakhelperstyle'
  }
}

export const extension = {
  StyleId: 'durakhelperstyle',
  CssFilePath: 'assets/styles/helper.css',
  WsHookFilePath: 'content/scripts/wshook.js'
}
