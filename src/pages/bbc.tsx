import { useCarousel } from '../components/carousel/useCarousel';
import { Button } from '../components/carousel/sub-components/button';

const twilightArea = '192px'; //'calc(calc(100vw - 1080px) / 2)';

const BBC = ({ items }: { items: string[] }) => {
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
  });

  return (
    <div className="flex flex-col gap-2 h-full bg-black pt-8">
      <div className="relative">
        <ul
          ref={scrollAreaRef}
          className="gap-4 py-2"
          style={{
            paddingLeft: `clamp(192px, ${twilightArea}, ${twilightArea})`,
            paddingRight: `clamp(184px, ${twilightArea}, ${twilightArea})`,
          }}
        >
          <li
            key={'first'}
            className={`h-2 shrink-0`}
            style={{
              height: '2px',
              width: `clamp(192px, ${twilightArea}, ${twilightArea})`,
            }}
          />

          {items.map((url, index) => (
            <li
              key={index}
              style={{
                width: `clamp(192px, ${twilightArea}, ${twilightArea})`,
              }}
              className={`max-w-full shrink-0
                ${
                  ''
                  // index === 0 ? `ml-8` : ''
                }
              `}
            >
              <div
                className={`
              max-w-full
              shrink-0 rounded-md shadow-sm shadow-neutral-800 duration-500
              transition-all ${
                visibleIndexes.includes(index + 1)
                  ? 'opacity-100'
                  : 'opacity-40'
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
            width: `clamp(192px, ${twilightArea}, ${twilightArea})`,
          }}
        />
        <div
          className="bg-black bg-opacity-50 absolute right-0 top-0 bottom-0"
          style={{
            width: `clamp(176px, ${twilightArea}, ${twilightArea})`,
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
