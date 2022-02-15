import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, Modal, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

export class SelectedList extends React.Component<{
  items: string[],
  selected: string,
  new: (name: string) => void,
  select: (item: string) => void,
  itemName: string
}, {
  createDialogOpen: boolean,
  createDialogName: string | null
}
> {
  state = {createDialogOpen: false, createDialogName: null}
  constructor(props: any) {
    super(props)

    this.openCreateDialog = this.openCreateDialog.bind(this);
    this.closeCreateDialog = this.closeCreateDialog.bind(this);
    this.submitCreateDialog = this.submitCreateDialog.bind(this);
    this.updateCreateDialogName = this.updateCreateDialogName.bind(this);
  }

  openCreateDialog() {
    this.setState({createDialogOpen: true})
  }

  closeCreateDialog() {
    this.setState({createDialogOpen: false})
  }

  submitCreateDialog() {
    if(this.state.createDialogName == null) {
      this.closeCreateDialog();
    } else {
      this.props.new(this.state.createDialogName);
      this.setState({createDialogName: null, createDialogOpen: false})
    }
  }

  updateCreateDialogName(event: any) {
    this.setState({createDialogName: event.target.value})
  }

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
        <Dialog open={this.state.createDialogOpen} onClose={this.closeCreateDialog}>
        <DialogTitle>Create New {this.props.itemName}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={this.updateCreateDialogName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeCreateDialog}>Cancel</Button>
          <Button onClick={this.submitCreateDialog}>Create</Button>
        </DialogActions>
      </Dialog>

        <ListItemButton
          selected={false}
          onClick={this.openCreateDialog}
          sx={{justifyContent: "center"}}
        >
          <ListItemIcon sx={{minWidth: "0px"}}>
            <AddBoxIcon />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Box>
  }
}