export interface User {
    name: string;
    email: string;
    avatar: string;
    role: string;
    properties: number;
    totalValue: number;
}

export interface Property {
    id: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    type: string;
    units: number;
    occupied: number;
    monthlyIncome: number;
    value: number;
    status: string;
    yearBuilt: number;
    squareFeet: number;
    image: string;
    amenities: string[];
    lastInspection: string;
    nextInspection: string;
}

export interface PaymentRecord {
    date: string;
    amount: number;
    status: string;
}

export interface Tenant {
    id: number;
    name: string;
    email: string;
    phone: string;
    property: string;
    propertyId: number;
    unit: string;
    rentAmount: number;
    paymentStatus: string;
    leaseStart: string;
    leaseEnd: string;
    creditScore: number;
    emergencyContact: string;
    avatar: string;
    paymentHistory: PaymentRecord[];
}

export interface MaintenanceRequest {
    id: number;
    property: string;
    propertyId: number;
    unit: string;
    tenantId: number;
    issue: string;
    description: string;
    priority: string;
    status: string;
    submittedBy: string;
    submittedDate: string;
    scheduledDate: string;
    estimatedCost: number;
    actualCost: number | null;
    assignedTo: string;
    category: string;
    photos: string[];
}

export interface Inspection {
    id: number;
    property: string;
    propertyId: number;
    date: string;
    type: string;
    inspector: string;
    status: string;
    checklist: string[];
}

export interface Communication {
    id: number;
    from: string;
    to: string;
    subject: string;
    message: string;
    date: string;
    type: string;
    priority: string;
    status: string;
}

export interface Vendor {
    id: number;
    name: string;
    category: string;
    phone: string;
    email: string;
    rating: number;
    completedJobs: number;
}

export interface RevenueData {
    month: string;
    amount: number;
}

export interface ExpenseData {
    category: string;
    amount: number;
}

export interface OccupancyData {
    month: string;
    rate: number;
}

export interface FinancialData {
    monthlyRevenue: RevenueData[];
    expenses: ExpenseData[];
    occupancyTrend: OccupancyData[];
}

export interface MockData {
    user: User;
    properties: Property[];
    tenants: Tenant[];
    maintenanceRequests: MaintenanceRequest[];
    inspections: Inspection[];
    communications: Communication[];
    vendors: Vendor[];
    financialData: FinancialData;
}
