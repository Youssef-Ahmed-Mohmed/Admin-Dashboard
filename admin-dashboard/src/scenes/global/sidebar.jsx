import { useState } from 'react';
import { Avatar, Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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

const Sidebar = ({ mobileOpen = false, onMobileClose = () => {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const colors = theme.palette;
  const isCollapsed = !isMobile && collapsed;

  return (
    <>
      {isMobile && mobileOpen && (
        <Box
          aria-hidden="true"
          onClick={onMobileClose}
          sx={{ position: 'fixed', inset: 0, zIndex: 1299, bgcolor: 'rgba(2, 6, 23, 0.58)' }}
        />
      )}
      <Box
        component="aside"
        aria-label="Main navigation"
        sx={{
          position: isMobile ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          zIndex: isMobile ? 1300 : 'auto',
          width: isMobile ? 270 : isCollapsed ? 68 : 220,
          minWidth: isMobile ? 270 : isCollapsed ? 68 : 220,
          height: '100dvh',
          overflowY: 'auto',
          flexShrink: 0,
          boxSizing: 'border-box',
          backgroundColor: colors.background.paper,
          borderRight: `1px solid ${colors.divider}`,
          boxShadow: isMobile && mobileOpen ? theme.shadows[12] : 'none',
          transform: isMobile && !mobileOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 220ms ease, width 220ms ease, min-width 220ms ease',
          visibility: isMobile && !mobileOpen ? 'hidden' : 'visible',
        }}
      >
      <Box sx={{ height: 64, px: isCollapsed ? 1 : 1.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Box component="img" src="/brand-mark.svg" alt="Adminbox" sx={{ width: 34, height: 34, flexShrink: 0, borderRadius: 1 }} />
          {!isCollapsed && (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={800} letterSpacing={0.5} lineHeight={1.1}>ADMINBOX</Typography>
              <Typography variant="caption" color="text.secondary" lineHeight={1.1}>ADMIN WORKSPACE</Typography>
            </Box>
          )}
        </Box>
        <IconButton size="small" aria-label={isMobile ? 'Close navigation' : isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={isMobile ? onMobileClose : () => setCollapsed((value) => !value)}>
          {isMobile ? <CloseRoundedIcon fontSize="small" /> : <MenuOutlinedIcon fontSize="small" />}
        </IconButton>
      </Box>

      {!isCollapsed && (
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

      <Box component="nav" sx={{ px: 0.5, pb: 1 }}>
        {links.map(([title, to, Icon]) => {
          const active = location.pathname === to;
          return (
            <Box
              key={to}
              component={Link}
              to={to}
              onClick={isMobile ? onMobileClose : undefined}
              title={isCollapsed ? title : undefined}
              sx={{
                height: 34,
                mx: 0.5,
                my: '1px',
                px: isCollapsed ? 0 : 1.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: 1.25,
                borderRadius: 1,
                textDecoration: 'none',
                color: active ? colors.info.main : colors.text.primary,
                backgroundColor: active ? `${colors.primary.main}20` : 'transparent',
                '&:hover': { backgroundColor: colors.action.hover },
              }}
            >
              <Icon sx={{ fontSize: 17, flexShrink: 0 }} />
              {!isCollapsed && <Typography variant="caption" fontWeight={500} noWrap>{title}</Typography>}
            </Box>
          );
        })}
      </Box>
      </Box>
    </>
  );
};

export default Sidebar;
