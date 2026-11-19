import { Box, Card, Stack, Typography, useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import SceneHeader from '../../components/SceneHeader';
import { mockBarData } from '../../data/mockData';

const BarChartPage = () => {
  const theme = useTheme();
  const chartData = mockBarData.map((row) => ({
    ...row,
    region: ({ AD: 'Andorra', AE: 'UAE', AF: 'Afghanistan', AG: 'Antigua', AI: 'Anguilla', AL: 'Albania', AM: 'Armenia' })[row.country] || row.country,
  }));
  const chartTheme = {
    text: { fill: theme.palette.text.secondary, fontSize: 11 },
    axis: {
      ticks: { text: { fill: theme.palette.text.secondary } },
      legend: { text: { fill: theme.palette.text.primary } }
    },
    grid: { line: { stroke: theme.palette.divider, strokeDasharray: '4 4' } },
    legends: { text: { fill: theme.palette.text.secondary } },
    tooltip: {
      container: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary
      }
    },
  };

  const totals = chartData.reduce((result, row) => {
    ['hot dog', 'burger', 'kebab', 'donut'].forEach((key) => {
      result[key] = (result[key] || 0) + row[key];
    });
    return result;
  }, {});

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <SceneHeader title="Performance by market"
        subtitle="Compare product activity across key markets." />

      <Box sx={{
        display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', lg: 'repeat(4, 1fr)' },
        gap: 1.5, mb: 2
      }}>

        {Object.entries(totals).map(([key, value]) => (
          <Card key={key} variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none' }}>
            <Typography variant="body2" color="text.secondary"
              sx={{ textTransform: 'capitalize' }}>
              {key}
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 0.75 }}>
              {value.toLocaleString()}
            </Typography>
          </Card>
        ))}
      </Box>
      <Card variant="outlined" sx={{ p: { xs: 1, md: 2 }, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ px: 1, pt: 1 }}>
          <Box><Typography variant="h6" fontWeight={700}>Product volume by market</Typography><Typography variant="caption" color="text.secondary">Sample units by product category</Typography></Box>
        </Stack>
        <Box sx={{ height: { xs: 360, md: 490 }, mt: 1 }}>
          <ResponsiveBar
            data={chartData}
            keys={['hot dog', 'burger', 'kebab', 'donut']}
            indexBy="region"
            margin={{ top: 20, right: 24, bottom: 68, left: 55 }}
            padding={0.28}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={[theme.palette.primary.main,
            theme.palette.info.main, theme.palette.success.main, theme.palette.warning.main]}

            borderRadius={4}
            enableLabel={false}
            theme={chartTheme}
            axisTop={null}
            axisRight={null}
            axisBottom={{ tickSize: 0, tickPadding: 12, tickRotation: -15 }}
            axisLeft={{
              tickSize: 0, tickPadding: 10, legend: 'Units',
              legendPosition: 'middle', legendOffset: -42
            }}

            enableGridX={false}
            legends={[{
              dataFrom: 'keys', anchor: 'bottom', direction: 'row',
              justify: false, translateY: 58, itemWidth: 100, itemHeight: 18, itemsSpacing: 10, symbolSize: 9, itemDirection: 'left-to-right'
            }]}

            role="application"
            ariaLabel="Product volume by market"
          />
        </Box>
      </Card>
    </Box>
  );
};

export default BarChartPage;
