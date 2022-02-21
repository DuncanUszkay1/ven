import { Campaign } from "../model/Campaign";
import fs from 'fs';
import path from 'path';
import { characterFromTemplate, itemFromTemplate, mapFromTemplate } from "./template";

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
    this.ensureFolder(this.campaignPath(campaign.name));

    this.ensureFolder(this.characterBasePath(campaign.name));
    campaign.characters.forEach((characters, folder) => {
      this.ensureFolder(this.characterFolderPath(campaign.name, folder))
      characters.forEach((character) => {
        fs.writeFileSync(
          this.characterPath(campaign.name, folder, character.name),
          characterFromTemplate(character)
        )
      })
    })

    this.ensureFolder(this.itemBasePath(campaign.name));
    campaign.items.forEach((items, folder) => {
      this.ensureFolder(this.itemFolderPath(campaign.name, folder))
      items.forEach((item) => {
        fs.writeFileSync(
          this.itemPath(campaign.name, folder, item.name),
          itemFromTemplate(item)
        )
      })
    })

    this.ensureFolder(this.mapBasePath(campaign.name));
    campaign.maps.forEach((venMap) => {
      fs.writeFileSync(
        this.mapPath(campaign.name, venMap.name),
        mapFromTemplate(venMap)
      )
    })
  }

  private characterPath(campaignName: string, folder: string, characterName: string) {
    return path.join(this.characterFolderPath(campaignName, folder), `${characterName}.json`)
  }

  private characterFolderPath(campaignName: string, folder: string) {
    return path.join(this.characterBasePath(campaignName), folder)
  }

  private characterBasePath(campaignName: string) {
    return path.join(this.campaignPath(campaignName), "Characters")
  }

  private itemPath(campaignName: string, folder: string, itemName: string) {
    return path.join(this.itemFolderPath(campaignName, folder), `${itemName}.json`)
  }

  private itemFolderPath(campaignName: string, folder: string) {
    return path.join(this.itemBasePath(campaignName), folder)
  }

  private itemBasePath(campaignName: string) {
    return path.join(this.campaignPath(campaignName), "Items")
  }

  private mapPath(campaignName: string, mapName: string) {
    return path.join(this.mapBasePath(campaignName), `${mapName}.json`)
  }

  private mapBasePath(campaignName: string) {
    return path.join(this.campaignPath(campaignName), "maps")
  }

  private campaignPath(campaignName: string) {
    return path.join(this.basePath(), campaignName)
  }

  private basePath() {
    return path.join(this.tabletopSaveDir, "Ven")
  }

  private ensureFolder(path: string) {
    if(!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }
}