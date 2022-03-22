import React from 'react';
import Stack from '@mui/material/Stack';
import { Button, IconButton, TextField } from '@mui/material';
import { Tile } from "../App";
import { ArrowBack } from '@mui/icons-material';
import { Box } from '@mui/system';
import { ChromePicker } from 'react-color';

export class TileForm extends React.Component<{
  tile: Tile, 
  save: (tile: Tile) => void,
  quit: () => void,
  delete: (id: number) => void 
}, { color: string, name: string, description: string, dmNotes: string, img: string | undefined }> {
  state = {
    color: this.props.tile.color,
    name: this.props.tile.name,
    description: this.props.tile.description,
    dmNotes: this.props.tile.notes,
    img: this.props.tile.img 
  }

  onColorChange(event: any) {
    this.setState({ color: event.hex  })
  }

  onNameChange(event: any) {
    this.setState({ name: event.target.value })
  }

  onImgChange(event: any) {
    this.setState({ img: event.target.value })
  }

  onDescriptionChange(event: any) {
    this.setState({ description: event.target.value })
  }

  onDMNotesChange(event: any) {
    this.setState({ dmNotes: event.target.value })
  }

  save() {
    this.props.save({
      name: this.state.name,
      color: this.state.color,
      img: this.state.img,
      description: this.state.description,
      notes: this.state.dmNotes,
      id: this.props.tile.id
    });

    this.props.quit();
  }

  delete() {
    this.props.delete(this.props.tile.id);

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
        <ChromePicker color={this.state.color} disableAlpha={true} onChange={this.onColorChange.bind(this)}/>
        <TextField
          fullWidth
          id="outlined-required"
          label="Name"
          onChange={this.onNameChange.bind(this)}
          defaultValue={this.props.tile.name}
        />
        <TextField
          fullWidth
          id="outlined"
          label="Image URL (optional)"
          onChange={this.onImgChange.bind(this)}
          defaultValue={this.props.tile.img}
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="Description"
          onChange={this.onDescriptionChange.bind(this)}
          defaultValue={this.props.tile.description}
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="DM Notes"
          onChange={this.onDMNotesChange.bind(this)}
          defaultValue={this.props.tile.notes}
        />
        <Button variant="text" onClick={this.delete.bind(this)}>Delete</Button> 
      </Stack>
    </Box>
  }
}