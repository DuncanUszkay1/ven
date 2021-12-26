import React from 'react';
import Stack from '@mui/material/Stack';
import { FolderSelector } from './FolderSelector';

export class CharacterEditor extends React.Component {
  render() {
    return <Stack direction="row">
      <FolderSelector />
    </Stack> 
  }
}