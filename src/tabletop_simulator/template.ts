import fs from 'fs';
import path from 'path';
import { Character } from 'model/Campaign';

const BASE_TEMPLATE = "base.json"
const FIGURINE_TEMPLATE = "figurine.json"
const CUSTOM_IMAGE_TEMPLATE = "custom_image.json"

export function characterFromTemplate(character: Character) {
  return objectFromTemplate({
    ...loadTemplate(FIGURINE_TEMPLATE),
    "Nickname": character.name,
    "Description": character.description,
    "GMNotes": character.dmNotes,
    "CustomImage": { ...loadTemplate(CUSTOM_IMAGE_TEMPLATE), "ImageUrl": character.img }  
  })
}

function objectFromTemplate(objectState: any) {
  return JSON.stringify({ ...loadTemplate(BASE_TEMPLATE), "ObjectStates": [objectState] })
}

function loadTemplate(template: string) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "templates", template), 'utf8'));
}