import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, routeKey }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 20);
    return () => clearTimeout(timer);
  }, [routeKey]);

  return (
    <div
      key={routeKey}
      className="transition-all"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.99)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};
