import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (

        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex"
                backgroundColor={theme.palette.background.paper}
                border={`1px solid ${theme.palette.divider}`}
                borderRadius="6px">

                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
            </Box>
            <Box display="flex" gap="2rem" p={2}>
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>

            </Box>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}

                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                </IconButton>
            </Box>
        </Box>)
}

export default Topbar;
