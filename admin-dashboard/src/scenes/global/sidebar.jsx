import { useState } from 'react';
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const links = [
  ['Dashboard', '/', HomeOutlinedIcon],
  ['Manage Team', '/team', PeopleOutlinedIcon],
  ['Contacts Information', '/contacts', ContactsOutlinedIcon],
  ['Invoices Balances', '/invoices', ReceiptOutlinedIcon],
  ['Profile Form', '/form', PersonOutlinedIcon],
  ['Calendar', '/calendar', CalendarTodayOutlinedIcon],
  ['FAQ Page', '/faq', HelpOutlinedIcon],
  ['Bar Chart', '/bar', BarChartOutlinedIcon],
  ['Pie Chart', '/pie', PieChartOutlineOutlinedIcon],
  ['Line Chart', '/line', TimelineOutlinedIcon],
  ['Geography Chart', '/geography', MapOutlinedIcon],
];

const Sidebar = () => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const colors = theme.palette;

  return (
    <Box
      component="aside"
      sx={{
        width: collapsed ? 68 : 220,
        minWidth: collapsed ? 68 : 220,
        height: '100vh',
        overflowY: 'auto',
        flexShrink: 0,
        boxSizing: 'border-box',
        backgroundColor: colors.background.paper,
        borderRight: `1px solid ${colors.divider}`,
        transition: 'width 220ms ease, min-width 220ms ease',
      }}
    >
      <Box sx={{ height: 64, px: collapsed ? 1 : 1.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Box component="img" src="/brand-mark.svg" alt="Adminbox" sx={{ width: 34, height: 34, flexShrink: 0, borderRadius: 1 }} />
          {!collapsed && (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={800} letterSpacing={0.5} lineHeight={1.1}>ADMINBOX</Typography>
              <Typography variant="caption" color="text.secondary" lineHeight={1.1}>ADMIN WORKSPACE</Typography>
            </Box>
          )}
        </Box>
        <IconButton size="small" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed((value) => !value)}>
          <MenuOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>

      {!collapsed && (
        <Box sx={{ textAlign: 'center', px: 2, pt: 1, pb: 1.75 }}>
          <Avatar
            src="/assets/WhatsApp%20Image%202026-11-19%20at%207.32.45%20PM.jpeg"
            alt="Youssef"
            sx={{ width: 60, height: 60, mx: 'auto', mb: 0.75, border: `2px solid ${colors.background.default}` }}
          />
          <Typography variant="h6" fontWeight={700}>Youssef</Typography>
          <Typography variant="caption" sx={{ color: colors.info.main, fontWeight: 600 }}>Admin</Typography>
        </Box>
      )}

      <Box component="nav" aria-label="Main navigation" sx={{ px: 0.5, pb: 1 }}>
        {links.map(([title, to, Icon]) => {
          const active = location.pathname === to;
          return (
            <Box
              key={to}
              component={Link}
              to={to}
              title={collapsed ? title : undefined}
              sx={{
                height: 34,
                mx: 0.5,
                my: '1px',
                px: collapsed ? 0 : 1.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: 1.25,
                borderRadius: 1,
                textDecoration: 'none',
                color: active ? colors.info.main : colors.text.primary,
                backgroundColor: active ? `${colors.primary.main}20` : 'transparent',
                '&:hover': { backgroundColor: colors.action.hover },
              }}
            >
              <Icon sx={{ fontSize: 17, flexShrink: 0 }} />
              {!collapsed && <Typography variant="caption" fontWeight={500} noWrap>{title}</Typography>}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
