"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3b82f6",
            light: "#60a5fa",
            dark: "#1d4ed8",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#8b5cf6",
            light: "#a78bfa",
            dark: "#6d28d9",
        },
        success: {
            main: "#22c55e",
            light: "#4ade80",
            dark: "#16a34a",
        },
        warning: {
            main: "#f59e0b",
            light: "#fbbf24",
            dark: "#d97706",
        },
        error: {
            main: "#ef4444",
            light: "#f87171",
            dark: "#dc2626",
        },
        background: {
            default: "#f8fafc",
            paper: "#ffffff",
        },
        text: {
            primary: "#0f172a",
            secondary: "#64748b",
        },
        divider: "#e2e8f0",
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 500,
        },
        body2: {
            color: "#64748b",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)",
                    border: "1px solid #f1f5f9",
                    transition: "box-shadow 0.3s ease, transform 0.2s ease",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 10,
                    padding: "8px 20px",
                },
                contained: {
                    boxShadow: "0 1px 3px rgba(59,130,246,0.3)",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontSize: "0.75rem",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    color: "#0f172a",
                    boxShadow: "none",
                    borderBottom: "1px solid #e2e8f0",
                },
            },
        },
    },
});

export default theme;
