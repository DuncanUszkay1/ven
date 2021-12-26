import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{width: "100%"}}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "100%", padding: "0px 0px 0px 0px"}}>
          {children}
        </Box>
      )}
    </div>
  );
}
