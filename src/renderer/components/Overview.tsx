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
    tabletopImport: () => void
  },
  {}
> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return <Stack>
      <Button variant="contained" onClick={this.props.tabletopImport}>Tabletop Simulator Import</Button> 
    </Stack>
  }
}
