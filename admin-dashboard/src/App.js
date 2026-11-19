import { lazy, Suspense, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/sidebar';

const Dashboard = lazy(() => import('./scenes/dashboard'));
const Team = lazy(() => import('./scenes/team'));
const ProfileForm = lazy(() => import('./scenes/form'));
const Contacts = lazy(() => import('./scenes/contacts'));
const Invoices = lazy(() => import('./scenes/invoices'));
const BarChartPage = lazy(() => import('./scenes/bar'));
const LineChartPage = lazy(() => import('./scenes/line'));
const PieChartPage = lazy(() => import('./scenes/pie'));
const FAQ = lazy(() => import('./scenes/faq'));
const Geography = lazy(() => import('./scenes/geography'));
const Calendar = lazy(() => import('./scenes/calendar'));

function App() {
  const [theme, colorMode] = useMode();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />
          <main className="content">
            <Topbar onMenuClick={() => setMobileNavOpen(true)} />
            <Suspense fallback={<Box sx={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}><CircularProgress size={28} /></Box>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/form" element={<ProfileForm />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/bar" element={<BarChartPage />} />
                <Route path="/line" element={<LineChartPage />} />
                <Route path="/pie" element={<PieChartPage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </Suspense>
            <Box component="footer" sx={{ mt: 'auto', px: { xs: 2, md: 3 }, py: 2, borderTop: (currentTheme) => `1px solid ${currentTheme.palette.divider}`, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" letterSpacing={0.5}>YOUUSEF 2026</Typography>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
