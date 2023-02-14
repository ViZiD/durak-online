(function () {
  let property = Object.getOwnPropertyDescriptor(MessageEvent.prototype, 'data');

  const data = property.get;

  function lookAtMessage() {
    let socket = this.currentTarget instanceof WebSocket;

    if (!socket) {
      return data.call(this);
    }

    let msg = data.call(this);

    Object.defineProperty(this, 'data', { value: msg });
    msg.split(/[\u001E]/).forEach((e) => {
      if (e) {
        window.dispatchEvent(
          new CustomEvent('67d9c2e32832c736384a628445c06821', {
            detail: {
              data: e,
            },
          }),
        );
      }
    });
    return msg;
  }

  property.get = lookAtMessage;

  Object.defineProperty(MessageEvent.prototype, 'data', property);
})();
