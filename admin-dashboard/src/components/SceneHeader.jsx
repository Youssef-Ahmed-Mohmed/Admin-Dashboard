import { Box, Stack, Typography } from '@mui/material';

const SceneHeader = ({ title, subtitle, action }) => (
  <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={1.5} sx={{ mb: 2.5 }}>
    <Box>
      <Typography variant="h4" fontWeight={750}>{title}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>}
    </Box>
    {action}
  </Stack>
);

export default SceneHeader;
