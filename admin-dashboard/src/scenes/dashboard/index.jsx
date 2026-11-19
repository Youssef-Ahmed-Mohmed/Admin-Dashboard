import { Box, Typography, useTheme } from '@mui/material';

const Dashboard = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700}>Dashboard</Typography>
      <Typography color={theme.palette.text.secondary} sx={{ mt: 1 }}>
        Welcome to your admin dashboard.
      </Typography>
    </Box>
  );
};

export default Dashboard;
