import React from 'react';
import Stack from '@mui/material/Stack';
import { SelectedList } from './SelectableList';
import ItemExplorer from './ItemExplorer';
import { Button, Divider, IconButton, Input, TextField } from '@mui/material';
import { Item } from "../App";
import { ArrowBack } from '@mui/icons-material';
import { Box } from '@mui/system';

export class ItemEditor extends React.Component<
  {
    items: Map<string, Item[]>,
    saveItem: (item: Item, itemFolder: string) => void,
    deleteItem: (uuid: string, folder: string) => void,
    createItem: (folder: string) => void,
    newFolder: (name: string) => void,
  },
  { selectedItem?: Item, folder: string }
> {
  state = { selectedItem: undefined, folder: this.props.items.keys().next().value }

  constructor(props: any) {
    super(props);

    this.editItem = this.editItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setFolder = this.setFolder.bind(this);
    this.newFolder = this.newFolder.bind(this);
  }

  editItem(item: Item) {
    this.setState({selectedItem: item});
  }

  createItem() {
    this.props.createItem(this.state.folder)
  }

  saveItem(item: Item) {
    this.props.saveItem(item, this.state.folder)
  }

  deleteItem(uuid: string) {
    this.props.deleteItem(uuid, this.state.folder)
  }

  innerContent() {
    if(this.state.selectedItem) {
      return <EditItemForm
        item={this.state.selectedItem}
        save={(item: Item) => { this.saveItem(item) }}
        quit={() => { this.setState({selectedItem: undefined}) }}
        delete={(uuid) => { this.deleteItem(uuid) }}
      />
    } else {
      return <ItemExplorer 
        editItem={this.editItem}
        items={this.props.items.get(this.state.folder) || []}
        createItem={this.createItem}
      />
    }
  }

  setFolder(folder: string) {
    this.setState({ folder: folder })
  }

  newFolder(name: string) {
    this.props.newFolder(name);
  }

  render() {
    return <Stack direction="row" sx={{width: "100%"}}>
      <SelectedList
        items={Array.from(this.props.items.keys())}
        selected={this.state.folder}
        select={this.setFolder}
        key={this.state.folder}
        itemName="Item"
        new={this.newFolder}/>  
      <Divider orientation="vertical" flexItem />
      {this.innerContent()} 
    </Stack> 
  }
}

class EditItemForm extends React.Component<{
  item: Item, 
  save: (item: Item) => void,
  quit: () => void 
  delete: (uuid: string) => void
}, {item: Item}> {
  state = { item: this.props.item }

  constructor(props: any) {
    super(props);

    this.editName = this.editName.bind(this);
    this.editDescription = this.editDescription.bind(this);
    this.editDMNotes = this.editDMNotes.bind(this);
    this.editImg = this.editImg.bind(this);
  }

  editName(event: any) {
    this.setState({item: { ...this.state.item, name: event.target.value }})
  }

  editDescription(event: any) {
    this.setState({item: { ...this.state.item, description: event.target.value }})
  }

  editDMNotes(event: any) {
    this.setState({item: { ...this.state.item, dmNotes: event.target.value }})
  }

  editImg(event: any) {
    this.setState({item: { ...this.state.item, img: event.target.value }})
  }

  render() {
    return <Box sx={{width: "100%"}}>
      <IconButton
        aria-label={`Save and return to the item selection menu`}
        onClick={() => { 
          this.props.save(this.state.item);
          this.props.quit();
        }}
      >
        <ArrowBack />
      </IconButton>
      <Stack spacing={2} sx={{alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "600px", marginLeft: "10px", marginRight: "10px"}}>
        <img
          src={`${this.state.item.img}?w=248&h=372&fit=crop&auto=format`}
          srcSet={`${this.state.item.img}?w=248&&h=372&fit=crop&auto=format&dpr=2 2x`}
          alt={this.state.item.name}
          loading="lazy"
          style={{marginBottom: "20px", marginTop: "30px", objectFit: "cover"}}
          width="249"
          height="372"
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="Image URL"
          defaultValue={this.state.item.img}
          onChange={this.editImg}
        />

        <TextField
          fullWidth
          id="outlined-required"
          label="Name"
          defaultValue={this.state.item.name}
          onChange={this.editName}
        />
        <TextField
          fullWidth
          multiline
          id="outlined-required"
          label="Description"
          defaultValue={this.state.item.description}
          onChange={this.editDescription}
        />
        <TextField
          fullWidth
          multiline
          id="outlined-required"
          label="DM Notes"
          defaultValue={this.state.item.dmNotes}
          onChange={this.editDMNotes}
        />
        <Button variant="text" onClick={() => {
          this.props.delete(this.props.item.uuid)
          this.props.quit();
        }}>Delete</Button> 
      </Stack>
    </Box>
  }
}