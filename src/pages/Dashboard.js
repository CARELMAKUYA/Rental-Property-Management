import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Wrench, Calendar, DollarSign, Home, AlertTriangle, CheckCircle } from 'lucide-react';
import { RevenueTrendChart, OccupancyChart } from '../components/Charts';
import { formatCurrency, formatDate, getStatusColor, calculateOccupancyRate, calculateTotalIncome, calculateTotalValue } from '../utils/helpers';
import mockData from '../data/mockData';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const { properties, tenants, maintenanceRequests, financialData } = mockData;
  
  const totalProperties = properties.length;
  const occupancyRate = calculateOccupancyRate(properties);
  const totalMonthlyIncome = calculateTotalIncome(properties);
  const totalValue = calculateTotalValue(properties);
  
  const overduePayments = tenants.filter(t => t.paymentStatus === 'Overdue').length;
  const pendingMaintenance = maintenanceRequests.filter(r => r.status === 'Pending').length;
  const upcomingInspections = 2; // From mock data

  const metrics = [
    {
      title: "Properties",
      value: totalProperties,
      change: "+2",
      changeLabel: "this month",
      icon: Home,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Occupancy",
      value: `${occupancyRate}%`,
      change: "+5%",
      changeLabel: "vs last month",
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(totalMonthlyIncome / 1000) + "K",
      change: "+12%",
      changeLabel: "vs last month",
      icon: DollarSign,
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50",
      textColor: "text-violet-600"
    },
    {
      title: "Portfolio Value",
      value: `${formatCurrency(totalValue / 1000000)}M`,
      change: "+8%",
      changeLabel: "this year",
      icon: TrendingUp,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600"
    }
  ];

  const quickStats = [
    {
      label: "Overdue Payments",
      value: overduePayments,
      icon: AlertTriangle,
      color: overduePayments > 0 ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"
    },
    {
      label: "Pending Maintenance",
      value: pendingMaintenance,
      icon: Wrench,
      color: pendingMaintenance > 0 ? "text-amber-600 bg-amber-50" : "text-green-600 bg-green-50"
    },
    {
      label: "Upcoming Inspections",
      value: upcomingInspections,
      icon: Calendar,
      color: "text-blue-600 bg-blue-50"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome back, {mockData.user.name.split(' ')[0]}! 👋
          </h1>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className={`p-3 ${metric.bgColor} rounded-2xl ${metric.textColor}`}>
                <metric.icon className="w-6 h-6" />
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueTrendChart data={financialData.monthlyRevenue} />
        <OccupancyChart data={financialData.occupancyTrend} />
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Properties</h3>
            <Link to="/properties" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {properties.slice(0, 3).map(property => (
              <div key={property.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{property.address}</h4>
                  <p className="text-sm text-gray-500">{property.occupied}/{property.units} units occupied</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(property.monthlyIncome)}</p>
                  <p className="text-sm text-gray-500">monthly</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Maintenance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Maintenance</h3>
            <Link to="/maintenance" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {maintenanceRequests.slice(0, 3).map(request => (
              <div key={request.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  request.priority === 'High' ? 'bg-red-500' :
                  request.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{request.issue}</h4>
                  <p className="text-sm text-gray-500">{request.property}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(request.submittedDate)}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
