import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`w-12 h-12 flex items-center justify-center font-semibold text-3xl rounded-md text-white bg-black bg-opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button };
