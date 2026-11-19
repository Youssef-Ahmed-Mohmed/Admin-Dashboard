import { useMemo, useState } from 'react';
import { Box, Button, Card, Chip, IconButton, Stack, Typography, useTheme } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SceneHeader from '../../components/SceneHeader';

const eventTemplates = [
  { day: 3, title: 'Weekly planning', color: 'primary' },
  { day: 7, title: 'Design review', color: 'info' },
  { day: 12, title: 'Team check-in', color: 'success' },
  { day: 18, title: 'Product demo', color: 'warning' },
  { day: 24, title: 'Monthly review', color: 'primary' },
];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
  const theme = useTheme();
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [addedEvents, setAddedEvents] = useState([]);
  const now = new Date();
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const offset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const monthLength = new Date(year, monthIndex + 1, 0).getDate();
  const cellCount = Math.ceil((offset + monthLength) / 7) * 7;
  const cells = useMemo(() => Array.from({ length: cellCount }, (_, index) => new Date(year, monthIndex, index - offset + 1)), [cellCount, year, monthIndex, offset]);
  const upcoming = [...eventTemplates, ...addedEvents].filter((event) => event.month === undefined || (event.month === monthIndex && event.year === year)).sort((a, b) => a.day - b.day);

  const moveMonth = (amount) => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  const addEvent = () => {
    const nextDay = Math.min(monthLength, Math.max(1, now.getDate() + 1));
    setAddedEvents((current) => [...current, { day: nextDay, month: monthIndex, year, title: 'New workspace event', color: 'info' }]);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <SceneHeader title="Calendar" subtitle="Keep your team’s schedule and upcoming events in view." action={<Button variant="contained" startIcon={<AddOutlinedIcon />} onClick={addEvent} sx={{ textTransform: 'none' }}>Add event</Button>} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 280px' }, gap: 1.5 }}>
        <Card variant="outlined" sx={{ borderColor: theme.palette.divider, borderRadius: 2, overflow: 'hidden', backgroundImage: 'none' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton size="small" aria-label="Previous month" onClick={() => moveMonth(-1)}><ArrowBackIosNewRoundedIcon sx={{ fontSize: 15 }} /></IconButton>
              <Typography variant="h6" fontWeight={700}>{month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</Typography>
              <IconButton size="small" aria-label="Next month" onClick={() => moveMonth(1)}><ArrowForwardIosRoundedIcon sx={{ fontSize: 15 }} /></IconButton>
            </Stack>
            <Button size="small" onClick={() => setMonth(new Date(now.getFullYear(), now.getMonth(), 1))} sx={{ textTransform: 'none' }}>Today</Button>
          </Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', borderTop: `1px solid ${theme.palette.divider}` }}>
            {weekdays.map((day) => <Box key={day} sx={{ py: 1, textAlign: 'center', bgcolor: 'action.hover' }}><Typography variant="caption" color="text.secondary" fontWeight={700}>{day}</Typography></Box>)}
            {cells.map((date, index) => {
              const inMonth = date.getMonth() === monthIndex;
              const isToday = date.toDateString() === now.toDateString();
              const dayEvents = inMonth ? upcoming.filter((event) => event.day === date.getDate()) : [];
              return (
                <Box key={`${date.toISOString()}-${index}`} sx={{ minHeight: { xs: 78, md: 112 }, p: { xs: 0.5, sm: 1 }, borderTop: `1px solid ${theme.palette.divider}`, borderRight: index % 7 === 6 ? 0 : `1px solid ${theme.palette.divider}`, bgcolor: isToday ? `${theme.palette.primary.main}0a` : 'transparent' }}>
                  <Typography variant="caption" sx={{ display: 'inline-grid', placeItems: 'center', width: 24, height: 24, borderRadius: '50%', color: inMonth ? 'text.primary' : 'text.disabled', bgcolor: isToday ? 'primary.main' : 'transparent', ...(isToday ? { color: 'primary.contrastText', fontWeight: 700 } : {}) }}>{date.getDate()}</Typography>
                  <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                    {dayEvents.slice(0, 2).map((event, eventIndex) => <Chip key={`${event.title}-${eventIndex}`} label={event.title} size="small" color={event.color} sx={{ maxWidth: '100%', justifyContent: 'flex-start', height: 22, '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis', px: 0.75, fontSize: 10 } }} />)}
                  </Stack>
                </Box>
              );
            })}
          </Box>
        </Card>
        <Card variant="outlined" sx={{ p: 2, borderColor: theme.palette.divider, borderRadius: 2, backgroundImage: 'none', height: 'fit-content' }}>
          <Typography variant="h6" fontWeight={700}>Upcoming events</Typography>
          <Typography variant="caption" color="text.secondary">{month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {upcoming.length ? upcoming.map((event, index) => (
              <Stack key={`${event.title}-${index}`} direction="row" spacing={1.25} alignItems="flex-start">
                <Box sx={{ width: 4, alignSelf: 'stretch', borderRadius: 2, bgcolor: `${event.color}.main` }} />
                <Box><Typography variant="caption" color="text.secondary">{month.toLocaleDateString(undefined, { month: 'short' })} {event.day}</Typography><Typography variant="body2" fontWeight={600}>{event.title}</Typography></Box>
              </Stack>
            )) : <Typography variant="body2" color="text.secondary">No events scheduled this month.</Typography>}
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default Calendar;
