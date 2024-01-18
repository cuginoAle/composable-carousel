import React, { useEffect } from 'react';

interface UseCarouselProps {
  snapPosition?: 'start' | 'end' | 'center';
  axis?: 'x' | 'y';
}
type ScrollToIndexProps = (index: number) => void;

const useCarousel = ({
  snapPosition = 'start',
  axis = 'x',
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

  useEffect(() => {
    if (scrollAreaRef) {
      scrollAreaRef.style.scrollSnapType = `${axis} mandatory`;
      scrollAreaRef.style.overflow = 'auto';
      scrollAreaRef.style.scrollBehavior = 'smooth';
      scrollAreaRef.style.display = 'flex';

      const C = Array.from(scrollAreaRef.children);
      C.forEach((el) => {
        (el as HTMLElement).style.scrollSnapAlign = snapPosition;
      });

      setCarouselItems(C);
      const options = {
        root: scrollAreaRef,
        // I found that sometimes the intersectionRatio is like 0.98999 for fully visible elements,
        // wrong rounding maybe caused by the snap scroll engine??
        threshold: [1.0, 0.98],
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
    }
  }, [scrollAreaRef]);

  const sortedVisibleIndexesArray = Array.from(visibleIndexes.values()).sort(
    (a, b) => a - b,
  );

  const prevItemIndex = Math.max(sortedVisibleIndexesArray[0] - 1, 0);
  const nextItemIndex = Math.min(
    sortedVisibleIndexesArray.slice(-1)[0] + 1,
    carouselItems.length - 1,
  );

  const scrollToIndex: ScrollToIndexProps = (index) => {
    carouselItems[index]?.scrollIntoView({
      behavior: 'smooth',
      block: snapPosition,
      inline: snapPosition,
    });
  };

  const scrollNext = () => {
    scrollAreaRef?.scrollBy({
      left: carouselItems[sortedVisibleIndexesArray[0]]?.getBoundingClientRect()
        .width,
      top: carouselItems[sortedVisibleIndexesArray[0]]?.getBoundingClientRect()
        .height,
      behavior: 'smooth',
    });
  };
  const scrollPrev = () => {
    scrollAreaRef?.scrollBy({
      left: -carouselItems[
        sortedVisibleIndexesArray[0] - 1
      ]?.getBoundingClientRect().width,
      top: -carouselItems[
        sortedVisibleIndexesArray[0] - 1
      ]?.getBoundingClientRect().height,
      behavior: 'smooth',
    });
  };

  const scrollNextPage = () => {
    scrollAreaRef?.scrollBy({
      left: sortedVisibleIndexesArray.reduce((acc, curr) => {
        return acc + carouselItems[curr].getBoundingClientRect().width;
      }, 0),
      top: sortedVisibleIndexesArray.reduce((acc, curr) => {
        return acc + carouselItems[curr].getBoundingClientRect().height;
      }, 0),
      behavior: 'smooth',
    });
  };

  const scrollPrevPage = () => {
    scrollAreaRef?.scrollBy({
      left: -sortedVisibleIndexesArray.reduce((acc, curr) => {
        return acc + carouselItems[curr].getBoundingClientRect().width;
      }, 0),
      top: -sortedVisibleIndexesArray.reduce((acc, curr) => {
        return acc + carouselItems[curr].getBoundingClientRect().height;
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
