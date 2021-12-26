import React from 'react';
import Stack from '@mui/material/Stack';
import SelectedList from './SelectableList';
import TiledExplorer from './TiledExplorer';
import { Button, Divider, IconButton } from '@mui/material';
import { Character } from "../App";
import { ArrowBack } from '@mui/icons-material';

export class CharacterEditor extends React.Component<{}, { selectedCharacter?: Character }> {
  state = { selectedCharacter: undefined }

  constructor(props: {}) {
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
      return <TiledExplorer editCharacter={this.editCharacter}/>
    }
  }

  render() {
    return <Stack direction="row" sx={{width: "100%"}}>
      <SelectedList />  
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
    return <Stack>
      <IconButton
        aria-label={`Save and return to the character selection menu`}
        onClick={() => { 
          this.props.save({ name: "saved!" });
          this.props.quit();
        }}
      >
        <ArrowBack />
      </IconButton>
    </Stack>
  }
}