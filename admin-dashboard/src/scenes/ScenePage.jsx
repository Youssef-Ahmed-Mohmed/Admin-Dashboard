import { Box, Typography, useTheme } from '@mui/material';

const ScenePage = ({ title }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight={700}>
        {title}
      </Typography>
      <Typography color={theme.palette.text.secondary} sx={{ mt: 1 }}>
        {title} page
      </Typography>
    </Box>
  );
};

export default ScenePage;
