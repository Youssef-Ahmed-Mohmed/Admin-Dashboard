import { Box, Card, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { mockTransactions } from '../../data/mockData';

const metrics = [
  { label: 'Total revenue', value: '$48,294', change: '+12.8%', Icon: PaidOutlinedIcon, color: 'primary' },
  { label: 'Active customers', value: '2,840', change: '+8.2%', Icon: GroupsOutlinedIcon, color: 'info' },
  { label: 'Orders processed', value: '1,248', change: '+4.6%', Icon: ShoppingBagOutlinedIcon, color: 'success' },
  { label: 'Tasks completed', value: '86.4%', change: '+2.1%', Icon: TaskAltOutlinedIcon, color: 'warning' },
];

const revenue = [28, 34, 31, 45, 41, 52, 47, 62, 58, 69, 64, 78];
const revenuePath = revenue.map((value, index) => {
  const x = 24 + (index * 852) / (revenue.length - 1);
  const y = 188 - (value / 85) * 158;
  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
}).join(' ');
const areaPath = `${revenuePath} L 876 202 L 24 202 Z`;

const Dashboard = () => {
  const theme = useTheme();
  const palette = theme.palette;
  const categoryData = [
    { name: 'Subscriptions', amount: 42, color: palette.primary.main },
    { name: 'Services', amount: 28, color: palette.info.main },
    { name: 'Products', amount: 18, color: palette.success.main },
    { name: 'Other', amount: 12, color: palette.warning.main },
  ];
  const total = categoryData.reduce((sum, item) => sum + item.amount, 0);
  let runningTotal = 0;
  const donut = categoryData.map((item) => {
    const start = runningTotal;
    runningTotal += item.amount;
    return `${item.color} ${start}% ${runningTotal}%`;
  }).join(', ');

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" spacing={1} sx={{ mb: 2.5 }}>
        <Box>
          <Typography variant="h4" fontWeight={750}>Overview</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Here’s what’s happening across your workspace today.</Typography>
        </Box>
        <Chip icon={<TrendingUpRoundedIcon />} label="Live overview" color="success" variant="outlined" size="small" />
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' }, gap: { xs: 1, sm: 1.5 }, mb: 2 }}>
        {metrics.map(({ label, value, change, Icon, color }) => (
          <Card key={label} variant="outlined" sx={{ borderColor: palette.divider, borderRadius: 2, backgroundImage: 'none' }}>
            <Box sx={{ p: { xs: 1.5, md: 2 }, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">{label}</Typography>
                <Typography variant="h4" fontWeight={750} sx={{ mt: 1 }}>{value}</Typography>
                <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mt: 0.75 }}>
                  <TrendingUpRoundedIcon sx={{ fontSize: 14 }} /> {change} <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>vs last month</Box>
                </Typography>
              </Box>
              <Box sx={{ width: 38, height: 38, display: 'grid', placeItems: 'center', flexShrink: 0, borderRadius: 1.5, color: `${color}.main`, bgcolor: `${color}.main`, backgroundColor: `${palette[color].main}18` }}>
                <Icon fontSize="small" />
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.7fr) minmax(300px, 1fr)' }, gap: 1.5, mb: 2 }}>
        <Card variant="outlined" sx={{ borderColor: palette.divider, borderRadius: 2, backgroundImage: 'none', p: { xs: 1.5, md: 2 } }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Box>
              <Typography variant="h6" fontWeight={700}>Revenue overview</Typography>
              <Typography variant="caption" color="text.secondary">Monthly performance · Jan–Dec</Typography>
            </Box>
            <Chip label="This year" size="small" variant="outlined" />
          </Stack>
          <Box sx={{ height: { xs: 190, sm: 235 }, mt: 1.5 }}>
            <svg viewBox="0 0 900 225" width="100%" height="100%" preserveAspectRatio="none" role="img" aria-label="Revenue increased steadily through the year">
              <defs>
                <linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={palette.primary.main} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={palette.primary.main} stopOpacity="0" />
                </linearGradient>
              </defs>
              {[30, 70, 110, 150, 190].map((y) => <line key={y} x1="24" x2="876" y1={y} y2={y} stroke={palette.divider} strokeDasharray="4 6" />)}
              <path d={areaPath} fill="url(#revenue-fill)" />
              <path d={revenuePath} fill="none" stroke={palette.primary.main} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {revenue.map((value, index) => {
                const x = 24 + (index * 852) / (revenue.length - 1);
                const y = 188 - (value / 85) * 158;
                return <circle key={index} cx={x} cy={y} r="3.5" fill={palette.background.paper} stroke={palette.primary.main} strokeWidth="2.5" />;
              })}
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <text key={month} x={24 + (index * 852) / 11} y="219" textAnchor="middle" fill={palette.text.secondary} fontSize="11">{month}</text>
              ))}
            </svg>
          </Box>
        </Card>

        <Card variant="outlined" sx={{ borderColor: palette.divider, borderRadius: 2, backgroundImage: 'none', p: { xs: 1.5, md: 2 } }}>
          <Typography variant="h6" fontWeight={700}>Revenue by source</Typography>
          <Typography variant="caption" color="text.secondary">Current month distribution</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <Box sx={{ width: 170, height: 170, borderRadius: '50%', background: `conic-gradient(${donut})`, display: 'grid', placeItems: 'center' }}>
              <Box sx={{ width: 106, height: 106, borderRadius: '50%', bgcolor: 'background.paper', display: 'grid', placeItems: 'center', alignContent: 'center' }}>
                <Typography variant="h5" fontWeight={750}>{total}%</Typography>
                <Typography variant="caption" color="text.secondary">total revenue</Typography>
              </Box>
            </Box>
          </Box>
          <Stack spacing={1}>
            {categoryData.map((item) => (
              <Stack key={item.name} direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                  <Typography variant="body2">{item.name}</Typography>
                </Stack>
                <Typography variant="body2" fontWeight={650}>{item.amount}%</Typography>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Box>

      <Card variant="outlined" sx={{ borderColor: palette.divider, borderRadius: 2, overflow: 'hidden', backgroundImage: 'none' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={700}>Recent transactions</Typography>
            <Typography variant="caption" color="text.secondary">Latest activity in your workspace</Typography>
          </Box>
          <Chip label="View invoices" component={Link} to="/invoices" clickable variant="outlined" size="small" />
        </Stack>
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ minWidth: 620 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 0.8fr', px: 2, py: 1.25, bgcolor: 'action.hover' }}>
              {['CUSTOMER', 'REFERENCE', 'DATE', 'AMOUNT'].map((label) => <Typography key={label} variant="caption" fontWeight={700} color="text.secondary" letterSpacing={0.6}>{label}</Typography>)}
            </Box>
            {mockTransactions.slice(0, 5).map((transaction, index) => (
              <Box key={`${transaction.txId}-${index}`} sx={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr 0.8fr', px: 2, py: 1.5, borderTop: `1px solid ${palette.divider}` }}>
                <Typography variant="body2" fontWeight={600}>{transaction.user}</Typography>
                <Typography variant="body2" color="text.secondary">{transaction.txId.toUpperCase()}</Typography>
                <Typography variant="body2" color="text.secondary">{transaction.date}</Typography>
                <Typography variant="body2" fontWeight={650} color="success.main">+${transaction.cost}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5} sx={{ mt: 2, color: 'text.secondary' }}>
        <Typography variant="caption">Workspace health: all systems operational</Typography>
        <ArrowOutwardRoundedIcon sx={{ fontSize: 14 }} />
      </Stack>
    </Box>
  );
};

export default Dashboard;
