import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, MapPin, Users, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency, formatDate, getStatusColor } from '../utils/helpers';
import mockData from '../data/mockData';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('address');

  const { properties } = mockData;

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || property.type.toLowerCase().includes(filterType.toLowerCase());
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'income':
          return b.monthlyIncome - a.monthlyIncome;
        case 'value':
          return b.value - a.value;
        case 'occupancy':
          return (b.occupied / b.units) - (a.occupied / a.units);
        default:
          return a.address.localeCompare(b.address);
      }
    });

  const PropertyCard = ({ property }) => {
    const occupancyRate = Math.round((property.occupied / property.units) * 100);
    
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="h-48 relative overflow-hidden">
          <img 
            src={property.image} 
            alt={property.address}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(property.status)}`}>
              {property.status}
            </span>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
              {property.type}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{property.address}</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {property.city}, {property.state} {property.zipCode}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center mb-2">
                <Users className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-500">Occupancy</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{occupancyRate}%</p>
              <p className="text-xs text-gray-500">{property.occupied}/{property.units} units</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center mb-2">
                <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-500">Monthly Income</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(property.monthlyIncome)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Property Value</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(property.value)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Built</p>
              <p className="text-lg font-bold text-gray-900">{property.yearBuilt}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Next Inspection</span>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(property.nextInspection)}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Link 
              to={`/properties/${property.id}`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition-colors text-center block"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600 mt-1">Manage your property portfolio</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Property</span>
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
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter by Type */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
            </select>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="address">Sort by Address</option>
            <option value="income">Sort by Income</option>
            <option value="value">Sort by Value</option>
            <option value="occupancy">Sort by Occupancy</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredProperties.length} of {properties.length} properties
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Total Value: <strong className="text-gray-900">{formatCurrency(filteredProperties.reduce((sum, p) => sum + p.value, 0))}</strong></span>
          <span>Monthly Income: <strong className="text-gray-900">{formatCurrency(filteredProperties.reduce((sum, p) => sum + p.monthlyIncome, 0))}</strong></span>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new property.</p>
        </div>
      )}
    </div>
  );
};

export default Properties;
