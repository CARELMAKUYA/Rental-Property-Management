// Comprehensive mock data for Property Management System

export const mockData = {
  user: {
    name: "Carel Makuya",
    email: "carel@propertyhub.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    role: "Property Owner",
    properties: 3,
    totalValue: 1590000
  },

  properties: [
    {
      id: 1,
      address: "123 Oak Street, Downtown",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      type: "Apartment Complex",
      units: 4,
      occupied: 3,
      monthlyIncome: 8400,
      value: 850000,
      status: "Excellent",
      yearBuilt: 2018,
      squareFeet: 3200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      amenities: ["Parking", "Laundry", "Gym", "Pool"],
      lastInspection: "2024-01-10",
      nextInspection: "2024-04-10"
    },
    {
      id: 2,
      address: "456 Pine Avenue, Suburb",
      city: "Brooklyn",
      state: "NY", 
      zipCode: "11201",
      type: "Single Family",
      units: 1,
      occupied: 1,
      monthlyIncome: 2800,
      value: 420000,
      status: "Good",
      yearBuilt: 2015,
      squareFeet: 1800,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      amenities: ["Parking", "Garden", "Basement"],
      lastInspection: "2024-01-05",
      nextInspection: "2024-04-05"
    },
    {
      id: 3,
      address: "789 Maple Lane, City Center",
      city: "Manhattan",
      state: "NY",
      zipCode: "10002",
      type: "Condo",
      units: 2,
      occupied: 1,
      monthlyIncome: 3200,
      value: 320000,
      status: "Needs Attention",
      yearBuilt: 2010,
      squareFeet: 1200,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      amenities: ["Parking", "Balcony"],
      lastInspection: "2023-12-28",
      nextInspection: "2024-03-28"
    }
  ],

  tenants: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      property: "123 Oak Street",
      propertyId: 1,
      unit: "2A",
      rentAmount: 2100,
      paymentStatus: "Paid",
      leaseStart: "2023-06-01",
      leaseEnd: "2024-12-31",
      creditScore: 785,
      emergencyContact: "Mike Johnson - (555) 123-4568",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      paymentHistory: [
        { date: "2024-01-01", amount: 2100, status: "Paid" },
        { date: "2023-12-01", amount: 2100, status: "Paid" },
        { date: "2023-11-01", amount: 2100, status: "Paid" }
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "(555) 234-5678",
      property: "456 Pine Avenue",
      propertyId: 2,
      unit: "Main",
      rentAmount: 2800,
      paymentStatus: "Due",
      leaseStart: "2023-01-15",
      leaseEnd: "2025-06-30",
      creditScore: 720,
      emergencyContact: "Lisa Chen - (555) 234-5679",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      paymentHistory: [
        { date: "2023-12-01", amount: 2800, status: "Paid" },
        { date: "2023-11-01", amount: 2800, status: "Paid" },
        { date: "2023-10-01", amount: 2800, status: "Late" }
      ]
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "(555) 345-6789",
      property: "789 Maple Lane",
      propertyId: 3,
      unit: "1B",
      rentAmount: 1600,
      paymentStatus: "Overdue",
      leaseStart: "2022-09-15",
      leaseEnd: "2024-09-15",
      creditScore: 650,
      emergencyContact: "Robert Davis - (555) 345-6790",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      paymentHistory: [
        { date: "2023-11-01", amount: 1600, status: "Paid" },
        { date: "2023-10-01", amount: 1600, status: "Late" },
        { date: "2023-09-01", amount: 1600, status: "Paid" }
      ]
    }
  ],

  maintenanceRequests: [
    {
      id: 1,
      property: "123 Oak Street",
      propertyId: 1,
      unit: "2A",
      tenantId: 1,
      issue: "Leaking faucet in kitchen",
      description: "Kitchen sink faucet has been dripping for 3 days. Water pressure also seems low.",
      priority: "Medium",
      status: "In Progress",
      submittedBy: "Sarah Johnson",
      submittedDate: "2024-01-15",
      scheduledDate: "2024-01-18",
      estimatedCost: 150,
      actualCost: null,
      assignedTo: "Mike's Plumbing",
      category: "Plumbing",
      photos: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"]
    },
    {
      id: 2,
      property: "789 Maple Lane",
      propertyId: 3,
      unit: "1B",
      tenantId: 3,
      issue: "Broken air conditioning",
      description: "AC unit stopped working completely. No cold air coming out.",
      priority: "High",
      status: "Pending",
      submittedBy: "Emily Davis",
      submittedDate: "2024-01-14",
      scheduledDate: "2024-01-16",
      estimatedCost: 800,
      actualCost: null,
      assignedTo: "Cool Air HVAC",
      category: "HVAC",
      photos: []
    },
    {
      id: 3,
      property: "456 Pine Avenue",
      propertyId: 2,
      unit: "Main",
      tenantId: 2,
      issue: "Garage door not opening",
      description: "Garage door opener stopped working. Remote and wall button both unresponsive.",
      priority: "Low",
      status: "Completed",
      submittedBy: "Michael Chen",
      submittedDate: "2024-01-10",
      scheduledDate: "2024-01-12",
      estimatedCost: 200,
      actualCost: 175,
      assignedTo: "Garage Door Pro",
      category: "Electrical",
      photos: []
    }
  ],

  inspections: [
    {
      id: 1,
      property: "123 Oak Street",
      propertyId: 1,
      date: "2024-01-25",
      type: "Annual Inspection",
      inspector: "John Smith",
      status: "Scheduled",
      checklist: [
        "HVAC System",
        "Plumbing",
        "Electrical",
        "Fire Safety",
        "Structure"
      ]
    },
    {
      id: 2,
      property: "789 Maple Lane", 
      propertyId: 3,
      date: "2024-02-02",
      type: "Move-out Inspection",
      inspector: "Lisa Brown",
      status: "Scheduled",
      checklist: [
        "Wall Condition",
        "Carpet/Flooring",
        "Appliances",
        "Cleanliness",
        "Damage Assessment"
      ]
    }
  ],

  communications: [
    {
      id: 1,
      from: "Sarah Johnson",
      to: "Property Manager",
      subject: "Rent payment confirmation",
      message: "Hi, I wanted to confirm that my January rent payment was processed successfully.",
      date: "2024-01-14",
      type: "email",
      priority: "low",
      status: "read"
    },
    {
      id: 2,
      from: "System",
      to: "Property Owner",
      subject: "Inspection scheduled for 123 Oak Street",
      message: "Annual inspection has been scheduled for January 25, 2024 at 10:00 AM.",
      date: "2024-01-13",
      type: "system",
      priority: "medium", 
      status: "read"
    },
    {
      id: 3,
      from: "Emily Davis",
      to: "Property Manager",
      subject: "Emergency repair request - AC not working",
      message: "The air conditioning in unit 1B has completely stopped working. It's getting very hot in here.",
      date: "2024-01-12",
      type: "urgent",
      priority: "high",
      status: "unread"
    }
  ],

  vendors: [
    {
      id: 1,
      name: "Mike's Plumbing",
      category: "Plumbing",
      phone: "(555) 123-9999",
      email: "mike@mikesplumbing.com",
      rating: 4.8,
      completedJobs: 23
    },
    {
      id: 2,
      name: "Cool Air HVAC",
      category: "HVAC",
      phone: "(555) 234-8888",
      email: "service@coolairhvac.com",
      rating: 4.6,
      completedJobs: 15
    },
    {
      id: 3,
      name: "Garage Door Pro",
      category: "Electrical",
      phone: "(555) 345-7777",
      email: "info@garagedoorpro.com",
      rating: 4.9,
      completedJobs: 31
    }
  ],

  financialData: {
    monthlyRevenue: [
      { month: 'Jul', amount: 13800 },
      { month: 'Aug', amount: 14200 },
      { month: 'Sep', amount: 13900 },
      { month: 'Oct', amount: 14400 },
      { month: 'Nov', amount: 14400 },
      { month: 'Dec', amount: 14400 },
      { month: 'Jan', amount: 14400 }
    ],
    expenses: [
      { category: 'Maintenance', amount: 2400 },
      { category: 'Insurance', amount: 800 },
      { category: 'Property Tax', amount: 1200 },
      { category: 'Management', amount: 1440 },
      { category: 'Utilities', amount: 600 }
    ],
    occupancyTrend: [
      { month: 'Jul', rate: 85 },
      { month: 'Aug', rate: 88 },
      { month: 'Sep', rate: 92 },
      { month: 'Oct', rate: 86 },
      { month: 'Nov', rate: 89 },
      { month: 'Dec', rate: 86 },
      { month: 'Jan', rate: 86 }
    ]
  }
};

export default mockData;
