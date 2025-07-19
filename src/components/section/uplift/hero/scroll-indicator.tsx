"use client";

export const ScrollIndicator: React.FC = () => {
    const scrollToTarget = (targetElement: HTMLElement, duration: number) => {
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        // Easing function for smooth animation
        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    const handleClick = () => {
        const problemSection = document.getElementById('problem');
        if (problemSection) {
            scrollToTarget(problemSection, 1000); // 1000ms = 1 second duration
        }
    };

    return (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 animate-bounce cursor-pointer" onClick={handleClick}
        >
            <div className="h-10 w-6 rounded-full border border-gray-500 flex justify-center">
                <div className="h-2 w-2 rounded-full bg-cyan-400 mt-1 animate-pulse"></div>
            </div>
            <span className="text-xs text-gray-400 mt-2">Discover</span>

        </div >
    );
};