export const apiMethods = {
  setTrump: 'setTrump',
  showGameMove: 'showGameMove',
  pickUpCard: 'pickUpCard',
  doGardage: 'doGardage',
  gameEnd: 'gameEnd',
  SetWinner: 'SetWinner',
  updateUserData: 'updateUserData',
  exitAsViewer: 'exitAsViewer',
  SetGiveUper: 'SetGiveUper',
  showMeCard: 'showMeCard',
  showGameMoveBura2: 'showGameMoveBura2',
  usersRemainCards: 'usersRemainCards',
  ressurectGame: 'ressurectGame',
  AvailableReverse: 'AvailableReverse',
  DisableReverse: 'DisableReverse',
  getNewCardsFirst: 'getNewCardsFirst',
  AvailableReGave: 'AvailableReGave',
  RegaveRun: 'RegaveRun',
  HideReGave: 'HideReGave',
  fixDeck: 'fixDeck',
  setRefund: 'setRefund',
  setOffDeff: 'setOffDeff',
  cantDeff: 'cantDeff',
  UpdateParties: 'UpdateParties',
  addMessage: 'addMessage',
  pong: 'pong',
  showOnline: 'showOnline',
  serviceMessage: 'serviceMessage',
  theStore: 'theStore',
  showWindow: 'showWindow',
  addMessageList: 'addMessageList',
  olympicstate: 'olympicstate',
  clansparam: 'clansparam',
  isLoaded: 'isLoaded',
  pairOfTheDay: 'pairOfTheDay',
  setActivityLeader: 'setActivityLeader',
  openDialogs: 'openDialogs',
  fillGameSlots: 'fillGameSlots',
  bannedMsg: 'bannedMsg',
  initAmuls: 'initAmuls',
  cancelRepeat: 'cancelRepeat',
  setTimer: 'setTimer',
  loseTimer: 'loseTimer',
  UserInfoPopup: 'UserInfoPopup',
  tournamentGames: 'tournamentGames',
  fatalError: 'fatalError',
  stickyNotification: 'stickyNotification',
  BonusConditions2: 'BonusConditions2',
  addPrivateMessages: 'addPrivateMessages',
  ChangeActivity: 'ChangeActivity',
  myOchkoPoints: 'myOchkoPoints',
  FinalOchko: 'FinalOchko',
  UserStatOchko: 'UserStatOchko',
};

// regex
export const durakRe = {
  card: /\d+\-\d+/,
};

export const durakSuit = {
  hearts: 0,
  diamonds: 1,
  clubs: 2,
  spades: 3,
};

export const durakSuitName = {
  0: 'hearts',
  1: 'diamonds',
  2: 'clubs',
  3: 'spades',
};

export const durakGameType = {
  durak: 1,
  bura: 2,
  ochko: 3,
};

export const durakDeckLength = {
  deck24: 24,
  deck36: 36,
  deck52: 52,
};

export const deckLengthIds = {
  36: [
    '2-2',
    '2-3',
    '2-1',
    '2-0',
    '3-0',
    '3-3',
    '3-2',
    '3-1',
    '4-2',
    '4-0',
    '4-3',
    '4-1',
    '5-3',
    '5-1',
    '5-2',
    '5-0',
  ],
  24: [
    '2-2',
    '2-3',
    '2-1',
    '2-0',
    '3-0',
    '3-3',
    '3-2',
    '3-1',
    '4-2',
    '4-0',
    '4-3',
    '4-1',
    '5-3',
    '5-1',
    '5-2',
    '5-0',
    '6-2',
    '6-3',
    '6-0',
    '6-1',
    '7-2',
    '7-0',
    '7-3',
    '7-1',
    '8-2',
    '8-1',
    '8-0',
    '8-3',
  ],
};

// selectors
export const selectors = {
  Table: {
    Card: '.front .OneCardSnippet img[src]',
    OneEnemy: '.oneEnemy',
    TrumpCard: '.isTrump .addClasstrump img',
  },
  MeUser: {
    Me: '.MeUserRound',
    Card: '.OneMyCard .OneCardSnippet img',
  },
  Users: {
    Taker: '.Enemys .Defer .IAmTaker',
    removedTaker: '.IAmTaker',
    User: '#UserByte',
  },
  Game: {
    LoginScreen: '.container .bodysite .loginpage',
    MainScreen: '#root .wrapper .LobbyContainer',
    StartGame: '#root .wrapper .GameWrapper',
    Durak: '.DurakCenter',
    Bura: '.BuraCenter',
    EndGame: '.ModalContent .GameEnd',
    DeckCount: '.IcoInfo .TableDeckCount span',
    Options: '.IcoInfo',
    Type: {
      Durak: '.IcoInfo .TableType.TableTypeIco1',
      Bura: '.IcoInfo .TableType.TableTypeIco2',
      Ochko: '.IcoInfo .TableType.TableTypeIco3',
    },
  },
  GardageList: '.GardageList .GargageCard:last-child',
  ExitButton: '.StopGame .buttonExit',
  TableTypeButton: '.TableType',
  Extension: {
    StyleId: 'link#durakhelperstyle',
  },
};

export const extension = {
  StyleId: 'durakhelperstyle',
  CssFilePath: 'assets/styles/helper.css',
  WsHookFilePath: 'content/scripts/wshook.js',
};
