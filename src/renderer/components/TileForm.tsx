import React from 'react';
import Stack from '@mui/material/Stack';
import SelectedList from './SelectableList';
import TiledExplorer from './TiledExplorer';
import { Button, Divider, IconButton, Input, TextField } from '@mui/material';
import { Tile } from "../App";
import { ArrowBack } from '@mui/icons-material';
import { Box } from '@mui/system';
import { ChromePicker } from 'react-color';

export class TileForm extends React.Component<{
  tile: Tile, 
  save: (tile: Tile) => void,
  quit: () => void 
}, { color: string }> {
  state = { color: this.props.tile.color }

  constructor(props: any) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(color, _) {
    this.setState({ color: color })
  }

  render() {
    return <Box sx={{width: "100%"}}>
      <IconButton
        aria-label={`Save and return to the map editor menu`}
        onClick={() => { 
          this.props.save({
            name: "saved!",
            color: "#3aeb34",
            description: "saved!",
            notes: "saved!",
            id: this.props.tile.id
          });
          this.props.quit();
        }}
      >
        <ArrowBack />
      </IconButton>
      <Stack spacing={2} sx={{alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "600px", marginLeft: "10px", marginRight: "10px"}}>
        <ChromePicker color={this.state.color} disableAlpha={true} onChange={this.onChange}/>
        <TextField
          fullWidth
          id="outlined-required"
          label="Name"
          defaultValue={this.props.tile.name}
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="Description"
          defaultValue={this.props.tile.description}
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="DM Notes"
          defaultValue={this.props.tile.description}
        />
        <TextField
          fullWidth
          multiline
          id="outlined-required"
          label="ID"
          defaultValue={this.props.tile.id}
        />
      </Stack>
    </Box>
  }
}