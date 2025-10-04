'use client';

import { useState } from 'react';
import { MoreHorizontal, MessageCircle, Globe, X } from 'lucide-react';
import { useLanguageSwitcher } from './language-switcher';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLocale, switchLanguage } = useLanguageSwitcher();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      icon: MessageCircle,
      label: 'Line',
      color: '#06C755',
      onClick: () => {
        window.open('https://line.me/ti/p/~@sampon', '_blank');
      },
    },
    {
      icon: Globe,
      label: currentLocale === 'th' ? 'EN' : 'TH',
      color: '#0175BC',
      onClick: () => {
        const newLocale = currentLocale === 'th' ? 'en' : 'th';
        switchLanguage(newLocale);
      },
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Menu Items - Appear above the main button */}
      <div
        className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              setIsOpen(false);
            }}
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
            }}
          >
            {/* Label */}
            <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm font-medium text-gray-800 whitespace-nowrap border border-gray-200 group-hover:shadow-xl transition-shadow">
              {item.label}
            </span>

            {/* Icon Button */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12"
              style={{ backgroundColor: item.color }}
            >
              <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
          </button>
        ))}
      </div>

      {/* Main FAB Button */}
      <button
        onClick={toggleMenu}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)'
            : 'linear-gradient(135deg, #0175BC 0%, #05A8E8 100%)',
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
        ) : (
          <MoreHorizontal className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
        )}
      </button>

      {/* Ripple Effect */}
      {isOpen && (
        <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full animate-ping opacity-20 pointer-events-none" style={{ backgroundColor: '#0175BC' }}></div>
      )}
    </div>
  );
}