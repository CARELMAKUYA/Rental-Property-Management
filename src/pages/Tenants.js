import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, CreditCard, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers';
import mockData from '../data/mockData';

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const { tenants } = mockData;

  const filteredTenants = tenants
    .filter(tenant => {
      const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || tenant.paymentStatus.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'rent':
          return b.rentAmount - a.rentAmount;
        case 'creditScore':
          return b.creditScore - a.creditScore;
        case 'leaseEnd':
          return new Date(a.leaseEnd) - new Date(b.leaseEnd);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const TenantCard = ({ tenant }) => {
    const isLeaseExpiringSoon = new Date(tenant.leaseEnd) - new Date() < 90 * 24 * 60 * 60 * 1000; // 90 days
    
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img 
              src={tenant.avatar} 
              alt={tenant.name}
              className="w-16 h-16 rounded-full border-3 border-white shadow-lg"
            />
            <div>
              <h3 className="font-bold text-xl text-gray-900">{tenant.name}</h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {tenant.property} - Unit {tenant.unit}
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <Mail className="w-4 h-4 mr-1" />
                  {tenant.email}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Phone className="w-4 h-4 mr-1" />
                  {tenant.phone}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(tenant.paymentStatus)}`}>
              {tenant.paymentStatus}
            </span>
            {isLeaseExpiringSoon && (
              <div className="flex items-center text-amber-600 text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Lease Expiring Soon
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center mb-2">
              <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Monthly Rent</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(tenant.rentAmount)}</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center mb-2">
              <CreditCard className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Credit Score</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{tenant.creditScore}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Lease Start</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{formatDate(tenant.leaseStart)}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Lease End</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{formatDate(tenant.leaseEnd)}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Recent Payment History</h4>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {tenant.paymentHistory.slice(0, 3).map((payment, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{formatDate(payment.date)}</p>
                  <p className="text-xs text-gray-500">{formatCurrency(payment.amount)}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Emergency Contact</p>
          <p className="text-sm font-medium text-gray-900">{tenant.emergencyContact}</p>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition-colors">
            Send Message
          </button>
          <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-xl font-semibold transition-colors">
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
          <p className="text-gray-600 mt-1">Manage your tenant relationships</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Tenant</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter by Status */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="due">Due</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="rent">Sort by Rent</option>
            <option value="creditScore">Sort by Credit Score</option>
            <option value="leaseEnd">Sort by Lease End</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Paid This Month</p>
              <p className="text-2xl font-bold text-emerald-600">
                {tenants.filter(t => t.paymentStatus === 'Paid').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overdue Payments</p>
              <p className="text-2xl font-bold text-red-600">
                {tenants.filter(t => t.paymentStatus === 'Overdue').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Credit Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(tenants.reduce((sum, t) => sum + t.creditScore, 0) / tenants.length)}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredTenants.length} of {tenants.length} tenants
        </p>
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredTenants.map(tenant => (
          <TenantCard key={tenant.id} tenant={tenant} />
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tenants found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new tenant.</p>
        </div>
      )}
    </div>
  );
};

export default Tenants;
