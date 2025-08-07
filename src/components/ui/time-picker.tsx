'use client';

import React from 'react';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
  selectedDate?: string;
}

const TIME_SLOTS = [
  { value: '09:00', label: '9:00 AM', available: true },
  { value: '09:30', label: '9:30 AM', available: true },
  { value: '10:00', label: '10:00 AM', available: true },
  { value: '10:30', label: '10:30 AM', available: false },
  { value: '11:00', label: '11:00 AM', available: true },
  { value: '11:30', label: '11:30 AM', available: true },
  { value: '13:00', label: '1:00 PM', available: true },
  { value: '13:30', label: '1:30 PM', available: true },
  { value: '14:00', label: '2:00 PM', available: true },
  { value: '14:30', label: '2:30 PM', available: false },
  { value: '15:00', label: '3:00 PM', available: true },
  { value: '15:30', label: '3:30 PM', available: true },
  { value: '16:00', label: '4:00 PM', available: true },
  { value: '16:30', label: '4:30 PM', available: true },
];

export function TimePicker({ selectedTime, onTimeSelect, selectedDate }: TimePickerProps) {
  if (!selectedDate) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="text-center text-gray-400">
          <Clock className="h-12 w-12 mx-auto mb-3 text-gray-600" />
          <p className="text-lg font-medium">Select a date first</p>
          <p className="text-sm">Choose a date from the calendar to see available time slots</p>
        </div>
      </div>
    );
  }

  const formatSelectedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-white font-semibold text-lg mb-1">Available Times</h3>
        <p className="text-gray-400 text-sm">{formatSelectedDate(selectedDate)}</p>
      </div>

      {/* Time slots grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {TIME_SLOTS.map((slot) => {
          const isSelected = selectedTime === slot.value;
          const isAvailable = slot.available;
          
          return (
            <button
              key={slot.value}
              onClick={() => isAvailable && onTimeSelect(slot.value)}
              disabled={!isAvailable}
              className={`
                p-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isSelected
                  ? 'bg-cyan-500 text-white shadow-lg scale-105'
                  : isAvailable
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed opacity-50'
                }
              `}
            >
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                {slot.label}
              </div>
              {!isAvailable && (
                <div className="text-xs text-gray-500 mt-1">Booked</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Time zone info */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>All times shown in Bangkok timezone (UTC+7)</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Available</span>
            <div className="w-2 h-2 bg-gray-600 rounded-full ml-3"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}