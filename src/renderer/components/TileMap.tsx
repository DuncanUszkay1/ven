import { ClassNames } from '@emotion/react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Co2Sharp, Square } from '@mui/icons-material';
import { Grid, List, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { VenMap, VOID_TILE } from 'model/Campaign';
import React from 'react';
import { ReactNode } from 'react';

const MAX_WIDTH = 30;
const MAX_HEIGHT = 30;
const SECTION_SIZE = 20;
const HIGHLIGHT_COLOR = "#00ffee"
const HIGHLIGHT_BOX_COLOR = "#00c2ed"

type MapSectionData = {
  tile: Tile;
  selected: boolean;
}
type Selection = {
  startRow: number,
  startColumn: number,
  endRow: number,
  endColumn: number,
}

export class TileMap extends React.Component<{
  tileMapping: Tile[][],
  tilePalette: Tile[],
  editTile: (tile: Tile) => void,
  addTile: () => void,
  saveTileMapping: (tileMap: Tile[][]) => void
}, {
  mapSections: MapSectionData[][],
  selection: Selection | null,
  code: string,
  filteredTilePalette: Tile[],
  refreshPaletteOnRender: boolean
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
    filteredTilePalette: this.pristinePalette(),
    refreshPaletteOnRender: false
  }

  constructor(props: any) {
    super(props);

    this.clearSelection = this.clearSelection.bind(this);
    this.startSelection = this.startSelection.bind(this);
    this.select = this.select.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.addTile = this.addTile.bind(this);
  }

  componentDidUpdate() {
    if(this.state.refreshPaletteOnRender == true) {
      this.setState({
        refreshPaletteOnRender: false,
        filteredTilePalette: this.pristinePalette()
      })
    }
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
          key={`${rowIndex} ${columnIndex}`}
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
          <ListItemButton onClick={this.addTile}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={`New Tile`} />
          </ListItemButton>
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

  addTile() {
    this.props.addTile();

    this.setState({ refreshPaletteOnRender: true })
  }

  pristinePalette(): Tile[] {
    return [VOID_TILE].concat(this.props.tilePalette).sort((a, b) => { return a.id - b.id })
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
      filteredTilePalette: this.pristinePalette()
    });
  }

  updateCode(key: string) {
    if(key === "Backspace") {
      const newCode = this.state.code.slice(0, -1)

      this.setState({
        code: newCode,
        filteredTilePalette: this.pristinePalette().filter((tile) => {
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
    const newMap = this.mapRegion(this.state.mapSections, 0, 0, MAX_WIDTH, MAX_HEIGHT, (mapSection) => {
      return {
        tile: mapSection.selected && selectedTile ? selectedTile : mapSection.tile,
        selected: false
      }
    })

    this.props.saveTileMapping(newMap.map((row) => {
      return row.map((cell) => {
        return cell.tile 
      })
    }));

    this.setState({mapSections: newMap, selection: null})
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
        border: `${this.props.selected ? HIGHLIGHT_BOX_COLOR : "grey"} solid 1px`,
        userSelect: "none"
      }}
      onMouseUp={this.props.onMouseUp}
      onMouseDown={() => this.props.onMouseDown(this.props.row, this.props.column)}
      onMouseMove={() => this.props.onMouseMove(this.props.row, this.props.column)}
      ></div>
  }
}
