import { selectors, extension } from './constants';

export function throttle(cb, timeout = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, timeout);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, timeout);
  };
}

let debounceTimer;
export const debounce = (cb, timeout = 300) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(cb, timeout);
};

export const getUserCordinate = (position) => {
  const user = document.querySelector(`#UserByte${position}`);
  const rect = user.getBoundingClientRect();
  return { x: rect.left, y: rect.top };
};

export const getUserElementByPosition = (position) =>
  document.querySelector(`${selectors.Users.User}${position}`);

// export const checkLocation = (hostname, domain) => {
//   const resourceRe = new RegExp('(https://(.*' + hostname + '\\.' + domain + '/.*))/i');
//   if (window.location.href.match(resourceRe)) return true;
//   return false;
// };

const nullthrows = (v) => {
  if (v == null) throw new Error("it's a null");
  return v;
};

export const injectCode = (src) => {
  const script = document.createElement('script');
  script.setAttribute('src', src);

  nullthrows(document.head || document.documentElement).appendChild(script);
};

export const injectCSS = (url) => {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('id', extension.StyleId);
  link.setAttribute('href', url);
  nullthrows(document.head).appendChild(link);
};

export const removeInjectedCSS = () => {
  const link = document.querySelector(selectors.Extension.StyleId);
  link && link.remove();
};

export function checkParent(child, selector) {
  if (child.closest(selector) === null) {
    return false;
  }
  return true;
}

export function sortByOrder(a, b) {
  const sort_order = {
    2: 10,
    3: 20,
    4: 30,
    5: 40,
    6: 50,
    7: 60,
    8: 70,
    9: 80,
    10: 90,
    В: 100,
    Д: 200,
    К: 300,
    Т: 400,
  };
  return sort_order[a.name] - sort_order[b.name];
}

const isEmpty = (obj) =>
  obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;

const assingIdToCard = (card) => Object.assign(card, { Id: `${card?.Value}-${card?.Type}` });

export function normUserData(data) {
  return {
    is_adm: data?.adm,
    id: data?.Id,
    in_game: data?.in_game,
    games_today: data?.games_today,
    win_today: data?.win_today,
    gameId: data?.SlotId,
    coordinate: { x: 0, y: 0 },
  };
}

export const normTrumpData = (data) => {
  const users = data?.Users.map((user) => ({
    id: user?.Id,
    position: user?.num,
    me: false,
    remainCards: 0,
  }));
  const moveUser = data?.Users.find((user) => user?.Id === data?.MoveUser);
  const lowTrumpCard = {
    user: {
      id: moveUser?.Id,
      position: moveUser?.num,
    },
    lowTrump: data?.DeckTrump
      ? assingIdToCard({ Value: data?.LowTrump, Type: data?.DeckTrump.Type })
      : { Type: 0, Value: 0, Id: '0-0' },
  };
  const session = {
    totalUsers: data?.TotalUsers,
    gameType: data?.GameType,
    deckLength: data?.DeckLength,
    deckTrump: data?.DeckTrump ? assingIdToCard(data?.DeckTrump) : { Type: 0, Value: 0, Id: '0-0' },
    gameId: data?.Id,
    lowTrump: lowTrumpCard,
  };

  return {
    session,
    users,
  };
};

export function normGameMoveData(data) {
  return data
    .map((move) => {
      const { CardMove, DefCard } = move;
      return [{ ...CardMove }, { ...DefCard }];
    })
    .flat(1)
    .filter((card) => !isEmpty(card))
    .map((card) => assingIdToCard(card));
}

export function normGameMoveBuraData(data) {
  return data
    .map((move) => {
      const { Cards, Pusher } = move;
      return Cards.map((card) => Object.assign(card, { Pusher })).map((card) =>
        assingIdToCard(card),
      );
    })
    .flat(1);
}

export function normShowMeCardData(data) {
  return data.map((card) => assingIdToCard(card));
}

export function normPickUpCard(data) {
  return { userId: data?.[0], position: data?.[1] };
}

export function normaddMessageData(data) {
  return { Id: data?.Id, Message: data?.Message, Name: data?.Name };
}
