interface PaginationProps
  extends Omit<React.HTMLProps<HTMLElement>, 'onClick'> {
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
  ...rest
}: PaginationProps) => {
  const dots = new Array(itemCount).fill(0);

  return (
    <nav className={className} {...rest}>
      <ul className="flex gap-1">
        {dots.map((_, index) => (
          <li key={index} className="page-item">
            <button
              tabIndex={-1}
              onClick={() => onClick(index)}
              className={`text-xs w-2 h-2 bg-black bg-opacity-20 flex rounded-full  ${
                visibleIndexes.includes(index)
                  ? 'bg-opacity-60 ring-4 ring-gray-300'
                  : ''
              }`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Pagination };
