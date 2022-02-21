import { CampaignSelector } from './components/CampaignSelector';
import React from 'react';
import { Editor } from './components/Editor';
import { Campaign } from '../model/Campaign';
export { Campaign, Character, Tile, Item, VOID_TILE, Background } from '../model/Campaign';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        importCampaign: (campaign: Campaign) => void;
      }
    }
  }
}

export type AppState = {
  campaign?: Campaign
}

export class App extends React.Component<{}, AppState> {
  state = { campaign: undefined }

  constructor(props: {}) {
    super(props)

    this.setCampaign = this.setCampaign.bind(this)
    this.importCampaign = this.importCampaign.bind(this)
  }

  importCampaign(campaign: Campaign) {
    console.log("importing campaign?")
    window.electron.ipcRenderer.importCampaign(campaign);
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
    if(this.state.campaign === undefined) {
      return <CampaignSelector setCampaign={this.setCampaign} />
    } else {
      return <Editor campaign={this.state.campaign} tabletopImport={this.importCampaign}/> 
    }
  }
}