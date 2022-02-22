import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Campaign, Character } from '../App';
import { EMPTY_CAMPAIGN, DUMMY_CAMPAIGN } from 'model/Campaign';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { timeStamp } from 'console';

export class CampaignSelector extends React.Component<
  { setCampaign: (campaign: Campaign) => void, loadCampaign: () => void, newCampaign: (name: string) => void},
  { name: string | null, createModal: boolean }
> {
  state = { name: null, createModal: false}

  constructor(props: any) {
    super(props)

    this.loadCampaign = this.loadCampaign.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.updateName = this.updateName.bind(this);
    this.submitCreateModal = this.submitCreateModal.bind(this);
  }

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
        <Button variant="contained" onClick={this.openCreateModal}>
          New Campaign
        </Button>
        <Button variant="contained" onClick={() => { this.props.loadCampaign() }}>
          Load Campaign
        </Button>
      </Stack>
      <Dialog open={this.state.createModal} onClose={this.closeCreateModal}>
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
            onChange={this.updateName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeCreateModal}>Cancel</Button>
          <Button onClick={this.submitCreateModal}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  }
};