import React from 'react';
import { Button, Stack } from '@mui/material';


export class Overview extends React.Component<
  {
    tabletopImport: () => void,
    saveCampaign: () => void
  },
  {}
> {
  render() {
    return <Stack sx={{alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "600px", marginLeft: "10px", marginRight: "10px", marginTop: "30px"}}>
      <Button variant="contained" onClick={this.props.tabletopImport} sx={{marginBottom: "10px"}}>Tabletop Simulator Import</Button> 
      <Button variant="contained" onClick={this.props.saveCampaign}>Save to Disk</Button> 
    </Stack>
  }
}
