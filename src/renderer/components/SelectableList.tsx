import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export class SelectedList extends React.Component<{ items: string[] }, { selectedIndex: number }> {
  state = { selectedIndex: 0 }

  render() {
    const listItems = this.props.items.map((item, index) => {
      return <ListItemButton
        selected={this.state.selectedIndex === index}
        onClick={(event) =>  console.log(index)}
      >
        <ListItemText primary={item} />
      </ListItemButton>
    })
    return <Box sx={{ width: '132px', maxWidth: 360, bgcolor: 'background.paper', height: "100%" }}>
      <List component="nav" aria-label="main mailbox folders" sx={{width: '132px', paddingTop: "0px"}}>
        {listItems}
      </List>
    </Box>
  }
}