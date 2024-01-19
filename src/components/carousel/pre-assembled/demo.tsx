import { useCarousel } from '../useCarousel';
import { Button } from '../sub-components/button';
import { Pagination } from '../sub-components/pagination';

// Some dummy items to fill the carousel:
const items = new Array(20)
  .fill(0)
  .map(() => `https://picsum.photos/seed/${Math.random() * 10}/600/300`);

const Demo = () => {
  const {
    scrollAreaRef,
    scrollNext,
    scrollPrev,
    isFirstPage,
    isLastPage,
    visibleIndexes,
    scrollToIndex,
  } = useCarousel({
    snapPosition: 'center',
    axis: 'x',
  });

  return (
    <>
      <div className="relative flex flex-col gap-8">
        <ul ref={scrollAreaRef} className="gap-4 py-2">
          {items.map((url, index) => (
            <li key={index}>
              <div
                className={`
              max-w-full
              shrink-0 rounded-md shadow-sm shadow-neutral-800 duration-500
              transition-all ${
                visibleIndexes.includes(index) ? 'opacity-100' : 'opacity-20'
              }`}
              >
                <a
                  href="https://picsum.photos"
                  key={index}
                  className="block h-96 w-96 overflow-hidden rounded-md relative"
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

        {!isFirstPage && (
          <Button
            onClick={scrollPrev}
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
          >
            &#8249;
          </Button>
        )}

        {!isLastPage && (
          <Button
            onClick={scrollNext}
            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
          >
            &#8250;
          </Button>
        )}
      </div>
      <div className="flex justify-center items-center gap-2">
        <Pagination
          visibleIndexes={visibleIndexes}
          itemCount={items.length}
          onClick={scrollToIndex}
        />
      </div>
    </>
  );
};

export { Demo };
