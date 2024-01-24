import { snapPosition, useCarousel } from '../components/carousel/useCarousel';
import { Button } from '../components/carousel/sub-components/button';
import { Pagination } from '../components/carousel/sub-components/pagination';
import { TriStateToggle } from '../components/tri-state-toggle';
import { useEffect, useState } from 'react';

const Demo = ({ items }: { items: string[] }) => {
  const [isLoopOn, setIsLoopOn] = useState(false);

  const [snapPosition, setSnapPosition] = useState<snapPosition>('start');

  const {
    scrollAreaRef,
    scrollNext,
    scrollPrev,
    isFirstPage,
    isLastPage,
    visibleIndexes,
    scrollToIndex,
  } = useCarousel({
    snapPosition: snapPosition,
    axis: 'x',
  });

  const gotoToNextSlide = () => {
    if (isLastPage) {
      scrollToIndex(0);
    } else {
      scrollNext();
    }
  };
  useEffect(() => {
    if (isLoopOn) {
      const interval = setInterval(gotoToNextSlide, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isLoopOn, isLastPage, scrollNext, scrollToIndex]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <ul ref={scrollAreaRef} className="gap-4 py-2">
          {items.map((url, index) => (
            <li key={index} className="max-w-full">
              <div
                className={`
              max-w-full
              shrink-0 rounded-md shadow-sm shadow-neutral-800 duration-500
              transition-all ${
                visibleIndexes.includes(index) ? 'opacity-100' : 'opacity-20'
              }`}
              >
                <a
                  href=""
                  key={index}
                  className="block h-96 w-96 max-w-full overflow-hidden rounded-md relative"
                >
                  <img
                    className="block object-cover w-full h-full object-center "
                    src={url}
                    alt=""
                  />
                  <span className="absolute flex items-center justify-center top-2 left-2 text-3xl font-extrabold text-red-800 bg-white bg-opacity-75 h-12 w-12 rounded-full">
                    {index + 1}
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ul>

        <Button
          disabled={isFirstPage}
          onClick={scrollPrev}
          className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
        >
          &#8249;
        </Button>

        <Button
          disabled={isLastPage}
          onClick={scrollNext}
          className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
        >
          &#8250;
        </Button>
      </div>
      <div className="flex justify-center items-center gap-2 relative h-6">
        <Pagination
          visibleIndexes={visibleIndexes}
          itemCount={items.length}
          onClick={scrollToIndex}
        />

        <div className="absolute right-0">
          <TriStateToggle onChange={setSnapPosition} />
        </div>
      </div>
      <button
        onClick={() => {
          if (!isLoopOn) gotoToNextSlide();
          setIsLoopOn(!isLoopOn);
        }}
      >
        {isLoopOn ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export { Demo };
