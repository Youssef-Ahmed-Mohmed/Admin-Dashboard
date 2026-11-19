import { ColorModeContext, useMode } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import ProfileForm from './scenes/form';
import ScenePage from './scenes/ScenePage';

const pages = [
  ['invoices', 'Invoices'],
  ['contacts', 'Contacts'],
  ['bar', 'Bar Chart'],
  ['line', 'Line Chart'],
  ['pie', 'Pie Chart'],
  ['faq', 'FAQ'],
  ['geography', 'Geography'],
  ['calendar', 'Calendar'],
];

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<ProfileForm />} />
              {pages.map(([path, title]) => (
                <Route key={path} path={`/${path}`} element={<ScenePage title={title} />} />
              ))}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
