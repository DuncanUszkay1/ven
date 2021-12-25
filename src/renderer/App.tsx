import { CampaignSelector } from './components/CampaignSelector';
import React from 'react';
import { Editor } from './components/Editor';

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

export type Campaign = {
  name: string;
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
      return <Editor /> 
    }
  }
}