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
      className="block h-96"
      style={{ width: Math.random() * 300 + 200, maxWidth: '100%' }}
    >
      <img
        className="block object-cover w-full h-full object-center "
        src={`https://picsum.photos/seed/${Math.random() * 10}/600/300`}
        alt=""
      />
    </a>
  );
});

const Carousel1 = () => {
  const rootRef = React.useRef<HTMLUListElement>(null);

  const {
    scrollToIndex,
    prevItemIndex,
    nextItemIndex,
    isFirstPage,
    isLastPage,
  } = useCarousel({
    rootRef,
    snapPosition: 'start',
  });

  return (
    <div className="relative">
      <Root ref={rootRef} className="gap-4">
        {items.map((node, index) => (
          <CarouselItem key={index} className="shrink-0">
            {node}
          </CarouselItem>
        ))}
      </Root>
      <div className="flex gap-2">
        <button
          disabled={isFirstPage}
          onClick={() => scrollToIndex(prevItemIndex)}
        >
          ⬅️
        </button>

        <button
          disabled={isLastPage}
          onClick={() => scrollToIndex(nextItemIndex)}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export { Carousel1 };
