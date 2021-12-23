import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import icon from '../../assets/icon.svg';
import './App.css';

class IncrementButton extends React.Component {
  sendTestMessage() {
    console.log("test")
  }

  render() {
    return <button type="button" id="file-test" onClick={this.sendTestMessage} >
      <span role="img" aria-label="books">
        📚
      </span>
      Read our docs
    </button>
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
