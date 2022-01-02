import React from 'react';
import { TileMap } from './TileMap';
import { TileForm } from './TileForm';
import { Background, Tile } from '../App';
import { Box } from '@mui/system';
import { Divider, Stack, Tab, Tabs } from '@mui/material';
import { TabPanel } from './TabPanel';
import { BackgroundEditor } from './BackgroundEditor';
import { SelectedList } from './SelectableList';

const GRASS_TILE: Tile = { name: "Grass", color: "#3aeb34", id: 1, description: "Feels nice to touch!", notes: "Grass is slippery" }
const INN_TILE: Tile = { name: "Inn", color: "#4a3b0a", id: 2, description: "Feels nice to touch!", notes: "Grass is slippery" }
const CLOSET_TILE: Tile = { name: "Closet", color: "#4a3b0a", id: 3, description: "Feels nice to touch!", notes: "Grass is slippery" }
const WATER_TILE: Tile = { name: "Water", color: "#00ffee", id: 4, description: "Feels nice to touch!", notes: "Grass is slippery" }
const TILE_PALETTE = [GRASS_TILE, INN_TILE, CLOSET_TILE, WATER_TILE]

export class MapEditor extends React.Component<{}, { selectedTile: Tile | null, tabValue: number }> {
  state = { selectedTile: null, tabValue: 0 }

  constructor(props: any) {
    super(props);

    this.editTile = this.editTile.bind(this);
    this.saveTile = this.saveTile.bind(this);
    this.closeTile = this.closeTile.bind(this);
    this.handleTabEvent = this.handleTabEvent.bind(this);
  }

  editTile(tile: Tile) {
    this.setState({ selectedTile: tile })
  }

  saveTile(tile: Tile) {
    console.log("saving tile")
    console.log(tile)
  }

  closeTile() {
    this.setState({ selectedTile: null })
  }

  handleTabEvent(_: any, newValue: number) {
    this.setState({ tabValue: newValue })
  }

  mainWindow() {
    var data: Tile[][] = []
    for(var i = 0; i < 30; i++) {
      var row = []
      for(var j = 0; j < 30; j++) {
        row.push(GRASS_TILE)
      }
      data.push(row);
    }

    if(this.state.selectedTile) {
      return <TileForm tile={this.state.selectedTile} save={this.saveTile} quit={this.closeTile}/> 
    } else {
      return <TileMap tileMapping={data} tilePalette={TILE_PALETTE} editTile={this.editTile}/>
    }
  }

  backgroundEditor() {
    const backgrounds: Background[] = [
      { name: "Inn 1", img: "https://cdnb.artstation.com/p/assets/images/images/023/527/051/large/mario-v-popup-11.jpg?1579513575" },
      { name: "Inn 2", img: "https://cdnb.artstation.com/p/assets/images/images/023/527/051/large/mario-v-popup-11.jpg?1579513575" },
      { name: "Inn 3", img: "https://cdnb.artstation.com/p/assets/images/images/023/527/051/large/mario-v-popup-11.jpg?1579513575" },
      { name: "Grass", img: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2012/8/10/0/HMYGD211_Galloway-backyard-3-AFTER-2517-ret_s4x3.jpg.rend.hgtvcom.966.725.suffix/1400977751663.jpeg" }
    ]
    return <BackgroundEditor backgrounds={backgrounds} deleteBackground={(background) => { console.log(background)}}/> 
  }

  innerContent() {
    return <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={this.state.tabValue} onChange={this.handleTabEvent} aria-label="basic tabs example">
          <Tab label="Backgrounds" />
          <Tab label="Map" />
        </Tabs>
      </Box>
      <TabPanel value={this.state.tabValue} index={0}>
        {this.backgroundEditor()}
      </TabPanel>
      <TabPanel value={this.state.tabValue} index={1}>
        {this.mainWindow()}
      </TabPanel>
    </Box>
  }

  render() {
    return <Stack direction="row" sx={{width: "100%"}}>
      <SelectedList
        items={["Joe's Inn", "Hell"]}
        selected={"Joe's Inn"}
        select={() => {}}
        new={() => {}}
      />  
      <Divider orientation="vertical" flexItem />
      {this.innerContent()} 
    </Stack> 
  }
}
