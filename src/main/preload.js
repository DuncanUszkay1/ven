const { contextBridge, ipcRenderer } = require('electron');

console.log("running preload...")

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    importCampaign(campaign) {
      console.log("Context bridge sending campaign")
      ipcRenderer.send('import-campaign', campaign);
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
