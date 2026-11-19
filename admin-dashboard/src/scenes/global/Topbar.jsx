import { Box, IconButton, InputBase, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      component="header"
      sx={{
        height: 56,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        component="label"
        sx={{
          width: 220,
          height: 30,
          px: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <InputBase placeholder="Search" inputProps={{ 'aria-label': 'Search' }} sx={{ flex: 1, fontSize: 12 }} />
        <SearchIcon sx={{ fontSize: 17, color: theme.palette.text.secondary }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        <IconButton size="small" aria-label="Toggle color mode" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon fontSize="small" /> : <LightModeOutlinedIcon fontSize="small" />}
        </IconButton>
        <IconButton size="small" aria-label="Notifications"><NotificationsOutlinedIcon fontSize="small" /></IconButton>
        <IconButton size="small" aria-label="Settings"><SettingsOutlinedIcon fontSize="small" /></IconButton>
        <IconButton size="small" aria-label="Account"><PersonOutlinedIcon fontSize="small" /></IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
