import React from 'react';
import { Root } from '../carousel';
import { CarouselItem } from '../carouselItem';
import { useCarousel } from '../useCarousel';

// Some dummy items to fill the carousel:
const items = new Array(20).fill(0).map((_, index) => {
  return (
    <a
      href="https://picsum.photos"
      key={index}
      className="block h-96 overflow-hidden rounded-md w-96 relative"
      style={{ width: Math.random() * 300 + 200, maxWidth: '100%' }}
    >
      <img
        className="block object-cover w-full h-full object-center "
        src={`https://picsum.photos/seed/${Math.random() * 10}/600/300`}
        alt=""
      />
      <span className="absolute left-1/2 top-1/2 text-5xl opacity-50 text-red-800">
        {index}
      </span>
    </a>
  );
});

const Carousel1 = () => {
  const rootRef = React.useRef<HTMLUListElement>(null);

  const {
    scrollToIndex,
    scrollNextPage,
    scrollPrevPage,
    scrollNext,
    scrollPrev,
    isFirstPage,
    isLastPage,
  } = useCarousel({
    rootRef,
    snapPosition: 'center',
  });

  return (
    <div className="relative">
      <Root ref={rootRef} className="gap-4 pb-8">
        {items.map((node, index) => (
          <CarouselItem
            key={index}
            className="shrink-0 rounded-md shadow-sm shadow-neutral-800"
          >
            {node}
          </CarouselItem>
        ))}
      </Root>
      <div className="flex gap-2">
        <button disabled={isFirstPage} onClick={scrollPrev}>
          ⬅️
        </button>

        <button disabled={isLastPage} onClick={scrollNext}>
          ➡️
        </button>

        <button disabled={isLastPage} onClick={() => scrollNextPage()}>
          ➡️➡️
        </button>
        <button disabled={isFirstPage} onClick={() => scrollPrevPage()}>
          ⬅️⬅️
        </button>

        <button disabled={isLastPage} onClick={() => scrollToIndex(12)}>
          ➡️➡️
        </button>
      </div>
    </div>
  );
};

export { Carousel1 };
