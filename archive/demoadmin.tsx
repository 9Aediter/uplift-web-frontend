<div className="relative mx-auto rounded-2xl overflow-hidden h-full bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl">
          {/* Admin Dashboard with Sidebar */}
          <div className="p-2 md:p-4">
            {/* Browser Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-gray-700 rounded-lg px-3 py-1.5 ml-4">
                <span className="text-gray-300 text-xs md:text-sm">https://admin.uplift.co/dashboard</span>
              </div>
            </div>
            
            {/* Admin Interface with Sidebar */}
            <div className="bg-white rounded-xl overflow-hidden flex h-[350px] md:h-[450px] shadow-lg">
              
              {/* Sidebar - Left Panel with Toggle */}
              <div className={`${sidebarCollapsed ? 'w-12 md:w-16' : 'w-12 md:w-60'} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col border-r border-gray-700 transition-all duration-300`}>
                
                {/* Sidebar Header with Toggle */}
                <div className={`${sidebarCollapsed ? 'p-2' : 'p-2 md:p-4'} border-b border-gray-700 bg-gray-800/50`}>
                  {sidebarCollapsed ? (
                    /* Collapsed Header */
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">U</span>
                      </div>
                      <button 
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:flex p-1.5 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaBars className="text-xs" />
                      </button>
                    </div>
                  ) : (
                    /* Expanded Header */
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">U</span>
                        </div>
                        <span className="hidden md:inline text-white font-semibold text-sm">Uplift Admin</span>
                      </div>
                      
                      {/* Toggle Button */}
                      <button 
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:flex p-1.5 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                      >
                        <FaBars className="text-sm" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Navigation Menu */}
                <div className={`flex-1 ${sidebarCollapsed ? 'p-1 md:p-2' : 'p-1 md:p-3'} space-y-1`}>
                  {/* Dashboard - Active */}
                  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-1 md:px-2' : 'space-x-3 px-1 md:px-3'} py-2 md:py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md`}>
                    <FaChartBar className="text-sm flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="hidden md:inline text-sm font-medium">Dashboard</span>
                    )}
                  </div>
                  
                  {/* Users */}
                  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-1 md:px-2' : 'space-x-3 px-1 md:px-3'} py-2 md:py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200`}>
                    <FaUsers className="text-sm flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="hidden md:inline text-sm">Users</span>
                    )}
                  </div>
                  
                  {/* Roles */}
                  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-1 md:px-2' : 'space-x-3 px-1 md:px-3'} py-2 md:py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200`}>
                    <FaShieldAlt className="text-sm flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="hidden md:inline text-sm">Roles</span>
                    )}
                  </div>
                  
                  {/* Website */}
                  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-1 md:px-2' : 'space-x-3 px-1 md:px-3'} py-2 md:py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200`}>
                    <FaDesktop className="text-sm flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="hidden md:inline text-sm">Website</span>
                    )}
                  </div>
                  
                  {/* Settings */}
                  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-1 md:px-2' : 'space-x-3 px-1 md:px-3'} py-2 md:py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200`}>
                    <FaCog className="text-sm flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="hidden md:inline text-sm">Settings</span>
                    )}
                  </div>
                </div>
                
                {/* User Profile - Bottom */}
                <div className="p-1 md:p-3 border-t border-gray-700 bg-gray-800/30">
                  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2 md:space-x-3'} px-1 md:px-2 py-2`}>
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-xs">A</span>
                    </div>
                    {!sidebarCollapsed && (
                      <div className="hidden md:block">
                        <div className="text-white text-xs font-medium">Admin User</div>
                        <div className="text-gray-400 text-xs">admin@uplift.co</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Main Content Area - Right Panel */}
              <div className="flex-1 bg-gray-50 overflow-y-auto">
                <div className="p-3 md:p-6">
                  
                  {/* Page Header */}
                  <div className="mb-4 md:mb-6">
                    <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">Dashboard</h2>
                    <p className="text-xs md:text-sm text-gray-600">ภาพรวมการดำเนินงานระบบ</p>
                  </div>
                  
                  {/* Stats Cards Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                    {/* Total Revenue */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 md:p-4 border border-blue-200 shadow-sm">
                      <div className="text-xs text-blue-600 mb-1 font-medium">Total Revenue</div>
                      <div className="text-sm md:text-xl font-bold text-blue-900 mb-1">$1,250.00</div>
                      <div className="text-xs text-green-600">↗ +12.5%</div>
                    </div>
                    
                    {/* Users */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2 md:p-4 border border-green-200 shadow-sm">
                      <div className="text-xs text-green-600 mb-1 font-medium">Users</div>
                      <div className="text-sm md:text-xl font-bold text-green-900 mb-1">1,234</div>
                      <div className="text-xs text-red-600">↘ -20%</div>
                    </div>
                    
                    {/* Active Sessions */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-2 md:p-4 border border-purple-200 shadow-sm">
                      <div className="text-xs text-purple-600 mb-1 font-medium">Active</div>
                      <div className="text-sm md:text-xl font-bold text-purple-900 mb-1">45,678</div>
                      <div className="text-xs text-green-600">↗ +12.5%</div>
                    </div>
                    
                    {/* Growth */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 md:p-4 border border-orange-200 shadow-sm">
                      <div className="text-xs text-orange-600 mb-1 font-medium">Growth</div>
                      <div className="text-sm md:text-xl font-bold text-orange-900 mb-1">4.5%</div>
                      <div className="text-xs text-green-600">↗ +4.5%</div>
                    </div>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="bg-white rounded-lg p-3 md:p-6 mb-4 md:mb-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div>
                        <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1">Analytics Overview</h3>
                        <p className="text-xs text-gray-600">Performance metrics</p>
                      </div>
                      <div className="flex space-x-1 md:space-x-2">
                        <button className="bg-blue-100 text-blue-700 px-2 md:px-3 py-1 rounded text-xs font-medium">7d</button>
                        <button className="text-gray-500 px-2 md:px-3 py-1 rounded text-xs">30d</button>
                      </div>
                    </div>
                    
                    {/* Simple Chart Visualization */}
                    <div className="h-20 md:h-32 flex items-end space-x-1 md:space-x-2">
                      <div className="bg-gradient-to-t from-blue-400 to-blue-200 rounded-sm flex-1 h-[60%]"></div>
                      <div className="bg-gradient-to-t from-blue-400 to-blue-200 rounded-sm flex-1 h-[80%]"></div>
                      <div className="bg-gradient-to-t from-blue-400 to-blue-200 rounded-sm flex-1 h-[45%]"></div>
                      <div className="bg-gradient-to-t from-blue-400 to-blue-200 rounded-sm flex-1 h-[90%]"></div>
                      <div className="bg-gradient-to-t from-blue-400 to-blue-200 rounded-sm flex-1 h-[70%]"></div>
                      <div className="bg-gradient-to-t from-blue-400 to-blue-200 rounded-sm flex-1 h-[85%]"></div>
                    </div>
                  </div>
                  
                  {/* Recent Activity Table */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-3 md:px-6 py-2 md:py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900">Recent Activity</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="px-3 md:px-6 py-2 md:py-3 flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-800">User registration</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                      </div>
                      <div className="px-3 md:px-6 py-2 md:py-3 flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-800">Payment processed</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Complete</span>
                      </div>
                      <div className="px-3 md:px-6 py-2 md:py-3 flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-800">System backup</span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">Running</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>