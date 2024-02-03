import { useCarousel } from '../components/carousel/useCarousel';
import { Button } from '../components/carousel/sub-components/button';
import { useEffect, useState } from 'react';

const maxViewportWidth = 940;
const slideWidth = 300;

const getTwilightAreaWidth = (minWidth: number = 0) =>
  `${Math.max(minWidth, (window.innerWidth - maxViewportWidth) / 2)}px`;

const OsxFinder = ({ items }: { items: string[] }) => {
  const [leftTwilightAreaWidth, setLeftTwilightAreaWidth] = useState('0px');
  const [rightTwilightAreaWidth, setRightTwilightAreaWidth] = useState('0px');

  const {
    scrollAreaRef,
    scrollNextPage,
    scrollPrevPage,
    isFirstPage,
    isLastPage,
    visibleIndexes,
    scrollAreaStyle,
  } = useCarousel({
    snapPosition: 'center',
    axis: 'x',
    scrollPadding: `0 ${rightTwilightAreaWidth} 0 ${leftTwilightAreaWidth}`,
    rootMargin: `0px -${rightTwilightAreaWidth} 0px -${leftTwilightAreaWidth}`,
  });

  useEffect(() => {
    setLeftTwilightAreaWidth(getTwilightAreaWidth());
    setRightTwilightAreaWidth(getTwilightAreaWidth(slideWidth));

    const handleResize = () => {
      setRightTwilightAreaWidth(getTwilightAreaWidth(60));
      setLeftTwilightAreaWidth(getTwilightAreaWidth());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div style={{ maxWidth: maxViewportWidth }} className={`pt-8 mx-auto`}>
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
      <div className="py-4 flex flex-col gap-2 h-full bg-black">
        <div className="relative">
          <ul
            ref={scrollAreaRef}
            className="gap-4"
            style={{
              ...scrollAreaStyle,
              padding: `8px ${rightTwilightAreaWidth} 8px ${leftTwilightAreaWidth}`,
            }}
          >
            {items.map((url, index) => (
              <li
                key={index}
                style={{
                  width: `${slideWidth}px`,
                }}
                className={`max-w-full shrink-0 hover:ring-8 focus-within:ring-8 ring-gray-400 hover:ring-gray-700 rounded-md`}
              >
                <div
                  className={`max-w-full shrink-0 rounded-md shadow-sm shadow-neutral-800 duration-500 origin-center
                  transition-all ${
                    visibleIndexes.includes(index)
                      ? 'opacity-100 scale-100'
                      : 'opacity-40 scale-90'
                  }`}
                >
                  <a
                    href=""
                    key={index}
                    className="flex outline-none flex-col gap-2 h-96 w-full max-w-full overflow-hidden rounded-md relative bg-zinc-900"
                  >
                    <img
                      className="block object-cover w-full flex-shrink-0 basis-1/2 object-center "
                      src={url}
                      alt=""
                      loading="lazy"
                    />
                    <div className="p-4 text-white flex flex-col gap-2">
                      <h2 className="font-extralight text-2xl">
                        Slide title here
                      </h2>
                      <p className="font-light text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quia voluptatibus, voluptate molestias.
                      </p>
                    </div>
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
            className="bg-black bg-opacity-50 absolute z-10 right-0 top-0 bottom-0"
            style={{
              width: rightTwilightAreaWidth,
            }}
          >
            <>
              <Button
                disabled={isFirstPage}
                onClick={scrollPrevPage}
                className="absolute top-1/2 -left-1 -translate-x-full -translate-y-1/2 enabled:hover:bg-white enabled:hover:text-black"
              >
                &#8249;
              </Button>

              <Button
                disabled={isLastPage}
                onClick={scrollNextPage}
                className="absolute top-1/2 left-1 -translate-y-1/2 enabled:hover:bg-white enabled:hover:text-black"
              >
                &#8250;
              </Button>
            </>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: maxViewportWidth }} className={`mx-auto`}>
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
    </>
  );
};

export { OsxFinder };
