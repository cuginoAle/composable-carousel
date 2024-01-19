import { BuildingBlocks } from './components/carousel/pre-assembled/building-blocks';
import { Demo } from './components/carousel/pre-assembled/demo';

import './tailwind.output.css';

const pages = {
  default: (
    <div className="flex flex-col gap-6">
      <BuildingBlocks />

      <div>
        <a className="px-4 py-2 bg-slate-300 rounded" href="/one">
          Demo
        </a>
      </div>
    </div>
  ),
  one: (
    <div className="flex flex-col gap-6">
      <Demo />

      <div>
        <a className="px-4 py-1 bg-slate-300 rounded" href="/">
          Back
        </a>
      </div>
    </div>
  ),
};
export default function App() {
  const hash = window.location.pathname.slice(1) as keyof typeof pages;

  return (
    <div className="flex flex-col gap-4 p-10">
      {pages[hash] || pages.default}
    </div>
  );
}
