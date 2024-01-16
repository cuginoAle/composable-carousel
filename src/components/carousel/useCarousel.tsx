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
  isFirstPage: boolean;
  isLastPage: boolean;
} => {
  const [carouselItems, setCarouselItems] = React.useState<Element[]>([]);
  const [visibleIndexes, setVisible] = React.useState(new Set<number>([0]));

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

  const scrollToIndex: ScrollToIndexProps = (index) => {
    const sign = Math.sign(index - sortedVisibleIndexesArray[0]);

    // calculating the distance of the passed index from the nearest visible index
    const delta = Math.min(
      ...sortedVisibleIndexesArray.map((i) => Math.abs(index - i)),
    );

    // ******* ASSUMING ALL THE CARDS HAVE THE SAME WIDTH *******
    // const cardWidth = carouselItems[0].getBoundingClientRect().width;
    const cardWidth = carouselItems
      .filter((_el, i) => {
        // console.log(sign, i, index, sortedVisibleIndexesArray[0]);
        if (sign === 1) {
          return i > sortedVisibleIndexesArray.slice(-1)[0] && i <= index;
        } else {
          return i >= index && i < sortedVisibleIndexesArray[0];
        }
      })
      .reduce((acc, el) => acc + el.getBoundingClientRect().width, 0);

    rootRef.current?.scrollBy({
      left: delta * cardWidth * sign,
      behavior: 'smooth',
    });
  };
  return {
    visibleIndexes: sortedVisibleIndexesArray,
    scrollToIndex,
    prevItemIndex,
    nextItemIndex,
    isFirstPage: sortedVisibleIndexesArray[0] === 0,
    isLastPage:
      sortedVisibleIndexesArray.slice(-1)[0] === carouselItems.length - 1,
  };
};

export { useCarousel };
