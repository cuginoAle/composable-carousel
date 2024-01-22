import { useCarousel } from '../components/carousel/useCarousel';

import { TabMenu } from '../components/carousel/sub-components/tab-menu';

const TabbedMenu = ({
  items,
}: {
  items: {
    content: string;
    label: string;
  }[];
}) => {
  const { scrollAreaRef, visibleIndexes, scrollToIndex } = useCarousel({
    snapPosition: 'start',
    axis: 'x',
  });

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 relative">
        <TabMenu
          items={items.map((item) => item.label)}
          selectedIndex={visibleIndexes[0]}
          onClick={scrollToIndex}
        />
      </div>
      <div className="relative">
        <ul ref={scrollAreaRef} className="gap-1">
          {items.map((item, index) => (
            <li key={index} className="basis-full shrink-0">
              <div className={`p-24 shrink-0 rounded-sm bg-slate-100 h-full`}>
                {item.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { TabbedMenu };
