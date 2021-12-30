import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '132px', maxWidth: 360, bgcolor: 'background.paper', height: "100%" }}>
      <List component="nav" aria-label="main mailbox folders" sx={{width: '132px', paddingTop: "0px"}}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemText primary="Kitchen Items" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText primary="Weapons" />
        </ListItemButton>
      </List>
    </Box>
  );
}