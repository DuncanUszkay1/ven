import React from 'react';
import { Box } from '@mui/system';
import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';


export class Config extends React.Component<
  {
    updateTabletopDir: (dir: string) => void
  },
  {
    tabletopDir: string | null,
    errorMessage: string | null
  }
> {
  state = { tabletopDir: null, errorMessage: null }

  updateTabletopDir(event: any) {
    this.setState({ tabletopDir: event.target.value })
  }

  confirmSettings() {
    if(this.state.tabletopDir === null || this.state.tabletopDir === "") {
      this.setState({ errorMessage: "Tabletop Directory must be set." })
    } else {
      this.props.updateTabletopDir(this.state.tabletopDir);
    }
  }

  closeSnackbar() {
    this.setState({ errorMessage: null })
  }

  render() {
    return <Box sx={{justifyContent: 'center'}}> 
      <Box sx={{
        width: "566px",
        textAlign: 'center',
        margin: "0 auto",
        pt: '20%',
        justifyContent: 'center'
      }}>
        <Typography variant="h1" component="div" gutterBottom>
          Configuration
        </Typography>
        <TextField
          fullWidth
          id="outlined-required"
          label="Tabletop Saved Object Directory"
          sx={{ marginBottom: "30px" }}
          onChange={this.updateTabletopDir.bind(this)}
        />
        <Button onClick={this.confirmSettings.bind(this)} variant="contained">Confirm</Button>
        <Snackbar open={this.state.errorMessage !== null} autoHideDuration={6000} onClose={this.closeSnackbar.bind(this)}>
          <Alert onClose={this.closeSnackbar.bind(this)} severity="error" sx={{ width: '100%' }}>
            {this.state.errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  }
}
