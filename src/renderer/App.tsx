import { CampaignSelector } from './components/CampaignSelector';
import React from 'react';
import { Editor } from './components/Editor';
import { Campaign, EMPTY_CAMPAIGN } from '../model/Campaign';
export { Campaign, Character, Tile, Item, VOID_TILE, Background } from '../model/Campaign';
import { Config } from './components/Config';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        importCampaign: (campaign: Campaign) => void;
        saveCampaign: (campaign: Campaign) => void;
        loadCampaign: () => void;
        onCampaignLoad: (func: (campaign: Campaign) => void) => void; 
        saveTileset: (tiles: Tile[]) => void;
        loadTileset: () => void;
        onTilesetLoad: (func: (tiles: Tile[]) => void) => void; 
        updateTabletopDir: (dir: string) => void;
      }
    }
  }
}

const query = new URLSearchParams(global.location.search)
const initiallyConfigured = query.get('configured') == 'true';

export type AppState = {
  campaign?: Campaign,
  configured: boolean,
}

export class App extends React.Component<{cool: boolean}, AppState> {
  state = { campaign: undefined, configured: initiallyConfigured }

  componentDidMount() {
    window.electron.ipcRenderer.onCampaignLoad((campaign: Campaign) => {
      this.setState({ campaign })
    })
  }

  constructor(props: {}) {
    super(props)

    this.setCampaign = this.setCampaign.bind(this)
    this.importCampaign = this.importCampaign.bind(this)
    this.updateTabletopDir = this.updateTabletopDir.bind(this)
    this.saveCampaign = this.saveCampaign.bind(this)
    this.newCampaign = this.newCampaign.bind(this);
    this.loadCampaign = this.loadCampaign.bind(this)
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
    window.electron.ipcRenderer.saveCampaign(campaign);
  }

  newCampaign(name: string) {
    this.setState({ campaign: { ...EMPTY_CAMPAIGN, name }})
  }

  loadCampaign() {
    window.electron.ipcRenderer.loadCampaign();
  }

  render() {
    if(this.state.configured) {
      if(this.state.campaign === undefined) {
        return <CampaignSelector setCampaign={this.setCampaign} loadCampaign={this.loadCampaign} newCampaign={this.newCampaign} />
      } else {
        return <Editor campaign={this.state.campaign} tabletopImport={this.importCampaign} saveCampaign={this.saveCampaign}/> 
      }
    } else {
      return <Config updateTabletopDir={this.updateTabletopDir}/>
    }
  }
}