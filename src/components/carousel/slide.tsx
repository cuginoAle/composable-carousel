import type { ReactNode } from 'react';
import { forwardRef } from 'react';

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const Slide = forwardRef(function MyComponent(
  { children, className }: SlideProps,
  ref: React.Ref<HTMLLIElement>,
) {
  return (
    <li ref={ref} className={`max-w-full ${className} slide`}>
      {children}
    </li>
  );
});

export { Slide };
