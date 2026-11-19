import { Avatar, Box, Button, Divider, IconButton, InputBase, Popover, Stack, Typography, useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Topbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [accountAnchor, setAccountAnchor] = useState(null);
  const pages = [
    ['dashboard', '/'], ['team', '/team'], ['contacts', '/contacts'],
    ['invoices', '/invoices'], ['calendar', '/calendar'], ['profile', '/form'],
    ['bar chart', '/bar'], ['line chart', '/line'], ['pie chart', '/pie'],
    ['geography', '/geography'], ['help', '/faq'],
  ];
  const handleSearch = (event) => {
    event.preventDefault();
    if (!search.trim()) return;
    const query = search.trim().toLowerCase();
    const match = pages.find(([label]) => label.includes(query) || query.includes(label));
    if (match) {
      navigate(match[1]);
      setSearch('');
    }
  };

  return (
    <Box
      component="header"
      sx={{
        height: 56,
        flexShrink: 0,
        px: { xs: 0.75, sm: 1.5, md: 2 },
        gap: { xs: 0.5, sm: 1 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <IconButton size="small" aria-label="Open navigation" onClick={onMenuClick} sx={{ display: { xs: 'inline-flex', md: 'none' }, flexShrink: 0 }}>
        <MenuOutlinedIcon fontSize="small" />
      </IconButton>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          width: { xs: '34vw', sm: 220, md: 260 },
          minWidth: 0,
          flexShrink: 1,
          height: 30,
          px: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <InputBase placeholder="Search pages" value={search} onChange={(event) => setSearch(event.target.value)} inputProps={{ 'aria-label': 'Search pages' }} sx={{ flex: 1, fontSize: 12 }} />
        <IconButton type="submit" size="small" aria-label="Search"><SearchIcon sx={{ fontSize: 17 }} /></IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.25 }, flexShrink: 0 }}>
        <IconButton size="small" aria-label="Toggle color mode" onClick={colorMode.toggleColorMode} sx={{ p: { xs: 0.65, sm: 1 } }}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon fontSize="small" /> : <LightModeOutlinedIcon fontSize="small" />}
        </IconButton>
        <IconButton size="small" aria-label="Notifications" onClick={(event) => setNotificationAnchor(event.currentTarget)} sx={{ p: { xs: 0.65, sm: 1 } }}><NotificationsOutlinedIcon fontSize="small" /></IconButton>
        <IconButton size="small" aria-label="Profile settings" onClick={() => navigate('/form')} sx={{ p: { xs: 0.65, sm: 1 } }}><SettingsOutlinedIcon fontSize="small" /></IconButton>
        <IconButton size="small" aria-label="Account menu" onClick={(event) => setAccountAnchor(event.currentTarget)} sx={{ p: { xs: 0.65, sm: 1 } }}><PersonOutlinedIcon fontSize="small" /></IconButton>
      </Box>
      <Popover
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={() => setNotificationAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>Notifications</Typography>
          <Stack spacing={1.25} divider={<Divider flexItem />} sx={{ mt: 1.5 }}>
            <Box><Typography variant="body2" fontWeight={600}>Workspace is ready</Typography><Typography variant="caption" color="text.secondary">Your dashboard summary has been refreshed.</Typography></Box>
            <Box><Typography variant="body2" fontWeight={600}>Review team access</Typography><Typography variant="caption" color="text.secondary">Check that each member has the right role.</Typography></Box>
          </Stack>
        </Box>
      </Popover>
      <Popover
        open={Boolean(accountAnchor)}
        anchorEl={accountAnchor}
        onClose={() => setAccountAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 1.5 }}>
            <Avatar src="/assets/WhatsApp%20Image%202026-11-19%20at%207.32.45%20PM.jpeg" alt="Youssef" sx={{ width: 40, height: 40 }} />
            <Box><Typography variant="body2" fontWeight={700}>Youssef</Typography><Typography variant="caption" color="text.secondary">Admin</Typography></Box>
          </Stack>
          <Divider sx={{ mb: 1.25 }} />
          <Button fullWidth onClick={() => { setAccountAnchor(null); navigate('/form'); }} sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>Profile settings</Button>
          <Button fullWidth onClick={() => { setAccountAnchor(null); navigate('/team'); }} sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>Manage team</Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default Topbar;
