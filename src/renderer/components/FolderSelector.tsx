import React from 'react';
import Stack from '@mui/material/Stack';
import SelectedList from './SelectableList';
import TiledExplorer from './TiledExplorer';

export class FolderSelector extends React.Component {
  render() {
    return <Stack direction="row">
      <SelectedList />  
      <TiledExplorer />
    </Stack>
  }
}