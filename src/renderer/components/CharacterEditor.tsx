import React from 'react';
import Stack from '@mui/material/Stack';
import { SelectedList } from './SelectableList';
import CharacterExplorer from './CharacterExplorer';
import { Button, Divider, IconButton, Input, TextField } from '@mui/material';
import { Character } from "../App";
import { ArrowBack } from '@mui/icons-material';
import { Box } from '@mui/system';
import { stripQueryParams } from 'renderer/util';

export class CharacterEditor extends React.Component<
  {
    characters: Map<string, Character[]>,
    saveCharacter: (character: Character, characterFolder: string) => void,
    deleteCharacter: (uuid: string, folder: string) => void,
    createCharacter: (folder: string) => void,
    newFolder: (name: string) => void,
  },
  { selectedCharacter?: Character, folder: string }
> {
  state = { selectedCharacter: undefined, folder: this.props.characters.keys().next().value }

  editCharacter(character: Character) {
    this.setState({selectedCharacter: character});
  }

  createCharacter() {
    this.props.createCharacter(this.state.folder)
  }

  saveCharacter(character: Character) {
    this.props.saveCharacter(character, this.state.folder)
  }

  deleteCharacter(uuid: string) {
    this.props.deleteCharacter(uuid, this.state.folder)
  }

  innerContent() {
    if(this.state.selectedCharacter) {
      return <EditCharacterForm
        character={this.state.selectedCharacter}
        save={(character: Character) => { this.saveCharacter(character) }}
        quit={() => { this.setState({selectedCharacter: undefined}) }}
        delete={(uuid) => { this.deleteCharacter(uuid) }}
      />
    } else {
      return <CharacterExplorer 
        editCharacter={this.editCharacter.bind(this)}
        characters={this.props.characters.get(this.state.folder) || []}
        createCharacter={this.createCharacter.bind(this)}
      />
    }
  }

  setFolder(folder: string) {
    this.setState({ folder: folder })
  }

  newFolder(name: string) {
    this.props.newFolder(name);
  }

  render() {
    return <Stack direction="row" sx={{width: "100%"}}>
      <SelectedList
        items={Array.from(this.props.characters.keys())}
        selected={this.state.folder}
        select={this.setFolder.bind(this)}
        key={this.state.folder}
        itemName="Character Folder"
        new={this.newFolder.bind(this)}/>  
      <Divider orientation="vertical" flexItem />
      {this.innerContent()} 
    </Stack> 
  }
}

class EditCharacterForm extends React.Component<{
  character: Character, 
  save: (character: Character) => void,
  quit: () => void 
  delete: (uuid: string) => void
}, {character: Character}> {
  state = { character: this.props.character }

  editName(event: any) {
    this.setState({character: { ...this.state.character, name: event.target.value }})
  }

  editDescription(event: any) {
    this.setState({character: { ...this.state.character, description: event.target.value }})
  }

  editDMNotes(event: any) {
    this.setState({character: { ...this.state.character, dmNotes: event.target.value }})
  }

  editImg(event: any) {
    this.setState({character: { ...this.state.character, img: stripQueryParams(event.target.value) }})
  }

  render() {
    return <Box sx={{width: "100%"}}>
      <IconButton
        aria-label={`Save and return to the character selection menu`}
        onClick={() => { 
          this.props.save(this.state.character);
          this.props.quit();
        }}
      >
        <ArrowBack />
      </IconButton>
      <Stack spacing={2} sx={{alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "600px", marginLeft: "10px", marginRight: "10px"}}>
        <img
          src={`${this.state.character.img}?w=248&h=372&fit=crop&auto=format`}
          srcSet={`${this.state.character.img}?w=248&&h=372&fit=crop&auto=format&dpr=2 2x`}
          alt={this.state.character.name}
          loading="lazy"
          style={{marginBottom: "20px", marginTop: "30px", objectFit: "cover"}}
          width="249"
          height="372"
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="Image URL"
          defaultValue={this.state.character.img}
          onChange={this.editImg.bind(this)}
        />

        <TextField
          fullWidth
          id="outlined-required"
          label="Name"
          defaultValue={this.state.character.name}
          onChange={this.editName.bind(this)}
        />
        <TextField
          fullWidth
          multiline
          id="outlined-required"
          label="Description"
          defaultValue={this.state.character.description}
          onChange={this.editDescription.bind(this)}
        />
        <TextField
          fullWidth
          multiline
          id="outlined-required"
          label="DM Notes"
          defaultValue={this.state.character.dmNotes}
          onChange={this.editDMNotes.bind(this)}
        />
        <Button variant="text" onClick={() => {
          this.props.delete(this.props.character.uuid)
          this.props.quit();
        }}>Delete</Button> 
      </Stack>
    </Box>
  }
}