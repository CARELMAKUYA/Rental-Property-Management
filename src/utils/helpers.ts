import { Property, Tenant, MaintenanceRequest } from "@/types";

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const formatDateLong = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const getStatusColor = (status: string): string => {
    const statusColors: Record<string, string> = {
        Paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
        Due: "bg-amber-100 text-amber-800 border-amber-200",
        Overdue: "bg-red-100 text-red-800 border-red-200",
        Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
        "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
        Pending: "bg-amber-100 text-amber-800 border-amber-200",
        Scheduled: "bg-blue-100 text-blue-800 border-blue-200",
        Excellent: "bg-emerald-100/90 text-emerald-800",
        Good: "bg-blue-100/90 text-blue-800",
        "Needs Attention": "bg-red-100/90 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
};

export const getStatusChipColor = (
    status: string
): "success" | "warning" | "error" | "info" | "default" => {
    const colorMap: Record<string, "success" | "warning" | "error" | "info" | "default"> = {
        Paid: "success",
        Completed: "success",
        Excellent: "success",
        Good: "info",
        Due: "warning",
        Pending: "warning",
        Scheduled: "info",
        "In Progress": "info",
        Overdue: "error",
        "Needs Attention": "error",
        High: "error",
        Medium: "warning",
        Low: "success",
    };
    return colorMap[status] || "default";
};

export const getPriorityColor = (priority: string): string => {
    const priorityColors: Record<string, string> = {
        High: "bg-red-500",
        Medium: "bg-amber-500",
        Low: "bg-emerald-500",
    };
    return priorityColors[priority] || "bg-gray-500";
};

export const calculateOccupancyRate = (properties: Property[]): number => {
    const totalUnits = properties.reduce((sum, prop) => sum + prop.units, 0);
    const occupiedUnits = properties.reduce((sum, prop) => sum + prop.occupied, 0);
    return totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
};

export const calculateTotalIncome = (properties: Property[]): number => {
    return properties.reduce((sum, prop) => sum + prop.monthlyIncome, 0);
};

export const calculateTotalValue = (properties: Property[]): number => {
    return properties.reduce((sum, prop) => sum + prop.value, 0);
};

export const getOverdueCount = (tenants: Tenant[]): number => {
    return tenants.filter((tenant) => tenant.paymentStatus === "Overdue").length;
};

export const getMaintenanceByStatus = (
    requests: MaintenanceRequest[],
    status: string
): MaintenanceRequest[] => {
    return requests.filter((request) => request.status === status);
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
