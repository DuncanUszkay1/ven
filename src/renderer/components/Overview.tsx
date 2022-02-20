import React from 'react';
import { TileMap } from './TileMap';
import { TileForm } from './TileForm';
import { Background, Tile } from '../App';
import { Box } from '@mui/system';
import { Button, Divider, IconButton, Input, Stack, TextField } from '@mui/material';
import { TabPanel } from './TabPanel';
import { BackgroundEditor } from './BackgroundEditor';
import { SelectedList } from './SelectableList';
import { NEW_MAP, VOID_TILE, NEW_TILE, VenMap } from 'model/Campaign';


export class Overview extends React.Component<
  {
  },
  {}
> {
  // state = { selectedTile: null, tabValue: 0, selectedMap: this.props.maps.keys().next().value }

  constructor(props: any) {
    super(props);

    // this.editTile = this.editTile.bind(this);
  }

  render() {
    return <Stack>
      <TextField
        id="outlined-required"
        label="Tabletop Saved Objects Directory"
        onChange={(e) => { console.log(e) }}
      />
      <Button variant="text" onClick={(e) => { console.log("import") }}>Import</Button> 
    </Stack>
  }
}
