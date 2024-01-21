import { useCarousel } from '../components/carousel/useCarousel';
import { Button } from '../components/carousel/sub-components/button';
import { useEffect, useState } from 'react';

const maxViewportWidth = 1280;
const slideWidth = 192;

const getTwilightAreaWidth = (minWidth: number) => {
  return `${Math.max(minWidth, (window.innerWidth - maxViewportWidth) / 2)}px`;
};
const BBC = ({ items }: { items: string[] }) => {
  const [twilightAreaWidth, setTwilightAreaWidth] = useState('');

  const {
    scrollAreaRef,
    scrollNext,
    scrollPrev,
    isFirstPage,
    isLastPage,
    visibleIndexes,
  } = useCarousel({
    snapPosition: 'start',
    axis: 'x',
    scrollPadding: `0 ${twilightAreaWidth} 0 ${twilightAreaWidth}`,
  });

  useEffect(() => {
    setTwilightAreaWidth(getTwilightAreaWidth(slideWidth));

    const handleResize = () => {
      setTwilightAreaWidth(getTwilightAreaWidth(slideWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 h-full bg-black pt-8">
      <div className="relative">
        <ul
          ref={scrollAreaRef}
          className="gap-4 py-2"
          style={{
            padding: `0 ${twilightAreaWidth}`,
          }}
        >
          {items.map((url, index) => (
            <li
              key={index}
              style={{
                width: `${slideWidth}px`,
              }}
              className={`max-w-full shrink-0`}
            >
              <div
                className={`
              max-w-full
              shrink-0 rounded-md shadow-sm shadow-neutral-800 duration-500
              transition-all ${
                visibleIndexes.includes(index) ? 'opacity-100' : 'opacity-40'
              }`}
              >
                <a
                  href=""
                  key={index}
                  className="block h-96 w-full max-w-full overflow-hidden rounded-md relative"
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

        <div
          className="bg-black bg-opacity-50 absolute left-0 top-0 bottom-0"
          style={{
            width: `clamp(${slideWidth}px, ${twilightAreaWidth}, ${twilightAreaWidth})`,
          }}
        />
        <div
          className="bg-black bg-opacity-50 absolute right-0 top-0 bottom-0"
          style={{
            width: `clamp(${slideWidth}px, ${twilightAreaWidth}, ${twilightAreaWidth})`,
          }}
        >
          <Button
            disabled={isFirstPage}
            onClick={scrollPrev}
            className="absolute top-1/2 -left-2 -translate-x-full -translate-y-1/2"
          >
            &#8249;
          </Button>

          <Button
            disabled={isLastPage}
            onClick={scrollNext}
            className="absolute top-1/2 left-2 -translate-y-1/2"
          >
            &#8250;
          </Button>
        </div>
      </div>
    </div>
  );
};

export { BBC };
