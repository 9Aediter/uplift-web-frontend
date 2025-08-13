"use client";
import React, { useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { FaDesktop, FaDatabase, FaShieldAlt, FaChartBar, FaUsers, FaCog, FaBars, FaBell, FaUser } from "react-icons/fa";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";

// Mock Header Component
const MockHeader = ({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) => {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FaBars className="text-sm" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative">
          <FaBell className="text-sm" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-xs" />
          </div>
          <span className="text-sm text-gray-700 font-medium hidden sm:block">Admin</span>
        </div>
      </div>
    </div>
  );
};

// Mock Sidebar Component for Demo (ไม่ใช้ component จริง)
const MockSidebar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col border-r border-gray-700 transition-all duration-300`}>
      
      {/* Header */}
      <div className={`${collapsed ? 'p-2' : 'p-4'} border-b border-gray-700 bg-gray-800/50`}>
        {collapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">U</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-white font-semibold text-sm">Uplift Admin</span>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className={`flex-1 ${collapsed ? 'p-2' : 'p-3'} space-y-1`}>
        {/* Dashboard - Active */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md`}>
          <FaChartBar className="text-sm flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
        </div>
        
        {/* Users */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200`}>
          <FaUsers className="text-sm flex-shrink-0" />
          {!collapsed && <span className="text-sm">Users</span>}
        </div>
        
        {/* Roles */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200`}>
          <FaShieldAlt className="text-sm flex-shrink-0" />
          {!collapsed && <span className="text-sm">Roles</span>}
        </div>
        
        {/* Website */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200`}>
          <FaDesktop className="text-sm flex-shrink-0" />
          {!collapsed && <span className="text-sm">Website</span>}
        </div>
        
        {/* Settings */}
        <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200`}>
          <FaCog className="text-sm flex-shrink-0" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </div>
      </div>
      
      {/* User Profile */}
      <div className={`${collapsed ? 'p-2' : 'p-3'} border-t border-gray-700 bg-gray-800/30`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} py-2`}>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          {!collapsed && (
            <div>
              <div className="text-white text-xs font-medium">Admin User</div>
              <div className="text-gray-400 text-xs">admin@uplift.co</div>
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
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="text-xs text-blue-600 mb-1 font-medium">Total Revenue</div>
            <div className="text-xl font-bold text-blue-900 mb-1">$24,500</div>
            <div className="text-xs text-green-600">↗ +12.5%</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="text-xs text-green-600 mb-1 font-medium">Users</div>
            <div className="text-xl font-bold text-green-900 mb-1">1,234</div>
            <div className="text-xs text-green-600">↗ +8.2%</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="text-xs text-purple-600 mb-1 font-medium">Active Sessions</div>
            <div className="text-xl font-bold text-purple-900 mb-1">456</div>
            <div className="text-xs text-green-600">↗ +5.3%</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="text-xs text-orange-600 mb-1 font-medium">Conversion</div>
            <div className="text-xl font-bold text-orange-900 mb-1">3.2%</div>
            <div className="text-xs text-green-600">↗ +1.1%</div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Analytics Overview</h3>
              <p className="text-sm text-gray-600">User growth and revenue trends</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-xs font-medium">7d</button>
              <button className="text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-md text-xs">30d</button>
              <button className="text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-md text-xs">90d</button>
            </div>
          </div>
          
          <div className="h-64">
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
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
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
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-800">New user registration</span>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">2m ago</span>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-800">Payment processed - $150.00</span>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">5m ago</span>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-gray-800">System backup completed</span>
              </div>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">10m ago</span>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm text-gray-800">Database optimization started</span>
              </div>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">15m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function DemoAdmin() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex flex-col overflow-hidden bg-gradient-to-b from-gray-900/30 to-black">
      <ContainerScroll
        titleComponent={
          <>
            <div className="text-center space-y-6">
              <div className="w-fit mb-8 mx-auto inline-flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20">
                <FaDesktop className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-300">Web Development</span>
              </div>
              <h1 className="text-4xl font-semibold text-white">
                ระบบหลังบ้านที่ <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  ทรงพลัง
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                พัฒนาระบบบริหารจัดการและแดชบอร์ดที่ตอบสนองความต้องการธุรกิจ 
                ด้วยเทคโนโลยีเว็บที่ทันสมัยและปลอดภัย
              </p>
              
              {/* Service Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaChartBar className="text-blue-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">Analytics</h3>
                  <p className="text-gray-400 text-xs">แดชบอร์ด Real-time</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaDatabase className="text-green-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">Database</h3>
                  <p className="text-gray-400 text-xs">ฐานข้อมูลมีประสิทธิภาพ</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaShieldAlt className="text-purple-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">Security</h3>
                  <p className="text-gray-400 text-xs">ความปลอดภัยสูง</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaDesktop className="text-red-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">Responsive</h3>
                  <p className="text-gray-400 text-xs">ใช้งานทุกอุปกรณ์</p>
                </div>
              </div>
            </div>
          </>
        }
      >
        <div className="relative mx-auto rounded-2xl overflow-hidden h-full bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl">
          {/* Browser Header */}
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-gray-700 rounded-lg px-3 py-1.5 ml-4">
                <span className="text-gray-300 text-sm">https://admin.uplift.co/dashboard</span>
              </div>
            </div>
            
            {/* Admin Interface */}
            <div className="bg-white rounded-xl overflow-hidden flex flex-col h-[500px] shadow-lg">
              <MockHeader 
                collapsed={sidebarCollapsed} 
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
              />
              <div className="flex flex-1">
                <MockSidebar collapsed={sidebarCollapsed} />
                <MockMainContent />
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}