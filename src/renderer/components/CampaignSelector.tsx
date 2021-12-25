import React from 'react';
import icon from '../../../assets/icon.svg';
import Button from '@mui/material/Button';

export class CampaignSelector extends React.Component<{}, {}> {
  render() {
    return <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Tabletop Simulator RPG Builder</h1>
      <div className="Hello" >
        <IncrementButton />
      </div>
    </div>
  }
};

// Temp component for testing purposes
type IncrementState = {
  counter: number;
}
class IncrementButton extends React.Component<{}, IncrementState> {
  state = { counter: 1 };

  sendTestMessage() {
    window.electron.ipcRenderer.myPing();

    this.setState((state) => ({
      counter: state.counter + 1
    }));
  }

  render() {
    return <div>
        <Button variant="contained" id="file-test" onClick={() => { this.sendTestMessage() } } >
          Read our {this.state.counter} docs
        </Button>
      </div>
  }
}

