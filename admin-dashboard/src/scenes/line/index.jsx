import { Box, Card, Chip, Stack, Typography, useTheme } from '@mui/material';
import SceneHeader from '../../components/SceneHeader';
import { mockLineData } from '../../data/mockData';

const chartWidth = 920;
const chartHeight = 360;
const margins = { left: 54, right: 20, top: 22, bottom: 42 };
const chartColors = ['#818cf8', '#38bdf8', '#4ade80'];
const seriesNames = ['Direct', 'Search', 'Referral'];

const LineChartPage = () => {
  const theme = useTheme();
  const pointsFor = (series) => series.data.map((point, index) => {
    const x = margins.left + (index / (series.data.length - 1)) * (chartWidth - margins.left - margins.right);
    const y = margins.top + (1 - point.y / 320) * (chartHeight - margins.top - margins.bottom);
    return { x, y };
  });
  const paths = mockLineData.map((series) => pointsFor(series).map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' '));
  const chartLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <SceneHeader title="Traffic trends" subtitle="Compare how visitors find and engage with your workspace." action={<Chip label="Last 12 weeks" size="small" variant="outlined" />} />
      <Card variant="outlined" sx={{ p: { xs: 1.5, md: 2.5 }, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1}>
          <Box><Typography variant="h6" fontWeight={700}>Visitors by channel</Typography><Typography variant="caption" color="text.secondary">Weekly sessions · indexed activity</Typography></Box>
          <Stack direction="row" spacing={1.5}>
            {seriesNames.map((name, index) => <Stack key={name} direction="row" alignItems="center" spacing={0.75}><Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: chartColors[index] }} /><Typography variant="caption">{name}</Typography></Stack>)}
          </Stack>
        </Stack>
        <Box sx={{ width: '100%', height: { xs: 330, md: 440 }, mt: 2 }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%" preserveAspectRatio="none" role="img" aria-label="Weekly visitors by channel line chart">
            {[0, 80, 160, 240, 320].map((value) => {
              const y = margins.top + (1 - value / 320) * (chartHeight - margins.top - margins.bottom);
              return <g key={value}><line x1={margins.left} x2={chartWidth - margins.right} y1={y} y2={y} stroke={theme.palette.divider} strokeDasharray="4 6" /><text x={margins.left - 12} y={y + 4} textAnchor="end" fill={theme.palette.text.secondary} fontSize="11">{value}</text></g>;
            })}
            {chartLabels.map((label, index) => {
              const x = margins.left + (index / 11) * (chartWidth - margins.left - margins.right);
              return <text key={label} x={x} y={chartHeight - 8} textAnchor="middle" fill={theme.palette.text.secondary} fontSize="10">{label}</text>;
            })}
            {paths.map((path, index) => <path key={seriesNames[index]} d={path} fill="none" stroke={chartColors[index]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />)}
            {mockLineData.map((series, seriesIndex) => pointsFor(series).map((point, pointIndex) => <circle key={`${seriesIndex}-${pointIndex}`} cx={point.x} cy={point.y} r="3" fill={theme.palette.background.paper} stroke={chartColors[seriesIndex]} strokeWidth="2" />))}
          </svg>
        </Box>
      </Card>
    </Box>
  );
};

export default LineChartPage;
