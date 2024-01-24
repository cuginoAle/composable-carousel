import { Section } from '../components/section';
import { Button } from '../components/carousel/sub-components/button';
import { Pagination } from '../components/carousel/sub-components/pagination';
import { useCarousel } from '../components/carousel/useCarousel';

// Some dummy items to feed the carousel:
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
    <div className="p-10">
      <div className="flex flex-col gap-12">
        <h1 className="text-4xl font-thin">Carousel building blocks:</h1>

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
              <div className="flex items-center h-full">
                <Pagination
                  itemCount={items.length}
                  onClick={scrollToIndex}
                  visibleIndexes={visibleIndexes}
                />
              </div>
            </Section>
          </div>
        </Section>

        <Section label="Scrollable area">
          <ul ref={scrollAreaRef} className="gap-4">
            {items.map((item, index) => (
              <li key={index} className="max-w-full">
                <a
                  href="https://picsum.photos"
                  key={index}
                  className="block h-60 overflow-hidden w-60 max-w-full rounded-md relative"
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
        <div className="flex gap-4">
          <Section label="Core components">
            <p className="mb-8 text-sm text-orange-800">
              Atomic elements: single responsibility
            </p>
            <div className="flex gap-8 flex-col">
              <p>React custom hook</p>
              <p>Navigation Buttons</p>
              <p>Pagination</p>
            </div>
          </Section>

          <p className="text-7xl flex items-center">&#8250;</p>

          <Section label="Composition">
            <p className="mb-8 text-sm text-orange-800">
              Composing the building blocks and adding CSS to match the designs
            </p>
            <div className="flex gap-2 flex-col">
              <div className="flex gap-8 flex-col text-sm italic text-green-800">
                <code>
                  <pre>
                    {`
const PrimayCarousel=(props)=>{                    
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
  
  <div className="relative">
        <ul ref={scrollAreaRef} className="gap-4 py-2">
          {items.map((url, index) => (
            <li key={index} className="max-w-full">
  ...
  ...  
  `}
                  </pre>
                </code>
              </div>
            </div>
          </Section>

          <p className="text-7xl flex items-center">&#8250;</p>

          <Section label="Pre-assembled black boxs">
            <p className="mb-8 text-sm text-orange-800">
              Convenient components to use in the app
            </p>
            <div className="flex gap-8 flex-col text-sm italic text-green-800">
              <code>{`<PrimaryCarousel items={items} title="New In" />`}</code>
              <code>{`<SecondaryCarousel items={items} />`}</code>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export { BuildingBlocks };
