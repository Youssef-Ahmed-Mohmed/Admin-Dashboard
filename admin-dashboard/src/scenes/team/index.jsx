import { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { mockDataTeam } from '../../data/mockData';

const roleConfig = {
  admin: { label: 'Administrator', color: 'info', Icon: AdminPanelSettingsOutlinedIcon },
  manager: { label: 'Manager', color: 'success', Icon: ManageAccountsOutlinedIcon },
  user: { label: 'Member', color: 'default', Icon: PersonOutlineOutlinedIcon },
};

const getInitials = (name) => name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

const StatCard = ({ label, value, note, Icon, accent }) => {
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ height: '100%', borderColor: theme.palette.divider, borderRadius: 2, backgroundImage: 'none' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, p: '18px !important' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>{value}</Typography>
          <Typography variant="caption" color="text.secondary">{note}</Typography>
        </Box>
        <Box sx={{ width: 44, height: 44, display: 'grid', placeItems: 'center', borderRadius: 2, color: accent, backgroundColor: `${accent}18` }}>
          <Icon />
        </Box>
      </CardContent>
    </Card>
  );
};

const Team = () => {
  const theme = useTheme();
  const [rows, setRows] = useState(mockDataTeam);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', access: 'user' });

  const counts = useMemo(() => ({
    admin: rows.filter((row) => row.access === 'admin').length,
    manager: rows.filter((row) => row.access === 'manager').length,
    user: rows.filter((row) => row.access === 'user').length,
  }), [rows]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesRole = roleFilter === 'all' || row.access === roleFilter;
      const matchesQuery = !normalizedQuery || [row.name, row.email, row.phone].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesRole && matchesQuery;
    });
  }, [query, roleFilter, rows]);

  const columns = useMemo(() => [
    {
      field: 'name',
      headerName: 'TEAM MEMBER',
      flex: 1.4,
      minWidth: 220,
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ height: '100%' }}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: theme.palette.primary.main, fontSize: 12, fontWeight: 700 }}>
            {getInitials(row.name)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>{row.name}</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>{row.email}</Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: 'access',
      headerName: 'ROLE',
      width: 180,
      renderCell: ({ value }) => {
        const role = roleConfig[value] || roleConfig.user;
        const RoleIcon = role.Icon;
        return <Chip size="small" icon={<RoleIcon />} label={role.label} color={role.color} variant="outlined" />;
      },
    },
    { field: 'phone', headerName: 'PHONE', flex: 0.8, minWidth: 150 },
    { field: 'age', headerName: 'AGE', width: 90, align: 'center', headerAlign: 'center' },
  ], [theme]);

  const handleAddMember = (event) => {
    event.preventDefault();
    setRows((currentRows) => [
      { ...newMember, id: Math.max(0, ...currentRows.map((row) => Number(row.id) || 0)) + 1, age: '—' },
      ...currentRows,
    ]);
    setNewMember({ name: '', email: '', phone: '', access: 'user' });
    setDialogOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Team members</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Manage your people, roles, and access.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddOutlinedIcon />} onClick={() => setDialogOpen(true)} sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' }, textTransform: 'none', fontWeight: 600, borderRadius: 1.5, px: 2 }}>
          Add member
        </Button>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' }, gap: { xs: 1, sm: 1.5 }, mb: 3 }}>
        <StatCard label="Total team" value={rows.length} note="People in your workspace" Icon={GroupsOutlinedIcon} accent={theme.palette.primary.main} />
        <StatCard label="Administrators" value={counts.admin} note="Full workspace access" Icon={AdminPanelSettingsOutlinedIcon} accent={theme.palette.info.main} />
        <StatCard label="Managers" value={counts.manager} note="Team management access" Icon={ManageAccountsOutlinedIcon} accent={theme.palette.success.main} />
        <StatCard label="Members" value={counts.user} note="Standard workspace access" Icon={PersonOutlineOutlinedIcon} accent={theme.palette.warning.main} />
      </Box>

      <Card variant="outlined" sx={{ borderColor: theme.palette.divider, borderRadius: 2, overflow: 'hidden', backgroundImage: 'none' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={1.5} sx={{ p: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={700}>All members</Typography>
            <Typography variant="caption" color="text.secondary">{filteredRows.length} of {rows.length} members</Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <TextField
              size="small"
              placeholder="Search name, email, phone"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              sx={{ minWidth: { sm: 250 } }}
              InputProps={{ startAdornment: <SearchOutlinedIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 19 }} /> }}
            />
            <TextField select size="small" label="Role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} sx={{ minWidth: 145 }}>
              <MenuItem value="all">All roles</MenuItem>
              <MenuItem value="admin">Administrator</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="user">Member</MenuItem>
            </TextField>
          </Stack>
        </Stack>
        <Box sx={{ height: { xs: 420, sm: 500 }, width: '100%', minWidth: 0, borderTop: `1px solid ${theme.palette.divider}` }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            disableRowSelectionOnClick
            sx={{
              border: 0,
              '& .MuiDataGrid-columnHeaders': { backgroundColor: theme.palette.background.default, borderBottomColor: theme.palette.divider },
              '& .MuiDataGrid-columnHeaderTitle': { fontSize: 10, fontWeight: 700, letterSpacing: 0.7, color: theme.palette.text.secondary },
              '& .MuiDataGrid-cell': { borderBottomColor: theme.palette.divider },
              '& .MuiDataGrid-row:hover': { backgroundColor: theme.palette.action.hover },
              '& .MuiDataGrid-footerContainer': { borderTopColor: theme.palette.divider },
            }}
          />
        </Box>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={handleAddMember}>
          <DialogTitle sx={{ fontWeight: 700 }}>Add team member</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField autoFocus required label="Full name" value={newMember.name} onChange={(event) => setNewMember({ ...newMember, name: event.target.value })} />
              <TextField required type="email" label="Email address" value={newMember.email} onChange={(event) => setNewMember({ ...newMember, email: event.target.value })} />
              <TextField label="Phone number" value={newMember.phone} onChange={(event) => setNewMember({ ...newMember, phone: event.target.value })} />
              <TextField select label="Role" value={newMember.access} onChange={(event) => setNewMember({ ...newMember, access: event.target.value })}>
                <MenuItem value="user">Member</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setDialogOpen(false)} color="inherit" sx={{ textTransform: 'none' }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ textTransform: 'none' }}>Add member</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Team;
