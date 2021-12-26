import React from 'react';
import Stack from '@mui/material/Stack';
import SelectedList from './SelectableList';
import TiledExplorer from './TiledExplorer';

export class CharacterEditor extends React.Component {
  render() {
    return <Stack direction="row" sx={{width: "100%"}}>
      <SelectedList />  
      <TiledExplorer />
    </Stack> 
  }
}