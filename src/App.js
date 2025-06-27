import React, { useState, useEffect } from "react";
import "./App.css";

// Mock data for the dashboard
const mockData = {
  user: {
    name: "Carel Makuya",
    email: "carel@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
  },
  properties: [
    {
      id: 1,
      address: "123 Oak Street, Downtown",
      type: "Apartment",
      units: 4,
      occupied: 3,
      monthlyIncome: 8400,
      value: 850000,
      status: "Excellent",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      address: "456 Pine Avenue, Suburb",
      type: "House",
      units: 1,
      occupied: 1,
      monthlyIncome: 2800,
      value: 420000,
      status: "Good",
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      address: "789 Maple Lane, City Center",
      type: "Condo",
      units: 2,
      occupied: 1,
      monthlyIncome: 3200,
      value: 320000,
      status: "Needs Attention",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ],
  tenants: [
    {
      id: 1,
      name: "Sarah Johnson",
      property: "123 Oak Street",
      unit: "2A",
      rentAmount: 2100,
      paymentStatus: "Paid",
      leaseEnd: "2024-12-31",
      creditScore: 785,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      property: "456 Pine Avenue",
      unit: "Main",
      rentAmount: 2800,
      paymentStatus: "Due",
      leaseEnd: "2025-06-30",
      creditScore: 720,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 3,
      name: "Emily Davis",
      property: "789 Maple Lane",
      unit: "1B",
      rentAmount: 1600,
      paymentStatus: "Overdue",
      leaseEnd: "2024-09-15",
      creditScore: 650,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
  ],
  maintenanceRequests: [
    {
      id: 1,
      property: "123 Oak Street",
      unit: "2A",
      issue: "Leaking faucet in kitchen",
      priority: "Medium",
      status: "In Progress",
      submittedBy: "Sarah Johnson",
      date: "2024-01-15",
      estimatedCost: 150,
    },
    {
      id: 2,
      property: "789 Maple Lane",
      unit: "1B",
      issue: "Broken air conditioning",
      priority: "High",
      status: "Pending",
      submittedBy: "Emily Davis",
      date: "2024-01-14",
      estimatedCost: 800,
    },
    {
      id: 3,
      property: "456 Pine Avenue",
      unit: "Main",
      issue: "Garage door not opening",
      priority: "Low",
      status: "Completed",
      submittedBy: "Michael Chen",
      date: "2024-01-10",
      estimatedCost: 200,
    },
  ],
  upcomingInspections: [
    {
      id: 1,
      property: "123 Oak Street",
      date: "2024-01-25",
      type: "Annual Inspection",
      inspector: "John Smith",
    },
    {
      id: 2,
      property: "789 Maple Lane",
      date: "2024-02-02",
      type: "Move-out Inspection",
      inspector: "Lisa Brown",
    },
  ],
  recentCommunications: [
    {
      id: 1,
      from: "Sarah Johnson",
      subject: "Rent payment confirmation",
      date: "2024-01-14",
      type: "email",
      priority: "low",
    },
    {
      id: 2,
      from: "Property Manager",
      subject: "Inspection scheduled",
      date: "2024-01-13",
      type: "system",
      priority: "medium",
    },
    {
      id: 3,
      from: "Emily Davis",
      subject: "Emergency repair request",
      date: "2024-01-12",
      type: "urgent",
      priority: "high",
    },
  ],
};

// Header Component
const Header = ({ user }) => {
  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">PropertyHub</h1>
              <p className="text-gray-600 text-sm">Owner Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 0v6m0-6l-6 6"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
              />
              <div className="hidden md:block">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Property Card Component
const PropertyCard = ({ property }) => {
  const occupancyRate = (property.occupied / property.units) * 100;

  return (
    <div className="metric-card rounded-2xl p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            {property.address}
          </h3>
          <p className="text-gray-600 text-sm">{property.type}</p>
        </div>
        <div className="w-16 h-16 rounded-xl overflow-hidden">
          <img
            src={property.image}
            alt={property.address}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-xs font-medium">OCCUPANCY</p>
          <p className="text-xl font-bold text-gray-900">
            {property.occupied}/{property.units}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium">MONTHLY INCOME</p>
          <p className="text-xl font-bold text-green-600">
            ${property.monthlyIncome.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs font-medium">PROPERTY VALUE</p>
          <p className="text-lg font-semibold text-gray-900">
            ${property.value.toLocaleString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.status === "Excellent"
              ? "bg-green-100 text-green-800"
              : property.status === "Good"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {property.status}
        </span>
      </div>
    </div>
  );
};

// Metrics Overview Component
const MetricsOverview = ({ properties, tenants }) => {
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, prop) => sum + prop.units, 0);
  const occupiedUnits = properties.reduce(
    (sum, prop) => sum + prop.occupied,
    0,
  );
  const totalMonthlyIncome = properties.reduce(
    (sum, prop) => sum + prop.monthlyIncome,
    0,
  );
  const totalValue = properties.reduce((sum, prop) => sum + prop.value, 0);
  const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100);

  const metrics = [
    {
      title: "Total Properties",
      value: totalProperties,
      change: "+2 this month",
      icon: "🏠",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Occupancy Rate",
      value: `${occupancyRate}%`,
      change: "+5% from last month",
      icon: "📊",
      color: "from-green-400 to-green-600",
    },
    {
      title: "Monthly Income",
      value: `$${totalMonthlyIncome.toLocaleString()}`,
      change: "+12% from last month",
      icon: "💰",
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Portfolio Value",
      value: `$${(totalValue / 1000000).toFixed(1)}M`,
      change: "+8% this year",
      icon: "📈",
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="metric-card rounded-2xl p-6 card-hover animate-fade-in"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center text-2xl`}
            >
              {metric.icon}
            </div>
            <span className="text-green-500 text-sm font-medium">
              {metric.change}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            {metric.title}
          </h3>
          <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

// Tenant Card Component
const TenantCard = ({ tenant }) => {
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Due":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="metric-card rounded-xl p-4 card-hover">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={tenant.avatar}
          alt={tenant.name}
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{tenant.name}</h4>
          <p className="text-sm text-gray-600">
            {tenant.property} - Unit {tenant.unit}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(tenant.paymentStatus)}`}
        >
          {tenant.paymentStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Rent Amount</p>
          <p className="font-semibold text-gray-900">${tenant.rentAmount}</p>
        </div>
        <div>
          <p className="text-gray-500">Credit Score</p>
          <p className="font-semibold text-gray-900">{tenant.creditScore}</p>
        </div>
      </div>
    </div>
  );
};

// Maintenance Request Component
const MaintenanceRequest = ({ request }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="metric-card rounded-xl p-4 border-l-4 border-blue-500 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{request.issue}</h4>
          <p className="text-sm text-gray-600">
            {request.property} - Unit {request.unit}
          </p>
        </div>
        <div className="flex space-x-2">
          <span
            className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(request.priority)}`}
          >
            {request.priority}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}
          >
            {request.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Submitted by</p>
          <p className="font-medium text-gray-900">{request.submittedBy}</p>
        </div>
        <div>
          <p className="text-gray-500">Estimated Cost</p>
          <p className="font-medium text-gray-900">${request.estimatedCost}</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header user={mockData.user} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {mockData.user.name.split(" ")[0]}! 👋
              </h2>
              <p className="text-gray-600">
                Here's what's happening with your properties today -{" "}
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="metric-card rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Current Time</p>
                <p className="text-xl font-bold text-gray-900">
                  {currentTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <MetricsOverview
          properties={mockData.properties}
          tenants={mockData.tenants}
        />

        {/* Properties Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Your Properties
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockData.properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tenant Information */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Active Tenants
              </h3>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {mockData.tenants.map((tenant) => (
                <TenantCard key={tenant.id} tenant={tenant} />
              ))}
            </div>
          </div>

          {/* Maintenance Requests */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Maintenance Requests
              </h3>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {mockData.maintenanceRequests.map((request) => (
                <MaintenanceRequest key={request.id} request={request} />
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Inspections & Communications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Upcoming Inspections */}
          <div className="metric-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Upcoming Inspections
            </h3>
            <div className="space-y-3">
              {mockData.upcomingInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {inspection.property}
                    </p>
                    <p className="text-sm text-gray-600">{inspection.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">
                      {inspection.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      {inspection.inspector}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Communications */}
          <div className="metric-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Recent Communications
            </h3>
            <div className="space-y-3">
              {mockData.recentCommunications.map((comm) => (
                <div
                  key={comm.id}
                  className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      comm.priority === "high"
                        ? "bg-red-500"
                        : comm.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {comm.subject}
                    </p>
                    <p className="text-sm text-gray-600">From: {comm.from}</p>
                  </div>
                  <p className="text-sm text-gray-500">{comm.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
