import { v4 as uuidv4 } from 'uuid';

export type Campaign = {
  name: string;
  maps: Map<string, VenMap>;
  characters: Map<string, Character[]>;
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
}

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
export const NEW_MAP: VenMap = {
  name: "Untitled",
  backgrounds: [],
  tiles: NEW_MAP_TILES,
  tilePalette: []
}
