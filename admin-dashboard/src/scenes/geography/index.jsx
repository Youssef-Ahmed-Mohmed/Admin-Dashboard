import { useMemo, useState } from 'react';
import { Box, Card, Chip, Stack, Typography, useTheme } from '@mui/material';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import SceneHeader from '../../components/SceneHeader';
import { mockGeographyData } from '../../data/mockData';
import { geoFeatures } from '../../data/mockGeoFeatures';

const projectRing = (ring) => ring.map(([longitude, latitude], index) => {
  const x = ((longitude + 180) / 360) * 1000;
  const y = ((90 - latitude) / 180) * 500;
  return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' ') + ' Z';

const featurePath = (geometry) => {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  return polygons.map((polygon) => polygon.map(projectRing).join(' ')).join(' ');
};

const Geography = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const rows = useMemo(() => geoFeatures.features.map((feature, index) => ({
    feature,
    value: mockGeographyData[index]?.value || 0,
  })), []);
  const maximum = Math.max(...rows.map((row) => row.value));
  const selected = selectedIndex === null ? null : rows[selectedIndex];
  const topRegion = rows.reduce((top, row) => row.value > top.value ? row : top, rows[0]);
  const mapColor = (value) => {
    const ratio = value / maximum;
    if (ratio > 0.8) return theme.palette.primary.main;
    if (ratio > 0.6) return theme.palette.info.main;
    if (ratio > 0.4) return theme.palette.success.main;
    if (ratio > 0.2) return theme.palette.warning.main;
    return theme.palette.action.hover;
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <SceneHeader title="Global reach" subtitle="Explore activity across countries and regions." action={<Chip icon={<PublicOutlinedIcon />} label={`${rows.length} regions`} size="small" variant="outlined" />} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.8fr) minmax(260px, 0.7fr)' }, gap: 1.5 }}>
        <Card variant="outlined" sx={{ p: { xs: 1, md: 2 }, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none', minWidth: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ px: 1, pt: 1 }}>
            <Box><Typography variant="h6" fontWeight={700}>Activity by country</Typography><Typography variant="caption" color="text.secondary">Select a region to view its activity</Typography></Box>
          </Stack>
          <Box sx={{ width: '100%', mt: 1, aspectRatio: '2 / 1', minHeight: 250 }}>
            <svg viewBox="0 0 1000 500" width="100%" height="100%" role="img" aria-label="Interactive world activity map">
              {[100, 200, 300, 400].map((y) => <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke={theme.palette.divider} strokeDasharray="2 8" opacity="0.7" />)}
              {rows.map(({ feature, value }, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <path
                    key={feature.properties.name}
                    d={featurePath(feature.geometry)}
                    fill={isSelected ? theme.palette.primary.main : mapColor(value)}
                    fillOpacity={isSelected ? 1 : value ? 0.78 : 0.55}
                    stroke={isSelected ? theme.palette.text.primary : theme.palette.background.paper}
                    strokeWidth={isSelected ? 1.5 : 0.65}
                    fillRule="evenodd"
                    tabIndex={0}
                    role="button"
                    aria-label={`${feature.properties.name}, activity ${value.toLocaleString()}`}
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedIndex(index); }}
                    style={{ cursor: 'pointer', transition: 'fill 120ms ease' }}
                  >
                    <title>{feature.properties.name}: {value.toLocaleString()} activity</title>
                  </path>
                );
              })}
            </svg>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 1, pt: 1 }}>
            <Typography variant="caption" color="text.secondary">Lower activity</Typography>
            {['action.hover', 'warning.main', 'success.main', 'info.main', 'primary.main'].map((color) => <Box key={color} sx={{ width: 22, height: 8, borderRadius: 1, bgcolor: color }} />)}
            <Typography variant="caption" color="text.secondary">Higher</Typography>
          </Stack>
        </Card>

        <Stack spacing={1.5}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none' }}>
            <Typography variant="body2" color="text.secondary">Top market</Typography>
            <Typography variant="h5" fontWeight={750} sx={{ mt: 0.75 }}>{topRegion.feature.properties.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{topRegion.value.toLocaleString()} activity points</Typography>
          </Card>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none', minHeight: 145 }}>
            <Typography variant="body2" color="text.secondary">Selected region</Typography>
            <Typography variant="h5" fontWeight={750} sx={{ mt: 0.75 }}>{selected?.feature.properties.name || 'Choose a country'}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{selected ? `${selected.value.toLocaleString()} activity points` : 'Click any highlighted area on the map.'}</Typography>
          </Card>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: theme.palette.divider, backgroundImage: 'none' }}>
            <Typography variant="body2" color="text.secondary">Coverage</Typography>
            <Typography variant="h5" fontWeight={750} sx={{ mt: 0.75 }}>{rows.filter((row) => row.value > 0).length} countries</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>with recorded workspace activity</Typography>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default Geography;
