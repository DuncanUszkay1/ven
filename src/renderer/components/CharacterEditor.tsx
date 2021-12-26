import React from 'react';
import Stack from '@mui/material/Stack';
import SelectedList from './SelectableList';
import TiledExplorer from './TiledExplorer';
import { Divider } from '@mui/material';

export class CharacterEditor extends React.Component {
  render() {
    return <Stack direction="row" sx={{width: "100%"}}>
      <SelectedList />  
      <Divider orientation="vertical" flexItem />
      <TiledExplorer />
    </Stack> 
  }
}