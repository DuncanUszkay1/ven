import ImageList from '@mui/material/ImageList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { Item } from 'model/Campaign';

export default function ItemExplorer(props: {
  editItem: (campaign: Item) => void,
  createItem: () => void,
  items: Item[]
}) {
  const subtitle = (item: Item) => {
    if(item.dmNotes.length > 0) {
      return item.dmNotes  
    }
    return "No DM Notes"
  }
  return (
    <ImageList sx={{ width: "100%", gridTemplateColumns: "repeat(auto-fill, 200px) !important", paddingLeft: "24px" }}>
      {props.items.map((item) => (
        <ImageListItem key={item.uuid} sx={{border: "1px solid grey"}}>
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
                onClick={() => { props.editItem(item)}}
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
          src={`https://www.pngitem.com/pimgs/m/88-887112_wrench-png-templates-silhouettes-wrench-clip-art-free.png`}
          srcSet={`https://www.pngitem.com/pimgs/m/88-887112_wrench-png-templates-silhouettes-wrench-clip-art-free.png`}
          alt="New Item"
          loading="lazy"
        />
        <ImageListItemBar
          title="New Item"
          subtitle="Default Template"
          sx={{paddingLeft:"5px"}}
          actionIcon={
            <IconButton
              aria-label={`Add a new item`}
              onClick={props.createItem}
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