import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export class Sidebar extends React.Component<{ updatePanel: (newValue: number) => void }, {value: number}> {
  state = { value: 0 }

  handleChange(event: any, newValue: number) {
    this.props.updatePanel(newValue);
    this.setState({ value: newValue });
  }

  render() {
    return (
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: "132px" }}
      >
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Characters" {...a11yProps(1)} />
        <Tab label="Items" {...a11yProps(2)} />
        <Tab label="Maps" {...a11yProps(3)} />
      </Tabs>
    );
  }
}