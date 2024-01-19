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

  return (
    <nav className={className}>
      <ul className="flex gap-1">
        {dots.map((_, index) => (
          <li key={index} className="page-item">
            <button
              onClick={() => onClick(index)}
              className={`text-xs w-2 h-2 bg-black bg-opacity-20 flex rounded-full ${
                visibleIndexes.includes(index) ? 'bg-opacity-60' : ''
              }`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Pagination };
