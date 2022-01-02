import { CampaignSelector } from './components/CampaignSelector';
import React from 'react';
import { Editor } from './components/Editor';
import { Campaign } from '../model/Campaign';
export { Campaign } from '../model/Campaign';
export { Character } from '../model/Character';
export { Tile } from '../model/Tile';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing: () => void;
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
  }


  setCampaign(campaign: Campaign) {
    this.setState((_state) => ({
      campaign: campaign
    }));
  }

  render() {
    if(this.state.campaign === undefined) {
      return <CampaignSelector setCampaign={this.setCampaign} />
    } else {
      return <Editor campaign={this.state.campaign}/> 
    }
  }
}