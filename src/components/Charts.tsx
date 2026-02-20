"use client";

import { Card, CardContent, Typography } from "@mui/material";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { RevenueData, OccupancyData, ExpenseData, Property } from "@/types";

const tooltipStyle = {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
};

export const RevenueTrendChart = ({ data }: { data: RevenueData[] }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Monthly Revenue Trend
            </Typography>
            <div style={{ height: 256 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                        <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} />
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);

export const OccupancyChart = ({ data }: { data: OccupancyData[] }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Occupancy Rate Trend
            </Typography>
            <div style={{ height: 256 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                        <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`, "Occupancy Rate"]} />
                        <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export const ExpensesChart = ({ data }: { data: ExpenseData[] }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Monthly Expenses Breakdown
            </Typography>
            <div style={{ height: 256 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            dataKey="amount"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);

export const PropertyPerformanceChart = ({ properties }: { properties: Property[] }) => {
    const data = properties.map((property) => ({
        name: property.address.split(",")[0],
        income: property.monthlyIncome,
        occupancy: Math.round((property.occupied / property.units) * 100),
    }));

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Property Performance
                </Typography>
                <div style={{ height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} tickFormatter={(v) => `${v}%`} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="income" fill="#3b82f6" name="Monthly Income ($)" radius={[4, 4, 0, 0]} />
                            <Line yAxisId="right" type="monotone" dataKey="occupancy" stroke="#10b981" strokeWidth={3} name="Occupancy Rate (%)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
