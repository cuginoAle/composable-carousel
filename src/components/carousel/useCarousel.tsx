import React, { useEffect } from 'react';

interface UseCarouselProps {
  rootRef: React.RefObject<HTMLUListElement>;
}

const useCarousel = ({
  rootRef,
}: UseCarouselProps): {
  visibleIndexes: number[];
  scrollToIndex: (index: number) => void;
} => {
  const [carouselItems, setCarouselItems] = React.useState<Element[]>([]);
  const [visibleIndexes, setVisible] = React.useState(new Set<number>([]));

  const scrollToIndex = (index: number) => {
    const pos = 'nearest';
    carouselItems[index]?.scrollIntoView({
      behavior: 'smooth',
      block: pos,
      inline: pos,
    });
  };

  useEffect(() => {
    if (rootRef.current) {
      const C = Array.from(rootRef.current.children);
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

  const sortedArray = Array.from(visibleIndexes.values()).sort();
  return {
    visibleIndexes: sortedArray,
    scrollToIndex,
  };
};

export { useCarousel };
