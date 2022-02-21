import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Campaign, Character } from '../App';
import { EMPTY_CAMPAIGN, DUMMY_CAMPAIGN } from 'model/Campaign';

export class CampaignSelector extends React.Component<
  { setCampaign: (campaign: Campaign) => void},
  {}
> {

  loadCampaign() {
    this.props.setCampaign(DUMMY_CAMPAIGN);
    // this.props.setCampaign(EMPTY_CAMPAIGN);
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
        <Button variant="contained">
          New Campaign
        </Button>
        <Button variant="contained" onClick={() => { this.loadCampaign() }}>
          Load Campaign
        </Button>
        <IncrementButton />
      </Stack>
    </Box>
  }
};

// Temp component for testing purposes
type IncrementState = {
  counter: number;
}
class IncrementButton extends React.Component<{}, IncrementState> {
  state = { counter: 1 };

  sendTestMessage() {
    window.electron.ipcRenderer.myPing();

    this.setState((state) => ({
      counter: state.counter + 1
    }));
  }

  render() {
    return <div>
        <Button variant="contained" id="file-test" onClick={() => { this.sendTestMessage() } } >
          Read our {this.state.counter} docs
        </Button>
      </div>
  }
}

