import type { ReactNode } from 'react';
import { forwardRef } from 'react';

interface CarouselProps {
  children: ReactNode;
  className?: string;
}

const CarouselItem = forwardRef(function MyComponent(
  { children, className }: CarouselProps,
  ref: React.Ref<HTMLLIElement>,
) {
  return (
    <li
      ref={ref}
      className={`snap-center max-w-full ${className} carousel_item`}
    >
      {children}
    </li>
  );
});

export { CarouselItem };
