import React from 'react';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { Background } from "../App";
import DeleteIcon from '@mui/icons-material/Delete';

export class BackgroundEditor extends React.Component<{ backgrounds: Background[], deleteBackground: (background: Background) => void }> {
  constructor(props: { backgrounds: Background[] }) {
    super(props);

    this.deleteBackground = this.deleteBackground.bind(this);
  }

  deleteBackground(background: Background) {
    // this.setState({selectedBackground: background});
  }

  render() {
    return <ImageList sx={{ width: "100%", gridTemplateColumns: "repeat(auto-fill, 200px) !important", paddingLeft: "24px" }}>
      {this.props.backgrounds.map((item) => (
        <ImageListItem key={item.name} sx={{border: "1px solid grey"}}>
          <img
            src={`${item.img}?w=248&h=372&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&&h=372&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            sx={{paddingLeft:"5px"}}
            actionIcon={
              <IconButton
                aria-label={`info about ${item.name}`}
                onClick={() => { this.props.deleteBackground(item)}}
              >
                <DeleteIcon  />
              </IconButton>
            }
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  }
}