import React from 'react';
import { TileMap } from './TileMap';
import { TileForm } from './TileForm';
import { Background, Tile } from '../App';
import { Box } from '@mui/system';
import { Divider, Stack, Tab, Tabs } from '@mui/material';
import { TabPanel } from './TabPanel';
import { BackgroundEditor } from './BackgroundEditor';
import { SelectedList } from './SelectableList';
import { NEW_MAP, VenMap } from 'model/Campaign';


export class MapEditor extends React.Component<
  { maps: Map<string, VenMap>, saveMap: (map: VenMap) => void, newMap: (map: VenMap) => void },
  { selectedTile: Tile | null, tabValue: number, selectedMap: string }
> {
  state = { selectedTile: null, tabValue: 0, selectedMap: this.props.maps.keys().next().value }

  constructor(props: any) {
    super(props);

    this.editTile = this.editTile.bind(this);
    this.saveTile = this.saveTile.bind(this);
    this.closeTile = this.closeTile.bind(this);
    this.handleTabEvent = this.handleTabEvent.bind(this);
    this.selectMap = this.selectMap.bind(this);
    this.updateTileMap = this.updateTileMap.bind(this);
    this.newMap = this.newMap.bind(this);
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

  innerContent() {
    return <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={this.state.tabValue} onChange={this.handleTabEvent} aria-label="basic tabs example">
          <Tab label="Backgrounds" />
          <Tab label="Map" />
        </Tabs>
      </Box>
      <TabPanel value={this.state.tabValue} index={0}>
        <BackgroundEditor backgrounds={this.selectedMap().backgrounds} deleteBackground={(background) => { console.log(background)}}/>
      </TabPanel>
      <TabPanel value={this.state.tabValue} index={1}>
        {
          this.state.selectedTile ?
            <TileForm tile={this.state.selectedTile} save={this.saveTile} quit={this.closeTile}/> :
            <TileMap
              tileMapping={this.selectedMap().tiles}
              tilePalette={this.selectedMap().tilePalette}
              editTile={this.editTile}
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
