'use client';

import React from "react";
import { Button } from "@/components/button/button";
import {
  RocketIcon,
  ExternalLinkIcon,
  StarIcon,
  PlayIcon,
  ArrowRightIcon,
  CheckIcon
} from "lucide-react";
import Link from "next/link";

// Icon mapping function
const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'RocketIcon':
      return RocketIcon;
    case 'ExternalLinkIcon':
      return ExternalLinkIcon;
    case 'StarIcon':
      return StarIcon;
    case 'PlayIcon':
      return PlayIcon;
    case 'ArrowRightIcon':
      return ArrowRightIcon;
    case 'CheckIcon':
      return CheckIcon;
    default:
      return RocketIcon;
  }
};

interface CTAButton {
  text: string;
  href: string;
  variant?: "default" | "outline" | "secondary";
  icon?: string;
}

interface ProductHeroCTAProps {
  buttons?: CTAButton[];
}

export const ProductHeroCTA: React.FC<ProductHeroCTAProps> = ({ buttons }) => {
  const handleLearnMoreClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  if (!buttons || buttons.length === 0) {
    return (
      <div className="flex flex-row gap-3 sm:gap-4 justify-start w-full">
        <Button
          variant="outline"
          size="lg"
          className="flex flex-1 sm:flex-none sm:w-auto px-4 sm:px-6 py-3 border-gray-600 text-white hover:bg-white/10 text-sm sm:text-base"
          onClick={(e) => handleLearnMoreClick(e, '#features')}
        >
          <ExternalLinkIcon className="w-4 h-4 mr-2" />
          Learn More
        </Button>
        <Button size="lg" className="flex flex-1 sm:flex-none sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-sm sm:text-base">
          <RocketIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 sm:gap-4 justify-start w-full">
      {buttons.map((button, index) => {
        const IconComponent = getIconComponent(button.icon);
        const isLearnMore = button.text.toLowerCase().includes('learn');
        const isPrimary = !button.variant || button.variant === "default";

        return (
          <div
            key={index}
            className={`${isPrimary ? 'order-2' : 'order-1'} flex-1 sm:flex-none`}
          >
            {isLearnMore ? (
              <Button
                size="lg"
                variant="outline"
                className="flex w-full px-4 sm:px-6 py-3 text-sm sm:text-base border-gray-600 text-white hover:bg-white/10"
                onClick={(e) => handleLearnMoreClick(e, button.href)}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {button.text}
              </Button>
            ) : (
              <Link href={button.href} className="block w-full">
                <Button
                  size="lg"
                  variant={button.variant || "default"}
                  className={`flex w-full px-4 sm:px-6 py-3 text-sm sm:text-base ${button.variant === "outline"
                      ? "border-gray-600 text-white hover:bg-white/10"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    }`}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {button.text}
                </Button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};