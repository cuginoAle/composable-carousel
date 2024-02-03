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
    scrollAreaStyle,
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
      <h1>An accessible carousel</h1>
      <input
        type="text"
        placeholder="Search..."
        className="border border-slate-600 bg-slate-300 p-1"
      />
      <section className="relative">
        <a
          className="sr-only focus:w-auto focus:h-auto focus:[clip:auto] bg-white p-2 z-10"
          href="#carousel_end"
          aria-hidden="true"
        >
          Skip to carousel end
        </a>
        <ul
          id="carousel_start"
          ref={scrollAreaRef}
          style={scrollAreaStyle}
          className="gap-4 py-2"
        >
          {items.map((url, index) => (
            <li key={index} className="max-w-full">
              <div
                className={`max-w-full shrink-0 rounded-md shadow-sm shadow-neutral-800 duration-500
                  transition-all ${
                    visibleIndexes.includes(index)
                      ? 'opacity-100'
                      : 'opacity-20'
                  }`}
              >
                <a
                  href=""
                  key={index}
                  className="block h-96 w-96 max-w-full overflow-hidden rounded-md relative outline-none group"
                  onFocus={() => scrollToIndex(index)}
                >
                  <img
                    className="block object-cover w-full h-full object-center "
                    src={url}
                    alt=""
                    loading="lazy"
                  />
                  <span className="absolute inset-0 group-focus-visible:ring-4 rounded-md ring-inset ring-red-800 ring-opacity-80" />

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
          aria-hidden="true"
        >
          &#8249;
        </Button>

        <Button
          disabled={isLastPage}
          onClick={scrollNext}
          className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          &#8250;
        </Button>
        <div className="flex justify-center items-center gap-2 relative h-6">
          <Pagination
            visibleIndexes={visibleIndexes}
            itemCount={items.length}
            onClick={scrollToIndex}
            aria-hidden="true"
          />

          <div className="absolute right-0">
            <TriStateToggle onChange={setSnapPosition} />
          </div>
        </div>
        <a
          className="sr-only focus:w-auto focus:h-auto focus:[clip:auto] bg-white p-2"
          href="#carousel_start"
          aria-hidden="true"
        >
          Skip to carousel start
        </a>
        <p id="carousel_end" className="sr-only">
          End of carousel
        </p>
      </section>
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
