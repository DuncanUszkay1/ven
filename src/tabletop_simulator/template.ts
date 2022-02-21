import fs from 'fs';
import path from 'path';
import { Character, Item, VenMap, VOID_TILE } from '../model/Campaign';

const BASE_TEMPLATE = "base.json"
const FIGURINE_TEMPLATE = "figurine.json"
const CARD_TEMPLATE = "card.json"
const CUSTOM_IMAGE_TEMPLATE = "custom_image.json"
const DECK_ENTRY_TEMPLATE = "deck_entry.json"
const MAP_TILE_TEMPLATE = "map_tile.json"
const MAP_TILE_CUSTOM_IMAGE = "map_tile_custom_image.json"
const TRANSFORM_TEMPLATE = "transform.json"

export function characterFromTemplate(character: Character) {
  return objectFromTemplate([{
    ...loadTemplate(FIGURINE_TEMPLATE),
    "Nickname": character.name,
    "Description": character.description,
    "GMNotes": character.dmNotes,
    "CustomImage": { ...loadTemplate(CUSTOM_IMAGE_TEMPLATE), "ImageUrl": character.img }  
  }])
}

export function itemFromTemplate(item: Item) {
  return objectFromTemplate([{
    ...loadTemplate(CARD_TEMPLATE),
    "Nickname": item.name,
    "Description": item.description,
    "GMNotes": item.dmNotes,
    "CustomDeck": {
      "1": {
        ...loadTemplate(DECK_ENTRY_TEMPLATE),
        "FaceUrl": item.img,
        "BackUrl": item.img
      }
    }
  }]);
}

export function mapFromTemplate(venMap: VenMap) {
  return objectFromTemplate(venMap.tiles.flatMap((row, rowIndex) => {
    return row.flatMap((tile, columnIndex) => {
      if(tile.id == VOID_TILE.id) {
        return []
      } else {
        return [{
          ...loadTemplate(MAP_TILE_TEMPLATE),
          "Nickname": tile.name,
          "Description": tile.description,
          "GMNotes": tile.notes,
          "Transform": {
            ...loadTemplate(TRANSFORM_TEMPLATE),
            "posX": rowIndex * 2,
            "posZ": columnIndex * -2
          },
          "CustomImage": {
            ...loadTemplate(MAP_TILE_CUSTOM_IMAGE),
            "ImageUrl": `https://dummyimage.com/100x100/${stripHexColor(tile.color)}/&text=+` 
          }
        }]
      }
    })
  }))
}

function stripHexColor(color: string) {
  return color.substring(1);
}

function objectFromTemplate(objectState: any) {
  return JSON.stringify({ ...loadTemplate(BASE_TEMPLATE), "ObjectStates": objectState })
}

function loadTemplate(template: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "templates", template), 'utf8'));
}