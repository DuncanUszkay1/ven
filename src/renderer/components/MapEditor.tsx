import { Grid, Stack } from '@mui/material';
import React from 'react';
import { ReactNode } from 'react';

const MAX_WIDTH = 30;
const MAX_HEIGHT = 30;
const SECTION_SIZE = 20;
const HIGHLIGHT_COLOR = "#00ffee"
const HIGHLIGHT_BOX_COLOR = "#00c2ed"

type Tile = {
  name: string,
  color: string
}

const GRASS_TILE: Tile = { name: "Grass", color: "#3aeb34" }
const INN_TILE: Tile = { name: "Inn", color: "#4a3b0a" }

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
        border: this.props.selected ? `${HIGHLIGHT_BOX_COLOR} solid 2px` : "none",
        userSelect: "none"
      }}
      onMouseUp={this.props.onMouseUp}
      onMouseDown={() => this.props.onMouseDown(this.props.row, this.props.column)}
      onMouseMove={() => this.props.onMouseMove(this.props.row, this.props.column)}
    >{this.props.tile.name[0]}</div>
  }
}

class TileMap extends React.Component<{ tileMapping: Tile[][] }, {
  mapSections: MapSectionData[][],
  selectionStart: SelectionStart | null,
}> {
  state = {
    mapSections: this.props.tileMapping.map((row) => row.map((tile) => {
      return {
        tile: tile,
        selected: false
      }
    })),
    selectionStart: null
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

    return <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${MAX_WIDTH}, ${SECTION_SIZE}px [col-start])`,
        gridTemplateRows: `repeat(${MAX_WIDTH}, ${SECTION_SIZE}px [col-start])`
      }}
      tabIndex={1}
      onKeyDown={this.onKeyDown}
    >
      {mapSections}
    </div>
  }

  clearSelection() {
    this.setState({
      selectionStart: null
    })
  }

  startSelection(row: number, column: number) {
    this.mapRegion(0, 0, MAX_WIDTH, MAX_HEIGHT, (mapSection, _) => {
      return {
        tile: mapSection.tile,
        selected: false
      }
    })
    this.setState({
      selectionStart: {
        top: row,
        left: column 
      },
    });
  }

  select(row: number, column: number) {
    if (this.state.selectionStart) {
      this.mapRegion(
        this.state.selectionStart.left,
        this.state.selectionStart.top, 
        column,
        row,
        (mapSection: MapSectionData, inRegion: boolean) => {
          return {
            tile: mapSection.tile,
            selected: inRegion 
          }
        }
      )
    }
  }

  onKeyDown(e: any) {
    console.log("key down??")
    if (e.key === 'Enter') {
      this.mapRegion(0, 0, MAX_WIDTH, MAX_HEIGHT, (mapSection) => {
        return {
          tile: mapSection.selected ? INN_TILE : mapSection.tile,
          selected: false
        }
      })
    }
  }

  mapRegion(
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

    this.setState((state) => {
      return {
        mapSections: state.mapSections.map((row, rowIndex) => {
          return row.map((mapSection, columnIndex) => {
            return f(mapSection, inSelectionRegion(rowIndex, columnIndex))
          })
        }),
        selectionStart: state.selectionStart
      }
    })
  }
}

type SelectionStart = {
  top: number,
  left: number,
}

export class MapEditor extends React.Component {
  render() {
    var data: Tile[][] = []
    for(var i = 0; i < MAX_WIDTH; i++) {
      var row = []
      for(var j = 0; j < MAX_HEIGHT; j++) {
        row.push(GRASS_TILE)
      }
      data.push(row);
    }

    return <TileMap tileMapping={data}/>
  }

}
