import React from 'react';
import Stack from '@mui/material/Stack';
import SelectedList from './SelectableList';
import TiledExplorer from './TiledExplorer';
import { Button, Divider } from '@mui/material';
import { Character } from "../App";

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
      return <Button>{this.state.character.name}</Button>
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