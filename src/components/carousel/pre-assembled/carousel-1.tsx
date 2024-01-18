import { Carousel } from '../';
import { Button } from '../sub-components/button';
import { Pagination } from '../sub-components/pagination';

// Some dummy items to fill the carousel:
const items = new Array(20).fill(0).map(() => ({
  url: `https://picsum.photos/seed/${Math.random() * 10}/600/300`,
  width: Math.random() * 300 + 200,
}));

const Carousel1 = () => {
  const {
    scrollNext,
    scrollPrev,
    scrollAreaRef,
    scrollToIndex,
    visibleIndexes,
  } = Carousel.useCarousel({
    snapPosition: 'start',
    axis: 'x',
  });

  return (
    <div className="relative flex flex-col gap-8">
      <ul ref={scrollAreaRef} className="gap-4 pb-8">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href="https://picsum.photos"
              key={index}
              className="block h-96 w-96 overflow-hidden rounded-md relative"
              // style={{ width: item.width }}
            >
              <img
                className="block object-cover w-full h-full object-center "
                src={item.url}
                alt=""
              />
            </a>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 flex-col items-start">
        <div className="flex gap-2">
          <Button onClick={scrollPrev}>&#8249;</Button>
          <Button onClick={scrollNext}>&#8250;</Button>
        </div>
      </div>
      <Pagination
        itemCount={items.length}
        onClick={scrollToIndex}
        visibleIndexes={visibleIndexes}
      />
    </div>
  );
};

export { Carousel1 };
