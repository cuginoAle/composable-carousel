import React from 'react';
import { Root } from '../carousel';
import { CarouselItem } from '../carouselItem';
import { useCarousel } from '../useCarousel';

interface Carousel1Props {
  items: React.ReactNode[];
}
const Carousel1 = ({ items }: Carousel1Props) => {
  const rootRef = React.useRef<HTMLUListElement>(null);

  const { visibleIndexes, scrollToIndex } = useCarousel({
    rootRef,
  });

  const prevIndex = visibleIndexes[0] - 1;
  const nextIndex = visibleIndexes.slice(-1)[0] + 1;
  console.log(prevIndex, nextIndex, visibleIndexes);

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
          disabled={prevIndex < 0}
          onClick={() => scrollToIndex(prevIndex)}
        >
          ⬅️
        </button>

        <button
          disabled={nextIndex === items.length}
          onClick={() => scrollToIndex(nextIndex)}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export { Carousel1 };
