import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Campaign, Character } from '../App';
import { NEW_MAP_TILES, VenMap } from 'model/Campaign';

const GRASS_TILE: Tile = { name: "Grass", color: "#3aeb34", id: 1, description: "Feels nice to touch!", notes: "Grass is slippery" }
const INN_TILE: Tile = { name: "Inn", color: "#4a3b0a", id: 2, description: "Feels nice to touch!", notes: "Grass is slippery" }
const CLOSET_TILE: Tile = { name: "Closet", color: "#4a3b0a", id: 3, description: "Feels nice to touch!", notes: "Grass is slippery" }
const WATER_TILE: Tile = { name: "Water", color: "#00ffee", id: 4, description: "Feels nice to touch!", notes: "Grass is slippery" }
const TILE_PALETTE = [GRASS_TILE, INN_TILE, CLOSET_TILE, WATER_TILE]

const DUMMY_CAMPAIGN: Campaign = {
  name: "The Path of Misery",
  maps: new Map<string, VenMap>([
    ["Joe's Inn", {
      name: "Joe's Inn",
      backgrounds: [
        { name: "Inn 1", img: "https://cdnb.artstation.com/p/assets/images/images/023/527/051/large/mario-v-popup-11.jpg?1579513575" },
        { name: "Inn 2", img: "https://cdnb.artstation.com/p/assets/images/images/023/527/051/large/mario-v-popup-11.jpg?1579513575" },
        { name: "Inn 3", img: "https://cdnb.artstation.com/p/assets/images/images/023/527/051/large/mario-v-popup-11.jpg?1579513575" },
        { name: "Grass", img: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2012/8/10/0/HMYGD211_Galloway-backyard-3-AFTER-2517-ret_s4x3.jpg.rend.hgtvcom.966.725.suffix/1400977751663.jpeg" }
      ],
      tiles: NEW_MAP_TILES,
      tilePalette: TILE_PALETTE
    }],
    ["Hell", {
      name: "Hell",
      backgrounds: [
        { name: "Hell", img: "https://images.pexels.com/photos/1270184/pexels-photo-1270184.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" },
      ],
      tiles: NEW_MAP_TILES,
      tilePalette: []
    }]
  ]),
  characters: new Map<string, Character[]>([
    ["Cool Guys", [
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
      }
    ]],
    ["Lame Guys", [
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
    ]]
    ]
  )
};

export class CampaignSelector extends React.Component<
  { setCampaign: (campaign: Campaign) => void},
  {}
> {

  loadCampaign() {
    this.props.setCampaign(DUMMY_CAMPAIGN);
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

