export default class BrowserWebSocketShim {
  constructor() {
    throw new Error(
      'The Node-only "ws" transport is unavailable in the browser runtime.',
    )
  }
}
