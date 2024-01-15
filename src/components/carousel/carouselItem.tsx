import type { ReactNode } from 'react';
import { forwardRef } from 'react';

interface CarouselProps {
  children: ReactNode;
  className?: string;
  // snapPosition?: 'none' | 'start' | 'end' | 'center';
}

// const SnapPositionMap = {
//   start: 'snap-start',
//   center: 'snap-center',
//   end: 'snap-end',
//   none: 'snap-none',
// };

const CarouselItem = forwardRef(function MyComponent(
  {
    children,
    className,
  }: // snapPosition = 'start'
  CarouselProps,
  ref: React.Ref<HTMLLIElement>,
) {
  // const cn = SnapPositionMap[snapPosition];
  return (
    <li ref={ref} className={`max-w-full ${className} carousel_item`}>
      {children}
    </li>
  );
});

export { CarouselItem };
