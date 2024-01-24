import React, { useCallback, useEffect } from 'react';

type snapPosition = 'start' | 'center' | 'end';

type UseCarouselProps = {
  snapPosition?: snapPosition;
  axis?: 'x' | 'y';
  rootMargin?: string;
  scrollPadding?: string;
  scrollSnapStop?: 'always' | 'normal';
};
type ScrollToIndexProps = (index: number) => void;

const useCarousel = ({
  snapPosition = 'start',
  axis = 'x',
  rootMargin,
  scrollPadding,
  scrollSnapStop = 'normal',
}: UseCarouselProps = {}): {
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
  // pageCount: number;
  scrollAreaRef: (el: HTMLElement | null) => void;
} => {
  const [scrollAreaRef, setScrollAreaRef] = React.useState<HTMLElement | null>(
    null,
  );
  const [carouselItems, setCarouselItems] = React.useState<Element[]>([]);
  const [visibleIndexes, setVisibleIndexes] = React.useState(
    new Set<number>([0]),
  );
  // const [pageCount, setPageCount] = React.useState<number>(0);

  const posProp = axis === 'x' ? 'left' : 'top';
  const sizeProp = axis === 'x' ? 'width' : 'height';

  useEffect(() => {
    if (scrollAreaRef) {
      // TODO: these lines should be moved somewhere else
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
        // maybe a rounding issue caused by the snap scroll engine??
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
        if (newSet.size > 0) {
          setVisibleIndexes(newSet);
        }
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
  }, [
    scrollAreaRef,
    snapPosition,
    rootMargin,
    scrollPadding,
    axis,
    scrollSnapStop,
  ]);

  const sortedVisibleIndexesArray = Array.from(visibleIndexes.values()).sort(
    (a, b) => a - b,
  );

  const prevItemIndex = Math.max(sortedVisibleIndexesArray[0] - 1, 0);
  const nextItemIndex = Math.min(
    sortedVisibleIndexesArray.slice(-1)[0] + 1,
    carouselItems.length - 1,
  );

  const visibleItemsMap = {
    start: sortedVisibleIndexesArray[0],
    center:
      sortedVisibleIndexesArray[
        Math.floor(sortedVisibleIndexesArray.length / 2)
      ],
    end: sortedVisibleIndexesArray.slice(-1)[0],
  };

  const scrollToIndex: ScrollToIndexProps = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, carouselItems.length));
    if (!scrollAreaRef) {
      return;
    }

    const item = carouselItems[clampedIndex] as HTMLElement;

    // TODO: this doesn't take into account the scrollPadding!!
    const viewportSize = scrollAreaRef.getBoundingClientRect()[sizeProp];

    const itemSize = item.getBoundingClientRect()[sizeProp] as number;
    const itemOffset = axis === 'x' ? item.offsetLeft : item.offsetTop;

    const scrollDelta = {
      start: 0,
      center: viewportSize / 2 - itemSize / 2,
      end: viewportSize - itemSize,
    }[snapPosition];

    scrollAreaRef?.scrollTo({
      [posProp]: itemOffset - scrollDelta,
      behavior: 'smooth',
    });
  };

  const scrollNext = () => {
    scrollToIndex(visibleItemsMap[snapPosition] + 1);
  };

  const scrollPrev = () => {
    scrollToIndex(visibleItemsMap[snapPosition] - 1);
  };

  const getVisibleItemsSize = useCallback(() => {
    // this could be refactored to be the delta between the last visible item offset (+ its size) and the first visible item offset
    const itemsSize = sortedVisibleIndexesArray.reduce((acc, curr) => {
      return acc + carouselItems[curr].getBoundingClientRect()[sizeProp];
    }, 0);
    const gap = scrollAreaRef ? window.getComputedStyle(scrollAreaRef).gap : '';

    return itemsSize + (sortedVisibleIndexesArray.length - 1) * parseInt(gap);
  }, [carouselItems, scrollAreaRef, sizeProp, sortedVisibleIndexesArray]);

  const scrollNextPage = () => {
    scrollAreaRef?.scrollTo({
      [posProp]: scrollAreaRef.scrollLeft + getVisibleItemsSize(),
    });
  };

  const scrollPrevPage = () => {
    scrollAreaRef?.scrollTo({
      [posProp]: scrollAreaRef.scrollLeft - getVisibleItemsSize(),
    });
  };

  // useEffect(() => {
  //   console.log(scrollAreaRef);
  //   if (scrollAreaRef) {
  //     const totalWidth = scrollAreaRef?.scrollWidth || 1;

  //     setPageCount(Math.ceil(totalWidth / getVisibleItemsSize()));
  //   }
  // }, [getVisibleItemsSize, scrollAreaRef]);

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
    // currentPage,
    // pageCount,
    isFirstPage: sortedVisibleIndexesArray[0] === 0,
    isLastPage:
      sortedVisibleIndexesArray.slice(-1)[0] === carouselItems.length - 1,
  };
};

export { useCarousel };
export type { snapPosition };
