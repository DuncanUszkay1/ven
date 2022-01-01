import { Square } from '@mui/icons-material';
import { Grid, List, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { ReactNode } from 'react';

const MAX_WIDTH = 30;
const MAX_HEIGHT = 30;
const SECTION_SIZE = 20;
const HIGHLIGHT_COLOR = "#00ffee"
const HIGHLIGHT_BOX_COLOR = "#00c2ed"

type Tile = {
  name: string,
  color: string,
  id: number
}

const GRASS_TILE: Tile = { name: "Grass", color: "#3aeb34", id: 1 }
const INN_TILE: Tile = { name: "Inn", color: "#4a3b0a", id: 2 }
const CLOSET_TILE: Tile = { name: "Closet", color: "#4a3b0a", id: 3 }
const WATER_TILE: Tile = { name: "Water", color: HIGHLIGHT_COLOR, id: 4 }
const TILE_PALETTE = [GRASS_TILE, INN_TILE, CLOSET_TILE, WATER_TILE]

type MapSectionData = {
  tile: Tile;
  selected: boolean;
}
class MapSection extends React.Component<{
  tile: Tile,
  selected: boolean,
  row: number,
  column: number,
  onMouseDown: (row: number, column: number) => void,
  onMouseUp: () => void,
  onMouseMove: (row: number, column: number) => void,
}> {
  render() {
    return <div 
      style={{
        width: `${SECTION_SIZE}px`,
        height: `${SECTION_SIZE}px`,
        backgroundColor: this.props.selected ? HIGHLIGHT_COLOR : this.props.tile.color,
        border: `${this.props.selected ? HIGHLIGHT_BOX_COLOR : "black"} solid 2px`,
        userSelect: "none"
      }}
      onMouseUp={this.props.onMouseUp}
      onMouseDown={() => this.props.onMouseDown(this.props.row, this.props.column)}
      onMouseMove={() => this.props.onMouseMove(this.props.row, this.props.column)}
    ></div>
  }
}

class TileMap extends React.Component<{ tileMapping: Tile[][], tilePalette: Tile[], editTile: (tile: Tile) => void }, {
  mapSections: MapSectionData[][],
  selection: Selection | null,
  code: string,
  filteredTilePalette: Tile[]
}> {
  state = {
    mapSections: this.props.tileMapping.map((row) => row.map((tile) => {
      return {
        tile: tile,
        selected: false
      }
    })),
    selection: null,
    code: "",
    filteredTilePalette: this.props.tilePalette
  }

  constructor(props: any) {
    super(props);

    this.clearSelection = this.clearSelection.bind(this);
    this.startSelection = this.startSelection.bind(this);
    this.select = this.select.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    const mapSections = this.state.mapSections.map((row, rowIndex) => {
      return row.map((mapSection: MapSectionData, columnIndex) => {
        return <MapSection
          tile={mapSection.tile}
          selected={mapSection.selected}
          row={rowIndex}
          column={columnIndex}
          onMouseUp={this.clearSelection}
          onMouseDown={this.startSelection}
          onMouseMove={this.select}
        />
      })
    });

    const tiles = this.state.filteredTilePalette.map((tile) => {
      return <ListItemButton onClick={() => { this.props.editTile(tile) }}>
        <ListItemIcon>
          <Square sx={{ color: tile.color }}/>
        </ListItemIcon>
        <ListItemText primary={`${tile.id}. ${tile.name}`} />
      </ListItemButton>
    });

    return <Stack direction="row">
      <Stack style={{ padding: "5px" }}>
        <TextField
          id="standard-required"
          value={this.state.code}
          variant="standard"
        />
        <List component="nav" aria-label="main mailbox folders">
          {tiles}
        </List>
      </Stack>
      <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${MAX_WIDTH}, ${SECTION_SIZE}px [col-start])`,
          gridTemplateRows: `repeat(${MAX_WIDTH}, ${SECTION_SIZE}px [col-start])`
        }}
        tabIndex={1}
        onKeyDown={this.onKeyDown}
      >
        {mapSections}
      </div>
    </Stack>
  }

  clearSelection() {
    this.setState({
      selection: null
    })
  }

  startSelection(row: number, column: number) {
    this.setState((state) => {
      return {
        mapSections: this.mapRegion(state.mapSections, column, row, column, row, (mapSection, inRegion) => {
          return {
            tile: mapSection.tile,
            selected: inRegion 
          }
        }),
        selection: {
          startRow: row,
          startColumn: column,
          endRow: row,
          endColumn: column 
        }
      }
    });
  }

  select(row: number, column: number) {
    if (!this.state.selection) {
      return;
    }

    if (this.state.selection!.endRow != row || this.state.selection!.endColumn != column) {
      this.setState((state) => {
        return {
          mapSections: this.mapRegion(
            state.mapSections,
            state.selection!.startColumn,
            state.selection!.startRow, 
            column,
            row,
            (mapSection: MapSectionData, inRegion: boolean) => {
              return {
                tile: mapSection.tile,
                selected: inRegion 
              }
            }
          ),
          selection: {
            startRow: state.selection!.startRow,
            endRow: row,
            startColumn: state.selection!.startColumn,
            endColumn: column,
          } 
        }
      })
    }
  }

  onKeyDown(e: any) {
    if (e.key === 'Enter') {
      this.fill();
      this.resetCode();
    } else if (e.key.length == 1 || e.key === "Backspace") {
      this.updateCode(e.key);
    }
  }

  resetCode() {
    this.setState({
      code: "",
      filteredTilePalette: this.props.tilePalette
    });
  }

  updateCode(key: string) {
    if(key === "Backspace") {
      const newCode = this.state.code.slice(0, -1)

      this.setState({
        code: newCode,
        filteredTilePalette: this.props.tilePalette.filter((tile) => {
          return this.tileMatchesCode(tile, newCode); 
        })
      });
    } else {
      const newCode = this.state.code.concat(key)

      this.setState({
        code: newCode,
        filteredTilePalette: this.state.filteredTilePalette.filter((tile) => {
          return this.tileMatchesCode(tile, newCode); 
        })
      });
    }
  }

  tileMatchesCode(tile: Tile, code: string) {
    const normalizedTileName = tile.name.toLowerCase();
    const normalizedCode = code.toLowerCase();

    const nameMatch = normalizedTileName.startsWith(normalizedCode);
    const idMatch = tile.id.toString().startsWith(normalizedCode);

    return nameMatch || idMatch
  }

  fill() {
    const selectedTile: Tile | null = this.state.filteredTilePalette.length >= 1 ? this.state.filteredTilePalette[0] : null

    this.setState((state) => {
      return {
        mapSections: this.mapRegion(state.mapSections, 0, 0, MAX_WIDTH, MAX_HEIGHT, (mapSection) => {
          return {
            tile: mapSection.selected && selectedTile ? selectedTile : mapSection.tile,
            selected: false
          }
        }),
        selection: null
      }
    });
  }

  mapRegion(
    mapSections: MapSectionData[][],
    startColumn: number,
    startRow: number,
    endColumn: number,
    endRow: number,
    f: (mapSection: MapSectionData, inRegion: boolean) => MapSectionData
  ) {
    const inSelectionRegion = (rowIndex: number, columnIndex: number) => {
      return rowIndex >= Math.min(startRow, endRow) &&
        rowIndex <= Math.max(startRow, endRow) &&
        columnIndex >= Math.min(startColumn, endColumn) &&
        columnIndex <= Math.max(startColumn, endColumn) 
    }

    return mapSections.map((row, rowIndex) => {
      return row.map((mapSection, columnIndex) => {
        return f(mapSection, inSelectionRegion(rowIndex, columnIndex))
      })
    })
  }
}

type Selection = {
  startRow: number,
  startColumn: number,
  endRow: number,
  endColumn: number,
}

export class MapEditor extends React.Component<{}, { selectedTile: Tile | null }> {
  state = { selectedTile: null }

  constructor(props: {}) {
    super(props);

    this.editTile = this.editTile.bind(this);
  }

  editTile(tile: Tile) {
    this.setState({ selectedTile: tile })
  }

  render() {
    var data: Tile[][] = []
    for(var i = 0; i < MAX_WIDTH; i++) {
      var row = []
      for(var j = 0; j < MAX_HEIGHT; j++) {
        row.push(GRASS_TILE)
      }
      data.push(row);
    }
    if(this.state.selectedTile) {
      return <p>editing tile {this.state.selectedTile.name}</p>
    } else {
      return <TileMap tileMapping={data} tilePalette={TILE_PALETTE} editTile={this.editTile}/>
    }
  }

}
