import { IpcMain } from "electron";
import fs from 'fs';

console.log('event emitter loaded')

export function listen(ipcMain: IpcMain) {
  ipcMain.on('import-campaign', async (event, arg) => {
    console.log("running import campaign in main proc")
    console.log(arg)
  });
}