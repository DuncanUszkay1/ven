import React from 'react';
import { TileMap } from './TileMap';
import { TileForm } from './TileForm';
import { Background, Tile } from '../App';
import { Box } from '@mui/system';
import { Divider, Stack, Tab, Tabs } from '@mui/material';
import { TabPanel } from './TabPanel';
import { BackgroundEditor } from './BackgroundEditor';
import { SelectedList } from './SelectableList';
import { NEW_MAP, VOID_TILE, NEW_TILE, VenMap } from 'model/Campaign';


export class MapEditor extends React.Component<
  {
    maps: Map<string, VenMap>,
    saveMap: (map: VenMap) => void,
    createBackground: (background: Background, mapName: string) => void
    deleteBackground: (background: Background, mapName: string) => void
  },
  { selectedTile: Tile | null, tabValue: number, selectedMap: string }
> {
  state = { selectedTile: null, tabValue: 0, selectedMap: this.props.maps.keys().next().value }

  constructor(props: any) {
    super(props);

    this.editTile = this.editTile.bind(this);
    this.saveTile = this.saveTile.bind(this);
    this.closeTile = this.closeTile.bind(this);
    this.deleteTile = this.deleteTile.bind(this);
    this.handleTabEvent = this.handleTabEvent.bind(this);
    this.selectMap = this.selectMap.bind(this);
    this.updateTileMap = this.updateTileMap.bind(this);
    this.newMap = this.newMap.bind(this);
    this.newTile = this.newTile.bind(this);
    this.createBackground = this.createBackground.bind(this);
    this.deleteBackground = this.deleteBackground.bind(this);
    this.findTilePaletteID = this.findTilePaletteID.bind(this);
  }

  editTile(tile: Tile) {
    if(tile.id != VOID_TILE.id) {
      this.setState({ selectedTile: tile })
    }
  }

  saveTile(tile: Tile) {
    const oldMap = this.selectedMap();
    const newMap: VenMap = {...oldMap, tilePalette: oldMap.tilePalette.map((t) => {
      return t.id === tile.id ? tile : t 
    })}

    this.props.saveMap(newMap)
  }

  findTilePaletteID() {
    const oldMap = this.selectedMap();
    const currentIDs = oldMap.tilePalette.map((tile) => { return tile.id }).sort()

    for(let i = 1; i < currentIDs.length; i++) {
      const cursor = currentIDs[i];
      const previous = currentIDs[i-1];

      if(cursor - previous > 1) {
        return previous + 1
      }
    }

    const lastID = currentIDs.slice(-1).pop()!;
    return lastID + 1; 
  }

  newTile() {
    const oldMap = this.selectedMap();
    const newTile = {...NEW_TILE, id: this.findTilePaletteID() }
    const newMap: VenMap = {...oldMap, tilePalette: oldMap.tilePalette.concat([newTile])}

    this.props.saveMap(newMap)
  }

  closeTile() {
    this.setState({ selectedTile: null })
  }

  deleteTile(tileID) {
    const oldMap = this.selectedMap();
    const newMap: VenMap = {...oldMap, tilePalette: oldMap.tilePalette.filter((t) => { return t.id != tileID })}

    this.props.saveMap(newMap)
  }

  handleTabEvent(_: any, newValue: number) {
    this.setState({ tabValue: newValue })
  }

  selectedMap() {
    return this.props.maps.get(this.state.selectedMap)!
  }

  selectMap(mapName: string) {
    this.setState({selectedMap: mapName})
  }

  updateTileMap(tileMap: Tile[][]) {
    const newMap: VenMap = {...this.selectedMap(), tiles: tileMap}

    this.props.saveMap(newMap)
  }

  newMap(name: string) {
    const map: VenMap = {...NEW_MAP, name}

    this.props.saveMap(map);
  }

  createBackground(background: Background) {
    this.props.createBackground(background, this.state.selectedMap)
  }

  deleteBackground(background: Background) {
    this.props.deleteBackground(background, this.state.selectedMap)
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
        <BackgroundEditor 
          backgrounds={this.selectedMap().backgrounds}
          deleteBackground={this.deleteBackground}
          createBackground={this.createBackground}
        />
      </TabPanel>
      <TabPanel value={this.state.tabValue} index={1}>
        {
          this.state.selectedTile ?
            <TileForm tile={this.state.selectedTile} save={this.saveTile} quit={this.closeTile} delete={this.deleteTile}/> :
            <TileMap
              tileMapping={this.selectedMap().tiles}
              tilePalette={this.selectedMap().tilePalette}
              editTile={this.editTile}
              addTile={this.newTile}
              key={this.selectedMap().name}
              saveTileMapping={this.updateTileMap}
            />
        }
      </TabPanel>
    </Box>
  }

  render() {
    return <Stack direction="row" sx={{width: "100%"}}>
      <SelectedList
        items={Array.from(this.props.maps.keys())}
        selected={this.state.selectedMap}
        select={this.selectMap}
        itemName="Map"
        new={this.newMap}
      />  
      <Divider orientation="vertical" flexItem />
      {this.innerContent()} 
    </Stack> 
  }
}
