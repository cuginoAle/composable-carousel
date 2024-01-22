import { useCarousel } from '../components/carousel/useCarousel';
import { Button } from '../components/carousel/sub-components/button';
import { useEffect, useState } from 'react';

const maxViewportWidth = 1280;
const slideWidth = 192;

const getTwilightAreaWidth = (minWidth: number = 0) => {
  return `${Math.max(minWidth, (window.innerWidth - maxViewportWidth) / 2)}px`;
};
const BBC = ({ items }: { items: string[] }) => {
  const [leftTwilightAreaWidth, setLeftTwilightAreaWidth] = useState('');
  const [rightTwilightAreaWidth, setRightTwilightAreaWidth] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  const {
    scrollAreaRef,
    scrollNextPage,
    scrollPrevPage,

    isFirstPage,
    isLastPage,
    visibleIndexes,
  } = useCarousel({
    snapPosition: 'start',
    axis: 'x',
    scrollPadding: `0 ${rightTwilightAreaWidth} 0 ${leftTwilightAreaWidth}`,
  });

  useEffect(() => {
    setLeftTwilightAreaWidth(getTwilightAreaWidth());
    setRightTwilightAreaWidth(getTwilightAreaWidth(slideWidth));

    const handleResize = () => {
      setRightTwilightAreaWidth(
        getTwilightAreaWidth(window.innerWidth < 768 ? 60 : slideWidth),
      );
      setLeftTwilightAreaWidth(getTwilightAreaWidth());
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="pt-8 max-w-[1280px] mx-auto">
        <div className="p-8 bg-slate-200">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
          rerum quidem esse perspiciatis? Distinctio, commodi. Dolor culpa quasi
          fuga, numquam ratione deleniti minus nostrum vero temporibus.
          Praesentium eaque culpa sequi. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Obcaecati rerum quidem esse perspiciatis?
          Distinctio, commodi. Dolor culpa quasi fuga, numquam ratione deleniti
          minus nostrum vero temporibus. Praesentium eaque culpa sequi. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati rerum
          quidem esse perspiciatis? Distinctio, commodi. Dolor culpa quasi fuga,
          numquam ratione deleniti minus nostrum vero temporibus. Praesentium
          eaque culpa sequi.
        </div>
      </div>
      <div className=" py-8 flex flex-col gap-2 h-full bg-black">
        <div className="relative">
          <ul
            ref={scrollAreaRef}
            className="gap-4 py-2"
            style={{
              padding: `0 ${rightTwilightAreaWidth} 0 ${leftTwilightAreaWidth}`,
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
              width: leftTwilightAreaWidth,
            }}
          />
          <div
            className="bg-black bg-opacity-50 absolute right-0 top-0 bottom-0"
            style={{
              width: rightTwilightAreaWidth,
            }}
          >
            {!isMobile && (
              <>
                <Button
                  disabled={isFirstPage}
                  onClick={scrollPrevPage}
                  className="absolute top-1/2 -left-2 -translate-x-full -translate-y-1/2 enabled:hover:bg-white enabled:hover:text-black"
                >
                  &#8249;
                </Button>

                <Button
                  disabled={isLastPage}
                  onClick={scrollNextPage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 enabled:hover:bg-white enabled:hover:text-black"
                >
                  &#8250;
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { BBC };
