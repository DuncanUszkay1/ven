import { Campaign } from "../model/Campaign";
import fs from 'fs';
import path from 'path';

export class TabletopImporter {
  tabletopSaveDir: string;

  constructor(tabletopSaveDir: string) {
    if(fs.existsSync(tabletopSaveDir)) {
      this.tabletopSaveDir = tabletopSaveDir
    } else {
      throw "Bad TabletopSave Dir - missing"
    } 
  }

  importCampaign(campaign: Campaign) {
    this.ensureCampaignFolder(campaign.name);
  }

  private campaignPath(campaignName: string) {
    return path.join(this.tabletopSaveDir, "Ven", campaignName)
  }

  private ensureCampaignFolder(campaign: string) {
    if(!fs.existsSync(this.campaignPath(campaign))) {
      fs.mkdirSync(this.campaignPath(campaign), { recursive: true });
    }
  }
}