"use client";

import React, { useState } from "react";
import { FaDesktop, FaDatabase, FaShieldAlt, FaChartBar, FaUsers, FaCog, FaBars, FaBell, FaUser } from "react-icons/fa";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";

// Mock Header Component
const MockHeader = ({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) => {
  return (
    <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <FaBars className="text-sm" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground relative">
          <FaBell className="text-sm" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-xs" />
          </div>
          <span className="text-sm text-muted-foreground font-medium hidden sm:block">Admin</span>
        </div>
      </div>
    </div>
  );
};

// Mock Sidebar Component for Demo
const MockSidebar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={`${collapsed ? 'w-12 md:w-16' : 'w-48 md:w-64'} bg-gradient-to-b from-card via-muted to-card flex flex-col border-r border-border transition-all duration-300 flex-shrink-0`}>
      
      {/* Header */}
      <div className={`${collapsed ? 'p-1 md:p-2' : 'p-2 md:p-4'} border-b border-border bg-muted/50`}>
        {collapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xs md:text-sm">U</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xs md:text-sm">U</span>
            </div>
            <span className="text-foreground font-semibold text-xs md:text-sm">Uplift Admin</span>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className={`flex-1 ${collapsed ? 'p-1 md:p-2' : 'p-2 md:p-3'} space-y-1`}>
        {/* Dashboard - Active */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-1 md:px-2' : 'space-x-2 md:space-x-3 px-2 md:px-3'} py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md`}>
          <FaChartBar className="text-xs md:text-sm flex-shrink-0" />
          {!collapsed && <span className="text-xs md:text-sm font-medium">Dashboard</span>}
        </div>
        
        {/* Users */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-1 md:px-2' : 'space-x-2 md:space-x-3 px-2 md:px-3'} py-2 md:py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200`}>
          <FaUsers className="text-xs md:text-sm flex-shrink-0" />
          {!collapsed && <span className="text-xs md:text-sm">Users</span>}
        </div>
        
        {/* Roles */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-1 md:px-2' : 'space-x-2 md:space-x-3 px-2 md:px-3'} py-2 md:py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200`}>
          <FaShieldAlt className="text-xs md:text-sm flex-shrink-0" />
          {!collapsed && <span className="text-xs md:text-sm">Roles</span>}
        </div>
        
        {/* Website */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-1 md:px-2' : 'space-x-2 md:space-x-3 px-2 md:px-3'} py-2 md:py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200`}>
          <FaDesktop className="text-xs md:text-sm flex-shrink-0" />
          {!collapsed && <span className="text-xs md:text-sm">Website</span>}
        </div>
        
        {/* Settings */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-1 md:px-2' : 'space-x-2 md:space-x-3 px-2 md:px-3'} py-2 md:py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200`}>
          <FaCog className="text-xs md:text-sm flex-shrink-0" />
          {!collapsed && <span className="text-xs md:text-sm">Settings</span>}
        </div>
      </div>
      
      {/* User Profile */}
      <div className={`${collapsed ? 'p-1 md:p-2' : 'p-2 md:p-3'} border-t border-border bg-muted/30`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2 md:space-x-3'} py-1 md:py-2`}>
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          {!collapsed && (
            <div>
              <div className="text-foreground text-xs font-medium">Admin User</div>
              <div className="text-muted-foreground text-xs">admin@uplift.co</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Chart Data
const chartData = [
  { date: "Jan 1", users: 186, revenue: 80 },
  { date: "Jan 8", users: 305, revenue: 200 },
  { date: "Jan 15", users: 237, revenue: 120 },
  { date: "Jan 22", users: 373, revenue: 190 },
  { date: "Jan 29", users: 209, revenue: 130 },
  { date: "Feb 5", users: 414, revenue: 140 },
  { date: "Feb 12", users: 389, revenue: 160 },
  { date: "Feb 19", users: 520, revenue: 210 },
  { date: "Feb 26", users: 467, revenue: 180 },
  { date: "Mar 5", users: 543, revenue: 220 },
  { date: "Mar 12", users: 489, revenue: 190 },
  { date: "Mar 19", users: 612, revenue: 240 }
];

// Mock Main Content for Demo
const MockMainContent = () => {
  return (
    <div className="flex-1 bg-muted/20 overflow-y-auto min-w-0">
      <div className="p-2 sm:p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4 border border-blue-200">
            <div className="text-xs text-blue-600 mb-1 font-medium">Total Revenue</div>
            <div className="text-lg sm:text-xl font-bold text-foreground mb-1">$24,500</div>
            <div className="text-xs text-green-600">↗ +12.5%</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 sm:p-4 border border-green-200">
            <div className="text-xs text-green-600 mb-1 font-medium">Users</div>
            <div className="text-lg sm:text-xl font-bold text-foreground mb-1">1,234</div>
            <div className="text-xs text-green-600">↗ +8.2%</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 sm:p-4 border border-purple-200">
            <div className="text-xs text-purple-600 mb-1 font-medium">Active Sessions</div>
            <div className="text-lg sm:text-xl font-bold text-foreground mb-1">456</div>
            <div className="text-xs text-green-600">↗ +5.3%</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 sm:p-4 border border-orange-200">
            <div className="text-xs text-orange-600 mb-1 font-medium">Conversion</div>
            <div className="text-lg sm:text-xl font-bold text-foreground mb-1">3.2%</div>
            <div className="text-xs text-green-600">↗ +1.1%</div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="mb-3 sm:mb-0">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Analytics Overview</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">User growth and revenue trends</p>
            </div>
            <div className="flex space-x-1 sm:space-x-2">
              <button className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium">7d</button>
              <button className="text-muted-foreground hover:bg-muted px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs">30d</button>
              <button className="text-muted-foreground hover:bg-muted px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs">90d</button>
            </div>
          </div>
          
          <div className="h-48 sm:h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#usersGradient)"
                  name="Users"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Table */}
        <div className="bg-card rounded-lg border border-border">
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-border bg-muted/20">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Recent Activity</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-foreground">New user registration</span>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium self-start">2m ago</span>
            </div>
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-foreground">Payment processed - $150.00</span>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium self-start">5m ago</span>
            </div>
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-foreground">System backup completed</span>
              </div>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium self-start">10m ago</span>
            </div>
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-foreground">Database optimization started</span>
              </div>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium self-start">15m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminInterface = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="bg-card rounded-xl overflow-hidden flex flex-col h-[400px] sm:h-[500px] md:h-[600px] shadow-lg">
      <MockHeader 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className="flex flex-1 min-h-0">
        <MockSidebar collapsed={sidebarCollapsed} />
        <MockMainContent />
      </div>
    </div>
  );
};