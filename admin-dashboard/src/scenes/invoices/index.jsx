import { useMemo, useState } from 'react';
import { Box, Card, Chip, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SceneHeader from '../../components/SceneHeader';
import { mockDataInvoices } from '../../data/mockData';

const invoiceRows = mockDataInvoices.map((invoice, index) => ({
  ...invoice,
  status: ['Paid', 'Pending', 'Paid', 'Overdue'][index % 4],
}));

const Invoices = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const rows = useMemo(() => invoiceRows.filter((row) =>
    [row.name, row.email, row.phone, row.date, row.id.toString()].some((value) => value.toLowerCase().includes(search.trim().toLowerCase()))
  ), [search]);
  const columns = [
    { field: 'id', headerName: 'INVOICE', width: 100, valueFormatter: (value) => `INV-${String(value).padStart(4, '0')}` },
    {
      field: 'name', headerName: 'CUSTOMER', flex: 1.1, minWidth: 200,
      renderCell: ({ row }) => <Box><Typography variant="body2" fontWeight={600}>{row.name}</Typography><Typography variant="caption" color="text.secondary">{row.email}</Typography></Box>,
    },
    { field: 'date', headerName: 'ISSUE DATE', width: 140 },
    { field: 'phone', headerName: 'PHONE', width: 165 },
    {
      field: 'cost', headerName: 'AMOUNT', width: 130, align: 'right', headerAlign: 'right',
      renderCell: ({ value }) => <Typography variant="body2" fontWeight={700}>${Number(value).toFixed(2)}</Typography>,
    },
    {
      field: 'status', headerName: 'STATUS', width: 130,
      renderCell: ({ value }) => <Chip size="small" label={value} color={value === 'Paid' ? 'success' : value === 'Pending' ? 'warning' : 'error'} variant="outlined" />,
    },
  ];
  const totalBilled = invoiceRows.reduce((sum, row) => sum + Number(row.cost), 0);
  const paidCount = invoiceRows.filter((row) => row.status === 'Paid').length;

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <SceneHeader title="Invoices" subtitle="Track billing, payment status, and customer balances." />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mb: 2 }}>
        {[
          ['Total invoiced', `$${totalBilled.toFixed(2)}`],
          ['Invoices issued', invoiceRows.length],
          ['Paid invoices', `${paidCount} / ${invoiceRows.length}`],
        ].map(([label, value]) => (
          <Card key={label} variant="outlined" sx={{ p: 2, borderColor: theme.palette.divider, borderRadius: 2, backgroundImage: 'none' }}>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 0.75 }}>{value}</Typography>
          </Card>
        ))}
      </Box>
      <Card variant="outlined" sx={{ borderColor: theme.palette.divider, borderRadius: 2, overflow: 'hidden', backgroundImage: 'none' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={1.5} sx={{ p: 2 }}>
          <Box><Typography variant="h6" fontWeight={700}>Invoice register</Typography><Typography variant="caption" color="text.secondary">Search and review billing records</Typography></Box>
          <TextField size="small" placeholder="Search invoices" value={search} onChange={(event) => setSearch(event.target.value)} sx={{ width: { xs: '100%', sm: 260 } }} InputProps={{ startAdornment: <SearchOutlinedIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 19 }} /> }} />
        </Stack>
        <Box sx={{ height: 540, borderTop: `1px solid ${theme.palette.divider}` }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }} disableRowSelectionOnClick sx={{ border: 0, '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover' }, '& .MuiDataGrid-columnHeaderTitle': { fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: 'text.secondary' }, '& .MuiDataGrid-cell': { borderColor: theme.palette.divider } }} />
        </Box>
      </Card>
    </Box>
  );
};

export default Invoices;
