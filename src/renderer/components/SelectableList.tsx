import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon, Modal } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

export class SelectedList extends React.Component<{
  items: string[],
  selected: string,
  new: () => void,
  select: (item: string) => void }
> {
  render() {
    const listItems = this.props.items.map((item) => {
      return <ListItemButton
        selected={this.props.selected === item}
        onClick={() => { this.props.select(item) }}
      >
        <ListItemText primary={item} />
      </ListItemButton>
    })

    return <Box sx={{ width: '132px', maxWidth: 360, bgcolor: 'background.paper', height: "100%" }}>
      <List component="nav" aria-label="main mailbox folders" sx={{width: '132px', paddingTop: "0px"}}>
        {listItems}
        <ListItemButton
          selected={false}
          onClick={this.props.new}
        >
          <ListItemIcon sx={{minWidth: "43px"}}>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Folder" sx={{marginTop: "5px", marginBottom: "3px"}} />
        </ListItemButton>
      </List>
    </Box>
  }
}