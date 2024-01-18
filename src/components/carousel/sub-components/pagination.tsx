interface PaginationProps {
  itemCount: number;
  visibleIndexes: number[];
  onClick: (pageNumber: number) => void;
  className?: string;
}

const Pagination = ({
  itemCount,
  visibleIndexes,
  onClick,
  className,
}: PaginationProps) => {
  const dots = new Array(itemCount).fill(0);

  // map() creates a new array with the results of calling a function for every array element
  return (
    <nav className={className}>
      <ul className="flex gap-1">
        {dots.map((_, index) => (
          <li key={index} className="page-item">
            <a
              onClick={() => onClick(index)}
              href="!#"
              className={`text-xs w-2 h-2 bg-black bg-opacity-20 flex rounded-full ${
                visibleIndexes.includes(index) ? 'bg-opacity-60' : ''
              }`}
            ></a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Pagination };
