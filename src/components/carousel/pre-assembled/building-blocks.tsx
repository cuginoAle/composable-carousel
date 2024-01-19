import { Section } from '../section';
import { Button } from '../sub-components/button';
import { Pagination } from '../sub-components/pagination';
import { useCarousel } from '../useCarousel';

// Some dummy items to fill the carousel:
const items = new Array(20).fill(0).map(() => ({
  url: 'https://placehold.co/240',
  width: Math.random() * 300 + 200,
}));

const BuildingBlocks = () => {
  const {
    scrollNext,
    scrollPrev,
    scrollAreaRef,
    scrollToIndex,
    visibleIndexes,
  } = useCarousel({
    snapPosition: 'start',
    axis: 'x',
  });

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-thin">Building blocks:</h1>
      <Section label="Scrollable area">
        <ul ref={scrollAreaRef} className="gap-4 ">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href="https://picsum.photos"
                key={index}
                className="block h-60 w-60 overflow-hidden rounded-md relative"
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
      </Section>

      <Section label="Business logic">
        <div className="flex gap-2 items-center">
          <img
            className="max-w-16"
            src="https://raw.githubusercontent.com/alDuncanson/react-hooks-snippets/master/icon.png"
          />
          React custom hook
        </div>
      </Section>
      <Section label="Sub components">
        <div className="flex gap-8 flex-wrap">
          <Section label="Buttons">
            <div className="flex gap-2">
              <Button onClick={scrollPrev}>&#8249;</Button>
              <Button onClick={scrollNext}>&#8250;</Button>
            </div>
          </Section>

          <Section label="Pagination">
            <Pagination
              itemCount={items.length}
              onClick={scrollToIndex}
              visibleIndexes={visibleIndexes}
            />
          </Section>
        </div>
      </Section>
    </div>
  );
};

export { BuildingBlocks };
