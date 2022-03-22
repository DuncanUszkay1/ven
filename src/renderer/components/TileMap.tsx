import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Square } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText, Stack, TextField } from '@mui/material';
import { VOID_TILE } from 'model/Campaign';
import React from 'react';

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
  savePalette: (palette: Tile[]) => void,
  loadPalette: () => Tile[],
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

  componentDidMount() {
    window.electron.ipcRenderer.onTilesetLoad(() => {
      this.setState({ refreshPaletteOnRender: true });
    })
  }

  exportTiles() {
    this.props.savePalette(this.props.tilePalette);
  }

  componentDidUpdate() {
    if(this.state.refreshPaletteOnRender == true) {
      this.setState({
        refreshPaletteOnRender: false,
        filteredTilePalette: this.pristinePalette()
      })
    }
  }

  loadPalette() {
    this.props.loadPalette();
    this.setState({
      refreshPaletteOnRender: true
    })
  }

  render() {
    const mapSections = this.state.mapSections.map((row, rowIndex) => {
      return row.map((mapSection: MapSectionData, columnIndex) => {
        return <MapSection
          tile={mapSection.tile}
          selected={mapSection.selected}
          row={rowIndex}
          column={columnIndex}
          onMouseUp={this.completeSelection.bind(this)}
          onMouseDown={this.startSelection.bind(this)}
          onMouseMove={this.select.bind(this)}
          key={`${rowIndex} ${columnIndex}`}
        />
      })
    });

    const tiles = this.state.filteredTilePalette.map((tile) => {
      return <ListItemButton onClick={() => { this.props.editTile(tile) }}>
        <ListItemIcon>
          {tile.img ? <img width="20px" height="20px" style={{marginLeft: "3px"}} src={tile.img} alt={tile.name} /> : <Square sx={{ color: tile.color }}/>}
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
          <ListItemButton onClick={this.addTile.bind(this)}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={`New Tile`} />
          </ListItemButton>
          <ListItemButton onClick={this.props.savePalette}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={`Export Tiles`} />
          </ListItemButton>
          <ListItemButton onClick={this.loadPalette.bind(this)}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={`Import Tiles`} />
          </ListItemButton>
        </List>
      </Stack>
      <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${MAX_WIDTH}, ${SECTION_SIZE}px [col-start])`,
          gridTemplateRows: `repeat(${MAX_WIDTH}, ${SECTION_SIZE}px [col-start])`
        }}
        tabIndex={1}
        onKeyDown={this.onKeyDown.bind(this)}
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

  completeSelection() {
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
            selected: mapSection.selected || inRegion 
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
                selected: mapSection.selected || inRegion 
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
    } else if (e.key === 'Escape') {
      this.resetCode();
      this.clearSelection();
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

  clearSelection() {
    this.setState((state) => {
      return {
        mapSections: state.mapSections.map((row) => {
          return row.map((mapSection: MapSectionData) => {
            return {
              tile: mapSection.tile,
              selected: false
            }
          })
        })
      }
    });
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
    const color = this.props.selected ? HIGHLIGHT_COLOR : this.props.tile.color
    const backgroundImage = (this.props.selected || !this.props.tile.img) ? "none" : `url(${this.props.tile.img})`

    return <div 
      style={{
        width: `${SECTION_SIZE}px`,
        height: `${SECTION_SIZE}px`,
        backgroundColor: color,
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        border: `${this.props.selected ? HIGHLIGHT_BOX_COLOR : "grey"} solid 1px`,
        userSelect: "none"
      }}
      onMouseUp={this.props.onMouseUp}
      onMouseDown={() => this.props.onMouseDown(this.props.row, this.props.column)}
      onMouseMove={() => this.props.onMouseMove(this.props.row, this.props.column)}
      ></div>
  }
}
