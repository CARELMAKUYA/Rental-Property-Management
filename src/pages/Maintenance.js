import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, DollarSign, User, MapPin, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { formatCurrency, formatDate, getStatusColor, getPriorityColor } from '../utils/helpers';
import mockData from '../data/mockData';

const Maintenance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const { maintenanceRequests } = mockData;

  const filteredRequests = maintenanceRequests
    .filter(request => {
      const matchesSearch = request.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || request.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesPriority = filterPriority === 'all' || request.priority.toLowerCase() === filterPriority.toLowerCase();
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'cost':
          return (b.estimatedCost || 0) - (a.estimatedCost || 0);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return new Date(b.submittedDate) - new Date(a.submittedDate);
      }
    });

  const MaintenanceCard = ({ request }) => {
    const isOverdue = new Date(request.scheduledDate) < new Date() && request.status !== 'Completed';
    
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={`w-4 h-4 rounded-full ${getPriorityColor(request.priority)} mt-1`}></div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{request.issue}</h3>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {request.property} - Unit {request.unit}
              </div>
              {request.description && (
                <p className="text-gray-600 text-sm mb-3">{request.description}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {request.priority} Priority
            </span>
            {isOverdue && (
              <div className="flex items-center text-red-600 text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Overdue
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Submitted By</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{request.submittedBy}</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Submitted</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{formatDate(request.submittedDate)}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Scheduled</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {request.scheduledDate ? formatDate(request.scheduledDate) : 'Not scheduled'}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center mb-2">
              <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Est. Cost</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {request.estimatedCost ? formatCurrency(request.estimatedCost) : 'TBD'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">Assigned To</p>
              <p className="font-semibold text-gray-900">{request.assignedTo || 'Unassigned'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Category</p>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg font-medium">
                {request.category}
              </span>
            </div>
          </div>

          {request.actualCost && (
            <div className="bg-green-50 rounded-xl p-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Actual Cost</span>
                <span className="font-bold text-green-900">{formatCurrency(request.actualCost)}</span>
              </div>
            </div>
          )}

          {request.photos && request.photos.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Photos</p>
              <div className="flex space-x-2">
                {request.photos.map((photo, index) => (
                  <img 
                    key={index}
                    src={photo} 
                    alt={`Issue ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex space-x-3">
          {request.status === 'Pending' && (
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition-colors">
              Assign Vendor
            </button>
          )}
          {request.status === 'In Progress' && (
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-semibold transition-colors">
              Mark Complete
            </button>
          )}
          <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-xl font-semibold transition-colors">
            View Details
          </button>
        </div>
      </div>
    );
  };

  const statusCounts = {
    pending: maintenanceRequests.filter(r => r.status === 'Pending').length,
    inProgress: maintenanceRequests.filter(r => r.status === 'In Progress').length,
    completed: maintenanceRequests.filter(r => r.status === 'Completed').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Requests</h1>
          <p className="text-gray-600 mt-1">Track and manage property maintenance</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Request</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{maintenanceRequests.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-amber-600">{statusCounts.pending}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">{statusCounts.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-3xl font-bold text-emerald-600">{statusCounts.completed}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search maintenance requests..."
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
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Filter by Priority */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="cost">Sort by Cost</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredRequests.length} of {maintenanceRequests.length} requests
        </p>
        <div className="text-sm text-gray-600">
          Total Estimated Cost: <strong className="text-gray-900">
            {formatCurrency(filteredRequests.reduce((sum, r) => sum + (r.estimatedCost || 0), 0))}
          </strong>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredRequests.map(request => (
          <MaintenanceCard key={request.id} request={request} />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No maintenance requests found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or create a new request.</p>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
