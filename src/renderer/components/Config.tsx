import React from 'react';
import { TileMap } from './TileMap';
import { TileForm } from './TileForm';
import { Background, Tile } from '../App';
import { Box } from '@mui/system';
import { Alert, Button, Divider, IconButton, Input, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { TabPanel } from './TabPanel';
import { BackgroundEditor } from './BackgroundEditor';
import { SelectedList } from './SelectableList';
import { NEW_MAP, VOID_TILE, NEW_TILE, VenMap } from 'model/Campaign';
import path from 'path';


export class Config extends React.Component<
  {
    updateTabletopDir: (dir: string) => void
  },
  {
    tabletopDir: string | null,
    errorMessage: string | null
  }
> {
  state = { tabletopDir: null, errorMessage: null }
  constructor(props: any) {
    super(props);

    this.updateTabletopDir = this.updateTabletopDir.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.confirmSettings = this.confirmSettings.bind(this);
  }

  updateTabletopDir(event: any) {
    this.setState({ tabletopDir: event.target.value })

  }

  confirmSettings() {
    if(this.state.tabletopDir === null || this.state.tabletopDir === "") {
      this.setState({ errorMessage: "Tabletop Directory must be set." })
    } else {
      this.props.updateTabletopDir(this.state.tabletopDir);
    }
  }

  closeSnackbar() {
    this.setState({ errorMessage: null })
  }

  render() {
    return <Box sx={{justifyContent: 'center'}}> 
      <Box sx={{
        width: "566px",
        textAlign: 'center',
        margin: "0 auto",
        pt: '20%',
        justifyContent: 'center'
      }}>
        <Typography variant="h1" component="div" gutterBottom>
          Configuration
        </Typography>
        <TextField
          fullWidth
          id="outlined-required"
          label="Tabletop Saved Object Directory"
          sx={{ marginBottom: "30px" }}
          onChange={this.updateTabletopDir}
        />
        <Button onClick={this.confirmSettings} variant="contained">Confirm</Button>
        <Snackbar open={this.state.errorMessage !== null} autoHideDuration={6000} onClose={this.closeSnackbar}>
          <Alert onClose={this.closeSnackbar} severity="error" sx={{ width: '100%' }}>
            {this.state.errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  }
}
