import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1, ...options }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

// direction: 'up' | 'left' | 'right' | 'scale'
export function ScrollReveal({ children, delay = 0, className = '', direction = 'up' }) {
    const ref = useScrollReveal();
    const dirClass = {
        up: 'reveal',
        left: 'reveal-left',
        right: 'reveal-right',
        scale: 'reveal-scale',
    }[direction] ?? 'reveal';

    return (
        <div
            ref={ref}
            className={`${dirClass}${delay ? ` reveal-delay-${delay}` : ''} ${className}`.trim()}
        >
            {children}
        </div>
    );
}
