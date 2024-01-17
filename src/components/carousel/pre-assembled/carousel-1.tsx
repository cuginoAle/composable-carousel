import React from 'react';
import { Carousel } from '../';

// Some dummy items to fill the carousel:
const items = new Array(20).fill(0);

const Carousel1 = () => {
  const {
    scrollToIndex,
    scrollNextPage,
    scrollPrevPage,
    scrollNext,
    scrollPrev,
    isFirstPage,
    isLastPage,
    visibleIndexes,
    scrollAreaRef,
  } = Carousel.useCarousel({
    snapPosition: 'center',
    axis: 'x',
  });

  return (
    <div className="relative flex flex-col gap-8">
      <ul ref={scrollAreaRef} className="gap-4 pb-8">
        {items.map((_node, index) => (
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
                // style={{ width: Math.random() * 300 + 200, maxWidth: '100%' }}
              >
                <img
                  className="block object-cover w-full h-full object-center "
                  src={`https://picsum.photos/seed/${
                    Math.random() * 10
                  }/600/300`}
                  alt=""
                />
                <span className="absolute flex items-center justify-center top-2 left-2 text-3xl font-extrabold text-red-800 bg-white bg-opacity-75 h-12 w-12 rounded-full">
                  {index}
                </span>
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 flex-col items-start">
        <div className="flex gap-2">
          <button disabled={isFirstPage} onClick={scrollPrev}>
            ⬅️
          </button>

          <button disabled={isLastPage} onClick={scrollNext}>
            ➡️
          </button>
        </div>
        <div className="flex gap-2">
          <button disabled={isFirstPage} onClick={() => scrollPrevPage()}>
            ⬅️⬅️
          </button>
          <button disabled={isLastPage} onClick={() => scrollNextPage()}>
            ➡️➡️
          </button>
        </div>

        <button disabled={isLastPage} onClick={() => scrollToIndex(12)}>
          12
        </button>
      </div>
    </div>
  );
};

export { Carousel1 };
