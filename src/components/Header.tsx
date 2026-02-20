"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Badge,
    TextField,
    InputAdornment,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { User } from "@/types";

const navigationItems = [
    { name: "Dashboard", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Tenants", path: "/tenants" },
    { name: "Maintenance", path: "/maintenance" },
    { name: "Reports", path: "/reports" },
];

interface HeaderProps {
    user: User;
}

export default function Header({ user }: HeaderProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            <AppBar position="sticky" elevation={0}>
                <Toolbar className="max-w-7xl mx-auto w-full px-6">
                    {/* Mobile menu button */}
                    <IconButton
                        sx={{ display: { md: "none" }, mr: 1 }}
                        onClick={() => setMobileOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 no-underline mr-8">
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography fontWeight={700} fontSize={18} color="white">
                                P
                            </Typography>
                        </Box>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            <Typography fontWeight={700} fontSize={18} color="text.primary">
                                PropertyHub
                            </Typography>
                            <Typography fontSize={11} color="text.secondary">
                                Owner Dashboard
                            </Typography>
                        </Box>
                    </Link>

                    {/* Desktop Navigation */}
                    <Box
                        component="nav"
                        sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, flexGrow: 1 }}
                    >
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="no-underline"
                            >
                                <Box
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: isActive(item.path) ? "primary.main" : "text.secondary",
                                        backgroundColor: isActive(item.path) ? "primary.50" : "transparent",
                                        "&:hover": {
                                            backgroundColor: isActive(item.path) ? "primary.50" : "grey.50",
                                            color: isActive(item.path) ? "primary.main" : "text.primary",
                                        },
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {item.name}
                                </Box>
                            </Link>
                        ))}
                    </Box>

                    {/* Search */}
                    <TextField
                        size="small"
                        placeholder="Search properties, tenants..."
                        sx={{
                            display: { xs: "none", lg: "block" },
                            width: 260,
                            mr: 1,
                            "& .MuiOutlinedInput-root": {
                                fontSize: 14,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Actions */}
                    <IconButton size="small" sx={{ ml: 0.5 }}>
                        <Badge
                            variant="dot"
                            color="error"
                            overlap="circular"
                        >
                            <NotificationsOutlinedIcon fontSize="small" />
                        </Badge>
                    </IconButton>

                    <IconButton size="small" sx={{ ml: 0.5 }}>
                        <SettingsOutlinedIcon fontSize="small" />
                    </IconButton>

                    {/* User Menu */}
                    <Box className="flex items-center gap-2 ml-3 cursor-pointer">
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            sx={{ width: 32, height: 32 }}
                        />
                        <Box sx={{ display: { xs: "none", md: "block" } }}>
                            <Typography fontSize={13} fontWeight={600} color="text.primary" lineHeight={1.3}>
                                {user.name}
                            </Typography>
                            <Typography fontSize={11} color="text.secondary" lineHeight={1.3}>
                                {user.role}
                            </Typography>
                        </Box>
                        <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{ "& .MuiDrawer-paper": { width: 280 } }}
            >
                <Box sx={{ p: 2 }}>
                    <Box className="flex items-center gap-3 mb-3">
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography fontWeight={700} fontSize={18} color="white">
                                P
                            </Typography>
                        </Box>
                        <Typography fontWeight={700} fontSize={18}>
                            PropertyHub
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <List>
                    {navigationItems.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                selected={isActive(item.path)}
                                onClick={() => setMobileOpen(false)}
                            >
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
