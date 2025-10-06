"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    subItems?: { name: string; link: string }[];
  }[];
  className?: string;
  onItemClick?: () => void;
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
        setDropdownOpen(null);
      }}
      className={cn(
        "hidden flex-row items-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={`link-${idx}`}
          className="relative"
          onMouseEnter={() => {
            setHovered(idx);
            if (item.subItems) {
              setDropdownOpen(idx);
            }
          }}
        >
          <a
            onClick={onItemClick}
            className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 flex items-center gap-1"
            href={item.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            )}
            <span className="relative z-20">{item.name}</span>
            {item.subItems && (
              <ChevronDown className="relative z-20 w-3 h-3" />
            )}
          </a>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {item.subItems && dropdownOpen === idx && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-gray-200 dark:border-neutral-700 py-2 z-50"
                onMouseEnter={() => setDropdownOpen(idx)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {item.subItems.map((subItem, subIdx) => (
                  <a
                    key={`sub-${subIdx}`}
                    href={subItem.link}
                    onClick={onItemClick}
                    className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {subItem.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};