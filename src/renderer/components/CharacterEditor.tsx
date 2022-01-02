import React from 'react';
import Stack from '@mui/material/Stack';
import { SelectedList } from './SelectableList';
import TiledExplorer from './TiledExplorer';
import { Button, Divider, IconButton, Input, TextField } from '@mui/material';
import { Character } from "../App";
import { ArrowBack } from '@mui/icons-material';
import { Box } from '@mui/system';

export class CharacterEditor extends React.Component<{ characters: Character[] }, { selectedCharacter?: Character }> {
  state = { selectedCharacter: undefined }

  constructor(props: { characters: Character[] }) {
    super(props);

    this.editCharacter = this.editCharacter.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
  }

  editCharacter(character: Character) {
    this.setState({selectedCharacter: character});
  }

  saveCharacter(character: Character) {
    console.log("Sending back character info to main thread")
    console.log(character);
  }

  innerContent() {
    if(this.state.selectedCharacter) {
      return <EditCharacterForm
      character={this.state.selectedCharacter}
      save={(character: Character) => { this.saveCharacter(character) }}
      quit={() => { this.setState({selectedCharacter: undefined}) }}
      />
    } else {
      return <TiledExplorer editCharacter={this.editCharacter} characters={this.props.characters} />
    }
  }

  render() {
    return <Stack direction="row" sx={{width: "100%"}}>
      <SelectedList items={["Kitchen Items", "Weapons"]}/>  
      <Divider orientation="vertical" flexItem />
      {this.innerContent()} 
    </Stack> 
  }
}

class EditCharacterForm extends React.Component<{
  character: Character, 
  save: (character: Character) => void,
  quit: () => void 
}> {
  render() {
    return <Box sx={{width: "100%"}}>
      <IconButton
        aria-label={`Save and return to the character selection menu`}
        onClick={() => { 
          this.props.save({
            name: "saved!",
            img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            description: "This has been saved",
            uuid: "1"
          });
          this.props.quit();
        }}
      >
        <ArrowBack />
      </IconButton>
      <Stack spacing={2} sx={{alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "600px", marginLeft: "10px", marginRight: "10px"}}>
        <img
          src={`${this.props.character.img}?w=248&h=372&fit=crop&auto=format`}
          srcSet={`${this.props.character.img}?w=248&&h=372&fit=crop&auto=format&dpr=2 2x`}
          alt={this.props.character.name}
          loading="lazy"
          style={{marginBottom: "20px", marginTop: "30px"}}
        />
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" />
        </label>
        <TextField
          fullWidth
          id="outlined-required"
          label="Name"
          defaultValue={this.props.character.name}
        />
        <TextField
          fullWidth
          multiline
          id="outlined-required"
          label="Description"
          defaultValue={this.props.character.description}
        />
        <TextField
          fullWidth
          multiline
          id="outlined-required"
          label="DM Notes"
          defaultValue={this.props.character.description}
        />
      </Stack>
    </Box>
  }
}