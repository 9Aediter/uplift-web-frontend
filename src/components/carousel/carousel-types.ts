import { JSX } from "react";

export interface CarouselProps {
    items: JSX.Element[];
    initialScroll?: number;
}

export type Card = {
    src: string;
    title: string;
    category: string;
    content?: React.ReactNode;
    link?: string;
};

export interface CarouselContextType {
    onCardClose: (index: number) => void;
    currentIndex: number;
}