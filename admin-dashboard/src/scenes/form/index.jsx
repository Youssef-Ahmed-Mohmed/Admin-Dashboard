import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const validationSchema = Yup.object({
  firstName: Yup.string().trim().min(2, 'Use at least 2 characters').required('First name is required'),
  lastName: Yup.string().trim().min(2, 'Use at least 2 characters').required('Last name is required'),
  email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
  phone: Yup.string()
    .trim()
    .matches(/^\+?[\d\s().-]{7,20}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
  role: Yup.string().required('Please select a role'),
  department: Yup.string().trim().required('Department is required'),
  address: Yup.string().trim().required('Address is required'),
  city: Yup.string().trim().required('City is required'),
  country: Yup.string().required('Please select a country'),
  postalCode: Yup.string().trim().min(3, 'Enter a valid postal code').required('Postal code is required'),
});

const initialValues = {
  firstName: 'Youssef',
  lastName: 'Ahmed',
  email: '',
  phone: '',
  role: 'Administrator',
  department: 'Operations',
  address: '',
  city: '',
  country: 'Egypt',
  postalCode: '',
};

const ProfileForm = () => {
  const theme = useTheme();
  const [noticeOpen, setNoticeOpen] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => setNoticeOpen(true),
  });

  const field = (name, label, options = {}) => (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={(event) => {
        setNoticeOpen(false);
        formik.handleChange(event);
      }}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      {...options}
    />
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1500, mx: 'auto' }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
        <Avatar sx={{ width: 46, height: 46, bgcolor: theme.palette.primary.main }}>
          <PersonOutlineOutlinedIcon />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={700}>Profile settings</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            Manage your personal information and work details.
          </Typography>
        </Box>
      </Stack>

      <Card variant="outlined" sx={{ borderColor: theme.palette.divider, borderRadius: 2, backgroundImage: 'none' }}>
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          <Typography variant="h6" fontWeight={700}>Personal information</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Update your contact details and profile information.
          </Typography>
        </Box>
        <Divider />
        <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Basic details</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
              {field('firstName', 'First name')}
              {field('lastName', 'Last name')}
              {field('email', 'Email address', { type: 'email' })}
              {field('phone', 'Phone number', { type: 'tel', placeholder: '+20 100 000 0000' })}
              {field('role', 'Role', {
                select: true,
                children: [
                  <MenuItem key="Administrator" value="Administrator">Administrator</MenuItem>,
                  <MenuItem key="Manager" value="Manager">Manager</MenuItem>,
                  <MenuItem key="Member" value="Member">Member</MenuItem>,
                ],
              })}
              {field('department', 'Department')}
            </Box>

            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Location</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              {field('address', 'Street address', { placeholder: 'Building and street' })}
              {field('city', 'City')}
              {field('country', 'Country', {
                select: true,
                children: [
                  <MenuItem key="Egypt" value="Egypt">Egypt</MenuItem>,
                  <MenuItem key="United States" value="United States">United States</MenuItem>,
                  <MenuItem key="United Kingdom" value="United Kingdom">United Kingdom</MenuItem>,
                  <MenuItem key="Canada" value="Canada">Canada</MenuItem>,
                ],
              })}
              {field('postalCode', 'Postal code')}
            </Box>

            <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent="flex-end" spacing={1.25} sx={{ mt: 3 }}>
              <Button
                type="button"
                color="inherit"
                variant="outlined"
                startIcon={<RestartAltOutlinedIcon />}
                onClick={() => { formik.resetForm(); setNoticeOpen(false); }}
                sx={{ textTransform: 'none' }}
              >
                Reset changes
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
                startIcon={<SaveOutlinedIcon />}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Save profile
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={noticeOpen} autoHideDuration={4000} onClose={() => setNoticeOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" variant="filled" onClose={() => setNoticeOpen(false)}>
          Profile details validated and submitted.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;
