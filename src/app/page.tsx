"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Grid,
    Avatar,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Header from "@/components/Header";
import { RevenueTrendChart, OccupancyChart } from "@/components/Charts";
import {
    formatCurrency,
    formatDate,
    getStatusChipColor,
    calculateOccupancyRate,
    calculateTotalIncome,
    calculateTotalValue,
} from "@/utils/helpers";
import mockData from "@/data/mockData";

const metricIcons = [HomeOutlinedIcon, PeopleOutlineIcon, AttachMoneyIcon, TrendingUpIcon];
const metricColors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];
const metricBgColors = ["#eff6ff", "#ecfdf5", "#f5f3ff", "#fffbeb"];

export default function DashboardPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const { properties, tenants, maintenanceRequests, financialData } = mockData;

    const totalProperties = properties.length;
    const occupancyRate = calculateOccupancyRate(properties);
    const totalMonthlyIncome = calculateTotalIncome(properties);
    const totalValue = calculateTotalValue(properties);

    const overduePayments = tenants.filter((t) => t.paymentStatus === "Overdue").length;
    const pendingMaintenance = maintenanceRequests.filter((r) => r.status === "Pending").length;
    const upcomingInspections = 2;

    const metrics = [
        { title: "Properties", value: totalProperties, change: "+2", changeLabel: "this month" },
        { title: "Occupancy", value: `${occupancyRate}%`, change: "+5%", changeLabel: "vs last month" },
        { title: "Monthly Revenue", value: formatCurrency(totalMonthlyIncome / 1000) + "K", change: "+12%", changeLabel: "vs last month" },
        { title: "Portfolio Value", value: `${formatCurrency(totalValue / 1000000)}M`, change: "+8%", changeLabel: "this year" },
    ];

    const quickStats = [
        { label: "Overdue Payments", value: overduePayments, icon: WarningAmberIcon, color: overduePayments > 0 ? "error" as const : "success" as const },
        { label: "Pending Maintenance", value: pendingMaintenance, icon: BuildOutlinedIcon, color: pendingMaintenance > 0 ? "warning" as const : "success" as const },
        { label: "Upcoming Inspections", value: upcomingInspections, icon: CalendarTodayOutlinedIcon, color: "info" as const },
    ];

    return (
        <Box className="min-h-screen bg-gray-50">
            <Header user={mockData.user} />
            <Box className="max-w-7xl mx-auto px-6 py-8">
                <Box className="space-y-8">
                    {/* Welcome */}
                    <Box className="flex items-center justify-between">
                        <Box>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Welcome back, {mockData.user.name.split(" ")[0]}! 👋
                            </Typography>
                            <Typography color="text.secondary" fontSize={16}>
                                {currentTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            </Typography>
                        </Box>
                        <Card sx={{ display: { xs: "none", lg: "block" } }}>
                            <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                    Current Time
                                </Typography>
                                <Typography variant="h5" fontWeight={700}>
                                    {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Key Metrics */}
                    <Grid container spacing={3}>
                        {metrics.map((metric, index) => {
                            const Icon = metricIcons[index];
                            return (
                                <Grid key={index} item xs={12} sm={6} lg={3}>
                                    <Card sx={{ height: "100%" }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box className="flex items-start justify-between mb-4">
                                                <Avatar
                                                    sx={{
                                                        bgcolor: metricBgColors[index],
                                                        color: metricColors[index],
                                                        width: 44,
                                                        height: 44,
                                                    }}
                                                    variant="rounded"
                                                >
                                                    <Icon fontSize="small" />
                                                </Avatar>
                                                <Box textAlign="right">
                                                    <Typography fontSize={13} fontWeight={600} color="success.main">
                                                        {metric.change}
                                                    </Typography>
                                                    <Typography fontSize={11} color="text.secondary">
                                                        {metric.changeLabel}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                fontWeight={500}
                                                textTransform="uppercase"
                                                letterSpacing={1}
                                            >
                                                {metric.title}
                                            </Typography>
                                            <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
                                                {metric.value}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* Quick Stats */}
                    <Grid container spacing={3}>
                        {quickStats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Grid key={index} item xs={12} md={4}>
                                    <Card>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box className="flex items-center justify-between">
                                                <Box>
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {stat.label}
                                                    </Typography>
                                                    <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                                                        {stat.value}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    icon={<Icon />}
                                                    label={stat.value}
                                                    color={stat.color}
                                                    variant="outlined"
                                                    size="medium"
                                                    sx={{ fontSize: 14, fontWeight: 600 }}
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* Charts */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <RevenueTrendChart data={financialData.monthlyRevenue} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <OccupancyChart data={financialData.occupancyTrend} />
                        </Grid>
                    </Grid>

                    {/* Recent Activity */}
                    <Grid container spacing={3}>
                        {/* Recent Properties */}
                        <Grid item xs={12} lg={6}>
                            <Card>
                                <CardContent sx={{ p: 3 }}>
                                    <Box className="flex items-center justify-between mb-4">
                                        <Typography variant="h6">Recent Properties</Typography>
                                        <Link href="/properties" className="text-blue-600 hover:text-blue-700 font-semibold text-sm no-underline">
                                            View All
                                        </Link>
                                    </Box>
                                    <Box className="space-y-3">
                                        {properties.slice(0, 3).map((property) => (
                                            <Box
                                                key={property.id}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <Avatar
                                                    src={property.image}
                                                    alt={property.address}
                                                    variant="rounded"
                                                    sx={{ width: 48, height: 48 }}
                                                />
                                                <Box flex={1}>
                                                    <Typography fontWeight={600} fontSize={14}>
                                                        {property.address}
                                                    </Typography>
                                                    <Typography variant="body2" fontSize={13}>
                                                        {property.occupied}/{property.units} units occupied
                                                    </Typography>
                                                </Box>
                                                <Box textAlign="right">
                                                    <Typography fontWeight={600} fontSize={14}>
                                                        {formatCurrency(property.monthlyIncome)}
                                                    </Typography>
                                                    <Typography variant="body2" fontSize={12}>
                                                        monthly
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Recent Maintenance */}
                        <Grid item xs={12} lg={6}>
                            <Card>
                                <CardContent sx={{ p: 3 }}>
                                    <Box className="flex items-center justify-between mb-4">
                                        <Typography variant="h6">Recent Maintenance</Typography>
                                        <Link href="/maintenance" className="text-blue-600 hover:text-blue-700 font-semibold text-sm no-underline">
                                            View All
                                        </Link>
                                    </Box>
                                    <Box className="space-y-3">
                                        {maintenanceRequests.slice(0, 3).map((request) => (
                                            <Box
                                                key={request.id}
                                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: "50%",
                                                        mt: 0.8,
                                                        flexShrink: 0,
                                                        bgcolor:
                                                            request.priority === "High"
                                                                ? "error.main"
                                                                : request.priority === "Medium"
                                                                    ? "warning.main"
                                                                    : "success.main",
                                                    }}
                                                />
                                                <Box flex={1}>
                                                    <Typography fontWeight={600} fontSize={14}>
                                                        {request.issue}
                                                    </Typography>
                                                    <Typography variant="body2" fontSize={13}>
                                                        {request.property}
                                                    </Typography>
                                                    <Typography variant="body2" fontSize={12} color="text.secondary" sx={{ mt: 0.5 }}>
                                                        {formatDate(request.submittedDate)}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={request.status}
                                                    color={getStatusChipColor(request.status)}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
