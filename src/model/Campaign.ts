import { v4 as uuidv4 } from 'uuid';

export type Campaign = {
  name: string;
  maps: Map<string, VenMap>;
  characters: Map<string, Character[]>;
  items: Map<string, Item[]>;
}

export type Character = {
  name: string;
  description: string;
  dmNotes: string
  img: string;
  uuid: string;
}

export function generateCharacter() {
  return {
    name: CHARACTER_NAMES[Math.floor(Math.random() * CHARACTER_NAMES.length)],
    description: "",
    dmNotes: "",
    img: "https://64.media.tumblr.com/b40450545493e54d3470d9b6a301f02e/tumblr_n7xa3avoBi1s0b8kvo1_1280.gifv",
    uuid: uuidv4()
  } 
}

const CHARACTER_NAMES = [
  "Akibrus",
  "Angun",
  "Balrus",
  "Bulruk",
  "Caldor",
  "Dagen",
  "Darvyn",
  "Delvin",
  "Dracyian",
  "Dray",
  "Eldar",
  "Engar",
  "Fabien",
  "Farkas",
  "Galdor",
  "Igor",
  "Jai-Blynn",
  "Klayden",
  "Laimus",
  "Malfas",
  "Norok",
  "Orion",
  "Pindious",
  "Quintus",
  "Rammir",
  "Remus",
  "Rorik",
  "Sabir ",
  "Séverin",
  "Sirius",
  "Soril",
  "Sulfu",
  "Syfas",
  "Viktas",
  "Vyn",
  "Wilkass",
  "Yagul",
  "Zakkas",
  "Zarek",
  "Zorion"
]

export type ItemFolder = {
  name: string;
  characters: Item[];
}

export type Item = {
  name: string;
  description: string;
  img: string;
  uuid: string;
  dmNotes: string;
}

export function generateItem() {
  return {
    name: ITEM_NAMES[Math.floor(Math.random() * ITEM_NAMES.length)],
    description: "",
    dmNotes: "",
    img: "https://tipsmake.com/data/images/the-strange-object-is-from-ancient-roman-times-the-mystery-cannot-be-decoded-picture-1-M6q9J0V9I.jpg",
    uuid: uuidv4()
  } 
}

const ITEM_NAMES = [
  "Gizmo",
  "Widget",
  "Doodad",
  "ThingaMaJig",
  "Bonkle"
]

export type VenMap = {
  name: string;
  backgrounds: Background[];
  tiles: Tile[][];
  tilePalette: Tile[];
}

export type Background = {
  name: string;
  img: string;
}

export type Tile = {
  name: string;
  color: string;
  notes: string;
  description: string;
  id: number;
}

export const MAP_HEIGHT = 30;
export const MAP_WIDTH = 30;
export const VOID_TILE: Tile = {
  name: "Void",
  color: "#000000",
  notes: "This tile won't be included in the final map.",
  description: "This tile won't be included in the final map.",
  id: 0
} 
export const NEW_MAP_TILES: Tile[][] = Array(MAP_HEIGHT).fill(Array(MAP_WIDTH).fill(VOID_TILE))
export const NEW_TILE: Tile = {
  name: "Concrete",
  color: "#f1f1f1",
  notes: "",
  description: "",
  id: 0
}
export const NEW_MAP: VenMap = {
  name: "Untitled",
  backgrounds: [],
  tiles: NEW_MAP_TILES,
  tilePalette: []
}

const GRASS_TILE: Tile = { name: "Grass", color: "#3aeb34", id: 1, description: "Feels nice to touch!", notes: "Grass is slippery" }
const INN_TILE: Tile = { name: "Inn", color: "#4a3b0a", id: 2, description: "Feels nice to touch!", notes: "Grass is slippery" }
const CLOSET_TILE: Tile = { name: "Closet", color: "#4a3b0a", id: 3, description: "Feels nice to touch!", notes: "Grass is slippery" }
const WATER_TILE: Tile = { name: "Water", color: "#00ffee", id: 4, description: "Feels nice to touch!", notes: "Grass is slippery" }
const TILE_PALETTE = [GRASS_TILE, INN_TILE, CLOSET_TILE, WATER_TILE]

const CHECKERBOARD_TILES = NEW_MAP_TILES.map((row, rowIndex) => {
  return row.map((tile, columnIndex) => {
    if((columnIndex + rowIndex) % 2 == 0) {
      return GRASS_TILE
    } else {
      return INN_TILE
    }
  })
})

export const EMPTY_CAMPAIGN: Campaign = {
  name: "The Path of Misery",
  maps: new Map<string, VenMap>([]),
  characters: new Map<string, Character[]>([["Default", []]]),
  items: new Map<string, Item[]>([["Default", []]]),
} 
export const DUMMY_CAMPAIGN: Campaign = {
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
      tiles: CHECKERBOARD_TILES,
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
  items: new Map<string, Item[]>([
    ["Cool Guys", [
      {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        name: 'Breakfast',
        description: '@bkristastucchio',
        uuid: "1",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        name: 'Burger',
        description: '@rollelflex_graphy726',
        uuid: "2",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        name: 'Camera',
        description: '@helloimnik',
        uuid: "3",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        name: 'Coffee',
        description: '@nolanissac',
        uuid: "4",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        name: 'Hats',
        description: '@hjrc33',
        uuid: "5",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        name: 'Honey',
        description: '@arwinneil',
        uuid: "6",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        name: 'Basketball',
        description: '@tjdragotta',
        uuid: "7",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        name: 'Fern',
        description: '@katie_wasserman',
        uuid: "8",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        name: 'Mushrooms',
        description: '@silverdalex',
        uuid: "9",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        name: 'Tomato basil',
        description: '@shelleypauls',
        uuid: "10",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        name: 'Sea star',
        description: '@peterlaster',
        uuid: "11",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        name: 'Bike',
        description: '@southside_customs',
        uuid: "12",
        dmNotes: ""
      }
    ]],
    ["Lame Guys", [
      {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        name: 'Tomato basil',
        description: '@shelleypauls',
        uuid: "10",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        name: 'Sea star',
        description: '@peterlaster',
        uuid: "11",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        name: 'Bike',
        description: '@southside_customs',
        uuid: "12",
        dmNotes: ""
      },
    ]]
  ]),
  characters: new Map<string, Character[]>([
    ["Cool Guys", [
      {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        name: 'Breakfast',
        description: '@bkristastucchio',
        uuid: "1",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        name: 'Burger',
        description: '@rollelflex_graphy726',
        uuid: "2",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        name: 'Camera',
        description: '@helloimnik',
        uuid: "3",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        name: 'Coffee',
        description: '@nolanissac',
        uuid: "4",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        name: 'Hats',
        description: '@hjrc33',
        uuid: "5",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        name: 'Honey',
        description: '@arwinneil',
        uuid: "6",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        name: 'Basketball',
        description: '@tjdragotta',
        uuid: "7",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        name: 'Fern',
        description: '@katie_wasserman',
        uuid: "8",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        name: 'Mushrooms',
        description: '@silverdalex',
        uuid: "9",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        name: 'Tomato basil',
        description: '@shelleypauls',
        uuid: "10",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        name: 'Sea star',
        description: '@peterlaster',
        uuid: "11",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        name: 'Bike',
        description: '@southside_customs',
        uuid: "12",
        dmNotes: ""
      }
    ]],
    ["Lame Guys", [
      {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        name: 'Tomato basil',
        description: '@shelleypauls',
        uuid: "10",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        name: 'Sea star',
        description: '@peterlaster',
        uuid: "11",
        dmNotes: ""
      },
      {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        name: 'Bike',
        description: '@southside_customs',
        uuid: "12",
        dmNotes: ""
      },
    ]]
    ]
  )
};