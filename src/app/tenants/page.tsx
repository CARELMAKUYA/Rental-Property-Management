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
    Avatar,
    Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Header from "@/components/Header";
import { formatCurrency, formatDate, getStatusChipColor } from "@/utils/helpers";
import mockData from "@/data/mockData";
import { Tenant } from "@/types";

function TenantCard({ tenant }: { tenant: Tenant }) {
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box className="flex items-start justify-between mb-4">
                    <Box className="flex items-center gap-3">
                        <Avatar src={tenant.avatar} alt={tenant.name} sx={{ width: 48, height: 48 }} />
                        <Box>
                            <Typography fontWeight={700} fontSize={15}>
                                {tenant.name}
                            </Typography>
                            <Chip
                                label={tenant.paymentStatus}
                                color={getStatusChipColor(tenant.paymentStatus)}
                                size="small"
                                sx={{ mt: 0.5 }}
                            />
                        </Box>
                    </Box>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                        {formatCurrency(tenant.rentAmount)}
                        <Typography component="span" variant="body2" color="text.secondary" fontSize={11}>
                            /mo
                        </Typography>
                    </Typography>
                </Box>

                {/* Contact Info */}
                <Box className="space-y-2 mb-4">
                    <Box className="flex items-center gap-2">
                        <EmailOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontSize={13}>{tenant.email}</Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <PhoneOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontSize={13}>{tenant.phone}</Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontSize={13}>
                            {tenant.property} — Unit {tenant.unit}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Lease Info */}
                <Box className="space-y-2 mb-3">
                    <Box className="flex items-center justify-between">
                        <Box className="flex items-center gap-1">
                            <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                            <Typography variant="body2" fontSize={12} color="text.secondary">Lease Period</Typography>
                        </Box>
                        <Typography fontSize={12} fontWeight={600}>
                            {formatDate(tenant.leaseStart)} — {formatDate(tenant.leaseEnd)}
                        </Typography>
                    </Box>
                    <Box className="flex items-center justify-between">
                        <Box className="flex items-center gap-1">
                            <CreditCardOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                            <Typography variant="body2" fontSize={12} color="text.secondary">Credit Score</Typography>
                        </Box>
                        <Chip
                            label={tenant.creditScore}
                            size="small"
                            color={tenant.creditScore >= 750 ? "success" : tenant.creditScore >= 700 ? "warning" : "error"}
                            variant="outlined"
                            sx={{ fontSize: 12, height: 24 }}
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Payment History */}
                <Typography fontSize={13} fontWeight={600} sx={{ mb: 1.5 }}>
                    Recent Payments
                </Typography>
                <Box className="space-y-2">
                    {tenant.paymentHistory.map((payment, idx) => (
                        <Box
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg"
                            sx={{ bgcolor: "grey.50" }}
                        >
                            <Typography variant="body2" fontSize={12}>
                                {formatDate(payment.date)}
                            </Typography>
                            <Box className="flex items-center gap-2">
                                <Typography fontSize={13} fontWeight={600}>
                                    {formatCurrency(payment.amount)}
                                </Typography>
                                <Chip
                                    label={payment.status}
                                    color={getStatusChipColor(payment.status)}
                                    size="small"
                                    sx={{ fontSize: 11, height: 22 }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}

export default function TenantsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const { tenants } = mockData;

    const filteredTenants = tenants.filter((tenant) => {
        const matchesSearch =
            tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.property.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || tenant.paymentStatus === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const statusOptions = ["all", "Paid", "Due", "Overdue"];

    // Summary stats
    const totalRent = tenants.reduce((sum, t) => sum + t.rentAmount, 0);
    const paidCount = tenants.filter((t) => t.paymentStatus === "Paid").length;
    const overdueCount = tenants.filter((t) => t.paymentStatus === "Overdue").length;

    return (
        <Box className="min-h-screen bg-gray-50">
            <Header user={mockData.user} />
            <Box className="max-w-7xl mx-auto px-6 py-8">
                <Box className="space-y-6">
                    {/* Header */}
                    <Box className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <Box>
                            <Typography variant="h4" fontWeight={700}>
                                Tenants
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                Managing {tenants.length} tenants across your properties
                            </Typography>
                        </Box>
                        <Button variant="contained" startIcon={<AddIcon />}>
                            Add Tenant
                        </Button>
                    </Box>

                    {/* Summary Cards */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent sx={{ p: 3, textAlign: "center" }}>
                                    <Typography variant="body2" color="text.secondary">Total Monthly Rent</Typography>
                                    <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                                        {formatCurrency(totalRent)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent sx={{ p: 3, textAlign: "center" }}>
                                    <Typography variant="body2" color="text.secondary">Paid This Month</Typography>
                                    <Typography variant="h5" fontWeight={700} color="success.main" sx={{ mt: 1 }}>
                                        {paidCount}/{tenants.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent sx={{ p: 3, textAlign: "center" }}>
                                    <Typography variant="body2" color="text.secondary">Overdue</Typography>
                                    <Typography variant="h5" fontWeight={700} color="error.main" sx={{ mt: 1 }}>
                                        {overdueCount}
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
                                placeholder="Search tenants..."
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

                    {/* Tenants Grid */}
                    <Grid container spacing={3}>
                        {filteredTenants.map((tenant) => (
                            <Grid key={tenant.id} item xs={12} md={6} lg={4}>
                                <TenantCard tenant={tenant} />
                            </Grid>
                        ))}
                    </Grid>

                    {filteredTenants.length === 0 && (
                        <Card>
                            <CardContent sx={{ py: 8, textAlign: "center" }}>
                                <Typography color="text.secondary">
                                    No tenants found matching your search.
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
