import React, { useEffect } from 'react';

interface UseCarouselProps {
  rootRef: React.RefObject<HTMLUListElement>;
  snapPosition?: 'start' | 'end' | 'center';
}
type ScrollToIndexProps = (index: number) => void;

const useCarousel = ({
  rootRef,
  snapPosition = 'start',
}: UseCarouselProps): {
  visibleIndexes: number[];
  scrollToIndex: ScrollToIndexProps;
  prevItemIndex: number;
  nextItemIndex: number;
  prevPageItemIndex: number;
  nextPageItemIndex: number;
  isFirstPage: boolean;
  isLastPage: boolean;
} => {
  const [carouselItems, setCarouselItems] = React.useState<Element[]>([]);
  const [visibleIndexes, setVisible] = React.useState(new Set<number>([0]));

  const scrollToIndex: ScrollToIndexProps = (index) => {
    carouselItems[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  };

  useEffect(() => {
    if (rootRef.current) {
      const C = Array.from(rootRef.current.children);
      C.forEach((el) => {
        (el as HTMLElement).style.scrollSnapAlign = snapPosition;
      });

      setCarouselItems(C);
      const options = {
        root: rootRef.current,
        threshold: 1.0,
      };

      const observer = new IntersectionObserver((e) => {
        e.forEach((entry) => {
          if (entry.intersectionRatio === 1) {
            visibleIndexes.add(C.indexOf(entry.target));
          } else {
            visibleIndexes.delete(C.indexOf(entry.target));
          }
        });
        const newSet = new Set(visibleIndexes.values());
        if (newSet.size > 0) setVisible(newSet);
      }, options);

      C.forEach((target) => {
        observer.observe(target);
      });
    }
  }, [rootRef.current]);

  const sortedVisibleIndexesArray = Array.from(visibleIndexes.values()).sort();

  const prevItemIndex = Math.max(sortedVisibleIndexesArray[0] - 1, 0);
  const nextItemIndex = Math.min(
    sortedVisibleIndexesArray.slice(-1)[0] + 1,
    carouselItems.length - 1,
  );
  const prevPageItemIndex = Math.max(
    sortedVisibleIndexesArray[0] - sortedVisibleIndexesArray.length,
    0,
  );
  const nextPageItemIndex = Math.min(
    sortedVisibleIndexesArray.slice(-1)[0] + sortedVisibleIndexesArray.length,
    carouselItems.length - 1,
  );
  return {
    visibleIndexes: sortedVisibleIndexesArray,
    scrollToIndex,
    prevItemIndex,
    nextItemIndex,
    prevPageItemIndex,
    nextPageItemIndex,
    isFirstPage: sortedVisibleIndexesArray[0] === 0,
    isLastPage:
      sortedVisibleIndexesArray.slice(-1)[0] === carouselItems.length - 1,
  };
};

export { useCarousel };
