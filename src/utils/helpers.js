// Utility functions for the Property Management System

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateLong = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getStatusColor = (status) => {
  const statusColors = {
    'Paid': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Due': 'bg-amber-100 text-amber-800 border-amber-200',
    'Overdue': 'bg-red-100 text-red-800 border-red-200',
    'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'Scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
    'Excellent': 'bg-emerald-100/90 text-emerald-800',
    'Good': 'bg-blue-100/90 text-blue-800',
    'Needs Attention': 'bg-red-100/90 text-red-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getPriorityColor = (priority) => {
  const priorityColors = {
    'High': 'bg-red-500',
    'Medium': 'bg-amber-500',
    'Low': 'bg-emerald-500',
  };
  return priorityColors[priority] || 'bg-gray-500';
};

export const calculateOccupancyRate = (properties) => {
  const totalUnits = properties.reduce((sum, prop) => sum + prop.units, 0);
  const occupiedUnits = properties.reduce((sum, prop) => sum + prop.occupied, 0);
  return totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
};

export const calculateTotalIncome = (properties) => {
  return properties.reduce((sum, prop) => sum + prop.monthlyIncome, 0);
};

export const calculateTotalValue = (properties) => {
  return properties.reduce((sum, prop) => sum + prop.value, 0);
};

export const getOverdueCount = (tenants) => {
  return tenants.filter(tenant => tenant.paymentStatus === 'Overdue').length;
};

export const getMaintenanceByStatus = (requests, status) => {
  return requests.filter(request => request.status === status);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
