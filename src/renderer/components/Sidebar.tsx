import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export function Sidebar(props: { updatePanel: (newValue: number) => void }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.updatePanel(newValue);
    setValue(newValue);
  };

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      sx={{ borderRight: 1, borderColor: 'divider', minWidth: "132px" }}
    >
      <Tab label="Overview" {...a11yProps(0)} />
      <Tab label="Characters" {...a11yProps(1)} />
      <Tab label="Items" {...a11yProps(2)} />
      <Tab label="Maps" {...a11yProps(3)} />
      <Tab label="Files" {...a11yProps(4)} />
    </Tabs>
  );
}