import React from 'react';
import Stack from '@mui/material/Stack';
import SelectedList from './SelectableList';
import TiledExplorer from './TiledExplorer';
import { Button, Divider, IconButton } from '@mui/material';
import { Character } from "../App";
import { ArrowBack } from '@mui/icons-material';

export class CharacterEditor extends React.Component<{}, { character?: Character }> {
  state = { character: undefined }

  constructor(props: {}) {
    super(props);

    this.editCharacter = this.editCharacter.bind(this);
  }

  editCharacter(character: Character) {
    this.setState({character: character});
  }

  innerContent() {
    if(this.state.character) {
      return <EditCharacterForm
      character={this.state.character.name}
      save={() => { console.log("ay") }}
      quit={() => { this.setState({character: undefined}) }}
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