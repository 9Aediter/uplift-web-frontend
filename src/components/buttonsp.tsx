"use client";
import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const customButtonVariants = cva(
    "relative font-medium rounded-md inline-flex items-center justify-center transition-all duration-300 overflow-hidden group whitespace-nowrap gap-2",
    {
        variants: {
            variant: {
                primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500",
                secondary: "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500",
                outline: "bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950/30",
            },
            size: {
                sm: "px-4 py-2.5 text-sm",
                md: "px-6 py-4.5 text-base",
                lg: "px-8 py-8 text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof customButtonVariants> {
    _asChild?: boolean; // Renamed to _asChild
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        return (
            <ShadcnButton
                className={cn(
                    customButtonVariants({ variant }),
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
                {/* Animated glow effect */}
                <span
                    className="absolute inset-0 flex justify-center group-hover:w-[200%] w-0 aspect-square rounded-full bg-white/20 transition-all duration-500 group-hover:duration-1000 opacity-0 group-hover:opacity-100"></span>

                {/* Border glow for primary and secondary */}
                {variant !== "outline" && (
                    <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-md -z-10 blur-xl bg-gradient-to-r from-cyan-400 to-blue-500 transition-opacity duration-500"></span>
                )}
            </ShadcnButton>
        );
    }
);
Button.displayName = "Button";

export { Button, customButtonVariants };
