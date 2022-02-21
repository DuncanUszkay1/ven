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
    tabletopImport: () => void,
    saveCampaign: () => void
  },
  {}
> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return <Stack sx={{alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "600px", marginLeft: "10px", marginRight: "10px", marginTop: "30px"}}>
      <Button variant="contained" onClick={this.props.tabletopImport} sx={{marginBottom: "10px"}}>Tabletop Simulator Import</Button> 
      <Button variant="contained" onClick={this.props.saveCampaign}>Save to Disk</Button> 
    </Stack>
  }
}
