"use client";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import React from "react";
import { Section } from "@/components/ui/section";

const Vision = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <Section ref={ref} id="vision" className="mx-auto bg-gradient-to-b from-gray-900/30 to-black">
            <MaskContainer
                revealText={
                    <p className="max-w-7xl mx-auto text-center text-6xl font-bold text-white">
                        Why We Exist
                    </p>
                }
                className="h-[60vh] rounded-md text-slate-800"
            >
                Software shouldn't be complicated. It should work, grow, and
                <span className="text-blue-500"> disappear</span> behind your success.
            </MaskContainer>
        </Section>
    );
});

export default Vision;

