import React from 'react';
import { TileMap } from './TileMap';
import { TileForm } from './TileForm';
import { Background, Tile } from '../App';
import { Box } from '@mui/system';
import { Button, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { TabPanel } from './TabPanel';
import { BackgroundEditor } from './BackgroundEditor';
import { SelectedList } from './SelectableList';
import { NEW_MAP, VOID_TILE, NEW_TILE, VenMap } from 'model/Campaign';


export class MapEditor extends React.Component<
  {
    maps: Map<string, VenMap>,
    saveMap: (map: VenMap) => void,
    createBackground: (background: Background, mapName: string) => void,
    deleteBackground: (background: Background, mapName: string) => void,
  },
  { selectedTile: Tile | null, tabValue: number, selectedMap: string }
> {
  state = { selectedTile: null, tabValue: 0, selectedMap: this.props.maps.keys().next().value }

  componentDidMount() {
    window.electron.ipcRenderer.onTilesetLoad((tileset: Tile[]) => {
      const oldMap = this.selectedMap();
      const newMap: VenMap = {...oldMap, tilePalette: tileset};
      this.props.saveMap(newMap);
    })
  }

  editTile(tile: Tile) {
    if(tile.id != VOID_TILE.id) {
      this.setState({ selectedTile: tile })
    }
  }

  saveTile(tile: Tile) {
    const oldMap = this.selectedMap();
    const newPalette = oldMap.tilePalette.map((t) => { return t.id == tile.id ? tile : t })
    const newMap: VenMap = {
      ...oldMap,
      tilePalette: newPalette,
      tiles: this.syncTileMapToPalette(oldMap.tiles, newPalette) 
    }

    this.props.saveMap(newMap)
  }

  deleteTile(tileID: number) {
    const oldMap = this.selectedMap();
    const newPalette = oldMap.tilePalette.filter((t) => { return t.id != tileID }) 
    const newMap: VenMap = {...oldMap, tilePalette: newPalette, tiles: this.syncTileMapToPalette(oldMap.tiles, newPalette) }

    this.props.saveMap(newMap)
  }

  syncTileMapToPalette(tiles: Tile[][], tilePalette: Tile[]) {
    const tileMap = tiles.map((row) => {
      return row.map((tile) => {
        return tilePalette.find((t) => { return t.id == tile.id }) || VOID_TILE
      })
    })

    return tileMap
  }

  findTilePaletteID() {
    const oldMap = this.selectedMap();
    const currentIDs = oldMap.tilePalette.map((tile) => { return tile.id }).sort()

    if(currentIDs.length == 0 || currentIDs[0] > 1) { return 1; }

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

  savePalette() {
    window.electron.ipcRenderer.saveTileset(this.selectedMap().tilePalette);
  }

  loadPalette() {
    window.electron.ipcRenderer.loadTileset();
  }

  innerContent() {
    if(this.selectedMap() == null) {
      return <Stack sx={{ width: '100%', marginTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h3" sx={{marginBottom: '15px'}}>No Maps to Display</Typography>
      </Stack>
    }

    return <Box sx={{ width: '100%' }}> 
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={this.state.tabValue} onChange={this.handleTabEvent.bind(this)} aria-label="basic tabs example">
          <Tab label="Backgrounds" />
          <Tab label="Map" />
        </Tabs>
      </Box>
      <TabPanel value={this.state.tabValue} index={0}>
        <BackgroundEditor 
          backgrounds={this.selectedMap().backgrounds}
          deleteBackground={this.deleteBackground.bind(this)}
          createBackground={this.createBackground.bind(this)}
        />
      </TabPanel>
      <TabPanel value={this.state.tabValue} index={1}>
        {
          this.state.selectedTile ?
            <TileForm tile={this.state.selectedTile} save={this.saveTile.bind(this)} quit={this.closeTile.bind(this)} delete={this.deleteTile.bind(this)}/> :
            <TileMap
              tileMapping={this.selectedMap().tiles}
              tilePalette={this.selectedMap().tilePalette}
              editTile={this.editTile.bind(this)}
              addTile={this.newTile.bind(this)}
              key={this.selectedMap().name}
              saveTileMapping={this.updateTileMap.bind(this)}
              savePalette={this.savePalette.bind(this)}
              loadPalette={this.loadPalette.bind(this)}
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
        select={this.selectMap.bind(this)}
        itemName="Map"
        new={this.newMap.bind(this)}
      />  
      <Divider orientation="vertical" flexItem />
      {this.innerContent()} 
    </Stack> 
  }
}
