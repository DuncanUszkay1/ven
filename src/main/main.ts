/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * Boilerplate from https://github.com/electron-react-boilerplate/electron-react-boilerplate
 * 
 * No logic specific to Ven should go in this file.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { resolveHtmlPath } from './util';
import { TabletopImporter } from '../tabletop_simulator/import';
import Store from 'electron-store';
import fs from 'fs';

let mainWindow: BrowserWindow | null = null;

const config = new Store();
const TABLETOP_DIR_KEY = "tabletop_dir"

const configured = () => {
  const storedTabletopValue = config.get(TABLETOP_DIR_KEY)

  return storedTabletopValue != undefined
}

function saveFile(content: any, fileType: string) {
  if(mainWindow !== null) {
    const filename = dialog.showSaveDialogSync(mainWindow, { filters: [{name: fileType, extensions: [".json"]}]})
    if(filename !== undefined) {
      fs.writeFileSync(filename, JSON.stringify(content, replacer, 2));
    }
  }
}

function loadFile(fileType: string) {
  if(mainWindow !== null) {
    const filename = dialog.showOpenDialogSync(mainWindow, { filters: [{name: fileType, extensions: [".json"]}]})
    if(filename !== undefined) {
      const raw_content = fs.readFileSync(filename[0], 'utf8');
      return JSON.parse(raw_content, reviver);
    }
  }
}

ipcMain.on('import-campaign', async (event, arg) => {
  const importer = new TabletopImporter(config.get(TABLETOP_DIR_KEY) as string);
  importer.importCampaign(arg)
});

ipcMain.on('save-campaign', async (event, arg) => { saveFile(arg, "Ven Campaign") });
ipcMain.on('load-campaign-request', async (event) => { event.sender.send('load-campaign', loadFile("Ven Campaign")) });
ipcMain.on('save-tileset', async (event, arg) => { saveFile(arg, "Ven Tileset") });
ipcMain.on('load-tileset-request', async (event) => { event.sender.send('load-tileset', loadFile("Ven Tileset")) });

ipcMain.on('import-tileset-request', async (event, arg) => {
  if(mainWindow !== null) {
    const filename = dialog.showOpenDialogSync(mainWindow, { filters: [{name: "Ven Tilesets", extensions: [".json"]}]})
    if(filename !== undefined) {
      const raw_tileset = fs.readFileSync(filename[0]).toString();
      const tileset = JSON.parse(raw_tileset, reviver);
      event.sender.send('load-tileset', tileset)
    }
  }
});

// https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
function replacer(key: string, value: any) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

function reviver(key: string, value: any) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

ipcMain.on('update-tabletop-dir', async (event, arg) => {
  config.set(TABLETOP_DIR_KEY, arg)
});


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html', `configured=${configured()}`));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
