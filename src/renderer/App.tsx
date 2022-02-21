import { CampaignSelector } from './components/CampaignSelector';
import React from 'react';
import { Editor } from './components/Editor';
import { Campaign } from '../model/Campaign';
export { Campaign, Character, Tile, Item, VOID_TILE, Background } from '../model/Campaign';
import querystring from 'querystring'
import { Config } from './components/Config';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        importCampaign: (campaign: Campaign) => void;
        updateTabletopDir: (dir: string) => void;
      }
    }
  }
}

const query = new URLSearchParams(global.location.search)
const initiallyConfigured = query.get('configured') == 'true';

export type AppState = {
  campaign?: Campaign,
  configured: boolean
}

export class App extends React.Component<{}, AppState> {
  state = { campaign: undefined, configured: initiallyConfigured }

  constructor(props: {}) {
    super(props)

    this.setCampaign = this.setCampaign.bind(this)
    this.importCampaign = this.importCampaign.bind(this)
    this.updateTabletopDir = this.updateTabletopDir.bind(this)
  }

  importCampaign(campaign: Campaign) {
    window.electron.ipcRenderer.importCampaign(campaign);
  }

  updateTabletopDir(dir: string) {
    window.electron.ipcRenderer.updateTabletopDir(dir);
    this.setState({ configured: true })
  }

  setCampaign(campaign: Campaign) {
    this.setState((_state) => ({
      campaign: campaign
    }));
  }

  saveCampaign(campaign: Campaign) {
    console.log("saving campaign")
  }

  render() {
    if(this.state.configured) {
      if(this.state.campaign === undefined) {
        return <CampaignSelector setCampaign={this.setCampaign} />
      } else {
        return <Editor campaign={this.state.campaign} tabletopImport={this.importCampaign}/> 
      }
    } else {
      return <Config updateTabletopDir={this.updateTabletopDir}/>
    }
  }
}