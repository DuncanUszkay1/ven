import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, Modal, TextField } from '@mui/material';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { Background } from "../App";
import DeleteIcon from '@mui/icons-material/Delete';

export class BackgroundEditor extends React.Component<{
  backgrounds: Background[],
  deleteBackground: (background: Background) => void,
  createBackground: (background: Background) => void
}, {
  createDialogOpen: boolean,
  createDialogName: string | null
  createDialogImg: string | null
}> {
  state = {createDialogOpen: false, createDialogName: null, createDialogImg: null}

  constructor(props: any) {
    super(props);

    this.deleteBackground = this.deleteBackground.bind(this);
    this.openCreateDialog = this.openCreateDialog.bind(this);
    this.closeCreateDialog = this.closeCreateDialog.bind(this);
    this.submitCreateDialog = this.submitCreateDialog.bind(this);
    this.updateCreateDialogName = this.updateCreateDialogName.bind(this);
    this.updateCreateDialogImg = this.updateCreateDialogImg.bind(this);
  }

  deleteBackground(background: Background) {
    // this.setState({selectedBackground: background});
  }

  openCreateDialog() {
    this.setState({createDialogOpen: true})
  }

  closeCreateDialog() {
    this.setState({createDialogOpen: false})
  }

  submitCreateDialog() {
    if(this.state.createDialogName == null || this.state.createDialogImg == null) {
      this.closeCreateDialog();
    } else {
      this.props.createBackground({
        name: this.state.createDialogName,
        img: this.state.createDialogImg
      });
      this.setState({createDialogName: null, createDialogImg: null, createDialogOpen: false})
    }
  }

  updateCreateDialogName(event: any) {
    this.setState({createDialogName: event.target.value})
  }

  updateCreateDialogImg(event: any) {
    this.setState({createDialogImg: event.target.value})
  }

  render() {
    return <ImageList sx={{ width: "100%", gridTemplateColumns: "repeat(auto-fill, 200px) !important", paddingLeft: "24px" }}>
      {this.props.backgrounds.map((item) => (
        <ImageListItem key={item.name} sx={{border: "1px solid grey"}}>
          <img
            src={`${item.img}?w=248&h=372&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&&h=372&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            sx={{paddingLeft:"5px"}}
            actionIcon={
              <IconButton
                aria-label={`info about ${item.name}`}
                onClick={() => { this.props.deleteBackground(item)}}
              >
                <DeleteIcon  />
              </IconButton>
            }
            position="below"
          />
        </ImageListItem>
      ))}
      <Dialog open={this.state.createDialogOpen} onClose={this.closeCreateDialog}>
        <DialogTitle>Create New Background</DialogTitle>
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
          <TextField
            autoFocus
            margin="dense"
            id="img"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            onChange={this.updateCreateDialogImg}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeCreateDialog}>Cancel</Button>
          <Button onClick={this.submitCreateDialog}>Create</Button>
        </DialogActions>
      </Dialog>
      <ImageListItem key={"NEW_BG"} sx={{border: "1px solid grey"}}>
        <img
          src={`https://library.kissclipart.com/20180831/lle/kissclipart-sky-clipart-silhouette-desktop-wallpaper-phenomeno-eba7a5f7df1c104b.png`}
          srcSet={`https://library.kissclipart.com/20180831/lle/kissclipart-sky-clipart-silhouette-desktop-wallpaper-phenomeno-eba7a5f7df1c104b.png`}
          alt="New Background"
          loading="lazy"
        />
        <ImageListItemBar
          title="New Background"
          sx={{paddingLeft:"5px"}}
          actionIcon={
            <IconButton
              aria-label={`info about new background`}
              onClick={this.openCreateDialog}
            >
              <AddCircleIcon  />
            </IconButton>
          }
          position="below"
        />
      </ImageListItem>
    </ImageList>
  }
}