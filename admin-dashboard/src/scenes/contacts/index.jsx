import { useMemo, useState } from 'react';
import { Avatar, Box, Card, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SceneHeader from '../../components/SceneHeader';
import { mockDataContacts } from '../../data/mockData';

const Contacts = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const rows = useMemo(() => mockDataContacts.filter((row) =>
    [row.name, row.email, row.phone, row.city].some((value) => value.toLowerCase().includes(search.trim().toLowerCase()))
  ), [search]);
  const columns = [
    {
      field: 'name', headerName: 'CONTACT', flex: 1.2, minWidth: 210,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ height: '100%' }}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: theme.palette.primary.main, fontSize: 12 }}>{row.name.split(' ').map((name) => name[0]).slice(0, 2).join('')}</Avatar>
          <Box><Typography variant="body2" fontWeight={600}>{row.name}</Typography><Typography variant="caption" color="text.secondary">{row.email}</Typography></Box>
        </Stack>
      ),
    },
    { field: 'phone', headerName: 'PHONE', flex: 0.8, minWidth: 145 },
    { field: 'city', headerName: 'CITY', flex: 0.7, minWidth: 130 },
    { field: 'address', headerName: 'ADDRESS', flex: 1.2, minWidth: 230 },
    { field: 'registrarId', headerName: 'REGISTRAR ID', width: 140 },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <SceneHeader title="Contacts" subtitle="Keep customer details and communication information in one place." />
      <Card variant="outlined" sx={{ borderColor: theme.palette.divider, borderRadius: 2, overflow: 'hidden', backgroundImage: 'none' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={1.5} sx={{ p: 2 }}>
          <Box><Typography variant="h6" fontWeight={700}>Contact directory</Typography><Typography variant="caption" color="text.secondary">{rows.length} contacts</Typography></Box>
          <TextField size="small" placeholder="Search contacts" value={search} onChange={(event) => setSearch(event.target.value)} sx={{ width: { xs: '100%', sm: 280 } }} InputProps={{ startAdornment: <SearchOutlinedIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 19 }} /> }} />
        </Stack>
        <Box sx={{ height: { xs: 420, sm: 580 }, minWidth: 0, borderTop: `1px solid ${theme.palette.divider}` }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }} disableRowSelectionOnClick sx={{ border: 0, '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover' }, '& .MuiDataGrid-columnHeaderTitle': { fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: 'text.secondary' }, '& .MuiDataGrid-cell': { borderColor: theme.palette.divider } }} />
        </Box>
      </Card>
    </Box>
  );
};

export default Contacts;
