import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { Character } from 'model/Campaign';

export default function TiledExplorer(props: {
  editCharacter: (campaign: Character) => void,
  createCharacter: () => void,
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
      <ImageListItem key={'new'} sx={{border: "1px solid grey"}}>
        <img
          src={`https://cdn.pixabay.com/photo/2012/04/18/00/07/silhouette-of-a-man-36181_1280.png`}
          srcSet={`https://cdn.pixabay.com/photo/2012/04/18/00/07/silhouette-of-a-man-36181_1280.png`}
          alt="New Character"
          loading="lazy"
        />
        <ImageListItemBar
          title="New Character"
          subtitle="Default Template"
          sx={{paddingLeft:"5px"}}
          actionIcon={
            <IconButton
              aria-label={`Add a new character`}
              onClick={props.createCharacter}
            >
              <AddCircleIcon />
            </IconButton>
          }
          position="below"
        />
      </ImageListItem>
    </ImageList>
  );
}