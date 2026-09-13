import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, routeKey }) => {
  return (
    <div
      key={routeKey}
      className="w-full animate-fade-in"
    >
      {children}
    </div>
  );
};
