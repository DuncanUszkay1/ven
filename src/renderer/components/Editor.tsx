import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Campaign } from '../App';
import { Sidebar } from './Sidebar';
import { TabPanel } from './TabPanel';
import { CharacterEditor } from './CharacterEditor';

export class Editor extends React.Component<{ campaign: Campaign }, { section: number }> {
  state = { section: 0 } 

  constructor(props: { campaign: Campaign }) {
    super(props);

    this.updatePanel = this.updatePanel.bind(this);
  }

  updatePanel(newValue: number) {
    this.setState({ section: newValue })
  }

  render() {
    return <Stack sx={{ height: "100%" }}>
      <Box sx={{ width: "100%", borderBottom: "1px solid grey", padding: "10px" }}>
        <Typography variant="button">{this.props.campaign.name}</Typography>
      </Box>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Sidebar updatePanel={this.updatePanel}/>
        <TabPanel value={this.state.section} index={0}>
          Overview content here
        </TabPanel>
        <TabPanel value={this.state.section} index={1}>
          <CharacterEditor /> 
        </TabPanel>
        <TabPanel value={this.state.section} index={2}>
          Items content here
        </TabPanel>
        <TabPanel value={this.state.section} index={3}>
          Maps content here
        </TabPanel>
        <TabPanel value={this.state.section} index={4}>
          Files content here
        </TabPanel>
      </Box>
    </Stack> 
  }
};
