import { useBeerStore } from "./store/beerStore";

function PageA() {
  const beers = useBeerStore((state) => state.beers);
  return <h1>Page A beer count: {beers} </h1>;
}

function PageB() {
  const beers = useBeerStore((state) => state.beers);
  return <h1>Page B beer count: {beers} </h1>;
}

function App() {
  const { incrementBeers } = useBeerStore();

  return (
    <>
      <PageA />
      <PageB />
      <button onClick={() => incrementBeers()}>Give me a beer</button>
    </>
  );
}

export default App;
