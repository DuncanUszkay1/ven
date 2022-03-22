const { contextBridge, ipcRenderer } = require('electron');

console.log("running preload...")

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    importCampaign(campaign) {
      ipcRenderer.send('import-campaign', campaign);
    },
    saveCampaign(campaign) {
      ipcRenderer.send('save-campaign', campaign);
    },
    loadCampaign() {
      ipcRenderer.send('load-campaign-request');
    },
    onCampaignLoad(func) {
      ipcRenderer.on('load-campaign', (event, campaign) => func(campaign))
    },
    saveTileset(tileset) {
      ipcRenderer.send('save-tileset', tileset);
    },
    loadTileset() {
      ipcRenderer.send('load-tileset-request');
    },
    onTilesetLoad(func) {
      ipcRenderer.on('load-tileset', (event, tileset) => func(tileset))
    },
    updateTabletopDir(dir) {
      ipcRenderer.send('update-tabletop-dir', dir)
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
