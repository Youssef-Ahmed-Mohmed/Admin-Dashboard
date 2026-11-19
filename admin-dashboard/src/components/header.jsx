import { Box, Typography, useTheme } from '@mui/material';

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    return (
        <Box mb={3.75}>
            <Typography variant="h2" color={theme.palette.text.primary} fontWeight="bold" sx={{ m: '0 0 5px 0' }}>
                {title}
            </Typography>
            <Typography variant="h5" color={theme.palette.info.main}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
