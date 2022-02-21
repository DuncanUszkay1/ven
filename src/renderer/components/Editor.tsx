import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Campaign } from '../App';
import { Sidebar } from './Sidebar';
import { TabPanel } from './TabPanel';
import { CharacterEditor } from './CharacterEditor';
import { MapEditor } from './MapEditor';
import { Character } from '../App';
import { generateCharacter, generateItem, VenMap } from 'model/Campaign';
import { ItemEditor } from './ItemEditor';
import { Overview } from './Overview';

export class Editor extends React.Component<{ campaign: Campaign, tabletopImport: (campaign: Campaign) => void }, { section: number, draft: Campaign }> {
  state = { section: 0, draft: this.props.campaign } 

  constructor(props: any) {
    super(props);

    this.updatePanel = this.updatePanel.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.createCharacter = this.createCharacter.bind(this);
    this.deleteCharacter = this.deleteCharacter.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.newCharacterFolder = this.newCharacterFolder.bind(this);
    this.newItemFolder = this.newItemFolder.bind(this);
    this.createBackground = this.createBackground.bind(this);
    this.deleteBackground = this.deleteBackground.bind(this);
    this.tabletopImport = this.tabletopImport.bind(this);
  }

  updatePanel(newValue: number) {
    this.setState({ section: newValue })
  }

  saveItem(item: Item, folder: string) {
    const draft = this.state.draft;
    const draftItems: Item[] = draft.items.get(folder)!;
    const updatedItems = draft.items.set(folder, draftItems.map((draft_item) => {
      return draft_item.uuid == item.uuid ? item : draft_item
    }))

    this.setState({ draft: { ...draft, items: updatedItems }})
  }

  deleteItem(uuid: string, folder: string) {
    const draft = this.state.draft;
    const draftItems: Item[] = draft.items.get(folder)!;
    const updatedItems = draft.items.set(folder, draftItems.filter((draft_item) => {
      return draft_item.uuid != uuid
    }))

    this.setState({ draft: { ...draft, items: updatedItems }})
  }

  createItem(folder: string) {
    const draft = this.state.draft;
    const draftItems: Item[] = draft.items.get(folder)!;
    const updatedItems = draft.items.set(folder, draftItems.concat([
      generateItem()
    ]))

    this.setState({ draft: { ...draft, items: updatedItems }})
  }

  saveCharacter(character: Character, folder: string) {
    const draft = this.state.draft;
    const draftCharacters: Character[] = draft.characters.get(folder)!;
    const updatedCharacters = draft.characters.set(folder, draftCharacters.map((draft_character) => {
      return draft_character.uuid == character.uuid ? character : draft_character
    }))

    this.setState({ draft: { ...draft, characters: updatedCharacters }})
  }

  deleteCharacter(uuid: string, folder: string) {
    const draft = this.state.draft;
    const draftCharacters: Character[] = draft.characters.get(folder)!;
    const updatedCharacters = draft.characters.set(folder, draftCharacters.filter((draft_character) => {
      return draft_character.uuid != uuid
    }))

    this.setState({ draft: { ...draft, characters: updatedCharacters }})
  }

  createCharacter(folder: string) {
    const draft = this.state.draft;
    const draftCharacters: Character[] = draft.characters.get(folder)!;
    const updatedCharacters = draft.characters.set(folder, draftCharacters.concat([
      generateCharacter()
    ]))

    this.setState({ draft: { ...draft, characters: updatedCharacters }})
  }

  saveMap(map: VenMap) {
    const draft = this.state.draft;
    const updatedMaps = draft.maps.set(map.name, map)

    this.setState({ draft: { ...draft, maps: updatedMaps }})
  }

  newCharacterFolder(name: string) {
    const draft = this.state.draft;
    const updatedCharacters = draft.characters.set(name, [])

    this.setState({ draft: { ...draft, characters: updatedCharacters }})
  }

  newItemFolder(name: string) {
    const draft = this.state.draft;
    const updatedItems = draft.items.set(name, [])

    this.setState({ draft: { ...draft, items: updatedItems }})
  }

  createBackground(background: Background, mapName: string) {
    const draft = this.state.draft;
    const draftMap = draft.maps.get(mapName)!;
    const updatedMaps = draft.maps.set(mapName, {...draftMap, backgrounds: draftMap.backgrounds.concat([background])});

    this.setState({ draft: { ...draft, maps: updatedMaps }})
  }

  deleteBackground(background: Background, mapName: string) {
    const draft = this.state.draft;
    const draftMap = draft.maps.get(mapName)!;
    const updatedMaps = draft.maps.set(mapName, {...draftMap, backgrounds: draftMap.backgrounds.filter((bg) => {
      return bg !== background
    })});

    this.setState({ draft: { ...draft, maps: updatedMaps }})
  }

  tabletopImport() {
    this.props.tabletopImport(this.state.draft);
  }

  render() {
    return <Stack sx={{ height: "100%" }}>
      <Box sx={{ width: "100%", borderBottom: "1px solid grey", padding: "10px" }}>
        <Typography variant="button">{this.state.draft.name}</Typography>
      </Box>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Sidebar updatePanel={this.updatePanel}/>
        <TabPanel value={this.state.section} index={0}>
          <Overview tabletopImport={this.tabletopImport}/>
        </TabPanel>
        <TabPanel value={this.state.section} index={1}>
          <CharacterEditor
            characters={this.state.draft.characters}
            saveCharacter={this.saveCharacter}
            createCharacter={this.createCharacter}
            newFolder={this.newCharacterFolder}
            deleteCharacter={this.deleteCharacter}
          /> 
        </TabPanel>
        <TabPanel value={this.state.section} index={2}>
          <ItemEditor
            items={this.state.draft.items}
            saveItem={this.saveItem}
            createItem={this.createItem}
            newFolder={this.newItemFolder}
            deleteItem={this.deleteItem}
          /> 
        </TabPanel>
        <TabPanel value={this.state.section} index={3}>
          <MapEditor maps={this.state.draft.maps} saveMap={this.saveMap} createBackground={this.createBackground} deleteBackground={this.deleteBackground}/>
        </TabPanel>
      </Box>
    </Stack> 
  }
};