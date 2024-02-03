import { BBC } from './pages/bbc';
import { BuildingBlocks } from './pages/building-blocks';
import { Demo } from './pages/demo';
import { OsxFinder } from './pages/osx_finder';
import { TabbedMenu } from './pages/tabbed_menu';

import './tailwind.output.css';

// Some dummy items to fill the carousel:
const items = new Array(40)
  .fill(0)
  .map(() => `https://picsum.photos/seed/${Math.random() * 10}/600/300`);

const tabbedMenuItems = [
  {
    label: 'Home',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia voluptatibus, voluptate molestias.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia voluptatibus, voluptate molestias.`,
  },
  {
    label: 'Contact us',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia voluptatibus, voluptate molestias',
  },
  {
    label: 'Blog',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia voluptatibus, voluptate molestias',
  },
  {
    label: 'FAQ',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia voluptatibus, voluptate molestias',
  },
];

const pages = {
  default: (
    <div className="flex flex-col gap-6">
      <BuildingBlocks />

      <div className="flex gap-2 m-6">
        <a className="px-4 py-2 bg-slate-300 rounded" href="/one">
          Image carousel
        </a>
        <a className="px-4 py-2 bg-slate-300 rounded" href="/two">
          Tabbed menu
        </a>

        <a className="px-4 py-2 bg-slate-300 rounded" href="/three">
          BBC
        </a>

        <a className="px-4 py-2 bg-slate-300 rounded" href="/four">
          Osx Finder
        </a>
      </div>
    </div>
  ),
  one: (
    <div className="flex flex-col gap-6 p-8">
      <Demo items={items} />

      <div>
        <a className="px-4 py-1 bg-slate-300 rounded" href="/">
          Back
        </a>
      </div>
    </div>
  ),
  two: (
    <div className="flex flex-col gap-6 p-8">
      <TabbedMenu items={tabbedMenuItems} />

      <div>
        <a className="px-4 py-1 bg-slate-300 rounded" href="/">
          Back
        </a>
      </div>
    </div>
  ),
  three: (
    <div className="flex flex-col gap-6">
      <BBC items={items} />

      <div>
        <a className="px-4 py-1 ml-6 bg-slate-300 rounded" href="/">
          Back
        </a>
      </div>
    </div>
  ),
  four: (
    <div className="flex flex-col gap-6">
      <OsxFinder items={items} />

      <div>
        <a className="px-4 py-1 ml-6 bg-slate-300 rounded" href="/">
          Back
        </a>
      </div>
    </div>
  ),
};
export default function App() {
  const hash = window.location.pathname.slice(1) as keyof typeof pages;

  return pages[hash] || pages.default;
}
