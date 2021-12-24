import { IpcMain } from "electron";
import fs from 'fs';

console.log('event emitter loaded')

export function listen(ipcMain: IpcMain) {
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    fs.readdir('.', (err, files) => {
      if(err) {
        console.log("failed to read dir")
        console.log(err)
      } else {
        event.reply('ipc-example', msgTemplate(files.join(',')));
      }
    })
  });
}