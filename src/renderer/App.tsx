import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import icon from '../../assets/icon.svg';
import Button from '@mui/material/Button';
import './App.css';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing: () => void;
      }
    }
  }
}

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

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Tabletop Simulator RPG Builder</h1>
      <div className="Hello" >
        <IncrementButton />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
