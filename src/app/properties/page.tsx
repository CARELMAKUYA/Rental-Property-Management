"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Box,
    Grid,
    TextField,
    InputAdornment,
    Button,
    IconButton,
    LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Header from "@/components/Header";
import { formatCurrency, formatDate, getStatusChipColor } from "@/utils/helpers";
import mockData from "@/data/mockData";
import { Property } from "@/types";

function PropertyCard({ property }: { property: Property }) {
    const occupancyPercent = Math.round((property.occupied / property.units) * 100);

    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
                component="img"
                height={180}
                image={property.image}
                alt={property.address}
                sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box className="flex items-start justify-between mb-2">
                    <Typography variant="h6" fontSize={16} fontWeight={700}>
                        {property.address}
                    </Typography>
                    <Chip
                        label={property.status}
                        color={getStatusChipColor(property.status)}
                        size="small"
                    />
                </Box>

                <Box className="flex items-center gap-1 mb-3">
                    <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" fontSize={13}>
                        {property.city}, {property.state} {property.zipCode}
                    </Typography>
                </Box>

                <Box className="space-y-2 mb-4">
                    <Box className="flex items-center justify-between">
                        <Typography variant="body2" fontSize={13}>Occupancy</Typography>
                        <Typography fontSize={13} fontWeight={600}>
                            {property.occupied}/{property.units} units
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={occupancyPercent}
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "grey.100",
                            "& .MuiLinearProgress-bar": {
                                borderRadius: 3,
                                bgcolor: occupancyPercent >= 80 ? "success.main" : occupancyPercent >= 50 ? "warning.main" : "error.main",
                            },
                        }}
                    />
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box className="flex items-center gap-1">
                            <AttachMoneyIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                            <Box>
                                <Typography fontSize={11} color="text.secondary">Monthly Income</Typography>
                                <Typography fontSize={14} fontWeight={600}>
                                    {formatCurrency(property.monthlyIncome)}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className="flex items-center gap-1">
                            <PeopleOutlineIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                            <Box>
                                <Typography fontSize={11} color="text.secondary">Type</Typography>
                                <Typography fontSize={14} fontWeight={600}>
                                    {property.type}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                    <Box className="flex flex-wrap gap-1">
                        {property.amenities.map((amenity) => (
                            <Chip key={amenity} label={amenity} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                        ))}
                    </Box>
                </Box>

                <Box className="flex items-center justify-between mt-3" sx={{ pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                    <Box className="flex items-center gap-1">
                        <CalendarTodayOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                        <Typography variant="body2" fontSize={12}>
                            Built {property.yearBuilt}
                        </Typography>
                    </Box>
                    <Typography fontSize={13} fontWeight={600} color="primary.main">
                        {formatCurrency(property.value)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default function PropertiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    const { properties } = mockData;

    const filteredProperties = properties.filter((property) => {
        const matchesSearch =
            property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === "all" || property.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const propertyTypes = ["all", ...Array.from(new Set(properties.map((p) => p.type)))];

    return (
        <Box className="min-h-screen bg-gray-50">
            <Header user={mockData.user} />
            <Box className="max-w-7xl mx-auto px-6 py-8">
                <Box className="space-y-6">
                    {/* Header */}
                    <Box className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <Box>
                            <Typography variant="h4" fontWeight={700}>
                                Properties
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                Manage your {properties.length} properties
                            </Typography>
                        </Box>
                        <Button variant="contained" startIcon={<AddIcon />}>
                            Add Property
                        </Button>
                    </Box>

                    {/* Search & Filters */}
                    <Card>
                        <CardContent className="flex flex-col sm:flex-row gap-3">
                            <TextField
                                size="small"
                                placeholder="Search properties..."
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
                            <Box className="flex gap-2 flex-wrap">
                                {propertyTypes.map((type) => (
                                    <Chip
                                        key={type}
                                        label={type === "all" ? "All" : type}
                                        onClick={() => setFilterType(type)}
                                        color={filterType === type ? "primary" : "default"}
                                        variant={filterType === type ? "filled" : "outlined"}
                                        size="small"
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Properties Grid */}
                    <Grid container spacing={3}>
                        {filteredProperties.map((property) => (
                            <Grid key={property.id} item xs={12} md={6} lg={4}>
                                <PropertyCard property={property} />
                            </Grid>
                        ))}
                    </Grid>

                    {filteredProperties.length === 0 && (
                        <Card>
                            <CardContent sx={{ py: 8, textAlign: "center" }}>
                                <Typography color="text.secondary">
                                    No properties found matching your search.
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
