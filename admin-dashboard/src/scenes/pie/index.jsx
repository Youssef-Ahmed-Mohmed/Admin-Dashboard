import { Box, Card, Stack, Typography, useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import SceneHeader from '../../components/SceneHeader';
import { mockPieData } from '../../data/mockData';

const PieChartPage = () => {
  const theme = useTheme();
  const colors = [theme.palette.primary.main, theme.palette.info.main, theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main];
  const data = mockPieData.map((item, index) => ({ ...item, label: ({ hack: 'Engineering', make: 'Operations', go: 'Sales', lisp: 'Support', scala: 'Product' })[item.id] || item.label, color: colors[index % colors.length] }));
  const chartTheme = {
    text: { fill: theme.palette.text.secondary, fontSize: 11 },
    legends: { text: { fill: theme.palette.text.secondary } },
    tooltip: { container: { background: theme.palette.background.paper, color: theme.palette.text.primary } },
  };
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: 'auto' }}>
      <SceneHeader title="Team distribution" subtitle="Explore how work is distributed across departments." />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.4fr) minmax(280px, 0.8fr)' }, gap: 1.5 }}>
        <Card variant="outlined" sx={{ p: { xs: 1, md: 2 }, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none' }}>
          <Typography variant="h6" fontWeight={700} sx={{ px: 1, pt: 1 }}>Department allocation</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>Share of team activity</Typography>
          <Box sx={{ height: 430 }}>
            <ResponsivePie
              data={data}
              margin={{ top: 26, right: 50, bottom: 70, left: 50 }}
              innerRadius={0.62}
              padAngle={2}
              cornerRadius={5}
              activeOuterRadiusOffset={8}
              colors={{ datum: 'data.color' }}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              arcLinkLabelsSkipAngle={12}
              arcLinkLabelsTextColor={theme.palette.text.secondary}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={16}
              arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
              theme={chartTheme}
              legends={[]}
              role="application"
              ariaLabel="Department allocation"
            />
          </Box>
        </Card>
        <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none' }}>
          <Typography variant="h6" fontWeight={700}>Allocation details</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>A breakdown of tracked work by department.</Typography>
          <Stack spacing={2}>
            {data.map((item) => (
              <Box key={item.id}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.75 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: item.color }} />
                    <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={700}>{Math.round((item.value / total) * 100)}%</Typography>
                </Stack>
                <Box sx={{ height: 6, borderRadius: 10, bgcolor: 'action.hover', overflow: 'hidden' }}>
                  <Box sx={{ height: '100%', width: `${(item.value / total) * 100}%`, bgcolor: item.color, borderRadius: 10 }} />
                </Box>
              </Box>
            ))}
          </Stack>
          <Box sx={{ mt: 3, p: 1.5, borderRadius: 1.5, bgcolor: 'action.hover' }}>
            <Typography variant="caption" color="text.secondary">Tracked work units</Typography>
            <Typography variant="h5" fontWeight={750} sx={{ mt: 0.5 }}>{total.toLocaleString()}</Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default PieChartPage;
