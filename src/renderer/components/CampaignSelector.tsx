import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export class CampaignSelector extends React.Component<
  { loadCampaign: () => void, newCampaign: (name: string) => void},
  { name: string | null, createModal: boolean }
> {
  state = { name: null, createModal: false}

  loadCampaign() {
    this.props.loadCampaign();
  }

  closeCreateModal() {
    this.setState({ createModal: false, name: null })
  }

  openCreateModal() {
    this.setState({ createModal: true })
  }

  updateName(event: any) {
    this.setState({ name: event.target.value })
  }

  submitCreateModal() {
    this.props.newCampaign(this.state.name || "Default")
    this.closeCreateModal();
  }

  render() {
    return <Box sx={{
      width: '100%',
      textAlign: 'center',
      pt: '20%'
    }}>
      <Typography variant="h1" component="div" gutterBottom>
        Ven
      </Typography>
      <Typography variant="h2" component="div" gutterBottom>
        Tabletop Simulator RPG Editor
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx= {{
        pt: "20px"
      }}>
        <Button variant="contained" onClick={this.openCreateModal.bind(this)}>
          New Campaign
        </Button>
        <Button variant="contained" onClick={() => { this.props.loadCampaign() }}>
          Load Campaign
        </Button>
      </Stack>
      <Dialog open={this.state.createModal} onClose={this.closeCreateModal.bind(this)}>
        <DialogTitle>Create New Campaign</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={this.updateName.bind(this)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeCreateModal.bind(this)}>Cancel</Button>
          <Button onClick={this.submitCreateModal.bind(this)}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  }
};