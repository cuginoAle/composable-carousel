import React, { useEffect } from 'react';

type snapPosition = 'start' | 'center' | 'end';

interface UseCarouselProps {
  snapPosition?: snapPosition;
  axis?: 'x' | 'y';
  rootMargin?: string;
  scrollPadding?: string;
  scrollSnapStop?: 'always' | 'normal';
}
type ScrollToIndexProps = (index: number) => void;

const useCarousel = ({
  snapPosition = 'start',
  axis = 'x',
  rootMargin,
  scrollPadding,
  scrollSnapStop = 'normal',
}: UseCarouselProps): {
  visibleIndexes: number[];
  scrollToIndex: ScrollToIndexProps;
  prevItemIndex: number;
  nextItemIndex: number;
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollNextPage: () => void;
  scrollPrevPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
  scrollAreaRef: (el: HTMLElement | null) => void;
} => {
  const [scrollAreaRef, setScrollAreaRef] = React.useState<HTMLElement | null>(
    null,
  );
  const [carouselItems, setCarouselItems] = React.useState<Element[]>([]);
  const [visibleIndexes, setVisibleIndexes] = React.useState(
    new Set<number>([0]),
  );

  const posProp = axis === 'x' ? 'left' : 'top';
  const sizeProp = axis === 'x' ? 'width' : 'height';

  useEffect(() => {
    if (scrollAreaRef) {
      scrollAreaRef.style.scrollSnapType = `${axis} mandatory`;
      scrollAreaRef.style.overflow = 'auto';
      scrollAreaRef.style.scrollBehavior = 'smooth';
      scrollAreaRef.style.display = 'flex';
      scrollAreaRef.style.flexDirection = axis === 'x' ? 'row' : 'column';
      scrollAreaRef.style.scrollPadding = scrollPadding || '0px';
      scrollAreaRef.style.position = 'relative'; // this is needed by the offset prop

      const C = Array.from(scrollAreaRef.children);
      C.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.scrollSnapAlign = snapPosition;
        htmlEl.style.scrollSnapStop = scrollSnapStop;
      });

      setCarouselItems(C);
      const options = {
        root: scrollAreaRef,
        // I found that sometimes the intersectionRatio is like 0.98999 for fully visible elements,
        // rounding issue maybe caused by the snap scroll engine??
        threshold: [1.0, 0.98],
        rootMargin,
      };

      const observer = new IntersectionObserver((e) => {
        e.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIndexes.add(C.indexOf(entry.target));
          } else {
            visibleIndexes.delete(C.indexOf(entry.target));
          }
        });
        const newSet = new Set(visibleIndexes.values());
        if (newSet.size > 0) setVisibleIndexes(newSet);
      }, options);

      C.forEach((target) => {
        observer.observe(target);
      });

      return () => {
        C.forEach((target) => {
          observer.unobserve(target);
        });
      };
    }
  }, [scrollAreaRef, snapPosition, rootMargin, scrollPadding]);

  const sortedVisibleIndexesArray = Array.from(visibleIndexes.values()).sort(
    (a, b) => a - b,
  );

  const prevItemIndex = Math.max(sortedVisibleIndexesArray[0] - 1, 0);
  const nextItemIndex = Math.min(
    sortedVisibleIndexesArray.slice(-1)[0] + 1,
    carouselItems.length - 1,
  );

  const scrollToIndex: ScrollToIndexProps = (index) => {
    const viewportSize = scrollAreaRef?.getBoundingClientRect()[
      sizeProp
    ] as number;
    const itemSize = carouselItems[index]?.getBoundingClientRect()[
      sizeProp
    ] as number;

    const item = carouselItems[index] as HTMLElement;
    const offset = axis === 'x' ? item.offsetLeft : item.offsetTop;

    const scrollDelta = {
      start: 0,
      center: -viewportSize / 2 + itemSize / 2,
      end: -viewportSize + itemSize,
    }[snapPosition];

    scrollAreaRef?.scrollTo({
      [posProp]: offset + scrollDelta,
      behavior: 'smooth',
    });
  };

  const scrollNext = () => {
    scrollToIndex(nextItemIndex);
  };
  const scrollPrev = () => {
    scrollToIndex(prevItemIndex);
  };

  const scrollNextPage = () => {
    scrollAreaRef?.scrollBy({
      [posProp]: sortedVisibleIndexesArray.reduce((acc, curr) => {
        return acc + carouselItems[curr].getBoundingClientRect()[sizeProp];
      }, 0),
      behavior: 'smooth',
    });
  };

  const scrollPrevPage = () => {
    scrollAreaRef?.scrollBy({
      [posProp]: -sortedVisibleIndexesArray.reduce((acc, curr) => {
        return acc + carouselItems[curr].getBoundingClientRect()[sizeProp];
      }, 0),
      behavior: 'smooth',
    });
  };
  return {
    scrollAreaRef: setScrollAreaRef,
    visibleIndexes: sortedVisibleIndexesArray,
    scrollNext,
    scrollPrev,
    scrollToIndex,
    scrollNextPage,
    scrollPrevPage,
    prevItemIndex,
    nextItemIndex,
    isFirstPage: sortedVisibleIndexesArray[0] === 0,
    isLastPage:
      sortedVisibleIndexesArray.slice(-1)[0] === carouselItems.length - 1,
  };
};

export { useCarousel };
export type { snapPosition };
