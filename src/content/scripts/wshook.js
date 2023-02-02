import { Observable } from 'rxjs';
import { filter, connectable, Subject, share } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const wsObserver = new Observable((subscriber) => {
  console.log('sub!!!');
  let property = Object.getOwnPropertyDescriptor(MessageEvent.prototype, 'data');

  const data = property.get;

  // wrapper that replaces getter
  function lookAtMessage() {
    let socket = this.currentTarget instanceof WebSocket;

    if (!socket) {
      return data.call(this);
    }

    let msg = data.call(this);

    Object.defineProperty(this, 'data', { value: msg }); //anti-loop
    msg.split(/[\u001E]/).forEach((e) => {
      if (e) subscriber.next(e);
    });
    return msg;
  }

  property.get = lookAtMessage;

  Object.defineProperty(MessageEvent.prototype, 'data', property);
});

const mainStream = wsObserver.pipe(
  map((data) => JSON.parse(data)),
  share({ connector: () => new Subject() }),
);

const setTrump = mainStream.pipe(filter((data) => data?.target === 'setTrump'));
const showGameMove = mainStream.pipe(filter((data) => data?.target === 'showGameMove'));
const pickUpCard = mainStream.pipe(filter((data) => data?.target === 'pickUpCard'));
const doGardage = mainStream.pipe(filter((data) => data?.target === 'doGardage'));
const gameEnd = mainStream.pipe(filter((data) => data?.target === 'gameEnd'));
const setWinner = mainStream.pipe(filter((data) => data?.target === 'SetWinner'));
const updateUserData = mainStream.pipe(filter((data) => data?.target === 'updateUserData'));
const exitAsViewer = mainStream.pipe(filter((data) => data?.target === 'exitAsViewer'));

setTrump.subscribe(console.log);
showGameMove.subscribe(console.log);
pickUpCard.subscribe(console.log);
doGardage.subscribe(console.log);
gameEnd.subscribe(console.log);
setWinner.subscribe(console.log);
updateUserData.subscribe(console.log);
exitAsViewer.subscribe(console.log);
