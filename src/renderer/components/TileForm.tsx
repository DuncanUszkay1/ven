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
}, { color: string, name: string, description: string, dmNotes: string }> {
  state = {
    color: this.props.tile.color,
    name: this.props.tile.name,
    description: this.props.tile.description,
    dmNotes: this.props.tile.notes
  }

  constructor(props: any) {
    super(props)

    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onDMNotesChange = this.onDMNotesChange.bind(this)
    this.onColorChange = this.onColorChange.bind(this)
    this.save = this.save.bind(this)
  }

  onColorChange(event) {
    this.setState({ color: event.hex  })
  }

  onNameChange(event) {
    this.setState({ name: event.target.value })
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

  onDMNotesChange(event) {
    this.setState({ notes: dmNotes })
  }

  save() {
    this.props.save({
      name: this.state.name,
      color: this.state.color,
      description: this.state.description,
      notes: this.state.dmNotes,
      id: this.props.tile.id
    });

    this.props.quit();
  }

  render() {
    return <Box sx={{width: "100%"}}>
      <IconButton
        aria-label={`Save and return to the map editor menu`}
        onClick={this.save}
      >
        <ArrowBack />
      </IconButton>
      <Stack spacing={2} sx={{alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "600px", marginLeft: "10px", marginRight: "10px"}}>
        <ChromePicker color={this.state.color} disableAlpha={true} onChange={this.onColorChange}/>
        <TextField
          fullWidth
          id="outlined-required"
          label="Name"
          onChange={this.onNameChange}
          defaultValue={this.props.tile.name}
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="Description"
          onChange={this.onDescriptionChange}
          defaultValue={this.props.tile.description}
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="DM Notes"
          onChange={this.onDMNotesChange}
          defaultValue={this.props.tile.notes}
        />
      </Stack>
    </Box>
  }
}