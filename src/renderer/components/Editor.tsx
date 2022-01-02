import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { Campaign } from '../App';
import { Sidebar } from './Sidebar';
import { TabPanel } from './TabPanel';
import { CharacterEditor } from './CharacterEditor';
import { MapEditor } from './MapEditor';

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
          <CharacterEditor characters={characters} /> 
        </TabPanel>
        <TabPanel value={this.state.section} index={2}>
          Items content here
        </TabPanel>
        <TabPanel value={this.state.section} index={3}>
          <MapEditor />
        </TabPanel>
      </Box>
    </Stack> 
  }
};

var characters = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    name: 'Breakfast',
    description: '@bkristastucchio',
    uuid: "1"
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    name: 'Burger',
    description: '@rollelflex_graphy726',
    uuid: "2"
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    name: 'Camera',
    description: '@helloimnik',
    uuid: "3"
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    name: 'Coffee',
    description: '@nolanissac',
    uuid: "4"
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    name: 'Hats',
    description: '@hjrc33',
    uuid: "5"
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    name: 'Honey',
    description: '@arwinneil',
    uuid: "6"
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    name: 'Basketball',
    description: '@tjdragotta',
    uuid: "7"
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    name: 'Fern',
    description: '@katie_wasserman',
    uuid: "8"
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    name: 'Mushrooms',
    description: '@silverdalex',
    uuid: "9"
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    name: 'Tomato basil',
    description: '@shelleypauls',
    uuid: "10"
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    name: 'Sea star',
    description: '@peterlaster',
    uuid: "11"
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    name: 'Bike',
    description: '@southside_customs',
    uuid: "12"
  },
];