import { Carousel1 } from './components/carousel/pre-assembled/carousel-1';
import { Carousel2 } from './components/carousel/pre-assembled/carousel-2';
import './tailwind.output.css';

export default function App() {
  return (
    <div className="flex flex-col gap-4 p-10">
      <h1>Composable Carousel:</h1>
      <Carousel1 />
      <Carousel2 />
    </div>
  );
}
