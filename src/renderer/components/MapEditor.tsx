import React from 'react';
import { TileMap } from './TileMap';
import { TileForm } from './TileForm';
import { Tile } from '../App';

const GRASS_TILE: Tile = { name: "Grass", color: "#3aeb34", id: 1, description: "Feels nice to touch!", notes: "Grass is slippery" }
const INN_TILE: Tile = { name: "Inn", color: "#4a3b0a", id: 2, description: "Feels nice to touch!", notes: "Grass is slippery" }
const CLOSET_TILE: Tile = { name: "Closet", color: "#4a3b0a", id: 3, description: "Feels nice to touch!", notes: "Grass is slippery" }
const WATER_TILE: Tile = { name: "Water", color: "#00ffee", id: 4, description: "Feels nice to touch!", notes: "Grass is slippery" }
const TILE_PALETTE = [GRASS_TILE, INN_TILE, CLOSET_TILE, WATER_TILE]

export class MapEditor extends React.Component<{}, { selectedTile: Tile | null }> {
  state = { selectedTile: null }

  constructor(props: {}) {
    super(props);

    this.editTile = this.editTile.bind(this);
    this.saveTile = this.saveTile.bind(this);
    this.closeTile = this.closeTile.bind(this);
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

  render() {
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

}
