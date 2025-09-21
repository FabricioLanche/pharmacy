
import ProductCardList from '../components/Home/ProductCardList';

export default function Home({ filteredProducts }: { filteredProducts?: any[] }) {
  return (
    <main>
      <h1>Home Page</h1>
      <ProductCardList products={filteredProducts} />
    </main>
  );
}
