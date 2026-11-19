import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

const palettes = {
    light: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E2E8F0",
        text: "#0F172A",
        muted: "#64748B",
        primary: "#4F46E5",
        primarySoft: "#EEF2FF",
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
        info: "#0EA5E9",
    },
    dark: {
        background: "#0B1220",
        surface: "#111A2E",
        border: "#1F2A44",
        text: "#E5E9F2",
        muted: "#94A3B8",
        primary: "#818CF8",
        primarySoft: "#1E2547",
        success: "#4ADE80",
        warning: "#FBBF24",
        danger: "#F87171",
        info: "#38BDF8",
    },
};

// Keep the existing tokens API for components and chart data.
export const tokens = (mode) => {
    const colors = palettes[mode] || palettes.dark;
    return {
        ...colors,
        primary: { 400: colors.primarySoft, 500: colors.primary, main: colors.primary },
        gray: { 100: colors.surface, 200: colors.border, 500: colors.muted, 700: colors.text },
        green: { 500: colors.success },
        red: { 200: colors.danger, 500: colors.danger },
        sky: { 300: colors.info, 500: colors.info },
        greenAccent: { 500: colors.success },
        blueAccent: { 300: colors.info },
        redAccent: { 200: colors.danger },
    };
};

export const themeSettings = (mode) => {
    const colors = palettes[mode] || palettes.dark;
    return {
        palette: {
            mode,
            primary: { main: colors.primary, light: colors.primarySoft },
            success: { main: colors.success },
            warning: { main: colors.warning },
            error: { main: colors.danger },
            info: { main: colors.info },
            divider: colors.border,
            text: { primary: colors.text, secondary: colors.muted },
            background: { default: colors.background, paper: colors.surface },
            neutral: { dark: colors.text, main: colors.muted, light: colors.border },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    "*": {
                        scrollbarColor: `${colors.muted} ${colors.background}`,
                        "&::-webkit-scrollbar, & *::-webkit-scrollbar": { width: 10, height: 10 },
                        "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": { backgroundColor: colors.background },
                        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                            backgroundColor: colors.muted,
                            border: `2px solid ${colors.background}`,
                            borderRadius: 8,
                        },
                    },
                },
            },
        },
        typography: {
            fontFamily: ["Open Sans", "sans-serif"].join(","),
            fontSize: 12,
            h1: { fontSize: 40 },
            h2: { fontSize: 32 },
            h3: { fontSize: 24 },
            h4: { fontSize: 20 },
            h5: { fontSize: 16 },
            h6: { fontSize: 14 },
        },
    };
};

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const useMode = () => {
    const [mode, setMode] = useState("dark");
    const colorMode = useMemo(
        () => ({ toggleColorMode: () => setMode((current) => current === "light" ? "dark" : "light") }),
        []
    );
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};
