import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { CampaignSelector } from './components/CampaignSelector';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing: () => void;
      }
    }
  }
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={CampaignSelector} />
      </Switch>
    </Router>
  );
}