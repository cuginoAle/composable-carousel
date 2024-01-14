import { Carousel1 } from './components/carousel/pre-assembled/carousel-1';
import './tailwind.output.css';

const items = new Array(10).fill(0).map((_, index) => {
  return (
    <a href="https://picsum.photos" key={index}>
      <img
        className="max-w-full block"
        src={`https://picsum.photos/seed/${index}/600/300`}
        alt=""
      />
    </a>
  );
});
export default function App() {
  return (
    <div className="flex flex-col gap-4 p-10">
      <h1>Composable Carousel:</h1>
      <Carousel1 items={items} />
    </div>
  );
}
