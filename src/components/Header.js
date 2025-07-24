import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, Settings, ChevronDown } from 'lucide-react';

const Header = ({ user }) => {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Tenants', path: '/tenants' },
    { name: 'Maintenance', path: '/maintenance' },
    { name: 'Reports', path: '/reports' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PropertyHub</h1>
                <p className="text-xs text-gray-500">Owner Dashboard</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search properties, tenants..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              />
              <div className="hidden md:block text-left">
                <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
