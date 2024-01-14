import React, { forwardRef } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

const Root = forwardRef<HTMLUListElement, CarouselProps>(function Root(
  { children, className },
  ref,
) {
  return (
    <ul
      className={`flex overflow-auto snap-x snap-mandatory ${className}`}
      ref={ref}
    >
      {children}
    </ul>
  );
});

export { Root };
