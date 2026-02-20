"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Grid,
    TextField,
    InputAdornment,
    Button,
    Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Header from "@/components/Header";
import { formatCurrency, formatDate, getStatusChipColor } from "@/utils/helpers";
import mockData from "@/data/mockData";
import { MaintenanceRequest } from "@/types";

function MaintenanceCard({ request }: { request: MaintenanceRequest }) {
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box className="flex items-start justify-between mb-3">
                    <Box className="flex items-center gap-2">
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                flexShrink: 0,
                                bgcolor:
                                    request.priority === "High"
                                        ? "error.main"
                                        : request.priority === "Medium"
                                            ? "warning.main"
                                            : "success.main",
                            }}
                        />
                        <Chip
                            label={request.priority}
                            color={getStatusChipColor(request.priority)}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                    <Chip
                        label={request.status}
                        color={getStatusChipColor(request.status)}
                        size="small"
                    />
                </Box>

                <Typography fontWeight={700} fontSize={16} sx={{ mb: 1 }}>
                    {request.issue}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={13} sx={{ mb: 3 }}>
                    {request.description}
                </Typography>

                <Box className="space-y-2 mb-3">
                    <Box className="flex items-center gap-2">
                        <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontSize={13}>
                            {request.property} — Unit {request.unit}
                        </Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <PersonOutlineIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontSize={13}>
                            Submitted by {request.submittedBy}
                        </Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontSize={13}>
                            Assigned to {request.assignedTo}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box className="flex items-center gap-1">
                            <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                            <Box>
                                <Typography fontSize={11} color="text.secondary">Submitted</Typography>
                                <Typography fontSize={12} fontWeight={600}>
                                    {formatDate(request.submittedDate)}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className="flex items-center gap-1">
                            <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                            <Box>
                                <Typography fontSize={11} color="text.secondary">Scheduled</Typography>
                                <Typography fontSize={12} fontWeight={600}>
                                    {formatDate(request.scheduledDate)}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box className="flex items-center justify-between">
                    <Box>
                        <Typography fontSize={11} color="text.secondary">Est. Cost</Typography>
                        <Typography fontSize={14} fontWeight={600}>
                            {formatCurrency(request.estimatedCost)}
                        </Typography>
                    </Box>
                    {request.actualCost !== null && (
                        <Box textAlign="right">
                            <Typography fontSize={11} color="text.secondary">Actual Cost</Typography>
                            <Typography fontSize={14} fontWeight={600} color="success.main">
                                {formatCurrency(request.actualCost)}
                            </Typography>
                        </Box>
                    )}
                    <Chip label={request.category} size="small" variant="outlined" />
                </Box>
            </CardContent>
        </Card>
    );
}

export default function MaintenancePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const { maintenanceRequests } = mockData;

    const filteredRequests = maintenanceRequests.filter((request) => {
        const matchesSearch =
            request.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.property.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || request.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const statusOptions = ["all", "Pending", "In Progress", "Completed"];
    const pendingCount = maintenanceRequests.filter((r) => r.status === "Pending").length;
    const inProgressCount = maintenanceRequests.filter((r) => r.status === "In Progress").length;
    const completedCount = maintenanceRequests.filter((r) => r.status === "Completed").length;
    const totalEstCost = maintenanceRequests.reduce((sum, r) => sum + r.estimatedCost, 0);

    return (
        <Box className="min-h-screen bg-gray-50">
            <Header user={mockData.user} />
            <Box className="max-w-7xl mx-auto px-6 py-8">
                <Box className="space-y-6">
                    {/* Header */}
                    <Box className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <Box>
                            <Typography variant="h4" fontWeight={700}>
                                Maintenance
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                {maintenanceRequests.length} total requests
                            </Typography>
                        </Box>
                        <Button variant="contained" startIcon={<AddIcon />}>
                            New Request
                        </Button>
                    </Box>

                    {/* Summary Cards */}
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={3}>
                            <Card>
                                <CardContent sx={{ p: 2, textAlign: "center", "&:last-child": { pb: 2 } }}>
                                    <Typography variant="body2" color="text.secondary" fontSize={12}>Pending</Typography>
                                    <Typography variant="h5" fontWeight={700} color="warning.main" sx={{ mt: 0.5 }}>
                                        {pendingCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Card>
                                <CardContent sx={{ p: 2, textAlign: "center", "&:last-child": { pb: 2 } }}>
                                    <Typography variant="body2" color="text.secondary" fontSize={12}>In Progress</Typography>
                                    <Typography variant="h5" fontWeight={700} color="info.main" sx={{ mt: 0.5 }}>
                                        {inProgressCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Card>
                                <CardContent sx={{ p: 2, textAlign: "center", "&:last-child": { pb: 2 } }}>
                                    <Typography variant="body2" color="text.secondary" fontSize={12}>Completed</Typography>
                                    <Typography variant="h5" fontWeight={700} color="success.main" sx={{ mt: 0.5 }}>
                                        {completedCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Card>
                                <CardContent sx={{ p: 2, textAlign: "center", "&:last-child": { pb: 2 } }}>
                                    <Typography variant="body2" color="text.secondary" fontSize={12}>Total Est. Cost</Typography>
                                    <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
                                        {formatCurrency(totalEstCost)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Search & Filters */}
                    <Card>
                        <CardContent className="flex flex-col sm:flex-row gap-3">
                            <TextField
                                size="small"
                                placeholder="Search maintenance requests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ flexGrow: 1 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Box className="flex gap-2">
                                {statusOptions.map((status) => (
                                    <Chip
                                        key={status}
                                        label={status === "all" ? "All" : status}
                                        onClick={() => setFilterStatus(status)}
                                        color={filterStatus === status ? "primary" : "default"}
                                        variant={filterStatus === status ? "filled" : "outlined"}
                                        size="small"
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Maintenance Cards */}
                    <Grid container spacing={3}>
                        {filteredRequests.map((request) => (
                            <Grid key={request.id} item xs={12} md={6} lg={4}>
                                <MaintenanceCard request={request} />
                            </Grid>
                        ))}
                    </Grid>

                    {filteredRequests.length === 0 && (
                        <Card>
                            <CardContent sx={{ py: 8, textAlign: "center" }}>
                                <Typography color="text.secondary">
                                    No maintenance requests found matching your search.
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
