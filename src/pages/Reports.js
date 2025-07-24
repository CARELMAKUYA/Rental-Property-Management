import React, { useState } from 'react';
import { Download, Filter, Calendar, TrendingUp, DollarSign, Home, Users } from 'lucide-react';
import { RevenueTrendChart, OccupancyChart, ExpensesChart, PropertyPerformanceChart } from '../components/Charts';
import { formatCurrency, calculateTotalIncome, calculateTotalValue, calculateOccupancyRate } from '../utils/helpers';
import mockData from '../data/mockData';

const Reports = () => {
  const [dateRange, setDateRange] = useState('year');
  const [reportType, setReportType] = useState('overview');

  const { properties, tenants, financialData } = mockData;
  
  const totalIncome = calculateTotalIncome(properties);
  const totalValue = calculateTotalValue(properties);
  const occupancyRate = calculateOccupancyRate(properties);
  const totalExpenses = financialData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  const kpiCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalIncome),
      change: "+12%",
      changeLabel: "vs last period",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Net Income",
      value: formatCurrency(netIncome),
      change: "+8%",
      changeLabel: "vs last period",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "Portfolio Value",
      value: formatCurrency(totalValue),
      change: "+15%",
      changeLabel: "vs last year",
      icon: Home,
      color: "text-purple-600 bg-purple-50"
    },
    {
      title: "Occupancy Rate",
      value: `${occupancyRate}%`,
      change: "+3%",
      changeLabel: "vs last period",
      icon: Users,
      color: "text-amber-600 bg-amber-50"
    }
  ];

  const reportTabs = [
    { id: 'overview', name: 'Overview', description: 'Key metrics and trends' },
    { id: 'financial', name: 'Financial', description: 'Revenue and expenses' },
    { id: 'occupancy', name: 'Occupancy', description: 'Tenant and vacancy analysis' },
    { id: 'maintenance', name: 'Maintenance', description: 'Property maintenance costs' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Track performance and generate insights</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Report Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {reportTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  reportType === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Date Range and Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-emerald-600 text-sm font-semibold">{kpi.change}</div>
                <div className="text-gray-400 text-xs">{kpi.changeLabel}</div>
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium mb-2">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {reportType === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevenueTrendChart data={financialData.monthlyRevenue} />
            <OccupancyChart data={financialData.occupancyTrend} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ExpensesChart data={financialData.expenses} />
            <PropertyPerformanceChart properties={properties} />
          </div>
        </div>
      )}

      {reportType === 'financial' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevenueTrendChart data={financialData.monthlyRevenue} />
            <ExpensesChart data={financialData.expenses} />
          </div>
          
          {/* Financial Summary Table */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">This Month</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Last Month</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">Total Revenue</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatCurrency(totalIncome)}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{formatCurrency(totalIncome * 0.95)}</td>
                    <td className="py-3 px-4 text-right text-emerald-600 font-semibold">+5.3%</td>
                  </tr>
                  {financialData.expenses.map((expense, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{expense.category}</td>
                      <td className="py-3 px-4 text-right text-red-600">-{formatCurrency(expense.amount)}</td>
                      <td className="py-3 px-4 text-right text-gray-600">-{formatCurrency(expense.amount * 1.1)}</td>
                      <td className="py-3 px-4 text-right text-emerald-600 font-semibold">-9.1%</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-900">Net Income</td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900">{formatCurrency(netIncome)}</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-600">{formatCurrency(netIncome * 0.92)}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">+8.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {reportType === 'occupancy' && (
        <div className="space-y-8">
          <OccupancyChart data={financialData.occupancyTrend} />
          
          {/* Occupancy Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Property Occupancy</h3>
              <div className="space-y-4">
                {properties.map((property) => {
                  const rate = Math.round((property.occupied / property.units) * 100);
                  return (
                    <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-900">{property.address}</h4>
                        <p className="text-sm text-gray-600">{property.occupied}/{property.units} units occupied</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{rate}%</p>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${rate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Tenant Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-emerald-900">Active Tenants</h4>
                    <p className="text-sm text-emerald-700">Currently paying rent</p>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">{tenants.length}</p>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-amber-900">Payment Due</h4>
                    <p className="text-sm text-amber-700">Rent due this month</p>
                  </div>
                  <p className="text-3xl font-bold text-amber-600">
                    {tenants.filter(t => t.paymentStatus === 'Due').length}
                  </p>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-red-900">Overdue</h4>
                    <p className="text-sm text-red-700">Late payments</p>
                  </div>
                  <p className="text-3xl font-bold text-red-600">
                    {tenants.filter(t => t.paymentStatus === 'Overdue').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {reportType === 'maintenance' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Maintenance Cost Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(mockData.maintenanceRequests.reduce((sum, r) => sum + (r.estimatedCost || 0), 0))}
                </p>
                <p className="text-sm text-blue-700 mt-2">Total Estimated</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(mockData.maintenanceRequests.filter(r => r.actualCost).reduce((sum, r) => sum + r.actualCost, 0))}
                </p>
                <p className="text-sm text-green-700 mt-2">Actual Spent</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <p className="text-3xl font-bold text-purple-600">
                  {mockData.maintenanceRequests.length}
                </p>
                <p className="text-sm text-purple-700 mt-2">Total Requests</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Property</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Issue</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Est. Cost</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actual Cost</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.maintenanceRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{request.property}</td>
                      <td className="py-3 px-4 text-gray-900">{request.issue}</td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        {request.estimatedCost ? formatCurrency(request.estimatedCost) : 'TBD'}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        {request.actualCost ? formatCurrency(request.actualCost) : '-'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
