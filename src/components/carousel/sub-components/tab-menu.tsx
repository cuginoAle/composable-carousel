import { useLayoutEffect, useRef } from 'react';

interface PaginationProps {
  items: string[];
  selectedIndex: number;
  onClick: (pageNumber: number) => void;
  className?: string;
}

const TabMenu = ({
  items,
  selectedIndex,
  onClick,
  className,
}: PaginationProps) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    highlightIndex(selectedIndex);
  }, [selectedIndex]);

  const handleOnClick = (index: number) => {
    highlightIndex(index);
    onClick(index);
  };

  const highlightIndex = (index: number) => {
    if (ulRef.current && selectorRef.current) {
      const ul = ulRef.current;
      const selector = selectorRef.current;
      const li = ul.children[index] as HTMLLIElement;
      const button = li.children[0] as HTMLButtonElement;

      selector.style.width = `${button.offsetWidth}px`;
      selector.style.height = `${button.offsetHeight}px`;
      selector.style.top = `${button.offsetTop}px`;
      selector.style.left = `${button.offsetLeft}px`;
    }
  };
  return (
    <nav className={`${className} relative`}>
      <div
        className="bg-black bg-opacity-50 rounded-sm absolute transition-all duration-500 border-b-4 border-yellow-300"
        ref={selectorRef}
      />
      <ul ref={ulRef} className="flex gap-1 relative">
        {items.map((item, index) => (
          <li key={index} className="page-item">
            <button
              onClick={() => handleOnClick(index)}
              className={`px-4 py-1 font-extralight bg-black bg-opacity-10 flex text-lg rounded-sm transition-colors duration-300 ${
                selectedIndex === index ? 'text-white' : 'text-black'
              }  `}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { TabMenu };
