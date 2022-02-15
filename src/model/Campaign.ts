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
