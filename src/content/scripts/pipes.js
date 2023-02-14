import { Subject, share, filter } from 'rxjs';
import { map } from 'rxjs/operators';

import { wsObserver } from './observers';

import { apiMethods } from './constants';
import {
  normaddMessageData,
  normGameMoveBuraData,
  normGameMoveData,
  normPickUpCard,
  normShowMeCardData,
  normTrumpData,
  normUserData,
} from './utils';

export const mainStream = wsObserver.pipe(
  map((event) => event?.detail?.data),
  map((data) => JSON.parse(data)),
  share({ connector: () => new Subject() }),
);

export const addMessage = mainStream.pipe(
  filter((data) => data?.target === apiMethods.addMessage),
  map((data) => data?.arguments?.[0]),
  map((data) => normaddMessageData(data)),
);

export const cantDeff = mainStream.pipe(
  filter((data) => data?.target === apiMethods.cantDeff),
  map((data) => data?.arguments?.[0]),
);

export const regaveRun = mainStream.pipe(filter((data) => data?.target === apiMethods.RegaveRun));
export const availableReGave = mainStream.pipe(
  filter((data) => data?.target === apiMethods.AvailableReGave),
);
export const hideReGave = mainStream.pipe(filter((data) => data?.target === apiMethods.HideReGave));

export const setTrump = mainStream.pipe(
  filter((data) => data?.target === apiMethods.setTrump),
  map((data) => data?.arguments?.[0]),
  map((data) => normTrumpData(data)),
);
export const showGameMove = mainStream.pipe(
  filter((data) => data?.target === apiMethods.showGameMove),
  map((data) => data?.arguments?.[0]),
  map((data) => normGameMoveData(data)),
);
export const fixDeck = mainStream.pipe(
  filter((data) => data?.target === apiMethods.fixDeck),
  map((data) => data?.arguments?.[0]),
);
export const pickUpCard = mainStream.pipe(
  filter((data) => data?.target === apiMethods.pickUpCard),
  map((data) => data?.arguments),
  map(normPickUpCard),
);
export const doGardage = mainStream.pipe(
  filter((data) => data?.target === apiMethods.doGardage),
  map((data) => data?.arguments?.[0]),
);
export const gameEnd = mainStream.pipe(filter((data) => data?.target === apiMethods.gameEnd));
export const setWinner = mainStream.pipe(
  filter((data) => data?.target === apiMethods.SetWinner),
  map((data) => data?.arguments),
);
export const updateUserData = mainStream.pipe(
  filter((data) => data?.target === apiMethods.updateUserData),
  map((data) => data?.arguments?.[0]),
  map((data) => normUserData(data)),
);
export const exitAsViewer = mainStream.pipe(
  filter((data) => data?.target === apiMethods.exitAsViewer),
);
export const setGiveUper = mainStream.pipe(
  filter((data) => data?.target === apiMethods.SetGiveUper),
  map((data) => data?.arguments),
);
export const showMeCard = mainStream.pipe(
  filter((data) => data?.target === apiMethods.showMeCard),
  map((data) => data?.arguments?.[0]),
  map((data) => normShowMeCardData(data)),
);
export const showGameMoveBura2 = mainStream.pipe(
  filter((data) => data?.target === apiMethods.showGameMoveBura2),
  map((data) => data?.arguments?.[0]),
  map((data) => normGameMoveBuraData(data)),
);
export const usersRemainCards = mainStream.pipe(
  filter((data) => data?.target === apiMethods.usersRemainCards),
  map((data) => data?.arguments?.[0]),
);
export const ressurectGame = mainStream.pipe(
  filter((data) => data?.target === apiMethods.ressurectGame),
  map((data) => data?.arguments?.[0]),
  map((data) => normTrumpData(data)),
);

export const onlyGamesData = mainStream.pipe(
  filter(
    (data) =>
      data?.target !== apiMethods.UpdateParties &&
      data?.target !== apiMethods.addMessage &&
      data?.target !== apiMethods.pong &&
      data?.target !== apiMethods.showOnline &&
      data?.target !== apiMethods.serviceMessage &&
      data?.target !== apiMethods.theStore &&
      data?.target !== apiMethods.showWindow &&
      data?.target !== apiMethods.addMessageList &&
      data?.target !== apiMethods.olympicstate &&
      data?.target !== apiMethods.clansparam &&
      data?.target !== apiMethods.isLoaded &&
      data?.target !== apiMethods.pairOfTheDay &&
      data?.target !== apiMethods.setActivityLeader &&
      data?.target !== apiMethods.openDialogs &&
      data?.target !== apiMethods.fillGameSlots &&
      data?.target !== apiMethods.bannedMsg &&
      data?.target !== apiMethods.initAmuls &&
      data?.target !== apiMethods.loseTimer &&
      data?.target !== apiMethods.setTimer &&
      data?.target !== apiMethods.cancelRepeat,
  ),
);
