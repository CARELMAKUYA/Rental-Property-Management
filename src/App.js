import React, { useState, useEffect } from 'react';
import './App.css';

// Mock data for the dashboard
const mockData = {
  user: {
    name: "Carel Makuya",
    email: "carel@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
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
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
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
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
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
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
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
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
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
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
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
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
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
      estimatedCost: 150
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
      estimatedCost: 800
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
      estimatedCost: 200
    }
  ],
  upcomingInspections: [
    {
      id: 1,
      property: "123 Oak Street",
      date: "2024-01-25",
      type: "Annual Inspection",
      inspector: "John Smith"
    },
    {
      id: 2,
      property: "789 Maple Lane",
      date: "2024-02-02",
      type: "Move-out Inspection",
      inspector: "Lisa Brown"
    }
  ],
  recentCommunications: [
    {
      id: 1,
      from: "Sarah Johnson",
      subject: "Rent payment confirmation",
      date: "2024-01-14",
      type: "email",
      priority: "low"
    },
    {
      id: 2,
      from: "Property Manager",
      subject: "Inspection scheduled",
      date: "2024-01-13",
      type: "system",
      priority: "medium"
    },
    {
      id: 3,
      from: "Emily Davis",
      subject: "Emergency repair request",
      date: "2024-01-12",
      type: "urgent",
      priority: "high"
    }
  ]
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 0v6m0-6l-6 6" />
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
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="h-48 relative overflow-hidden">
        <img
          src={property.image}
          alt={property.address}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            property.status === 'Excellent' ? 'bg-emerald-100/90 text-emerald-800' :
            property.status === 'Good' ? 'bg-blue-100/90 text-blue-800' :
            'bg-red-100/90 text-red-800'
          }`}>
            {property.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{property.address}</h3>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{property.type}</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm font-medium">Occupancy</span>
              <span className="text-gray-900 font-bold">{property.occupied}/{property.units} units</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div>
              <p className="text-gray-500 text-sm">Monthly Income</p>
              <p className="text-2xl font-bold text-gray-900">${(property.monthlyIncome/1000).toFixed(1)}K</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Property Value</p>
              <p className="text-lg font-semibold text-gray-900">${(property.value/1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Metrics Overview Component
const MetricsOverview = ({ properties, tenants }) => {
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, prop) => sum + prop.units, 0);
  const occupiedUnits = properties.reduce((sum, prop) => sum + prop.occupied, 0);
  const totalMonthlyIncome = properties.reduce((sum, prop) => sum + prop.monthlyIncome, 0);
  const totalValue = properties.reduce((sum, prop) => sum + prop.value, 0);
  const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100);

  const metrics = [
    {
      title: "Properties",
      value: totalProperties,
      change: "+2",
      changeLabel: "this month",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Occupancy",
      value: `${occupancyRate}%`,
      change: "+5%",
      changeLabel: "vs last month",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Monthly Revenue",
      value: `$${(totalMonthlyIncome/1000).toFixed(0)}K`,
      change: "+12%",
      changeLabel: "vs last month",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      color: "from-violet-500 to-violet-600"
    },
    {
      title: "Portfolio Value",
      value: `$${(totalValue/1000000).toFixed(1)}M`,
      change: "+8%",
      changeLabel: "this year",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3 bg-gradient-to-br ${metric.color} rounded-2xl text-white shadow-lg`}>
              {metric.icon}
            </div>
            <div className="text-right">
              <div className="text-emerald-600 text-sm font-semibold">{metric.change}</div>
              <div className="text-gray-400 text-xs">{metric.changeLabel}</div>
            </div>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wide">{metric.title}</h3>
            <p className="text-4xl font-bold text-gray-900">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Tenant Card Component
const TenantCard = ({ tenant }) => {
  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Due': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={tenant.avatar}
            alt={tenant.name}
            className="w-14 h-14 rounded-full border-3 border-white shadow-lg"
          />
          <div>
            <h4 className="font-bold text-lg text-gray-900">{tenant.name}</h4>
            <p className="text-sm text-gray-500">{tenant.property}</p>
            <p className="text-xs text-gray-400 font-medium">Unit {tenant.unit}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(tenant.paymentStatus)}`}>
          {tenant.paymentStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Monthly Rent</p>
          <p className="text-xl font-bold text-gray-900">${tenant.rentAmount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Credit Score</p>
          <p className="text-xl font-bold text-gray-900">{tenant.creditScore}</p>
        </div>
      </div>
    </div>
  );
};

// Maintenance Request Component
const MaintenanceRequest = ({ request }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(request.priority)} mt-2`}></div>
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-900 mb-1">{request.issue}</h4>
            <p className="text-sm text-gray-500 mb-2">{request.property}</p>
            <p className="text-xs text-gray-400 font-medium">Unit {request.unit} • {request.date}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
          {request.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Submitted By</p>
          <p className="font-semibold text-gray-900">{request.submittedBy}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Est. Cost</p>
          <p className="font-bold text-gray-900">${request.estimatedCost}</p>
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

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Welcome back, {mockData.user.name.split(' ')[0]}! 👋
              </h2>
              <p className="text-lg text-gray-600">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-2 font-medium">Current Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <MetricsOverview properties={mockData.properties} tenants={mockData.tenants} />

        {/* Properties Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-10">Your Properties</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {mockData.properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tenant Information */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Active Tenants</h3>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {mockData.tenants.map(tenant => (
                <TenantCard key={tenant.id} tenant={tenant} />
              ))}
            </div>
          </div>

          {/* Maintenance Requests */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Maintenance Requests</h3>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {mockData.maintenanceRequests.map(request => (
                <MaintenanceRequest key={request.id} request={request} />
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Inspections & Communications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Upcoming Inspections */}
          <div className="metric-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Inspections</h3>
            <div className="space-y-3">
              {mockData.upcomingInspections.map(inspection => (
                <div key={inspection.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{inspection.property}</p>
                    <p className="text-sm text-gray-600">{inspection.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{inspection.date}</p>
                    <p className="text-sm text-gray-500">{inspection.inspector}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Communications */}
          <div className="metric-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Communications</h3>
            <div className="space-y-3">
              {mockData.recentCommunications.map(comm => (
                <div key={comm.id} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    comm.priority === 'high' ? 'bg-red-500' :
                    comm.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{comm.subject}</p>
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
