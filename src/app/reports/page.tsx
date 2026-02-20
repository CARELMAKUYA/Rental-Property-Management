"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Button,
    Tabs,
    Tab,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Header from "@/components/Header";
import {
    RevenueTrendChart,
    OccupancyChart,
    ExpensesChart,
    PropertyPerformanceChart,
} from "@/components/Charts";
import {
    formatCurrency,
    calculateTotalIncome,
    calculateTotalValue,
    calculateOccupancyRate,
} from "@/utils/helpers";
import mockData from "@/data/mockData";

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState(0);

    const { properties, tenants, financialData } = mockData;

    const totalIncome = calculateTotalIncome(properties);
    const totalExpenses = financialData.expenses.reduce((sum, e) => sum + e.amount, 0);
    const netIncome = totalIncome - totalExpenses;
    const totalValue = calculateTotalValue(properties);
    const occupancyRate = calculateOccupancyRate(properties);

    const summaryCards = [
        { label: "Total Revenue", value: formatCurrency(totalIncome), icon: AttachMoneyIcon, color: "#3b82f6", bgColor: "#eff6ff" },
        { label: "Net Income", value: formatCurrency(netIncome), icon: TrendingUpIcon, color: "#10b981", bgColor: "#ecfdf5" },
        { label: "Total Properties", value: properties.length, icon: HomeOutlinedIcon, color: "#8b5cf6", bgColor: "#f5f3ff" },
        { label: "Occupancy Rate", value: `${occupancyRate}%`, icon: PeopleOutlineIcon, color: "#f59e0b", bgColor: "#fffbeb" },
    ];

    return (
        <Box className="min-h-screen bg-gray-50">
            <Header user={mockData.user} />
            <Box className="max-w-7xl mx-auto px-6 py-8">
                <Box className="space-y-6">
                    {/* Header */}
                    <Box className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <Box>
                            <Typography variant="h4" fontWeight={700}>
                                Reports
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                Comprehensive analytics and financial reports
                            </Typography>
                        </Box>
                        <Button variant="outlined" startIcon={<DownloadOutlinedIcon />}>
                            Export Report
                        </Button>
                    </Box>

                    {/* Summary Cards */}
                    <Grid container spacing={3}>
                        {summaryCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <Grid key={index} item xs={6} md={3}>
                                    <Card>
                                        <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 2,
                                                    bgcolor: card.bgColor,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Icon sx={{ color: card.color }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" fontSize={12}>
                                                    {card.label}
                                                </Typography>
                                                <Typography variant="h6" fontWeight={700}>
                                                    {card.value}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* Tabs */}
                    <Card>
                        <Tabs
                            value={activeTab}
                            onChange={(_, val) => setActiveTab(val)}
                            sx={{ px: 2, borderBottom: "1px solid", borderColor: "divider" }}
                        >
                            <Tab label="Financial Overview" sx={{ textTransform: "none", fontWeight: 600 }} />
                            <Tab label="Property Analytics" sx={{ textTransform: "none", fontWeight: 600 }} />
                            <Tab label="Expense Breakdown" sx={{ textTransform: "none", fontWeight: 600 }} />
                        </Tabs>

                        <CardContent sx={{ p: 3 }}>
                            {activeTab === 0 && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12} lg={6}>
                                        <RevenueTrendChart data={financialData.monthlyRevenue} />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <OccupancyChart data={financialData.occupancyTrend} />
                                    </Grid>
                                    {/* Monthly P&L Table */}
                                    <Grid item xs={12}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="h6" sx={{ mb: 2 }}>
                                                    Profit & Loss Summary
                                                </Typography>
                                                <TableContainer>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                                                                <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                                                                <TableCell align="right" sx={{ fontWeight: 600 }}>% of Revenue</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell sx={{ fontWeight: 600, color: "success.main" }}>Total Revenue</TableCell>
                                                                <TableCell align="right" sx={{ fontWeight: 600, color: "success.main" }}>
                                                                    {formatCurrency(totalIncome)}
                                                                </TableCell>
                                                                <TableCell align="right">100%</TableCell>
                                                            </TableRow>
                                                            {financialData.expenses.map((expense) => (
                                                                <TableRow key={expense.category}>
                                                                    <TableCell>{expense.category}</TableCell>
                                                                    <TableCell align="right" sx={{ color: "error.main" }}>
                                                                        -{formatCurrency(expense.amount)}
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        {((expense.amount / totalIncome) * 100).toFixed(1)}%
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                            <TableRow>
                                                                <TableCell sx={{ fontWeight: 700, borderTop: "2px solid", borderColor: "divider" }}>
                                                                    Net Income
                                                                </TableCell>
                                                                <TableCell
                                                                    align="right"
                                                                    sx={{ fontWeight: 700, color: "success.main", borderTop: "2px solid", borderColor: "divider" }}
                                                                >
                                                                    {formatCurrency(netIncome)}
                                                                </TableCell>
                                                                <TableCell align="right" sx={{ fontWeight: 700, borderTop: "2px solid", borderColor: "divider" }}>
                                                                    {((netIncome / totalIncome) * 100).toFixed(1)}%
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            )}

                            {activeTab === 1 && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <PropertyPerformanceChart properties={properties} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Typography variant="h6" sx={{ mb: 2 }}>
                                                    Property Details
                                                </Typography>
                                                <TableContainer>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell sx={{ fontWeight: 600 }}>Property</TableCell>
                                                                <TableCell align="center" sx={{ fontWeight: 600 }}>Type</TableCell>
                                                                <TableCell align="center" sx={{ fontWeight: 600 }}>Units</TableCell>
                                                                <TableCell align="center" sx={{ fontWeight: 600 }}>Occupancy</TableCell>
                                                                <TableCell align="right" sx={{ fontWeight: 600 }}>Income</TableCell>
                                                                <TableCell align="right" sx={{ fontWeight: 600 }}>Value</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {properties.map((property) => (
                                                                <TableRow key={property.id}>
                                                                    <TableCell>{property.address}</TableCell>
                                                                    <TableCell align="center">{property.type}</TableCell>
                                                                    <TableCell align="center">
                                                                        {property.occupied}/{property.units}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {Math.round((property.occupied / property.units) * 100)}%
                                                                    </TableCell>
                                                                    <TableCell align="right">{formatCurrency(property.monthlyIncome)}</TableCell>
                                                                    <TableCell align="right">{formatCurrency(property.value)}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            )}

                            {activeTab === 2 && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12} lg={6}>
                                        <ExpensesChart data={financialData.expenses} />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Card variant="outlined" sx={{ height: "100%" }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ mb: 2 }}>
                                                    Expense Details
                                                </Typography>
                                                <Box className="space-y-3">
                                                    {financialData.expenses.map((expense) => {
                                                        const percent = ((expense.amount / totalExpenses) * 100).toFixed(1);
                                                        return (
                                                            <Box key={expense.category}>
                                                                <Box className="flex items-center justify-between mb-1">
                                                                    <Typography fontSize={14} fontWeight={500}>
                                                                        {expense.category}
                                                                    </Typography>
                                                                    <Typography fontSize={14} fontWeight={600}>
                                                                        {formatCurrency(expense.amount)}
                                                                    </Typography>
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        height: 8,
                                                                        borderRadius: 4,
                                                                        bgcolor: "grey.100",
                                                                        overflow: "hidden",
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            height: "100%",
                                                                            width: `${percent}%`,
                                                                            borderRadius: 4,
                                                                            bgcolor: "primary.main",
                                                                            transition: "width 0.5s ease",
                                                                        }}
                                                                    />
                                                                </Box>
                                                                <Typography fontSize={11} color="text.secondary" textAlign="right" sx={{ mt: 0.5 }}>
                                                                    {percent}% of total
                                                                </Typography>
                                                            </Box>
                                                        );
                                                    })}
                                                </Box>
                                                <Divider sx={{ my: 2 }} />
                                                <Box className="flex items-center justify-between">
                                                    <Typography fontWeight={700}>Total Expenses</Typography>
                                                    <Typography fontWeight={700} color="error.main">
                                                        {formatCurrency(totalExpenses)}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
