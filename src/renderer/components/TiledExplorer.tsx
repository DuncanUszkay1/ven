import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { Character } from 'model/Campaign';

export default function TiledExplorer(props: {
  editCharacter: (campaign: Character) => void,
  characters: Character[]
}) {
  const subtitle = (item: Character) => {
    if(item.dmNotes.length > 0) {
      return item.dmNotes  
    }
    return "No DM Notes"
  }
  return (
    <ImageList sx={{ width: "100%", gridTemplateColumns: "repeat(auto-fill, 200px) !important", paddingLeft: "24px" }}>
      {props.characters.map((item) => (
        <ImageListItem key={item.img} sx={{border: "1px solid grey"}}>
          <img
            src={`${item.img}?w=248&h=372&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&&h=372&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={subtitle(item)}
            sx={{paddingLeft:"5px"}}
            actionIcon={
              <IconButton
                aria-label={`info about ${item.name}`}
                onClick={() => { props.editCharacter(item)}}
              >
                <EditIcon />
              </IconButton>
            }
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}