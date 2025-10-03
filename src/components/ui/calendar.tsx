'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  minDate?: Date;
}

export function Calendar({ selectedDate, onDateSelect, minDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = new Date();
  const minimumDate = minDate || today;
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const isDateDisabled = (date: number) => {
    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    return currentDate < minimumDate;
  };
  
  const isDateSelected = (date: number) => {
    if (!selectedDate) return false;
    const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date).toISOString().split('T')[0];
    return dateStr === selectedDate;
  };
  
  const handleDateClick = (date: number) => {
    if (isDateDisabled(date)) return;
    
    const selectedDateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
    const dateStr = selectedDateObj.toISOString().split('T')[0];
    onDateSelect(dateStr);
  };
  
  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  
  // Days of the month
  for (let date = 1; date <= daysInMonth; date++) {
    const isDisabled = isDateDisabled(date);
    const isSelected = isDateSelected(date);
    const isToday = today.getDate() === date && 
                    today.getMonth() === currentMonth.getMonth() && 
                    today.getFullYear() === currentMonth.getFullYear();
    
    calendarDays.push(
      <button
        key={date}
        onClick={() => handleDateClick(date)}
        disabled={isDisabled}
        className={`
          h-10 w-10 rounded-lg text-sm font-medium transition-colors duration-200
          ${isSelected 
            ? 'bg-cyan-500 text-white shadow-lg' 
            : isDisabled 
              ? 'text-gray-600 cursor-not-allowed' 
              : isToday
                ? 'bg-cyan-100 text-cyan-700 border-2 border-cyan-500'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }
        `}
      >
        {date}
      </button>
    );
  }
  
  const canGoPrevious = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1) > 
                        new Date(minimumDate.getFullYear(), minimumDate.getMonth(), 1);
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            canGoPrevious 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-600 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <h3 className="text-white font-semibold text-lg">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-gray-400 text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
      
      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded" />
            <span className="text-gray-400">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-100 border-2 border-cyan-500 rounded" />
            <span className="text-gray-400">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-600 rounded" />
            <span className="text-gray-400">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
}