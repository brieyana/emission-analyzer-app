/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react';

const FeatureCard = ({ feature, description, delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`text-center slide-in-left-trans ${isVisible ? 'visible' : ''} flex flex-col gap-4 px-[60px] py-[20px] items-center justify-center border border-solid rounded-md border-blue-500 bg-blue-100`}
            style={{
                animationDelay: isVisible ? `${delay}s` : '0s',
            }}
        >
            <h3 className="text-xl font-semibold">{feature}</h3>
            <p className="leading-6 font-light">{description}</p>
        </div>
    );
};

export default FeatureCard;
