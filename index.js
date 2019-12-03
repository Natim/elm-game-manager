import { Elm } from './src/Main.elm'

// The localStorage key to use to store serialized session data
const storeKey = "store";

const app = Elm.Main.init({
  flags: {
    clientUrl: location.origin + location.pathname,
    rawStore: localStorage[storeKey] || ""
  }
});

app.ports.saveStore.subscribe((rawStore) => {
  localStorage[storeKey] = rawStore;
});

// Ensure session is refreshed when it changes in another tab/window
window.addEventListener("storage", (event) => {
  if (event.storageArea === localStorage && event.key === storeKey) {
    app.ports.storeChanged.send(event.newValue);
  }
}, false);
