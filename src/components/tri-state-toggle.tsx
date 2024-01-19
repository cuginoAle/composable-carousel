import { CSSProperties, useState } from 'react';
type StateType = 0 | 1 | 2;

const snapMap: Record<StateType, ScrollLogicalPosition> = {
  0: 'start',
  1: 'center',
  2: 'end',
};

const justifyMap: Record<StateType, CSSProperties['scrollSnapAlign']> = {
  0: 'justify-start',
  1: 'justify-center',
  2: 'justify-end',
};

const TriStateToggle = ({
  onChange,
  className,
}: {
  onChange: (value: ScrollLogicalPosition) => void;
  className?: string;
}) => {
  const [state, setState] = useState<StateType>(0);

  const toggle = () => {
    const newState = (state + 1 > 2 ? 0 : state + 1) as StateType;
    setState(newState);
    onChange(snapMap[newState]);
  };

  return (
    <div
      className={`flex ${justifyMap[state]} shadow-[0px_0px_3px_rgba(0,0,0,0.4)_inset] p-1 w-12 cursor-pointer bg-slate-300 rounded-full ${className}`}
      onClick={toggle}
    >
      <div className="w-4 h-4 bg-green-900 rounded-full" />
    </div>
  );
};

export { TriStateToggle };
export type { StateType };
