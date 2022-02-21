import fs from 'fs';
import path from 'path';
import { Character, Item } from 'model/Campaign';

const BASE_TEMPLATE = "base.json"
const FIGURINE_TEMPLATE = "figurine.json"
const CARD_TEMPLATE = "card.json"
const CUSTOM_IMAGE_TEMPLATE = "custom_image.json"
const DECK_ENTRY_TEMPLATE = "deck_entry.json"

export function characterFromTemplate(character: Character) {
  return objectFromTemplate({
    ...loadTemplate(FIGURINE_TEMPLATE),
    "Nickname": character.name,
    "Description": character.description,
    "GMNotes": character.dmNotes,
    "CustomImage": { ...loadTemplate(CUSTOM_IMAGE_TEMPLATE), "ImageUrl": character.img }  
  })
}

export function itemFromTemplate(item: Item) {
  return objectFromTemplate({
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
  });
}

function objectFromTemplate(objectState: any) {
  return JSON.stringify({ ...loadTemplate(BASE_TEMPLATE), "ObjectStates": [objectState] })
}

function loadTemplate(template: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "templates", template), 'utf8'));
}