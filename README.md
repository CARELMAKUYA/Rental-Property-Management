# PropertyHub - Rental Property Management System

A comprehensive, modern web application for property owners to manage their rental property portfolio. Built with React, Tailwind CSS, and featuring beautiful charts and analytics.

![PropertyHub Dashboard](https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🌟 Features

### 🏠 Property Management
- **Property Portfolio Overview** - Visual cards showing property details, occupancy rates, and financial performance
- **Property Search & Filtering** - Advanced search by location, type, and status
- **Property Analytics** - Performance metrics and value tracking
- **Amenities Tracking** - Manage property features and amenities

### 👥 Tenant Management  
- **Tenant Profiles** - Complete tenant information with photos and contact details
- **Payment Tracking** - Monitor rent payments, due dates, and overdue accounts
- **Lease Management** - Track lease terms, expiration dates, and renewal notifications
- **Credit Score Monitoring** - Keep track of tenant creditworthiness
- **Communication Logs** - Direct messaging with tenants

### 🔧 Maintenance Management
- **Request Tracking** - Manage maintenance requests from submission to completion
- **Priority Management** - Categorize requests by urgency (High, Medium, Low)
- **Vendor Assignment** - Assign work to preferred contractors
- **Cost Estimation** - Track estimated vs actual repair costs
- **Photo Documentation** - Visual evidence of issues and repairs
- **Status Monitoring** - Real-time updates on repair progress

### 📊 Reports & Analytics
- **Financial Dashboard** - Revenue trends, expenses, and profit analysis
- **Occupancy Analytics** - Track vacancy rates and tenant turnover
- **Maintenance Reports** - Cost analysis and maintenance trends
- **Performance Metrics** - Property-wise performance comparison
- **Interactive Charts** - Beautiful visualizations using Recharts
- **Export Functionality** - Generate PDF reports

### 📱 Modern UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Clean Interface** - Professional, modern design with attention to detail
- **Intuitive Navigation** - Easy-to-use interface with clear information hierarchy
- **Real-time Updates** - Live data and notifications
- **Interactive Elements** - Smooth animations and hover effects

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest version with modern hooks and features
- **React Router DOM** - Client-side routing for seamless navigation
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Recharts** - Responsive charts library for beautiful data visualization
- **Lucide React** - Beautiful, customizable SVG icons

### Styling & Design
- **Custom Design System** - Consistent color palette and typography
- **Glassmorphism Effects** - Modern visual effects with backdrop blur
- **Responsive Grid Layouts** - Mobile-first responsive design
- **Animation & Transitions** - Smooth interactions and micro-animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/property-hub.git
   cd property-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   └── Charts.js       # Chart components
├── pages/              # Main application pages
│   ├── Dashboard.js    # Main dashboard
│   ├── Properties.js   # Property management
│   ├── Tenants.js      # Tenant management
│   ├── Maintenance.js  # Maintenance requests
│   └── Reports.js      # Analytics and reports
├── data/               # Mock data and constants
│   └── mockData.js     # Sample data for development
├── utils/              # Utility functions
│   └── helpers.js      # Common helper functions
└── App.js              # Main application component
```

## 🎨 Key Features Showcase

### Dashboard Overview
- **Real-time Metrics** - Property count, occupancy rate, monthly revenue, portfolio value
- **Quick Stats** - Overdue payments, pending maintenance, upcoming inspections
- **Interactive Charts** - Revenue trends and occupancy analytics
- **Recent Activity** - Latest property updates and maintenance requests

### Property Management
- **Visual Property Cards** - High-quality images with overlay status indicators
- **Detailed Information** - Address, type, units, income, value, and amenities
- **Performance Tracking** - Occupancy rates with visual progress bars
- **Inspection Scheduling** - Track upcoming and past inspections

### Advanced Analytics
- **Revenue Trend Analysis** - Monthly income tracking with area charts
- **Occupancy Rate Monitoring** - Line charts showing vacancy trends
- **Expense Breakdown** - Pie charts for cost categorization
- **Property Performance Comparison** - Bar charts comparing property metrics

### Maintenance Management
- **Priority-based Color Coding** - Visual indicators for urgency levels
- **Comprehensive Request Details** - Issue description, costs, assigned vendors
- **Status Tracking** - Pending, In Progress, Completed workflows
- **Photo Documentation** - Image uploads for issue verification

## 🔧 Customization

### Adding New Features
The application is built with modularity in mind. To add new features:

1. **Create new components** in the `components/` directory
2. **Add new pages** in the `pages/` directory
3. **Update routing** in `App.js`
4. **Extend mock data** in `src/data/mockData.js`

### Styling Customization
- **Tailwind Config** - Modify `tailwind.config.js` for custom colors and themes
- **Custom CSS** - Add styles in `src/index.css` or component-specific CSS files
- **Design Tokens** - Update color palette and spacing in the Tailwind configuration

### Data Integration
To connect with a real backend:

1. **Replace mock data** with API calls
2. **Add state management** (Redux/Context API) for complex data flows
3. **Implement authentication** for user management
4. **Add form handling** for data submission

## 📊 Sample Data

The application includes comprehensive mock data featuring:
- **3 Properties** - Apartment complex, single family home, and condo
- **3 Tenants** - With complete profiles and payment history
- **3 Maintenance Requests** - Various priority levels and statuses
- **Financial Data** - 7 months of revenue and expense data
- **Vendor Information** - Preferred contractors and service providers

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** - High-quality property and tenant images
- **Lucide** - Beautiful, consistent icons
- **Recharts** - Powerful charting library
- **Tailwind CSS** - Rapid UI development framework

## 📞 Support

For questions, suggestions, or support:
- Create an issue on GitHub
- Email: support@propertyhub.com
- Documentation: [View Full Documentation](docs/)

---

**PropertyHub** - Simplifying property management for modern landlords. 🏠✨
